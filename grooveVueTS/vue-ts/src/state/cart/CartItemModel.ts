import EntityBase from '@/state/common/EntityBase'
import Product from "@/state/product/ProductModel";

export default class CartItemModel extends EntityBase {
    id!: number
    quantity!: number
    product!: Product

    public constructor(data?: Partial<CartItemModel>) {
        super(data)
    }

}
