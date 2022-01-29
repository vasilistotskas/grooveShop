<template>
  <div>
    <h1 v-if="title" class="plr-15 mb-3 mt-3">{{ title }}</h1>
    <form :class="formClass" class="_form" @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
    <!--    <PreFormData :form="form" :errors="errors" />-->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    formClass: {
      type: String,
      default: ''
    },
    errors: {
      type: Object,
      required: true
    }
  },
  emits: ['submit']
})
</script>

<style lang="scss" scoped>
.checkout-grid {
  &-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    &-part-left {

    }

    &-part-right {

    }
  }
}
</style>