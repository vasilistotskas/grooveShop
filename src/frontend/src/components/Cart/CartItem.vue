<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <RouterLink
        :title="item.product.name"
        :to="productPath"
        aria-label="Product"
      >
        <img
          :alt="item.product.name"
          :src="mediaStreamImage(ImageTypeOptions.PRODUCTS, item.product.main_image_filename, '75', '75')"
          class="border-radius-img img-fluid"
          height="75"
          width="75"
          loading="lazy"
        >
        <span>{{ item.product.name }}</span>
      </RouterLink>
    </div>
    <div class="grid-container-cart-item-two">
      ${{ item.product.price }}
    </div>
    <div class="grid-container-cart-item-three">
      <a
        :title="`Decrease Quantity of ${item.product.name}`"
        class="btn-outline-primary-main"
        data-mdb-ripple-color="dark"
        type="button"
        @click="decrementQuantity(item)"
      >
        <font-awesome-icon
          :icon="minusIcon"
          size="lg"
        />
      </a>
      {{ item.quantity }}
      <a
        :title="`Increase Quantity of ${item.product.name}`"
        class="btn-outline-primary-main"
        data-mdb-ripple-color="dark"
        type="button"
        @click="incrementQuantity(item)"
      >
        <font-awesome-icon
          :icon="plusIcon"
          size="lg"
        />
      </a>
    </div>
    <div class="grid-container-cart-item-four">
      ${{ itemTotal.toFixed(2) }}
    </div>
    <div class="grid-container-cart-item-five">
      <button
        :title="`Remove from cart ${ item.product.name }`"
        class="btn-outline-primary-main"
        type="button"
        @click="removeFromCart(item)"
      >
        <font-awesome-icon :icon="trashIcon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import CartItemModel from '@/state/cart/CartItemModel'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'CartItem',
  props: {
    item: {
      type: Object
    }
  }
})

export default class CartItem extends Vue {

  item = new CartItemModel()

  trashIcon = faTrash
  minusIcon = faMinusCircle
  plusIcon = faPlusCircle

  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  imageUrl: string = ''

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get itemTotal(): number {
    return this.item.quantity * this.item.product.price
  }

  get productPath(): string {
    return '/product' + this.item.product.absolute_url
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

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
@import "@/assets/styles/components/Cart/CartItem"

</style>