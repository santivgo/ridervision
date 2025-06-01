from rest_framework import serializers
from core.models import Rider, Show
from django.conf import settings
from django.core.files import File
import os

class RiderBulkSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        obj = [Rider(**item) for item in validated_data]
        return Rider.objects.bulk_create(obj)
    
class RiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rider
        fields = "__all__"
        list_serializer_class = RiderBulkSerializer

class ShowBulkSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        obj = [Show(**item) for item in validated_data]
        return Show.objects.bulk_create(obj)

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = "__all__"
        list_serializer_class = ShowBulkSerializer
    
   

