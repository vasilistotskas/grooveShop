<template>
  <div>
    <router-link v-bind:to="product.get_absolute_url" class="p-1">

      <div class="box">
        <figure class="image mb-4">
          <img v-bind:src="product.main_image">
        </figure>

        <div class="row">
          <div class="col-md-6">
            <h3 class="is-size-4">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>
          </div>

          <div class="col-md-6 control text-end">
            <a class="button is-dark" @click.prevent="addToCart()">Add to cart</a>
          </div>
        </div>
      </div>

    </router-link>
  </div>

</template>

<script>
import {toast} from "bulma-toast";

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  data() {
    return {
      quantity: 1,
    }
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
    }
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>