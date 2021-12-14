<template>
  <div class="page-my-account container mt-3 mb-5">
    <div class="col-12">
      <h1 class="title mb-2"><router-link :to="{ name: 'MyAccount' }" class="my-account-header">My account</router-link></h1>
    </div>

    <nav class="navbar-my-account navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAccount">
          <div class="navbar-nav">
            <router-link class="nav-link" :to="{ name: 'Settings' }">Settings</router-link>
            <router-link class="nav-link" :to="{ name: 'Orders' }">Orders</router-link>
            <router-link class="nav-link" :to="{ name: 'Favourites' }">Favourites</router-link>
          </div>
        </div>
        <button @click="logout()" class="btn btn-danger float-end">Log out</button>
      </div>

    </nav>

    <div class="col-12 mt-5">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from "@/routes"
import {Options, Vue} from "vue-class-component"

@Options({
  name: "MyAccount",
})

export default class MyAccount extends Vue {
  mounted() {
    document.title = 'My Account'
    console.log(this.$route.name)
  }

  protected logout(): void {
    store.commit('user/data/unsetUserData')
    router.push('/')
  }

}
</script>

<style lang="scss" scoped>
  .my-account-header{
    font-weight: 700;
    &:hover{
      color: #616161;
    }
  }
  .navbar-my-account {
    border-radius: 10px;
  }
  .log-out-button{
    right: 20px;
    &:hover{
      background-color: #e34363 !important;
      transform: scale(1.02);
    }
  }
</style>
