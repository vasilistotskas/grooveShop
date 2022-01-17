import EntityBase from '@/state/common/EntityBase';
import SlideModel from '@/state/slider/SlideModel';

export default class SliderModel extends EntityBase {

  public constructor(data?: Partial<SliderModel>) {
    super(data);
  }

  id!: number;
  name!: string;
  url!: string;
  title!: string;
  description!: string;
  main_image_absolute_url!: string;
  main_image_filename!: string;
  thumbnail!: string;
  video!: string;
  slides!: Array<SlideModel>;

}
