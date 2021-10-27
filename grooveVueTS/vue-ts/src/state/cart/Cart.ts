import EntityBase from '@/state/common/EntityBase'

export default class Cart extends EntityBase {
	id!: number
	productId!: number
	quantity!: number

	public constructor(data?: Partial<Cart>) {
		super(data)
	}

}
