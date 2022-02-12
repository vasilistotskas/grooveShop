<template>
  <div v-if="userData && Object.keys(userData).length > 0" class="user-account-main-container container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="user-account-page-main-part">
      <UserProfileImage
          v-model="profileImageUrl"
          :fullname="fullname"
          :src="profileImageUrl"
      />
      <nav class="user-account-grid-navbar">
        <div id="navbarNavAccount" class="user-account-grid-navbar-paths">
          <RouterLink :to="{ name: 'Orders' }" aria-label="Orders" class="nav-link" title="Orders">
            <font-awesome-icon :icon="truckIcon" size="1x"/>
            <span>Orders</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Favourites' }" aria-label="Favourites" class="nav-link" title="Favourites">
            <font-awesome-icon :icon="heartIcon" size="1x"/>
            <span>Favourites</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Reviews' }" aria-label="Reviews" class="nav-link" title="Reviews">
            <font-awesome-icon :icon="starIcon" size="1x"/>
            <span>Reviews</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Settings' }" aria-label="Settings" class="nav-link" title="Settings">
            <font-awesome-icon :icon="cogsIcon" size="1x"/>
            <span>Settings</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Password' }" aria-label="Password" class="nav-link" title="Password">
            <font-awesome-icon :icon="lockIcon" size="1x"/>
            <span>Password</span>
          </RouterLink>
        </div>
        <button class="btn btn-outline-primary-two" title="Log Out" @click="logout()">Log out</button>
      </nav>
    </div>

    <div class="user-account-page-main-content">
      <div v-if="$router.currentRoute.value.name === 'UserAccount'" class="user-account-main-page">
        <div class="user-account-main-page-head">
          <span class="head-title">General Account Information</span>
        </div>
        <div class="user-account-main-page-body">
          <div class="body-fullname">
            <div class="body-name">
              <span class="body-name-label">First Name</span>
              <span class="body-name">{{ userData.first_name }}</span>
            </div>
            <div class="body-surname">
              <span class="body-surname-label">Last Name</span>
              <span class="body-surname">{{ userData.last_name }}</span>
            </div>
          </div>
          <div class="body-email">
            <span class="body-email-label">Email</span>
            <span class="body-email">{{ userData.email }}</span>
          </div>
          <div class="body-phone">
            <span class="body-phone-label">Phone</span>
            <span class="body-phone">{{ userData.phone }}</span>
          </div>
        </div>
      </div>

      <router-view :key="$route.path" :user-data="userData"/>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import UserProfileImage from '@/components/User/UserProfileImage.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Options({
  name: 'UserAccount',
  components: {
    UserProfileImage,
    Breadcrumbs
  }
})

export default class UserAccount extends Vue {
  profileImageUrl: string = ''
  cogsIcon: IconDefinition = faCogs
  starIcon: IconDefinition = faStar
  truckIcon: IconDefinition = faTruck
  heartIcon: IconDefinition = faHeart
  lockIcon: IconDefinition = faLock

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get fullname(): string {
    let first_name = this.userData.first_name
    let last_name = this.userData.last_name

    if (first_name === null) {
      first_name = ''
    }

    if (last_name === null) {
      last_name = ''
    }

    return first_name + ' ' + last_name
  }

  created() {
    document.title = 'My Account'
    this.$watch(
        () => this.userData,
        (image: UserDetailsModel) => {
          this.profileImageUrl = image.main_image_absolute_url
        }
    )
  }

  mounted() {
    this.profileImageUrl = this.userData.main_image_absolute_url
  }

  updated() {
    if (router.currentRoute.value.name === 'UserAccount') {
      document.title = 'My Account'
    }
  }

  public logout(): void {
    store.commit('user/data/unsetUserData')
    router.push('/')
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserAccount"

</style>
