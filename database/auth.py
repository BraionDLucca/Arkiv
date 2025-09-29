from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import mysql.connector
import bcrypt
import jwt
from datetime import datetime, timedelta
from config import DB_USER_HOST, DB_USER_NAME, DB_USER_PASS, DB_USER_DB, SECRET_KEY

auth_bp = Blueprint("auth", __name__)

# ---------------------- Banco ----------------------
class Database:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host=DB_USER_HOST,
            user=DB_USER_NAME,
            password=DB_USER_PASS,
            database=DB_USER_DB
        )
        self.cursor = self.conn.cursor(dictionary=True)

    def query(self, sql, params=None):
        self.cursor.execute(sql, params or ())
        return self.cursor.fetchall()

    def execute(self, sql, params=None):
        self.cursor.execute(sql, params or ())
        self.conn.commit()
        return self.cursor.lastrowid

    def close(self):
        self.cursor.close()
        self.conn.close()

# ---------------------- Repositório ----------------------
class UsuarioRepository:
    def __init__(self, db: Database):
        self.db = db

    def criar_usuario(self, email, senha_hash):
        sql = "INSERT INTO usuarios (email, password_hash) VALUES (%s, %s)"
        return self.db.execute(sql, (email, senha_hash))

    def buscar_por_email(self, email):
        sql = "SELECT id, password_hash FROM usuarios WHERE email=%s"
        result = self.db.query(sql, (email,))
        return result[0] if result else None

# ---------------------- Serviço ----------------------
class AuthService:
    def __init__(self, repo: UsuarioRepository):
        self.repo = repo
        self.secret_key = SECRET_KEY

    def register(self, data):
        # Campos obrigatórios
        try:
            email = data["email"]
            senha = data["senha"]
        except KeyError as e:
            raise ValueError(f"Campo obrigatório ausente: {e.args[0]}")

        senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt()).decode()
        usuario_id = self.repo.criar_usuario(email, senha_hash)
        return {"msg": "Usuário cadastrado com sucesso!", "usuario_id": usuario_id}

    def login(self, email, senha):
        user = self.repo.buscar_por_email(email)
        if user and bcrypt.checkpw(senha.encode(), user['password_hash'].encode()):
            usuario_id = user['id']
            token = jwt.encode({
                "user_id": usuario_id,
                "exp": datetime.utcnow() + timedelta(hours=1)
            }, self.secret_key, algorithm="HS256")
            return {"token": token}
        return None

# ---------------------- Helpers ----------------------
def get_auth_service():
    db = Database()
    repo = UsuarioRepository(db)
    return AuthService(repo), db

# ---------------------- Rotas ----------------------
@auth_bp.route('/register', methods=['POST'])
@cross_origin()  # permite requests de qualquer origem
def register():
    data = request.json
    service, db = get_auth_service()
    try:
        result = service.register(data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    finally:
        db.close()

@auth_bp.route('/login', methods=['POST'])
@cross_origin()  # permite requests de qualquer origem
def login():
    data = request.json
    service, db = get_auth_service()
    try:
        result = service.login(data['email'], data['senha'])
        if result:
            return jsonify(result)
        return jsonify({"erro": "Usuário ou senha incorretos"}), 401
    finally:
        db.close()