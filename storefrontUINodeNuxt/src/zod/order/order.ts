import { z } from 'zod'
import { ZodOrderItem } from '~/zod/order/order-item'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodOrder = z.object({
	id: z.number(),
	user: z.number(),
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
	paidAmount: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string(),
	totalPrice: z.number()
})

export type Order = z.infer<typeof ZodOrder>

export type OrderQuery = PaginationQuery & OrderingQuery
