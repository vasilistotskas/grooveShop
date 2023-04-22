import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodCountry = z.object({
	name: z.string(),
	alpha2: z.string().min(2).max(2),
	alpha3: z.string().min(3).max(3),
	isoCc: z.number(),
	phoneCode: z.number(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	sortOrder: z.number().nullable(),
	uuid: z.string()
})

export type Country = z.infer<typeof ZodCountry>

export type CountriesQuery = PaginationQuery &
	OrderingQuery & {
		alpha2?: string | undefined
		alpha3?: string | undefined
		name?: string | undefined
		isoCc?: string | undefined
		phoneCode?: string | undefined
	}

export const ZodCountriesQuery = z.object({
	offset: z.string().optional(),
	limit: z.string().optional(),
	ordering: z.string().optional(),
	alpha2: z.string().optional(),
	alpha3: z.string().optional(),
	name: z.string().optional(),
	isoCc: z.string().optional(),
	phoneCode: z.string().optional()
})
