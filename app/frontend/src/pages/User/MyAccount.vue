<template>
  <div class="my-account-main-container container mt-8 mb-5" v-if="userData && Object.keys(userData).length > 0">
    <div class="my-account-page-main-part">
      <ProfileImage
          :src="profileImageUrl"
          :fullname="fullname"
          v-model="profileImageUrl"/>
      <nav class="my-account-grid-navbar">
        <div class="my-account-grid-navbar-paths" id="navbarNavAccount">
          <router-link class="nav-link" :to="{ name: 'Settings' }" aria-label="Settings">
            Settings
            <font-awesome-icon :icon="cogsIcon" size="1x" :style="{ color: 'white' }"></font-awesome-icon>
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Orders' }" aria-label="Orders">
            Orders
            <font-awesome-icon :icon="truckIcon" size="1x" :style="{ color: 'white' }"></font-awesome-icon>
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Favourites' }" aria-label="Favourites">
            Favourites
            <font-awesome-icon :icon="heartIcon" size="1x" :style="{ color: 'white' }"></font-awesome-icon>
          </router-link>
        </div>
        <button @click="logout()" class="btn">Log out</button>
      </nav>
    </div>

    <div class="my-account-page-main-content">
      <router-view :key="$route.path" :userData="userData"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from "@/routes"
import {Options, Vue} from "vue-class-component"
import ProfileImage from "@/components/User/ProfileImage.vue"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs"
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart"
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck"

@Options({
  name: "MyAccount",
  components: {
    ProfileImage
  }
})

export default class MyAccount extends Vue {
  profileImageUrl: string = ''

  get cogsIcon(): typeof faCogs {
    return faCogs
  }
  get truckIcon(): typeof faTruck {
    return faTruck
  }
  get heartIcon(): typeof faHeart {
    return faHeart
  }

  created() {
    this.$watch(
        () => this.userData,
        (image:UserDetailsModel) => {
          this.profileImageUrl = image.image_url
        }
    )
  }

  mounted() {
    this.profileImageUrl = this.userData.image_url
    document.title = 'My Account'
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get userData(): UserDetailsModel {
    if(this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get fullname(): string {
    let first_name = this.userData.first_name
    let last_name = this.userData.last_name

    if (first_name == null) {
      first_name = ''
    }

    if (last_name == null) {
      last_name = ''
    }

    return first_name + ' ' + last_name
  }
  public logout(): void {
    store.commit('user/data/unsetUserData')
    router.push('/')
  }

}
</script>

<style lang="scss" scoped>

  .my-account-main-container {
    display: grid;
    grid-template-columns: 25% auto;
    gap: 50px;
    min-height: 500px;
  }
  .my-account-page-main-part {
    max-height: 426px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: white;
    border-radius: 25px;
    padding: 20px;
    gap: 20px;
    box-shadow: rgb(0 0 0 / 6%) 0 3px 5px -1px, rgb(0 0 0 / 5%) 0 6px 10px 0, rgb(0 0 0 / 4%) 0 1px 18px 0;
  }

  .my-account-page-main-content {
    display: grid;
    grid-template-rows: 1fr;
    background-color: white;
    border-radius: 25px;
    padding: 20px;
    gap: 20px;
    box-shadow: rgb(0 0 0 / 6%) 0 3px 5px -1px, rgb(0 0 0 / 5%) 0 6px 10px 0, rgb(0 0 0 / 4%) 0 1px 18px 0;
  }

  .my-account-grid-navbar {
    display: grid;
    background-color: white;
    border-radius: 10px;
    gap: 15px;
    button.btn {
      padding: 10px;
      text-align: center;
      width: 40%;
      margin: 0 auto;
      border-radius: 35px;
      background-color: #f80000e0;
      color: white;
    }
  }

  .my-account-grid-navbar-paths {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 20px;
    a {
      font-size: 20px;
      background-color: #3b3b3b;
      color: #f8f8ff !important;
      padding: 10px;
      text-align: center;
      width: 85%;
      margin: 0 auto;
      border-radius: 35px;
      &.router-link-active {
        background-color: $primary-color-3;
        color: $primary-color-4!important;
        svg {
          color: $primary-color-1!important;
        }
      }
    }

  }
  .my-account-header{
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
