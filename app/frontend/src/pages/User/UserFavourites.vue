<template>
  <div v-if="userFavouriteResults && Object.keys(userFavouriteResults).length > 0" class="container">
    <div class="product-listing-grid mb-4">
      <ProductCard
          v-for="product in userFavouriteResults"
          :key="product.id"
          :product="product.product_object"
          class="grid-item"
      />
    </div>
    <Pagination
        v-if="Object.keys(userFavouriteResults).length !== 0"
        :endpoint-url="buildEndPointUrlForPaginatedResults()"
        :max-visible-buttons="3"
        :route="'UserFavourites.vue'"
        :total-pages="userFavouriteResultsTotalPages"
        @pagechanged="onPageChange"
    />
  </div>
  <div class="user_profile-no-data" v-else>
    <h1>NO FAVOURITES</h1>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '../../state/product/ProductModel'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'

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

export default class UserFavourites extends Vue {

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)
  userData = new UserDetailsModel()

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

  get userFavouriteResults(): ProductModel {
    return store.getters['pagination/getResultData']
  }

  get userFavouriteResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get userFavouriteResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get userFavouriteResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get userFavouriteResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
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

  public fetchUserFavourites(): void {
    store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const user_id = this.userData.id
    return 'favourites/products' + `/${ user_id }`
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserSettings"

</style>