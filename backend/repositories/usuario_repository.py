from database.connection import Database

class UsuarioRepository:

    def __init__(self, db: Database):
        self.db = db

    def criar_usuario(
        self,
        email,
        senha_hash
    ):
        sql = """
        INSERT INTO usuarios
        (
            email,
            password_hash
        )
        VALUES
        (
            %s,
            %s
        )
        """

        return self.db.execute(
            sql,
            (
                email,
                senha_hash
            )
        )

    def buscar_por_email(
        self,
        email
    ):
        sql = """
        SELECT
            id,
            password_hash
        FROM usuarios
        WHERE email=%s
        """

        result = self.db.query(
            sql,
            (email,)
        )

        return result[0] if result else None