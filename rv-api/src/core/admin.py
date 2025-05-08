from django.contrib import admin
from core.models.user import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'img')
    search_fields = ('username',)

admin.site.register(User, UserAdmin)