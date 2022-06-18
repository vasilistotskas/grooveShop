import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import PaginatedQueryParams from '@/state/pagination/Interface/PaginatedQueryParams'

export default interface PaginationQueryInterface {
  pageNumber?: number
  endpointUrl: string
  method: ApiBaseMethods
  queryParams?: Partial<PaginatedQueryParams>
}
