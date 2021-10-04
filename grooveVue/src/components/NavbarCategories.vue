<template>
  <div class="collapse navbar-collapse" id="navbarNavCategories">
    <ul class="navbar-nav">
      <li class="nav-item"
          v-for="category in categories"
          v-bind:key="categories.id">
        <router-link
            class="nav-link active" aria-current="page"
            :to="{ name: 'Category', params: { category_slug: category.slug } }">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  name: 'NavbarCategories',
  props: {
    categories: Object
  }
}
</script>