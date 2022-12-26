from typing import Dict

from django.test import Client
from django.test import TestCase


class GRAPHQLBaseTestClass(TestCase):

    URL = "/graphql/"

    def setUp(self) -> None:
        self.client = Client()

    def make_query(self, query: str, with_assert: bool = True) -> Dict:
        response = self.client.post(
            self.URL, data={"query": query}, content_type="application/json"
        )
        if with_assert:
            self.assertEqual(response.status_code, 200)
        return response.json()
