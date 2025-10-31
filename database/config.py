from dotenv import dotenv_values

# Carrega config do usuário (auth)
config_user = dotenv_values("config_user.env")
DB_USER_HOST = config_user.get("MYSQL_HOST")
DB_USER_NAME = config_user.get("MYSQL_USER")
DB_USER_PASS = config_user.get("MYSQL_PASSWORD")
DB_USER_DB   = config_user.get("MYSQL_DB")
SECRET_KEY   = config_user.get("SECRET_KEY")

# Carrega config dos planos (app.py)
config_planos = dotenv_values("config.env")
DB_PLANOS_HOST = config_planos.get("MYSQL_HOST")
DB_PLANOS_NAME = config_planos.get("MYSQL_USER")
DB_PLANOS_PASS = config_planos.get("MYSQL_PASSWORD")
DB_PLANOS_DB   = config_planos.get("MYSQL_DB")

# Carrega URL do frontend (app.py)
config_frontend = dotenv_values("../.env")
FRONTEND_URL = config_frontend.get("VITE_FRONTEND_URL")
