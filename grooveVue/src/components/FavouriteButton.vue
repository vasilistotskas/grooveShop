<template>
  <div class="control">
    <a @click="favouriteHandle()"><i :class=getFavouriteIconClass()></i></a>

  </div>
</template>


<script>

import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: 'FavouriteButton',
  props: {
    product: Object
  },
  computed: {
    isFavourite: {
      get() {
        return this.$store.getters['getStateIsFavourite']
      },
      set(value) {
        this.$store.commit('updateIsFavourite', value)
      }
    },
  },
  updated() {
    if (this.$store.state.isAuthenticated) {
      this.$store.dispatch('getIfCurrentProductIsFavourite', this.$route.params.product_id)
    }
  },
  methods: {
    favouriteHandle() {
      if (this.$store.state.isAuthenticated) {

      // check if is in favourites already else
        if (!this.isFavourite) {
          this.addToFavourites()
        } else {
          this.removeFromFavourites()
        }

      } else {
        toast({
          message: 'Register to add to favourites',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })
      }
    },
    async addToFavourites(){

      const data = {
        "favourite_id": this.$store.state.userProfile.favourite_id,
        "is_favourite": true,
        "product": this.product
      }

      let token = localStorage.getItem('token');

      await axios
          .post(
              '/api/v1/favouritelist/',
              data,
              {
                headers: { 'Authorization': "Token " + token },
              },
            )
          .then(response => {
            this.isFavourite = true
            toast({
              message: 'The product was added to the favourites',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },
    async removeFromFavourites() {

      const favourite_id = this.$store.state.userProfile.favourite_id
      const product_id = this.product.id

      let token = localStorage.getItem('token');

      await axios
          .delete(
              `/api/v1/favouriteitem/${favourite_id}/${product_id}`,
              {
                headers: { 'Authorization': "Token " + token },
              },
          )
          .then(response => {
            this.isFavourite = false
            toast({
              message: 'The product was removed from favourites',
              type: 'is-info',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })
          .catch(error => {
            console.log(error)
          })
    },

    getFavouriteIconClass() {
      return !this.isFavourite ? 'far fa-heart' : 'fas fa-heart'
    }
  }
}
</script>