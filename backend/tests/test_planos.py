import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from planos.models import (
    Avaliacao, Comentario, Modulo, Plano, PlanoAndamento,
    PlanoCriado, PlanoSalvo, Tag,
)

Usuario = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def usuario():
    return Usuario.objects.create_user(
        email="autor@teste.com",
        nome="Autor de Teste",
        password="SenhaSegura123!",
    )


@pytest.fixture
def plano(usuario):
    item = Plano.objects.create(
        titulo="Plano de Teste",
        descricao="Descrição do plano.",
        autor=usuario,
    )
    item.tags.add(Tag.objects.create(nome="Python"))
    return item


@pytest.mark.django_db
def test_nomes_de_tabelas_do_der():
    expected = {
        "usuarios", "planos", "modulos", "avaliacoes", "comentarios",
        "planos_andamento", "planos_salvos", "planos_criados", "tags",
        "plano_tags",
    }
    actual = {
        Usuario._meta.db_table,
        Plano._meta.db_table,
        Modulo._meta.db_table,
        Avaliacao._meta.db_table,
        Comentario._meta.db_table,
        PlanoAndamento._meta.db_table,
        PlanoSalvo._meta.db_table,
        PlanoCriado._meta.db_table,
        Tag._meta.db_table,
        Plano.tags.through._meta.db_table,
    }
    assert actual == expected


@pytest.mark.django_db
def test_listar_planos_publicos(api_client, plano):
    response = api_client.get("/api/planos/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["titulo"] == plano.titulo
    assert response.data[0]["autor_nome"] == "Autor de Teste"
    assert response.data[0]["tags"][0]["nome"] == "Python"


@pytest.mark.django_db
def test_criar_plano_exige_autenticacao(api_client):
    response = api_client.post("/api/planos/", {
        "titulo": "Plano sem login",
        "descricao": "Não deve ser criado",
    })
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_criar_plano_autenticado(api_client, usuario):
    api_client.force_authenticate(user=usuario)
    response = api_client.post("/api/planos/", {
        "titulo": "Plano novo",
        "descricao": "Criado via API",
    })
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["autor_nome"] == usuario.nome


@pytest.mark.django_db
def test_comentario_e_avaliacao(api_client, usuario, plano):
    api_client.force_authenticate(user=usuario)
    comentario = api_client.post("/api/comentarios/", {
        "plano": plano.id,
        "texto": "Muito bom!",
    })
    assert comentario.status_code == status.HTTP_201_CREATED

    avaliacao = api_client.post("/api/avaliacoes/", {
        "plano": plano.id,
        "nota": 5,
    })
    assert avaliacao.status_code == status.HTTP_201_CREATED
    assert Avaliacao.objects.filter(usuario=usuario, plano=plano).count() == 1


@pytest.mark.django_db
def test_andamento_salvo_e_criado(api_client, usuario, plano):
    api_client.force_authenticate(user=usuario)
    andamento = api_client.post("/api/planos-andamento/", {
        "plano": plano.id,
        "progresso": 35,
    })
    assert andamento.status_code == status.HTTP_201_CREATED
    assert PlanoAndamento.objects.get(usuario=usuario, plano=plano).progresso == 35

    salvo = api_client.post("/api/planos-salvos/", {"plano": plano.id})
    assert salvo.status_code == status.HTTP_201_CREATED
    assert PlanoSalvo.objects.filter(usuario=usuario, plano=plano).exists()

    criado = api_client.post("/api/planos-criados/", {
        "titulo": "Rascunho",
        "descricao": "Plano em elaboração",
    })
    assert criado.status_code == status.HTTP_201_CREATED
    assert PlanoCriado.objects.filter(usuario=usuario, titulo="Rascunho").exists()


@pytest.mark.django_db
def test_capitulos_conteudos_e_progresso(api_client, usuario, plano):
    from planos.models import Capitulo, Conteudo, ProgressoConteudo

    modulo = Modulo.objects.create(
        plano=plano,
        titulo="Fundamentos",
        descricao="Módulo introdutório",
        ordem=1,
    )
    capitulo = Capitulo.objects.create(
        modulo=modulo,
        titulo="Introdução",
        descricao="Primeiro capítulo",
        ordem=1,
    )
    conteudo = Conteudo.objects.create(
        capitulo=capitulo,
        titulo="Aula 1",
        tipo=Conteudo.TipoConteudo.TEXTO,
        dados="Conteúdo de teste",
        ordem=1,
    )

    api_client.force_authenticate(user=usuario)
    capitulos = api_client.get(f"/api/capitulos/?modulo={modulo.id}")
    assert capitulos.status_code == status.HTTP_200_OK
    assert capitulos.data[0]["titulo"] == "Introdução"
    assert capitulos.data[0]["conteudos"][0]["titulo"] == "Aula 1"
    assert capitulos.data[0]["total_conteudos"] == 1
    assert capitulos.data[0]["percentual_progresso"] == 0.0

    marcado = api_client.post(f"/api/conteudos/{conteudo.id}/marcar_acessado/")
    assert marcado.status_code == status.HTTP_201_CREATED
    assert ProgressoConteudo.objects.filter(usuario=usuario, conteudo=conteudo).exists()

    conteudos = api_client.get(f"/api/conteudos/?capitulo={capitulo.id}")
    assert conteudos.status_code == status.HTTP_200_OK
    assert conteudos.data[0]["acessado"] is True

    plano_response = api_client.get(f"/api/planos/{plano.id}/")
    assert plano_response.status_code == status.HTTP_200_OK
    assert plano_response.data["total_conteudos"] == 1
    assert plano_response.data["conteudos_acessados"] == 1
    assert plano_response.data["percentual_progresso"] == 100.0
