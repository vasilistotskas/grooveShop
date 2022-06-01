import EntityBase from '@/state/common/EntityBase'

export default class UserProfileModelGql extends EntityBase {
	mainImageAbsoluteUrl!: string
	mainImageFilename!: string

	constructor(data?: Partial<UserProfileModelGql>) {
		super(data)
	}

}
