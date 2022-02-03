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
import { Options, Vue } from 'vue-class-component'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/store/user/data/UserDetailsModel'
import PaginationModule from '@/store/pagination/PaginationModule'

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

  paginationMD!: PaginationModule

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)
  userData = new UserDetailsModel()

  get currentPageNumber(): number {
    let storedPageNumber = this.paginationMD.getCurrentPageNumber

    if (storedPageNumber) {
      return this.paginationMD.getCurrentPageNumber
    }
    return 1
  }

  get currentPageQuery(): string {
    return this.paginationMD.getCurrentQuery
  }

  get userFavouriteResults(): any {
    return this.paginationMD.getResultData
  }

  get userFavouriteResultsCount(): number {
    return this.paginationMD.getResultCountData
  }

  get userFavouriteResultsNextPageUrl(): string {
    return this.paginationMD.getResultNextPageUrl
  }

  get userFavouriteResultsPreviousPageUrl(): string {
    return this.paginationMD.getResultPreviousPageUrl
  }

  get userFavouriteResultsTotalPages(): number {
    return this.paginationMD.getResultTotalPages
  }

  async created(): Promise<void> {
    document.title = 'My Favourites'

    if (this.params.get('query')) {
      await this.paginationMD.setCurrentQuery(this.params.get('query'))
    }

    await this.paginationMD.setCurrentPageNumber(1)

    if (this.params.get('page')) {
      await this.paginationMD.setCurrentPageNumber(Number(this.params.get('page')))
    }

    await this.fetchUserFavourites()
  }

  async unmounted(): Promise<void> {
    this.paginationMD.unsetResults()
  }

  public fetchUserFavourites(): void {
    this.paginationMD.getPaginatedResults({
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