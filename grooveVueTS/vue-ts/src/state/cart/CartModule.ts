import router from "@/routes"
import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import CartItemModel from '@/state/cart/CartItemModel'
import AppBaseModule from "@/state/common/AppBaseModule"
import { Action, Module, Mutation } from 'vuex-module-decorators'

const toast = useToast()

@Module({ namespaced: true })
export default class CartModule
    extends AppBaseModule
{
    //@TODO na fugoun ola ta 'localStorage.setItem' kltp kai na kanw use to vuex-persistedstate

    cart: Array<CartItemModel> = []

    get getCart (): Array<CartItemModel> {
        return this.cart
    }

    get getCartTotalLength(): number {
        let totalLength = 0
        for (let i = 0; i < this.cart.length; i++) {
            totalLength += this.cart[i].quantity
        }
        return totalLength
    }

    get getCartTotalPrice(): number {
        return this.cart.reduce((acc: number, curVal: CartItemModel) => {
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
    public addToCart(item: CartItemModel): void {
        try {
            const exists = this.cart.filter(i => i.product.id === item.product.id)
            if (exists.length) {
                exists[0].quantity = exists[0].quantity + item.quantity
            } else {
                this.cart.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(this.cart))
            toast.success("Added to cart")
        } catch (error) {
            throw error
        }

    }

    @Mutation
    public removeFromCart(item: CartItemModel): void {
        this.cart = this.cart.filter(i => i.product.id !== item.product.id)
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public decrementQuantity(item: CartItemModel): void {
        item.quantity -= 1
        if (item.quantity === 0) {
            this.cart = this.cart.filter(i => i.product.id !== item.product.id)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public incrementQuantity(item: CartItemModel): void {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    @Mutation
    public clearCart(): void{
        this.cart = []
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }


    @Action
    async createOrder(data: any): Promise<void> {
        await api.post('checkout/', data)
            .then((response: ResponseData) => {
                this.context.commit('clearCart')
                router.push('/cart/success')
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

}
