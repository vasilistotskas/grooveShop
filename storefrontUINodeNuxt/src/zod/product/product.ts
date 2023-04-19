import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodProduct = z.object({
	id: z.number().int(),
	name: z.string().max(255),
	slug: z.string().max(50),
	category: z.number().int(),
	absoluteUrl: z.string(),
	description: z.string().nullable(),
	price: z.number(),
	vat: z.number(),
	vatPercent: z.number(),
	vatValue: z.number(),
	finalPrice: z.number(),
	hits: z.number().int(),
	likesCounter: z.number().int(),
	stock: z.number().int(),
	active: z.boolean(),
	weight: z.number(),
	seoTitle: z.string().max(70).nullable(),
	seoDescription: z.string().max(300).nullable(),
	seoKeywords: z.string().max(255).nullable(),
	uuid: z.string().uuid(),
	discountPercent: z.number(),
	discountValue: z.number(),
	priceSavePercent: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	mainImageAbsoluteUrl: z.string(),
	mainImageFilename: z.string(),
	reviewAverage: z.number(),
	reviewCounter: z.number().int()
})

export type Product = Readonly<z.infer<typeof ZodProduct>>

export const ZodProductCreateRequest = z.object({
	name: z.string(),
	slug: z.string(),
	category: z.number().int(),
	description: z.string().optional(),
	price: z.number(),
	vat: z.number(),
	hits: z.number().int().optional(),
	stock: z.number().int().optional(),
	active: z.boolean().optional(),
	weight: z.number().optional(),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
	discountPercent: z.number().optional()
})

export type ProductCreateRequest = z.infer<typeof ZodProductCreateRequest>

export const ZodProductParams = z.object({
	id: z.string()
})

export type ProductParams = z.infer<typeof ZodProductParams>

export const ZodProductQuery = z.object({
	offset: z.string().optional(),
	limit: z.string().optional(),
	ordering: z.string().optional()
})

export type ProductQuery = PaginationQuery & OrderingQuery
export type ProductOrderingField = 'name' | 'price' | 'createdAt'
