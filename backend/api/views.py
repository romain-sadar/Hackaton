from rest_framework import viewsets
from .models import QualityOfLife, RealEstate, Demographics, QualityOfLifeDataset, RealEstateDataset, DemographicsDataset
from .serializers import QualityOfLifeSerializer, RealEstateSerializer, DemographicsSerializer, QualityOfLifeDatasetSerializer, RealEstateDatasetSerializer, DemographicsDatasetSerializer, StatsQuartierSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
    
class StatsQuartierView(APIView):
    def get(self, request, nom_quartier):
        qol_data = QualityOfLife.objects.filter(quartier=nom_quartier, annee=2024).first()
        real_estate_data = RealEstate.objects.filter(quartier=nom_quartier, annee=2024).first()
        demographics_data = Demographics.objects.filter(quartier=nom_quartier, annee=2024).first()

        if not qol_data or not real_estate_data or not demographics_data:
            return Response({"detail": "Data not found for the specified quartier and year."}, status=status.HTTP_404_NOT_FOUND)

        combined_data = {
            'quartier': nom_quartier,
            'pollution': qol_data.pollution,
            'score_transport': qol_data.score_transport,
            'prix_m2': real_estate_data.prix_m2,
            'nb_ventes': real_estate_data.nb_ventes,
            'population': demographics_data.population,
            'revenu_median': demographics_data.revenu_median,
        }

        serializer = StatsQuartierSerializer(combined_data)

        return Response(serializer.data)
    
@api_view(['GET'])
def list_quartiers(request):
    quartiers_ql = QualityOfLife.objects.values_list('quartier', flat=True).distinct()
    quartiers_re = RealEstate.objects.values_list('quartier', flat=True).distinct()
    quartiers_demo = Demographics.objects.values_list('quartier', flat=True).distinct()

    all_quartiers = set(q.strip() for q in quartiers_ql) | set(q.strip() for q in quartiers_re) | set(q.strip() for q in quartiers_demo)
    
    sorted_quartiers = sorted(all_quartiers)

    return Response({"quartiers": sorted_quartiers})