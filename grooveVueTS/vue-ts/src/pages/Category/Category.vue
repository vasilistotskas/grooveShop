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
          v-for="product in category.all_tree_products"
          v-bind:key="product.id"
          v-bind:product="product"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">

import store from '@/store'
import { Options, Vue } from "vue-class-component"
import CategoryModel from "@/state/category/CategoryModel"
import ProductCard from "@/components/Product/ProductCard.vue"

@Options({
  name: "CategoryVue",
  components: {
    ProductCard
  },
  props: {
    category_id: String
  }
})

export default class CategoryVue extends Vue {

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
    document.title = this.$route.params.absolute_url + ' Category'
    // this.$nextTick(function () {
    //   console.log('ssss')
    // })
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  public fetchCategory(): void {
    const categoryId = this.$route.params.category_id
    store.dispatch('category/fetchCategoryFromRemote', categoryId)
  }

}
</script>
