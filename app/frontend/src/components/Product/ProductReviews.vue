<template>
  <div class="card text-start col-sm-12 mt-2 mb-2" v-bind:class="{'current-user-review-card': this.review.user_id == userId }">
    <div class="card-body card-body-review">
      <p class="card-text"> USER NAME : {{ review.userprofile.first_name }}</p>
      <p class="card-text"> COMMENT : {{ review.comment }}</p>
      <p class="card-text"> RATE: {{ review.rate }}</p>
      <p class="card-text"> CREATED : {{ review.created_at }}</p>

      <button v-if="this.review.user_id == userId" class="btn-outline-primary-one">Update</button>
      <button v-if="this.review.user_id == userId" class="btn-outline-primary-two" @click="deleteReview(this.review.user_id, this.review.product_id)">Delete</button>

    </div>
  </div>
</template>

<script lang="ts">

import store from "@/store";
import {Options, Vue} from "vue-class-component"

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

  protected async deleteReview(user_id: Number, product_id: Number): Promise<void> {
    let data = {
      user_id,
      product_id
    }
    await store.dispatch('product/review/deleteCurrentProductReview', data)
  }
}
</script>

<style lang="scss" scoped>
  .card-body-review {
    background-color: $primary-color-4!important;
    border-radius: 10px;
    span, a, p {
      color: $primary-color-2!important;
    }
  }
</style>
