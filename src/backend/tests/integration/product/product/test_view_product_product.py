from __future__ import annotations

import json

from backend.product.models.category import ProductCategory
from backend.product.models.product import Product
from backend.product.serializers.product import ProductSerializer
from backend.vat.models import Vat
from rest_framework import status
from rest_framework.test import APITestCase


class ProductViewSetTestCase(APITestCase):
    product: Product

    def setUp(self):
        self.product = Product.objects.create(
            name="test",
            slug="test",
            description="test",
            price=10.00,
            active=True,
            stock=10,
            discount_percent=0.00,
            hits=0,
            weight=0.00,
        )

    def test_list(self):
        response = self.client.get("/api/v1/product/")
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.data["results"], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid(self):
        category = ProductCategory.objects.create(
            name="test",
            slug="test",
            description="test",
        )
        vat = Vat.objects.create(value=20)
        payload = {
            "name": "test_one",
            "slug": "test_one",
            "description": "test_one",
            "price": 10.00,
            "active": True,
            "stock": 10,
            "discount_percent": 0.00,
            "hits": 0,
            "weight": 0.00,
            "category": category.pk,
            "vat": vat.pk,
        }
        response = self.client.post(
            "/api/v1/product/", json.dumps(payload), content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid(self):
        payload = {
            "name": "invalid",
            "slug": True,
            "description": True,
            "price": "invalid",
            "active": "invalid",
            "stock": "invalid",
            "discount_percent": "invalid",
            "hits": "invalid",
            "weight": "invalid",
        }
        response = self.client.post(
            "/api/v1/product/", json.dumps(payload), content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_valid(self):
        response = self.client.get(f"/api/v1/product/{self.product.pk}/")
        product = Product.objects.get(pk=self.product.pk)
        serializer = ProductSerializer(product)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_invalid(self):
        response = self.client.get(f"/api/v1/product/{self.product.pk + 1}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_valid(self):
        category = ProductCategory.objects.create(
            name="test_two",
            slug="test_two",
            description="test_two",
        )
        vat = Vat.objects.create(value=25)
        payload = {
            "name": "test_one",
            "slug": "test_one",
            "description": "test_one",
            "price": 10.00,
            "active": True,
            "stock": 10,
            "discount_percent": 0.00,
            "hits": 0,
            "weight": 0.00,
            "category": category.pk,
            "vat": vat.pk,
        }
        response = self.client.put(
            f"/api/v1/product/{self.product.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid(self):
        payload = {
            "name": "invalid",
            "slug": True,
            "description": True,
            "price": "invalid",
            "active": "invalid",
            "stock": "invalid",
            "discount_percent": "invalid",
            "hits": "invalid",
            "weight": "invalid",
        }
        response = self.client.put(
            f"/api/v1/product/{self.product.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_valid(self):
        payload = {
            "name": "test_one",
            "slug": "test_one",
            "description": "test_one",
            "price": 10.00,
            "active": True,
            "stock": 10,
            "discount_percent": 0.00,
            "hits": 0,
            "weight": 0.00,
        }
        response = self.client.patch(
            f"/api/v1/product/{self.product.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update_invalid(self):
        payload = {
            "name": "invalid",
            "slug": True,
            "description": True,
            "price": "invalid",
            "active": "invalid",
            "stock": "invalid",
            "discount_percent": "invalid",
            "hits": "invalid",
            "weight": "invalid",
        }
        response = self.client.patch(
            f"/api/v1/product/{self.product.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy_valid(self):
        response = self.client.delete(f"/api/v1/product/{self.product.pk}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_invalid(self):
        response = self.client.get(f"/api/v1/product/{self.product.pk + 1}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
