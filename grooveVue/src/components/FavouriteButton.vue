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
  data() {
    return {
      isFavourite: Boolean
    }
  },
  props: {
    product: Object
  },
  methods: {
    favouriteHandle() {
      if (this.$store.state.isAuthenticated) {

      // check if is in favourites already else
        if (!this.product.is_favourite_for_current_user) {
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
            this.product.is_favourite_for_current_user = true
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
            this.errors.push('Something went wrong. Please try again')

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
              `/api/v1/favouriteremove/${favourite_id}/${product_id}`,
              {
                headers: { 'Authorization': "Token " + token },
              },
          )
          .then(response => {
            this.product.is_favourite_for_current_user = false
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
            this.errors.push('Something went wrong. Please try again')

            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },

    getFavouriteIconClass() {
      return !this.product.is_favourite_for_current_user ? 'far fa-heart' : 'fas fa-heart'
    }
  }
}
</script>