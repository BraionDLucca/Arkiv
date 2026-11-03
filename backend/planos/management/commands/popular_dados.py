from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from planos.models import (
    Avaliacao,
    Capitulo,
    Comentario,
    Conteudo,
    Modulo,
    Plano,
    Tag,
)

Usuario = get_user_model()


class Command(BaseCommand):
    help = "Popula o banco de dados com dados iniciais para desenvolvimento"

    def handle(self, *args, **options):
        self.stdout.write("Iniciando carga de dados iniciais...")

        # 1. Usuário de teste
        user, created = Usuario.objects.get_or_create(
            email="professor@arkiv.com",
            defaults={
                "username": "professor_arkiv",
                "first_name": "Professor",
                "last_name": "Arkiv",
            },
        )
        if created:
            user.set_password("ArkivDemo123!")
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f"Usuário criado: {user.email}")
            )
        else:
            self.stdout.write(f"Usuário já existente: {user.email}")

        # 2. Tags
        tags_nomes = [
            "Python",
            "Django",
            "JavaScript",
            "React",
            "DevOps",
            "Banco de Dados",
        ]
        tags_objs = {}
        for nome in tags_nomes:
            tag, _ = Tag.objects.get_or_create(nome=nome)
            tags_objs[nome] = tag
        self.stdout.write(self.style.SUCCESS(f"Tags carregadas: {len(tags_objs)}"))

        # 3. Plano de Estudo de Exemplo
        plano, p_created = Plano.objects.get_or_create(
            titulo="Trilha Completa de Backend com Python e Django",
            autor=user,
            defaults={
                "descricao": (
                    "Aprenda desenvolvimento backend moderno com Python, "
                    "Django, Django REST Framework, autenticação JWT e boas "
                    "práticas de arquitetura de software."
                ),
                "imagem_url": (
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
                ),
            },
        )
        if p_created:
            plano.tags.add(
                tags_objs["Python"],
                tags_objs["Django"],
                tags_objs["Banco de Dados"],
            )

            # Módulo 1: Fundamentos
            mod1 = Modulo.objects.create(
                plano=plano,
                titulo="Módulo 1: Fundamentos de Python e DRF",
                descricao="Bases essenciais para construir APIs robustas.",
                ordem=1,
            )
            cap1_1 = Capitulo.objects.create(
                modulo=mod1,
                titulo="Capítulo 1: Introdução ao Django REST",
                descricao="Visão geral de rotas, serializers e viewsets.",
                ordem=1,
            )
            Conteudo.objects.create(
                capitulo=cap1_1,
                titulo="Conceitos Básicos de APIs REST",
                tipo=Conteudo.TipoConteudo.TEXTO,
                dados="Uma API REST utiliza métodos HTTP como GET, POST, PUT...",
                ordem=1,
            )
            Conteudo.objects.create(
                capitulo=cap1_1,
                titulo="Vídeo: Configurando Django e DRF",
                tipo=Conteudo.TipoConteudo.VIDEO,
                dados="https://www.youtube.com/watch?v=example1",
                ordem=2,
            )

            # Módulo 2: Autenticação e Segurança
            mod2 = Modulo.objects.create(
                plano=plano,
                titulo="Módulo 2: Autenticação e Autorização",
                descricao="Protegendo endpoints com JWT e permissões.",
                ordem=2,
            )
            cap2_1 = Capitulo.objects.create(
                modulo=mod2,
                titulo="Capítulo 1: JSON Web Tokens (JWT)",
                descricao="Como implementar tokens de acesso e refresh.",
                ordem=1,
            )
            Conteudo.objects.create(
                capitulo=cap2_1,
                titulo="Guia de Integração SimpleJWT",
                tipo=Conteudo.TipoConteudo.ARTIGO,
                dados="https://django-rest-framework-simplejwt.readthedocs.io",
                ordem=1,
            )

            # Comentário e Avaliação
            Comentario.objects.create(
                plano=plano,
                usuario=user,
                texto="Excelente trilha para quem quer dominar o ecossistema Django!",
            )
            Avaliacao.objects.create(
                plano=plano,
                usuario=user,
                nota=5.0,
            )

            self.stdout.write(
                self.style.SUCCESS(f"Plano criado com sucesso: {plano.titulo}")
            )
        else:
            self.stdout.write(f"Plano já existente: {plano.titulo}")

        self.stdout.write(
            self.style.SUCCESS("Carga de dados concluída com sucesso!")
        )
