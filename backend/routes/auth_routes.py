from flask import Blueprint
from flask import request
from flask import jsonify

from flask_cors import cross_origin
from database.connection import Database
from repositories.usuario_repository import UsuarioRepository
from services.auth_service import AuthService

from config import (
    DB_USER_HOST,
    DB_USER_NAME,
    DB_USER_PASS,
    DB_USER_DB
)

auth_bp = Blueprint(
    "auth",
    __name__
)
def get_auth_service():

    db = Database(
        host=DB_USER_HOST,
        user=DB_USER_NAME,
        password=DB_USER_PASS,
        database=DB_USER_DB
    )

    repo = UsuarioRepository(db)

    service = AuthService(repo)

    return service, db


@auth_bp.route("/register", methods=["POST"])
@cross_origin()
def register():

    data = request.json

    service, db = get_auth_service()

    try:

        result = service.register(data)

        return jsonify(result), 201

    except Exception as e:

        return jsonify({
            "erro": str(e)
        }), 400

    finally:

        db.close()


@auth_bp.route("/login", methods=["POST"])
@cross_origin()
def login():

    data = request.json

    service, db = get_auth_service()

    try:

        result = service.login(
            data["email"],
            data["senha"]
        )

        if result:

            return jsonify(result)

        return jsonify({
            "erro": "Usuário ou senha incorretos"
        }), 401

    finally:

        db.close()