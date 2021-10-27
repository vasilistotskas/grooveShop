<template>
  <div class="collapse navbar-collapse" id="navbarNavCategories">
    <ul class="navbar-nav">
      <li class="nav-item"
          v-for="category in categoriesData"
          v-bind:key="category.id">
        <router-link
            class="nav-link active" aria-current="page"
            :to="({ name: 'Category', params: { category_slug: category.slug } })">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
  import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
  import { Options } from "vue-class-component";

  @Options({
    name: "NavbarCategories",
  })
  export default class NavbarCategories extends AppBaseLayout {

    get categoriesData(): Array<any> {
      return this.$store.getters['category/getCategories']
    }

    async beforeCreate(): Promise<void> {
      await this.$store.dispatch('category/categoriesFromRemote')
    }
  }
</script>
