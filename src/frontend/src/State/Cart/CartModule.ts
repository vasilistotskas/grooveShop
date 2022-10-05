import router from '@/Routes'
import api from '@/Api/ApiService'
import store from '@/DynamicStore'
import { useToast } from 'vue-toastification'
import PayWayModel from '@/State/Payway/PayWayModel'
import CartItemModel from '@/State/Cart/CartItemModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import CheckoutOrderApiData from '@/State/Cart/Interface/CheckoutOrderApiData'

const toast = useToast()

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'cart',
})
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

  @Mutation
  setCart(cart: Array<CartItemModel>): void {
    this.cart = cart
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
  public addToCart(item: CartItemModel): void {
    const exists = this.cart.filter((i) => i.product.id === item.product.id)
    if (exists.length) {
      exists[0].quantity = exists[0].quantity + item.quantity
    } else {
      this.cart.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))
    toast.success('Added to Cart')
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
  public async initializeCart(): Promise<void> {
    if (localStorage.getItem('cart')) {
      this.context.commit('setCart', JSON.parse(<string>localStorage.getItem('cart')))
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }

  @Action
  async createOrder(data: CheckoutOrderApiData): Promise<void> {
    return api
      .post<CheckoutOrderApiData>('checkout/', data)
      .then(() => {
        this.context.commit('clearCart')
        router.push('/Cart/success')
      })
      .catch((e: Error) => {
        console.log(e.message)
      })
  }
}
