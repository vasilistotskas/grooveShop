import EntityBase from '@/State/Common/EntityBase'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import BlogAuthorUserModel from '@/State/Blog/BlogAuthorUserModel'

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
