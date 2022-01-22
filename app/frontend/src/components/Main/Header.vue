<template>
  <header id="main-header">
<!--    <div class="predeader" :class="{ 'predeader&#45;&#45;hidden': !showPreHeader }">-->
<!--      <p>-->
<!--        Groove <a href="http://localhost:5000/">-->
<!--          <span style="text-decoration: underline;">Here</span>!</a>-->
<!--      </p>-->
<!--    </div>-->
    <Navbar :preHeadHidden="!showPreHeader" :cart-total-length="cartTotalLength"
            :show-mobile-menu="showMobileMenu"
    />
  </header>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar/Navbar.vue';

@Options({
  name: 'Header',
  components: {
    Navbar
  }
})
export default class Header extends Vue {

  showPreHeader:boolean = true;
  lastScrollPosition:number = 0;
  showMobileMenu = false;

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength'];
  }

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    if (currentScrollPosition < 0) {
      return
    }
    // Stop executing this function if the difference between
    // current scroll position and last scroll position is less than some offset
    console.log(Math.abs(currentScrollPosition - this.lastScrollPosition) < 60)
    if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
      return
    }
    this.showPreHeader = currentScrollPosition < this.lastScrollPosition
    this.lastScrollPosition = currentScrollPosition
  }

}
</script>

<style lang="scss" scoped>
  header {
    @media screen and (min-width: 1200px) {
      position: fixed;
    }

    width: 100%;
    z-index: 12;

    .predeader {
      background-color: $color-palette-main-fourth;
      text-align: center;
      font-size: 14px;
      color: $color-palette-main-fourth!important;
      transform: translate3d(0, 0, 0);
      transition: all 0.3s ease-in-out;
      &.predeader--hidden {
        box-shadow: none;
        transform: translate3d(0, -100%, 0);
      }
      p {
        color: $color-palette-main-fourth;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0;
      }
      a {
        color: $color-palette-main-fourth;
        font-weight: 700;
        span {
          color: $color-palette-main-fourth;
        }
      }
    }
  }

</style>

