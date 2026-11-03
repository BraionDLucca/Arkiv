import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from planos.models import (
    Avaliacao,
    Capitulo,
    Comentario,
    Conteudo,
    Modulo,
    Plano,
    ProgressoConteudo,
    Tag,
)

Usuario = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def autor():
    return Usuario.objects.create_user(
        username='autor_teste',
        email='autor@teste.com',
        password='senhaSegura123',
    )


@pytest.fixture
def outro_usuario():
    return Usuario.objects.create_user(
        username='outro_aluno',
        email='outro@teste.com',
        password='senhaSegura123',
    )


@pytest.fixture
def tag_python():
    return Tag.objects.create(nome='Python')


@pytest.fixture
def tag_django():
    return Tag.objects.create(nome='Django')


@pytest.fixture
def plano_exemplo(autor, tag_python):
    plano = Plano.objects.create(
        titulo='Plano de Teste Completo',
        descricao='Descrição detalhada do plano de teste.',
        autor=autor,
        imagem_url='https://example.com/banner.png',
    )
    plano.tags.add(tag_python)
    return plano


@pytest.mark.django_db
class TestModelosHierarquia:
    def test_str_representations(self, plano_exemplo, autor, tag_python):
        modulo = Modulo.objects.create(
            plano=plano_exemplo,
            titulo='Módulo 1',
            ordem=1
        )
        capitulo = Capitulo.objects.create(
            modulo=modulo,
            titulo='Capítulo 1',
            ordem=1
        )
        conteudo = Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Aula 1',
            tipo=Conteudo.TipoConteudo.TEXTO,
            dados='Texto da aula',
            ordem=1
        )
        progresso = ProgressoConteudo.objects.create(
            usuario=autor,
            conteudo=conteudo
        )

        assert str(tag_python) == 'Python'
        assert str(plano_exemplo) == 'Plano de Teste Completo'
        assert str(modulo) == f"{plano_exemplo.titulo} - Módulo 1"
        assert str(capitulo) == "Módulo 1 - Capítulo 1"
        assert str(conteudo) == "Capítulo 1 - Aula 1 (texto)"
        assert f"User {autor.id}" in str(progresso)


@pytest.mark.django_db
class TestPlanoAPI:
    def test_listar_planos_publico(self, api_client, plano_exemplo):
        response = api_client.get('/api/planos/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1
        primeiro = response.data[0]
        assert primeiro['titulo'] == plano_exemplo.titulo
        assert primeiro['autor_nome'] == 'autor_teste'
        assert primeiro['autor_email'] == 'autor@teste.com'
        assert len(primeiro['tags']) == 1

    def test_criar_plano_anonimo_negado(self, api_client):
        payload = {
            'titulo': 'Plano Sem Auth',
            'descricao': 'Não deve funcionar',
        }
        response = api_client.post('/api/planos/', payload)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_criar_plano_autenticado_com_tags(
        self, api_client, autor, tag_python, tag_django
    ):
        api_client.force_authenticate(user=autor)
        payload = {
            'titulo': 'Novo Plano com Tags',
            'descricao': 'Criando com tags específicas',
            'tag_ids': [tag_python.id, tag_django.id],
        }
        response = api_client.post('/api/planos/', payload)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['titulo'] == 'Novo Plano com Tags'
        assert len(response.data['tags']) == 2
        assert response.data['autor_nome'] == autor.username

    def test_editar_plano_proprietario_vs_terceiro(
        self, api_client, autor, outro_usuario, plano_exemplo
    ):
        # Terceiro tentando editar -> 403 Forbidden
        api_client.force_authenticate(user=outro_usuario)
        res_fail = api_client.patch(
            f'/api/planos/{plano_exemplo.id}/',
            {'titulo': 'Tentativa Hacker'}
        )
        assert res_fail.status_code == status.HTTP_403_FORBIDDEN

        # Autor editando -> 200 OK
        api_client.force_authenticate(user=autor)
        res_ok = api_client.patch(
            f'/api/planos/{plano_exemplo.id}/',
            {'titulo': 'Título Atualizado'}
        )
        assert res_ok.status_code == status.HTTP_200_OK
        assert res_ok.data['titulo'] == 'Título Atualizado'

    def test_deletar_plano_proprietario(self, api_client, autor, plano_exemplo):
        api_client.force_authenticate(user=autor)
        response = api_client.delete(f'/api/planos/{plano_exemplo.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Plano.objects.filter(id=plano_exemplo.id).exists()


@pytest.mark.django_db
class TestFiltrosEBusca:
    def test_busca_por_titulo(self, api_client, plano_exemplo):
        response = api_client.get('/api/planos/?search=Completo')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

        res_vazia = api_client.get('/api/planos/?search=Inexistente123')
        assert len(res_vazia.data) == 0

    def test_filtro_por_tag(self, api_client, plano_exemplo):
        response = api_client.get('/api/planos/?tag=Python')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

        res_outra = api_client.get('/api/planos/?tag=NaoExistente')
        assert len(res_outra.data) == 0

    def test_filtro_meus_planos(
        self, api_client, autor, outro_usuario, plano_exemplo
    ):
        api_client.force_authenticate(user=autor)
        res_autor = api_client.get('/api/planos/?meus=true')
        assert len(res_autor.data) == 1

        api_client.force_authenticate(user=outro_usuario)
        res_outro = api_client.get('/api/planos/?meus=true')
        assert len(res_outro.data) == 0

        # Anônimo
        api_client.force_authenticate(user=None)
        res_anon = api_client.get('/api/planos/?meus=true')
        assert len(res_anon.data) == 0

    def test_recomendados(
        self, api_client, autor, tag_python, tag_django, plano_exemplo
    ):
        p2 = Plano.objects.create(
            titulo='Plano 2 Python',
            descricao='Mais Python',
            autor=autor
        )
        p2.tags.add(tag_python)

        p3 = Plano.objects.create(
            titulo='Plano 3 DevOps',
            descricao='DevOps puro',
            autor=autor
        )

        # Recomendados com tags e exclude_id
        url = f'/api/planos/recomendados/?tags=Python&exclude_id={plano_exemplo.id}'
        res = api_client.get(url)
        assert res.status_code == status.HTTP_200_OK
        ids = [p['id'] for p in res.data]
        assert plano_exemplo.id not in ids
        assert p2.id in ids
        assert p3.id not in ids


@pytest.mark.django_db
class TestHierarquiaEProgresso:
    def test_progresso_completo(self, api_client, autor, plano_exemplo):
        modulo = Modulo.objects.create(
            plano=plano_exemplo,
            titulo='Módulo 1',
            ordem=1
        )
        capitulo = Capitulo.objects.create(
            modulo=modulo,
            titulo='Capítulo 1',
            ordem=1
        )
        c1 = Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Aula 1',
            tipo=Conteudo.TipoConteudo.VIDEO,
            dados='https://video.url/1',
            ordem=1
        )
        c2 = Conteudo.objects.create(
            capitulo=capitulo,
            titulo='Aula 2',
            tipo=Conteudo.TipoConteudo.TEXTO,
            dados='Texto da aula 2',
            ordem=2
        )

        api_client.force_authenticate(user=autor)

        # Início: 0%
        res = api_client.get(f'/api/planos/{plano_exemplo.id}/')
        assert res.data['total_conteudos'] == 2
        assert res.data['conteudos_acessados'] == 0
        assert res.data['percentual_progresso'] == 0.0

        # Marcar aula 1 como acessada
        res_acesso = api_client.post(f'/api/conteudos/{c1.id}/marcar_acessado/')
        assert res_acesso.status_code in [
            status.HTTP_200_OK, status.HTTP_201_CREATED
        ]
        assert res_acesso.data['status'] == 'acessado'

        # Progresso atualizado para 50%
        res_pos = api_client.get(f'/api/planos/{plano_exemplo.id}/')
        assert res_pos.data['conteudos_acessados'] == 1
        assert res_pos.data['percentual_progresso'] == 50.0

        # Marcar aula 2 como acessada -> 100%
        api_client.post(f'/api/conteudos/{c2.id}/marcar_acessado/')
        res_100 = api_client.get(f'/api/planos/{plano_exemplo.id}/')
        assert res_100.data['conteudos_acessados'] == 2
        assert res_100.data['percentual_progresso'] == 100.0

        # Testar filtro de planos em andamento
        res_andamento = api_client.get('/api/planos/?em_andamento=true')
        assert len(res_andamento.data) == 1

    def test_filtros_hierarquia(self, api_client, plano_exemplo):
        mod = Modulo.objects.create(
            plano=plano_exemplo,
            titulo='Módulo A',
            ordem=1
        )
        cap = Capitulo.objects.create(
            modulo=mod,
            titulo='Capítulo A',
            ordem=1
        )
        Conteudo.objects.create(
            capitulo=cap,
            titulo='Conteúdo A',
            dados='...',
            ordem=1
        )

        res_mod = api_client.get(f'/api/modulos/?plano={plano_exemplo.id}')
        assert len(res_mod.data) == 1

        res_cap = api_client.get(f'/api/capitulos/?modulo={mod.id}')
        assert len(res_cap.data) == 1

        res_con = api_client.get(f'/api/conteudos/?capitulo={cap.id}')
        assert len(res_con.data) == 1


@pytest.mark.django_db
class TestComentariosEAvaliacoes:
    def test_criar_e_listar_comentarios(
        self, api_client, autor, outro_usuario, plano_exemplo
    ):
        api_client.force_authenticate(user=outro_usuario)
        payload = {
            'plano': plano_exemplo.id,
            'texto': 'Comentário muito bacana!',
        }
        res = api_client.post('/api/comentarios/', payload)
        assert res.status_code == status.HTTP_201_CREATED
        assert res.data['usuario_nome'] == outro_usuario.username
        assert res.data['usuario_email'] == outro_usuario.email

        res_list = api_client.get(f'/api/comentarios/?plano={plano_exemplo.id}')
        assert len(res_list.data) == 1
        assert res_list.data[0]['texto'] == 'Comentário muito bacana!'

        # Autor do comentário pode deletar
        c_id = res.data['id']
        res_del = api_client.delete(f'/api/comentarios/{c_id}/')
        assert res_del.status_code == status.HTTP_204_NO_CONTENT
        assert Comentario.objects.filter(id=c_id).count() == 0

    def test_avaliar_plano_e_atualizacao(
        self, api_client, outro_usuario, plano_exemplo
    ):
        api_client.force_authenticate(user=outro_usuario)

        # Avaliação inválida (> 5.0)
        res_invalida = api_client.post('/api/avaliacoes/', {
            'plano': plano_exemplo.id,
            'nota': 6.0,
        })
        assert res_invalida.status_code == status.HTTP_400_BAD_REQUEST

        # Avaliação válida
        res_valida = api_client.post('/api/avaliacoes/', {
            'plano': plano_exemplo.id,
            'nota': 4.0,
        })
        assert res_valida.status_code in [
            status.HTTP_200_OK, status.HTTP_201_CREATED
        ]

        # Verificar média no plano
        res_plano = api_client.get(f'/api/planos/{plano_exemplo.id}/')
        assert res_plano.data['media_avaliacoes'] == 4.0
        assert res_plano.data['media_avaliacao'] == 4.0

        # Atualizar nota para 5.0
        res_update = api_client.post('/api/avaliacoes/', {
            'plano': plano_exemplo.id,
            'nota': 5.0,
        })
        assert res_update.status_code in [
            status.HTTP_200_OK, status.HTTP_201_CREATED
        ]

        # Garantir que não duplicou registro
        assert Avaliacao.objects.filter(
            plano=plano_exemplo,
            usuario=outro_usuario
        ).count() == 1


@pytest.mark.django_db
class TestTagAPI:
    def test_listar_tags(self, api_client, tag_python, tag_django):
        res = api_client.get('/api/tags/')
        assert res.status_code == status.HTTP_200_OK
        assert len(res.data) >= 2
