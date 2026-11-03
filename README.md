

<p align="center">
  <img src="logo.png" alt="Arkiv logo"/>
</p>

<h1 align="center">
  Arkiv
</h1>

<p align="center">
  Uma plataforma para organizar e compartilhar materiais e recursos educativos, otimizando tempo e aprendizado.
</p>

## Instalação

1. Clone este repositório:

    ```
    git clone https://github.com/BraionDLucca/Arkiv
    ```

2. Instale as dependências:

    - Frontend (`src/`):
        ```
        npm install
        ```

    - Backend (`backend/`):
        ```bash
        cd backend
        python -m venv venv
        # No Windows:
        venv\Scripts\activate
        # No Linux/Mac:
        source venv/bin/activate

        pip install -r requirements.txt
        ```

## Execução

1. **Backend (Django):**

    Navegue até a pasta do backend, ative o ambiente virtual e execute as migrações do banco de dados antes de iniciar o servidor:

    ```bash
    cd backend

    # Executar as migrações das tabelas do Django
    python manage.py migrate

    # Iniciar o servidor de desenvolvimento
    python manage.py runserver
    ```
    O backend estará rodando em `http://127.0.0.1:8000/`.

2. **Frontend (React + Vite):**

    Em outro terminal, navegue até a pasta do frontend e inicie a aplicação:

    ```bash
    cd frontend
    npm run dev
    ```
    O frontend estará acessível no endereço indicado pelo Vite (geralmente `http://localhost:5173/`).
