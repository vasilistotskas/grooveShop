from backend.helpers.paginator import CountPaginator


class ProductsPagination(CountPaginator):
    page_size = 16


class CategoryProductsPagination(CountPaginator):
    page_size = 36
    page_size_query_param = 'page_size'
    max_page_size = 36
    page_query_param = 'p'


class UserFavouriteProductsPagination(CountPaginator):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 8
    page_query_param = 'p'


class UserReviewPagination(CountPaginator):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3
    page_query_param = 'p'


class ProductReviewPagination(CountPaginator):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'p'
