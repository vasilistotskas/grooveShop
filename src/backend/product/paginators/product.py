from backend.helpers.paginator import CountPaginator


class ProductPagination(CountPaginator):
    page_size = 16
