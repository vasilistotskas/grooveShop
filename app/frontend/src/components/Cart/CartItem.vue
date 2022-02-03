<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <RouterLink :title="item.product.name" :to="productPath" aria-label="Product">
        <img
            :alt="item.product.name"
            :src="mediaStreamImage('products', item.product.main_image_filename, '75', '75')"
            class="border-radius-img img-fluid"
            height="75"
            width="75"
            loading="lazy"
        />
        <span>{{ item.product.name }}</span>
      </RouterLink>
    </div>
    <div class="grid-container-cart-item-two">${{ item.product.price }}</div>
    <div class="grid-container-cart-item-three">
      <a :title="`Decrease Quantity of ${item.product.name}`" class="btn-outline-primary-main"
         data-mdb-ripple-color="dark" type="button" @click="decrementQuantity(item)">
        <font-awesome-icon :icon="minusIcon" size="lg"/>
      </a>
      {{ item.quantity }}
      <a :title="`Increase Quantity of ${item.product.name}`" class="btn-outline-primary-main"
         data-mdb-ripple-color="dark" type="button" @click="incrementQuantity(item)">
        <font-awesome-icon :icon="plusIcon" size="lg"/>
      </a>
    </div>
    <div class="grid-container-cart-item-four">${{ itemTotal.toFixed(2) }}</div>
    <div class="grid-container-cart-item-five">
      <button :title="`Remove from cart ${ item.product.name }`" class="btn-outline-primary-main" type="button"
              @click="removeFromCart(item)">
        <font-awesome-icon :icon="trashIcon"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import CartItemModel from '@/store/cart/CartItemModel'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'

@Options({
  name: 'CartItem',
  props: {
    item: {
      type: Object
    }
  }
})

export default class CartItemVue extends Vue {

  item = new CartItemModel()

  trashIcon: IconDefinition = faTrash
  minusIcon: IconDefinition = faMinusCircle
  plusIcon: IconDefinition = faPlusCircle

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get itemTotal(): number {
    return this.item.quantity * this.item.product.price
  }

  get productPath() {
    return '/product' + this.item.product.absolute_url
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height
  }

  public decrementQuantity(item: Record<string, unknown>): void {
    store.commit('cart/decrementQuantity', item)
  }

  public incrementQuantity(item: Record<string, unknown>): void {
    store.commit('cart/incrementQuantity', item)
  }

  public updateCart(): void {
    store.commit('cart/updateCart')
  }

  public removeFromCart(item: Record<string, unknown>): void {
    store.commit('cart/removeFromCart', item)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Cart/CartItem"

</style>