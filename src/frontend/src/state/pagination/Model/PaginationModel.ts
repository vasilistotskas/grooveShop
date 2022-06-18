import EntityBase from '@/state/common/EntityBase'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import PaginatedQueryParams from '@/state/pagination/Interface/PaginatedQueryParams'
import PaginationQueryInterface from '@/state/pagination/Interface/PaginationQueryInterface'

export class PaginationModel extends EntityBase {
  pageNumber?: number
  endpointUrl?: string
  method?: ApiBaseMethods
  queryParams?: Partial<PaginatedQueryParams>

  private constructor(data?: Partial<PaginationQueryInterface>) {
    super(data)
  }

  static createPaginationQuery(query: PaginationQueryInterface): PaginationModel {
    return new PaginationModel(query)
  }
}
