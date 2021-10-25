import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'

@Module({ namespaced: true })
export default class CartModule
    extends AppBaseModule
{
    cart: Array<any> = []

    get getCart(): Array<any> {
        return this.cart
    }

    @Mutation
    initializeCart() {
        if (localStorage.getItem('cart')) {
            this.cart !== null ? localStorage.getItem('cart') : []
        } else {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }

    @Mutation
    setCart(cart: Array<any>): void {
        this.cart = cart
    }

    @Mutation
    addToCart(item: Array<any>) {
        const exists = this.cart.filter(i => i.product.id === item.product.id)
        if (exists.length) {
            exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
        } else {
            this.cart.items.push(item)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

}