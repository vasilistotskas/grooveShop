<template>
  <div id="wrapper">
    <Navbar v-if="categoriesData && Object.keys(categoriesData).length > 0"
        v-bind:showMobileMenu="showMobileMenu"
        v-bind:cartTotalLength="cartTotalLength"
        v-bind:categories="categoriesData"
    />

<!--    Loading Spinner-->
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': this.isLoading }">
      <div v-if="this.isLoading" class="lds-dual-ring"></div>
    </div>

    <section class="mb-5 mt-5">
      <router-view/>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-center text-white">
      <!-- Grid container -->
      <div class="container p-4">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Facebook -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-facebook-f"></i
          ></a>

          <!-- Twitter -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-twitter"></i
          ></a>

          <!-- Google -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-google"></i
          ></a>

          <!-- Instagram -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-instagram"></i
          ></a>

          <!-- Linkedin -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-linkedin-in"></i
          ></a>

          <!-- Github -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-github"></i
          ></a>
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
                <button type="submit" class="btn btn-outline-light mb-4">
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
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2020 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->

  </div>
</template>

<script lang="ts">
  import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
  import Navbar from '@/components/Navbar/Navbar.vue'
  import { Options } from "vue-class-component";
  import axios from 'axios'
  import CategoryModel from "@/state/category/CategoryModel";
  import store from '@/store'

  @Options({
    name: "AppBase",
    components: {
      AppBaseLayout,
      Navbar
    }
  })
  export default class AppBase extends AppBaseLayout {

    public showMobileMenu = false

    get cartTotalLength(): number {
      return store.getters['cart/cartTotalLength']
    }

    get categoriesData(): Array<CategoryModel> {
      return store.getters['category/getCategories']
    }

    get userData(): Array<any> {
      return store.getters['user/data/getUserData']
    }

    get userDetails(): object {
      return store.getters['user/data/getUserDetails']
    }

    get userReviews(): Array<any> {
      return store.getters['user/review/getUserReviews']
    }

    get userFavourites(): Array<any> {
      return store.getters['user/favourite/getFavouriteData']
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
      this.initializeAuth()
      this.initializeToken()
      this.initializeCart()
      await store.dispatch('category/categoriesFromRemote')

      if (this.isAuthenticated) {
        await store.dispatch('user/data/userDataFromRemote')
        await store.dispatch('user/order/userOrdersFromRemote')
      }

    }

  }
</script>

<style scoped lang="scss">


</style>
