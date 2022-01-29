<template>
  <div v-if="product && Object.keys(product).length > 0" class="product-card-main">
    <RouterLink :title="product.name" :to="productPath" aria-label="Product">
      <div class="card cardEffect">
        <div class="card-image-content">
          <img v-if="product.main_image_filename" :alt="product.name"
               :src="mediaStreamImage('products', product.main_image_filename, '150', '150')"
               class="card-img-top img-fluid"
               height="150" width="150"
               loading="lazy"
          />
        </div>
        <div class="card-body">
          <div class="card-title">
            <span v-if="product.name">{{ contentShorten(product.name) }}</span>
          </div>
          <div class="card-review-content">
            <div class="card-review-content-stars">
              <svg v-for="(star, i) of backgroundStars(product.review_average)"
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
            <div class="card-review-content-count">
              <span>({{ product.review_counter }})</span>
            </div>
          </div>
          <div class="card-text">
            <span class="card-text-price-from">
              from <span class="card-text-price-num">${{ product.price }}</span>
            </span>
          </div>
          <div class="card-footer">
            <a :class="{'disabled': disabled }" :title="`Add to cart - ${product.name}`" class="btn-outline-primary-one btn-product-card"
               href="#"
               type="button" @click.prevent="addToCart()"
            >{{ addToCartButtonText }}</a>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import { constant, times } from 'lodash'
import { helpers } from '@/helpers/main'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: 'ProductCard',
  props: {
    product: Object
  }
})

export default class ProductCard extends Vue {

  quantity = 1
  product = new ProductModel()

  get disabled(): boolean {
    return this.product.active === 'False' || this.product.stock <= 0
  }

  get productPath(): string {
    return '/product' + this.product.absolute_url
  }

  get addToCartButtonText(): string {
    return (this.product.active === 'False' || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
  }

  public addToCart(): void {

    if (isNaN(this.quantity) || this.quantity < 1) {
      this.quantity = 1
    }

    const item = {
      product: this.product,
      quantity: this.quantity
    }

    store.commit('cart/addToCart', item)
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height
  }

  public contentShorten(productName: any): string {
    return helpers.contentShorten(productName, 0, 50)
  }

  public isOddNumber(num: any) {
    return num % 2
  }

  public backgroundStars(productRate: any): string[] {
    const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

    if (this.isOddNumber(productRate)) {
      stars.push(starHalfSvg)
    }

    return stars
  }

}
</script>

<style lang="scss" scoped>
.product-card-main {
  padding: 16px;
  background-color: var(--cp-palette-main-fourth) !important;
  border-radius: 10px;
  border-color: var(--cp-palette-main-third);
  border-width: 1px;
  border-style: solid;
  content-visibility: auto;

  &:hover {
    box-shadow: 0 0 7px 0 rgb(153 153 153 / 40%);
  }

  .card-body {
    background-color: transparent !important;
    text-align: unset;
    justify-content: unset;
    padding: 0;
    margin-top: 24px;

    .card-title {
      position: relative;
      max-height: 36px;
      overflow: hidden;
      line-height: 18px;
      height: 36px;
      align-items: center;

      span {
        font-size: 15px;
        font-weight: 500;
        color: var(--cp-palette-main-fifth);
      }
    }

    .card-review-content {
      display: inline-flex;
      align-items: center;
      justify-items: center;

      &-stars {
        display: flex;

        .star {
          width: 13px;
          height: 13px;

          &-background {
            color: $rating-starts;
          }
        }
      }

      &-count {
        span {
          font-size: 13px;
          padding-left: 4px;
          color: var(--cp-palette-main-fifth);
        }
      }
    }

    .card-text {
      span.card-text-price-from {
        color: var(--cp-palette-main-fifth);
        font-size: 13px;
        line-height: 17px;
        position: relative;
      }

      span.card-text-price-num {
        color: var(--cp-palette-main-fifth);
        font-size: 16px;
        line-height: 21px;
        font-weight: 500;
      }
    }

    .card-footer {
      margin-top: 10px;

      a.btn-product-card {
        border: unset;
      }
    }
  }

  .card-image-content {
    width: 100%;
    height: 130px;
    line-height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background-color: transparent;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    img {
      display: inline-block;
      vertical-align: middle;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      width: auto;
    }
  }
}

.grid-item {
  a {
    position: relative;
    display: block;
  }
}

.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}

.box {
  &:hover {
    box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;
  }
}

.addToCartButton {
  &.disabled {
    background-color: var(--cp-palette-main-third);
    border-color: transparent;
    box-shadow: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
