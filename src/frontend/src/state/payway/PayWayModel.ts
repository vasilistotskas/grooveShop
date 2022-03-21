import EntityBase from '@/state/common/EntityBase'

export default class PayWayModel extends EntityBase {

	name!: string
	active!: boolean
	const!: number
	free_for_order_amount!: number

	public constructor(data?: Partial<PayWayModel>) {
		super(data)
	}

}
