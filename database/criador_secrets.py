#cria nossa chave para criptografar os dados

import secrets

chave_secreta = secrets.token_hex(32)
print(chave_secreta)
