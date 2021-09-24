<template>
  <div class="control">
    <a @click="favouriteHandle()"><i :class=getFavouriteIconClass()></i></a>

  </div>
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
    ...mapGetters({'isFavourite': 'getStateIsFavourite'})
  },
  updated() {
    if (this.$store.state.isAuthenticated) {
      this.$store.dispatch('getIfCurrentProductIsFavourite', this.$route.params.product_id)
    }
  },
  methods: {
    favouriteHandle() {
      this.$store.dispatch('toggleFavourite', this.product)
        .then(success => {
          toast({
            message: success,
            type: 'is-info',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        })
        .catch(error => {
          toast({
            message: error,
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