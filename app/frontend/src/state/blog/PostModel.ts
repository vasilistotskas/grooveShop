import EntityBase from '@/state/common/EntityBase'
import TagModel from "@/state/blog/TagModel"

export default class PostModel extends EntityBase {
    id!: number
    mainImageAbsoluteUrl!: string
    mainImageFilename!: string
    metaDescription!: string
    publishDate!: string
    published!: boolean
    slug!: string
    subtitle!: string
    title!: string
    tags!: TagModel[]

    public constructor(data?: Partial<PostModel>) {
        super(data)
    }

}
