import { LocationQuery } from 'vue-router'
import {
  PaginationCount,
  PaginationLink,
  PaginationResults,
  PaginationTotalPages,
  QueryParamsType,
} from '@/state/pagination/Type/PaginationTypes'

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

  fetchPaginationData(): Promise<void> | undefined
}
