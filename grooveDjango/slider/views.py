from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


class AllSliders(APIView):
    @staticmethod
    def get(request, format=None):
        sliders = Slider.objects.all()
        serializer = SliderSerializer(sliders, many=True)
        return Response(serializer.data)