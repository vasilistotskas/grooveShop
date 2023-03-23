import { z } from 'zod'

export const ZodAccount = z.object({
	id: z.number(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string().nullable(),
	city: z.string().nullable(),
	zipcode: z.string().nullable(),
	address: z.string().nullable(),
	place: z.string().nullable(),
	country: z.string().nullable(),
	region: z.string().nullable(),
	isActive: z.boolean(),
	isStaff: z.boolean(),
	mainImageAbsoluteUrl: z.string(),
	mainImageFilename: z.string(),
	isSuperuser: z.boolean(),
	lastLogin: z.string().nullable(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string()
})

export type Account = z.infer<typeof ZodAccount>
