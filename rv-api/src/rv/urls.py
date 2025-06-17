"""
URL configuration for rv project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from core.views import RiderView, ShowView, UserView, ReviewView, PostView, CommentView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from core.views import ReviewView, RiderView, ShowView, UserView

router = DefaultRouter()
router.register(r"riders", RiderView, basename="rider")
router.register(r"shows", ShowView, basename="show")
router.register(r"users", UserView, basename="user")
router.register(r"reviews", ReviewView, basename="review")
router.register(r"posts", PostView, basename="post")
router.register(r"comments", CommentView, basename="comment")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
