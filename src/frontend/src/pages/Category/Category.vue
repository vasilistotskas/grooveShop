<template>
  <div class="page-category mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12">
          <img
            v-if="category.category_menu_main_banner_absolute_url"
            :alt="category.name"
            :src="mediaStreamImage(ImageTypeOptions.CATEGORIES, category.category_menu_main_banner_filename, '1920', '370', ImageFitOptions.cover, ImagePositionOptions.entropy)"
            class="img-fluid"
            height="370"
            width="1920"
            loading="lazy"
          >
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="buildEndPointUrlForPaginatedResults()"
          :max-visible-buttons="3"
          :route="'Category'"
          :total-pages="allPaginatedResultsTotalPages"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
            v-for="product in allPaginatedResults"
            :key="product.id"
            :product="product"
            class="col-sm-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import CategoryModel from '@/state/category/CategoryModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { PaginationCount } from '@/state/pagination/Type/PaginationTypes'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'CategoryVue',
  components: {
    ProductCard,
    Breadcrumbs,
    Pagination
  },
  props: {
    category_slug: String
  }
})

export default class CategoryVue extends Vue implements PaginatedInterface<CategoryModel> {

  formEl = document.getElementById('burgerButton') as HTMLFormElement
  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)
  ImageTypeOptions: any = ImageTypeOptions
  ImageFitOptions: any = ImageFitOptions
  ImagePositionOptions: any = ImagePositionOptions

  imageUrl: string = ''

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  get allPaginatedResults(): Array<CategoryModel> {
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

    document.title = this.$route.params.category_slug + ' Category'

    this.$watch(
        () => this.$route,
        (to: any, from: any) => {
          if (to.name === 'Category') {
            this.fetchCategory()
            this.fetchCategoryProducts()
          }
          if (to.path !== from.path && to.name === 'Category') {
            store.commit('pagination/unsetResults')
            this.formEl.classList.toggle('opened')
            this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
            store.commit('app/setNavbarMenuHidden', true)
          }
        }
    )

    this.formEl.classList.remove('opened')
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
    store.commit('app/setNavbarMenuHidden', true)

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchCategory()
    await this.fetchCategoryProducts()
  }

  unmounted(): void {
    store.commit('pagination/unsetResults')
    this.formEl.classList.remove('opened')
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
  }

  public fetchCategory(): void {
    const categoryId = this.$route.params.category_slug
    store.dispatch('category/fetchCategoryFromRemote', categoryId)
  }

  async fetchCategoryProducts(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
      .createPaginationQuery({
        'pageNumber': this.currentPageNumber,
        'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
        'method': ApiBaseMethods.GET
      } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const categoryId = this.$route.params.category_slug
    return 'category_products' + `/${ categoryId }`
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Category/Category"

</style>