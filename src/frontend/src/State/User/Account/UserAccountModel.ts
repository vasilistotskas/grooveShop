import EntityBase from '@/State/Common/EntityBase'

export default class UserAccountModel extends EntityBase {
	id!: number
	user!: number
	address!: string | null
	city!: string | null
	country!: string | null
	email!: string
	first_name!: string | null
	last_name!: string | null
	main_image_absolute_url!: string
	main_image_filename!: string
	main_image_url!: string
	phone!: number | null
	place!: string | null
	region!: string | null
	zipcode!: string | null

	constructor(data?: Partial<UserAccountModel>) {
		super(data)
	}
}
