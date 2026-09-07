from django.conf import settings
from django.db import models


class Tag(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nome


class Plano(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    imagem_url = models.URLField(max_length=500, blank=True, null=True)
    data_publicacao = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='planos'
    )
    tags = models.ManyToManyField(Tag, related_name='planos', blank=True)

    def __str__(self):
        return self.titulo


class Modulo(models.Model):
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        related_name='modulos'
    )
    titulo = models.CharField(max_length=255)
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.plano.titulo} - {self.titulo}"


class Comentario(models.Model):
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        related_name='comentarios'
    )
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    texto = models.TextField()
    data = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-data']


class Avaliacao(models.Model):
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        related_name='avaliacoes'
    )
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    nota = models.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        unique_together = ('plano', 'usuario')
