import EntityBase from '@/state/common/EntityBase';
import ProductModel from '@/state/product/ProductModel';
import UserDetailsModel from '@/state/user/data/UserDetailsModel';

export default class ProductReviewModel extends EntityBase {

  public constructor(data?: Partial<ProductReviewModel>) {
    super(data);
  }

  id!: number;
  product!: ProductModel;
  product_id!: number;
  user_id!: number;
  comment!: string;
  rate!: number;
  status!: string;
  created_at!: string;
  updated_at!: string;
  userprofile!: UserDetailsModel;

}
