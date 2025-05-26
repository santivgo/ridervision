from django.contrib import admin
from core.models.user import User
from core.models.show import Show
from core.models.rider import Rider
from core.models.post import Post
from core.models.comment import Comment

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