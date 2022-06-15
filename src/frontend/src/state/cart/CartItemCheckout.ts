import EntityBase from '@/state/common/EntityBase'

export default class CartItemCheckout extends EntityBase {
  product!: number
  quantity!: number
  price!: number

  public constructor(data?: Partial<CartItemCheckout>) {
    super(data)
  }
}
