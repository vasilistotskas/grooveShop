<template>
<div class="page-category mt-7 mb-5">
  <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
  <div class="container">
    <div class="row content-min-height">
      <div class="col-12">
        <img v-if="category.menu_main_banner" :src="category.menu_main_banner" :alt="category.name" class="img-fluid">
      </div>
      <div class="product-listing-grid mt-3 mb-3">
        <ProductCard
        class="col-sm-3"
        v-for="product in category.all_tree_products"
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
import CategoryModel from "@/state/category/CategoryModel"
import ProductCard from "@/components/Product/ProductCard.vue"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "CategoryVue",
  components: {
    ProductCard,
    Breadcrumbs
  },
  props: {
    category_slug: String
  }
})

export default class CategoryVue extends Vue {
  formEl = document.getElementById('burgerButton') as HTMLFormElement

  created() {
    this.$watch(
        () => this.$route,
        (to:any, from:any) => {
          if (to.name === 'Category') {
            this.fetchCategory()
          }
          if (to.path !== from.path && to.name === 'Category') {
            this.formEl.classList.toggle('opened');
            this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
            store.commit('app/setNavbarMenuHidden', true)
          }
        }
    )
  }

  async mounted(): Promise<void> {
    document.title = this.$route.params.category_slug + ' Category'

    await this.fetchCategory()
    this.formEl.classList.remove('opened');
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
    store.commit('app/setNavbarMenuHidden', true)
  }

  unmounted() {
    this.formEl.classList.remove('opened');
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  public fetchCategory(): void {
    const categoryId = this.$route.params.category_slug
    store.dispatch('category/fetchCategoryFromRemote', categoryId)
  }

}
</script>
