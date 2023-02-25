import { z } from 'zod'

export const ZodProduct = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	uuid: z.string(),
	category: z.number(),
	absoluteUrl: z.string(),
	description: z.string(),
	price: z.number(),
	vat: z.number(),
	vatPercent: z.number(),
	vatValue: z.number(),
	finalPrice: z.number(),
	hits: z.number(),
	likesCounter: z.number(),
	stock: z.number(),
	active: z.boolean(),
	weight: z.string(),
	seoTitle: z.string(),
	seoDescription: z.string(),
	seoKeywords: z.string(),
	discountPercent: z.number(),
	discountValue: z.number(),
	priceSavePercent: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	mainImageAbsoluteUrl: z.string(),
	mainImageFilename: z.string(),
	reviewAverage: z.number(),
	reviewCounter: z.number(),
	images: z.array(
		z.object({
			id: z.number(),
			isMain: z.boolean(),
			productImageAbsoluteUrl: z.string(),
			productImageFilename: z.string()
		})
	)
})

export type Product = z.infer<typeof ZodProduct>
