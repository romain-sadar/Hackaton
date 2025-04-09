from rest_framework.routers import SimpleRouter
from .views import (
    QualityOfLifeViewSet,
    RealEstateViewSet,
    DemographicsViewSet,
    QualityOfLifeDatasetViewSet,
    RealEstateDatasetViewSet,
    DemographicsDatasetViewSet,
)

router = SimpleRouter()

router.register("quality_of_life", QualityOfLifeViewSet, basename="quality_of_life")
router.register("real_estate", RealEstateViewSet, basename="real_estate")
router.register("demographics", DemographicsViewSet, basename="demographics")
router.register("quality_of_life_dataset", QualityOfLifeDatasetViewSet, basename="quality_of_life_dataset")
router.register("real_estate_dataset", RealEstateDatasetViewSet, basename="real_estate_dataset")
router.register("demographics_dataset", DemographicsDatasetViewSet, basename="demographics_dataset")


urlpatterns = router.urls