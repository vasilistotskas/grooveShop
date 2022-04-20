import EntityBase from '@/state/common/EntityBase'
import BlogTagModel from '@/state/blog/BlogTagModel'

export default class BlogPostModel extends EntityBase {

	id!: number
	author!: object
	mainImageAbsoluteUrl!: string
	mainImageFilename!: string
	metaDescription!: string
	publishDate!: string
	published!: boolean
	slug!: string
	subtitle!: string
	title!: string
	tags!: Array<BlogTagModel>

	public constructor(data?: Partial<BlogPostModel>) {
		super(data)
	}

}
