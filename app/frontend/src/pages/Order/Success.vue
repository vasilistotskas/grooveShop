<template>
  <div class="container mt-5">
    <div class="page-success">
      <div class="page-success-grid-content">
        <h1 class="title mb-5">Thank you</h1>

        <p>Your order will be processed within 48 hours</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({
  name: "Checkout"
})

export default class Success extends Vue {
  mounted() {
    document.title = 'Order Success'
  }
}
</script>

<style lang="scss" scoped>
 .page-success {
   min-height: 520px;
 }
</style>