import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodRegion = z.object({
	alpha: z.string().min(3).max(3),
	alpha2: z.string().min(2).max(2),
	name: z.string(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	sortOrder: z.number().nullable(),
	uuid: z.string()
})

export type Region = z.infer<typeof ZodRegion>

export type RegionsQuery = PaginationQuery &
	OrderingQuery & {
		name?: string | undefined
		alpha?: string | undefined
		alpha2?: string | undefined
	}

export const ZodRegionsQuery = z.object({
	offset: z.string().optional(),
	limit: z.string().optional(),
	ordering: z.string().optional(),
	name: z.string().optional(),
	alpha: z.string().optional(),
	alpha2: z.string().optional()
})
