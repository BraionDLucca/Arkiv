from database.connection import Database
class PlanoRepository:
    def __init__(self, db: Database):
        self.db = db

    def get_plano_by_id(self, plano_id):
        sql = """
        SELECT p.*, u.nome AS autor
        FROM planos p
        LEFT JOIN usuarios u ON p.id_autor = u.id
        WHERE p.id = %s
        """
        plano = self.db.query(sql, (plano_id,))
        return plano[0] if plano else None

    def get_planos_by_tags(self, tags):
        placeholders = ",".join(["%s"] * len(tags))
        sql = f"""
        SELECT DISTINCT p.*
        FROM planos p
        JOIN plano_tags pt ON p.id = pt.id_plano
        JOIN tags t ON pt.id_tag = t.id
        WHERE t.nome IN ({placeholders})
        """
        return self.db.query(sql, tags)
    
    def get_tags_by_plano_id(self, plano_id):
        sql = """
        SELECT t.nome
        FROM tags t
        JOIN plano_tags pt ON t.id = pt.id_tag
        WHERE pt.id_plano = %s
        """
        results = self.db.query(sql, (plano_id,))
        return [tag["nome"] for tag in results]
    
    def get_modulos_by_plano_id(self, plano_id):
        sql = """
        SELECT id, titulo, ordem
        FROM modulos
        WHERE id_plano = %s
        ORDER BY ordem ASC
        """
        return self.db.query(sql, (plano_id,))
    
    def get_comentarios_by_plano_id(self, plano_id):
        sql = """
        SELECT id, id_usuario, texto, data
        FROM comentarios
        WHERE id_plano = %s
        ORDER BY data DESC
        """
        return self.db.query(sql, (plano_id,))

    def get_planos_todos(self):
        sql = """
        SELECT 
        p.id,
        p.titulo,
        p.descricao,
        p.imagem_url,
        p.data_publicacao,
        u.nome AS autor,
        COUNT(DISTINCT c.id) AS total_comentarios,
        ROUND(AVG(a.nota), 2) AS media_avaliacao
        FROM planos p
        LEFT JOIN usuarios u ON p.id_autor = u.id
        LEFT JOIN comentarios c ON c.id_plano = p.id
        LEFT JOIN avaliacoes a ON a.id_plano = p.id
        GROUP BY p.id, p.titulo, p.descricao, p.imagem_url, p.data_publicacao, u.nome
        """
        planos = self.db.query(sql)

        # Adiciona as tags de cada plano
        for plano in planos:
            plano["tags"] = self.get_tags_by_plano_id(plano["id"])

        return planos