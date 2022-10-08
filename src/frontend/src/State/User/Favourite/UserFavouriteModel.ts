import EntityBase from '@/State/Common/EntityBase'
import ProductModel from '@/State/Product/ProductModel'

export default class UserFavouriteModel extends EntityBase {
  product_object!: ProductModel

  constructor(data?: Partial<UserFavouriteModel>) {
    super(data)
  }
}
