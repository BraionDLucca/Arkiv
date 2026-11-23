import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

Usuario = get_user_model()


@pytest.mark.django_db
def test_registro_e_login():
    client = APIClient()
    response = client.post(reverse("auth_register"), {
        "username": "Gabriel",
        "email": "gabriel@example.com",
        "password": "SenhaForte123!",
    })
    assert response.status_code == status.HTTP_201_CREATED
    user = Usuario.objects.get(email="gabriel@example.com")
    assert user.nome == "Gabriel"
    assert user.check_password("SenhaForte123!")

    login = client.post(reverse("token_obtain_pair"), {
        "email": "gabriel@example.com",
        "password": "SenhaForte123!",
    })
    assert login.status_code == status.HTTP_200_OK
    assert "access" in login.data
    assert "refresh" in login.data


@pytest.mark.django_db
def test_email_duplicado_rejeitado():
    Usuario.objects.create_user(
        email="duplicado@example.com",
        nome="Existente",
        password="SenhaForte123!",
    )
    response = APIClient().post(reverse("auth_register"), {
        "username": "Outro",
        "email": "duplicado@example.com",
        "password": "SenhaForte123!",
    })
    assert response.status_code == status.HTTP_400_BAD_REQUEST
