<template>
  <div
    v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
    class="container"
  >
    <div class="product-listing-grid mb-4">
      <ProductCard
        v-for="product in allPaginatedResults"
        :key="product.id"
        :product="product.product_object"
        class="grid-item"
      />
    </div>
    <Pagination
      v-if="Object.keys(allPaginatedResults).length !== 0"
      :endpoint-url="buildEndPointUrlForPaginatedResults()"
      :max-visible-buttons="3"
      :route="'Favourites'"
      :total-pages="allPaginatedResultsTotalPages"
    />
  </div>
  <div
    v-else
    class="user_profile-no-data"
  >
    <h1>NO FAVOURITES</h1>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'UserFavourites',
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductCard,
    Pagination
  }
})

export default class UserFavourites extends Vue implements PaginatedInterface<ProductModel> {

  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)
  userData = new UserDetailsModel()

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
    document.title = 'My Favourites'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchUserFavourites()
  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  async fetchUserFavourites(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const user_id = this.userData.id
    return 'favourites/products' + `/${ user_id }`
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserSettings"

</style>