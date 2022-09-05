import {
  PaginationLink,
  PaginationResults,
  QueryParamsType,
} from '@/state/pagination/Type/PaginationTypes'

export default interface PaginationDataInterface<TPaginatedModel> {
  [key: string]: {
    results: PaginationResults<TPaginatedModel>
    resultsCount: number
    resultsNextPage: PaginationLink['next']
    resultsPreviousPages: PaginationLink['previous']
    resultsTotalPages: number
    alternativeToken: string
    currentPageNumber: number
    currentQuery: QueryParamsType
    showNextButton: boolean
    showPreviousButton: boolean
  }
}
