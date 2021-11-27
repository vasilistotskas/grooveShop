<template>
  <div>
    <h1 class="plr-15">{{ title }}</h1>
    <form @submit.prevent="$emit('submit')" class="_form">
      <slot></slot>
    </form>
<!--    <PreFormData :form="form" :errors="errors" />-->
  </div>
</template>

<script>
import { defineComponent } from "vue"
import PreFormData from "@/components/Form/PreFormData.vue"

export default defineComponent({
  components: {
    PreFormData
  },
  emits: ["submit"],
  props: {
    title: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
._form {
  margin: 2.5rem 0 2.5rem 0;
}
</style>