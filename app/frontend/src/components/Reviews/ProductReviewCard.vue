<template>
  <div v-if="review.product && Object.keys(review.product).length > 0">
    <div :style="{ backgroundImage: reviewBackgroundImage(review) }" class="user-review-product-image"></div>
    <div class="user-review-product-head">
      <div class="user-review-product-name">
        <RouterLink :title="review.product.name" :to="'/product' + review.product.absolute_url" aria-label="Product">
          <span> {{ review.product.name }}</span>
        </RouterLink>
      </div>
      <div class="user-review-product-content">
        <div class="user-review-product-stars">
          <svg v-for="(star, i) of backgroundStars(review.rate)"
               :key="i"
               aria-hidden="true"
               class="star star-background"
               data-icon="star"
               data-prefix="fas"
               focusable="false"
               role="img"
               viewBox="0 0 576 512"
               xmlns="http://www.w3.org/2000/svg"
               v-html="star"
          />
        </div>
        <div class="user-review-product-count">
          <span>({{ review.rate }}/10)</span>
        </div>
      </div>
      <div class="user-review-product-date">
        <span>At : {{ review.updated_at }} </span>
        <span>
          <font-awesome-icon :icon="checkCircleIcon" :style="{ color: '#53e24aeb' }" size="sm"/>
          Verified Review
        </span>
      </div>
    </div>
    <div class="user-review-product-body">
      <div class="user-review-product-comment">
        <span> {{ review.comment }} </span>
      </div>
    </div>
    <div v-if="review.user_id == userId" class="user-review-product-actions">
      <a :title="`Review Settings of ${review.product.name}`" class="user-review-product-settings"
         @click="openReviewActions"></a>
      <div v-if="reviewActionsOpen" ref="userReviewsActionTarget" class="user-review-actions-menu">
        <div class="user-review-actions-controls">
          <div class="user-review-actions-edit">
            <RouterLink :title="review.product.name" :to="'/product' + review.product.absolute_url"
                        aria-label="Product">
              <span>Update</span>
            </RouterLink>
          </div>
          <div class="user-review-actions-delete">
            <a :title="`Delete Review of ${review.product.name}`" data-method="delete" rel="nofollow"
               @click="deleteReview(review.user_id, review.product_id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { constant, times } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { Options, Vue } from 'vue-class-component'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: 'ProductReviewCard',
  props: {
    review: {
      type: Object,
      required: true
    },
    userId: {
      type: Number,
      required: false
    },
    userReviewsActionTarget: HTMLElement
  }
})

export default class ProductReviewCard extends Vue {

  $refs!: {
    userReviewsActionTarget: HTMLElement;
  }
  review = new ProductReviewModel()
  userId: number = 0
  reviewActionsOpen = false

  checkCircleIcon: IconDefinition = faCheckCircle

  updated(): void {
    onClickOutside(this.$refs.userReviewsActionTarget, () => {
      this.reviewActionsOpen = false
    })
  }

  public isOddNumber(num: any) {
    return num % 2
  }

  public openReviewActions() {
    this.reviewActionsOpen = true
  }

  public reviewBackgroundImage(review: any): string {

    const imageNameFileTypeRemove = review.product.main_image_filename.substring(0, review.product.main_image_filename.lastIndexOf('.')) || review.product.main_image_filename

    if (router.currentRoute.value.name === 'Product') {
      return 'url(' + review.userprofile.main_image_absolute_url + ')'
    }

    if (router.currentRoute.value.name === 'Reviews') {
      return 'url(' + process.env.VUE_APP_API_URL + '/mediastream/media/uploads/' + 'products' + '/' + imageNameFileTypeRemove + '/' + '100' + '/' + '100' + ')'
    }

    return ''
  }

  public backgroundStars(productRate: any): string[] {
    const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

    if (this.isOddNumber(productRate)) {
      stars.push(starHalfSvg)
    }

    return stars
  }

  public async deleteReview(user_id: number, product_id: number): Promise<void> {
    let data = {
      user_id,
      product_id
    }

    if (confirm('Are you sure you want to delete your rating?')) {
      await store.dispatch('product/review/deleteCurrentProductReview', data)
    }

  }
}
</script>

<style lang="scss">
.user-review-product-content {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  justify-items: center;

  .user-review-product-count {
    span {
      font-size: 14px;
      color: var(--cp-palette-main-third);
    }
  }
}

.user-review-product-settings {
  color: transparent;
  font-size: 0;
  position: absolute;
  top: 8px;
  right: 4px;
  z-index: 10;
  width: 34px;
  height: 34px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &:before {
    content: "\2807";
    -webkit-transition: color .1s ease-in-out;
    transition: color .1s ease-in-out;
    margin-right: 0;
    height: 34px;
    line-height: 34px;
    color: var(--cp-palette-main-fifth);
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
      color: var(--cp-palette-main-fifth);
    }
  }
}

.user-review-actions {
  &-menu {
    position: absolute;
    top: 0;
    right: 0;
    -webkit-transform-origin: -webkit-calc(100% - 30px) 30px;
    -ms-transform-origin: calc(100% - 30px) 30px;
    transform-origin: calc(100% - 30px) 30px;
    z-index: 9;
    width: auto;
    max-width: 196px;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 4px rgb(112 112 112 / 33%);
    box-shadow: 0 2px 4px rgb(112 112 112 / 33%);
    background: var(--cp-palette-main-secondary);
    padding: 20px 60px 20px 36px;
    -webkit-animation: scaleFade .15s;
    animation: scaleFade .15s;
    text-align: left;
  }

  &-controls {
    display: block;
  }

  &-edit, &-delete {
    a {
      font-size: 14px;
      line-height: 18px;
      display: block;
      position: relative;
      padding: 8px 0 7px;
      color: var(--cp-palette-main-third);
      -webkit-tap-highlight-color: transparent;

      &:hover {
        color: var(--cp-palette-main-fifth);
        cursor: pointer;
      }
    }
  }
}
</style>