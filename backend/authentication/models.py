from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class UsuarioManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, nome="", **extra_fields):
        if not email:
            raise ValueError("O email é obrigatório.")
        email = self.normalize_email(email).lower()
        user = self.model(email=email, nome=nome, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, password=None, nome="Administrador", **extra_fields
    ):
        # O modelo do DER não possui campos de staff/superusuário.
        # O método existe para compatibilidade com comandos Django.
        return self.create_user(
            email=email, password=password, nome=nome, **extra_fields
        )


class Usuario(AbstractBaseUser):
    # A senha é indispensável à autenticação, embora não esteja representada no DER.
    # Ela fica armazenada como hash na coluna password_hash.
    password = models.CharField(max_length=128, db_column="password_hash")
    last_login = None

    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    avatar_url = models.URLField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    objects = UsuarioManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nome"]

    @property
    def is_active(self):
        return True

    def __str__(self):
        return self.email

    class Meta:
        db_table = "usuarios"
        verbose_name = "usuário"
        verbose_name_plural = "usuários"
