<template>
  <div>
    <div v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0" class="container">
      <div class="user-reviews-grid mb-4">
        <ReviewProductCard
            v-for="review in allPaginatedResults"
            :key="review.id"
            :class="{'current-user-review-card': review.user_id == userId }"
            :review="review"
            :user-id="userId"
            class="product-review-main-card"
        />
      </div>
      <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="buildEndPointUrlForPaginatedResults()"
          :max-visible-buttons="3"
          :route="'Reviews'"
          :total-pages="allPaginatedResultsTotalPages"
      />
    </div>
    <div class="user_profile-no-data" v-else>
      <h1>NO REVIEWS</h1>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import { PaginationCount } from '@/state/pagination/Type/PaginationTypes'
import ReviewProductCard from '@/components/Reviews/ReviewProductCard.vue'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'UserReviews',
  components: {
    ReviewProductCard,
    Pagination
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
})

export default class UserReviews extends Vue implements PaginatedInterface<ProductReviewModel> {

  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)
  userData = new UserDetailsModel()

  get userId(): number {
    return store.getters['user/data/getUserId']
  }

  get allPaginatedResults(): Array<ProductReviewModel> {
    return store.getters['pagination/getResultData']
  }

  get allPaginatedResultsCount(): PaginationCount {
    return store.getters['pagination/getResultCountData']
  }

  get allPaginatedResultsNextPageUrl(): URL {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get allPaginatedResultsPreviousPageUrl(): URL {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get allPaginatedResultsTotalPages(): PaginationCount {
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

    document.title = 'My Reviews'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchUserReviews()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  async fetchUserReviews(): Promise<void> {
    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/getPaginatedResults', paginationQuery)
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const user_id = this.userData.id
    return `reviews/user/${ user_id }`
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/pages/User/UserReviews"

</style>