<template>
  <div id="wrapper">
    <loading v-model:active="isLoading"
             :can-cancel="true"
             :is-full-page="true"/>

    <Navbar v-bind:showMobileMenu="showMobileMenu"
            v-bind:cartTotalLength="cartTotalLength"/>

    <section class="main-section">
      <router-view/>
    </section>

    <!-- @TODO COMPONENT -->
    <!-- Footer -->
    <footer class="main-footer text-center text-white">
      <!-- Grid container -->
      <div class="container p-4">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Facebook -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'facebook']" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
          </a>

          <!-- Twitter -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'twitter']" size="lg" :style="{ color: '#1DA1F2' }"></font-awesome-icon>
          </a>

          <!-- Google -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'google']" size="lg" :style="{ color: '#DB4437' }"></font-awesome-icon>
          </a>

          <!-- Instagram -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'instagram']" size="lg" :style="{ color: '#E1306C' }"></font-awesome-icon>
          </a>

          <!-- Linkedin -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
          </a>

          <!-- Github -->
          <a class="btn social-btn btn-floating m-1" href="#!" role="button">
            <font-awesome-icon :icon="['fab', 'github']" size="lg" :style="{ color: 'white' }"></font-awesome-icon>
          </a>
        </section>
        <!-- Section: Social media -->

        <!-- Section: Form -->
        <section class="">
          <form action="">
            <!--Grid row-->
            <div class="row d-flex justify-content-center">
              <!--Grid column-->
              <div class="col-auto">
                <p class="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-md-5 col-12">
                <!-- Email input -->
                <div class="form-outline form-white mb-4">
                  <input type="email" id="form5Example21" class="form-control" />
                  <label class="form-label" for="form5Example21">Email address</label>
                </div>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-auto">
                <!-- Submit button -->
                <button type="submit" class="btn social-btn mb-4">
                  Subscribe
                </button>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
          </form>
        </section>
        <!-- Section: Form -->

        <!-- Section: Text -->
        <section class="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
            repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
            eum harum corrupti dicta, aliquam sequi voluptate quas.
          </p>
        </section>
        <!-- Section: Text -->

        <!-- Section: Links -->
        <section class="">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 4</a>
                </li>
              </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 4</a>
                </li>
              </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 4</a>
                </li>
              </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 4</a>
                </li>
              </ul>
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </section>
        <!-- Section: Links -->
      </div>
      <!-- Grid container -->

      <!-- Copyright -->
      <div class="main-copyright text-center p-3">
        © 2020 Copyright:
        <a class="text-white" href="#">GrooveBtch</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->

  </div>
</template>


<script lang="ts">
import axios from 'axios'
import store from '@/store'
import _, {LoDashStatic} from "lodash"
import Loading from 'vue-loading-overlay'
import packageMeta from '@/../package.json'
import 'vue-loading-overlay/dist/vue-loading.css'
import {Options, Vue} from "vue-class-component"
import Navbar from '@/components/Navbar/Navbar.vue'
import CategoryModel from "@/state/category/CategoryModel"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import ProductFavouriteModel from "@/state/product/favourite/ProductFavouriteModel"

@Options({
  name: "App",
  components: {
    Loading,
    Navbar
  }
})
export default class App extends Vue {

  public showMobileMenu = false

  get lodash(): LoDashStatic {
    return _
  }

  get version(): string {
    return packageMeta.version
  }

  get isLoading(): boolean {
    return store.getters['app/getLoading']
  }

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }

  public updateMetaTagElement(metaName: string, metaAttribute: string, newValue: string): void {
    const metaTagElement = <Element> document.querySelector(`meta[name=${metaName}]`);
    metaTagElement.setAttribute(metaAttribute, newValue);
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
  }

  get userData(): UserDetailsModel {
    if(this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get userReviews(): Array<ProductReviewModel> {
    return store.getters['product/review/getUserReviews']
  }

  get userOrders(): Array<any> {
    return store.getters['user/order/getUserOrders']
  }

  get cartData(): {} {
    return store.getters['cart/getCart']
  }

  public initializeAuth(): void {
    store.commit('user/data/initializeAuth')
  }

  public initializeCart(): void {
    store.commit('cart/initializeCart')
  }

  public initializeToken(): void {
    const token = store.getters['user/getToken']
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }

  async created(): Promise<void> {

    await Promise.all([
      this.initializeAuth(),
      this.initializeToken(),
      this.initializeCart(),
      store.dispatch('category/categoriesTreeFromRemote')
    ])

    if (this.isAuthenticated) {
      await Promise.all([
        store.dispatch('user/data/userDataFromRemote'),
        store.dispatch('user/order/userOrdersFromRemote')
      ])
    }

  }

}
</script>

<style lang="scss">
   .form-check-input-main {
     &:checked {
       background-color: #d51c12!important;
       border-color: #d51c12!important;
     }
   }
  .router-link-active {
    color: #d51c12!important;
  }
  .cardEffect {
    &:hover {
      border-radius: 10px;
      transform: scale(1.02);
      box-shadow: 0 0 10px 3px #d51c12;
      .card-img-top, .card-body {
        transition: all .3s ease-in-out;
      }
    }
  }
  .cardSpecialEffect {
      position: relative;
      padding: 20px 15px;
      color: white;
      font-size: 20px;
      font-family: 'Open Sans', sans-serif;
      text-transform: uppercase;
      letter-spacing: 2px;
      -webkit-font-smoothing: antialiased;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .3s ease-in-out;
      img {
        background: #191919;
        transition: all .3s ease-in-out;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: block;
        height: 100%;
        width: 100%;
      }

      &:hover {
        border: none;
        transform: scale(1.02);
        transition: all .3s ease-in-out;

        .line-1 {
          animation: move1 1500ms infinite ease;
        }

        .line-2 {
          animation: move2 1500ms infinite ease;
        }

        .line-3 {
          animation: move3 1500ms infinite ease;
        }

        .line-4 {
          animation: move4 1500ms infinite ease;
        }
      }

    img {
      display: block;
      height: 100%;
      max-width: 100%;
    }
    .line-1 {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      background-color: red;
      left: 0;
      bottom: 0;
    }
    .line-2 {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      background-color: red;
      left: 0;
      top: 0;
    }
    .line-3 {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      background-color: red;
      right: 0;
      top: 0;
    }
    .line-4 {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      background-color: red;
      right: 0;
      bottom: 0;
    }
  }
  .card {
    transition: all .3s ease-in-out;
    background-color: transparent!important;
    .card-img-top {
      transition: all .3s ease-in-out;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .card-body{
      transition: all .3s ease-in-out;
      background: #191919;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .card-title{color: white}
      .card-text{color: white}
    }
    .card-body-border-top{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .social-btn{
    color: white!important;
    transition: all 0.3s ease-in-out;
    border: 1px solid #3b3b3b!important;
    background-color: rgb(51, 51, 51)!important;
    &:hover {
      transition: all 0.3s ease-in-out;
      box-shadow: 0 0 10px 3px #757575;
      transform: scale(1.02);
      svg {
        transition: all 0.3s ease-in-out;
        transform: scale(1.1);
      }
    }
  }
  .main-section{
    @media screen and (min-width: 1200px){
      min-height: 500px;
      display: grid;
    }
  }
  .main-footer{
    background-color: #191919;
  }
  .main-copyright{
    background-color: #080808;
  }

  .form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

</style>
