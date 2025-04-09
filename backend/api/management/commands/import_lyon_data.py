import csv
from django.core.management.base import BaseCommand
from api.models import QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset

class Command(BaseCommand):
    help = 'Imports new datasets into the database'

    def handle(self, *args, **kwargs):
        self.import_quality_of_life()
        self.import_real_estate()
        self.import_demographics()
        self.import_quality_of_life_dataset()
        self.import_real_estate_dataset()
        self.import_demographics_dataset()

    def import_quality_of_life(self):
        with open('data/Historique_Qualit__de_Vie_Lyon__2018-2024_.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            print(reader.fieldnames)
            for row in reader:
                QualityOfLife.objects.create(
                    quartier=row['quartier'],
                    annee=row['annee'],
                    pollution=row['pollution'],
                    score_transport=row['score_transport']
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported QualityOfLife data'))

    def import_real_estate(self):
        with open('data/Historique_Immobilier_Lyon__2018-2024_.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                RealEstate.objects.create(
                    quartier=row['quartier'],
                    annee=row['annee'],
                    prix_m2=row['prix_m2'],
                    nb_ventes=row['nb_ventes']
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported RealEstate data'))

    def import_demographics(self):
        with open('data/Historique_D_mographie_Lyon__2018-2024_.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                Demographics.objects.create(
                    quartier=row['quartier'],
                    annee=row['annee'],
                    population=row['population'],
                    revenu_median=row['revenu_median']
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported Demographics data'))

    def import_quality_of_life_dataset(self):
        with open('data/Dataset_Qualit__de_Vie_Lyon.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                QualityOfLifeDataset.objects.create(
                    quartier=row['quartier'],
                    indice_pollution=row['indice_pollution'],
                    espaces_verts=row['espaces_verts'],
                    score_transport=row['score_transport'],
                    commerces_essentiels=row['commerces_essentiels'],
                    infrastructure_sante=row['infrastructure_sante'] == 'True'
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported QualityOfLifeDataset data'))

    def import_real_estate_dataset(self):
        with open('data/Dataset_Immobilier_Lyon.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                RealEstateDataset.objects.create(
                    quartier=row['quartier'],
                    prix_moyen_m2=row['prix_moyen_m2'],
                    prix_median=row['prix_median'],
                    evolution_annuelle=row['evolution_annuelle'],
                    nombre_ventes=row['nombre_ventes'],
                    type_bien=row['type_bien'],
                    surface_moyenne=row['surface_moyenne']
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported RealEstateDataset data'))

    def import_demographics_dataset(self):
        with open('data/Dataset_D_mographie_Lyon.csv', 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                DemographicsDataset.objects.create(
                    quartier=row['quartier'],
                    population=row['population'],
                    age_0_14=row['age_0_14'],
                    age_15_64=row['age_15_64'],
                    age_65_plus=row['age_65_plus'],
                    revenu_median=row['revenu_median'],
                    chomage=row['chomage'],
                    diplomes_bac_plus_2=row['diplomes_bac_plus_2']
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported DemographicsDataset data'))
