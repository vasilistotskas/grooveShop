from backend.helpers.paginator import LimitOffsetPaginator


class ProductPagination(LimitOffsetPaginator):
    page_size = 16


class ProductImagesPagination(LimitOffsetPaginator):
    page_size = 4
