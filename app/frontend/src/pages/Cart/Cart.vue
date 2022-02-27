<template>
  <div class="container mt-7 mb-5 content-min-height">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="cart-grid-container">
      <div v-if="cartTotalLength" class="grid-container-item-two">
        <div class="grid-container-table">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        <div class="grid-container-table-items">
          <CartItem
              v-for="item in cart"
              :key="item.id"
              :item="item"
              @removeFromCart="removeFromCart(item)"
          />
        </div>
      </div>
      <div class="cart-empty" v-else>
        <p>Your Cart is Empty...</p>
      </div>

      <div class="grid-container-item-three">
        <div class="grid-container-child-one">
          <h2 class="subtitle">Summary</h2>
          <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
        </div>
        <div class="grid-container-child-two">
          <RouterLink aria-label="Checkout" class="btn-outline-primary-one" title="Checkout" to="/cart/checkout"
                      type="button">
            Proceed
            to checkout
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import CartItem from '@/components/Cart/CartItem.vue'
import CartItemModel from '@/state/cart/CartItemModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Options({
  name: 'CartVue',
  components: {
    CartItem,
    Breadcrumbs
  }
})

export default class CartVue extends Vue {

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get cart(): Array<CartItemModel> {
    return store.getters['cart/getCart']
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
  }

  get cartTotalPrice(): number {
    return store.getters['cart/getCartTotalPrice']
  }

  mounted() {
    document.title = 'Cart'
  }

  public removeFromCart(item: CartItemModel) {
    store.commit('cart/removeFromCart', item)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Cart/Cart"

</style>