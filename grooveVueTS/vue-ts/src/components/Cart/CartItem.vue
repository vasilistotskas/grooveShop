<template>
  <tr>
    <td>
<!--      <router-link :to="item">{{ item }}</router-link>-->
      <h1>{{ item }}</h1>
    </td>
<!--    <td>${{ item.price }}</td>-->
<!--    <td>-->
<!--      <a @click="decrementQuantity(item)">-</a>-->
<!--      {{ item.quantity }}-->
<!--      <a @click="incrementQuantity(item)">+</a>-->
<!--    </td>-->
<!--    <td>${{ getItemTotal(item).toFixed(2) }}</td>-->
<!--    <td>-->
<!--      <button class="delete" @click="removeFromCart(item)"></button>-->
<!--    </td>-->
  </tr>
</template>

<script lang="ts">
import AppBasePage from "@/pages/AppBasePage.vue";
import { Options } from "vue-class-component";

@Options({
  name: "CartItem",
  components: {
    CartItem
  },
  props: {
    item: {
      type: Object
    }
  }
})

export default class CartItem extends AppBasePage {

    // public getItemTotal(): number {
    //   // return this.$store.getters['cart/getItemTotal']
    // }

   public decrementQuantity(item: object): void {
     this.$store.commit('cart/decrementQuantity', item)
    }

    public incrementQuantity(item: object): void {
      this.$store.commit('cart/incrementQuantity', item)
    }

    public updateCart(): void {
      this.$store.commit('cart/updateCart')
    }

    public removeFromCart(item: object): void {
      this.$store.commit('cart/removeFromCart', item)
    }
}
</script>