import EntityBase from "@/state/common/EntityBase"

export default class ProductModel extends EntityBase
{
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
	date_added!: string
	main_image!: string
	review_average!: number
	review_counter!: number
	images!: Array<any>

	public constructor(data?: Partial<ProductModel>) {
		super(data)
	}
}
