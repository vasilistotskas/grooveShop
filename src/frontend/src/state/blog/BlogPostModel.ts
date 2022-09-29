import EntityBase from '@/state/common/EntityBase'
import BlogTagModel from '@/state/blog/BlogTagModel'
import PostLikesModel from '@/state/blog/PostLikesModel'
import BlogCategoryModel from '@/state/blog/BlogCategoryModel'

export default class BlogPostModel extends EntityBase {
  id!: number
  author!: object
  mainImageAbsoluteUrl!: string
  mainImageFilename!: string
  numberOfLikes!: number
  metaDescription!: string
  publishedAt!: string
  isPublished!: boolean
  slug!: string
  likes!: Array<PostLikesModel>
  subtitle!: string
  title!: string
  body!: string
  tags!: Array<BlogTagModel>
  category!: BlogCategoryModel

  public constructor(data?: Partial<BlogPostModel>) {
    super(data)
  }
}
