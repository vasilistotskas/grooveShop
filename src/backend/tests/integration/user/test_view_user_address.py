from __future__ import annotations

import json

from backend.user.models import UserAccount
from backend.user.models import UserAddress
from backend.user.serializers.address import UserAddressSerializer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class UserAddressViewSetTestCase(TestCase):
    user: UserAccount
    user_address: UserAddress

    def setUp(self):
        self.user = UserAccount.objects.create_user(
            email="test@test.com", password="test12345@!"
        )
        self.user_address = UserAddress.objects.create(
            user=self.user,
            title="test",
            first_name="test",
            last_name="test",
            street="test",
            street_number="test",
            city="test",
            zipcode="test",
            is_main=True,
        )
        self.client = APIClient()
        self.client.login(email=self.user.email, password="test12345@!")

    def test_list(self):
        response = self.client.get("/api/v1/user/address/")
        user_addresses = UserAddress.objects.all()
        serializer = UserAddressSerializer(user_addresses, many=True)
        self.assertEqual(response.data["results"], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid(self):
        payload = {
            "user": self.user.pk,
            "title": "test_one",
            "first_name": "test_one",
            "last_name": "test_one",
            "street": "test_one",
            "street_number": "test_one",
            "city": "test_one",
            "zipcode": "test_one",
            "is_main": True,
        }
        response = self.client.post(
            "/api/v1/user/address/",
            json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid(self):
        payload = {
            "user": "INVALID",
            "title": "INVALID",
            "first_name": "INVALID",
            "last_name": "INVALID",
            "street": "INVALID",
            "street_number": "INVALID",
            "city": "INVALID",
            "zipcode": "INVALID",
            "is_main": "INVALID",
        }
        response = self.client.post(
            "/api/v1/user/address/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_valid(self):
        response = self.client.get(f"/api/v1/user/address/{self.user_address.pk}/")
        user_address = UserAddress.objects.get(pk=self.user_address.pk)
        serializer = UserAddressSerializer(user_address)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_invalid(self):
        response = self.client.get(f"/api/v1/user/address/{self.user_address.pk + 1}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_valid(self):
        payload = {
            "user": self.user.pk,
            "title": "test_one",
            "first_name": "test_one",
            "last_name": "test_one",
            "street": "test_one",
            "street_number": "test_one",
            "city": "test_one",
            "zipcode": "test_one",
            "is_main": True,
        }
        response = self.client.put(
            f"/api/v1/user/address/{self.user_address.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid(self):
        payload = {
            "user": "INVALID",
            "title": "INVALID",
            "first_name": "INVALID",
            "last_name": "INVALID",
            "street": "INVALID",
            "street_number": "INVALID",
            "city": "INVALID",
            "zipcode": "INVALID",
            "is_main": "INVALID",
        }
        response = self.client.put(
            f"/api/v1/user/address/{self.user_address.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_valid(self):
        payload = {
            "title": "test_one",
        }
        response = self.client.patch(
            f"/api/v1/user/address/{self.user_address.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update_invalid(self):
        payload = {"user": "INVALID", "is_main": "INVALID"}
        response = self.client.patch(
            f"/api/v1/user/address/{self.user_address.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy_valid(self):
        response = self.client.delete(f"/api/v1/user/address/{self.user_address.pk}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_invalid(self):
        response = self.client.delete(
            f"/api/v1/user/address/{self.user_address.pk + 1}/"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
