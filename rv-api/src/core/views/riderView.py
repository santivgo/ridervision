from rest_framework import viewsets
from core.models.rider import Rider
from core.serializers.riderSerializer import RiderSerializer

class RiderView(viewsets.ModelViewSet):
    queryset = Rider.objects.all()
    serializer_class = RiderSerializer