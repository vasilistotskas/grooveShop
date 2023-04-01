import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodFavourite = z.object({
	id: z.number(),
	user: z.number(),
	product: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string()
})

export type Favourite = z.infer<typeof ZodFavourite>

export type FavouriteQuery = PaginationQuery &
	OrderingQuery & {
		id?: number | undefined
		user_id?: number | undefined
		product_id?: number | undefined
	}

export const ZodFavouriteQuery = z.object({
	offset: z.string().optional(),
	limit: z.string().optional(),
	ordering: z.string().optional(),
	id: z.string().optional(),
	user_id: z.string().optional(),
	product_id: z.string().optional()
})

export const ZodFavouriteCreateRequest = z.object({
	user: z.string(),
	product: z.string()
})

export type FavouriteCreateRequest = z.infer<typeof ZodFavouriteCreateRequest>

export const ZodFavouriteParams = z.object({
	id: z.string()
})

export type FavouriteParams = z.infer<typeof ZodFavouriteParams>
