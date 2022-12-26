import EntityBase from '@/State/Common/EntityBase'
import ProductImageModel from '@/State/Product/ProductImageModel'

export default class ProductModel extends EntityBase {
	id!: number
	name!: string
	slug!: string
	category!: number
	absolute_url!: string
	description!: string
	price!: number
	vat!: number
	vat_percent!: number
	vat_value!: number
	final_price!: number
	hits!: number
	likes_counter!: number
	stock!: number
	active!: string
	discount_percent!: number
	discount_value!: number
	price_save_percent!: number
	created_at!: string
	main_image_absolute_url!: string
	main_image_filename!: string
	review_average!: number
	review_counter!: number
	images!: Array<ProductImageModel>

	public constructor(data?: Partial<ProductModel>) {
		super(data)
	}
}
