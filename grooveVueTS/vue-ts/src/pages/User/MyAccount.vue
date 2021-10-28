<template>
  <div class="page-my-account container mt-5">
    <div class="col-12">
      <h1 class="title mb-5"><router-link :to="{ name: 'MyAccount' }" class="my-account-header">My account</router-link></h1>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAccount">
          <div class="navbar-nav">
            <router-link class="nav-link" :to="{ name: 'Settings' }">Settings</router-link>
            <router-link class="nav-link" :to="{ name: 'Orders' }">Orders</router-link>
            <button @click="logout()" class="button is-danger position-absolute log-out-button">Log out</button>
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
import router from "@/routes";
import OrderSummary from '@/components/Order/OrderSummary.vue'
import {Options} from "vue-class-component";
import AppBaseLayout from '@/layouts/AppBaseLayout.vue'

@Options({
  name: "MyAccount",
  components: {
    OrderSummary
  }
})

export default class MyAccount extends AppBaseLayout {
  logout() {
    this.$store.commit('user/unsetUserData')
    router.push('/')
  }
}
</script>

<style lang="scss">
  .my-account-header{
    color: black;
    font-weight: 700;
    &:hover{
      color: #616161;
    }
  }
  .log-out-button{
    right: 20px;
    &:hover{
      background-color: #e34363 !important;
      transform: scale(1.02);
    }
  }
</style>