<template>
  <div v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0" class="user-order-history">
    <div
        v-for="order in allPaginatedResults"
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
                         :src="mediaStreamImage(ImageTypeOptions.PRODUCTS, item.product.main_image_filename, '75', '75')"
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
        v-if="Object.keys(allPaginatedResults).length !== 0"
        :endpointUrl="'orders'"
        :max-visible-buttons="3"
        :route="'Orders'"
        :total-pages="allPaginatedResultsTotalPages"/>
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
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import Pagination from '@/components/Pagination/Pagination.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'UserOrderHistory',
  components: {
    Pagination
  }
})

export default class UserOrderHistory extends Vue implements PaginatedInterface<ProductModel> {

  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)

  ImageTypeOptions: any = ImageTypeOptions
  ImageFitOptions: any = ImageFitOptions
  ImagePositionOptions: any = ImagePositionOptions

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  get allPaginatedResults(): Array<ProductModel> {
    return store.getters['pagination/getResultData']
  }

  get allPaginatedResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get allPaginatedResultsNextPageUrl(): URL {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get allPaginatedResultsPreviousPageUrl(): URL {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get allPaginatedResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  get currentPageNumber(): number {
    let storedPageNumber = store.getters['pagination/getCurrentPageNumber']
    if (storedPageNumber) {
      return store.getters['pagination/getCurrentPageNumber']
    }
    return 1
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

  async fetchUserOrders(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `orders`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }
    return ImageUrlModel.buildMediaStreamImageUrl(mediaStreamImageData)
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }


}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserOrderHistory"

</style>