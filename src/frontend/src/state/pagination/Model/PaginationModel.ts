import EntityBase from '@/state/common/EntityBase'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { QueryParamsType } from '@/state/pagination/Type/PaginationTypes'
import PaginationModelInterface from '@/state/pagination/Interface/PaginationModelInterface'

export class PaginationModel extends EntityBase {
  pageNumber?: number
  endpointUrl?: string
  method?: ApiBaseMethods
  queryParams?: QueryParamsType

  private constructor(data?: Partial<PaginationModelInterface>) {
    super(data)
  }

  static createPaginationModel(data: PaginationModelInterface): PaginationModel {
    return new PaginationModel(data)
  }
}
