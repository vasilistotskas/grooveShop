from backend.product_review.models import Review
from django.contrib import admin
from django.contrib import messages
from django.utils.translation import ngettext


class ReviewAdmin(admin.ModelAdmin):
    list_display = ["comment", "status", "created_at"]
    list_filter = ["status"]
    actions = ["make_published", "make_unpublished"]

    def make_published(self, request, queryset):
        updated = queryset.update(status="True")
        self.message_user(
            request,
            ngettext(
                "%d comment was successfully marked as published.",
                "%d comments were successfully marked as published.",
                updated,
            )
            % updated,
            messages.SUCCESS,
        )

    def make_unpublished(self, request, queryset):
        updated = queryset.update(status="False")
        self.message_user(
            request,
            ngettext(
                "%d comment was successfully marked as published.",
                "%d comments were successfully marked as published.",
                updated,
            )
            % updated,
            messages.SUCCESS,
        )

    setattr(
        make_published,
        "short_description",
        "Mark selected comments as published",
    )

    setattr(
        make_unpublished,
        "short_description",
        "Mark selected comments as unpublished",
    )


admin.site.register(Review, ReviewAdmin)
