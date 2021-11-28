<template>
  <tr>
    <td>
      <router-link :to="productPath">{{ item.product.name }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <a type="button" class="btn btn-light" data-mdb-ripple-color="dark" @click="decrementQuantity(item)">-</a>
      {{ item.quantity }}
      <a type="button" class="btn btn-light" data-mdb-ripple-color="dark" @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ itemTotal.toFixed(2) }}</td>
    <td>
      <button type="button" class="btn" @click="removeFromCart(item)">
        <i class="fas fa-times-circle"></i>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"

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
    get itemTotal(): number {
      return this.item.quantity * this.item.product.price
    }

    get productPath() {
      return '/product/' + this.item.product.slug + '/' + this.item.product.id
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
