import * as zod from 'zod'

export const ZodAddress = zod.object({
	title: zod.string().min(3).max(100),
	first_name: zod.string().min(3).max(100),
	last_name: zod.string().min(3).max(100),
	street: zod.string().min(3).max(100),
	street_number: zod.string().min(1).max(100),
	city: zod.string().min(3).max(100),
	zipcode: zod.string().min(3).max(100),
	floor: zod.number().int(),
	location_type: zod.number().int(),
	phone: zod.string(),
	mobile_phone: zod.string(),
	notes: zod.string(),
	country: zod.string(),
	region: zod.string()
})
