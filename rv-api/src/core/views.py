from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from core.models import Post, Review, Rider, Show, User, Comment
from core.serializers import (
    CommentSerializer,
    PostSerializer,
    ReviewSerializer,
    RiderSerializer,
    ShowSerializer,
    UserSerializer,
)


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

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        filters = {}

        author_id = self.request.query_params.get('author')
        if author_id and author_id.isdigit():
            filters['author_id'] = int(author_id)

        return queryset.filter(**filters)

    @action(detail=False, methods=['get'], url_path='day')
    def get_daily_post(self, request):
        daily_post = self.queryset.first()
        if daily_post:
            # Serializar o post
            post_serializer = self.get_serializer(daily_post)

            # Buscar os dados dos Riders associados
            tagged_riders = daily_post.tagged_riders
            rider_data = []
            if tagged_riders:
                rider_data = Rider.objects.filter(id__in=tagged_riders)
                rider_serializer = RiderSerializer(rider_data, many=True)

            # Combinar os dados do post com os dados dos Riders
            response_data = {
                "post": post_serializer.data,
                "tagged_riders": rider_serializer.data  # Dados completos dos Riders
            }
            return Response(response_data)

        return Response({'detail': 'Nenhum post encontrado'}, status=404)
    
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        filters = {}

        author_id = self.request.query_params.get('author')
        post_id = self.request.query_params.get('post')

        if author_id and author_id.isdigit():
            filters['author_id'] = int(author_id)

        if post_id and post_id.isdigit():
            filters['post_id'] = int(post_id)

        return queryset.filter(**filters)