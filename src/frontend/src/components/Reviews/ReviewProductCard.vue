<template>
  <div v-if="review && Object.keys(review).length > 0">
    <div
      :style="{ backgroundImage: reviewBackgroundImage(review) }"
      class="user-review-product-image"
    />
    <div class="user-review-product-head">
      <div class="user-review-product-name">
        <RouterLink
          :title="review.product.name"
          :to="'/product' + review.product.absolute_url"
          aria-label="Product"
        >
          <span> {{ review.product.name }}</span>
        </RouterLink>
      </div>
      <div class="user-review-product-content">
        <div class="user-review-product-stars">
          <svg
            v-for="(star, i) of backgroundStars(review.rate)"
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
          <font-awesome-icon :icon="checkCircleIcon" :style="{ color: '#53e24aeb' }" size="sm" />
          Verified Review
        </span>
      </div>
    </div>
    <div class="user-review-product-body">
      <div class="user-review-product-comment">
        <span> {{ review.comment }} </span>
      </div>
    </div>
    <div v-if="review.user_id === userId" class="user-review-product-actions">
      <a
        :title="`Review Settings of ${review.product.name}`"
        class="user-review-product-settings"
        @click="openReviewActions"
      />
      <div v-if="reviewActionsOpen" ref="userReviewsActionTarget" class="user-review-actions-menu">
        <div class="user-review-actions-controls">
          <div class="user-review-actions-edit">
            <RouterLink
              :title="review.product.name"
              :to="'/product' + review.product.absolute_url"
              aria-label="Product"
            >
              <span>Update</span>
            </RouterLink>
          </div>
          <div class="user-review-actions-delete">
            <a
              :title="`Delete Review of ${review.product.name}`"
              data-method="delete"
              rel="nofollow"
              @click="deleteReview(review.user_id, review.product_id)"
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import { PropType } from 'vue'
import { constant, times } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { getModule } from 'vuex-module-decorators'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import { Options as Component, Vue } from 'vue-class-component'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

const starSvg =
  '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg =
  '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
  name: 'ReviewProductCard',
  props: {
    review: {
      type: Object as PropType<ProductReviewModel>,
      required: false,
    },
    userId: {
      type: Number,
      required: false,
    },
  },
})
export default class ReviewProductCard extends Vue {
  productReviewModule = getModule(ProductReviewModule)
  MainRouteNames = MainRouteNames
  $refs!: {
    userReviewsActionTarget: HTMLElement
  }
  review = new ProductReviewModel()
  userId = 0
  reviewActionsOpen = false

  checkCircleIcon = faCheckCircle

  updated(): void {
    onClickOutside(this.$refs.userReviewsActionTarget, () => {
      this.reviewActionsOpen = false
    })
  }

  public isOddNumber(num: number) {
    return num % 2
  }

  public openReviewActions() {
    this.reviewActionsOpen = true
  }

  public reviewBackgroundImage(review: ProductReviewModel): string {
    const imageNameFileTypeRemove =
      review.product.main_image_filename.substring(
        0,
        review.product.main_image_filename.lastIndexOf('.')
      ) || review.product.main_image_filename

    if (router.currentRoute.value.name === MainRouteNames.PRODUCT) {
      return 'url(' + review.userprofile.main_image_absolute_url + ')'
    }

    if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT_REVIEWS) {
      return (
        'url(' +
        'http://localhost:8010' +
        '/mediastream/media/uploads/' +
        'products' +
        '/' +
        imageNameFileTypeRemove +
        '/' +
        '100' +
        '/' +
        '100' +
        ')'
      )
    }

    return ''
  }

  public backgroundStars(productRate: number): string[] {
    const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

    if (this.isOddNumber(productRate)) {
      stars.push(starHalfSvg)
    }

    return stars
  }

  public async deleteReview(userId: number, productId: number): Promise<void> {
    const data = {
      userId,
      productId,
    }

    if (confirm('Are you sure you want to delete your rating?')) {
      await this.productReviewModule.deleteCurrentProductReview(data)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/components/Reviews/ReviewProductCard';
</style>
