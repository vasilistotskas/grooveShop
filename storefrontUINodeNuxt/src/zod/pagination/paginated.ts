import { z } from 'zod'
import { LocationQueryValue } from 'vue-router'

export type Paginated<T> = {
	links: {
		next: string | null
		prev: string | null
	}
	count: number
	totalPages: number
	pageSize: number
	page: number
	results: T[]
}

export const ZodPaginated = <T>(resultSchema: z.Schema<T>): z.Schema<Paginated<T>> =>
	z.object({
		links: z.object({
			next: z.string().nullable(),
			prev: z.string().nullable()
		}),
		count: z.number(),
		totalPages: z.number(),
		pageSize: z.number(),
		page: z.number(),
		results: z.array(resultSchema)
	})

export type PaginationQuery = {
	offset: string | LocationQueryValue[] | undefined
	limit: string | LocationQueryValue[] | undefined
}
