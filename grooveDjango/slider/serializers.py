from .models import Slider, Slide
from rest_framework import serializers


class SlideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slide
        fields = (
            "id",
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
            "image",
            "thumbnail"
        )


class SliderSerializer(serializers.ModelSerializer):
    slides = SlideSerializer(source='slide_set', many=True, read_only=True)

    class Meta:
        model = Slider
        fields = (
            "id",
            "name",
            "url",
            "title",
            "description",
            "image",
            "thumbnail",
            "slides",
        )