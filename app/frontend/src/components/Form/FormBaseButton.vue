<template>
  <button
      :class="['button buttonEffect', type, { disabled }]"
      :disabled="disabled"
      :type="htmlType"
  >
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    htmlType: {
      type: String,
      default: 'button',
      validator: htmlType => ['button', 'reset', 'submit'].includes(htmlType)
    },
    type: {
      type: String,
      default: 'default',
      validator: type => ['default', 'primary', 'primary-two', 'danger'].includes(type)
    },
    disabled: {
      type: Boolean
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Form/FormBaseButton"

</style>