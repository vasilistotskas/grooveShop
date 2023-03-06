import { z } from 'zod'

export const ZodPaginated = z.object({
	links: z.object({
		next: z.string().nullable(),
		prev: z.string().nullable()
	}),
	count: z.number(),
	totalPages: z.number(),
	pageSize: z.number(),
	page: z.number(),
	results: z.array(z.unknown())
})

export default interface Paginated<T> {
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

export type PaginationQuery = {
	offset: number
	limit: number
}
