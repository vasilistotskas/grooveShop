import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { QueryParamsType } from '@/state/pagination/Type/PaginationTypes'

export default interface PaginationModelInterface {
  pageNumber?: number
  endpointUrl: string
  method: ApiBaseMethods
  queryParams?: QueryParamsType
}
