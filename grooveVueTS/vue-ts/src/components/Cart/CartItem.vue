<template>
  <tr>
    <td>
      <router-link :to="item.product.absolute_url">{{ item.product.name }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <a type="button" class="btn btn-light" data-mdb-ripple-color="dark" @click="decrementQuantity(item)">-</a>
      {{ item.quantity }}
      <a type="button" class="btn btn-light" data-mdb-ripple-color="dark" @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal.toFixed(2) }}</td>
    <td>
      <button type="button" class="btn" @click="removeFromCart(item)">
        <i class="fas fa-times-circle"></i>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import App from "@/App.vue"
import { Options, Vue } from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"
import store from '@/store'

@Options({
  name: "CartItem",
  props: {
    item: {
      type: Object
    }
  }
})

export default class CartItemVue extends Vue {

    item = new CartItemModel()

    // prepei na paw sto store kapos
    get getItemTotal(): number {
      return this.item.quantity * this.item.product.price
    }

   public decrementQuantity(item: object): void {
     store.commit('cart/decrementQuantity', item)
    }

    public incrementQuantity(item: object): void {
      store.commit('cart/incrementQuantity', item)
    }

    public updateCart(): void {
      store.commit('cart/updateCart')
    }

    public removeFromCart(item: object): void {
      store.commit('cart/removeFromCart', item)
    }
}
</script>
