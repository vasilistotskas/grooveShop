import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'
import { FloorChoicesEnum, LocationChoicesEnum } from '~/zod/global/general'
export const ZodAddress = z.object({
	id: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string().uuid(),
	title: z.string().min(3).max(100),
	firstName: z.string().min(3).max(100),
	lastName: z.string().min(3).max(100),
	street: z.string().min(3).max(100),
	streetNumber: z.string().min(1).max(100),
	city: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	floor: z.nativeEnum(FloorChoicesEnum).nullable(),
	locationType: z.nativeEnum(LocationChoicesEnum).nullable(),
	phone: z.string().nullable(),
	mobilePhone: z.string().nullable(),
	notes: z.string().nullable(),
	isMain: z.boolean().nullable(),
	user: z.number().nullable(),
	country: z.string().min(2).max(2).optional(),
	region: z.string().min(3).max(3).optional()
})

export type Address = z.infer<typeof ZodAddress>

export type AddressQuery = PaginationQuery &
	OrderingQuery & {
		id?: string | undefined
		userId?: string | undefined
		expand?: string | undefined
	}

export const ZodAddressQuery = z.object({
	page: z.string().optional(),
	ordering: z.string().optional(),
	id: z.string().optional(),
	userId: z.string().optional(),
	expand: z.string().optional()
})

export const ZodAddressCreateRequest = z.object({
	title: z.string().min(3).max(100),
	firstName: z.string().min(3).max(100),
	lastName: z.string().min(3).max(100),
	street: z.string().min(3).max(100),
	streetNumber: z.string().min(1).max(100),
	city: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	floor: z.nativeEnum(FloorChoicesEnum).nullable(),
	locationType: z.nativeEnum(LocationChoicesEnum).nullable(),
	phone: z.string().optional(),
	mobilePhone: z.string().optional(),
	notes: z.string().optional(),
	isMain: z.boolean().optional(),
	user: z.number().optional(),
	country: z.string().min(2).max(2).optional(),
	region: z.string().min(3).max(3).optional()
})

export type AddressCreateRequest = z.infer<typeof ZodAddressCreateRequest>

export const ZodAddressParams = z.object({
	id: z.string()
})

export const ZodAddressPutRequest = z.object({
	title: z.string().min(3).max(100).optional(),
	firstName: z.string().min(3).max(100).optional(),
	lastName: z.string().min(3).max(100).optional(),
	street: z.string().min(3).max(100).optional(),
	streetNumber: z.string().min(1).max(100).optional(),
	city: z.string().min(3).max(100).optional(),
	zipcode: z.string().min(3).max(100).optional(),
	floor: z.nativeEnum(FloorChoicesEnum).nullable(),
	locationType: z.nativeEnum(LocationChoicesEnum).nullable(),
	phone: z.string().optional(),
	mobilePhone: z.string().optional(),
	notes: z.string().optional(),
	isMain: z.boolean().optional(),
	user: z.number().optional(),
	country: z.string().min(2).max(2).optional(),
	region: z.string().min(3).max(3).optional()
})
export type AddressPutRequest = z.infer<typeof ZodAddressPutRequest>

export type AddressParams = z.infer<typeof ZodAddressParams>

export type AddressOrderingField =
	| 'id'
	| 'user'
	| 'country'
	| 'zipcode'
	| 'floor'
	| 'locationType'
	| 'isMain'
	| 'createdAt'
	| 'updatedAt'
