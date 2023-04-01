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

export const ZodCartItemCreateRequest = z.object({
	product: z.string(),
	quantity: z.string()
})

export const ZodCartItemPutRequest = z.object({
	quantity: z.string()
})

export type CartItemCreateRequest = z.infer<typeof ZodCartItemCreateRequest>
export type CartItemPutRequest = z.infer<typeof ZodCartItemPutRequest>

export const ZodCartItemParams = z.object({
	id: z.string()
})

export type CartItemParams = z.infer<typeof ZodCartItemParams>
