import EntityBase from '@/state/common/EntityBase'

export default class UserProfileModel extends EntityBase {
	id!: number
	user!: number
	address!: string
	city!: string
	country!: string
	email!: string
	first_name!: string
	last_name!: string
	main_image_absolute_url!: string
	main_image_filename!: string
	get_user_profile_image_url!: string
	phone!: number
	place!: string
	region!: string
	zipcode!: number

	constructor(data?: Partial<UserProfileModel>) {
		super(data)
	}

}
