<template>
  <div>
    <div
      v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
      class="container"
    >
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
import { PropType } from 'vue'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/state/user/data/UserModule'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import PaginationModule from '@/state/pagination/PaginationModule'
import PaginatedComponent from '@/components/Pagination/PaginatedComponent'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import ReviewProductCard from '@/components/Reviews/ReviewProductCard.vue'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/state/pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'UserReviews',
  extends: PaginatedComponent,
  components: {
    ReviewProductCard,
    Pagination,
  },
  props: {
    userData: {
      type: Object as PropType<UserProfileModel>,
      required: true,
    },
  },
})
export default class UserReviews
  extends PaginatedComponent<ProductReviewModel>
  implements PaginatedComponentInterface<ProductReviewModel>
{
  userModule = getModule(UserModule)
  paginationModule = getModule<PaginationModule<ProductReviewModel>>(PaginationModule)
  userData = new UserProfileModel()
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceTypesEnum.USER_REVIEWS

  get userId(): number | undefined {
    return this.userModule.getUserId
  }

  async created(): Promise<void> {
    document.title = 'My Reviews'

    if (this.params.query) {
      await this.paginationModule.setCurrentQuery({
        queryParams: this.params.query,
        namespace: this.paginationNamespace,
      })
    }
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: 1,
      namespace: this.paginationNamespace,
    })

    if (this.params.page) {
      await this.paginationModule.setCurrentPageNumber({
        pageNumber: Number(this.params.page),
        namespace: this.paginationNamespace,
      })
    }

    await this.fetchPaginationData()
  }

  async fetchPaginationData(): Promise<void> {
    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: this.buildEndPointUrlForPaginatedResults(),
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.paginationNamespace,
    })
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
