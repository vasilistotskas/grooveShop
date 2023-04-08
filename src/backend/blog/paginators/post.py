from backend.helpers.paginator import CountPaginator


class BlogPostPagination(CountPaginator):
    page_size = 4
    page_size_query_param = "page_size"
    max_page_size = 4
    page_query_param = "page"
