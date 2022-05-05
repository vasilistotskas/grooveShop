import EntityBase from '@/state/common/EntityBase'
import BlogPostModel from '@/state/blog/BlogPostModel'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'

export default class BlogCommentModel extends EntityBase {

	id!: number
	content!: string
	createdAt!: string
	isApproved!: boolean
	user!: UserDetailsModel
	post!: BlogPostModel
	numberOfLikes!: number

	public constructor(data?: Partial<BlogCommentModel>) {
		super(data)
	}

}
