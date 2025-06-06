from rest_framework import viewsets
from rest_framework.response import Response

from core.serializers import RiderSerializer, ShowSerializer, UserSerializer, ReviewSerializer
from core.models import Rider, Show, User, Review

class RiderView(viewsets.ModelViewSet):
    queryset = Rider.objects.all()
    serializer_class = RiderSerializer
    # def create(self, request, *args, **kwargs):
    #     many = isinstance(request.data, list)
    #     serializer = self.get_serializer(data=request.data, many=many)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     return Response(serializer.data)

class ShowView(viewsets.ReadOnlyModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ReviewView(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

