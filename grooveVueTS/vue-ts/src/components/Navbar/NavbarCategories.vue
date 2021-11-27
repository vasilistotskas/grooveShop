<template>
    <li v-for="category in this.categoriesTree"
        class="nav-item" v-bind:class="{'dropdown': category?.children }"
        v-bind:key="category.id">
      <router-link
          v-bind:id="category.children ? `navbarDropdown${category.id}` : '' "
          v-bind:data-bs-toggle="category.children ? 'dropdown' : '' "
          v-bind:class="{'dropdown-toggle': category?.children }"
          role="button"
          class="nav-link active"
          aria-expanded="false"
          aria-current="page"
          :to="({ name: 'Category', params: { absolute_url: category.absolute_url, category_id: category.id } })">
        {{ category.name }}
      </router-link>
      <ul
          class="dropdown-menu"
          :aria-labelledby="`navbarDropdown${category.id}`">
        <li v-for="children in category.children">
          <router-link
              class="dropdown-item"
              :to="({ name: 'Category', params: { absolute_url: category.absolute_url, category_id: children.id } })">
            {{ children.name }}
          </router-link>
        </li>
        <li v-if="category.children">
          <hr class="dropdown-divider">
          <router-link
              class="dropdown-item"
              :to="({ name: 'Category', params: { absolute_url: category.absolute_url, category_id: category.id } })">
            Show All
          </router-link>
        </li>
      </ul>
    </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({
  name: "NavbarCategories",
  props: {
    categoriesTree: Array
  }
})
export default class NavbarCategories extends Vue {}
</script>
