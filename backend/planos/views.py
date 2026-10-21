from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Plano, Modulo, Capitulo, Conteudo, ProgressoConteudo, Tag
from .serializers import (
    PlanoSerializer,
    ModuloSerializer,
    CapituloSerializer,
    ConteudoSerializer,
    TagSerializer,
)


class PlanoViewSet(viewsets.ModelViewSet):
    queryset = Plano.objects.all().order_by('-data_publicacao')
    serializer_class = PlanoSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=False, methods=['get'])
    def recomendados(self, request):
        recomendados = self.queryset[:5]
        serializer = self.get_serializer(recomendados, many=True)
        return Response(serializer.data)


class ModuloViewSet(viewsets.ModelViewSet):
    queryset = Modulo.objects.all().order_by('ordem')
    serializer_class = ModuloSerializer
    permission_classes = [permissions.AllowAny]


class CapituloViewSet(viewsets.ModelViewSet):
    queryset = Capitulo.objects.all().order_by('ordem')
    serializer_class = CapituloSerializer
    permission_classes = [permissions.AllowAny]


class ConteudoViewSet(viewsets.ModelViewSet):
    queryset = Conteudo.objects.all().order_by('ordem')
    serializer_class = ConteudoSerializer
    permission_classes = [permissions.AllowAny]

    @action(
        detail=True,
        methods=['post'],
        permission_classes=[permissions.IsAuthenticated]
    )
    def marcar_acessado(self, request, pk=None):
        conteudo = self.get_object()
        progresso, created = ProgressoConteudo.objects.update_or_create(
            usuario=request.user,
            conteudo=conteudo
        )
        return Response(
            {
                'status': 'acessado',
                'conteudo_id': conteudo.id,
                'data_acesso': progresso.data_acesso,
                'criado': created,
            },
            status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED
        )


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
