# Generated by Django 5.1.1 on 2024-09-21 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("modules", "0007_factcheck"),
    ]

    operations = [
        migrations.CreateModel(
            name="JardineArgumentEvaluations",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
            options={
                "managed": False,
            },
        ),
        migrations.AddField(
            model_name="comment",
            name="is_good",
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
