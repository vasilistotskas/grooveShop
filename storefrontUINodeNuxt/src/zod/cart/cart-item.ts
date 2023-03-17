import { z } from 'zod'

export const ZodCartItem = z.object({
	id: z.number(),
	cart: z.number(),
	product: z.number(),
	quantity: z.number(),
	totalPrice: z.number(),
	totalDiscountValue: z.number(),
	productDiscountPercent: z.number()
})

export type CartItem = Readonly<z.infer<typeof ZodCartItem>>

export const ZodCreateRequest = z.object({
	product: z.number(),
	quantity: z.number()
})

export const ZodPutRequest = z.object({
	quantity: z.number()
})

export type CreateRequest = z.infer<typeof ZodCreateRequest>
export type PutRequest = z.infer<typeof ZodPutRequest>

export const ZodParams = z.object({
	id: z.number()
})

export type Params = z.infer<typeof ZodParams>
