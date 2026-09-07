from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Plano, Tag
from .serializers import PlanoSerializer, TagSerializer


class PlanoViewSet(viewsets.ModelViewSet):
    queryset = Plano.objects.all().order_by('-data_publicacao')
    serializer_class = PlanoSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=False, methods=['get'])
    def recomendados(self, request):
        # Retorna os 5 primeiros planos ordenados por data
        recomendados = self.queryset[:5]
        serializer = self.get_serializer(recomendados, many=True)
        return Response(serializer.data)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
