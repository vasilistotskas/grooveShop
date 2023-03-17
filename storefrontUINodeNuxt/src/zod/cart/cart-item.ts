import { z } from 'zod'

export const ZodCartItem = z.object({
	id: z.number(),
	cart: z.number(),
	product: z.number(),
	quantity: z.number(),
	totalPrice: z.number(),
	totalDiscountValue: z.number(),
	productDiscountPercentage: z.number()
})

export type CartItem = Readonly<z.infer<typeof ZodCartItem>>
