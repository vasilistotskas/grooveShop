import EntityBase from '@/store/common/EntityBase'
import SlideModel from '@/store/slider/SlideModel'

export default class SliderModel extends EntityBase {

	id!: number
	name!: string
	url!: string
	title!: string
	description!: string
	main_image_absolute_url!: string
	main_image_filename!: string
	thumbnail!: string
	video!: string
	slides!: Array<SlideModel>

	public constructor(data?: Partial<SliderModel>) {
		super(data)
	}

}
