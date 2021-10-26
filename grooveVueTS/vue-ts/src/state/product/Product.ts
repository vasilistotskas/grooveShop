export default class Product
{
	id: number
	name: string
	category: number
	get_absolute_url: string
	description: string
	price: number
	vat: number
	vat_percent: number
	vat_value: number
	final_price: number
	hits: number
	likes_counter: number
	stock: number
	active: string
	discount_percent: number
	discount_value: number
	date_added: string
	main_image: string
	review_avarege: number
	review_counter: number
	images: Array<any>

	constructor(
		id : number,
		name : string,
		category: number,
		get_absolute_url: string,
		description: string,
		price: number,
		vat: number,
		vat_percent: number,
		vat_value: number,
		final_price: number,
		hits: number,
		likes_counter: number,
		stock: number,
		active: string,
		discount_percent: number,
		discount_value: number,
		date_added: string,
		main_image: string,
		review_avarege: number,
		review_counter: number,
		images: Array<any>

	) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.get_absolute_url = get_absolute_url;
		this.description = description;
		this.price = price;
		this.vat = vat;
		this.vat_percent = vat_percent;
		this.vat_value = vat_value;
		this.final_price = final_price;
		this.hits = hits;
		this.likes_counter = likes_counter;
		this.stock = stock;
		this.active = active;
		this.discount_percent = discount_percent;
		this.discount_value = discount_value;
		this.date_added = date_added;
		this.main_image = main_image;
		this.review_avarege = review_avarege;
		this.review_counter = review_counter;
		this.images = images;
	}
}
