from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from planos.models import Avaliacao, Comentario, Modulo, Plano, Tag

Usuario = get_user_model()


class Command(BaseCommand):
    help = "Cria dados demonstrativos compatíveis com o DER do Arkiv."

    def handle(self, *args, **options):
        usuario, criado = Usuario.objects.get_or_create(
            email="professor@arkiv.com",
            defaults={"nome": "Professor Arkiv"},
        )
        if criado:
            usuario.set_password("ArkivDemo123!")
            usuario.save(update_fields=["password"])

        tag_python, _ = Tag.objects.get_or_create(nome="Python")
        tag_django, _ = Tag.objects.get_or_create(nome="Django")
        plano, criado = Plano.objects.get_or_create(
            titulo="Trilha de Backend com Python e Django",
            autor=usuario,
            defaults={
                "descricao": (
                    "Plano demonstrativo com módulos, tags, comentários e avaliações."
                ),
                "imagem_url": (
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
                ),
            },
        )
        plano.tags.add(tag_python, tag_django)
        Modulo.objects.get_or_create(
            plano=plano,
            titulo="Fundamentos de Backend",
            defaults={"ordem": 1},
        )
        Comentario.objects.get_or_create(
            plano=plano,
            usuario=usuario,
            texto="Plano demonstrativo do Arkiv.",
        )
        Avaliacao.objects.get_or_create(
            plano=plano,
            usuario=usuario,
            defaults={"nota": 5},
        )
        self.stdout.write(self.style.SUCCESS("Dados demonstrativos carregados."))
