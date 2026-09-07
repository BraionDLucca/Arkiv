from rest_framework import serializers
from .models import Plano, Modulo, Tag, Comentario, Avaliacao


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome']


class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = ['id', 'titulo', 'ordem']


class ComentarioSerializer(serializers.ModelSerializer):
    usuario_email = serializers.ReadOnlyField(source='usuario.email')

    class Meta:
        model = Comentario
        fields = ['id', 'usuario', 'usuario_email', 'texto', 'data']
        read_only_fields = ['usuario', 'data']


class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = ['id', 'plano', 'usuario', 'nota']
        read_only_fields = ['usuario']


class PlanoSerializer(serializers.ModelSerializer):
    autor_email = serializers.ReadOnlyField(source='autor.email')
    tags = TagSerializer(many=True, read_only=True)
    modulos = ModuloSerializer(many=True, read_only=True)
    comentarios = ComentarioSerializer(many=True, read_only=True)
    media_avaliacoes = serializers.SerializerMethodField()

    class Meta:
        model = Plano
        fields = [
            'id', 'titulo', 'descricao', 'imagem_url',
            'data_publicacao', 'autor', 'autor_email',
            'tags', 'modulos', 'comentarios', 'media_avaliacoes'
        ]
        read_only_fields = ['autor', 'data_publicacao']

    def get_media_avaliacoes(self, obj):
        avaliacoes = obj.avaliacoes.all()
        if not avaliacoes.exists():
            return 0.0
        return round(sum(a.nota for a in avaliacoes) / avaliacoes.count(), 2)
