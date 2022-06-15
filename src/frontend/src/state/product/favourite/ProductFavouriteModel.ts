import EntityBase from '@/state/common/EntityBase'

export default class ProductFavouriteModel extends EntityBase {
  id!: number
  user_id!: number
  product_id!: number

  public constructor(data?: Partial<ProductFavouriteModel>) {
    super(data)
  }
}
