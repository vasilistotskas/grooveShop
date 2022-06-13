import EntityBase from '@/state/common/EntityBase'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import PaginationQueryInterface from '@/state/pagination/Interface/PaginationQueryInterface'

export class PaginationQueryParametersModel extends EntityBase{
	pageNumber?: number
	endpointUrl?: string
	method?: ApiBaseMethods
	queryParams?: Record<any, any>

	private constructor(data?: Partial<PaginationQueryInterface>) {
		super(data)
	}

	static createPaginationQuery(query: PaginationQueryInterface): PaginationQueryParametersModel {
		return new PaginationQueryParametersModel(query)
	}

}