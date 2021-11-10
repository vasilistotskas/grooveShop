<template>
  <div
      class="_buttons"
      :style="{
      'column-gap': gap,
      'grid-template-columns': `${r1}fr ${r2}fr`
    }"
  >
    <BaseButton @click="$emit('reset')" class="reset-button">Reset</BaseButton>
    <BaseButton
        class="submit-button"
        type="primary"
        html-type="submit"
        :disabled="submitting"
    >
      {{ submitText }}
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    BaseButton
  },
  emits: ["reset"],
  props: {
    submitText: {
      type: String,
      default: "Submit"
    },
    gap: {
      type: String,
      required: true
    },
    ratio: {
      type: String,
      default: "1:1"
    },
    submitting: {
      type: Boolean
    }
  },
  computed: {
    r1() {
      return this.ratio.split(":")[0];
    },
    r2() {
      return this.ratio.split(":")[1];
    }
  }
});
</script>

<style scoped>
._buttons {
  display: grid;
  grid-auto-flow: column;
}
</style>