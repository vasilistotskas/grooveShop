import EntityBase from '@/State/Common/EntityBase'
import {
	PaginationTotalPages,
	PaginationResults
} from '@/State/Pagination/Type/PaginationTypes'

export default class PaginatedModel<T> extends EntityBase {
	count!: number
	links: Record<string, string | null> = {
		next: null,
		previous: null
	}
	results!: PaginationResults<T>
	total_pages!: PaginationTotalPages

	public constructor(data?: Partial<PaginatedModel<T>>) {
		super(data)
	}
}
