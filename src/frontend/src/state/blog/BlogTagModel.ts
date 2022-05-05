import EntityBase from '@/state/common/EntityBase'

export default class BlogTagModel extends EntityBase {

	id!: number
	name!: string

	public constructor(data?: Partial<BlogTagModel>) {
		super(data)
	}

}
