from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny
import random
from datetime import date, timedelta

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

    @action(detail=False, methods=['get'], url_path='show/(?P<show_id>[^/.]+)')
    def riders_by_show(self, request, show_id=None):
        riders = Rider.objects.filter(tv_show=show_id)
        serializer = self.get_serializer(riders, many=True)
        return Response(serializer.data)

  
class ShowView(viewsets.ReadOnlyModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @permission_classes([AllowAny])
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

class ReviewView(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>[^/.]+)')
    def user_reviews(self, request, user_id=None):
        reviews = Review.objects.filter(user_id=user_id)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)


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
    
    @action(detail=False, methods=['get'], url_path='daily')
    @permission_classes([AllowAny])
    def daily_post(self, request):
        """
        Retorna o post do dia já criado pela task.
        """
        today = date.today()
        user_id = 1
        post = None
        for i in range(5):
            ver_data = today - timedelta(days=i)
            post = Post.objects.filter(author_id=user_id, date=ver_data).first()
            if post:
                break
        if not post:
            return Response({'error': 'Nenhum post diário no banco'}, status=404)
        
        tagged_riders = post.tagged_riders.all()
        rider_data = RiderSerializer(tagged_riders, many=True, context={'request': request}).data
        show_ids = tagged_riders.values_list('tv_show', flat=True)
        shows = Show.objects.filter(id__in=show_ids)
        show_data = ShowSerializer(shows, many=True, context={'request': request}).data
        
        post_data = PostSerializer(post, context={'request': request}).data
        
        return Response({'post': post_data, 'tagged_riders': rider_data, 'shows': show_data})
    
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

    @action(detail=False, methods=['get'], url_path='por-post/(?P<post_id>[^/.]+)')
    def comments_by_post(self, request, post_id=None):
        """
        Buscar por ID do post
        """
        comments = self.queryset.filter(post_id=post_id)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)