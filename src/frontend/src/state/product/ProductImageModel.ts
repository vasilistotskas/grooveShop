import EntityBase from '@/state/common/EntityBase'

export default class ProductImageModel extends EntityBase {

	id!: number
	is_main!: boolean
	product_image_absolute_url!: string
	product_image_filename!: string

	public constructor(data?: Partial<ProductImageModel>) {
		super(data)
	}

}
