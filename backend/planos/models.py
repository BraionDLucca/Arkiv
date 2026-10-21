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
    descricao = models.TextField(blank=True, null=True)
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.plano.titulo} - {self.titulo}"


class Capitulo(models.Model):
    modulo = models.ForeignKey(
        Modulo,
        on_delete=models.CASCADE,
        related_name='capitulos'
    )
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.modulo.titulo} - {self.titulo}"


class Conteudo(models.Model):
    class TipoConteudo(models.TextChoices):
        LINK = 'link', 'Link'
        TEXTO = 'texto', 'Texto'
        VIDEO = 'video', 'Vídeo'
        IMAGEM = 'imagem', 'Imagem'
        DOCUMENTO = 'documento', 'Documento'
        ATIVIDADE = 'atividade', 'Atividade'
        TESTE = 'teste', 'Teste'
        ARTIGO = 'artigo', 'Artigo'

    capitulo = models.ForeignKey(
        Capitulo,
        on_delete=models.CASCADE,
        related_name='conteudos'
    )
    titulo = models.CharField(max_length=255)
    tipo = models.CharField(
        max_length=20,
        choices=TipoConteudo.choices,
        default=TipoConteudo.TEXTO
    )
    dados = models.TextField(
        help_text="URL, texto formatado ou payload do conteúdo"
    )
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.capitulo.titulo} - {self.titulo} ({self.tipo})"


class ProgressoConteudo(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='progressos_conteudo'
    )
    conteudo = models.ForeignKey(
        Conteudo,
        on_delete=models.CASCADE,
        related_name='progressos'
    )
    data_acesso = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'conteudo')

    def __str__(self):
        return f"User {self.usuario_id} acessou {self.conteudo_id}"


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
