import jwt
from functools import wraps
from flask import request, jsonify
from datetime import datetime
import config # Importa o SECRET_KEY

def jwt_required(f):
    """
    Decorador para proteger rotas. 
    Verifica se a requisição possui um token JWT válido no cabeçalho 'Authorization'.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # 1. Tenta obter o token do cabeçalho
        token = None
        if 'Authorization' in request.headers:
            # Espera o formato: "Bearer <token>"
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                pass # Se o formato estiver incorreto, token permanece None

        # 2. Verifica se o token foi fornecido
        if not token:
            return jsonify({'erro': 'Token de autenticação ausente.'}), 401
        
        # 3. Tenta decodificar e validar o token
        try:
            # O jwt.decode já verifica a validade da expiração (campo 'exp')
            data = jwt.decode(token, config.SECRET_KEY, algorithms=["HS256"])
            current_user_id = data['user_id']
            
        except jwt.ExpiredSignatureError:
            return jsonify({'erro': 'Token expirado. Faça login novamente.'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'erro': 'Token inválido.'}), 401

        # 4. Passa o ID do usuário autenticado para a função da rota
        return f(current_user_id, *args, **kwargs)

    return decorated