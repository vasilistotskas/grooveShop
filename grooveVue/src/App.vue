<template>
  <div id="wrapper">

    <Navbar
        v-bind:showMobileMenu="showMobileMenu"
        v-bind:cartTotalLength="cartTotalLength"
        v-bind:categories="categories"
    />

   Loading Spinner
      <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
        <div v-if="$store.state.isLoading" class="lds-dual-ring"></div>
      </div>

    <section class="mb-5">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      showMobileMenu: false
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    this.$store.dispatch('getCategories')

    if (this.$store.state.isAuthenticated) {
      this.$store.dispatch('getUserData')
    }

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  computed: {
    userData: {
      get() {
        return this.$store.getters['getStateUserData']
      }
    },
    favourites: {
      get() {
        return this.$store.getters['getStateUserFavourites']
      }
    },
    reviews: {
      get() {
        return this.$store.getters['getStateUserReviews']
      }
    },
    cart: {
      get() {
        return this.$store.getters['getStateCartData']
      }
    },
    categories: {
      get() {
        return this.$store.getters['getStateCategories']
      }
    },
    cartTotalLength() {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

section{
  padding-top: 75px;
}

.main-navbar{
  z-index: 99999!important;
}

::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    z-index: 99999;
    background: aliceblue;
    -webkit-box-align: end;
    -ms-flex-align: end;
    background: aliceblue;
    align-items: flex-end;
    bottom: 0;
    display: -webkit-box;
    width: 100%;
    height: auto;
    display: -ms-flexbox;
    display: block;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    opacity: 1;
    visibility: visible;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
</style>
