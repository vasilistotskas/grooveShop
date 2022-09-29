from backend.helpers.paginator import CountPaginator


class CategoryProductsPagination(CountPaginator):
    page_size = 36
    page_size_query_param = "page_size"
    max_page_size = 36
    page_query_param = "p"
