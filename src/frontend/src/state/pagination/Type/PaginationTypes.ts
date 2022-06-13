export type TPaginatedModel = Record<any, any>
export type PaginationCount = number
export type PaginationLink = {
	next: URL,
	previous: URL
}
export type PaginationResults = Array<TPaginatedModel>
export type PaginationTotalPages = number
