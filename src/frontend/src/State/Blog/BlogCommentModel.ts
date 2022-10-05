import EntityBase from '@/State/Common/EntityBase'
import BlogPostModel from '@/State/Blog/BlogPostModel'
import UserModelGql from '@/State/User/Profile/UserModelGql'
import UserProfileModelGql from '@/State/User/Profile/UserProfileModelGql'

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
