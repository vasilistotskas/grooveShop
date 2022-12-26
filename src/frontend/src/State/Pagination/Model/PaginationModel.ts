import EntityBase from '@/State/Common/EntityBase'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { QueryParamsType } from '@/State/Pagination/Type/PaginationTypes'
import PaginationModelInterface from '@/State/Pagination/Interface/PaginationModelInterface'

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
