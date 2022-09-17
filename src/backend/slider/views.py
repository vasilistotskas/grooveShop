from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


class AllSliders(APIView):
    @staticmethod
    def get(request, format=None):
        sliders = Slider.objects.all()
        serializer = SliderSerializer(sliders, many=True)
        return Response(serializer.data)
