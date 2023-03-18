import { z } from 'zod'
import { ZodProduct } from '~/zod/product/product'

export const ZodCartItem = z.object({
	id: z.number(),
	cart: z.number(),
	product: ZodProduct,
	quantity: z.number(),
	totalPrice: z.number(),
	totalDiscountValue: z.number(),
	productDiscountPercent: z.number()
})

export type CartItem = Readonly<z.infer<typeof ZodCartItem>>

export const ZodCreateRequest = z.object({
	product: z.string(),
	quantity: z.string()
})

export const ZodPutRequest = z.object({
	quantity: z.string()
})

export type CreateRequest = z.infer<typeof ZodCreateRequest>
export type PutRequest = z.infer<typeof ZodPutRequest>

export const ZodParams = z.object({
	id: z.string()
})

export type Params = z.infer<typeof ZodParams>
