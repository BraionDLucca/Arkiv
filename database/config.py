from dotenv import load_dotenv
import os

# Carrega as variáveis do arquivo .env (deve estar na raiz do projeto)
load_dotenv()

# Configurações do MySQL (DB: USER, conforme o .env)
MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
MYSQL_USER = os.getenv('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', 'default_password')
MYSQL_DB = os.getenv('MYSQL_DB', 'USER')

# Configuração de Segurança
SECRET_KEY = os.getenv('SECRET_KEY')

# Garantia de que a chave secreta existe
if not SECRET_KEY:
    raise ValueError("SECRET_KEY não encontrada no arquivo .env")