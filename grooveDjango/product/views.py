from django.db.models import Q
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status, authentication, permissions

from .models import Product, Category, Favourite, FavouriteItem
from .serializers import ProductSerializer, CategorySerializer, FavouriteSerializer, FavouriteItemSerializer


class LatestProductsList(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    def get_object(self, category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)


class CategoryDetail(APIView):
    def get_object(self, category_slug):
        try:
            return Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, format=None):
        category = self.get_object(category_slug)
        serializer = CategorySerializer(category)
        return Response(serializer.data)


class AllCategoriesList(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def search(request):
    query = request.data.get('query', '')

    if query:
        products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({"products": []})


class FavouriteList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        # for filter based on user
        # favourites = Favourite.objects.filter(user=request.user)
        favourites = Favourite.objects.all()
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)


class FavouriteUserDetail(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, request, id):
        try:
            return Favourite.objects.filter(user=request.user)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        favourites = self.get_object(request, id)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)


class FavouriteItemDetail(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, favourites_id, id):
        try:
            return FavouriteItem.objects.filter(favourite__id=favourites_id).get(id=id)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, favourites_id, id, format=None):
        favourite = self.get_object(favourites_id, id)
        serializer = FavouriteItemSerializer(favourite)
        return Response(serializer.data)
