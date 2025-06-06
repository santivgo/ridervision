from rest_framework import serializers
from core.models import Rider, Show, User, Review
from django.conf import settings
from django.core.files import File
import os

class RiderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rider
        fields = "__all__"

class ShowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Show
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'img']
   
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"