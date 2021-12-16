<template>
    <div class="container mt-5 mb-5">
      <div class="cart-grid-container">
        <div class="grid-container-item-two" v-if="cartTotalLength">
          <div class="grid-container-table">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
          </div>
          <div class="grid-container-table-items">
            <CartItem
                v-for="item in cart"
                v-bind:key="item.id"
                v-bind:item="item"
                v-on:removeFromCart="removeFromCart(item)"/>
          </div>
        </div>
        <div v-else>
          <p>You don't have any products in your cart...</p>
        </div>


        <div class="grid-container-item-three">
          <div class="grid-container-child-one">
            <h2 class="subtitle">Summary</h2>
            <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
          </div>
          <div class="grid-container-child-two">
            <router-link to="/cart/checkout" type="button" class="btn btn-outline-primary" aria-label="Checkout">Proceed to checkout</router-link>
          </div>

        </div>
      </div>
    </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import CartItem from '@/components/Cart/CartItem.vue'
import CartItemModel from "@/state/cart/CartItemModel"

@Options({
    name: "CartVue",
    components: {
        CartItem
    }
})

export default class CartVue extends Vue {

    mounted() {
        document.title = 'Cart'
    }

    get cart(): Array<CartItemModel> {
        return store.getters['cart/getCart']
    }

    get cartTotalLength(): number {
        return store.getters['cart/getCartTotalLength']
    }

    get cartTotalPrice(): number {
        return store.getters['cart/getCartTotalPrice']
    }

  public removeFromCart(item: CartItemModel) {
    store.commit('cart/removeFromCart', item)
  }
}
</script>

<style lang="scss" scoped>
  .cart-grid-container {
    display: grid;
    grid-template-rows: minmax(90px, 1fr);
    background-color: white;
    border-radius: 10px;
    padding: 15px 30px 30px;
    gap: 25px;
    a, h2 {
      color: $primary-color-2;
    }
    .grid-container-item {
      &-one {

      }
      &-two {
        display: grid;
        grid-template-rows: minmax(50px, 1fr);
        gap: 10px;
        .grid-container-table {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          justify-items: center;
        }
      }
      &-three {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        .grid-container-child-two {
          justify-self: end;
          align-self: end;
        }
      }
    }
    .grid-container-table-items {
      display: grid;
      gap: 10px;
    }
  }
</style>