from rest_framework import serializers
from core.models.rider import Rider

class RiderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rider
        fields = "__all__"