import EntityBase from "@/state/common/EntityBase"

export default class CategoryModel extends EntityBase
{
    id!: number
    description!: string
    absolute_url!: string
    menu_image_one!: string
    menu_image_two!: string
    menu_main_banner!: string
    name!: string
    parent!: number
    all_tree_products!: Array<any>
    children!: Array<CategoryModel>
    slug!: string
    tags!: string
    level!: number
    recursive_product_count!: number

    constructor(data?: Partial<CategoryModel>) {
        super(data)
    }
}
