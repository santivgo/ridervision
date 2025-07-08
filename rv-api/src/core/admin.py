from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from core.models import Comment, Post, Review, Rider, Show, User


class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = "__all__"

    def clean(self):
        cleaned_data = super().clean()
        show = cleaned_data.get("show")
        fav_riders = cleaned_data.get("fav_riders")

        if show and fav_riders:
            invalid_riders = []
            for rider in fav_riders:
                if rider.tv_show != show:
                    invalid_riders.append(rider.name)

            if invalid_riders:
                raise ValidationError(
                    f"Os seguintes riders não pertencem à série '{show.name}': {', '.join(invalid_riders)}"
                )

        return cleaned_data


class UserAdmin(admin.ModelAdmin):
    list_display = (id, "username", "img")
    search_fields = ("username",)


class ShowAdmin(admin.ModelAdmin):
    list_display = ("name", "year")
    search_fields = ("name",)


class RiderAdmin(admin.ModelAdmin):
    list_display = ("name", "tv_show")
    search_fields = ("name",)


class ReviewAdmin(admin.ModelAdmin):

    form = ReviewForm
    list_display = ("user", "show", "show_review")
    search_fields = ("user",)


class PostAdmin(admin.ModelAdmin):
    list_display = ("author", "content", "date")
    search_fields = ("author__username", "content")


class CommentAdmin(admin.ModelAdmin):
    list_display = ("author", "post", "content", "date")
    search_fields = ("author__username", "content")


admin.site.register(User, UserAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Show, ShowAdmin)
admin.site.register(Rider, RiderAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
