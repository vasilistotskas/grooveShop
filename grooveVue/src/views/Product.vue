<template>
  <div class="page-product container mt-5" v-if="product && Object.keys(product).length > 0">
    <div class="row">
      <div class="col-md-9 page-product-image-col" :style="getProductImageCol()">
        <figure
            v-for="image in product.images"
            :key="image.id"
            class="image">
          <img v-bind:src="'http://127.0.0.1:8000' + image.image">
        </figure>
      </div>

      <div class="col-md-3">
        <h1 class="title mb-1">{{ product.name }}</h1>
        <h5 class="mb-1"><strong>Product ID: </strong>{{ product.id }}</h5>
        <!-- Product Review -->
        <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Product Review</a>
        <ProductReviewModal></ProductReviewModal>
        <p class="description mb-4">{{ product.description }}</p>
        <p class="mb-2"><strong>Price: </strong>${{ product.price }}</p>

        <p class="mb-2"><strong>Discount Percent: </strong>{{ product.discount_percent }}%</p>
        <p class="mb-2"><strong>Discount Value: </strong>${{ product.discount_value }}</p>

        <p class="mb-2"><strong>Vat Percent: </strong>{{ product.vat_percent }}%</p>
        <p class="mb-4"><strong>Vat Value: </strong>${{ product.vat_value }}</p>

        <p><strong>Total Price: </strong>${{ product.final_price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity">
          </div>

          <div class="control">
            <a class="button is-dark addToCartButton" v-bind:class="{'disabled': disabled }" @click="addToCart()">{{ addToCartButtonText() }}</a>
          </div>

          <FavouriteButton :product="product">

          </FavouriteButton>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import FavouriteButton from '@/components/FavouriteButton'
import ProductReviewModal from '@/components/ProductReviewModal'

export default {
  name: 'Product',
  components: {
    FavouriteButton,
    ProductReviewModal
  },
  data() {
    return {
      quantity: 1
    }
  },
  mounted() {
    this.$store.dispatch('initializeProduct')
  },
  computed: {
    product: {
      get() {
        return this.$store.getters['getStateProduct']
      }
    },
    extraImages: {
      get() {
        return this.$store.getters['getStateProductExtraImages']
      }
    },
    disabled() {
      return this.product.active === "False" || this.product.stock <= 0
    }
  },
  methods: {
    updateProductHits() {
      this.$store.dispatch('updateProductHits')
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1
      }

      const item = {
        product: this.product,
        quantity: this.quantity,
        disabled: this.disabled
      }

      if (this.disabled) {
        toast({
          message: 'Out of stock',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })
      } else {
        this.$store.commit('addToCart', item)
        toast({
          message: 'The product was added to the cart',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })
      }
    },
    getProductImageCol() {
      return this.extraImages?.length > 1 ? 'grid-template-columns: repeat(2, 1fr)' : 'grid-template-columns: repeat(1, 1fr)'
    },
    addToCartButtonText() {
      return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
    }
  }
}
</script>



<style lang="scss">
  .page-product-image-col{
    display: grid;
    grid-template-rows: auto;
    grid-gap: 1vw;
    @media screen and (max-width: 767px){
      margin-bottom: 20px;
    }
  }
  .addToCartButton{
    &.disabled{
      background-color: #363636;
      border-color: transparent;
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>