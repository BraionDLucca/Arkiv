from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)

# Configurações do MySQL
app.config['MYSQL_HOST'] = config.MYSQL_HOST
app.config['MYSQL_USER'] = config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB
mysql = MySQL(app)

# Rota inicial
@app.route('/')
def home():
    return "API de Cursos Rodando!"

# Endpoint de cursos com tags
@app.route('/cursos', methods=['GET'])
def get_cursos():
    cur = mysql.connection.cursor()
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

    cursos = []
    for row in data:
        cursos.append({
            'id': row[0],
            'titulo': row[1],
            'descricao': row[2],
            'imagem_url': row[3],
            'autor': row[4],
            'tags': row[5].split(',') if row[5] else []
        })

    return jsonify(cursos)

# 🔍 Endpoint de curso específico com tags, comentários, nota, modulos
@app.route('/curso/<int:id>', methods=['GET'])
def get_curso(id):
    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT c.id, c.titulo, c.descricao, c.imagem_url, u.nome AS autor, c.data_publicacao
        FROM cursos c
        JOIN usuarios u ON c.id_autor = u.id
        WHERE c.id = %s
    """, (id,))
    curso_data = cur.fetchone()

    if not curso_data:
        return jsonify({'erro': 'Curso não encontrado'}), 404

    cur.execute("""
        SELECT t.nome
        FROM curso_tags ct
        JOIN tags t ON ct.id_tag = t.id
        WHERE ct.id_curso = %s
    """, (id,))
    tags = [tag[0] for tag in cur.fetchall()]

    cur.execute("""
        SELECT u.nome, cm.texto, cm.data
        FROM comentarios cm
        JOIN usuarios u ON cm.id_usuario = u.id
        WHERE cm.id_curso = %s
    """, (id,))
    comentarios = [{'autor': row[0], 'texto': row[1], 'data': str(row[2])} for row in cur.fetchall()]

    cur.execute("""
        SELECT AVG(nota)
        FROM avaliacoes
        WHERE id_curso = %s
    """, (id,))
    nota = cur.fetchone()[0]

    cur.execute("""
        SELECT titulo
        FROM modulos
        WHERE id_curso = %s
        ORDER BY ordem
    """, (id,))
    modulos = [row[0] for row in cur.fetchall()]

    cur.close()

    curso = {
        'id': curso_data[0],
        'titulo': curso_data[1],
        'descricao': curso_data[2],
        'imagem_url': curso_data[3],
        'autor': curso_data[4],
        'data_publicacao': str(curso_data[5]),
        'tags': tags,
        'comentarios': comentarios,
        'nota_media': round(nota, 2) if nota else None,
        'modulos': modulos
    }

    return jsonify(curso)

# 🔖 Cursos salvos no perfil
@app.route('/perfil/<int:usuario_id>/salvos', methods=['GET'])
def cursos_salvos(usuario_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT c.id, c.titulo, c.descricao
        FROM cursos_salvos cs
        JOIN cursos c ON cs.curso_id = c.id
        WHERE cs.usuario_id = %s
    """, (usuario_id,))
    data = cur.fetchall()
    cur.close()

    cursos = [{'id': row[0], 'titulo': row[1], 'descricao': row[2]} for row in data]
    return jsonify(cursos)

# 🔥 Cursos em andamento no perfil
@app.route('/perfil/<int:usuario_id>/andamento', methods=['GET'])
def cursos_andamento(usuario_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT c.id, c.titulo, ca.progresso
        FROM cursos_andamento ca
        JOIN cursos c ON ca.curso_id = c.id
        WHERE ca.usuario_id = %s
    """, (usuario_id,))
    data = cur.fetchall()
    cur.close()

    andamento = [{'id': row[0], 'titulo': row[1], 'progresso': row[2]} for row in data]
    return jsonify(andamento)

# 📚 Planos de estudo do usuário
@app.route('/perfil/<int:usuario_id>/planos', methods=['GET'])
def planos_usuario(usuario_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT id, titulo, descricao, criado_em
        FROM planos
        WHERE usuario_id = %s
    """, (usuario_id,))
    data = cur.fetchall()
    cur.close()

    planos = [{'id': row[0], 'titulo': row[1], 'descricao': row[2], 'criado_em': str(row[3])} for row in data]
    return jsonify(planos)

if __name__ == '__main__':
    app.run(debug=True)
