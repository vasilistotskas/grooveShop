<template>
  <div class="control">
    <a @click="addToFavourites()"><i class="far fa-heart"></i></a>

  </div>
</template>


<script>

export default {
  name: 'FavouriteButton',
  data() {
    return {
      isFavourite: Boolean
    }
  },
  props: {
    productId: Number
  }
}
</script>