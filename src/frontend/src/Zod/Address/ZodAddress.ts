import { z } from 'zod'

export const ZodAddress = z.object({
	id: z.number().optional(),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	uuid: z.string().optional(),
	title: z.string().min(3).max(100),
	first_name: z.string().min(3).max(100),
	last_name: z.string().min(3).max(100),
	street: z.string().min(3).max(100),
	street_number: z.string().min(1).max(100),
	city: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	floor: z.number().int().optional(),
	location_type: z.number().int().optional(),
	phone: z.string().optional(),
	mobile_phone: z.string().optional(),
	notes: z.string().optional(),
	is_main: z.boolean().optional(),
	user: z.number().optional(),
	country: z.string().min(2).max(2).optional(),
	region: z.string().min(3).max(3).optional()
})

export type Address = z.infer<typeof ZodAddress>
