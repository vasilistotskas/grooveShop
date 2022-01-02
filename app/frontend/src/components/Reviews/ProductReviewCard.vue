<template>
  <div v-if="review && Object.keys(review).length > 0">
    <div class="user-review-product-image" v-bind:style="{ backgroundImage: 'url(' + review.product.main_image + ')' }"></div>
    <div class="user-review-product-head">
      <div class="user-review-product-name">
        <router-link :to="'/product' + review.product.absolute_url" aria-label="Product">
          <span> {{ review.product.name }}</span>
        </router-link>
      </div>
      <div class="user-review-product-stars">
        <svg v-for="(star, i) of backgroundStars(review.rate)"
             aria-hidden="true"
             focusable="false"
             data-prefix="fas"
             data-icon="star"
             role="img"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 576 512"
             :key="i"
             class="star star-background"
             v-html="star"></svg>
      </div>
      <div class="user-review-product-date">
        <span>At : {{ review.updated_at }} </span>
        <span>
            <font-awesome-icon :icon="checkCircleIcon" size="sm" :style="{ color: '#5cb85c' }"></font-awesome-icon>
            Verified Review
          </span>
      </div>
    </div>
    <div class="user-review-product-body">
      <div class="user-review-product-comment">
        <span> {{ review.comment }} </span>
      </div>
    </div>
    <div class="user-review-product-actions">
      <a href="#" class="user-review-product-settings"></a>
    </div>

    <div>
      <button v-if="this.review.user_id == userId" class="btn-outline-primary-one">Update</button>
      <button v-if="this.review.user_id == userId" class="btn-outline-primary-two" @click="deleteReview(this.review.user_id, this.review.product_id)">Delete</button>
    </div>


  </div>
</template>

<script lang="ts">
import store from "@/store"
import { constant, times } from "lodash"
import { Options, Vue } from "vue-class-component"
import ProductReviewModel from "@/state/product/review/ProductReviewModel"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: "ProductReviewCard",
  props: {
    review: {
      type: Object,
      required: true,
    },
    userId: {
      type: Number,
      required: false,
    }
  }
})

export default class ProductReviewCard extends Vue{

  review = new ProductReviewModel()
  userId: Number = 0

  get checkCircleIcon(): typeof faCheckCircle {
    return faCheckCircle
  }

  public isOddNumber(num: any) {
    return num % 2;
  }

  protected async deleteReview(user_id: Number, product_id: Number): Promise<void> {
    let data = {
      user_id,
      product_id
    }

    await store.dispatch('product/review/deleteCurrentProductReview', data)
  }

  public backgroundStars(productRate: any): string[] {
    const stars: string[] = times(productRate/2, constant(starSvg)) as string[]

    if (this.isOddNumber(productRate)) {
      stars.push(starHalfSvg)
    }

    return stars
  }
}
</script>

<style lang="scss">
.user-review-product-settings {
  &:before {
    content: "\2807";
    -webkit-transition: color .1s ease-in-out;
    transition: color .1s ease-in-out;
    margin-right: 0;
    height: 34px;
    line-height: 34px;
    color: #bbb;
    font-size: 20px;
    display: inline-block;
    width: 1em;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-variant: normal;
    font-style: normal;
    speak: none
  }
}
.user-review-product {
  &-actions {
    position: absolute;
    right: 0;
    top: 0;
  }
  &-image {
    width: 100px;
    height: 100px;
    border: 1px solid rgba(246, 139, 36, 0.4);
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    padding: 0;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }
  &-body {
    grid-column: 3/1;
  }
  &-stars {
    margin-top: 5px;
    .star {
      width: 18px;
      height: 18px;
      &-background {
        color: $rating-starts;
      }
    }
  }
  &-date {
    display: grid;
    grid-template-columns: 37% auto;
    margin-top: 20px;
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
    span {
      font-size: 13px;
      color: $primary-color-3;
    }
  }
}

</style>