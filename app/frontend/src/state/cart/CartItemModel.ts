import EntityBase from '@/state/common/EntityBase';
import ProductModel from '@/state/product/ProductModel';

export default class CartItemModel extends EntityBase {

  public constructor(data?: Partial<CartItemModel>) {
    super(data);
  }

  id!: number;
  quantity!: number;
  product!: ProductModel;

}
