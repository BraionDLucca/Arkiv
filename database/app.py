from flask import Flask, request, jsonify
from auth import auth_bp
import mysql.connector
from mysql.connector import Error
from config import DB_PLANOS_HOST, DB_PLANOS_NAME, DB_PLANOS_PASS, DB_PLANOS_DB
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")


class Database:
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(
                host=DB_PLANOS_HOST,
                user=DB_PLANOS_NAME,
                password=DB_PLANOS_PASS,
                database=DB_PLANOS_DB
            )
            self.cursor = self.conn.cursor(dictionary=True)
        except Error as e:
            print("Erro ao conectar ao MySQL:", e)
            self.conn = None
            self.cursor = None

    def query(self, sql, params=None):
        try:
            if not self.cursor:
                return []
            self.cursor.execute(sql, params or ())
            return self.cursor.fetchall()
        except Error as e:
            print("Erro na query:", e)
            return []

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()


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

@app.route("/")
def home():
    return jsonify({
        "msg": "API rodando! Use /planos, /usuarios, /cursos, /comentarios ou /avaliacoes"
    })


@app.route("/planos/<int:plano_id>", methods=["GET"])
def get_plano(plano_id):
    db = Database()
    repo = PlanoRepository(db)
    plano = repo.get_plano_by_id(plano_id)
    if not plano:
        db.close()
        return jsonify({"error": "Plano não encontrado"}), 404

    plano["tags"] = repo.get_tags_by_plano_id(plano_id)
    plano["modulos"] = repo.get_modulos_by_plano_id(plano_id)
    plano["comentarios"] = repo.get_comentarios_by_plano_id(plano_id)

    db.close()
    return jsonify(plano)


@app.route("/planos/recomendados", methods=["GET"])
def get_recomendados():
    tags = request.args.get("tags")
    if not tags:
        return jsonify({"error": "Informe pelo menos uma tag"}), 400
    tags_list = tags.split(",")
    db = Database()
    repo = PlanoRepository(db)
    planos = repo.get_planos_by_tags(tags_list)
    db.close()
    return jsonify(planos)


@app.route("/planos/todos", methods=["GET"])
def planos_todos():
    db = Database()
    repo = PlanoRepository(db)
    planos = repo.get_planos_todos()
    db.close()
    return jsonify(planos)


def generic_get_all(route, table_name):
    @app.route(route, methods=["GET"], endpoint=f"get_all_{table_name}")
    def get_all():
        db = Database()
        data = db.query(f"SELECT * FROM {table_name}")
        db.close()
        return jsonify(data)
    return get_all


generic_get_all("/usuarios", "usuarios")
generic_get_all("/cursos", "cursos")
generic_get_all("/tags", "tags")
generic_get_all("/curso_tags", "curso_tags")
generic_get_all("/comentarios", "comentarios")
generic_get_all("/avaliacoes", "avaliacoes")
generic_get_all("/modulos", "modulos")
generic_get_all("/cursos_salvos", "cursos_salvos")
generic_get_all("/cursos_andamento", "cursos_andamento")


if __name__ == "__main__":
    print("Servidor Flask iniciado!")
    app.run(debug=True)