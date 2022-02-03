import EntityBase from '@/store/common/EntityBase'

export default class UserOrderModel extends EntityBase {
	id!: number
	address!: string
	email!: string
	first_name!: string
	last_name!: string
	paid_amount!: number
	phone!: string
	place!: string
	strin_token!: string
	zipcode!: string
	items!: Array<any>

	constructor(data?: Partial<UserOrderModel>) {
		super(data)
	}
}
