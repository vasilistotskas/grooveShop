import EntityBase from '@/state/common/EntityBase';

export default class UserDetailsModel extends EntityBase {
  constructor(data?: Partial<UserDetailsModel>) {
    super(data);
  }
  id!: number;
  user!: number;
  address!: string;
  city!: string;
  country!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  main_image_absolute_url!: string;
  main_image_filename!: string;
  phone!: number;
  place!: string;
  region!: string;
  zipcode!: number;

}
