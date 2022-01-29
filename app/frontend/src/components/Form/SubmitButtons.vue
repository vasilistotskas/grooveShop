<template>
  <div
      :style="{
      'column-gap': gap,
      'grid-template-columns': `${r1}fr ${r2}fr`
    }"
      class="_buttons"
  >
    <BaseButton
        class="reset-button"
        title="Reset"
        type="primary-two"
        @click="$emit('reset')"
    >
      Reset
    </BaseButton>
    <BaseButton
        :disabled="submitting"
        class="submit-button"
        html-type="submit"
        title="Submit"
        type="primary"
    >
      {{ submitText }}
    </BaseButton>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  components: {
    BaseButton
  },
  props: {
    submitText: {
      type: String,
      default: 'Submit'
    },
    gap: {
      type: String,
      required: true
    },
    ratio: {
      type: String,
      default: '1:1'
    },
    submitting: {
      type: Boolean
    }
  },
  emits: ['reset'],
  computed: {
    r1() {
      return this.ratio.split(':')[0]
    },
    r2() {
      return this.ratio.split(':')[1]
    }
  }
})
</script>

<style scoped>
._buttons {
  display: grid;
  grid-auto-flow: column;
}
</style>