import EntityBase from '@/state/common/EntityBase'

export default class TipModel extends EntityBase {

	id!: number
	title!: string
	content!: string
	icon!: string
	url!: string
	createdAt!: string
	active!: boolean
	mainImageAbsoluteUrl!: string
	mainImageFilename!: string

	public constructor(data?: Partial<TipModel>) {
		super(data)
	}

}
