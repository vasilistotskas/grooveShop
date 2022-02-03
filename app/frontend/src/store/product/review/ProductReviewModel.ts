import EntityBase from '@/store/common/EntityBase'
import ProductModel from '@/store/product/ProductModel'
import UserDetailsModel from '@/store/user/data/UserDetailsModel'

export default class ProductReviewModel extends EntityBase {

	id!: number
	product!: ProductModel
	product_id!: number
	user_id!: number
	comment!: string
	rate!: number
	status!: string
	created_at!: string
	updated_at!: string
	userprofile!: UserDetailsModel

	public constructor(data?: Partial<ProductReviewModel>) {
		super(data)
	}

}
