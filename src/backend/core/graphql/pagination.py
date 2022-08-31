from strawberry_django_plus import gql
from base64 import b64encode, b64decode
from typing import List, Optional, TypeVar, Generic

GenericType = TypeVar("GenericType")


def encode_cursor(entity_id: int, entity_type: str) -> str:
    """
    Encodes the given ID into a cursor.
    :param entity_id: The ID to encode
    :param entity_type: The model type
    :return: The encoded cursor.
    """
    return b64encode(f"{entity_type}:{entity_id}".encode("ascii")).decode("ascii")


def decode_cursor(cursor: str) -> int:
    """
    Decodes the ID from the given cursor.
    :param cursor: The cursor to decode.
    :return: The decoded ID.
    """
    cursor_data = b64decode(cursor.encode("ascii")).decode("ascii")
    return int(cursor_data.split(":")[1])


@gql.type
class PageMeta:
    has_previous_page: Optional[bool] = gql.field(
        description="Is there a previous page?"
    )
    has_next_page: Optional[bool] = gql.field(
        description="Is there a next page?"
    )
    count: Optional[int] = gql.field(
        description="The total items count."
    )
    total_pages: Optional[int] = gql.field(
        description="The total pages count."
    )
    next_cursor: Optional[str] = gql.field(
        description="The next cursor to continue with."
    )
    start_cursor: Optional[str] = gql.field(
        description="The start cursor to continue with."
    )
    end_cursor: Optional[str] = gql.field(
        description="The last cursor to continue with."
    )
    current_page_number: Optional[int] = gql.field(
        description="The current page number."
    )


@gql.type
class PaginatedResponse(Generic[GenericType]):
    collection: List[GenericType] = gql.field(
        description="The list of items."
    )
    page_meta: PageMeta = gql.field(
        description="Metadata to aid in pagination."
    )


class PaginationBase:
    @staticmethod
    def find_in_matrix_list(value, matrix):
        for matrix_list in matrix:
            if value in matrix_list:
                return [matrix.index(matrix_list) + 1, matrix_list.index(value) + 1]
        return -1

    @staticmethod
    def create_chunks(lst, n):
        """Yield successive n-sized chunks from lst."""
        for i in range(0, len(lst), n):
            yield lst[i:i + n]
