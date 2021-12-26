<template>
  <button
      :class="['button buttonEffect', type, { disabled }]"
      :type="htmlType"
      :disabled="disabled">
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
  color: $primary-color-4;
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
.buttonEffect {
  transition: all .3s ease-in-out;
    &:hover {
      transition: all .3s ease-in-out;
      transform: scale(1.02);
      box-shadow: 0 0 10px 3px #1f1f1f;
    }
}

.default {
  background-color: #212529!important;
}
.default:hover {
  border-color: #212529!important;
}

.default:focus {
  border-color: #212529!important;
  box-shadow: 0 0 3px #212529!important;
}

.primary {
  background-color: $primary-color-1!important;
  border-color: $primary-color-1!important;
}

.primary:hover {
  background-color: $primary-color-1!important;
}

.primary:focus {
  box-shadow: 0 0 3px $primary-color-1!important;
}

.danger {
  background-color: $red-50;
  border-color: $red-50;
}

.danger:hover {
  background-color: $red-50;
}

.danger:focus {
  box-shadow: 0 0 3px $red-50;
}
</style>