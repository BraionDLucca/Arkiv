# auth.py - Rotas de Autenticação (Controller Refatorado)

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import config # Para acessar as configurações do MySQL
from services import AuthService # Importa a camada de Serviço

# --- Configuração Inicial ---
app = Flask(__name__)
CORS(app)

# Configurações do MySQL (usando o config.py centralizado)
app.config['MYSQL_HOST'] = config.MYSQL_HOST
app.config['MYSQL_USER'] = config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB

mysql = MySQL(app)
auth_service = AuthService(mysql) # Inicializa o Serviço de Autenticação

# --- Rotas ---

@app.route('/register', methods=['POST'])
def register():
    """Rota para registrar um novo usuário."""
    data = request.json
    username = data.get('username')
    senha = data.get('senha')
    
    if not username or not senha:
        return jsonify({"erro": "Nome de usuário e senha são obrigatórios."}), 400

    try:
        # A lógica de hashing e inserção está agora em AuthService
        auth_service.register_user(username, senha) 
        return jsonify({"msg": "Usuário cadastrado com sucesso!"}), 201
    except ValueError as e:
        # Erro de regra de negócio, ex: "Usuário já existe"
        return jsonify({"erro": str(e)}), 400
    except Exception as e:
        # Erro de banco de dados
        return jsonify({"erro": "Erro interno ao cadastrar usuário."}), 500


@app.route('/login', methods=['POST'])
def login():
    """Rota para autenticar o usuário e retornar um token JWT."""
    data = request.json
    username = data.get('username')
    senha = data.get('senha')

    if not username or not senha:
        return jsonify({"erro": "Nome de usuário e senha são obrigatórios."}), 400

    # A lógica de verificação de hash e geração de JWT está agora em AuthService
    token = auth_service.login_user(username, senha)
    
    if token:
        # Decodifica o token de bytes para string para ser enviado no JSON
        return jsonify({"token": token.decode('utf-8')})
        
    return jsonify({"erro": "Usuário ou senha incorretos"}), 401

if __name__ == "__main__":
    # Mantendo a porta 5001, como no seu código original
    app.run(port=5001, debug=True)