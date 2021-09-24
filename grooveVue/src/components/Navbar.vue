<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"><strong>grooveShop</strong></router-link>

      <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
         @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
      <div class="navbar-start">
        <div class="navbar-item">
          <form method="get" action="/search">
            <div class="field has-addons">
              <div class="control">
                <input type="text" class="input" placeholder="What are you looking for?" name="query">
              </div>

              <div class="control">
                <button class="button is-success">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="navbar-end">


        <NavbarCategories :categories="categories"/>


        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="button is-light">My account</router-link>
            </template>

            <template v-else>
              <router-link to="/log-in" class="button is-light">Log in</router-link>
            </template>

            <router-link to="/cart" class="button is-success">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import NavbarCategories from '@/components/NavbarCategories'

export default {
  name: 'Navbar',
  components: {
    NavbarCategories
  },
  props: {
    showMobileMenu: {
      type: Boolean,
      default: false
    },
    cartTotalLength: Number,
    categories: Object
  }
}
</script>