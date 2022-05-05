import EntityBase from '@/state/common/EntityBase'
import ProductModel from '@/state/product/ProductModel'

export default class CategoryModel extends EntityBase {

	id!: number
	description!: string
	absolute_url!: string
	category_menu_image_one_absolute_url!: string
	category_menu_image_one_filename!: string
	category_menu_image_two_absolute_url!: string
	category_menu_image_two_filename!: string
	category_menu_main_banner_absolute_url!: string
	category_menu_main_banner_filename!: string
	name!: string
	parent!: number
	all_tree_products!: Array<ProductModel>
	children!: Array<CategoryModel>
	slug!: string
	tags!: string
	level!: number
	recursive_product_count!: number

	constructor(data?: Partial<CategoryModel>) {
		super(data)
	}

}
