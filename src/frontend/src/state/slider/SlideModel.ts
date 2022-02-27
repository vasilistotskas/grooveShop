import EntityBase from '@/state/common/EntityBase'

export default class SlideModel extends EntityBase {

	id!: number
	url!: string
	title!: string
	subtitle!: string
	description!: string
	discount!: number
	button_label!: string
	show_button!: boolean
	date_start!: string
	date_end!: string
	order_position!: number
	main_image_absolute_url!: string
	main_image_filename!: string
	thumbnail!: string

	public constructor(data?: Partial<SlideModel>) {
		super(data)
	}

}
