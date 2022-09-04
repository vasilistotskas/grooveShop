<template>
  <div class="container mt-7">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="page-success">
      <div class="page-success-grid-content">
        <h1 class="title mb-5">Thank you</h1>

        <p>Your order will be processed within 48 hours</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'CheckoutSuccess',
  components: {
    Breadcrumbs,
  },
})
export default class CheckoutSuccess extends Vue {
  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  mounted(): void {
    document.title = 'Order Success'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Checkout/CheckoutSuccess';
</style>
