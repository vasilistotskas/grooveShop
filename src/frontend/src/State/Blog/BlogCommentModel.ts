import EntityBase from '@/State/Common/EntityBase'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import UserModelGql from '@/State/User/Account/UserModelGql'
import UserAccountModelGql from '@/State/User/Account/UserAccountModelGql'

export default class BlogCommentModel extends EntityBase {
	id!: number
	content!: string
	createdAt!: string
	isApproved!: boolean
	user!: UserModelGql
	userAccount!: UserAccountModelGql
	post!: BlogPostModel
	numberOfLikes!: number

	public constructor(data?: Partial<BlogCommentModel>) {
		super(data)
	}
}
