<template>
  <div
    :style="{
      'column-gap': gap,
      'grid-template-columns': `${r1}fr ${r2}fr`,
    }"
    class="_buttons"
  >
    <FormBaseButton class="reset-button" title="Reset" type="primary-two" @click="$emit('reset')"> Reset </FormBaseButton>
    <FormBaseButton :disabled="submitting" class="submit-button" html-type="submit" title="Submit" type="primary">
      {{ submitText }}
    </FormBaseButton>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FormBaseButton from './FormBaseButton.vue'

export default defineComponent({
  components: {
    FormBaseButton,
  },
  props: {
    submitText: {
      type: String,
      default: 'Submit',
    },
    gap: {
      type: String,
      required: true,
    },
    ratio: {
      type: String,
      default: '1:1',
    },
    submitting: {
      type: Boolean,
    },
  },
  emits: ['reset'],
  computed: {
    r1() {
      return this.ratio.split(':')[0]
    },
    r2() {
      return this.ratio.split(':')[1]
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Form/FormSubmitButtons';
</style>
