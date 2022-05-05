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
      :route="PaginationRoutesEnum.FAVOURITES"
      :total-pages="allPaginatedResultsTotalPages"
      :namespace="paginationNamespace"
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
import { Options } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import PaginationBase from '@/components/Pagination/PaginationBase'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'UserFavourites',
  extends: PaginationBase,
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

export default class UserFavourites extends PaginationBase<UserDetailsModel> implements PaginatedInterface<UserDetailsModel> {

  userData = new UserDetailsModel()
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceDataEnum.USER_FAVOURITES

  async created(): Promise<void> {
    document.title = 'My Favourites'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', { currentQuery: this.params.get('query'), namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.get('page')), namespace: this.paginationNamespace })
    }

    await this.fetchPaginationData()
  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults', this.paginationNamespace)
  }

  async fetchPaginationData(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
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