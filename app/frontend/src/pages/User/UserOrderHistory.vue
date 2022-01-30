<template>
  <div v-if="orderHistoryResults && Object.keys(orderHistoryResults).length > 0" class="user-order-history">
    <div
        v-for="order in orderHistoryResults"
        v-bind:key="order.id"
        class="mb-4"
        v-bind:order="order">
      <h3 class="is-size-4 mb-3">Order #{{ order.id }}</h3>
      <div class="box">
        <div class="card">
          <div class="card-body card-body-order-history">
            <div class="order-history-grid-head">
              <span></span>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <div v-for="item in order.items" v-bind:key="item.product.id"
                 class="order-history-grid-body">
              <RouterLink :title="item.product.name" :to="'/product' + item.product.absolute_url" aria-label="Product">
                  <span>
                    <img :alt="item.product.name"
                         :src="mediaStreamImage('products', item.product.main_image_filename, '75', '75')"
                         class="border-radius-img img-fluid"
                         height="75"
                         width="75"
                         loading="lazy"
                    >
                  </span>
                <span>{{ item.product.name }}</span>
                <span>${{ item.product.price }}</span>
                <span>{{ item.quantity }}</span>
                <span>${{ itemTotal(item).toFixed(2) }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination
        v-if="Object.keys(orderHistoryResults).length !== 0"
        :endpointUrl="'orders'"
        :max-visible-buttons="3"
        :route="'Orders'"
        :total-pages="orderHistoryResultsTotalPages"
        @pagechanged="onPageChange"/>
  </div>
  <div class="user_profile-no-data" v-else>
    <h1>NO ORDERS</h1>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import CartItemModel from '@/state/cart/CartItemModel'
import ProductModel from '@/state/product/ProductModel'
import Pagination from '@/components/Pagination/Pagination.vue'

@Options({
  name: 'UserOrderHistory',
  components: {
    Pagination
  }
})

export default class UserOrderHistory extends Vue {

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)

  get currentPageNumber(): number {
    let storedPageNumber = store.getters['pagination/getCurrentPageNumber']
    if (storedPageNumber) {
      return store.getters['pagination/getCurrentPageNumber']
    }
    return 1
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  get orderHistoryResults(): ProductModel {
    return store.getters['pagination/getResultData']
  }

  get orderHistoryResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get orderHistoryResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get orderHistoryResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get orderHistoryResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  async created(): Promise<void> {

    document.title = 'My Orders'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchUserOrders()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  public fetchUserOrders(): void {
    store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `orders`,
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserOrderHistory"

</style>