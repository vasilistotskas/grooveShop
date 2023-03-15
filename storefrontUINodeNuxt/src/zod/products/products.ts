import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodProductsQuery = z.object({
	offset: z.number().int().nonnegative().optional(),
	limit: z.number().int().nonnegative().optional(),
	ordering: z.string().optional()
})

export type ProductsQuery = PaginationQuery & OrderingQuery
export type ProductsOrderingField = 'name' | 'price' | 'created_at'
export type ProductsOrdering = [
	{ value: 'name'; label: string; options: ['ascending', 'descending'] },
	{ value: 'price'; label: string; options: ['ascending', 'descending'] },
	{ value: 'created_at'; label: string; options: ['ascending', 'descending'] }
]
