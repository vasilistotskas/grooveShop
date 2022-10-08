from backend.tests.graphql.base import GRAPHQLBaseTestClass


class TestGetMe(GRAPHQLBaseTestClass):
    def setUp(self):
        super(TestGetMe, self).setUp()

    def test_should_get_me(self):

        query = """
        query {
          me {
            name
          }
        }
        """
        response_data = self.make_query(query)
        my_name = response_data["data"]["me"]["name"]
        self.assertEqual(my_name, "Arturo")
