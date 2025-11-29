

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

    - Backend (`database/`):

        ```
        cd database
        pip install -r requirements.txt
        ```

## Execução

Para executar o projeto, você precisa ter um banco MySQL com a estrutura e dados necessários.

1. Acesse a pasta `src/database/sql`.

2. Dentro dela, você encontrará duas pastas:

    - `schema/` = arquivos `.sql` responsáveis por criar os schemas "planos" e "USER"

    - `seed/` = arquivos `.sql` para inserir mocks

3. Execute os arquivos da pasta `schema` no MySQL Workbench para criar a estrutura do banco.

4. Execute os arquivos da pasta `seed` para popular com dados mock (se quiser usar seus próprios dados, pule esta etapa).

5. Em `database/`, configure o acesso do backend ao banco informando host, usuário e senha:

    - `config.env` = conexão do schema "planos"

    - `config_user.env` = conexão do schema "USER"

    Se tiver alterado os nomes de schema, atualize também nesses arquivos `.env`.

6. Inicie em ambiente de desenvolvimento:

    - Frontend (`src/`):

        ```
        npm run dev
        ```

    - Backend (`database/`):

        ```
        cd database
        python app.py
        ```