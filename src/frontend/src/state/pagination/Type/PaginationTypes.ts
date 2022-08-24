import { LocationQuery, LocationQueryValue } from 'vue-router'

export type TPaginatedModel<T> = Record<string, T>
export type PaginationCount = number
export type PaginationLink = {
  next: URL
  previous: URL
}
export type PaginationResults<T> = Array<TPaginatedModel<T>>
export type PaginationTotalPages = number
export type CurrentPageNumberType = { namespace: string; pageNumber: number }
export type QueryParamsType =
  | string
  | LocationQueryValue[]
  | { query: string | QueryParamsType }
  | LocationQuery
  | Record<string, string | LocationQuery | LocationQueryValue[] | { query: string } | number>
export type CurrentQueryType = {
  namespace: string
  currentQuery: QueryParamsType
}
