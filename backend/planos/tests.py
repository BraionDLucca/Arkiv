import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Plano

Usuario = get_user_model()


@pytest.mark.django_db
class TestPlanosAPI:
    def setup_method(self):
        self.client = APIClient()
        self.user = Usuario.objects.create_user(
            username='autor',
            email='autor@test.com',
            password='senha123'
        )
        self.plano = Plano.objects.create(
            titulo='Plano de Teste',
            descricao='Descricao do plano de teste',
            autor=self.user
        )

    def test_listar_planos(self):
        url = reverse('plano-list')
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

    def test_obter_detalhe_plano(self):
        url = reverse('plano-detail', args=[self.plano.id])
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['titulo'] == 'Plano de Teste'
