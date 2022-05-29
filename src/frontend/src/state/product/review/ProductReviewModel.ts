import EntityBase from '@/state/common/EntityBase'
import ProductModel from '@/state/product/ProductModel'
import UserProfileModel from '@/state/user/data/UserProfileModel'

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
	userprofile!: UserProfileModel

	public constructor(data?: Partial<ProductReviewModel>) {
		super(data)
	}

}
