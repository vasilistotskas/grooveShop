import EntityBase from '@/State/Common/EntityBase'
import ProductModel from '@/State/Product/ProductModel'
import UserAccountModel from '@/State/User/Account/UserAccountModel'

export default class ProductReviewModel extends EntityBase {
	id!: number
	product!: ProductModel
	user!: UserAccountModel
	comment!: string
	rate!: number
	status!: string
	created_at!: string
	updated_at!: string

	public constructor(data?: Partial<ProductReviewModel>) {
		super(data)
	}
}
