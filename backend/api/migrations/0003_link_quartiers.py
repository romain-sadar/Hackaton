from django.db import migrations

def migrate_quartier_to_fk(apps, schema_editor):
    Quartier = apps.get_model("api", "Quartier")
    QualityOfLife = apps.get_model("api", "QualityOfLife")
    RealEstate = apps.get_model("api", "RealEstate")
    Demographics = apps.get_model("api", "Demographics")
    QualityOfLifeDataset = apps.get_model("api", "QualityOfLifeDataset")
    RealEstateDataset = apps.get_model("api", "RealEstateDataset")
    DemographicsDataset = apps.get_model("api", "DemographicsDataset")

    quartier_cache = {q.name: q for q in Quartier.objects.all()}

    missing_quartiers = set()

    models_to_migrate = [QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset]
    
    for model in models_to_migrate:
        for instance in model.objects.all():
            quartier_name = instance.quartier_temp
            quartier_obj = quartier_cache.get(quartier_name)
            if quartier_obj:
                instance.quartier = quartier_obj 
                instance.save()
            else:
                missing_quartiers.add(quartier_name)
                print(f"⚠️ Quartier '{quartier_name}' not found for instance {instance.pk} in model {model.__name__}")

    for quartier_name in missing_quartiers:
        Quartier.objects.create(name=quartier_name)

    quartier_cache = {q.name: q for q in Quartier.objects.all()}

    for model in models_to_migrate:
        for instance in model.objects.all():
            quartier_name = instance.quartier_temp
            quartier_obj = quartier_cache.get(quartier_name)
            if quartier_obj:
                instance.quartier = quartier_obj 
                instance.save()

class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_quartier_demographics_quartier_temp_and_more"),
    ]

    operations = [
        migrations.RunPython(migrate_quartier_to_fk),
    ]
