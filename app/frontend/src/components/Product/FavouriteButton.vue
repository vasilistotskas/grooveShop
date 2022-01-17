<template>
  <button class="btn-outline-primary-three" data-mdb-ripple-color="dark" type="button" @click="favouriteHandle()">
    <font-awesome-icon v-if="!isFavourite" :icon="heartIcon" :style="{ color: 'white' }"
                       size="2x"
    />
    <font-awesome-icon v-else :icon="heartIcon" :style="{ color: '#ff1719e0' }" size="2x" />
  </button>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import ProductModel from '@/state/product/ProductModel';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

@Options({
  name: 'FavouriteButton',
  props: {
    product: Object
  }
})
export default class FavouriteButton extends Vue {

  product = new ProductModel();

  get heartIcon(): typeof faHeart {
    return faHeart;
  }

  get isFavourite(): ProductModel {
    return store.getters['product/favourite/getStateIsCurrentProductInFavourites'];
  }

  async favouriteHandle(): Promise<void> {
    await store.dispatch('product/favourite/toggleFavourite', this.product);
  }

}

</script>

<style lang="scss" scoped>
.favourite-content{
  padding: 8px;
  background: #e4e4e4;
  .fa-heart{ font-size: 20px;
    &.fas{
      color: $primary-color-1;
    }
  }
}
</style>
