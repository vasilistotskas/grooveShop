<template>
<div class="container">
  <div class="page-category mt-3 mb-5">
    <div class="row">
      <div class="col-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>
      <div class="col-12">
        <div class="row">
          <ProductCard
          class="col-sm-3"
          v-for="product in category.products"
          v-bind:key="product.id"
          v-bind:product="product"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">

import {Options} from "vue-class-component";
import AppBasePage from "@/pages/AppBasePage.vue";
import ProductCard from "@/components/Product/ProductCard.vue";
import CategoryModel from "@/state/category/CategoryModel";
import store from '@/store'

@Options({
  name: "CategoryVue",
  components: {
    ProductCard
  },
  props: {
    category_slug: String
  }
})

export default class CategoryVue extends AppBasePage {

  created() {
    this.$watch(
        () => this.$route,
        (to:any, from:any) => {
          if (to.name === 'Category') {
            this.fetchCategory()
          }
        }
    )
  }

  async mounted(): Promise<void> {
    await this.fetchCategory()
    // this.$nextTick(function () {
    //   console.log('ssss')
    // })
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  public fetchCategory(): void {
    const categorySlug = this.$route.params.category_slug
    store.dispatch('category/fetchCategory', categorySlug)
  }

}
</script>
