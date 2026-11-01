from rest_framework.routers import DefaultRouter
from .views import (
    PlanoViewSet,
    ModuloViewSet,
    CapituloViewSet,
    ConteudoViewSet,
    TagViewSet,
)

router = DefaultRouter()
router.register(r'planos', PlanoViewSet, basename='plano')
router.register(r'modulos', ModuloViewSet, basename='modulo')
router.register(r'capitulos', CapituloViewSet, basename='capitulo')
router.register(r'conteudos', ConteudoViewSet, basename='conteudo')
router.register(r'tags', TagViewSet, basename='tag')

urlpatterns = router.urls
