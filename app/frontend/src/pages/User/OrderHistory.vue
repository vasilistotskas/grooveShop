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
            <div class="order-history-grid-body" v-for="item in order.items"
                v-bind:key="item.product.id">
                <router-link :to="'/product' + item.product.absolute_url" aria-label="Product">
                  <span>
                    <img :src="item.product.main_image" width="75" height="75" class="border-radius-img img-fluid" :alt="item.product.name">
                  </span>
                  <span>{{ item.product.name }}</span>
                  <span>${{ item.product.price }}</span>
                  <span>{{ item.quantity }}</span>
                  <span>${{ itemTotal(item).toFixed(2) }}</span>
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination
        v-if="Object.keys(orderHistoryResults).length !== 0"
        :total-pages="orderHistoryResultsTotalPages"
        :max-visible-buttons="3"
        :route="'Orders'"
        :endpointUrl="'orders'"
        @pagechanged="onPageChange"/>
  </div>
  <div v-else>
    <h1>NO ORDERS</h1>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"
import ProductModel from "@/state/product/ProductModel"
import Pagination from "@/components/Pagination/Pagination.vue"

@Options({
  name: "OrderHistory",
  components: {
    Pagination
  }
})

export default class OrderHistory extends Vue{

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)

  async created(): Promise<void> {

    document.title = 'My Orders | grooveShop'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchUserOrders()

  }

  async unmounted(): Promise<void>{
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

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

}
</script>

<style lang="scss" scoped>
  .order-history-grid {
    &-head, &-body a{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 70px;
      align-items: center;
      justify-items: center;
    }
    &-head {
      padding-bottom: 10px;
    }
    &-body {
      padding: 10px;
      border: 1px solid $primary-color-6;
      background-color: white;
      border-radius: 8px;
      &:hover {
        box-shadow: 0 0 2px 1px #f800007d;
      }
    }
  }
  .card-body-order-history {
    background-color: $primary-color-4!important;
    border-radius: 10px;
    padding-top: 30px!important;
    padding-bottom: 30px!important;
    span, a {
      color: $primary-color-2!important;
    }
  }
</style>