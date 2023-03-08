import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/paginated'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodProduct = z.object({
	id: z.number().int().nonnegative(),
	name: z.string().max(255),
	slug: z.string().max(50),
	category: z.number().int().nonnegative(),
	absoluteUrl: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	vat: z.number().nonnegative(),
	vatPercent: z.number().nonnegative(),
	vatValue: z.number().nonnegative(),
	finalPrice: z.number().nonnegative(),
	hits: z.number().int().nonnegative(),
	likesCounter: z.number().int().nonnegative(),
	stock: z.number().int().nonnegative(),
	active: z.boolean(),
	weight: z.number().nonnegative(),
	seoTitle: z.string().max(70).nullable(),
	seoDescription: z.string().max(300).nullable(),
	seoKeywords: z.string().max(255).nullable(),
	uuid: z.string().uuid(),
	discountPercent: z.number().nonnegative(),
	discountValue: z.number().nonnegative(),
	priceSavePercent: z.number().nonnegative(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	mainImageAbsoluteUrl: z.string(),
	mainImageFilename: z.string(),
	reviewAverage: z.number().nonnegative(),
	reviewCounter: z.number().int().nonnegative()
})

export type Product = Readonly<z.infer<typeof ZodProduct>>

export const ZodCreateRequest = z.object({
	name: z.string(),
	slug: z.string(),
	category: z.number().int().nonnegative(),
	description: z.string().nullable(),
	price: z.number(),
	vat: z.number(),
	stock: z.number().int().nonnegative(),
	active: z.boolean(),
	weight: z.number().nonnegative(),
	seoTitle: z.string().nullable(),
	seoDescription: z.string().nullable(),
	seoKeywords: z.string().nullable(),
	discountPercent: z.number().nonnegative()
})

export type ProductQuery = PaginationQuery & OrderingQuery
export type ProductOrderingField = 'name' | 'price' | 'created_at'
export type ProductOrdering = [
	{ value: 'name'; label: 'Name'; options: ['ascending', 'descending'] },
	{ value: 'price'; label: 'Price'; options: ['ascending', 'descending'] },
	{ value: 'created_at'; label: 'Created At'; options: ['ascending', 'descending'] }
]

export type CreateRequest = Readonly<z.infer<typeof ZodCreateRequest>>
