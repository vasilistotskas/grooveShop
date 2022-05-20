import EntityBase from '@/state/common/EntityBase'
import BlogTagModel from '@/state/blog/BlogTagModel'
import BlogCategoryModel from '@/state/blog/BlogCategoryModel'

export default class BlogPostModel extends EntityBase {

	id!: number
	author!: object
	mainImageAbsoluteUrl!: string
	mainImageFilename!: string
	numberOfLikes!: number
	metaDescription!: string
	publishDate!: string
	published!: boolean
	slug!: string
	subtitle!: string
	title!: string
	tags!: Array<BlogTagModel>
	category!: BlogCategoryModel

	public constructor(data?: Partial<BlogPostModel>) {
		super(data)
	}

}