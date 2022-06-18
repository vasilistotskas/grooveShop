export default interface PaginatedDataInterface<T> {
  readonly namespace: string
  readonly count: number
  readonly nextPageUrl: string
  readonly previousPageUrl: string
  readonly totalPages: number
  pageNumber: number
  readonly currentQuery: string
  showNextButton: boolean
  showPreviousButton: boolean
  readonly results: Array<T>

  fetchPaginationData(): Promise<void> | undefined
}
