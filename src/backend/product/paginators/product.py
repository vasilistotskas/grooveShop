from backend.helpers.paginator import LimitOffsetPaginator


class ProductPagination(LimitOffsetPaginator):
    page_size = 16
