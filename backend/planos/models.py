from django.conf import settings
from django.db import models


class Plano(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    imagem_url = models.URLField(max_length=255, blank=True, null=True)
    data_publicacao = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="id_autor",
        related_name="planos",
    )
    tags = models.ManyToManyField(
        "Tag",
        through="PlanoTag",
        related_name="planos",
        blank=True,
    )

    class Meta:
        db_table = "planos"

    def __str__(self):
        return self.titulo


class Modulo(models.Model):
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="id_plano",
        related_name="modulos",
    )
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)
    ordem = models.IntegerField(default=1)

    class Meta:
        db_table = "modulos"
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.plano.titulo} - {self.titulo}"


class Capitulo(models.Model):
    id = models.BigAutoField(
        auto_created=True,
        primary_key=True,
        serialize=False,
        verbose_name="ID",
    )
    modulo = models.ForeignKey(
        Modulo,
        on_delete=models.CASCADE,
        related_name="capitulos",
    )
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.modulo.titulo} - {self.titulo}"


class Conteudo(models.Model):
    id = models.BigAutoField(
        auto_created=True,
        primary_key=True,
        serialize=False,
        verbose_name="ID",
    )

    class TipoConteudo(models.TextChoices):
        LINK = "link", "Link"
        TEXTO = "texto", "Texto"
        VIDEO = "video", "Vídeo"
        IMAGEM = "imagem", "Imagem"
        DOCUMENTO = "documento", "Documento"
        ATIVIDADE = "atividade", "Atividade"
        TESTE = "teste", "Teste"
        ARTIGO = "artigo", "Artigo"

    capitulo = models.ForeignKey(
        Capitulo,
        on_delete=models.CASCADE,
        related_name="conteudos",
    )
    titulo = models.CharField(max_length=255)
    tipo = models.CharField(
        max_length=20,
        choices=TipoConteudo.choices,
        default=TipoConteudo.TEXTO,
    )
    dados = models.TextField(
        help_text="URL, texto formatado ou payload do conteúdo"
    )
    ordem = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.capitulo.titulo} - {self.titulo} ({self.tipo})"


class ProgressoConteudo(models.Model):
    id = models.BigAutoField(
        auto_created=True,
        primary_key=True,
        serialize=False,
        verbose_name="ID",
    )
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="progressos_conteudo",
    )
    conteudo = models.ForeignKey(
        Conteudo,
        on_delete=models.CASCADE,
        related_name="progressos",
    )
    data_acesso = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("usuario", "conteudo")

    def __str__(self):
        return f"User {self.usuario_id} acessou {self.conteudo_id}"


class Avaliacao(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="id_usuario",
        related_name="avaliacoes",
    )
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="id_plano",
        related_name="avaliacoes",
    )
    nota = models.IntegerField()
    data = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "avaliacoes"

    def __str__(self):
        return f"{self.usuario.email} - {self.plano.titulo}: {self.nota}"


class Comentario(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="id_usuario",
        related_name="comentarios",
    )
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="id_plano",
        related_name="comentarios",
    )
    texto = models.TextField()
    data = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "comentarios"
        ordering = ["-data"]

    def __str__(self):
        return f"Comentário de {self.usuario.email}"


class PlanoAndamento(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="usuario_id",
        related_name="planos_andamento",
    )
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="plano_id",
        related_name="andamentos",
    )
    progresso = models.IntegerField(default=0)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "planos_andamento"

    def __str__(self):
        return f"{self.usuario.email} - {self.plano.titulo}: {self.progresso}%"


class PlanoSalvo(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="usuario_id",
        related_name="planos_salvos",
    )
    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="plano_id",
        related_name="salvos",
    )
    data_salvo = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "planos_salvos"

    def __str__(self):
        return f"{self.usuario.email} salvou {self.plano.titulo}"


class PlanoCriado(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="usuario_id",
        related_name="planos_criados",
    )
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "planos_criados"

    def __str__(self):
        return self.titulo


class Tag(models.Model):
    nome = models.CharField(max_length=50)

    class Meta:
        db_table = "tags"

    def __str__(self):
        return self.nome


class PlanoTag(models.Model):
    pk = models.CompositePrimaryKey("plano_id", "tag_id")

    plano = models.ForeignKey(
        Plano,
        on_delete=models.CASCADE,
        db_column="id_plano",
    )
    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE,
        db_column="id_tag",
    )

    class Meta:
        db_table = "plano_tags"

    def __str__(self):
        return f"{self.plano_id} - {self.tag_id}"
