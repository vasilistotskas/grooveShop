import { z } from 'zod'

export const ZodAccount = z.object({
	id: z.number(),
	email: z.string(),
	image: z.string().nullable(),
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

export const ZodAccountParams = z.object({
	id: z.string()
})

export type AccountParams = z.infer<typeof ZodAccountParams>

export const ZodAccountPatchRequest = z.object({
	email: z.string().optional(),
	image: z.string().nullable().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phone: z.string().nullable().optional(),
	city: z.string().nullable().optional(),
	zipcode: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	place: z.string().nullable().optional(),
	country: z.string().nullable().optional(),
	region: z.string().nullable().optional(),
	isActive: z.boolean().optional(),
	isStaff: z.boolean().optional()
})

export type AccountPatchRequest = z.infer<typeof ZodAccountPatchRequest>

export const ZodAccountPutRequest = z.object({
	email: z.string(),
	image: z.string().nullable().optional(),
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string().nullable(),
	city: z.string().nullable(),
	zipcode: z.string().nullable(),
	address: z.string().nullable(),
	place: z.string().nullable(),
	country: z.string().nullable(),
	region: z.string().nullable(),
	isActive: z.boolean().optional(),
	isStaff: z.boolean().optional()
})

export type AccountPutRequest = z.infer<typeof ZodAccountPutRequest>
