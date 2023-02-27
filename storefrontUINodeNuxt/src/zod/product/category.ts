import { z } from 'zod'

export const ZodCategory = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	description: z.string(),
	categoryMenuImageOneAbsoluteUrl: z.string(),
	categoryMenuImageOneFilename: z.string(),
	categoryMenuImageTwoAbsoluteUrl: z.string(),
	categoryMenuImageTwoFilename: z.string(),
	categoryMenuMainBannerAbsolute_url: z.string(),
	categoryMenuMainBannerFilename: z.string(),
	parent: z.number(),
	level: z.number(),
	treeId: z.number(),
	absoluteUrl: z.string(),
	recursiveProductCount: z.number(),
	seoTitle: z.string().nullable(),
	seoDescription: z.string().nullable(),
	seoKeywords: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	uuid: z.string()
})

export type Category = z.infer<typeof ZodCategory>