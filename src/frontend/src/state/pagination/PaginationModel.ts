import EntityBase from '@/state/common/EntityBase'
import { TPaginatedModel, PaginationTotalPages } from '@/state/pagination/Type/PaginationTypes'

export default class PaginationModel extends EntityBase {

	count!: number
	link: Record<string, unknown> = {
		next: URL,
		previous: URL
	}
	results!: Array<TPaginatedModel>
	total_pages!: PaginationTotalPages

	public constructor(data?: Partial<PaginationModel>) {
		super(data)
	}

}
