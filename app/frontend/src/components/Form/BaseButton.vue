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
import { defineComponent } from 'vue';

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
});
</script>

<style lang="scss" scoped>

.disabled {
  cursor: not-allowed !important;
  background-color: $gray-100 !important;
  border-color: $gray-400 !important;
  opacity: 0.3;
}

.button {
  display: block;
  color: var(--cp-palette-main-fifth);
  outline: none;
  cursor: pointer;
  background: transparent;
  border-width: 1px;
  border-color: transparent;
  box-shadow: none;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  min-width: 6rem;
  transition: all 100ms;
}
.default {
  background-color: var(--cp-palette-main-fourth)!important;
}
.primary {
  background-color: var(--cp-palette-main-primary)!important;
  border-color: var(--cp-palette-main-primary)!important;
}
.primary-two {
  background-color: var(--cp-palette-main-third)!important;
  border-color: var(--cp-palette-main-third)!important;
}
.danger {
  background-color: $red-50;
  border-color: $red-50;
}

</style>