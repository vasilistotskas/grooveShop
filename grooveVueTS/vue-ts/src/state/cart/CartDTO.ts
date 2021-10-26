import Cart from '@/state/cart/Cart'
import EntityDTO from '@/state/common/EntityDTO'

export default class CartDTO
	extends EntityDTO<CartDTO, Cart>
{
	ID!: number
	ITEMS: Array<any> = []

	public makeEntityBase(): Cart {
		return CartDTO.makeEntityBase(this)
	}
	static makeEntityBase(entityDTO: CartDTO): Cart {
		return new Cart({
			id: entityDTO.ID,
			items: entityDTO.ITEMS,
		})
	}

	public async transformFromEntityBase(entity: Partial<Cart>): Promise<void> {
		this.setFieldIfExists('ID', 'id', entity)
		this.setFieldIfExists('ITEMS', 'items', entity)
	}

	async findFieldFromBase(field: keyof Cart): Promise<keyof CartDTO> {
		const dummyInstance = new Cart({ [field]: true })
		const dummyDTO = new CartDTO()
		await dummyDTO.transformFromEntityBase(dummyInstance)
		return this.findFieldTruth(dummyDTO) as keyof CartDTO
	}
}
