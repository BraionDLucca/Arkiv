import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

Usuario = get_user_model()


@pytest.mark.django_db
class TestAuthenticationAPI:
    def setup_method(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.token_url = reverse('token_obtain_pair')
        self.me_url = reverse('auth_me')

    def test_registro_usuario_com_sucesso(self):
        payload = {
            'username': 'lucastest',
            'email': 'lucas@test.com',
            'password': 'senhaForte123@',
        }
        response = self.client.post(self.register_url, payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert Usuario.objects.filter(email='lucas@test.com').exists()

    def test_registro_email_duplicado(self):
        Usuario.objects.create_user(
            username='existente',
            email='lucas@test.com',
            password='senhaForte123@',
        )
        payload = {
            'username': 'novousuario',
            'email': 'lucas@test.com',
            'password': 'senhaForte123@',
        }
        response = self.client.post(self.register_url, payload)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_obter_token_jwt(self):
        user = Usuario.objects.create_user(
            username='lucaslogin',
            email='login@test.com',
            password='senhaForte123@',
        )
        assert str(user) == 'login@test.com'
        payload = {
            'email': 'login@test.com',
            'password': 'senhaForte123@',
        }
        response = self.client.post(self.token_url, payload)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data

    def test_perfil_usuario_autenticado(self):
        user = Usuario.objects.create_user(
            username='alunoperfil',
            email='perfil@test.com',
            password='senhaForte123@',
        )
        self.client.force_authenticate(user=user)
        response = self.client.get(self.me_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['email'] == 'perfil@test.com'
        assert response.data['username'] == 'alunoperfil'
        assert response.data['total_planos_criados'] == 0
        assert response.data['total_conteudos_concluidos'] == 0

    def test_perfil_usuario_nao_autenticado(self):
        response = self.client.get(self.me_url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_atualizar_perfil_usuario(self):
        user = Usuario.objects.create_user(
            username='alunoupdate',
            email='update@test.com',
            password='senhaForte123@',
        )
        self.client.force_authenticate(user=user)
        payload = {'first_name': 'Lucas', 'last_name': 'Silva'}
        response = self.client.patch(self.me_url, payload)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['first_name'] == 'Lucas'
        assert response.data['last_name'] == 'Silva'
