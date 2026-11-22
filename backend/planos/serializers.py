from rest_framework import serializers
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome']


class ConteudoSerializer(serializers.ModelSerializer):
    acessado = serializers.SerializerMethodField()

    class Meta:
        model = Conteudo
        fields = ['id', 'capitulo', 'titulo', 'tipo', 'dados', 'ordem', 'acessado']

    def get_acessado(self, obj):
        request = self.context.get('request')
        if not request or not request.user or not request.user.is_authenticated:
            return False
        return ProgressoConteudo.objects.filter(
            conteudo=obj,
            usuario=request.user
        ).exists()


class CapituloSerializer(serializers.ModelSerializer):
    conteudos = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Capitulo
        fields = [
            'id',
            'modulo',
            'titulo',
            'descricao',
            'ordem',
            'conteudos',
            'total_conteudos',
            'conteudos_acessados',
            'percentual_progresso',
        ]

    def _get_progresso_stats(self, obj):
        if hasattr(self, '_stats_cache') and obj.id in self._stats_cache:
            return self._stats_cache[obj.id]

        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None

        conteudos = list(obj.conteudos.all())
        total = len(conteudos)

        if total == 0 or not user:
            acessados = 0
            pct = 0.0
        else:
            conteudo_ids = [c.id for c in conteudos]
            acessados = ProgressoConteudo.objects.filter(
                conteudo_id__in=conteudo_ids,
                usuario=user
            ).count()
            pct = round((acessados / total) * 100, 2)

        if not hasattr(self, '_stats_cache'):
            self._stats_cache = {}
        self._stats_cache[obj.id] = (total, acessados, pct)
        return self._stats_cache[obj.id]

    def get_conteudos(self, obj):
        serializer = ConteudoSerializer(
            obj.conteudos.all(),
            many=True,
            context=self.context
        )
        return serializer.data

    def get_total_conteudos(self, obj):
        total, _, _ = self._get_progresso_stats(obj)
        return total

    def get_conteudos_acessados(self, obj):
        _, acessados, _ = self._get_progresso_stats(obj)
        return acessados

    def get_percentual_progresso(self, obj):
        _, _, pct = self._get_progresso_stats(obj)
        return pct


class ModuloSerializer(serializers.ModelSerializer):
    capitulos = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Modulo
        fields = [
            'id',
            'plano',
            'titulo',
            'descricao',
            'ordem',
            'capitulos',
            'total_conteudos',
            'conteudos_acessados',
            'percentual_progresso',
        ]

    def _get_progresso_stats(self, obj):
        if hasattr(self, '_modulo_stats_cache') and obj.id in self._modulo_stats_cache:
            return self._modulo_stats_cache[obj.id]

        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None

        conteudo_ids = list(
            Conteudo.objects.filter(capitulo__modulo=obj).values_list('id', flat=True)
        )
        total = len(conteudo_ids)

        if total == 0 or not user:
            acessados = 0
            pct = 0.0
        else:
            acessados = ProgressoConteudo.objects.filter(
                conteudo_id__in=conteudo_ids,
                usuario=user
            ).count()
            pct = round((acessados / total) * 100, 2)

        if not hasattr(self, '_modulo_stats_cache'):
            self._modulo_stats_cache = {}
        self._modulo_stats_cache[obj.id] = (total, acessados, pct)
        return self._modulo_stats_cache[obj.id]

    def get_capitulos(self, obj):
        serializer = CapituloSerializer(
            obj.capitulos.all(),
            many=True,
            context=self.context
        )
        return serializer.data

    def get_total_conteudos(self, obj):
        total, _, _ = self._get_progresso_stats(obj)
        return total

    def get_conteudos_acessados(self, obj):
        _, acessados, _ = self._get_progresso_stats(obj)
        return acessados

    def get_percentual_progresso(self, obj):
        _, _, pct = self._get_progresso_stats(obj)
        return pct


class ComentarioSerializer(serializers.ModelSerializer):
    usuario_id = serializers.ReadOnlyField(source='usuario.id')
    usuario_nome = serializers.ReadOnlyField(source='usuario.username')
    usuario_email = serializers.ReadOnlyField(source='usuario.email')

    class Meta:
        model = Comentario
        fields = [
            'id',
            'plano',
            'usuario',
            'usuario_id',
            'usuario_nome',
            'usuario_email',
            'texto',
            'data',
        ]
        read_only_fields = ['usuario', 'data']


class AvaliacaoSerializer(serializers.ModelSerializer):
    usuario_id = serializers.ReadOnlyField(source='usuario.id')
    usuario_email = serializers.ReadOnlyField(source='usuario.email')

    class Meta:
        model = Avaliacao
        fields = ['id', 'plano', 'usuario', 'usuario_id', 'usuario_email', 'nota']
        read_only_fields = ['usuario']

    def validate_nota(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "A nota de avaliação deve estar entre 1.0 e 5.0."
            )
        return value


class PlanoSerializer(serializers.ModelSerializer):
    autor_id = serializers.ReadOnlyField(source='autor.id')
    autor_nome = serializers.ReadOnlyField(source='autor.username')
    autor_email = serializers.ReadOnlyField(source='autor.email')
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False,
        source='tags'
    )
    modulos = serializers.SerializerMethodField()
    comentarios = ComentarioSerializer(many=True, read_only=True)
    total_comentarios = serializers.SerializerMethodField()
    media_avaliacoes = serializers.SerializerMethodField()
    media_avaliacao = serializers.SerializerMethodField()
    total_conteudos = serializers.SerializerMethodField()
    conteudos_acessados = serializers.SerializerMethodField()
    percentual_progresso = serializers.SerializerMethodField()

    class Meta:
        model = Plano
        fields = [
            'id',
            'titulo',
            'descricao',
            'imagem_url',
            'data_publicacao',
            'autor',
            'autor_id',
            'autor_nome',
            'autor_email',
            'tags',
            'tag_ids',
            'modulos',
            'comentarios',
            'total_comentarios',
            'media_avaliacoes',
            'media_avaliacao',
            'total_conteudos',
            'conteudos_acessados',
            'percentual_progresso',
        ]
        read_only_fields = ['autor', 'data_publicacao']

    def _get_progresso_stats(self, obj):
        if hasattr(self, '_plano_stats_cache') and obj.id in self._plano_stats_cache:
            return self._plano_stats_cache[obj.id]

        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None

        conteudo_ids = list(
            Conteudo.objects.filter(
                capitulo__modulo__plano=obj
            ).values_list('id', flat=True)
        )
        total = len(conteudo_ids)

        if total == 0 or not user:
            acessados = 0
            pct = 0.0
        else:
            acessados = ProgressoConteudo.objects.filter(
                conteudo_id__in=conteudo_ids,
                usuario=user
            ).count()
            pct = round((acessados / total) * 100, 2)

        if not hasattr(self, '_plano_stats_cache'):
            self._plano_stats_cache = {}
        self._plano_stats_cache[obj.id] = (total, acessados, pct)
        return self._plano_stats_cache[obj.id]

    def get_modulos(self, obj):
        serializer = ModuloSerializer(
            obj.modulos.all(),
            many=True,
            context=self.context
        )
        return serializer.data

    def get_total_comentarios(self, obj):
        return obj.comentarios.count()

    def get_media_avaliacoes(self, obj):
        avaliacoes = obj.avaliacoes.all()
        if not avaliacoes.exists():
            return 0.0
        return round(sum(a.nota for a in avaliacoes) / avaliacoes.count(), 2)

    def get_media_avaliacao(self, obj):
        return self.get_media_avaliacoes(obj)

    def get_total_conteudos(self, obj):
        total, _, _ = self._get_progresso_stats(obj)
        return total

    def get_conteudos_acessados(self, obj):
        _, acessados, _ = self._get_progresso_stats(obj)
        return acessados

    def get_percentual_progresso(self, obj):
        _, _, pct = self._get_progresso_stats(obj)
        return pct
