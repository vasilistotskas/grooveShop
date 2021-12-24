<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <router-link :to="productPath" aria-label="Product">
        <img :src="item.product.main_image" width="75" height="75" class="card-img-top img-fluid" :alt="item.product.name">
        <span>{{ item.product.name }}</span>
      </router-link>
    </div>
    <div class="grid-container-cart-item-two">${{ item.product.price }}</div>
    <div class="grid-container-cart-item-three">
      <a type="button" class="btn btn-outline-primary" data-mdb-ripple-color="dark" @click="decrementQuantity(item)">-</a>
      {{ item.quantity }}
      <a type="button" class="btn btn-outline-primary" data-mdb-ripple-color="dark" @click="incrementQuantity(item)">+</a>
    </div>
    <div class="grid-container-cart-item-four">${{ itemTotal.toFixed(2) }}</div>
    <div class="grid-container-cart-item-five">
      <button type="button" class="btn" @click="removeFromCart(item)">
        <font-awesome-icon icon="trash" :style="{ color: '#3b3b3b' }"></font-awesome-icon>
      </button>
    </div>
  </div>
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

    get isMobile(): boolean {
      return store.getters['app/isMobile']
    }
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

<style lang="scss" scoped>
  .grid-container-cart {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    position: relative;
    background-color: #f8f8ff;
    border-radius: 5px;
    align-items: center;
    justify-items: center;
    padding: 5px;
    a {
      color: $primary-color-2;
    }
    &-item-one {
      a {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
        width: 250px;
      }
    }
    &-item-three {
      grid-template-columns: repeat(3, 1fr);
      display: grid;
      align-items: center;
      justify-items: center;
      a {
        font-size: 14px;
        padding: 4px 10px;
      }
    }
    &-item-five {
      position: absolute;
      right: 0;
    }
  }
  .grid-container-table-items {
    display: grid;
    gap: 10px;
  }

</style>