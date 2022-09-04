import EntityBase from '@/state/common/EntityBase'
import OrderItemModel from '@/state/user/order/OrderItemModel'

export default class UserOrderModel extends EntityBase {
  id!: number
  address!: string
  email!: string
  first_name!: string
  last_name!: string
  paid_amount!: number
  phone!: string
  place!: string
  city!: string
  strin_token!: string
  customer_notes!: string
  zipcode!: string
  items!: Array<OrderItemModel>

  constructor(data?: Partial<UserOrderModel>) {
    super(data)
  }
}
