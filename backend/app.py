from flask import Flask
from flask_cors import CORS

from routes.plano_routes import plano_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(plano_bp)

if __name__ == "__main__":
    app.run(debug=True)
