import { z } from 'zod'

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
