<template>
  <div class="page-success container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="title mb-5">Thank you</h1>

        <p>Your order will be processed within 48 hours</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component"

@Options({
  name: "Checkout"
})

export default class Success extends AppBasePage {

}
</script>
