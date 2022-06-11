import EntityBase from '@/state/common/EntityBase'
import { TipTypeEnum } from '@/state/tip/Enum/TipEnum'

export default class TipModel extends EntityBase {

	id!: number
	title!: string
	content!: string
	type!: TipTypeEnum
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
