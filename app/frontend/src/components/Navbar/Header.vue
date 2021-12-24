<template>
  <header id="main-header">
    <div class="preheadcust" style="">
      <p>Groove <a href="http://localhost:5000/">
        <span style="text-decoration: underline;">Here</span>!</a>
      </p>
    </div>
    <Navbar v-bind:showMobileMenu="showMobileMenu"
            v-bind:cartTotalLength="cartTotalLength"/>
  </header>

</template>

<script lang="ts">
import store from "@/store"
import { Options, Vue } from "vue-class-component"
import Navbar from '@/components/Navbar/Navbar.vue'

@Options({
  name: "Header",
  components: {
    Navbar
  }
})
export default class Header extends Vue {
  public showMobileMenu = false

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
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

    .preheadcust {
      background-color: #191919;
      text-align: center;
      font-size: 14px;
      color: $primary-color-4!important;
      p {
        color: $primary-color-4;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0;
      }
      a {
        color: $primary-color-4;
        font-weight: 700;
        span {
          color: $primary-color-4;
        }
      }
    }
  }

</style>

