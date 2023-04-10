import { z } from 'zod'
import { ZodOrderItem } from '~/zod/order/order-item'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const StatusEnum = z.enum(['Sent', 'Paid and sent', 'Canceled', 'Pending'])

export const ZodOrder = z.object({
	id: z.number(),
	user: z.number().nullable(),
	payWay: z.string().nullable(),
	status: StatusEnum,
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	address: z.string(),
	zipcode: z.string(),
	place: z.string(),
	city: z.string(),
	phone: z.string(),
	customerNotes: z.string().nullable(),
	orderItemOrder: z.array(ZodOrderItem),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string(),
	totalPrice: z.number()
})

export const ZodOrderQuery = z.object({
	page: z.string().optional(),
	ordering: z.string().optional(),
	user_id: z.string().optional(),
	status: z.string().optional()
})

export type Order = z.infer<typeof ZodOrder>

export type OrderQuery = PaginationQuery &
	OrderingQuery & {
		user_id?: string | undefined
		status?: string | undefined
	}

export const ZodOrderCreateRequest = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	address: z.string(),
	zipcode: z.string(),
	place: z.string(),
	city: z.string(),
	phone: z.string(),
	customerNotes: z.string().nullable(),
	orderItemOrder: z.array(ZodOrderItem)
})

export type OrderCreateRequest = z.infer<typeof ZodOrderCreateRequest>

export const ZodOrderParams = z.object({
	id: z.number()
})

export type OrderParams = z.infer<typeof ZodOrderParams>

export type OrderOrderingField = 'created_at'
