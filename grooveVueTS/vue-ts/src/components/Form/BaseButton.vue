<template>
  <button
      :class="['button', type, { disabled }]"
      :type="htmlType"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    htmlType: {
      type: String,
      default: "button",
      validator: htmlType => ["button", "reset", "submit"].includes(htmlType)
    },
    type: {
      type: String,
      default: "default",
      validator: type => ["default", "primary", "danger"].includes(type)
    },
    disabled: {
      type: Boolean
    }
  }
})
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
  color: black;
  outline: none;
  cursor: pointer;
  background: transparent;
  border-width: 1px;
  border-color: $gray-200;
  box-shadow: none;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  min-width: 6rem;
  transition: all 100ms;
}

.default:hover {
  border-color: $green-500;
}

.default:focus {
  border-color: $green-500;
  box-shadow: 0 0 3px $green-500;
}

.primary {
  background-color: $green-50;
  border-color: $green-500;
}

.primary:hover {
  background-color: $green-100;
}

.primary:focus {
  box-shadow: 0 0 3px $green-500;
}

.danger {
  background-color: $red-50;
  border-color: $red-500;
}

.danger:hover {
  background-color: $red-100;
}

.danger:focus {
  box-shadow: 0 0 3px $red-500;
}
</style>