from __future__ import annotations

import json

from backend.country.models import Country
from backend.country.serializers import CountrySerializer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class CountryViewSetTestCase(TestCase):
    country: Country

    def setUp(self):
        self.country = Country.objects.create(
            alpha_2="GR",
            alpha_3="GRC",
            name="Greece",
            iso_cc=300,
            phone_code=30,
        )
        self.client = APIClient()

    def test_list(self):
        response = self.client.get("/api/v1/country/")
        countrys = Country.objects.all()
        serializer = CountrySerializer(countrys, many=True)
        self.assertEqual(response.data["results"], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid(self):
        payload = {
            "alpha_2": "CY",
            "alpha_3": "CYP",
            "name": "Cyprus",
            "iso_cc": 196,
            "phone_code": 357,
        }

        response = self.client.post(
            "/api/v1/country/", json.dumps(payload), content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid(self):
        payload = {
            "alpha_2": "GRR",
            "alpha_3": "GRRCC",
            "name": "Greece",
            "iso_cc": "30000",
            "phone_code": "30000",
        }
        response = self.client.post(
            "/api/v1/country/", json.dumps(payload), content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_valid(self):
        response = self.client.get(f"/api/v1/country/{self.country.pk}/")
        country = Country.objects.get(pk=self.country.pk)
        serializer = CountrySerializer(country)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_invalid(self):
        invalid_country = "invalid"
        response = self.client.get(f"/api/v1/country/{invalid_country}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_valid(self):
        payload = {
            "alpha_2": "CY",
            "alpha_3": "CYP",
            "name": "Cyprus",
            "iso_cc": 196,
            "phone_code": 357,
        }

        response = self.client.put(
            f"/api/v1/country/{self.country.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid(self):
        payload = {
            "alpha_2": "GRR",
            "alpha_3": "GRRCC",
            "name": "Greece",
            "iso_cc": "30000",
            "phone_code": "30000",
        }
        response = self.client.put(
            f"/api/v1/country/{self.country.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_valid(self):
        payload = {
            "name": "Cyprus",
        }
        response = self.client.patch(
            f"/api/v1/country/{self.country.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update_invalid(self):
        payload = {
            "alpha_3": "GRRCC",
        }

        response = self.client.patch(
            f"/api/v1/country/{self.country.pk}/",
            json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy_valid(self):
        response = self.client.delete(f"/api/v1/country/{self.country.pk}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_invalid(self):
        invalid_country = "invalid"
        response = self.client.delete(f"/api/v1/country/{invalid_country}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
