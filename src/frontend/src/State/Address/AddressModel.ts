import EntityBase from '@/State/Common/EntityBase'
import { FloorChoicesEnum, LocationChoicesEnum } from '@/State/Address/Enum/AddressEnum'

export default class AddressModel extends EntityBase {
	id?: number
	created_at?: string
	updated_at?: string
	uuid?: string
	title!: string
	first_name!: string
	last_name!: string
	street!: string
	street_number!: string
	city!: string
	zipcode!: string
	floor!: FloorChoicesEnum
	location_type!: LocationChoicesEnum
	phone!: string
	mobile_phone!: string
	notes!: string
	is_main!: boolean
	user!: number
	country!: string
	region!: string

	public constructor(data?: Partial<AddressModel>) {
		super(data)
	}
}
