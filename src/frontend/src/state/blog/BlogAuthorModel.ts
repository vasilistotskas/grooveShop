import BlogPostModel from '@/state/blog/BlogPostModel'
import EntityBase from '@/state/common/EntityBase'
import BlogAuthorUserModel from '@/state/blog/BlogAuthorUserModel'

export default class BlogAuthorModel extends EntityBase {

	id!: number
	bio!: string
	website!: string
	user!: BlogAuthorUserModel
	postSet!: Array<BlogPostModel>

	public constructor(data?: Partial<BlogAuthorModel>) {
		super(data)
	}

}
