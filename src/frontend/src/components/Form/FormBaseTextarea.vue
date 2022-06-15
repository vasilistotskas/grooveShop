<template>
  <div :class="[attrsClassName, { 'textarea-group-w-addon': textareaWithAddOn }]" class="_container">
    <span v-if="textareaWithAddOn" class="textarea-group-addon">
      <font-awesome-icon :icon="textareaWithAddOnIcon" size="lg" />
    </span>
    <textarea
      v-model="value"
      v-bind="attrsRest"
      :class="['_textarea', { '_textarea-error': hasError, 'form-control': textareaWithAddOn }]"
      :disabled="disabled"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :rows="rows"
    />
    <FormLoadingIcon v-if="validating" :class="{ '_loading-icon-error': hasError }" class="_loading-icon" />
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
      required: true,
    },
    validating: {
      type: Boolean,
    },
    textareaWithAddOn: {
      type: Boolean,
    },
    textareaWithAddOnIcon: {
      type: Object,
      default: () => Object,
      required: false,
    },
    disabled: {
      type: Boolean,
    },
    placeholder: {
      type: [String, Number],
      default: '',
      required: false,
    },
    hasError: {
      type: Boolean,
    },
    maxlength: {
      type: Number,
      default: 500,
      required: false,
    },
    rows: {
      type: Number,
      default: 6,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs }) {
    const { class: attrsClassName, ...attrsRest } = attrs

    return {
      attrsClassName,
      attrsRest,
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Form/FormBaseTextarea';
</style>
