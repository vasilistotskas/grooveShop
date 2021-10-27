export default class Product
{
	id!: number
	name!: string
	category!: number
	get_absolute_url!: string
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
	review_avarege!: number
	review_counter!: number
	images!: Array<any>

	constructor(data?: Partial<Product>) {
		Object.assign(this, data);
	}
}
