from backend.core.pagination.count import CountPaginator


class ProductFavouritePagination(CountPaginator):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 8
    page_query_param = "page"
