from django.db import models

class QualityOfLife(models.Model):
    quartier = models.CharField(max_length=100)
    annee = models.IntegerField()
    pollution = models.DecimalField(max_digits=5, decimal_places=2)
    score_transport = models.IntegerField()

    def __str__(self):
        return f"Quality of Life in {self.quartier} for {self.annee}"

class RealEstate(models.Model):
    quartier = models.CharField(max_length=100)
    annee = models.IntegerField()
    prix_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    nb_ventes = models.IntegerField()

    def __str__(self):
        return f"Real Estate in {self.quartier} for {self.annee}"

class Demographics(models.Model):
    quartier = models.CharField(max_length=100)
    annee = models.IntegerField()
    population = models.IntegerField()
    revenu_median = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"Demographics in {self.quartier} for {self.annee}"

class QualityOfLifeDataset(models.Model):
    quartier = models.CharField(max_length=100)
    indice_pollution = models.DecimalField(max_digits=5, decimal_places=2)
    espaces_verts = models.DecimalField(max_digits=5, decimal_places=2)
    score_transport = models.IntegerField()
    commerces_essentiels = models.IntegerField()
    infrastructure_sante = models.BooleanField()

    def __str__(self):
        return f"Quality of Life Dataset in {self.quartier}"

class RealEstateDataset(models.Model):
    quartier = models.CharField(max_length=100)
    prix_moyen_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    prix_median = models.DecimalField(max_digits=10, decimal_places=2)
    evolution_annuelle = models.DecimalField(max_digits=5, decimal_places=2)
    nombre_ventes = models.IntegerField()
    type_bien = models.CharField(max_length=50)
    surface_moyenne = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Real Estate Dataset in {self.quartier}"

class DemographicsDataset(models.Model):
    quartier = models.CharField(max_length=100)
    population = models.IntegerField()
    age_0_14 = models.IntegerField()
    age_15_64 = models.IntegerField()
    age_65_plus = models.IntegerField()
    revenu_median = models.DecimalField(max_digits=15, decimal_places=2)
    chomage = models.DecimalField(max_digits=5, decimal_places=2)
    diplomes_bac_plus_2 = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Demographics Dataset in {self.quartier}"
