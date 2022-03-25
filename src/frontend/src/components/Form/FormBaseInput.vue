<template>
  <div
    :class="[attrsClassName, { 'input-group-w-addon': inputWithAddOn}]"
    class="_container"
  >
    <span
      v-if="inputWithAddOn"
      class="input-group-addon"
    >
      <font-awesome-icon
        :icon="inputWithAddOnIcon"
        size="lg"
      />
    </span>
    <input
      v-model="value"
      v-bind="attrsRest"
      :class="['_input', { '_input-error': hasError, 'form-control': inputWithAddOn }]"
      :disabled="disabled"
      :placeholder="placeholder"
    >
    <FormLoadingIcon
      v-if="validating"
      :class="{ '_loading-icon-error': hasError }"
      class="_loading-icon"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FormLoadingIcon from './FormLoadingIcon.vue'

export default defineComponent({
  components: { FormLoadingIcon },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    validating: {
      type: Boolean
    },
    inputWithAddOn: {
      type: Boolean
    },
    inputWithAddOnIcon: {
      type: Object,
      default: () => {},
      required: false
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: [String, Number],
      default: '',
      required: false
    },
    hasError: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs }) {
    const { class: attrsClassName, ...attrsRest } = attrs

    return {
      attrsClassName,
      attrsRest
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Form/FormBaseInput"

</style>