import bcrypt
import jwt

from datetime import datetime
from datetime import timedelta

from config import SECRET_KEY

class AuthService:

    def __init__(self, repo):
        self.repo = repo

    def register(self, data):

        email = data["email"]
        senha = data["senha"]

        senha_hash = bcrypt.hashpw(
            senha.encode(),
            bcrypt.gensalt()
        ).decode()

        usuario_id = self.repo.criar_usuario(
            email,
            senha_hash
        )

        return {
            "msg": "Usuário cadastrado com sucesso!",
            "usuario_id": usuario_id
        }

    def login(
        self,
        email,
        senha
    ):

        user = self.repo.buscar_por_email(
            email
        )

        if user and bcrypt.checkpw(
            senha.encode(),
            user["password_hash"].encode()
        ):

            token = jwt.encode(
                {
                    "user_id": user["id"],
                    "exp": datetime.utcnow() + timedelta(hours=1)
                },
                SECRET_KEY,
                algorithm="HS256"
            )

            return {
                "token": token
            }

        return None