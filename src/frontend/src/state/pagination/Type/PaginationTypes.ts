import { LocationQuery, LocationQueryValue } from 'vue-router'

export type PaginationCount = number
export type PaginationLink = {
  next: string | null
  previous: string | null
}
export type PaginationResults<TPaginatedModel> = Array<TPaginatedModel>
export type PaginationTotalPages = number
export type QueryParamsType =
  | string
  | LocationQueryValue[]
  | { query: string | QueryParamsType }
  | LocationQuery
  | Record<string, string | LocationQuery | LocationQueryValue[] | { query: string } | number>

export type CurrentPageNumberType = { namespace: string; pageNumber: number }
export type CountType = { namespace: string; count: number }
export type NextPageUrlType = { namespace: string; nextPageUrl: PaginationLink['next'] }
export type PreviousPageUrlType = { namespace: string; previousPageUrl: PaginationLink['previous'] }
export type TotalPagesType = { namespace: string; totalPages: PaginationTotalPages }
export type ShowNextButtonType = { namespace: string; showNextButton: boolean }
export type ShowPreviousButtonType = { namespace: string; showPreviousButton: boolean }
export type PaginationResultsType<TPaginatedModel> = {
  namespace: string
  results: PaginationResults<TPaginatedModel>
}
export type CurrentQueryType = {
  namespace: string
  queryParams: QueryParamsType
}
