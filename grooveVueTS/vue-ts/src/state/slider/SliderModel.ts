import EntityBase from "@/state/common/EntityBase"
import SlideModel from "@/state/slider/SlideModel"

export default class SliderModel extends EntityBase
{
	id!: number
	name!: string
	url!: string
	title!: string
	description!: string
	image!: string
	thumbnail!: string
	slides!: Array<SlideModel>

	public constructor(data?: Partial<SliderModel>) {
		super(data)
	}
}
