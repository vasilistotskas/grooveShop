<template>
  <div class="page-my-account container">
    <div class="col-12">
      <h1 class="title mb-5"><router-link :to="{ name: 'MyAccount' }">My account</router-link></h1>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" :to="{ name: 'Settings' }">Settings</router-link>
            <router-link class="nav-link" :to="{ name: 'Orders' }">Orders</router-link>
            <button @click="logout()" class="button is-danger nav-link">Log out</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="col-12 mt-5">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import OrderSummary from '@/components/OrderSummary.vue'

export default {
  name: 'MyAccount',
  components: {
    OrderSummary
  },
  mounted() {
    document.title = 'My account | grooveShop'
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("userid")

      this.$store.commit('removeToken')
      this.$store.commit('unsetUserProfile')
      this.$store.commit('unsetIsFavourite')

      this.$router.push('/')
    }
  }
}
</script>