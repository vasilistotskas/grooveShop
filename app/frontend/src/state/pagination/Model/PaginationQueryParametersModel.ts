import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import PaginationQueryModel from '@/state/pagination/Model/PaginationQueryModel'
import EntityBase from '@/state/common/EntityBase'

export class PaginationQueryParametersModel extends EntityBase{
	pageNumber!: number
	endpointUrl!: string
	method!: ApiBaseMethods
	queryParams?: string

	private constructor(data?: Partial<PaginationQueryModel>) {
		super(data)
	}

	static createPaginationQuery(query: PaginationQueryModel): PaginationQueryParametersModel {
		return new PaginationQueryParametersModel(query)
	}

}