import { z } from 'zod'
import { PaginationQuery } from '~/zod/pagination/pagination'
import { OrderingQuery } from '~/zod/ordering/ordering'

export const ZodImage = z.object({
	id: z.number(),
	title: z.string(),
	product: z.number(),
	image: z.string(),
	thumbnail: z.string().nullable(),
	isMain: z.boolean(),
	productImageAbsoluteUrl: z.string(),
	productImageFilename: z.string(),
	createdAt: z.string().datetime({ offset: true }),
	updatedAt: z.string().datetime({ offset: true }),
	uuid: z.string(),
	sortOrder: z.number()
})

export const ZodImageQuery = z.object({
	id: z.string().optional(),
	product: z.string().optional(),
	isMain: z.string().optional()
})

export type Image = z.infer<typeof ZodImage>

export type ImageQuery = PaginationQuery &
	OrderingQuery & {
		id?: string | undefined
		product?: string | undefined
		isMain?: string | undefined
	}
