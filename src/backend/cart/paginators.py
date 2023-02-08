from backend.helpers.paginator import CountPaginator


class CartPagination(CountPaginator):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10
    page_query_param = "p"


class CartItemPagination(CountPaginator):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10
    page_query_param = "p"