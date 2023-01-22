import EntityBase from '@/State/Common/EntityBase'

export default class UserAccountModelGql extends EntityBase {
	mainImageAbsoluteUrl!: string
	mainImageFilename!: string

	constructor(data?: Partial<UserAccountModelGql>) {
		super(data)
	}
}
