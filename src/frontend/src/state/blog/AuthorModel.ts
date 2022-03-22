import PostModel from '@/state/blog/PostModel'
import EntityBase from '@/state/common/EntityBase'
import AuthorUserModel from '@/state/blog/AuthorUserModel'

export default class AuthorModel extends EntityBase {

	id!: number
	bio!: string
	website!: string
	user!: AuthorUserModel
	postSet!: Array<PostModel>

	public constructor(data?: Partial<AuthorModel>) {
		super(data)
	}

}
