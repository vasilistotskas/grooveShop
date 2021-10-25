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
            <a class="button is-dark addToCartButton" v-bind:class="{'disabled': disabled }" @click.prevent="addToCart()">{{ addToCartButtonText() }}</a>
          </div>
        </div>
      </div>

    </router-link>
  </div>

</template>

<script>

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
  computed: {
    disabled() {
      return this.product.active === "False" || this.product.stock <= 0
    }
  },
  methods: {
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
    addToCartButtonText() {
      return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
  .box{
    &:hover{
        box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;
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