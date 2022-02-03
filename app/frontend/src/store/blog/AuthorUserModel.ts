import EntityBase from '@/store/common/EntityBase'

export default class AuthorUserModel extends EntityBase {

	id!: number
	email!: string
	firstName!: string
	lastName!: string

	public constructor(data?: Partial<AuthorUserModel>) {
		super(data)
	}

}
