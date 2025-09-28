from flask import Blueprint, request, jsonify
import mysql.connector
import bcrypt
import jwt
from datetime import datetime, timedelta
from config import DB_USER_HOST, DB_USER_NAME, DB_USER_PASS, DB_USER_DB, SECRET_KEY

auth_bp = Blueprint("auth", __name__)


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


class UsuarioRepository:
    def __init__(self, db: Database):
        self.db = db

    def criar_usuario(self, username, senha_hash):
        sql = "INSERT INTO usuarios (nome, password_hash) VALUES (%s, %s)"
        return self.db.execute(sql, (username, senha_hash))

    def criar_cadastro(self, usuario_id, nome_completo, email, telefone=None, data_nascimento=None):
        sql = """
            INSERT INTO cadastros (usuario_id, nome_completo, email, telefone, data_nascimento)
            VALUES (%s, %s, %s, %s, %s)
        """
        self.db.execute(sql, (usuario_id, nome_completo, email, telefone, data_nascimento))

    def buscar_por_username(self, username):
        sql = "SELECT id, password_hash FROM usuarios WHERE nome=%s"
        result = self.db.query(sql, (username,))
        return result[0] if result else None

    def buscar_cadastro(self, usuario_id):
        sql = """
            SELECT nome_completo, email, telefone, data_nascimento, data_criacao
            FROM cadastros
            WHERE usuario_id = %s
        """
        result = self.db.query(sql, (usuario_id,))
        return result[0] if result else None


class AuthService:
    def __init__(self, repo: UsuarioRepository):
        self.repo = repo
        self.secret_key = SECRET_KEY

    def register(self, data):
        username = data["username"]
        senha = data["senha"]
        nome_completo = data["nome_completo"]
        email = data["email"]
        telefone = data.get("telefone")
        data_nascimento = data.get("data_nascimento")

        senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt()).decode()
        usuario_id = self.repo.criar_usuario(username, senha_hash)
        self.repo.criar_cadastro(usuario_id, nome_completo, email, telefone, data_nascimento)
        return {"msg": "Usuário cadastrado com sucesso!", "usuario_id": usuario_id}

    def login(self, username, senha):
        user = self.repo.buscar_por_username(username)
        if user and bcrypt.checkpw(senha.encode(), user['password_hash'].encode()):
            usuario_id = user['id']
            cadastro = self.repo.buscar_cadastro(usuario_id)
            token = jwt.encode({
                "user_id": usuario_id,
                "exp": datetime.utcnow() + timedelta(hours=1)
            }, self.secret_key, algorithm="HS256")
            return {"token": token, "cadastro": cadastro}
        return None

def get_auth_service():
    db = Database()
    repo = UsuarioRepository(db)
    return AuthService(repo), db

@auth_bp.route('/register', methods=['POST'])
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
def login():
    data = request.json
    service, db = get_auth_service()
    try:
        result = service.login(data['username'], data['senha'])
        if result:
            return jsonify(result)
        return jsonify({"erro": "Usuário ou senha incorretos"}), 401
    finally:
        db.close()



