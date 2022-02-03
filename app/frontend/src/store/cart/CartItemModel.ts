import EntityBase from '@/store/common/EntityBase'
import ProductModel from '@/store/product/ProductModel'

export default class CartItemModel extends EntityBase {

	id!: number
	quantity!: number
	product!: ProductModel

	public constructor(data?: Partial<CartItemModel>) {
		super(data)
	}

}
