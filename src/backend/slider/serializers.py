from backend.slider.models import Slide
from backend.slider.models import Slider
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = (
            "id",
            "slider",
            "url",
            "title",
            "subtitle",
            "description",
            "discount",
            "button_label",
            "show_button",
            "date_start",
            "date_end",
            "order_position",
            "main_image_absolute_url",
            "main_image_filename",
            "thumbnail",
        )


class SliderSerializer(serializers.ModelSerializer):
    slides = serializers.SerializerMethodField("get_slides")

    @extend_schema_field(serializers.ListSerializer(child=SlideSerializer()))
    def get_slides(self, obj: Slider) -> SlideSerializer:
        return SlideSerializer(obj.slide_slider.all(), many=True).data

    class Meta:
        model = Slider
        fields = (
            "id",
            "name",
            "url",
            "title",
            "description",
            "main_image_absolute_url",
            "main_image_filename",
            "thumbnail",
            "video",
            "slides",
        )
