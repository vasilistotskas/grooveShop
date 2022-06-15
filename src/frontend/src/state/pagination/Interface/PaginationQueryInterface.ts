import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'

export default interface PaginationQueryInterface {
  pageNumber?: number
  endpointUrl: string
  method: ApiBaseMethods
  queryParams?: Record<any, any>
}
