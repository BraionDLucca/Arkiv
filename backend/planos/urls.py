from rest_framework.routers import DefaultRouter
from .views import PlanoViewSet, TagViewSet

router = DefaultRouter()
router.register(r'planos', PlanoViewSet, basename='plano')
router.register(r'tags', TagViewSet, basename='tag')

urlpatterns = router.urls
