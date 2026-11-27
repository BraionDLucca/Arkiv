from django.db import migrations, models
import authentication.models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]
    operations = [
        migrations.CreateModel(
            name="Usuario",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("password", models.CharField(db_column="password_hash", max_length=128)),
                ("nome", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=100, unique=True)),
                ("avatar_url", models.URLField(blank=True, max_length=255, null=True)),
                ("data_criacao", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "db_table": "usuarios",
                "verbose_name": "usuário",
                "verbose_name_plural": "usuários",
            },
            managers=[
                ("objects", authentication.models.UsuarioManager()),
            ],
        ),
    ]
