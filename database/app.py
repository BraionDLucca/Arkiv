# app.py - Arquivo principal da API (Controller Refatorado e Seguro) - Rotas de Planos de Estudo

from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import config 

# Importa os Serviços (lógica de negócio)
from services import CursoService, PerfilService
# Importa o novo decorador de segurança JWT
from utils import jwt_required 

app = Flask(__name__)
CORS(app)

# Configurações do MySQL (uso centralizado do config.py)
app.config['MYSQL_HOST'] = config.MYSQL_HOST
app.config['MYSQL_USER'] = config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB
mysql = MySQL(app)

# Inicializa as camadas de Serviço APÓS a inicialização do MySQL
curso_service = CursoService(mysql)
perfil_service = PerfilService(mysql)


# Rota inicial (Verificação de saúde) - Rota Pública
@app.route('/')
def home():
    """Rota de saúde da API."""
    return "API do Arkiv Rodando!"

# --- Rotas de Cursos (Planos de Estudo) ---

# Endpoint de todos os cursos com tags - Rota Pública
@app.route('/cursos', methods=['GET'])
def get_cursos():
    """Retorna todos os planos de estudo cadastrados."""
    cursos = curso_service.get_all_cursos()
    return jsonify(cursos)

# 🔍 Endpoint de curso específico detalhado - Rota Pública
@app.route('/curso/<int:id>', methods=['GET'])
def get_curso(id):
    """Retorna os detalhes de um plano de estudo específico (tags, módulos, comentários)."""
    curso = curso_service.get_curso_detalhado(id)
    if curso:
        return jsonify(curso)
    return jsonify({'erro': 'Curso não encontrado'}), 404

# 🔥 NOVO ENDPOINT: Recomendação de cursos por Tags - Rota Protegida
@app.route('/recomendacoes', methods=['GET'])
@jwt_required # <--- Decorador aplicado aqui para exigir o login
def get_recomendacoes(current_user_id): # <--- Recebe o ID do usuário logado
    """
    Retorna planos de estudo recomendados baseados nas tags informadas.
    O decorador 'jwt_required' garante que o usuário esteja autenticado.
    """
    # Lógica de obtenção de tags (se for um filtro via query param)
    tags_str = request.args.get('tags')
    
    # 1. Obtenção das Tags
    if tags_str:
        tags = [tag.strip().lower() for tag in tags_str.split(',') if tag.strip()]
    else:
        # Futuramente, esta seção usará o 'current_user_id' para buscar tags do histórico
        tags = []

    # 2. Delegação ao Service
    cursos_recomendados = curso_service.get_cursos_recomendados_by_tags(tags)
    
    return jsonify(cursos_recomendados)


# --- Rotas de Perfil do Usuário ---
# Todas essas rotas agora exigem autenticação e verificam se o ID na URL corresponde ao ID do token.

# 🔖 Cursos salvos no perfil - Rota Protegida
@app.route('/perfil/<int:usuario_id>/salvos', methods=['GET'])
@jwt_required
def cursos_salvos(current_user_id, usuario_id): # Recebe o ID do token e o ID da rota
    """Retorna a lista de planos de estudo salvos pelo usuário."""
    # Autorização: Garante que o usuário só acesse o próprio perfil
    if current_user_id != usuario_id:
        return jsonify({"erro": "Acesso não autorizado a este perfil. IDs de usuário não coincidem."}), 403
        
    cursos = perfil_service.get_cursos_salvos(usuario_id)
    return jsonify(cursos)

# 🔥 Cursos em andamento no perfil - Rota Protegida
@app.route('/perfil/<int:usuario_id>/andamento', methods=['GET'])
@jwt_required
def cursos_andamento(current_user_id, usuario_id):
    """Retorna a lista de planos de estudo em andamento do usuário."""
    if current_user_id != usuario_id:
        return jsonify({"erro": "Acesso não autorizado a este perfil. IDs de usuário não coincidem."}), 403

    andamento = perfil_service.get_cursos_andamento(usuario_id)
    return jsonify(andamento)

# 📚 Planos de estudo do usuário - Rota Protegida
@app.route('/perfil/<int:usuario_id>/planos', methods=['GET'])
@jwt_required
def planos_usuario(current_user_id, usuario_id):
    """Retorna os planos criados por um usuário específico."""
    if current_user_id != usuario_id:
        return jsonify({"erro": "Acesso não autorizado a este perfil. IDs de usuário não coincidem."}), 403

    planos = perfil_service.get_planos_usuario(usuario_id)
    return jsonify(planos)


if __name__ == '__main__':
    app.run(debug=True)