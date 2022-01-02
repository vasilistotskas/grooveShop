<template>
  <div>
    <div class="container" v-if="reviews && Object.keys(reviews).length > 0">
      <div class="user-reviews-grid">
        <ProductReviewCard
            v-for="review in reviews"
            v-bind:key="review.id"
            v-bind:review="review"
            v-bind:userId="userId"
            v-bind:class="{'current-user-review-card': review.user_id == userId }"
            class="product-review-main-card"/>
      </div>
    </div>
    <div v-else>
      <h1>NO REVIEWS</h1>
    </div>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import ProductReviewCard from '@/components/Reviews/ProductReviewCard.vue'

@Options({
  name: "Reviews",
  components: {
    ProductReviewCard
  },
  props: {
    userData: {
      type: Object,
      required: true,
    }
  }
})

export default class Reviews extends Vue{
  userData = new UserDetailsModel()

  async created(): Promise<void> {
    await store.dispatch('product/review/getCurrentUserReviews', this.userData.id)
  }

  mounted(): void {
    document.title = 'My Reviews | grooveShop'
  }

  get userId(): number {
    return store.getters['user/data/getUserId']
  }

  get reviews(): ProductReviewModel[] {
    return store.getters['product/review/getUserReviews']
  }

}
</script>

<style lang="scss">
 .user-reviews-grid {
   display: grid;
   gap: 15px;
   grid-template-rows: repeat(1, 1fr);
 }
</style>