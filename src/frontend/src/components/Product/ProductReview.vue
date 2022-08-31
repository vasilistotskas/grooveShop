<template>
  <!-- Button trigger modal -->
  <div class="user-actions">
    <!-- Modal -->
    <form id="productReviewForm">
      <div id="exampleModal" aria-hidden="true" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header mb-3">
              <h5 id="exampleModalLabel" class="modal-title">
                Write a review for product <strong>Adidas Shoes</strong>
              </h5>
              <font-awesome-icon :icon="writeReviewIcon" size="lg" />
            </div>
            <div class="modal-body">
              <!-- Product Rating -->
              <p>1. Rate</p>
              <div id="full-stars-example-two" class="col-12">
                <div class="rating">
                  <input :name="name" :value="rate" type="hidden" />
                  <div
                    ref="ratingBoard"
                    class="rating-board rating-background"
                    @click="lockSelection($event)"
                    @mouseenter="unlockSelection($event)"
                    @mouseleave="reLockSelection($event)"
                    @mousemove="updateNewSelectionRatio($event)"
                    @touchend="reLockSelection($event)"
                    @touchmove="updateNewSelectionRatio($event)"
                    @touchstart="unlockSelection($event)"
                  >
                    <svg
                      v-for="(star, i) of backgroundStars"
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
                  <div class="rating-board rating-foreground">
                    <svg
                      v-for="(star, i) of foregroundStars"
                      :key="i"
                      aria-hidden="true"
                      class="star star-foreground"
                      focusable="false"
                      role="img"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                      v-html="star"
                    />
                  </div>
                  <span class="px-2">{{ reviewScoreText }}</span>
                </div>
              </div>
              <p class="mt-3">2. Comment</p>
              <div class="col-12 review-modal-comment">
                <div class="form-group">
                  <p>
                    <textarea
                      id="reviewTextArea"
                      v-model="comment"
                      class="form-control"
                      maxlength="10000"
                      placeholder="Share your experience..."
                      rows="6"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer mt-3">
              <button class="btn-outline-primary-one" type="button" @click="reviewHandle()">
                {{ reviewButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { RouteLocationNormalized } from 'vue-router'
import AuthModule from '@/state/auth/auth/AuthModule'
import UserModule from '@/state/user/data/UserModule'
import ProductModule from '@/state/product/ProductModule'
import { Options as Component, Vue } from 'vue-class-component'
import { first, last, filter, times, constant, cloneDeep } from 'lodash'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare'

const starSvg =
  '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg =
  '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
  name: 'ProductReview',
})
export default class ProductReview extends Vue {
  productReviewModule = getModule(ProductReviewModule)
  authModule = getModule(AuthModule)
  productModule = getModule(ProductModule)
  userModule = getModule(UserModule)
  $refs!: {
    ratingBoard: HTMLElement
  }

  name = ''
  editingLocked = false
  size = 16
  review = ''
  comment = ''
  rate = 0
  reviewCountMax = 10
  starCountMax = 5
  isEditable = false
  newSelectionRatio = 0
  selectedRatio = 0

  writeReviewIcon = faPenSquare

  get reviewButtonText(): string {
    return this.userHasAlreadyReviewedProduct ? 'Update' : 'Post'
  }

  get reviewCount(): number | null {
    if (null !== this.review && !isNaN(this.review as unknown as number)) {
      return Number(this.review)
    }

    return null
  }

  get liveReviewCountRatio(): number {
    let reviewCount = 0
    if (null !== this.newSelectionRatio) {
      reviewCount = this.newSelectionRatio * this.reviewCountMax
    } else if (null !== this.reviewCount) {
      reviewCount = this.reviewCount - 0.01
    }
    if (reviewCount > this.reviewCountMax) reviewCount = this.reviewCountMax
    if (reviewCount < 0) reviewCount = 0
    const liveReviewCountRatio = reviewCount / this.reviewCountMax
    return Number(liveReviewCountRatio.toFixed(1)) - 0.04
  }

  get liveReviewCount(): number | undefined {
    return Math.round(Number(this.liveReviewCountRatio.toFixed(2)) * this.reviewCountMax)
  }

  get reviewScoreText(): string | undefined {
    const breakpoints = [
      {
        threshold: 0.2,
        value: 'Bad',
      },
      {
        threshold: 0.3,
        value: 'Not that good',
      },
      {
        threshold: 0.5,
        value: 'Mehh',
      },
      {
        threshold: 0.6,
        value: "It's ok",
      },
      {
        threshold: 0.7,
        value: 'Good',
      },
      {
        threshold: 0.9,
        value: 'Very godd',
      },
      {
        threshold: 1.0,
        value: 'Perfect!',
      },
    ]

    if (
      this.liveReviewCountRatio < 0.01 ||
      (null === this.newSelectionRatio && (null === this.reviewCount || '0' === this.review))
    ) {
      return ''
    }

    const matches = filter(
      breakpoints,
      (breakpoint) => breakpoint.threshold - 0.1 <= this.liveReviewCountRatio
    )

    if (undefined !== last(matches)) {
      return last(matches)?.value
    }
    return first(breakpoints)?.value
  }

  get foregroundStars(): string[] {
    const reviewStarRatio = this.rate * 0.099 * this.starCountMax
    if (reviewStarRatio < 0.1) {
      return []
    }
    const stars: string[] = times(Math.round(reviewStarRatio), constant(starSvg))
    if (reviewStarRatio % 1 < 0.5) {
      stars.push(starHalfSvg)
    }
    return stars
  }

  get backgroundStars(): string[] {
    return times(this.starCountMax, constant(starSvg)) as string[]
  }

  get userHasAlreadyReviewedProduct(): boolean {
    return this.productReviewModule.getUserHasAlreadyReviewedProduct
  }

  get userToProductReview(): ProductReviewModel {
    return this.productReviewModule.getUserToProductReview
  }

  created() {
    this.$watch(
      () => this.liveReviewCount,
      (to: RouteLocationNormalized) => {
        this.rate = to as unknown as number
      }
    )
    this.$watch(
      () => this.userToProductReview,
      (to: RouteLocationNormalized) => {
        if (Object.keys(to).length <= 0) {
          this.clearModule()
        }
      }
    )
    this.$watch(
      () => this.$route,
      () => {
        this.productReviewModule.unsetUserToProductReview()
        this.productReviewModule.unsetProductReviews()
      }
    )
  }

  async mounted(): Promise<void> {
    await this.reviewModuleInitialize()
  }

  public lockSelection(event: MouseEvent) {
    this.updateIsEditable(true)
    this.updateNewSelectionRatio(event)
    this.selectedRatio = this.newSelectionRatio
    this.updateIsEditable(false)
  }

  public reLockSelection() {
    this.updateIsEditable(false)
    this.newSelectionRatio = this.selectedRatio
  }

  public unlockSelection() {
    this.updateIsEditable(true)
  }

  public updateIsEditable(newState: boolean): void {
    if (!this.editingLocked) {
      this.isEditable = newState
    }
  }

  public updateNewSelectionRatio(event: MouseEvent) {
    if (!this.isEditable) {
      return
    }
    const target = this.$refs.ratingBoard
    const leftBound = event.clientX - target.getBoundingClientRect().left
    const rightBound = target.getBoundingClientRect().right - target.getBoundingClientRect().left
    this.newSelectionRatio = leftBound / rightBound
  }

  public async reviewHandle(): Promise<void> {
    const formEl = document.getElementById('productReviewForm') as HTMLFormElement
    const data = new FormData(formEl)

    if (this.comment !== null) {
      data.append('comment', this.comment)
    }

    if (this.rate > 0 && this.rate <= 10) {
      data.append('rate', this.rate as unknown as string)
    }

    await this.productReviewModule.toggleReview(data)
  }

  public async reviewModuleInitialize(): Promise<void> {
    await this.productModule.fetchProductFromRemote()
    const IsAuthenticated: boolean = this.authModule.isAuthenticated

    if (IsAuthenticated) {
      await this.productReviewModule.fetchUserToProductReviewFromRemote({
        productId: this.productModule.getProductId,
        userId: this.userModule.getUserId,
      })

      this.comment = cloneDeep(this.userToProductReview.comment)
      this.rate = cloneDeep(this.userToProductReview.rate)
    }
  }

  public clearModule(): void {
    this.rate = 0
    this.comment = ''
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Product/ProductReview';
</style>
