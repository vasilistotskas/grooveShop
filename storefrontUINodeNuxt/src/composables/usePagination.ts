import { Pagination } from '~/zod/pagination/pagination'

export const usePagination = <T>(results: Pagination<T>) => {
	const resultsCount = results.count

	const totalPages = results.totalPages

	const pageSize = results.pageSize

	const currentPage = results.page

	const links = results.links

	const offset = (currentPage - 1) * pageSize
	const limit = pageSize

	return {
		resultsCount,
		totalPages,
		pageSize,
		currentPage,
		links,
		offset,
		limit
	}
}
