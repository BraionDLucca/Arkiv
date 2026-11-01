import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from planos.models import Capitulo, Conteudo, Modulo, Plano

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create_user(
        username='aluno_teste',
        email='aluno@teste.com',
        password='senhaSegura123'
    )


@pytest.mark.django_db
class TestHierarquiaEProgresso:

    def test_criacao_hierarquia_completa(self, user):
        plano = Plano.objects.create(
            titulo='Plano Backend Django',
            descricao='Dominando arquitetura REST',
            autor=user
        )
        modulo = Modulo.objects.create(plano=plano, titulo='Módulo 1', ordem=1)
        capitulo = Capitulo.objects.create(modulo=modulo, titulo='Capítulo 1', ordem=1)
        conteudo = Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Artigo de Introdução',
            tipo=Conteudo.TipoConteudo.TEXTO,
            dados='Conteúdo explicativo sobre DRF',
            ordem=1
        )

        assert modulo.plano == plano
        assert capitulo.modulo == modulo
        assert conteudo.capitulo == capitulo
        assert conteudo.tipo == 'texto'

    def test_marcar_acessado_e_calculo_progresso(self, api_client, user):
        plano = Plano.objects.create(
            titulo='Plano de Testes',
            descricao='Validação de métricas',
            autor=user
        )
        modulo = Modulo.objects.create(plano=plano, titulo='Módulo 1', ordem=1)
        capitulo = Capitulo.objects.create(modulo=modulo, titulo='Capítulo 1', ordem=1)

        c1 = Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Aula 1',
            tipo=Conteudo.TipoConteudo.VIDEO,
            dados='https://video.url/1',
            ordem=1
        )
        Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Aula 2',
            tipo=Conteudo.TipoConteudo.VIDEO,
            dados='https://video.url/2',
            ordem=2
        )

        api_client.force_authenticate(user=user)

        res_plano = api_client.get(f'/api/planos/{plano.id}/')
        assert res_plano.status_code == status.HTTP_200_OK
        assert res_plano.data['total_conteudos'] == 2
        assert res_plano.data['conteudos_acessados'] == 0
        assert res_plano.data['percentual_progresso'] == 0.0

        res_acesso = api_client.post(f'/api/conteudos/{c1.id}/marcar_acessado/')
        assert res_acesso.status_code in [status.HTTP_200_OK, status.HTTP_201_CREATED]
        assert res_acesso.data['status'] == 'acessado'

        res_plano_pos = api_client.get(f'/api/planos/{plano.id}/')
        assert res_plano_pos.data['conteudos_acessados'] == 1
        assert res_plano_pos.data['percentual_progresso'] == 50.0
