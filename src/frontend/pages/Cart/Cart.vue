<template>
  <div class="container mt-7 mb-5 content-min-height">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="cart-grid-container">
      <div v-if="cartTotalLength" class="grid-container-item-two">
        <div class="grid-container-table">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        <div class="grid-container-table-items">
          <CartItem v-for="item in cart" :key="item.product.id" :item="item" />
        </div>
      </div>
      <div v-else class="cart-empty">
        <p>Your Cart is Empty...</p>
      </div>

      <div class="grid-container-item-three">
        <div class="grid-container-child-one">
          <h2 class="subtitle">Summary</h2>
          <strong>${{ cartTotalPrice.toFixed(2) }}</strong
          >, {{ cartTotalLength }} items
        </div>
        <div class="grid-container-child-two">
          <RouterLink
            aria-label="Checkout"
            class="btn-outline-primary-one"
            title="Checkout"
            to="/cart/checkout"
            type="button"
          >
            Proceed to checkout
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import CartModule from '@/state/cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import CartItem from '@/components/Cart/CartItem.vue'
import CartItemModel from '@/state/cart/CartItemModel'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'Cart',
  components: {
    CartItem,
    Breadcrumbs,
  },
})
export default class Cart extends Vue {
  cartModule = getModule(CartModule)

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get cart(): Array<CartItemModel> {
    return this.cartModule.getCart
  }

  get cartTotalLength(): number {
    return this.cartModule.getCartTotalLength
  }

  get cartTotalPrice(): number {
    return this.cartModule.getCartTotalPrice
  }

  mounted(): void {
    document.title = 'Cart'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Cart/Cart';
</style>
