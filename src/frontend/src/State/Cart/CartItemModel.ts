import EntityBase from '@/State/Common/EntityBase'
import ProductModel from '@/State/Product/ProductModel'

export default class CartItemModel extends EntityBase {
	quantity!: number
	product!: ProductModel

	public constructor(data?: Partial<CartItemModel>) {
		super(data)
	}
}
