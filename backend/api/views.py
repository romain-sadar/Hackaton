from rest_framework import viewsets
from .models import QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset
from .serializers import QualityOfLifeSerializer, RealEstateSerializer, DemographicsSerializer, QualityOfLifeDatasetSerializer, RealEstateDatasetSerializer, DemographicsDatasetSerializer

# Quality of Life ViewSet
class QualityOfLifeViewSet(viewsets.ModelViewSet):
    queryset = QualityOfLife.objects.all()
    serializer_class = QualityOfLifeSerializer

# Real Estate ViewSet
class RealEstateViewSet(viewsets.ModelViewSet):
    queryset = RealEstate.objects.all()
    serializer_class = RealEstateSerializer

# Demographics ViewSet
class DemographicsViewSet(viewsets.ModelViewSet):
    queryset = Demographics.objects.all()
    serializer_class = DemographicsSerializer

# Quality of Life Dataset ViewSet
class QualityOfLifeDatasetViewSet(viewsets.ModelViewSet):
    queryset = QualityOfLifeDataset.objects.all()
    serializer_class = QualityOfLifeDatasetSerializer

# Real Estate Dataset ViewSet
class RealEstateDatasetViewSet(viewsets.ModelViewSet):
    queryset = RealEstateDataset.objects.all()
    serializer_class = RealEstateDatasetSerializer

# Demographics Dataset ViewSet
class DemographicsDatasetViewSet(viewsets.ModelViewSet):
    queryset = DemographicsDataset.objects.all()
    serializer_class = DemographicsDatasetSerializer
