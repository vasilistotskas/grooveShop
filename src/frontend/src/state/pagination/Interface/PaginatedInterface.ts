import { LocationQuery } from 'vue-router'
import {
	PaginationCount,
	PaginationLink,
	PaginationTotalPages,
} from '@/state/pagination/Type/PaginationTypes'

export default interface PaginatedInterface<RM> {

	readonly uri: typeof window.location.search
	readonly params: LocationQuery

	readonly allPaginatedResults: Array<RM>
	readonly allPaginatedResultsCount: PaginationCount
	readonly allPaginatedResultsNextPageUrl: PaginationLink['next']
	readonly allPaginatedResultsPreviousPageUrl: PaginationLink['previous']
	readonly allPaginatedResultsTotalPages: PaginationTotalPages
	readonly currentPageNumber: number
	readonly currentPageQuery?: string

	fetchPaginationData(): Promise<void> | undefined

}