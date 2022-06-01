import EntityBase from '@/state/common/EntityBase'
import ProductModel from '@/state/product/ProductModel'

export default class OrderItemModel extends EntityBase {
	product!: ProductModel
	quantity!: number
	price!: number

	constructor(data?: Partial<OrderItemModel>) {
		super(data)
	}
}
