import EntityBase from "@/state/common/EntityBase";

export default class Product extends EntityBase
{
	public id!: number
	public name!: string
	public category!: number
	public get_absolute_url!: string
	public description!: string
	public price!: number
	public vat!: number
	public vat_percent!: number
	public vat_value!: number
	public final_price!: number
	public hits!: number
	public likes_counter!: number
	public stock!: number
	public active!: string
	public discount_percent!: number
	public discount_value!: number
	public date_added!: string
	public main_image!: string
	public review_avarege!: number
	public review_counter!: number
	public images!: Array<any>

	public constructor(data?: Partial<Product>) {
		super(data)
	}
}
