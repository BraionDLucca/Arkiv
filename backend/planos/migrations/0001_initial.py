import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]
    operations = [
        migrations.CreateModel(
            name="Tag",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nome", models.CharField(max_length=50, unique=True)),
            ],
            options={"db_table": "tags"},
        ),
        migrations.CreateModel(
            name="Plano",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=200)),
                ("descricao", models.TextField()),
                ("imagem_url", models.URLField(blank=True, max_length=255, null=True)),
                ("data_publicacao", models.DateTimeField(auto_now_add=True)),
                ("autor", models.ForeignKey(db_column="id_autor", on_delete=django.db.models.deletion.CASCADE, related_name="planos", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "planos"},
        ),
        migrations.CreateModel(
            name="Modulo",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=200)),
                ("ordem", models.PositiveIntegerField(default=1)),
                ("plano", models.ForeignKey(db_column="id_plano", on_delete=django.db.models.deletion.CASCADE, related_name="modulos", to="planos.plano")),
            ],
            options={"db_table": "modulos", "ordering": ["ordem"]},
        ),
        migrations.CreateModel(
            name="Comentario",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("texto", models.TextField()),
                ("data", models.DateTimeField(auto_now_add=True)),
                ("plano", models.ForeignKey(db_column="id_plano", on_delete=django.db.models.deletion.CASCADE, related_name="comentarios", to="planos.plano")),
                ("usuario", models.ForeignKey(db_column="id_usuario", on_delete=django.db.models.deletion.CASCADE, related_name="comentarios", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "comentarios", "ordering": ["-data"]},
        ),
        migrations.CreateModel(
            name="Avaliacao",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nota", models.PositiveSmallIntegerField()),
                ("data", models.DateTimeField(auto_now_add=True)),
                ("plano", models.ForeignKey(db_column="id_plano", on_delete=django.db.models.deletion.CASCADE, related_name="avaliacoes", to="planos.plano")),
                ("usuario", models.ForeignKey(db_column="id_usuario", on_delete=django.db.models.deletion.CASCADE, related_name="avaliacoes", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "avaliacoes"},
        ),
        migrations.CreateModel(
            name="PlanoAndamento",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("progresso", models.PositiveIntegerField(default=0)),
                ("atualizado_em", models.DateTimeField(auto_now=True)),
                ("plano", models.ForeignKey(db_column="plano_id", on_delete=django.db.models.deletion.CASCADE, related_name="andamentos", to="planos.plano")),
                ("usuario", models.ForeignKey(db_column="usuario_id", on_delete=django.db.models.deletion.CASCADE, related_name="planos_andamento", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "planos_andamento"},
        ),
        migrations.CreateModel(
            name="PlanoSalvo",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("data_salvo", models.DateTimeField(auto_now_add=True)),
                ("plano", models.ForeignKey(db_column="plano_id", on_delete=django.db.models.deletion.CASCADE, related_name="salvos", to="planos.plano")),
                ("usuario", models.ForeignKey(db_column="usuario_id", on_delete=django.db.models.deletion.CASCADE, related_name="planos_salvos", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "planos_salvos"},
        ),
        migrations.CreateModel(
            name="PlanoCriado",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=255)),
                ("descricao", models.TextField(blank=True, null=True)),
                ("criado_em", models.DateTimeField(auto_now_add=True)),
                ("usuario", models.ForeignKey(db_column="usuario_id", on_delete=django.db.models.deletion.CASCADE, related_name="planos_criados", to=settings.AUTH_USER_MODEL)),
            ],
            options={"db_table": "planos_criados"},
        ),
        migrations.CreateModel(
            name="PlanoTag",
            fields=[
                ("pk", models.CompositePrimaryKey("plano_id", "tag_id", blank=True, editable=False, primary_key=True, serialize=False)),
                ("plano", models.ForeignKey(db_column="id_plano", on_delete=django.db.models.deletion.CASCADE, to="planos.plano")),
                ("tag", models.ForeignKey(db_column="id_tag", on_delete=django.db.models.deletion.CASCADE, to="planos.tag")),
            ],
            options={"db_table": "plano_tags"},
        ),
        migrations.AddField(
            model_name="plano",
            name="tags",
            field=models.ManyToManyField(blank=True, related_name="planos", through="planos.PlanoTag", to="planos.tag"),
        ),
        migrations.AddConstraint(
            model_name="avaliacao",
            constraint=models.UniqueConstraint(fields=("usuario", "plano"), name="uq_avaliacao_usuario_plano"),
        ),
        migrations.AddConstraint(
            model_name="planoandamento",
            constraint=models.UniqueConstraint(fields=("usuario", "plano"), name="uq_andamento_usuario_plano"),
        ),
        migrations.AddConstraint(
            model_name="planosalvo",
            constraint=models.UniqueConstraint(fields=("usuario", "plano"), name="uq_salvo_usuario_plano"),
        ),
    ]
