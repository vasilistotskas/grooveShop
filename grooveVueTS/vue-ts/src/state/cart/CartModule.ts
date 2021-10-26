import { Action, Module, Mutation } from 'vuex-module-decorators'
import Cart from '@/state/cart/Cart'
import { some } from 'lodash'
import CartDTO from '@/state/cart/CartDTO'
import CartKey from "@/state/cart/CartKey";
import CartItem from '@/state/cart/CartItem'
import CartItemKey from "@/state/cart/CartItemKey";
import AppBaseModule from "@/state/common/AppBaseModule";
import ProductKey from "@/state/product/ProductKey";
import Product from "@/state/product/Product";

@Module({ namespaced: true })
export default class CartModule
    extends AppBaseModule
{

    cart: Cart[] = []

    get getCart (): Cart[] {
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
        return this.cart.reduce((acc: any, curVal: any) => {
            return acc += curVal.product.price * curVal.quantity
        }, 0)
    }

    // public cartTotalLength() {
    //     return this.cart.items.reduce((acc: any, curVal: any) => {
    //         return acc += curVal.quantity
    //     }, 0)
    // }
    //

    @Mutation
    initializeCart() {
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(<string>localStorage.getItem('cart'))
        } else {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }

    }

    @Mutation
    addToCart(cart: Cart): void {
        const exists = this.cart.filter(i => i.id === cart.id)
        if (exists.length) {
            exists[0].quantity = exists[0].quantity + cart.quantity
        } else {
            this.cart.push(cart)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }


    @Action
    removeFromCart(product: Cart): void {
        this.cart = this.cart.filter(i => i.id !== product.id)
    }

}