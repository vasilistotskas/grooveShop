import EntityBase from '@/state/common/EntityBase';

export default class AuthorUserModel extends EntityBase {

  public constructor(data?: Partial<AuthorUserModel>) {
    super(data);
  }

  id!: number;
  email!: string;
  firstName!: string;
  lastName!: string;

}
