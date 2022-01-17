<template>
  <div :class="[attrsClassName, { 'input-group-w-addon': inputWithAddOn}]" class="_container">
    <span v-if="inputWithAddOn" class="input-group-addon">
      <font-awesome-icon :icon="inputWithAddOnIcon" :style="{ color: '#080808' }" size="lg" />
    </span>
    <input
      v-model="value"
      v-bind="attrsRest"
      :class="['_input', { '_input-error': hasError, 'form-control': inputWithAddOn }]"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <LoadingIcon
      v-if="validating"
      :class="{ '_loading-icon-error': hasError }"
      class="_loading-icon"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LoadingIcon from '../../assets/LoadingIcon.vue';

export default defineComponent({
  components: { LoadingIcon },
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
      required: false
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: [String, Number],
      required: false
    },
    hasError: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs }) {
    const { class: attrsClassName, ...attrsRest } = attrs;

    return {
      attrsClassName,
      attrsRest
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
});
</script>

<style lang="scss" scoped>

._container {
  position: relative;
}

._input {
  width: 100%;
  border: 1px solid $gray-200;
  outline: none;
  padding: 0.75rem;
  border-radius: 0.25rem;

  &:focus {
    border-color: #fd000252!important;
    box-shadow: 0 0 3px #fd000230!important;
  }
}

._input-error {
  border-color: $red-400 !important;

  &:focus {
    box-shadow: 0 0 3px $red-400;
  }
}

._loading-icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  width: 14px;
  height: 14px;
  margin-top: -7px;
  color: $green-500;
}
._loading-icon-error {
  color: $red-400;
}
</style>