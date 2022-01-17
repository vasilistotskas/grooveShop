import EntityBase from '@/state/common/EntityBase';

export default class RegionsModel extends EntityBase {
  name!: number;
  alpha!: string;
  alpha_2!: string;

  constructor(data?: Partial<RegionsModel>) {
    super(data);
  }
}
