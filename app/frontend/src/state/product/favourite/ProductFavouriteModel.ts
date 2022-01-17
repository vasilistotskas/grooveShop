import EntityBase from '@/state/common/EntityBase';

export default class ProductFavouriteModel extends EntityBase {

  public constructor(data?: Partial<ProductFavouriteModel>) {
    super(data);
  }

  id!: number;
  user_id!: number;
  product_id!: number;

}
