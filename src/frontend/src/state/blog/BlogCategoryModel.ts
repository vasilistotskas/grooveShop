import EntityBase from '@/state/common/EntityBase'

export default class BlogCategoryModel extends EntityBase {

	id!: number
	name!: string
	slug!: string
	description!: string

	public constructor(data?: Partial<BlogCategoryModel>) {
		super(data)
	}

}
