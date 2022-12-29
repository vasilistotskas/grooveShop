from backend.helpers.paginator import CountPaginator


class UserProfilePagination(CountPaginator):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 20
    page_query_param = "p"
