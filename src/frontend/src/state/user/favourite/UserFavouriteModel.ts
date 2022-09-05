import EntityBase from '@/state/common/EntityBase'
import ProductModel from '@/state/product/ProductModel'

export default class UserFavouriteModel extends EntityBase {
  product_object!: ProductModel

  constructor(data?: Partial<UserFavouriteModel>) {
    super(data)
  }
}
