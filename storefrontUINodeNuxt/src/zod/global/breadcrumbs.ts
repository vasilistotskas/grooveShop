import { z } from 'zod'

export const ZodBreadCrumbsItemObjectSchema = z.object({
	link: z.string().optional(),
	text: z.string().optional()
})

export type BreadCrumbsItemObject = z.infer<typeof ZodBreadCrumbsItemObjectSchema>
export class BreadCrumbsObject {
	parent: BreadCrumbsItemObject = {}
	children: BreadCrumbsItemObject[] = []
	delimiter = '>'

	toJSON(): string {
		return JSON.stringify({
			parent: this.parent,
			children: this.children,
			delimiter: this.delimiter
		})
	}
}
