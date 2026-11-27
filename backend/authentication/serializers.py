from django.contrib.auth import get_user_model
from rest_framework import serializers

Usuario = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    # Mantém compatibilidade com o formulário React, que envia "username".
    username = serializers.CharField(source="nome", write_only=True, max_length=100)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = ["id", "username", "email", "password", "nome"]
        read_only_fields = ["id", "nome"]

    def validate_email(self, value):
        value = value.strip().lower()
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def create(self, validated_data):
        nome = validated_data.pop("nome")
        password = validated_data.pop("password")
        return Usuario.objects.create_user(
            nome=nome,
            password=password,
            **validated_data,
        )


class UsuarioPerfilSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="nome", read_only=True)
    total_planos_criados = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            "id",
            "nome",
            "username",
            "email",
            "avatar_url",
            "data_criacao",
            "total_planos_criados",
        ]
        read_only_fields = ["id", "data_criacao"]

    def get_total_planos_criados(self, obj):
        return obj.planos.count()
