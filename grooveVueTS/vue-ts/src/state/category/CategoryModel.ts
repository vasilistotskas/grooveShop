import EntityBase from "@/state/common/EntityBase"

export default class CategoryModel extends EntityBase
{
    id!: number
    description!: string
    get_absolute_url!: string
    image_url!: string
    name!: string
    parent!: number
    products!: Array<any>
    slug!: string
    tags!: string

    constructor(data?: Partial<CategoryModel>) {
        super(data)
    }
}
