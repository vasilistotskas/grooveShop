import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import PaginationQueryInterface from '@/state/pagination/Interface/PaginationQueryInterface'
import EntityBase from '@/state/common/EntityBase'

export class PaginationQueryParametersModel extends EntityBase{
	pageNumber!: number
	endpointUrl!: string
	method!: ApiBaseMethods
	queryParams?: string

	private constructor(data?: Partial<PaginationQueryInterface>) {
		super(data)
	}

	static createPaginationQuery(query: PaginationQueryInterface): PaginationQueryParametersModel {
		return new PaginationQueryParametersModel(query)
	}

}