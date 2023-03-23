import { z } from 'zod'

export const ZodCheckout = z.object({
	firstName: z.string().min(3).max(100),
	lastName: z.string().min(3).max(100),
	address: z.string().min(3).max(100),
	city: z.string().min(3).max(100),
	email: z.string().email({ message: 'Must be a valid email' }),
	phone: z.string(),
	place: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	country: z.string(),
	region: z.string(),
	customerNotes: z.string().optional()
})

export type Checkout = z.infer<typeof ZodCheckout>
