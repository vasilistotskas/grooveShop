from django.db.models import Q
from django.http import Http404
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status, authentication, permissions, generics, viewsets
from django.http import JsonResponse
from .models import *
from .serializers import *


class LatestProductsList(APIView):
    @staticmethod
    def get(request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    @staticmethod
    def get_object(category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def patch(self, request, category_slug, product_slug):
        product = self.get_object(category_slug, product_slug)
        data = {
            "hits": product.hits + 1
        }
        serializer = ProductSerializer(product, data=data, partial=True) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)


class CategoryDetail(APIView):
    @staticmethod
    def get_object(category_slug):
        try:
            return Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, format=None):
        category = self.get_object(category_slug)
        serializer = CategorySerializer(category)
        return Response(serializer.data)


class AllCategoriesList(APIView):
    @staticmethod
    def get(request, format=None):
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
            return Response({"products": []}, status=status.HTTP_404_NOT_FOUND)


class FavouriteList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def filter_objects(user_id):
        try:
            return Favourite.objects.filter(user_id=user_id)
        except Favourite.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format=None):
        favourites = self.filter_objects(user_id)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    def post(self, request, user_id, format=None):
        product_id = request.data.get('product_id')
        serializer = FavouriteSerializer(data=request.data)

        # Check if product is already favourite
        try:
            favourite = Favourite.objects.get(user_id=user_id, product_id=product_id)
            if favourite:
                return Response('Product Already In Favourites', status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            pass

        if serializer.is_valid():
            serializer.save(user_id=user_id, product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavouriteDelete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, user_id, product_id, format=None):
        favourite = Favourite.objects.get(user_id=user_id, product_id=product_id)
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductComments(APIView):
    @staticmethod
    def filter_objects(product_id):
        try:
            return Comment.objects.filter(product_id=product_id)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, product_id, format=None):
        comments = self.filter_objects(product_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class UserComments(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def filter_objects(user_id):
        try:
            return Comment.objects.filter(user_id=user_id)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format=None):
        comments = self.filter_objects(user_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)