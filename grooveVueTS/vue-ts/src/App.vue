<template>
  <div id="wrapper">
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :is-full-page="true"
             :loader="'dots'"
             :color="'#F80000'"
             :background-color="'#000000'"

    />

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

        <!-- Section: Form -->
        <section class="footer-section-newsletter mb-4 pt-4">
          <form action="">
            <!--Grid row-->
            <div class="footer-grid-newsletter">
              <!--Grid column-->
              <div class="grid-item-one mb-2">
                <p>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="grid-item-two">
                <!-- Email input -->
                  <input type="email" id="form5Example21" class="form-control" />
                  <label class="form-label mt-2" for="form5Example21">Email address</label>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="grid-item-three">
                <!-- Submit button -->
                <button type="submit" class="btn btn-outline-primary mb-4">
                  Subscribe
                </button>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
          </form>
        </section>
        <!-- Section: Form -->

        <!-- Section: Links -->
        <section class="footer-section-links mb-4 mt-4">
          <!--Grid column-->
          <div class="grid-item-one">
            <span class="text-uppercase">Links</span>

            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <!--Grid column-->

          <!--Grid column-->
          <div class="grid-item-two">
            <span class="text-uppercase">Links</span>

            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <!--Grid column-->

          <!--Grid column-->
          <div class="grid-item-three">
            <span class="text-uppercase">Links</span>

            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <!--Grid column-->

          <!--Grid column-->
          <div class="grid-item-four">
            <span class="text-uppercase">Links</span>

            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <!--Grid column-->
        </section>
        <!-- Section: Links -->
      </div>
      <!-- Grid container -->

      <!-- Copyright -->
      <div class="main-copyright text-center p-3">
        <span>© 2020 Copyright:</span>
        <a href="#">GrooveBtch</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->

    <ul id="social-sidebar">
      <li>
        <a class="entypo entypo-facebook" href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
          <span>Facebook</span>
        </a>
      </li>
      <li>
        <a class="entypo entypo-gplus" href="https://www.google.com/" aria-label="Google" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'google']" size="lg" :style="{ color: '#DB4437' }"></font-awesome-icon>
          <span>Google+</span>
        </a>
      </li>
      <li>
        <a class="entypo entypo-twitter" href="https://www.twitter.com/" aria-label="Twitter" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'twitter']" size="lg" :style="{ color: '#1DA1F2' }"></font-awesome-icon>
          <span>Tweeter</span>
        </a>
      </li>
      <li>
        <a class="entypo entypo-instagram" href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'instagram']" size="lg" :style="{ color: '#E1306C' }"></font-awesome-icon>
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a class="entypo entypo-linkedin" href="https://www.linkedin.com/" aria-label="Linkedin" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
          <span>Linkedin</span>
        </a>
      </li>
      <li>
        <a class="entypo entypo-github" href="https://www.github.com/" aria-label="Github" target="_blank" rel="noopener">
          <font-awesome-icon :icon="['fab', 'github']" size="lg" :style="{ color: 'white' }"></font-awesome-icon>
          <span>Github</span>
        </a>
      </li>

    </ul>

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
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"

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

  mounted() {
    window.addEventListener('resize', () => {
      store.commit('app/setWindowWidth', window.innerWidth)
    })
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
  .btn-product-card {
    color: black!important;
    background-color: white!important;
    border-color: #191919!important;
  }
   .form-check-input-main {
     &:checked {
       background-color: $primary-color-1!important;
       border-color: $primary-color-1!important;
     }
   }
  .router-link-active {
    color: $primary-color-1!important;
  }
  .cardEffect {
    &:hover {
      border-radius: 10px;
      transform: scale(1.01);
      box-shadow: 0 0 10px 1px #ff7b7b;
    }
  }
  .cardSpecialEffect {
      position: relative;
      color: $primary-color-4;
      padding: 5px;
      border-radius: 10px;
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
      -webkit-font-smoothing: antialiased;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        background: #191919;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: block;
        height: 100%;
        width: 100%;
      }

      &:hover {
        border: none;
        transform: scale(1.02);

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

  .btn-outline-primary{
    color: $primary-color-4!important;
    border: 1px solid #3b3b3b!important;
    background-color: rgb(51, 51, 51)!important;
    &.active {
      background-color: $primary-color-1!important;
      border: 1px solid $primary-color-4!important;
    }
    &:hover {
      box-shadow: 0 0 5px 2px #757575;
      transform: scale(1.005);
      svg {
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
    text-align: center;
    padding: 5px;
    span {
      font-size: 12px;
    }
  }

  .form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

  .footer-grid-newsletter {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 80% 20%;
    max-width: 500px;
    margin: 0 auto;

    .grid-item {
      &-one {
        grid-column-start: 1;
        grid-column-end: span col4-start;
        grid-row-start: 1;
      }
      &-two {
        label {
          display: block;
        }
      }
    }
  }

  .footer-section-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .grid-item {
      &-one, &-two, &-three, &-four {
        text-align: center;
      }
    }
  }

</style>
