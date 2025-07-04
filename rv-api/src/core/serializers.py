from rest_framework import serializers
from core.models import Rider, Show, User, Review, Post, Comment
from core.models import Rider, Show, User, Review, Post, Comment
from django.conf import settings
from django.core.files import File
from rest_framework import serializers
from core.models import Review, Rider, Show, User
from djoser.serializers import UserSerializer as DjoserUserSerializer


class RiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rider
        fields = "__all__"


class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "img"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
    
    def validate(self, data):

        if 'show' not in data or 'fav_riders' not in data:
            return data
        
        show = data['show']
        riders_fav = data['fav_riders']

        for rider in riders_fav:
            if rider.tv_show != show:
                raise serializers.ValidationError(
                    f"O Rider '{rider.name}' não pertence à série '{show.name}'."
                )
        return data

        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class DjoserUserSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = DjoserUserSerializer.Meta.fields + ('img',)