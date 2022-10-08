import EntityBase from '@/State/Common/EntityBase'
import BlogTagModel from '@/State/Blog/BlogTagModel'
import PostLikesModel from '@/State/Blog/PostLikesModel'
import BlogCategoryModel from '@/State/Blog/BlogCategoryModel'

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