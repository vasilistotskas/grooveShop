<template>
  <div class="collapse navbar-collapse" id="navbarNavCategories">
    <ul class="navbar-nav">
      <li class="nav-item"
          v-for="category in this.categories"
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
  import { Options } from "vue-class-component"
  import Category from "@/state/category/Category"

  @Options({
    name: "NavbarCategories",
    props: {
      categories: Array
    }
  })
  export default class NavbarCategories extends AppBaseLayout {

  }
</script>
