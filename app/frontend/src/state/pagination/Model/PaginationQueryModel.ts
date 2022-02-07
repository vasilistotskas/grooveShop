import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
export default interface PaginationQueryModel {
	pageNumber: number
	endpointUrl: string
	method: ApiBaseMethods
	queryParams?: string
}