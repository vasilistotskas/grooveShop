import EntityBase from '@/state/common/EntityBase'
import BlogPostModel from '@/state/blog/BlogPostModel'
import UserModelGql from '@/state/user/data/UserModelGql'
import UserProfileModelGql from '@/state/user/data/UserProfileModelGql'

export default class BlogCommentModel extends EntityBase {
  id!: number
  content!: string
  createdAt!: string
  isApproved!: boolean
  user!: UserModelGql
  userProfile!: UserProfileModelGql
  post!: BlogPostModel
  numberOfLikes!: number

  public constructor(data?: Partial<BlogCommentModel>) {
    super(data)
  }
}
