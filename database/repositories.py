# repositories.py - Contém toda a lógica de comunicação com o MySQL

from flask_mysqldb import MySQL
from typing import List, Tuple, Optional, Any

# --- Repositórios de Autenticação e Usuário ---

class AuthRepository:
    """Abstrai a lógica de acesso ao banco de dados para Autenticação e Cadastro."""
    def __init__(self, mysql: MySQL):
        self.mysql = mysql

    def create_user(self, username: str, password_hash: bytes) -> Optional[int]:
        """Cria um novo usuário na tabela 'usuarios' e retorna o ID gerado."""
        try:
            cur = self.mysql.connection.cursor()
            cur.execute("INSERT INTO usuarios (username, password_hash) VALUES (%s, %s)", (username, password_hash))
            self.mysql.connection.commit()
            
            # Recupera o ID do último registro inserido (se aplicável ao driver)
            user_id = cur.lastrowid 
            cur.close()
            return user_id
        except Exception:
            self.mysql.connection.rollback()
            raise

    def get_user_by_username(self, username: str) -> Optional[Tuple[int, str]]:
        """Busca um usuário pelo nome de usuário, retornando ID e hash da senha."""
        cur = self.mysql.connection.cursor()
        cur.execute("SELECT id, password_hash FROM usuarios WHERE username = %s", (username,))
        usuario = cur.fetchone()
        cur.close()
        return usuario
    
    def create_cadastro(self, usuario_id: int, nome_completo: str, email: str, telefone: Optional[str] = None, data_nascimento: Optional[str] = None) -> None:
        """Cria um novo registro na tabela 'cadastros'."""
        try:
            cur = self.mysql.connection.cursor()
            # A data_cadastro é DEFAULT CURRENT_TIMESTAMP no SQL, então não precisa ser inserida
            cur.execute("""
                INSERT INTO cadastros 
                (usuario_id, nome_completo, email, telefone, data_nascimento) 
                VALUES (%s, %s, %s, %s, %s)
            """, (usuario_id, nome_completo, email, telefone, data_nascimento))
            self.mysql.connection.commit()
            cur.close()
        except Exception:
            self.mysql.connection.rollback()
            raise

# --- Repositórios de Planos de Estudo (Cursos) ---

class CursoRepository:
    """Abstrai a lógica de acesso ao banco de dados para Planos de Estudo (Cursos)."""
    def __init__(self, mysql: MySQL):
        self.mysql = mysql

    def get_all_cursos(self) -> List[Tuple]:
        """Busca todos os cursos com suas tags agregadas."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT 
                c.id, 
                c.titulo, 
                c.descricao, 
                c.imagem_url, 
                u.nome AS autor,
                GROUP_CONCAT(t.nome) AS tags
            FROM cursos c
            JOIN usuarios u ON c.id_autor = u.id
            LEFT JOIN curso_tags ct ON c.id = ct.id_curso
            LEFT JOIN tags t ON ct.id_tag = t.id
            GROUP BY c.id
        """)
        data = cur.fetchall()
        cur.close()
        return data

    def get_curso_by_id(self, curso_id: int) -> Optional[Tuple]:
        """Busca os dados básicos de um curso pelo ID."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT c.id, c.titulo, c.descricao, c.imagem_url, u.nome AS autor, c.data_publicacao
            FROM cursos c
            JOIN usuarios u ON c.id_autor = u.id
            WHERE c.id = %s
        """, (curso_id,))
        curso_data = cur.fetchone()
        cur.close()
        return curso_data

    def get_tags_by_curso_id(self, curso_id: int) -> List[Tuple]:
        """Busca todas as tags de um curso específico."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT t.nome
            FROM curso_tags ct
            JOIN tags t ON ct.id_tag = t.id
            WHERE ct.id_curso = %s
        """, (curso_id,))
        tags = cur.fetchall()
        cur.close()
        return tags

    def get_comentarios_by_curso_id(self, curso_id: int) -> List[Tuple]:
        """Busca todos os comentários de um curso específico."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT u.username, cm.texto, cm.data 
            FROM comentarios cm
            JOIN usuarios u ON cm.id_usuario = u.id
            WHERE cm.id_curso = %s
        """, (curso_id,))
        comentarios = cur.fetchall()
        cur.close()
        return comentarios

    def get_nota_media_by_curso_id(self, curso_id: int) -> Optional[Tuple]:
        """Calcula e retorna a nota média de um curso."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT AVG(nota)
            FROM avaliacoes
            WHERE id_curso = %s
        """, (curso_id,))
        nota = cur.fetchone()
        cur.close()
        return nota

    def get_modulos_by_curso_id(self, curso_id: int) -> List[Tuple]:
        """Busca os títulos dos módulos de um curso, ordenados."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT titulo
            FROM modulos
            WHERE id_curso = %s
            ORDER BY ordem
        """, (curso_id,))
        modulos = cur.fetchall()
        cur.close()
        return modulos
    
    # --- NOVO REQUISITO: Recomendação por Tags ---
    def get_cursos_by_tags(self, tags: List[str]) -> List[Tuple]:
        """
        Busca cursos que possuam pelo menos uma das tags fornecidas.
        A consulta utiliza JOINs e `GROUP BY` para agregar os dados e `IN` para filtrar pelas tags.
        """
        if not tags:
            return self.get_all_cursos()

        # Cria a string de placeholders '%s' para a cláusula IN
        placeholders = ', '.join(['%s'] * len(tags))
        
        # O filtro usa um INNER JOIN para garantir que o curso tenha pelo menos uma das tags
        # e o GROUP_CONCAT para retornar todas as tags do curso
        query = f"""
            SELECT DISTINCT
                c.id, 
                c.titulo, 
                c.descricao, 
                c.imagem_url, 
                u.username AS autor,
                GROUP_CONCAT(t_all.nome) AS tags
            FROM cursos c
            JOIN usuarios u ON c.id_autor = u.id
            LEFT JOIN curso_tags ct_filter ON c.id = ct_filter.id_curso
            LEFT JOIN tags t_filter ON ct_filter.id_tag = t_filter.id
            
            -- Re-join para pegar TODAS as tags do curso, não apenas as filtradas
            LEFT JOIN curso_tags ct_all ON c.id = ct_all.id_curso
            LEFT JOIN tags t_all ON ct_all.id_tag = t_all.id
            
            WHERE t_filter.nome IN ({placeholders})
            GROUP BY c.id
        """
        cur = self.mysql.connection.cursor()
        # Executa a consulta, passando a lista de tags como parâmetros
        cur.execute(query, tags)
        data = cur.fetchall()
        cur.close()
        return data

# --- Repositório de Perfis ---

class PerfilRepository:
    """Abstrai a lógica de acesso ao banco de dados para as informações do Perfil do Usuário."""
    def __init__(self, mysql: MySQL):
        self.mysql = mysql

    def get_cursos_salvos(self, usuario_id: int) -> List[Tuple]:
        """Busca a lista de cursos salvos de um usuário."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT c.id, c.titulo, c.descricao
            FROM cursos_salvos cs
            JOIN cursos c ON cs.curso_id = c.id
            WHERE cs.usuario_id = %s
        """, (usuario_id,))
        data = cur.fetchall()
        cur.close()
        return data

    def get_cursos_andamento(self, usuario_id: int) -> List[Tuple]:
        """Busca a lista de cursos em andamento de um usuário."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT c.id, c.titulo, ca.progresso
            FROM cursos_andamento ca
            JOIN cursos c ON ca.curso_id = c.id
            WHERE ca.usuario_id = %s
        """, (usuario_id,))
        data = cur.fetchall()
        cur.close()
        return data

    def get_planos_usuario(self, usuario_id: int) -> List[Tuple]:
        """Busca a lista de planos de estudo criados por um usuário."""
        cur = self.mysql.connection.cursor()
        cur.execute("""
            SELECT id, titulo, descricao, criado_em
            FROM planos
            WHERE usuario_id = %s
        """, (usuario_id,))
        data = cur.fetchall()
        cur.close()
        return data
