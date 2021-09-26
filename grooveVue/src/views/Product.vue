<template>
  <div class="container mt-5">
    <div class="page-product">
      <div class="columns is-multiline">
        <div class="column is-6">
          <figure class="image mb-6">
            <img v-bind:src="product.main_image">
          </figure>


            <div class="container">
              <div class="row">
                <div>
                  <Carousel :settings="settings" :breakpoints="breakpoints">
                    <Slide v-for="image in product.images" :key="image.id">
                      <img v-bind:src="'http://127.0.0.1:8000' + image.image">
                    </Slide>
                    <template #addons>
                      <Navigation />
                      <Pagination />
                    </template>
                  </Carousel>
                </div>
              </div>
            </div>




          <h1 class="title">{{ product.name }}</h1>

          <p>{{ product.description }}</p>
        </div>

        <div class="column is-6">
          <h2 class="subtitle">Information</h2>

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
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import {filter} from 'lodash'
import FavouriteButton from '@/components/FavouriteButton'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'Product',
  components: {
    FavouriteButton,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      product: {},
      quantity: 1,

      // carousel settings
      settings: {
        itemsToShow: 1,
        // autoplay
        // autoplay: 2000,
        // infinite
        // wrapAround: true,
        snapAlign: 'start',
        modelValue: 1
      },
      breakpoints: {
        700: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        1024: {
          itemsToShow: 1.5
        },
      },
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      this.$store.commit('setIsLoading', true)

      const category_slug = this.$route.params.category_slug
      const product_slug = this.$route.params.product_slug

      await axios
          .get(`/api/v1/products/${category_slug}/${product_slug}`)
          .then(response => {
            this.product = response.data
            this.product.images = filter(response.data.images, ['is_main', false])

            document.title = this.product.name + ' | grooveShop'
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },
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
    }
  }
}
</script>



<style>
.carousel__slide {
  padding: 10px;
}
.carousel__pagination-button{
  background: #c5c5c5;
}
.carousel__pagination-button--active {
  background-color: #642afb
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  background-color: #363636;
}
</style>