import { Action, Module, Mutation } from 'vuex-module-decorators'
import CartItem from '@/state/cart/CartItem'
import AppBaseModule from "@/state/common/AppBaseModule";

@Module({ namespaced: true })
export default class CartModule
    extends AppBaseModule
{

    cart: Array<CartItem> = []

    get getCart (): Array<CartItem> {
        return this.cart
    }

    get cartTotalLength(): number {
        let totalLength = 0
        for (let i = 0; i < this.cart.length; i++) {
            totalLength += this.cart[i].quantity
        }
        return totalLength
    }

    get cartTotalPrice(): number {
        return this.cart.reduce((acc: number, curVal: CartItem) => {
            return acc += curVal.product.price * curVal.quantity
        }, 0)
    }

    @Mutation
    public async initializeCart(): Promise<void> {
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(<string>localStorage.getItem('cart'))
        } else {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }

    @Mutation
    public addToCart(item: CartItem): void {
        const exists = this.cart.filter(i => i.product.id === item.product.id)
        if (exists.length) {
            exists[0].quantity = exists[0].quantity + item.quantity
        } else {
            this.cart.push(item)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public removeFromCart(item: CartItem): void {
        this.cart = this.cart.filter(i => i.product.id !== item.product.id)
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public decrementQuantity(item: CartItem): void {
        item.quantity -= 1
        if (item.quantity === 0) {
            this.cart = this.cart.filter(i => i.product.id !== item.product.id)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public incrementQuantity(item: CartItem): void {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

}
