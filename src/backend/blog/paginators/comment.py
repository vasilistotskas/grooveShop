from backend.core.pagination.count import CountPaginator


class BlogCommentPagination(CountPaginator):
    page_size = 4
    page_size_query_param = "page_size"
    max_page_size = 4
    page_query_param = "page"
