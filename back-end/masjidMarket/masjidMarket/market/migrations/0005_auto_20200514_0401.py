# Generated by Django 3.0.6 on 2020-05-14 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0004_auto_20200514_0400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='items',
            field=models.ManyToManyField(blank=True, to='market.Product'),
        ),
    ]