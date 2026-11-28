from rest_framework import serializers
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "nome"]


class ConteudoSerializer(serializers.ModelSerializer):
    acessado = serializers.SerializerMethodField()

    class Meta:
        model = Conteudo
        fields = [
            "id",
            "capitulo",
            "titulo",
            "tipo",
            "dados",
            "ordem",
            "acessado",
        ]

    def get_acessado(self, obj):
        request = self.context.get("request")
        if not (request and request.user.is_authenticated):
            return False
        return ProgressoConteudo.objects.filter(
            conteudo=obj, usuario=request.user
        ).exists()


class CapituloSerializer(serializers.ModelSerializer):
    conteudos = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Capitulo
        fields = [
            "id",
            "modulo",
            "titulo",
            "descricao",
            "ordem",
            "conteudos",
            "total_conteudos",
            "conteudos_acessados",
            "percentual_progresso",
        ]

    def _stats(self, obj):
        cache = getattr(self, "_stats_cache", {})
        if obj.pk not in cache:
            request = self.context.get("request")
            user = (
                request.user
                if request and request.user.is_authenticated
                else None
            )
            total = obj.conteudos.count()
            done = (
                ProgressoConteudo.objects.filter(
                    conteudo__capitulo=obj, usuario=user
                ).count()
                if user and total
                else 0
            )
            pct = round(done * 100 / total, 2) if total else 0.0
            cache[obj.pk] = (total, done, pct)
            self._stats_cache = cache
        return cache[obj.pk]

    def get_conteudos(self, obj):
        return ConteudoSerializer(
            obj.conteudos.all(), many=True, context=self.context
        ).data

    def get_total_conteudos(self, obj):
        return self._stats(obj)[0]

    def get_conteudos_acessados(self, obj):
        return self._stats(obj)[1]

    def get_percentual_progresso(self, obj):
        return self._stats(obj)[2]


class ModuloSerializer(serializers.ModelSerializer):
    capitulos = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Modulo
        fields = [
            "id",
            "plano",
            "titulo",
            "descricao",
            "ordem",
            "capitulos",
            "total_conteudos",
            "conteudos_acessados",
            "percentual_progresso",
        ]

    def _stats(self, obj):
        cache = getattr(self, "_modulo_stats_cache", {})
        if obj.pk not in cache:
            request = self.context.get("request")
            user = (
                request.user
                if request and request.user.is_authenticated
                else None
            )
            total = Conteudo.objects.filter(capitulo__modulo=obj).count()
            done = (
                ProgressoConteudo.objects.filter(
                    conteudo__capitulo__modulo=obj, usuario=user
                ).count()
                if user and total
                else 0
            )
            pct = round(done * 100 / total, 2) if total else 0.0
            cache[obj.pk] = (total, done, pct)
            self._modulo_stats_cache = cache
        return cache[obj.pk]

    def get_capitulos(self, obj):
        return CapituloSerializer(
            obj.capitulos.all(), many=True, context=self.context
        ).data

    def get_total_conteudos(self, obj):
        return self._stats(obj)[0]

    def get_conteudos_acessados(self, obj):
        return self._stats(obj)[1]

    def get_percentual_progresso(self, obj):
        return self._stats(obj)[2]


class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.ReadOnlyField(source="usuario.nome")
    usuario_email = serializers.ReadOnlyField(source="usuario.email")

    class Meta:
        model = Comentario
        fields = [
            "id",
            "plano",
            "usuario",
            "usuario_nome",
            "usuario_email",
            "texto",
            "data",
        ]
        read_only_fields = ["usuario", "data"]


class AvaliacaoSerializer(serializers.ModelSerializer):
    usuario_id = serializers.ReadOnlyField(source="usuario.id")
    usuario_email = serializers.ReadOnlyField(source="usuario.email")

    class Meta:
        model = Avaliacao
        fields = [
            "id",
            "usuario",
            "usuario_id",
            "usuario_email",
            "plano",
            "nota",
            "data",
        ]
        read_only_fields = ["usuario", "data"]

    def validate_nota(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("A nota deve estar entre 1 e 5.")
        return value


class PlanoAndamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoAndamento
        fields = ["id", "usuario", "plano", "progresso", "atualizado_em"]
        read_only_fields = ["usuario", "atualizado_em"]

    def validate_progresso(self, value):
        if not 0 <= value <= 100:
            raise serializers.ValidationError(
                "O progresso deve estar entre 0 e 100."
            )
        return value


class PlanoSalvoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoSalvo
        fields = ["id", "usuario", "plano", "data_salvo"]
        read_only_fields = ["usuario", "data_salvo"]


class PlanoCriadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoCriado
        fields = ["id", "usuario", "titulo", "descricao", "criado_em"]
        read_only_fields = ["usuario", "criado_em"]


class PlanoSerializer(serializers.ModelSerializer):
    autor_id = serializers.ReadOnlyField(source="autor.id")
    autor_nome = serializers.ReadOnlyField(source="autor.nome")
    autor_email = serializers.ReadOnlyField(source="autor.email")
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False,
        source="tags",
    )
    modulos = serializers.SerializerMethodField()
    comentarios = ComentarioSerializer(many=True, read_only=True)
    total_comentarios = serializers.IntegerField(read_only=True)
    media_avaliacao = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Plano
        fields = [
            "id",
            "titulo",
            "descricao",
            "imagem_url",
            "data_publicacao",
            "autor",
            "autor_id",
            "autor_nome",
            "autor_email",
            "tags",
            "tag_ids",
            "modulos",
            "comentarios",
            "total_comentarios",
            "media_avaliacao",
            "total_conteudos",
            "conteudos_acessados",
            "percentual_progresso",
        ]
        read_only_fields = ["autor", "data_publicacao"]

    def _stats(self, obj):
        cache = getattr(self, "_plano_stats_cache", {})
        if obj.pk not in cache:
            request = self.context.get("request")
            user = (
                request.user
                if request and request.user.is_authenticated
                else None
            )
            total = Conteudo.objects.filter(capitulo__modulo__plano=obj).count()
            done = (
                ProgressoConteudo.objects.filter(
                    conteudo__capitulo__modulo__plano=obj, usuario=user
                ).count()
                if user and total
                else 0
            )
            pct = round(done * 100 / total, 2) if total else 0.0
            cache[obj.pk] = (total, done, pct)
            self._plano_stats_cache = cache
        return cache[obj.pk]

    def get_modulos(self, obj):
        return ModuloSerializer(
            obj.modulos.all(), many=True, context=self.context
        ).data

    def get_media_avaliacao(self, obj):
        notas = list(obj.avaliacoes.values_list("nota", flat=True))
        return round(sum(notas) / len(notas), 2) if notas else None

    def get_total_conteudos(self, obj):
        return self._stats(obj)[0]

    def get_conteudos_acessados(self, obj):
        return self._stats(obj)[1]

    def get_percentual_progresso(self, obj):
        return self._stats(obj)[2]
