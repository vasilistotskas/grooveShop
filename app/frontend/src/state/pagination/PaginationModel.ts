import EntityBase from '@/state/common/EntityBase'

export default class ProductReviewModel extends EntityBase {

	count!: number
	link: Record<string, unknown> = {
		next: '',
		previous: ''
	}
	results!: []
	total_pages!: number

	public constructor(data?: Partial<ProductReviewModel>) {
		super(data)
	}

}
