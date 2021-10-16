<template>
  <a @click="favouriteHandle()">
    <div class="control favourite-content">
      <i :class=getFavouriteIconClass()></i>
    </div>
  </a>
</template>


<script>

import {toast} from "bulma-toast";
import {mapGetters} from "vuex";

export default {
  name: 'FavouriteButton',
  props: {
    product: Object
  },
  computed: {
    isFavourite: {
      get() {
        const productId = this.$store.state.product.id
        return this.$store.getters.getStateIsCurrentProductInFavourites(productId)
      }
    }
  },
  methods: {
    favouriteHandle() {
      this.$store.dispatch('toggleFavourite', this.product)
        .then(success => {
          toast({
            message: success,
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        })
        .catch(error => {
          toast({
            message: error.message,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        })
    },
    getFavouriteIconClass() {
      return !this.isFavourite ? 'far fa-heart' : 'fas fa-heart'
    }
  }
}
</script>

<style lang="scss">
.favourite-content{
  padding: 8px;
  background: #e4e4e4;
  .fa-heart{ font-size: 20px;
    &.fas{
      color: red;
    }
  }
}
</style>