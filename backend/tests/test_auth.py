from unittest.mock import MagicMock
from services.auth_service import AuthService


def test_auth_register_sucesso():
    mock_repo = MagicMock()
    mock_repo.criar_usuario.return_value = 1

    service = AuthService(mock_repo)
    dados = {
        "email": "teste@exemplo.com",
        "senha": "senhaSegura123"
    }

    resultado = service.register(dados)

    assert resultado["msg"] == "Usuário cadastrado com sucesso!"
    assert resultado["usuario_id"] == 1
    mock_repo.criar_usuario.assert_called_once()


def test_auth_login_senha_invalida():
    mock_repo = MagicMock()
    # Simula usuário não encontrado
    mock_repo.buscar_por_email.return_value = None

    service = AuthService(mock_repo)
    resultado = service.login("usuario@inexistente.com", "senha123")

    assert resultado is None
