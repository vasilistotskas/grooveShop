<template>
  <div class="page-product container mt-5">
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
        <h1 class="title mb-5">{{ product.name }}</h1>
        <p class="description mb-4">{{ product.description }}</p>
        <p><strong>Price: </strong>${{ product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity">
          </div>

          <div class="control">
            <a class="button is-dark" @click="addToCart()">Add to cart</a>
          </div>

          <FavouriteButton :product="product">

          </FavouriteButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toast} from 'bulma-toast'
import FavouriteButton from '@/components/FavouriteButton'

export default {
  name: 'Product',
  components: {
    FavouriteButton
  },
  data() {
    return {
      quantity: 1
    }
  },
  beforeCreate() {
    this.$store.dispatch('getProduct')
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
  },
  methods: {
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1
      }

      const item = {
        product: this.product,
        quantity: this.quantity
      }

      this.$store.commit('addToCart', item)

      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      })
    },
    getProductImageCol() {
      return this.extraImages?.length > 1 ? 'grid-template-columns: repeat(2, 1fr)' : 'grid-template-columns: repeat(1, 1fr)'
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
</style>