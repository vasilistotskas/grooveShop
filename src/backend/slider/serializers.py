from backend.slider.models import Slide
from backend.slider.models import Slider
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
    slides = SlideSerializer(source="slide_set", many=True, read_only=True)

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
