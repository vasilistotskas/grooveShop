import EntityBase from '@/state/common/EntityBase'
import ProductModel from '@/state/product/ProductModel'

export default class CartItemModel extends EntityBase {

	quantity!: number
	product!: ProductModel

	public constructor(data?: Partial<CartItemModel>) {
		super(data)
	}

}
