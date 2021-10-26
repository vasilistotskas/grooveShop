import EntityDTO from '@/state/common/EntityDTO'
import Product from '@/state/product/Product'

export default class ProductDTO
	extends EntityDTO<ProductDTO, Product>
{
	ID!: number
	NAME!: string
	CATEGORY!: number
	GET_ABSOLUTE_URL!: string
	DESCRIPTION!: string
	PRICE!: number
	VAT!: number
	VAT_PERCENT!: number
	VAT_VALUE!: number
	FINAL_PRICE!: number
	HITS!: number
	LIKES_COUNTER!: number
	STOCK!: number
	ACTIVE!: string
	DISCOUNT_PERCENT!: number
	DISCOUNT_VALUE!: number
	DATE_ADDED!: string
	MAIN_IMAGE!: string
	REVIEW_AVERAGE!: number
	REVIEW_COUNTER!: number
	IMAGES: Array<any> = []

	public makeEntityBase(): Product {
		return ProductDTO.makeEntityBase(this)
	}
	static makeEntityBase(entityDTO: ProductDTO): Product {
		return new Product({
			id: entityDTO.ID,
			name: entityDTO.NAME,
			category: entityDTO.CATEGORY,
			get_absolute_url: entityDTO.GET_ABSOLUTE_URL,
			description: entityDTO.DESCRIPTION,
			price: entityDTO.PRICE,
			vat: entityDTO.VAT,
			vat_percent: entityDTO.VAT_PERCENT,
			vat_value: entityDTO.VAT_VALUE,
			final_price: entityDTO.FINAL_PRICE,
			hits: entityDTO.HITS,
			likes_counter: entityDTO.LIKES_COUNTER,
			stock: entityDTO.STOCK,
			active: entityDTO.ACTIVE,
			discount_percent: entityDTO.DISCOUNT_PERCENT,
			discount_value: entityDTO.DISCOUNT_VALUE,
			date_added: entityDTO.DATE_ADDED,
			main_image: entityDTO.MAIN_IMAGE,
			review_avarege: entityDTO.REVIEW_AVERAGE,
			review_counter: entityDTO.REVIEW_COUNTER,
			images: entityDTO.IMAGES
		})
	}

	public async transformFromEntityBase(entity: Partial<Product>): Promise<void> {
		this.setFieldIfExists('ID', 'id', entity)
		this.setFieldIfExists('NAME', 'name', entity)
		this.setFieldIfExists('CATEGORY', 'category', entity)
		this.setFieldIfExists('GET_ABSOLUTE_URL', 'get_absolute_url', entity)
		this.setFieldIfExists('DESCRIPTION', 'description', entity)
		this.setFieldIfExists('PRICE', 'price', entity)
		this.setFieldIfExists('VAT', 'vat', entity)
		this.setFieldIfExists('VAT_PERCENT', 'vat_percent', entity)
		this.setFieldIfExists('VAT_VALUE', 'vat_value', entity)
		this.setFieldIfExists('FINAL_PRICE', 'final_price', entity)
		this.setFieldIfExists('HITS', 'hits', entity)
		this.setFieldIfExists('LIKES_COUNTER', 'likes_counter', entity)
		this.setFieldIfExists('STOCK', 'stock', entity)
		this.setFieldIfExists('ACTIVE', 'active', entity)
		this.setFieldIfExists('DISCOUNT_PERCENT', 'discount_percent', entity)
		this.setFieldIfExists('DISCOUNT_VALUE', 'discount_value', entity)
		this.setFieldIfExists('DATE_ADDED', 'date_added', entity)
		this.setFieldIfExists('MAIN_IMAGE', 'main_image', entity)
		this.setFieldIfExists('REVIEW_AVERAGE', 'review_avarege', entity)
		this.setFieldIfExists('REVIEW_COUNTER', 'review_counter', entity)
		this.setFieldIfExists('IMAGES', 'images', entity)
	}

	async findFieldFromBase(field: keyof Product): Promise<keyof ProductDTO> {
		const dummyInstance = new Product({ [field]: true })
		const dummyDTO = new ProductDTO()
		await dummyDTO.transformFromEntityBase(dummyInstance)
		return this.findFieldTruth(dummyDTO) as keyof ProductDTO
	}
}