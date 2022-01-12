<template>
<div class="page-category mt-7 mb-5">
  <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
  <div class="container">
    <div class="content-min-height">
      <div class="col-12">
        <img v-if="category.category_menu_main_banner_absolute_url" :src="mediaStreamImage('categories', category.category_menu_main_banner_filename, '1920', '370')" :alt="category.name" class="img-fluid" width="1920" height="370">
      </div>

      <Pagination
          v-if="Object.keys(categoryResults).length !== 0"
          :total-pages="categoryResultsTotalPages"
          :max-visible-buttons="3"
          :route="'Category'"
          :endpointUrl="buildEndPointUrlForPaginatedResults()"
          @pagechanged="onPageChange"
      />

      <div class="product-listing-grid mt-3 mb-3">
        <ProductCard
        class="col-sm-3"
        v-for="product in categoryResults"
        v-bind:key="product.id"
        v-bind:product="product"/>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">

import store from '@/store'
import router from "@/routes"
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import CategoryModel from "@/state/category/CategoryModel"
import ProductCard from "@/components/Product/ProductCard.vue"
import Pagination from "@/components/Pagination/Pagination.vue"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "CategoryVue",
  components: {
    ProductCard,
    Breadcrumbs,
    Pagination
  },
  props: {
    category_slug: String
  }
})

export default class CategoryVue extends Vue {

  formEl = document.getElementById('burgerButton') as HTMLFormElement
  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)

  async created(): Promise<void> {

    document.title = this.$route.params.category_slug + ' Category'

    this.$watch(
        () => this.$route,
        (to:any, from:any) => {
          if (to.name === 'Category') {
            this.fetchCategory()
            this.fetchCategoryProducts()
          }
          if (to.path !== from.path && to.name === 'Category') {
            store.commit('pagination/unsetResults')
            this.formEl.classList.toggle('opened');
            this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
            store.commit('app/setNavbarMenuHidden', true)
          }
        }
    )

    this.formEl.classList.remove('opened');
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

  unmounted() {
    store.commit('pagination/unsetResults')
    this.formEl.classList.remove('opened')
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
  }

  public fetchCategory(): void {
    const categoryId = this.$route.params.category_slug
    store.dispatch('category/fetchCategoryFromRemote', categoryId)
  }

  public fetchCategoryProducts(): void {
    store.dispatch('pagination/getPaginatedResults', {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const categoryId = this.$route.params.category_slug
    return 'category_products' + `/${categoryId}`
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/'  + imageNameFileTypeRemove + '/' + width + '/' + height
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

  get categoryResults(): ProductModel {
    return store.getters['pagination/getResultData']
  }

  get categoryResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get categoryResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get categoryResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get categoryResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  onPageChange(page: any) {
    this.currentPage = page
  }

}
</script>
