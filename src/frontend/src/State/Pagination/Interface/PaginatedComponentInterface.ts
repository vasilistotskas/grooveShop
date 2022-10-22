import {
	PaginationCount,
	PaginationLink,
	PaginationResults,
	PaginationTotalPages,
	QueryParamsType
} from '@/State/Pagination/Type/PaginationTypes'
import { AxiosResponse } from 'axios'
import { LocationQuery } from 'vue-router'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'

export default interface PaginatedComponentInterface<TPaginatedModel> {
	readonly uri: typeof window.location.search
	readonly params: LocationQuery

	readonly allPaginatedResults: PaginationResults<TPaginatedModel>
	readonly allPaginatedResultsCount: PaginationCount
	readonly allPaginatedResultsNextPageUrl: PaginationLink['next']
	readonly allPaginatedResultsPreviousPagesUrl: PaginationLink['previous']
	readonly allPaginatedResultsTotalPages: PaginationTotalPages
	readonly currentPageNumber: number
	readonly currentPageQuery?: QueryParamsType

	fetchPaginationData<T>():
		| Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>>
		| undefined
}
