import EntityBase from '@/state/common/EntityBase'
import CartKey from "@/state/cart/CartKey"
import CartItemKey from "@/state/cart/CartItemKey";
import CartItem from "@/state/cart/Cart";

export default class Cart extends EntityBase {
	id?: CartKey
	productId!: number
	quantity!: number

	public constructor(data?: Partial<Cart>) {
		super(data)
	}

}