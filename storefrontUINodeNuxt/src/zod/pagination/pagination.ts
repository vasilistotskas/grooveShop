import { z } from 'zod'
import { LocationQueryValue } from 'vue-router'

export type Pagination<T> = {
	links: {
		next?: string | null
		prev?: string | null
	}
	count: number
	totalPages: number
	pageSize: number
	page: number
	results: T[]
}

export const ZodPagination = <T>(resultSchema: z.Schema<T>): z.Schema<Pagination<T>> =>
	z.object({
		links: z.object({
			next: z.string().nullable().optional(),
			prev: z.string().nullable().optional()
		}),
		count: z.number(),
		totalPages: z.number(),
		pageSize: z.number(),
		page: z.number(),
		results: z.array(resultSchema)
	})

export type PaginationQuery = {
	offset: number | LocationQueryValue[] | undefined
	limit: number | LocationQueryValue[] | undefined
}
