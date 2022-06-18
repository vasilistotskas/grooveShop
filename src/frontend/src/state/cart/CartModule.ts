import router from '@/routes'
import api from '@/api/api.service'
import { useToast } from 'vue-toastification'
import PayWayModel from '@/state/payway/PayWayModel'
import CartItemModel from '@/state/cart/CartItemModel'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserOrderModel from '@/state/user/order/UserOrderModel'

const toast = useToast()

@Module({ namespaced: true })
export default class CartModule extends AppBaseModule {
  cart: Array<CartItemModel> = []
  cartTotalPriceForPayWay = 0

  get getCart(): Array<CartItemModel> {
    return this.cart
  }

  get getCartTotalPriceForPayWay(): number {
    return this.cartTotalPriceForPayWay
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
      return (acc += curVal.product.price * curVal.quantity)
    }, 0)
  }

  @Mutation
  setCartTotalPriceForPayWay(price: number): void {
    this.cartTotalPriceForPayWay = price
  }

  @Action
  public async cartTotalPriceForPayWayAction(payWay?: PayWayModel): Promise<number> {
    const cartTotal = this.context.getters['getCartTotalPrice']

    if (!payWay || (payWay && Object.keys(payWay).length <= 0)) {
      this.context.commit('setCartTotalPriceForPayWay', cartTotal)
      return cartTotal
    }

    if (Number(payWay?.free_for_order_amount) < Number(cartTotal)) {
      this.context.commit('setCartTotalPriceForPayWay', cartTotal)
      return cartTotal
    }

    const total = Number(payWay?.cost) + Number(cartTotal)
    this.context.commit('setCartTotalPriceForPayWay', total)
    return total
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
    const exists = this.cart.filter((i) => i.product.id === item.product.id)
    if (exists.length) {
      exists[0].quantity = exists[0].quantity + item.quantity
    } else {
      this.cart.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))
    toast.success('Added to cart')
  }

  @Mutation
  public removeFromCart(item: CartItemModel): void {
    this.cart = this.cart.filter((i) => i.product.id !== item.product.id)
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  @Mutation
  public decrementQuantity(item: CartItemModel): void {
    item.quantity -= 1
    if (item.quantity === 0) {
      this.cart = this.cart.filter((i) => i.product.id !== item.product.id)
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  @Mutation
  public incrementQuantity(item: CartItemModel): void {
    item.quantity += 1
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  @Mutation
  public clearCart(): void {
    this.cart = []
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  @Action
  createOrder(data: UserOrderModel): Promise<void> {
    return api
      .post<UserOrderModel>('checkout/', data)
      .then(() => {
        this.context.commit('clearCart')
        router.push('/cart/success')
      })
      .catch((e: Error) => {
        console.log(e.message)
      })
  }
}
