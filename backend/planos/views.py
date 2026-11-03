from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Avaliacao,
    Capitulo,
    Comentario,
    Conteudo,
    Modulo,
    Plano,
    ProgressoConteudo,
    Tag,
)
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    AvaliacaoSerializer,
    CapituloSerializer,
    ComentarioSerializer,
    ConteudoSerializer,
    ModuloSerializer,
    PlanoSerializer,
    TagSerializer,
)


class PlanoViewSet(viewsets.ModelViewSet):
    queryset = Plano.objects.all().order_by('-data_publicacao')
    serializer_class = PlanoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['titulo', 'descricao', 'tags__nome', 'autor__username']
    ordering_fields = ['data_publicacao', 'titulo']

    def get_queryset(self):
        queryset = super().get_queryset()

        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tags__nome__iexact=tag)

        if self.request.query_params.get('meus') == 'true':
            if self.request.user.is_authenticated:
                queryset = queryset.filter(autor=self.request.user)
            else:
                queryset = queryset.none()

        if self.request.query_params.get('em_andamento') == 'true':
            if self.request.user.is_authenticated:
                queryset = queryset.filter(
                    modulos__capitulos__conteudos__progressos__usuario=self.request.user
                ).distinct()
            else:
                queryset = queryset.none()

        return queryset

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=False, methods=['get'])
    def recomendados(self, request):
        tags_param = request.query_params.get('tags')
        exclude_id = request.query_params.get(
            'exclude_id'
        ) or request.query_params.get('plano_id')

        queryset = self.get_queryset()

        if exclude_id and exclude_id.isdigit():
            queryset = queryset.exclude(id=int(exclude_id))

        if tags_param:
            tags_list = [t.strip() for t in tags_param.split(',') if t.strip()]
            if tags_list:
                filtrados = queryset.filter(tags__nome__in=tags_list).distinct()
                if filtrados.exists():
                    queryset = filtrados

        recomendados = queryset[:5]
        serializer = self.get_serializer(recomendados, many=True)
        return Response(serializer.data)


class ModuloViewSet(viewsets.ModelViewSet):
    queryset = Modulo.objects.all().order_by('ordem')
    serializer_class = ModuloSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        plano_id = self.request.query_params.get('plano')
        if plano_id and plano_id.isdigit():
            queryset = queryset.filter(plano_id=int(plano_id))
        return queryset


class CapituloViewSet(viewsets.ModelViewSet):
    queryset = Capitulo.objects.all().order_by('ordem')
    serializer_class = CapituloSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        modulo_id = self.request.query_params.get('modulo')
        if modulo_id and modulo_id.isdigit():
            queryset = queryset.filter(modulo_id=int(modulo_id))
        return queryset


class ConteudoViewSet(viewsets.ModelViewSet):
    queryset = Conteudo.objects.all().order_by('ordem')
    serializer_class = ConteudoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        capitulo_id = self.request.query_params.get('capitulo')
        if capitulo_id and capitulo_id.isdigit():
            queryset = queryset.filter(capitulo_id=int(capitulo_id))
        return queryset

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


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all().order_by('-data')
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        plano_id = self.request.query_params.get('plano')
        if plano_id and plano_id.isdigit():
            queryset = queryset.filter(plano_id=int(plano_id))
        return queryset

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class AvaliacaoViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        plano_id = self.request.query_params.get('plano')
        if plano_id and plano_id.isdigit():
            queryset = queryset.filter(plano_id=int(plano_id))
        return queryset

    def perform_create(self, serializer):
        plano = serializer.validated_data['plano']
        nota = serializer.validated_data['nota']
        avaliacao, _ = Avaliacao.objects.update_or_create(
            plano=plano,
            usuario=self.request.user,
            defaults={'nota': nota}
        )
        serializer.instance = avaliacao


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
