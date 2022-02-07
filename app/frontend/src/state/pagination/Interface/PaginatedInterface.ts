import {
	PaginationCount,
	PaginationLink,
	PaginationTotalPages,
} from '@/state/pagination/Type/PaginationTypes'
export default interface PaginatedInterface<RM> {

	readonly allPaginatedResults: Array<RM>
	readonly allPaginatedResultsCount: PaginationCount
	readonly allPaginatedResultsNextPageUrl: PaginationLink['next']
	readonly allPaginatedResultsPreviousPageUrl: PaginationLink['previous']
	readonly allPaginatedResultsTotalPages: PaginationTotalPages
	readonly currentPageNumber: number
	readonly currentPageQuery?: string

	readonly uri: typeof window.location.search
	readonly params: Record<string, string> | string | URLSearchParams
}