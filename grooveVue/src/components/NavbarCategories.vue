<template>
  <tr>
    <td v-for="category in categories"
        v-bind:key="categories.id">
      <router-link :to="{ name: 'Category', params: { category_slug: category.slug } }">{{ category.name }}</router-link>

    </td>
  </tr>

</template>

<script>

export default {
  name: 'NavbarCategories',
  props: {
    categories: Object
  }
}
</script>