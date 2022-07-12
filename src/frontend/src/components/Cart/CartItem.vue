<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <RouterLink :title="item.product.name" :to="productPath" aria-label="Product">
        <GrooveImage
          :alt="item.product.name"
          :file-name="item.product.main_image_filename"
          :use-media-stream="true"
          :img-class="'border-radius-img img-fluid'"
          :img-type="ImageTypeOptions.PRODUCTS"
          :img-width="75"
          :img-height="75"
        />
        <span>{{ item.product.name }}</span>
      </RouterLink>
    </div>
    <div class="grid-container-cart-item-two">${{ item.product.price }}</div>
    <div class="grid-container-cart-item-three">
      <a :title="`Decrease Quantity of ${item.product.name}`" class="btn-outline-primary-main" data-mdb-ripple-color="dark" type="button" @click="decrementQuantity(item)">
        <font-awesome-icon :icon="minusIcon" size="lg" />
      </a>
      {{ item.quantity }}
      <a :title="`Increase Quantity of ${item.product.name}`" class="btn-outline-primary-main" data-mdb-ripple-color="dark" type="button" @click="incrementQuantity(item)">
        <font-awesome-icon :icon="plusIcon" size="lg" />
      </a>
    </div>
    <div class="grid-container-cart-item-four">${{ itemTotal.toFixed(2) }}</div>
    <div class="grid-container-cart-item-five">
      <button :title="`Remove from cart ${item.product.name}`" class="btn-outline-primary-main" type="button" @click="removeFromCart(item)">
        <font-awesome-icon :icon="trashIcon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { PropType } from 'vue'
import CartItemModel from '@/state/cart/CartItemModel'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'

@Component({
  name: 'CartItem',
  components: {
    GrooveImage,
  },
  props: {
    item: {
      type: Object as PropType<CartItemModel>,
    },
  },
})
export default class CartItem extends Vue {
  item = new CartItemModel()

  trashIcon = faTrash
  minusIcon = faMinusCircle
  plusIcon = faPlusCircle

  ImageTypeOptions = ImageTypeOptions

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get itemTotal(): number {
    return this.item.quantity * this.item.product.price
  }

  get productPath(): string {
    return '/product' + this.item.product.absolute_url
  }

  public decrementQuantity(item: CartItemModel): void {
    store.commit('cart/decrementQuantity', item)
  }

  public incrementQuantity(item: CartItemModel): void {
    store.commit('cart/incrementQuantity', item)
  }

  public updateCart(): void {
    store.commit('cart/updateCart')
  }

  public removeFromCart(item: CartItemModel): void {
    store.commit('cart/removeFromCart', item)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Cart/CartItem';
</style>
