<template>

  <tr>
    <td
        v-for="category in categories"
        v-bind:key="categories.id"
    >
      <router-link :to="category.get_absolute_url">{{ category.name }}</router-link>
    </td>

  </tr>
</template>

<script>

export default {
  name: 'NavbarCategories',
  computed: {},
  data() {
    return {
      categories: this.categories
    }
  },
  beforeCreate() {
    if (localStorage.getItem('categories')) {
      this.categories = JSON.parse(localStorage.getItem('categories'))
    } else {
      localStorage.setItem('categories', JSON.stringify(this.categories))
    }
  }
}
</script>