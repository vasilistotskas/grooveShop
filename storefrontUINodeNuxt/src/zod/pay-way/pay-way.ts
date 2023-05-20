import { z } from 'zod'

export const ZodPayWay = z.object({
	name: z.string(),
	active: z.boolean(),
	cost: z.number(),
	freeForOrderAmount: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	sortOrder: z.number().nullish(),
	uuid: z.string()
})

export type PayWay = z.infer<typeof ZodPayWay>
