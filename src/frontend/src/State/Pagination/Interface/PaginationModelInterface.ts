import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { QueryParamsType } from '@/State/Pagination/Type/PaginationTypes'

export default interface PaginationModelInterface {
	pageNumber?: number
	endpointUrl: string
	method: ApiBaseMethods
	queryParams?: QueryParamsType
}
