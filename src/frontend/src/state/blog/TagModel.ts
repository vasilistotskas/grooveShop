import EntityBase from '@/state/common/EntityBase'

export default class TagModel extends EntityBase {

	id!: number
	name!: string

	public constructor(data?: Partial<TagModel>) {
		super(data)
	}

}
