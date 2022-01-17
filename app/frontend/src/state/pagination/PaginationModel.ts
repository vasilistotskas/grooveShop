import EntityBase from '@/state/common/EntityBase';

export default class ProductReviewModel extends EntityBase {

  public constructor(data?: Partial<ProductReviewModel>) {
    super(data);
  }

  count!: number;
  link: Record<string, unknown> = {
    next: '',
    previous: ''
  };
  results!: [];
  total_pages!: number;

}
