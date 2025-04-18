# Generated by Django 5.2 on 2025-04-10 09:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quartier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='demographics',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
        migrations.AddField(
            model_name='demographicsdataset',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
        migrations.AddField(
            model_name='qualityoflife',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
        migrations.AddField(
            model_name='qualityoflifedataset',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
        migrations.AddField(
            model_name='realestate',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
        migrations.AddField(
            model_name='realestatedataset',
            name='quartier_temp',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.quartier'),
        ),
    ]
