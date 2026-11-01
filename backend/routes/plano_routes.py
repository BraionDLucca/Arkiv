from flask import Blueprint
from flask import jsonify
from flask import request

from database.connection import Database
from repositories.plano_repository import PlanoRepository

from config import (
    DB_PLANOS_HOST,
    DB_PLANOS_NAME,
    DB_PLANOS_PASS,
    DB_PLANOS_DB
)

plano_bp = Blueprint(
    "planos",
    __name__
)


def get_plano_db():
    return Database(
        host=DB_PLANOS_HOST,
        user=DB_PLANOS_NAME,
        password=DB_PLANOS_PASS,
        database=DB_PLANOS_DB
    )


@plano_bp.route("/")
def home():
    msg = "API rodando! Use /planos, /usuarios, /cursos, /comentarios ou /avaliacoes"
    return jsonify({"msg": msg})


@plano_bp.route("/planos/<int:plano_id>", methods=["GET"])
def get_plano(plano_id):

    db = get_plano_db()

    repo = PlanoRepository(db)

    plano = repo.get_plano_by_id(plano_id)

    if not plano:
        db.close()
        return jsonify({
            "error": "Plano não encontrado"
        }), 404
    plano["tags"] = repo.get_tags_by_plano_id(plano_id)
    plano["modulos"] = repo.get_modulos_by_plano_id(plano_id)
    plano["comentarios"] = repo.get_comentarios_by_plano_id(plano_id)

    db.close()
    return jsonify(plano)


@plano_bp.route("/planos/recomendados", methods=["GET"])
def get_recomendados():
    tags = request.args.get("tags")
    if not tags:
        return jsonify({
            "error": "Informe pelo menos uma tag"
        }), 400
    tags_list = tags.split(",")
    db = get_plano_db()
    repo = PlanoRepository(db)
    planos_basicos = repo.get_planos_by_tags(tags_list)
    planos_completos = []

    for plano in planos_basicos:
        plano_id = plano["id"]
        plano["tags"] = repo.get_tags_by_plano_id(
            plano_id
        )
        autor_info = repo.get_plano_by_id(
            plano_id
        )
        if autor_info:
            plano["autor"] = autor_info.get(
                "autor"
            )

        sql_avaliacao = """
        SELECT ROUND(
            AVG(nota),
            2
        ) AS media
        FROM avaliacoes
        WHERE id_plano = %s
        """

        resultado_avaliacao = repo.db.query(
            sql_avaliacao,
            (plano_id,)
        )

        plano["media_avaliacao"] = (
            resultado_avaliacao[0]["media"]
            if resultado_avaliacao
            else None
        )

        sql_comentarios = """
        SELECT COUNT(*) AS total
        FROM comentarios
        WHERE id_plano = %s
        """

        resultado_comentarios = repo.db.query(
            sql_comentarios,
            (plano_id,)
        )

        plano["total_comentarios"] = (
            resultado_comentarios[0]["total"]
            if resultado_comentarios
            else 0
        )

        planos_completos.append(
            plano
        )

    db.close()

    return jsonify(
        planos_completos
    )


@plano_bp.route("/planos/todos", methods=["GET"])
def planos_todos():

    db = get_plano_db()

    repo = PlanoRepository(db)

    planos = repo.get_planos_todos()

    db.close()

    return jsonify(planos)


def generic_get_all(route, table_name):

    @plano_bp.route(
        route,
        methods=["GET"],
        endpoint=f"get_all_{table_name}"
    )
    def get_all():

        db = get_plano_db()

        data = db.query(
            f"SELECT * FROM {table_name}"
        )

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
