export type TPaginatedModel<T> = Record<string, T>
export type PaginationCount = number
export type PaginationLink = {
  next: URL
  previous: URL
}
export type PaginationResults<T> = Array<TPaginatedModel<T>>
export type PaginationTotalPages = number
