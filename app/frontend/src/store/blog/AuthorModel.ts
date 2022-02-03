import PostModel from '@/store/blog/PostModel'
import EntityBase from '@/store/common/EntityBase'
import AuthorUserModel from '@/store/blog/AuthorUserModel'

export default class AuthorModel extends EntityBase {

	id!: number
	bio!: string
	website!: string
	user!: AuthorUserModel
	postSet!: PostModel[]

	public constructor(data?: Partial<AuthorModel>) {
		super(data)
	}

}
