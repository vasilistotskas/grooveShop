<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <router-link :to="productPath" aria-label="Product">
        <img :src="mediaStreamImage('products', item.product.product_image_filename, '75', '75')" width="75" height="75" class="border-radius-img img-fluid" :alt="item.product.name">
        <span>{{ item.product.name }}</span>
      </router-link>
    </div>
    <div class="grid-container-cart-item-two">${{ item.product.price }}</div>
    <div class="grid-container-cart-item-three">
      <a type="button" class="btn-outline-primary-main" data-mdb-ripple-color="dark" @click="decrementQuantity(item)">
        <font-awesome-icon :icon="minusIcon" size="lg" :style="{ color: '#3b3b3b' }"></font-awesome-icon>
      </a>
      {{ item.quantity }}
      <a type="button" class="btn-outline-primary-main" data-mdb-ripple-color="dark" @click="incrementQuantity(item)">
        <font-awesome-icon :icon="plusIcon" size="lg" :style="{ color: '#3b3b3b' }"></font-awesome-icon>
      </a>
    </div>
    <div class="grid-container-cart-item-four">${{ itemTotal.toFixed(2) }}</div>
    <div class="grid-container-cart-item-five">
      <button type="button" class="btn-outline-primary-main" @click="removeFromCart(item)">
        <font-awesome-icon :icon="trashIcon" :style="{ color: '#3b3b3b' }"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle"

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

    get trashIcon(): typeof faTrash {
      return faTrash
    }

    get minusIcon(): typeof faMinusCircle {
      return faMinusCircle
    }

    get plusIcon(): typeof faPlusCircle {
      return faPlusCircle
    }

    get isMobile(): boolean {
      return store.getters['app/isMobile']
    }

    get itemTotal(): number {
      return this.item.quantity * this.item.product.price
    }

    get productPath() {
      return '/product/' + this.item.product.slug + '/' + this.item.product.id
    }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/'  + imageNameFileTypeRemove + '/' + width + '/' + height
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
    background-color: $primary-color-4;
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
      right: 30px;
    }
  }
  .grid-container-table-items {
    display: grid;
    gap: 10px;
  }

</style>