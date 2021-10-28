<template>
    <div class="page-cart container mt-5">
        <div class="row">
            <div class="col-12">
                <h1 class="title mb-5">Cart</h1>
            </div>

            <div class="col-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    <CartItem
                            v-for="item in cart"
                            v-bind:key="item.id"
                            v-bind:item="item"/>
<!--                            v-on:removeFromCart="removeFromCart(item)"-->
                    </tbody>
                </table>

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="col-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

                <router-link to="/cart/checkout" class="button is-dark float-end">Proceed to checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import CartItem from '@/components/Cart/CartItem.vue'
import { Options } from "vue-class-component";

@Options({
    name: "CartVue",
    components: {
        CartItem
    }
})

export default class CartVue extends AppBasePage {

    get cart(): {} {
        return this.$store.getters['cart/getCart']
    }

    get cartTotalLength(): number {
        return this.$store.getters['cart/cartTotalLength']
    }

    get cartTotalPrice(): number {
        return this.$store.getters['cart/cartTotalPrice']
    }

  public removeFromCart(item: object) {
    this.$store.commit('cart/removeFromCart', item)
  }
}
</script>
