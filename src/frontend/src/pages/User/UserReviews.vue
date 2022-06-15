<template>
  <div>
    <div v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0" class="container">
      <div class="user-reviews-grid mb-4">
        <ReviewProductCard
          v-for="review in allPaginatedResults"
          :key="review.id"
          :class="{ 'current-user-review-card': review.user_id === userId }"
          :review="review"
          :user-id="userId"
          class="product-review-main-card"
        />
      </div>
      <Pagination
        v-if="Object.keys(allPaginatedResults).length !== 0"
        :endpoint-url="buildEndPointUrlForPaginatedResults()"
        :max-visible-buttons="3"
        :route="PaginationRoutesEnum.REVIEWS"
        :total-pages="allPaginatedResultsTotalPages"
        :namespace="paginationNamespace"
      />
    </div>
    <div v-else class="user_profile-no-data">
      <h1>NO REVIEWS</h1>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import PaginationBase from '@/components/Pagination/PaginationBase'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import ReviewProductCard from '@/components/Reviews/ReviewProductCard.vue'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Component({
  name: 'UserReviews',
  extends: PaginationBase,
  components: {
    ReviewProductCard,
    Pagination,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
})
export default class UserReviews extends PaginationBase<ProductReviewModel> implements PaginatedInterface<ProductReviewModel> {
  userData = new UserProfileModel()
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceDataEnum.USER_REVIEWS

  get userId(): number {
    return store.getters['user/getUserId']
  }

  async created(): Promise<void> {
    document.title = 'My Reviews'

    if (this.params.query) {
      await store.commit('pagination/setCurrentQuery', { currentQuery: this.params.query, namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.page) {
      await store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.page), namespace: this.paginationNamespace })
    }

    await this.fetchPaginationData()
  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults', this.paginationNamespace)
  }

  async fetchPaginationData(): Promise<void> {
    const paginationQuery = PaginationQueryParametersModel.createPaginationQuery({
      pageNumber: this.currentPageNumber,
      endpointUrl: this.buildEndPointUrlForPaginatedResults(),
      method: ApiBaseMethods.GET,
    })

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const userId = this.userData.id
    return `reviews/user/${userId}`
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/User/UserReviews';
</style>
