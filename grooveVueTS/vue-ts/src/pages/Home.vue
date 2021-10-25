<template>
  <div class="home container-fluid">
    <section class="hero is-medium is-dark mb-6 mt-5">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          {{ $t('eshop.test1') }}
        </p>
        <p class="subtitle">
          {{ $t('eshop.test2') }}
        </p>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-12 mb-5">
          <h2 class="is-size-2 has-text-centered">{{ $t('eshop.test3') }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component";

@Options({
  name: "Home",
})

export default class Home extends AppBasePage {

}
</script>