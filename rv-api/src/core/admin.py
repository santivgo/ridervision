from django.contrib import admin
from core.models import User, Show, Rider, Post, Comment


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'img')
    search_fields = ('username',)

class ShowAdmin(admin.ModelAdmin):
    list_display = ('name', 'year')
    search_fields = ('name',)

class RiderAdmin(admin.ModelAdmin):
    list_display = ('name', 'tv_show')
    search_fields = ('name',)

class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'content', 'date')
    search_fields = ('author__username', 'content')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'content', 'date')
    search_fields = ('author__username', 'content')

admin.site.register(User, UserAdmin)
admin.site.register(Show, ShowAdmin)
admin.site.register(Rider, RiderAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)