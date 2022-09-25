from backend.helpers.paginator import CountPaginator


class ProductsPagination(CountPaginator):
    page_size = 16
