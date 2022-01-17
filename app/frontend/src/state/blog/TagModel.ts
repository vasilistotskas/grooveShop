import EntityBase from '@/state/common/EntityBase';

export default class TagModel extends EntityBase {

  public constructor(data?: Partial<TagModel>) {
    super(data);
  }

  id!: number;
  name!: string;

}
