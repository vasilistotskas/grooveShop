from django.db.models import Q
from django.http import Http404
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status, authentication, permissions, generics, viewsets

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


class Search(APIView):
    def post(self, request, format=None):
        query = request.data.get('query', '')

        if query:
            products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
            serializer = ProductSerializer(products, many=True, context={'user': self.request.user})
            return Response(serializer.data)
        else:
            return Response({"products": []})



class FavouriteList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavouriteItemSerializer
    queryset = FavouriteItem.objects.all()

    def get(self, format=None):
        user = self.request.user
        favourite_id = Favourite.objects.get(user=user)
        favourites = FavouriteItem.objects.filter(favourite_id=favourite_id)
        serializer = FavouriteItemSerializer(favourites, many=True)
        return Response(serializer.data)

    def post(self, request, formate=None):
        serializer = FavouriteItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

