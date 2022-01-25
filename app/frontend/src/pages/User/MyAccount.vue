<template>
  <div v-if="userData && Object.keys(userData).length > 0" class="my-account-main-container container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="my-account-page-main-part">
      <ProfileImage
        v-model="profileImageUrl"
        :fullname="fullname"
        :src="profileImageUrl"
      />
      <nav class="my-account-grid-navbar">
        <div id="navbarNavAccount" class="my-account-grid-navbar-paths">
          <RouterLink :to="{ name: 'Orders' }" aria-label="Orders" class="nav-link">
            <font-awesome-icon :icon="truckIcon" size="1x" />
            <span>Orders</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Favourites' }" aria-label="Favourites" class="nav-link">
            <font-awesome-icon :icon="heartIcon" size="1x" />
            <span>Favourites</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Reviews' }" aria-label="Reviews" class="nav-link">
            <font-awesome-icon :icon="starIcon" size="1x" />
            <span>Reviews</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Settings' }" aria-label="Settings" class="nav-link">
            <font-awesome-icon :icon="cogsIcon" size="1x" />
            <span>Settings</span>
          </RouterLink>
          <RouterLink :to="{ name: 'Password' }" aria-label="Password" class="nav-link">
            <font-awesome-icon :icon="lockIcon" size="1x" />
            <span>Password</span>
          </RouterLink>
        </div>
        <button class="btn btn-outline-primary-two" @click="logout()">Log out</button>
      </nav>
    </div>

    <div class="my-account-page-main-content">
      <div v-if="$router.currentRoute.value.name === 'MyAccount'" class="user-account-main-page">
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

      <router-view :key="$route.path" :user-data="userData" />
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/routes';
import { Options, Vue } from 'vue-class-component';
import ProfileImage from '@/components/User/ProfileImage.vue';
import UserDetailsModel from '@/state/user/data/UserDetailsModel';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';

@Options({
  name: 'MyAccount',
  components: {
    ProfileImage,
    Breadcrumbs
  }
})

export default class MyAccount extends Vue {
  profileImageUrl: string = '';

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get cogsIcon(): typeof faCogs {
    return faCogs;
  }

  get starIcon(): typeof faStar {
    return faStar;
  }

  get truckIcon(): typeof faTruck {
    return faTruck;
  }

  get heartIcon(): typeof faHeart {
    return faHeart;
  }

  get lockIcon(): typeof faLock {
    return faLock;
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated'];
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData'];
    }
    return new UserDetailsModel;
  }

  get fullname(): string {
    let first_name = this.userData.first_name;
    let last_name = this.userData.last_name;

    if (first_name === null) {
      first_name = '';
    }

    if (last_name === null) {
      last_name = '';
    }

    return first_name + ' ' + last_name;
  }

  created() {
    document.title = 'My Account';
    this.$watch(
      () => this.userData,
      (image: UserDetailsModel) => {
        this.profileImageUrl = image.main_image_absolute_url;
      }
    );
  }

  mounted() {
    this.profileImageUrl = this.userData.main_image_absolute_url;
  }

  updated() {
    if (router.currentRoute.value.name === 'MyAccount') {
      document.title = 'My Account';
    }
  }

  public logout(): void {
    store.commit('user/data/unsetUserData');
    router.push('/');
  }

}
</script>

<style lang="scss" scoped>
  .my-account-main-container {
    display: grid;
    grid-template-columns: 25% auto;
    gap: 0 50px;
    min-height: 500px;
    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
    }
    .breadcrumb-container {
      grid-column: 1/3;
    }
  }
  .my-account-page-main-part {
    max-height: 520px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: var(--cp-palette-main-secondary);
    border: 1px solid var(--cp-palette-main-third);
    border-radius: 25px;
    padding: 20px;
    gap: 20px;
    box-shadow: rgb(0 0 0 / 6%) 0 3px 5px -1px, rgb(0 0 0 / 5%) 0 6px 10px 0, rgb(0 0 0 / 4%) 0 1px 18px 0;
  }

  .my-account-page-main-content {
    display: grid;
    position: relative;
    height: max-content;
    grid-template-rows: 1fr;
    background-color: var(--cp-palette-main-secondary);
    border: 1px solid var(--cp-palette-main-third);
    border-radius: 25px;
    padding: 20px 20px 60px;
    gap: 20px;
    box-shadow: rgb(0 0 0 / 6%) 0 3px 5px -1px, rgb(0 0 0 / 5%) 0 6px 10px 0, rgb(0 0 0 / 4%) 0 1px 18px 0;
  }

  .my-account-grid-navbar {
    display: grid;
    background-color: var(--cp-palette-main-secondary);
    border-radius: 10px;
    gap: 15px;
    button.btn {
      padding: 10px;
      text-align: center;
      width: 40%;
      margin: 0 auto;
      border-radius: 35px;
      background-color: var(--cp-palette-main-primary);
      color: var(--cp-palette-main-fifth);
    }
  }

  .my-account-grid-navbar-paths {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    background-color: var(--cp-palette-main-secondary);
    padding-bottom: 20px;
    a {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: 15px;
      font-size: 20px;
      background-color: transparent;
      color: var(--cp-palette-main-fifth)!important;
      padding: 10px;
      text-align: start;
      width: 66%;
      margin: 0 auto;
      border-radius: 35px;
      &:hover {
        color: var(--cp-palette-main-fourth)!important;
      }
      &.router-link-active {
        color: var(--cp-palette-main-primary)!important;
        svg {
          color: var(--cp-palette-main-primary)!important;
        }
      }
      span {
        font-weight: 300;
      }
    }

  }
  .my-account-header{
    font-weight: 700;
    &:hover{
      color: var(--cp-palette-main-third);
    }
  }

  .log-out-button{
    right: 20px;
    &:hover{
      background-color: var(--cp-palette-main-primary) !important;
      transform: scale(1.02);
    }
  }
</style>
