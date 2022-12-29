import {
	PaginationCount,
	PaginationLink,
	PaginationResults,
	PaginationTotalPages,
	QueryParamsType
} from '@/State/Pagination/Type/PaginationTypes'
import { LocationQuery } from 'vue-router'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'

export default interface PaginatedComponentInterface<TPaginatedModel> {
	clearPagination: boolean
	readonly uri: typeof window.location.search
	readonly params: LocationQuery

	readonly allPaginatedResults: PaginationResults<TPaginatedModel>
	readonly allPaginatedResultsCount: PaginationCount
	readonly allPaginatedResultsNextPageUrl: PaginationLink['next']
	readonly allPaginatedResultsPreviousPagesUrl: PaginationLink['previous']
	readonly allPaginatedResultsTotalPages: PaginationTotalPages
	readonly currentPageNumber: number
	readonly currentPageQuery?: QueryParamsType

	fetchPaginationData<T>(): Promise<void | PaginatedModel<T>> | undefined
}
