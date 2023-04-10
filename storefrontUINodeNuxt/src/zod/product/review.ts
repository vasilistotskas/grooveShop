import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'
import { ZodProduct } from '~/zod/product/product'
import { ZodAccount } from '~/zod/user/account'

export const StatusEnum = z.enum(['New', 'True', 'False'])

export const ZodReview = z.object({
	id: z.number(),
	product: z.union([z.number(), ZodProduct]),
	user: z.union([z.number(), ZodAccount]),
	comment: z.string(),
	rate: z.number(),
	status: StatusEnum,
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	publishedAt: z.string().datetime({ offset: true }).nullable(),
	isPublished: z.boolean(),
	uuid: z.string()
})

export type Review = z.infer<typeof ZodReview>

export type ReviewQuery = PaginationQuery &
	OrderingQuery & {
		id?: string | undefined
		product_id?: string | undefined
		user_id?: string | undefined
		expand?: string | undefined
	}

export const ZodReviewQuery = z.object({
	page: z.string().optional(),
	ordering: z.string().optional(),
	id: z.string().optional(),
	product_id: z.string().optional(),
	user_id: z.string().optional(),
	expand: z.string().optional()
})

export type ReviewsOrderingField = 'id' | 'user_id' | 'product_id' | 'created_at'

export const ZodReviewCreateRequest = z.object({
	product: z.string(),
	user: z.string(),
	comment: z.string(),
	rate: z.string(),
	status: z.string()
})

export type ReviewCreateRequest = z.infer<typeof ZodReviewCreateRequest>

export const ZodReviewPutRequest = z.object({
	product: z.string(),
	user: z.string(),
	comment: z.string(),
	rate: z.string()
})

export type ReviewPutRequest = z.infer<typeof ZodReviewPutRequest>

export const ZodReviewParams = z.object({
	id: z.string()
})

export type ReviewParams = z.infer<typeof ZodReviewParams>

export type ReviewActionPayload = {
	id: number
	comment: string
	productId: number
	rate: number
	userId: number
}
