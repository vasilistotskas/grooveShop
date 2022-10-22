import EntityBase from '@/State/Common/EntityBase'

export default class UserModelGql extends EntityBase {
	id!: number
	email!: string
	firstName!: string
	lastName!: string

	constructor(data?: Partial<UserModelGql>) {
		super(data)
	}
}
