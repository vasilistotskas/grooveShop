<template>
  <div
    v-if="userData && Object.keys(userData).length > 0"
    class="user-account-main-container container mt-7 mb-5"
  >
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="user-account-page-main-part">
      <UserProfileImage
        v-model="profileImageFilename"
        :fullname="fullname"
        :src="profileImageFilename"
      />
      <nav class="user-account-grid-navbar">
        <div id="navbarNavAccount" class="user-account-grid-navbar-paths">
          <RouterLink :to="{ name: 'Orders' }" aria-label="Orders" class="nav-link" title="Orders">
            <font-awesome-icon :icon="truckIcon" size="1x" />
            <span>Orders</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Favourites' }"
            aria-label="Favourites"
            class="nav-link"
            title="Favourites"
          >
            <font-awesome-icon :icon="heartIcon" size="1x" />
            <span>Favourites</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Reviews' }"
            aria-label="Reviews"
            class="nav-link"
            title="Reviews"
          >
            <font-awesome-icon :icon="starIcon" size="1x" />
            <span>Reviews</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Settings' }"
            aria-label="Settings"
            class="nav-link"
            title="Settings"
          >
            <font-awesome-icon :icon="cogsIcon" size="1x" />
            <span>Settings</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Password' }"
            aria-label="Password"
            class="nav-link"
            title="Password"
          >
            <font-awesome-icon :icon="lockIcon" size="1x" />
            <span>Password</span>
          </RouterLink>
        </div>
        <button class="btn btn-outline-primary-two" title="Log Out" @click="logout()">
          Log out
        </button>
      </nav>
    </div>

    <div class="user-account-page-main-content">
      <div
        v-if="$router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT"
        class="user-account-main-page"
      >
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

      <RouterView :key="$route.path" :route="$route" :user-data="userData" />
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/Routes'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { Options as Component, Vue } from 'vue-class-component'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'
import UserProfileImage from '@/Components/User/UserProfileImage.vue'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'

@Component({
  name: 'UserAccount',
  components: {
    UserProfileImage,
    Breadcrumbs,
  },
})
export default class UserAccount extends Vue {
  authModule = getModule(AuthModule)
  userModule = getModule(UserModule)
  productFavouriteModule = getModule(ProductFavouriteModule)
  productReviewModule = getModule(ProductReviewModule)
  countryModule = getModule(CountryModule)
  MainRouteNames = MainRouteNames
  profileImageFilename = ''
  cogsIcon = faCogs
  starIcon = faStar
  truckIcon = faTruck
  heartIcon = faHeart
  lockIcon = faLock

  get breadCrumbPath() {
    return router.currentRoute.value.meta.breadcrumb
  }

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
  }

  get userData(): UserProfileModel {
    if (this.isAuthenticated) {
      return this.userModule.getUserData
    }
    return new UserProfileModel()
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

  created(): void {
    document.title = 'My Account'
    this.$watch(
      () => this.userData,
      (image: UserProfileModel) => {
        this.profileImageFilename = image.main_image_filename
      }
    )
  }

  mounted(): void {
    this.profileImageFilename = this.userData.main_image_filename
  }

  updated(): void {
    if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT) {
      document.title = 'My Account'
    }
  }

  logout(): void {
    this.userModule.unsetUserData()
    this.authModule.logout().then(() => {
      this.productFavouriteModule.unsetFavourites()
      this.productFavouriteModule.unsetUserFavourites()
      this.productReviewModule.unsetUserToProductReview()
      this.productReviewModule.unsetUserReviews()
      this.countryModule.unsetUserCountryData()
    })
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAccount';
</style>
