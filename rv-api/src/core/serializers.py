from rest_framework import serializers
from core.models import Rider, Show, User, Review, Post, Comment
from core.models import Rider, Show, User, Review, Post, Comment
from django.conf import settings
from django.core.files import File
from rest_framework import serializers
from core.models import Review, Rider, Show, User
from djoser.serializers import UserSerializer as DjoserUserSerializer


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
        fields = ["id", "username", "img"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        
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