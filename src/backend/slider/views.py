from backend.slider.models import Slider
from backend.slider.serializers import SliderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class AllSliders(APIView):
    serializer_class = SliderSerializer

    @staticmethod
    def get(request, format=None):
        sliders = Slider.objects.all()
        serializer = SliderSerializer(sliders, many=True)
        return Response(serializer.data)
