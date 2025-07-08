from rest_framework import serializers
from core.models import Rider, Show, User, Review, Post, Comment
from core.models import Rider, Show, User, Review, Post, Comment
from django.conf import settings
from django.core.files import File
from rest_framework import serializers
from core.models import Review, Rider, Show, User
from djoser.serializers import UserSerializer as DjoserUserSerializer


class RiderSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Rider
        fields = "__all__"


class ShowSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Show
        fields = "__all__"


class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "img"]


class ReviewSerializer(serializers.ModelSerializer):
    show = ShowSerializer(read_only=True)
    show_id = serializers.IntegerField(write_only=True)
    fav_riders = RiderSerializer(many=True, read_only=True)
    fav_riders_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True
    )

    class Meta:
        model = Review
        fields = "__all__"
    
    def validate(self, data):
        if 'show_id' not in data or 'fav_riders_ids' not in data:
            return data
        
        show_id = data['show_id']
        riders_ids = data['fav_riders_ids']
        
        try:
            show = Show.objects.get(id=show_id)
        except Show.DoesNotExist:
            raise serializers.ValidationError(
                f"Show com ID {show_id} não encontrado."
            )
        
        riders = Rider.objects.filter(id__in=riders_ids)
        
        if len(riders) != len(riders_ids):
            raise serializers.ValidationError(
                "Um ou mais riders não foram encontrados."
            )
        
        for rider in riders:
            if rider.tv_show != show:
                raise serializers.ValidationError(
                    f"O Rider '{rider.name}' não pertence à série '{show.name}'."
                )
        
        return data
    
    
    def create(self, validated_data):
        show_id = validated_data.pop('show_id')
        riders_ids = validated_data.pop('fav_riders_ids')
        
        show = Show.objects.get(id=show_id)
        user = self.context['request'].user
        
        review, created = Review.objects.get_or_create(
            show=show,
            user=user,
            defaults=validated_data
        )
        
        # Se não foi criada (já existia), atualiza os campos
        if not created:
            for attr, value in validated_data.items():
                setattr(review, attr, value)
            review.save()
        
        # Atualiza os riders favoritos
        riders = Rider.objects.filter(id__in=riders_ids)
        review.fav_riders.set(riders)
        
        return review

        
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