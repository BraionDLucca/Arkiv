from django.contrib.auth import get_user_model
from rest_framework import serializers

Usuario = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        email_normalizado = value.lower().strip()
        if Usuario.objects.filter(email=email_normalizado).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return email_normalizado

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UsuarioPerfilSerializer(serializers.ModelSerializer):
    total_planos_criados = serializers.SerializerMethodField()
    total_conteudos_concluidos = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'date_joined',
            'total_planos_criados',
            'total_conteudos_concluidos',
        ]
        read_only_fields = ['id', 'date_joined']

    def get_total_planos_criados(self, obj):
        return obj.planos.count()

    def get_total_conteudos_concluidos(self, obj):
        return obj.progressos_conteudo.count()
