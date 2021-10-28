import EntityBase from '@/state/common/EntityBase'
import Product from "@/state/product/Product";

export default class CartItem extends EntityBase {
    id!: number
    quantity!: number
    product!: Product

    public constructor(data?: Partial<CartItem>) {
        super(data)
    }

}
