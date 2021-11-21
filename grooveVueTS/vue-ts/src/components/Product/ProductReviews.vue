<template>
  <div class="card text-start col-sm-12 mt-2 mb-2">
    <div class="card-body">
      <p class="card-text"> USER NAME : {{ review.userprofile.first_name }}</p>
      <p class="card-text"> COMMENT : {{ review.comment }}</p>
      <p class="card-text"> RATE: {{ review.rate }}</p>
      <p class="card-text"> CREATED : {{ review.created_at }}</p>

    </div>
  </div>
</template>

<script lang="ts">

import {Options, Vue} from "vue-class-component"
import store from "@/store";

@Options({
  name: "ProductReviews",
  props: {
    review: {
      type: Object
    }
  }
})

export default class ProductReviews extends Vue {

  get userId(): number {
    return store.getters['user/data/getUserId']
  }

}
</script>

<style lang="scss">

</style>
