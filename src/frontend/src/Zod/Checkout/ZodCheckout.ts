import { z } from 'zod'

export const ZodCheckout = z.object({
	address: z.string().min(3).max(100),
	city: z.string().min(3).max(100),
	email: z.string().email({ message: 'Must be a valid email' }),
	firstName: z.string().min(3).max(100),
	lastName: z.string().min(3).max(100),
	phone: z
		.number()
		.positive({ message: 'Must be a positive phone' })
		.int({ message: 'Must be an integer' }),
	place: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	customerNotes: z.string(),
	country: z.string(),
	region: z.string()
})
