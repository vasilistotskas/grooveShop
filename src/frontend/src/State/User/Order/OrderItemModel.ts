import EntityBase from '@/State/Common/EntityBase'
import ProductModel from '@/State/Product/ProductModel'

export default class OrderItemModel extends EntityBase {
  product!: ProductModel
  quantity!: number
  price!: number

  constructor(data?: Partial<OrderItemModel>) {
    super(data)
  }
}
