from typing import List, Optional

# --- Modelos de Dados ---

class Usuario:
    """Representa a entidade Usuário para Autenticação (tabela usuarios)."""
    def __init__(self, id: Optional[int], username: str, password_hash: Optional[str] = None):
        self.id = id
        self.username = username
        self.password_hash = password_hash

    def to_dict(self):
        return {'id': self.id, 'username': self.username}

class Cadastro:
    """Representa os dados pessoais do usuário (tabela cadastros)."""
    def __init__(self, id: Optional[int], usuario_id: int, nome_completo: str, email: str, 
                 telefone: Optional[str] = None, data_nascimento: Optional[str] = None, 
                 data_cadastro: Optional[str] = None):
        self.id = id
        self.usuario_id = usuario_id
        self.nome_completo = nome_completo
        self.email = email
        self.telefone = telefone
        self.data_nascimento = data_nascimento
        self.data_cadastro = data_cadastro
        
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'nome_completo': self.nome_completo,
            'email': self.email,
            'telefone': self.telefone,
            'data_nascimento': self.data_nascimento,
            'data_cadastro': self.data_cadastro
        }

class Curso:
    """Representa um Plano de Estudo/Curso (tabela cursos)."""
    def __init__(self, id: int, titulo: str, descricao: str, autor: str, imagem_url: str, tags: List[str] = None, data_publicacao: Optional[str] = None, nota_media: Optional[float] = None, modulos: List[str] = None, comentarios: List['Comentario'] = None):
        self.id = id
        self.titulo = titulo
        self.descricao = descricao
        self.autor = autor
        self.imagem_url = imagem_url
        self.tags = tags if tags is not None else []
        self.data_publicacao = data_publicacao
        self.nota_media = nota_media
        self.modulos = modulos if modulos is not None else []
        self.comentarios = comentarios if comentarios is not None else []

    def to_dict(self):
        """Converte o objeto Curso para um dicionário, pronto para JSON."""
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'autor': self.autor,
            'imagem_url': self.imagem_url,
            'tags': self.tags,
            'data_publicacao': self.data_publicacao,
            'nota_media': self.nota_media,
            'modulos': self.modulos,
            'comentarios': [c.to_dict() for c in self.comentarios]
        }

class Comentario:
    """Representa um comentário (tabela comentarios)."""
    def __init__(self, autor: str, texto: str, data: str):
        self.autor = autor
        self.texto = texto
        self.data = data

    def to_dict(self):
        return {'autor': self.autor, 'texto': self.texto, 'data': self.data}

class PlanoUsuario:
    """Modelo para planos de estudo criados por um usuário (tabela planos)."""
    def __init__(self, id: int, titulo: str, descricao: str, criado_em: str):
        self.id = id
        self.titulo = titulo
        self.descricao = descricao
        self.criado_em = criado_em

    def to_dict(self):
        return {'id': self.id, 'titulo': self.titulo, 'descricao': self.descricao, 'criado_em': self.criado_em}

class CursoEmAndamento:
    """Modelo para cursos em andamento de um usuário (tabelas cursos_andamento / cursos_salvos)."""
    def __init__(self, id: int, titulo: str, progresso: Optional[int] = None):
        self.id = id
        self.titulo = titulo
        self.progresso = progresso

    def to_dict(self):
        return {'id': self.id, 'titulo': self.titulo, 'progresso': self.progresso}