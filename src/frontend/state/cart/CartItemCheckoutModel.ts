import EntityBase from '@/state/common/EntityBase'

export default class CartItemCheckoutModel extends EntityBase {
  product!: number
  quantity!: number
  price!: number

  public constructor(data?: Partial<CartItemCheckoutModel>) {
    super(data)
  }
}
