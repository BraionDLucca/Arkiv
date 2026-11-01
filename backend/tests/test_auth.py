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

    def test_registro_usuario_com_sucesso(self):
        payload = {
            'username': 'lucastest',
            'email': 'lucas@test.com',
            'password': 'senhaForte123@'
        }
        response = self.client.post(self.register_url, payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert Usuario.objects.filter(email='lucas@test.com').exists()

    def test_login_obter_token_jwt(self):
        Usuario.objects.create_user(
            username='lucaslogin',
            email='login@test.com',
            password='senhaForte123@'
        )
        payload = {
            'email': 'login@test.com',
            'password': 'senhaForte123@'
        }
        response = self.client.post(self.token_url, payload)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
