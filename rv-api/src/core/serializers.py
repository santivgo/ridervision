from django.conf import settings
from django.core.files import File
from djoser.serializers import UserSerializer as DjoserBaseUserSerializer
from rest_framework import serializers

from core.models import Comment, Post, Review, Rider, Show, User


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
        child=serializers.IntegerField(), write_only=True
    )

    class Meta:
        model = Review
        fields = "__all__"

    def validate(self, attrs):
        if "show_id" not in attrs or "fav_riders_ids" not in attrs:
            return attrs

        show_id = attrs["show_id"]
        riders_ids = attrs["fav_riders_ids"]

        try:
            show = Show.objects.get(id=show_id)
        except Show.DoesNotExist:
            raise serializers.ValidationError(f"Show com ID {show_id} não encontrado.")

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

        return attrs

    def create(self, validated_data):
        show_id = validated_data.pop("show_id")
        riders_ids = validated_data.pop("fav_riders_ids")

        show = Show.objects.get(id=show_id)
        user = self.context["request"].user

        review, created = Review.objects.get_or_create(
            show=show, user=user, defaults=validated_data
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

    def update(self, instance, validated_data):
        if "img" in validated_data and validated_data["img"] is None:
            validated_data.pop("img")

        return super().update(instance, validated_data)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class DjoserUserSerializer(DjoserBaseUserSerializer):
    class Meta(DjoserBaseUserSerializer.Meta):
        fields = DjoserBaseUserSerializer.Meta.fields + ("img",)
