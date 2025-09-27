# services.py - Contém a lógica de negócio, POO e o novo algoritmo de recomendação

from .repositories import CursoRepository, AuthRepository, PerfilRepository
from .models import Curso, Comentario, PlanoUsuario, CursoEmAndamento, Usuario
from flask_mysqldb import MySQL
from typing import List, Optional, Tuple, Dict, Any
from datetime import datetime, timedelta
import bcrypt
import jwt
import config # Para acessar o SECRET_KEY

class AuthService:
    """Lógica de negócio para Autenticação e Autorização."""
    def __init__(self, mysql: MySQL):
        self.auth_repo = AuthRepository(mysql)
        self.secret_key = config.SECRET_KEY

    def register_user(self, username: str, senha: str, dados_pessoais: Optional[Dict[str, Any]] = None) -> bool:
        """Processa o registro de um novo usuário, inserindo nas duas tabelas."""
        senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt())
        
        # 1. Inserção na tabela 'usuarios'
        user_id = self.auth_repo.create_user(username, senha_hash)
        
        # 2. Inserção opcional na tabela 'cadastros'
        if user_id and dados_pessoais and dados_pessoais.get('email'):
            self.auth_repo.create_cadastro(
                usuario_id=user_id,
                nome_completo=dados_pessoais.get('nome_completo', ''),
                email=dados_pessoais.get('email', ''), # Email é obrigatório na tabela cadastros
                telefone=dados_pessoais.get('telefone'),
                data_nascimento=dados_pessoais.get('data_nascimento')
            )
            
        return True

    def login_user(self, username: str, senha: str) -> Optional[bytes]:
        """Verifica as credenciais e, se corretas, gera um token JWT."""
        usuario_data = self.auth_repo.get_user_by_username(username)
        
        if usuario_data:
            user_id, password_hash = usuario_data
            
            # O hash da senha deve ser um objeto 'bytes' para o bcrypt.checkpw
            if isinstance(password_hash, str):
                password_hash = password_hash.encode()

            if bcrypt.checkpw(senha.encode(), password_hash):
                # Geração do Token JWT (Expira em 1 hora)
                token = jwt.encode({
                    "user_id": user_id,
                    "exp": datetime.utcnow() + timedelta(hours=1)
                }, self.secret_key, algorithm="HS256")
                return token
                
        return None

class CursoService:
    """Lógica de negócio para Planos de Estudo (Cursos)."""
    def __init__(self, mysql: MySQL):
        self.curso_repo = CursoRepository(mysql)

    def _map_curso_from_db(self, row: tuple) -> Curso:
        """Helper para mapear uma linha básica do DB para um objeto Curso."""
        # A tupla tem 6 elementos: id, titulo, descricao, imagem_url, autor, tags_str
        id, titulo, descricao, imagem_url, autor, tags_str = row
        tags = tags_str.split(',') if tags_str else []
        
        return Curso(
            id=id,
            titulo=titulo,
            descricao=descricao,
            imagem_url=imagem_url,
            autor=autor,
            tags=tags
        )

    def get_all_cursos(self) -> List[dict]:
        """Busca todos os cursos e os retorna no formato JSON."""
        data = self.curso_repo.get_all_cursos()
        cursos = [self._map_curso_from_db(row) for row in data]
        return [curso.to_dict() for curso in cursos]

    def get_curso_detalhado(self, curso_id: int) -> Optional[dict]:
        """Busca um curso e suas informações detalhadas (tags, comentários, módulos)."""
        
        # 1. Dados Básicos do Curso (O repositório não retorna a string de tags agregadas)
        curso_data_basic = self.curso_repo.get_curso_by_id(curso_id)
        if not curso_data_basic:
            return None
            
        # 2. Informações Relacionadas
        tags = [tag[0] for tag in self.curso_repo.get_tags_by_curso_id(curso_id)]
        
        comentarios_data = self.curso_repo.get_comentarios_by_curso_id(curso_id)
        # Mapeia os dados de tupla para objetos Comentario
        comentarios = [Comentario(row[0], row[1], str(row[2])) for row in comentarios_data]
        
        nota_data = self.curso_repo.get_nota_media_by_curso_id(curso_id)
        nota = nota_data[0] if nota_data and nota_data[0] is not None else None
        
        modulos = [row[0] for row in self.curso_repo.get_modulos_by_curso_id(curso_id)]
        
        # 3. Mapeamento e Agregação (Cria o objeto final)
        # Ajuste a tupla para ter 6 elementos:
        # (id, titulo, descricao, imagem_url, autor, tags_str)
        temp_row_for_mapping = curso_data_basic[0:4] + (curso_data_basic[4], ",".join(tags))
        
        curso_obj = self._map_curso_from_db(temp_row_for_mapping)
        
        # Preenche os atributos detalhados
        curso_obj.data_publicacao = str(curso_data_basic[5])
        curso_obj.comentarios = comentarios
        curso_obj.nota_media = round(nota, 2) if nota else None
        curso_obj.modulos = modulos

        return curso_obj.to_dict()

    # --- Implementação do Requisito de Recomendação (Nova Funcionalidade) ---
    def get_cursos_recomendados_by_tags(self, tags: List[str]) -> List[dict]:
        """
        Busca Planos de Estudo (Cursos) que correspondam a pelo menos uma das tags fornecidas.
        """
        # A lógica da consulta SQL está no Repositório
        data = self.curso_repo.get_cursos_by_tags(tags)
        
        # Mapeia os resultados para objetos POO
        cursos_recomendados = [self._map_curso_from_db(row) for row in data]
        
        # Converte para JSON
        return [curso.to_dict() for curso in cursos_recomendados]

class PerfilService:
    """Lógica de negócio para informações do Perfil do Usuário."""
    def __init__(self, mysql: MySQL):
        self.perfil_repo = PerfilRepository(mysql)

    def get_cursos_salvos(self, usuario_id: int) -> List[dict]:
        """Busca cursos salvos e os retorna como lista de dicionários."""
        data = self.perfil_repo.get_cursos_salvos(usuario_id)
        cursos = [
            CursoEmAndamento(id=row[0], titulo=row[1], progresso=None).to_dict() 
            for row in data
        ]
        return cursos
    
    def get_cursos_andamento(self, usuario_id: int) -> List[dict]:
        """Busca cursos em andamento e os retorna como lista de dicionários."""
        data = self.perfil_repo.get_cursos_andamento(usuario_id)
        andamento = [
            CursoEmAndamento(id=row[0], titulo=row[1], progresso=row[2]).to_dict()
            for row in data
        ]
        return andamento

    def get_planos_usuario(self, usuario_id: int) -> List[dict]:
        """Busca planos criados pelo usuário e os retorna como lista de dicionários."""
        data = self.perfil_repo.get_planos_usuario(usuario_id)
        planos = [
            PlanoUsuario(id=row[0], titulo=row[1], descricao=row[2], criado_em=str(row[3])).to_dict()
            for row in data
        ]
        return planos