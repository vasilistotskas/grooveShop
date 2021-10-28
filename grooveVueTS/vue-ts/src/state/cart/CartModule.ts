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
            return acc += curVal.price * curVal.quantity
        }, 0)
    }
    
    @Mutation
    initializeCart() {
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(<string>localStorage.getItem('cart'))
        } else {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }

    @Mutation
    public async addToCart(item: CartItem): Promise<void> {
        const exists = this.cart.filter(i => i.id === item.id)
        if (exists.length) {
            exists[0].quantity = exists[0].quantity + item.quantity
        } else {
            this.cart.push(item)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public async removeFromCart(item: CartItem): Promise<void> {
        this.cart = this.cart.filter(i => i.id !== item.id)
    }

}
