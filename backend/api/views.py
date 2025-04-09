from rest_framework import viewsets
from .models import QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset
from .serializers import QualityOfLifeSerializer, RealEstateSerializer, DemographicsSerializer, QualityOfLifeDatasetSerializer, RealEstateDatasetSerializer, DemographicsDatasetSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Avg

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

class AverageByQuartierView(APIView):
    """
    View to return averages by quartier.
    """

    def get(self, request, quartier):
        avg_real_estate = RealEstate.objects.filter(quartier=quartier).aggregate(Avg('prix_m2'))
        
        avg_quality_of_life = QualityOfLife.objects.filter(quartier=quartier).aggregate(Avg('score_transport'))
        
        avg_population = Demographics.objects.filter(quartier=quartier).aggregate(Avg('population'))
        
        return Response({
            "quartier": quartier,
            "average_real_estate_price": avg_real_estate.get('prix_m2__avg', 0),
            "average_quality_of_life": avg_quality_of_life.get('score_transport__avg', 0),
            "average_population": avg_population.get('population__avg', 0)
        }, status=status.HTTP_200_OK)