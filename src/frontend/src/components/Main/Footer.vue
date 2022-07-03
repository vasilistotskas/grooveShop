<template>
  <footer class="main-footer text-center text-white">
    <div class="container p-4">
      <section class="footer-section-newsletter mb-4 pt-4">
        <form method="post">
          <div class="footer-grid-newsletter">
            <div class="grid-item-one mb-2">
              <p>
                <strong>Sign up for our newsletter</strong>
              </p>
            </div>
            <div class="grid-item-two">
              <!-- Email input -->
              <input id="form5Example21" class="form-control" type="email" />
              <label class="form-label mt-2" for="form5Example21">Email address</label>
            </div>
            <div class="grid-item-three">
              <button class="btn-outline-primary-one mb-4" title="Subscribe to Newsletter" type="submit">Subscribe</button>
            </div>
          </div>
        </form>
        <div class="footer-safe-payments">
          <span class="footer-safe-payments-text">Safe Payments</span>
          <LottiePlayerMain class="footer-safe-payments-lottie" :animation-data="getSafeShieldAnim" :loop="false" />
        </div>
      </section>

      <section class="footer-section-links mb-4 mt-4">
        <div class="grid-item-one">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!" title="Footer Link 1">Link 1</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 2">Link 2</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 3">Link 3</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 1">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-two">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!" title="Footer Link 1">Link 1</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 2">Link 2</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 3">Link 3</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 1">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-three">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!" title="Footer Link 1">Link 1</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 2">Link 2</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 3">Link 3</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 1">Link 4</a>
            </li>
          </ul>
        </div>
        <div class="grid-item-four">
          <span class="text-uppercase">Links</span>
          <ul>
            <li>
              <a href="#!" title="Footer Link 1">Link 1</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 2">Link 2</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 3">Link 3</a>
            </li>
            <li>
              <a href="#!" title="Footer Link 1">Link 4</a>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div class="main-copyright text-center p-3">
      <span>© 2020 Copyright:</span>
      <a href="#" title="Made By Groove">GrooveBtch</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'
import * as safe_shield from '@/assets/lotties/safe_shield.json'
import LottiePlayerMain from '@/components/Utilities/LottiePlayerMain.vue'

@Component({
  name: 'Footer',
  components: {
    LottiePlayerMain,
  },
})
export default class Footer extends Vue {
  get getSafeShieldAnim(): object {
    return safe_shield
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Main/Footer';
</style>
