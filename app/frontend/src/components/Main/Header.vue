<template>
  <header id="main-header">
    <!--    <div class="predeader" :class="{ 'predeader&#45;&#45;hidden': !showPreHeader }">-->
    <!--      <p>-->
    <!--        Groove <a href="http://localhost:5000/">-->
    <!--          <span style="text-decoration: underline;">Here</span>!</a>-->
    <!--      </p>-->
    <!--    </div>-->
    <Navbar :cart-total-length="cartTotalLength" :preHeadHidden="!showPreHeader"/>
  </header>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import Navbar from '@/components/Navbar/Navbar.vue'

@Options({
  name: 'Header',
  components: {
    Navbar
  }
})
export default class Header extends Vue {

  showPreHeader: boolean = true
  lastScrollPosition: number = 0

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
  }

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    if (currentScrollPosition < 0) {
      return
    }
    // Stop executing this function if the difference between
    // current scroll position and last scroll position is less than some offset
    if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
      return
    }
    this.showPreHeader = currentScrollPosition < this.lastScrollPosition
    this.lastScrollPosition = currentScrollPosition
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Main/Header"

</style>

