from django.db.models import Count
from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import (
    Avaliacao,
    Capitulo,
    Comentario,
    Conteudo,
    Modulo,
    Plano,
    PlanoAndamento,
    PlanoCriado,
    PlanoSalvo,
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
    PlanoAndamentoSerializer,
    PlanoCriadoSerializer,
    PlanoSalvoSerializer,
    PlanoSerializer,
    TagSerializer,
)


class PlanoViewSet(viewsets.ModelViewSet):
    queryset = (
        Plano.objects.select_related("autor")
        .prefetch_related(
            "tags",
            "modulos__capitulos__conteudos",
            "comentarios",
            "avaliacoes",
        )
        .annotate(total_comentarios=Count("comentarios", distinct=True))
    )
    serializer_class = PlanoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["titulo", "descricao", "tags__nome", "autor__nome"]
    ordering_fields = ["data_publicacao", "titulo"]

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.request.query_params.get("tag")
        if tag:
            qs = qs.filter(tags__nome__iexact=tag)
        if self.request.query_params.get("meus") == "true":
            if self.request.user.is_authenticated:
                qs = qs.filter(autor=self.request.user)
            else:
                qs = qs.none()
        if self.request.query_params.get("em_andamento") == "true":
            if self.request.user.is_authenticated:
                qs = qs.filter(
                    modulos__capitulos__conteudos__progressos__usuario=self.request.user
                )
            else:
                qs = qs.none()
        return qs.distinct()

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=False, methods=["get"])
    def recomendados(self, request):
        qs = self.get_queryset()
        exclude_id = request.query_params.get(
            "exclude_id"
        ) or request.query_params.get("plano_id")
        if exclude_id and exclude_id.isdigit():
            qs = qs.exclude(pk=int(exclude_id))
        tags = [
            v.strip()
            for v in request.query_params.get("tags", "").split(",")
            if v.strip()
        ]
        if tags:
            filtered = qs.filter(tags__nome__in=tags).distinct()
            if filtered.exists():
                qs = filtered
        return Response(self.get_serializer(qs[:5], many=True).data)


class ModuloViewSet(viewsets.ModelViewSet):
    queryset = (
        Modulo.objects.select_related("plano", "plano__autor")
        .prefetch_related("capitulos__conteudos")
        .order_by("ordem")
    )
    serializer_class = ModuloSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        plano = self.request.query_params.get("plano")
        if plano and plano.isdigit():
            return qs.filter(plano_id=plano)
        return qs

    def perform_create(self, serializer):
        plano = serializer.validated_data["plano"]
        if plano.autor_id != self.request.user.id:
            raise PermissionDenied("Você só pode criar módulos em planos seus.")
        serializer.save()


class CapituloViewSet(viewsets.ModelViewSet):
    queryset = (
        Capitulo.objects.select_related("modulo__plano__autor")
        .prefetch_related("conteudos")
        .order_by("ordem")
    )
    serializer_class = CapituloSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        modulo = self.request.query_params.get("modulo")
        if modulo and modulo.isdigit():
            return qs.filter(modulo_id=modulo)
        return qs

    def perform_create(self, serializer):
        modulo = serializer.validated_data["modulo"]
        if modulo.plano.autor_id != self.request.user.id:
            raise PermissionDenied(
                "Você só pode criar capítulos em módulos de planos seus."
            )
        serializer.save()


class ConteudoViewSet(viewsets.ModelViewSet):
    queryset = Conteudo.objects.select_related(
        "capitulo__modulo__plano__autor"
    ).order_by("ordem")
    serializer_class = ConteudoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        capitulo = self.request.query_params.get("capitulo")
        if capitulo and capitulo.isdigit():
            return qs.filter(capitulo_id=capitulo)
        return qs

    def perform_create(self, serializer):
        capitulo = serializer.validated_data["capitulo"]
        if capitulo.modulo.plano.autor_id != self.request.user.id:
            raise PermissionDenied(
                "Você só pode criar conteúdos em capítulos de planos seus."
            )
        serializer.save()

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def marcar_acessado(self, request, pk=None):
        conteudo = self.get_object()
        progresso, created = ProgressoConteudo.objects.update_or_create(
            usuario=request.user, conteudo=conteudo
        )
        return Response(
            {
                "status": "acessado",
                "conteudo_id": conteudo.pk,
                "data_acesso": progresso.data_acesso,
                "criado": created,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.select_related(
        "usuario", "plano", "plano__autor"
    )
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        plano = self.request.query_params.get("plano")
        if plano and plano.isdigit():
            return qs.filter(plano_id=plano)
        return qs

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class AvaliacaoViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.select_related(
        "usuario", "plano", "plano__autor"
    )
    serializer_class = AvaliacaoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        plano = self.request.query_params.get("plano")
        if plano and plano.isdigit():
            return qs.filter(plano_id=plano)
        return qs

    def perform_create(self, serializer):
        obj, _ = Avaliacao.objects.update_or_create(
            plano=serializer.validated_data["plano"],
            usuario=self.request.user,
            defaults={"nota": serializer.validated_data["nota"]},
        )
        serializer.instance = obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]


class PlanoAndamentoViewSet(viewsets.ModelViewSet):
    serializer_class = PlanoAndamentoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return PlanoAndamento.objects.filter(
            usuario=self.request.user
        ).select_related("plano")

    def perform_create(self, serializer):
        obj, _ = PlanoAndamento.objects.update_or_create(
            usuario=self.request.user,
            plano=serializer.validated_data["plano"],
            defaults={
                "progresso": serializer.validated_data.get("progresso", 0)
            },
        )
        serializer.instance = obj


class PlanoSalvoViewSet(viewsets.ModelViewSet):
    serializer_class = PlanoSalvoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return PlanoSalvo.objects.filter(
            usuario=self.request.user
        ).select_related("plano")

    def perform_create(self, serializer):
        obj, _ = PlanoSalvo.objects.get_or_create(
            usuario=self.request.user,
            plano=serializer.validated_data["plano"],
        )
        serializer.instance = obj


class PlanoCriadoViewSet(viewsets.ModelViewSet):
    serializer_class = PlanoCriadoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return PlanoCriado.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
