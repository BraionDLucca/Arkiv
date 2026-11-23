from rest_framework.routers import DefaultRouter
from .views import (
    AvaliacaoViewSet,
    CapituloViewSet,
    ComentarioViewSet,
    ConteudoViewSet,
    ModuloViewSet,
    PlanoAndamentoViewSet,
    PlanoCriadoViewSet,
    PlanoSalvoViewSet,
    PlanoViewSet,
    TagViewSet,
)

router = DefaultRouter()
router.register(r"planos", PlanoViewSet, basename="plano")
router.register(r"modulos", ModuloViewSet, basename="modulo")
router.register(r"capitulos", CapituloViewSet, basename="capitulo")
router.register(r"conteudos", ConteudoViewSet, basename="conteudo")
router.register(r"tags", TagViewSet, basename="tag")
router.register(r"comentarios", ComentarioViewSet, basename="comentario")
router.register(r"avaliacoes", AvaliacaoViewSet, basename="avaliacao")
router.register(
    r"planos-andamento", PlanoAndamentoViewSet, basename="plano-andamento"
)
router.register(r"planos-salvos", PlanoSalvoViewSet, basename="plano-salvo")
router.register(r"planos-criados", PlanoCriadoViewSet, basename="plano-criado")

urlpatterns = router.urls
