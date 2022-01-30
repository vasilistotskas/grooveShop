<template>
  <div>
    <div v-if="userReviewResults && Object.keys(userReviewResults).length > 0" class="container">
      <div class="user-reviews-grid mb-4">
        <ReviewProductCard
            v-for="review in userReviewResults"
            :key="review.id"
            :class="{'current-user-review-card': review.user_id == userId }"
            :review="review"
            :user-id="userId"
            class="product-review-main-card"
        />
      </div>
      <Pagination
          v-if="Object.keys(userReviewResults).length !== 0"
          :endpoint-url="buildEndPointUrlForPaginatedResults()"
          :max-visible-buttons="3"
          :route="'UserReviews.vue'"
          :total-pages="userReviewResultsTotalPages"
          @pagechanged="onPageChange"
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
import ProductModel from '@/state/product/ProductModel'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import ReviewProductCard from '@/components/Reviews/ReviewProductCard.vue'

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

export default class UserReviews extends Vue {

  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)
  userData = new UserDetailsModel()

  get userId(): number {
    return store.getters['user/data/getUserId']
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

  get userReviewResults(): ProductModel {
    return store.getters['pagination/getResultData']
  }

  get userReviewResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get userReviewResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get userReviewResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get userReviewResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  async created(): Promise<void> {

    document.title = 'My Reviews '

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

  public fetchUserReviews(): void {
    store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const user_id = this.userData.id
    return `reviews/user/${ user_id }`
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/pages/User/UserReviews"

</style>