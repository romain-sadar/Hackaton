from rest_framework import serializers
from .models import QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset

# Quality of Life Serializer
class QualityOfLifeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityOfLife
        fields = ['quartier', 'annee', 'pollution', 'score_transport']

# Real Estate Serializer
class RealEstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstate
        fields = ['quartier', 'annee', 'prix_m2', 'nb_ventes']

# Demographics Serializer
class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographics
        fields = ['quartier', 'annee', 'population', 'revenu_median']

# Quality of Life Dataset Serializer
class QualityOfLifeDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityOfLifeDataset
        fields = ['quartier', 'indice_pollution', 'espaces_verts', 'score_transport', 'commerces_essentiels', 'infrastructure_sante']

# Real Estate Dataset Serializer
class RealEstateDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstateDataset
        fields = ['quartier', 'prix_moyen_m2', 'prix_median', 'evolution_annuelle', 'nombre_ventes', 'type_bien', 'surface_moyenne']

# Demographics Dataset Serializer
class DemographicsDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemographicsDataset
        fields = ['quartier', 'population', 'age_0_14', 'age_15_64', 'age_65_plus', 'revenu_median', 'chomage', 'diplomes_bac_plus_2']
