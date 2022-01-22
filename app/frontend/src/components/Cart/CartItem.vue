<template>
  <div class="grid-container-cart">
    <div class="grid-container-cart-item-one">
      <RouterLink :to="productPath" aria-label="Product">
        <img :alt="item.product.name" :src="mediaStreamImage('products', item.product.main_image_filename, '75', '75')" class="border-radius-img img-fluid"
             height="75" width="75"
        />
        <span>{{ item.product.name }}</span>
      </RouterLink>
    </div>
    <div class="grid-container-cart-item-two">${{ item.product.price }}</div>
    <div class="grid-container-cart-item-three">
      <a class="btn-outline-primary-main" data-mdb-ripple-color="dark" type="button" @click="decrementQuantity(item)">
        <font-awesome-icon :icon="minusIcon" :style="{ color: '#3b3b3b' }" size="lg" />
      </a>
      {{ item.quantity }}
      <a class="btn-outline-primary-main" data-mdb-ripple-color="dark" type="button" @click="incrementQuantity(item)">
        <font-awesome-icon :icon="plusIcon" :style="{ color: '#3b3b3b' }" size="lg" />
      </a>
    </div>
    <div class="grid-container-cart-item-four">${{ itemTotal.toFixed(2) }}</div>
    <div class="grid-container-cart-item-five">
      <button class="btn-outline-primary-main" type="button" @click="removeFromCart(item)">
        <font-awesome-icon :icon="trashIcon" :style="{ color: '#3b3b3b' }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import CartItemModel from '@/state/cart/CartItemModel';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

@Options({
  name: 'CartItem',
  props: {
    item: {
      type: Object
    }
  }
})

export default class CartItemVue extends Vue {

  item = new CartItemModel();

  get trashIcon(): typeof faTrash {
    return faTrash;
  }

  get minusIcon(): typeof faMinusCircle {
    return faMinusCircle;
  }

  get plusIcon(): typeof faPlusCircle {
    return faPlusCircle;
  }

  get isMobile(): boolean {
    return store.getters['app/isMobile'];
  }

  get itemTotal(): number {
    return this.item.quantity * this.item.product.price;
  }

  get productPath() {
    return '/product' + this.item.product.absolute_url;
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/';
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height;
  }

  public decrementQuantity(item: Record<string, unknown>): void {
    store.commit('cart/decrementQuantity', item);
  }

  public incrementQuantity(item: Record<string, unknown>): void {
    store.commit('cart/incrementQuantity', item);
  }

  public updateCart(): void {
    store.commit('cart/updateCart');
  }

  public removeFromCart(item: Record<string, unknown>): void {
    store.commit('cart/removeFromCart', item);
  }
}
</script>

<style lang="scss" scoped>
  .grid-container-cart {
    display: grid;
    grid-template-columns: 45% 18% 18% 19%;
    position: relative;
    background-color: $color-palette-main-fourth;
    border-radius: 5px;
    align-items: center;
    justify-items: center;
    padding: 5px;
    a {
      color: $color-palette-main-secondary;
    }
    &-item-one {
      width: 100%;
      a {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
        span {
          justify-self: start;
        }
      }
    }
    &-item-two {
      color: $color-palette-main-fifth;
    }
    &-item-three {
      grid-template-columns: repeat(3, 1fr);
      display: grid;
      align-items: center;
      justify-items: center;
      color: $color-palette-main-fifth;
      a {
        font-size: 14px;
        padding: 4px 10px;
      }
    }
    &-item-four {
      color: $color-palette-main-fifth;
    }
    &-item-five {
      position: absolute;
      color: $color-palette-main-fifth;
      right: 30px;
    }
  }
  .grid-container-table-items {
    display: grid;
    gap: 10px;
  }

</style>