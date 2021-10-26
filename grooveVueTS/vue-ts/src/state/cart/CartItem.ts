import EntityBase from '@/state/common/EntityBase'
import CartItemKey from "@/state/cart/CartItemKey"

export default class CartItem extends EntityBase {
    id!: CartItemKey
    productId!: number
    quantity!: number

    public constructor(data?: Partial<CartItem>) {
        super(data)
    }

}