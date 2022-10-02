from base64 import b64decode
from base64 import b64encode
from typing import Generic
from typing import List
from typing import Optional
from typing import TypeVar

import strawberry.django

GenericType = TypeVar("GenericType")


@strawberry.type
class PageMeta:
    has_previous_page: Optional[bool] = strawberry.field(
        description="Is there a previous page?"
    )
    has_next_page: Optional[bool] = strawberry.field(
        description="Is there a next page?"
    )
    count: Optional[int] = strawberry.field(description="The total items count.")
    total_pages: Optional[int] = strawberry.field(description="The total pages count.")
    next_cursor: Optional[str] = strawberry.field(
        description="The next cursor to continue with."
    )
    start_cursor: Optional[str] = strawberry.field(
        description="The start cursor to continue with."
    )
    end_cursor: Optional[str] = strawberry.field(
        description="The last cursor to continue with."
    )
    current_page_number: Optional[int] = strawberry.field(
        description="The current page number."
    )

    def __init__(
        self,
        has_previous_page: Optional[bool] = None,
        has_next_page: Optional[bool] = None,
        count: Optional[int] = None,
        total_pages: Optional[int] = None,
        next_cursor: Optional[str] = None,
        start_cursor: Optional[str] = None,
        end_cursor: Optional[str] = None,
        current_page_number: Optional[int] = None,
    ):
        self.has_previous_page = has_previous_page
        self.has_next_page = has_next_page
        self.count = count
        self.total_pages = total_pages
        self.next_cursor = next_cursor
        self.start_cursor = start_cursor
        self.end_cursor = end_cursor
        self.current_page_number = current_page_number


@strawberry.type
class PaginatedResponse(Generic[GenericType]):
    collection: List[GenericType] = strawberry.field(description="The list of items.")
    page_meta: PageMeta = strawberry.field(description="Metadata to aid in pagination.")

    def __init__(self, collection: List[GenericType], page_meta: PageMeta):
        self.collection = collection
        self.page_meta = page_meta


class PaginationBase:
    @staticmethod
    def find_in_matrix_list(value, matrix):
        """Return value position in list of lists."""
        for matrix_list in matrix:
            if value in matrix_list:
                return [matrix.index(matrix_list) + 1, matrix_list.index(value) + 1]
        return -1

    @staticmethod
    def create_chunks(lst, n):
        """Yield successive n-sized chunks from lst."""
        for i in range(0, len(lst), n):
            yield lst[i : i + n]

    @staticmethod
    def encode_cursor(entity_id: int, entity_type: str) -> str:
        """Encode the given ID into a cursor."""
        """
        :param entity_id: The ID to encode
        :param entity_type: The model type
        :return: The encoded cursor.
        """
        return b64encode(f"{entity_type}:{entity_id}".encode("ascii")).decode("ascii")

    @staticmethod
    def decode_cursor(cursor: str) -> int:
        """Decode the ID from the given cursor."""
        """
        :param cursor: The cursor to decode.
        :return: The decoded ID.
        """
        cursor_data = b64decode(cursor.encode("ascii")).decode("ascii")
        return int(cursor_data.split(":")[1])
