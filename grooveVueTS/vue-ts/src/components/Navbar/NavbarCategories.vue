<template>
    <li class="nav-item"
        v-for="category in this.categoriesTree"
        v-bind:key="category.id">
      <router-link
          class="nav-link active" aria-current="page"
          :to="({ name: 'Category', params: { category_slug: category.slug } })">
        {{ category.name }}
      </router-link>
    </li>
</template>

<script lang="ts">
  import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
  import { Options } from "vue-class-component"

  @Options({
    name: "NavbarCategories",
    props: {
      categoriesTree: Array,
      categoriesUnorganized: Array
    }
  })
  export default class NavbarCategories extends AppBaseLayout {

  }
</script>
