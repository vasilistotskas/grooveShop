<template>
  <div v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0" class="container">
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
      :route="PaginationRoutesEnum.FAVOURITES"
      :total-pages="allPaginatedResultsTotalPages"
      :namespace="paginationNamespace"
    />
  </div>
  <div v-else class="user_profile-no-data">
    <h1>NO FAVOURITES</h1>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { getModule } from 'vuex-module-decorators'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import PaginationModule from '@/state/pagination/PaginationModule'
import PaginationBase from '@/components/Pagination/PaginationBase'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'UserFavourites',
  extends: PaginationBase,
  props: {
    userData: {
      type: Object as PropType<UserProfileModel>,
      required: true,
    },
  },
  components: {
    ProductCard,
    Pagination,
  },
})
export default class UserFavourites
  extends PaginationBase<UserProfileModel>
  implements PaginatedInterface<UserProfileModel>
{
  paginationModule = getModule(PaginationModule)
  userData = new UserProfileModel()
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceTypesEnum.USER_FAVOURITES

  async created(): Promise<void> {
    document.title = 'My Favourites'

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

  async unmounted(): Promise<void> {
    await this.paginationModule.unsetResults(this.paginationNamespace)
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
    return 'favourites/products' + `/${userId}`
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserSettings';
</style>
