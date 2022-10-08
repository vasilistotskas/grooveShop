<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">Search term: "{{ currentPageQuery }}"</h2>
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="'Search-Product'"
          :max-visible-buttons="3"
          :route="PaginationRoutesEnum.SEARCH"
          :total-pages="allPaginatedResultsTotalPages"
          :namespace="paginationNamespace"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
            v-for="product in allPaginatedResults"
            :key="product.id"
            :product="product"
            class="grid-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/Routes'
import { AxiosResponse } from 'axios'
import { getModule } from 'vuex-module-decorators'
import ProductModel from '@/State/Product/ProductModel'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import ProductCard from '@/Components/Product/ProductCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import PaginationModule from '@/State/Pagination/PaginationModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'Search',
  extends: PaginatedComponent,
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs,
  },
})
export default class Search
  extends PaginatedComponent<ProductModel>
  implements PaginatedComponentInterface<ProductModel>
{
  paginationModule = getModule<PaginationModule<ProductModel>>(PaginationModule)
  query: string | null = ''
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceTypesEnum.SEARCH_PRODUCTS

  get breadCrumbPath() {
    return router.currentRoute.value.meta.breadcrumb
  }

  mounted(): void {
    document.title = 'Search'

    if (this.params.query) {
      this.paginationModule.setCurrentQuery({
        queryParams: this.params,
        namespace: this.paginationNamespace,
      })
    }

    this.paginationModule.setCurrentPageNumber({
      pageNumber: 1,
      namespace: this.paginationNamespace,
    })

    if (this.params.page) {
      this.paginationModule.setCurrentPageNumber({
        pageNumber: Number(this.params.page),
        namespace: this.paginationNamespace,
      })
    }

    this.fetchPaginationData<ProductModel>()
  }

  fetchPaginationData<T>(): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: `search-product`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    return this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.paginationNamespace,
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Search/Search';
</style>
