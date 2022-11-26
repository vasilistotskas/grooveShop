from backend.helpers.paginator import CountPaginator


class AddressPagination(CountPaginator):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 8
    page_query_param = "p"
