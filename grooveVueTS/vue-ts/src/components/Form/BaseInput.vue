<template>
  <div class="_container" :class="attrsClassName">
    <input
        v-model="value"
        :class="['_input', { '_input-error': hasError }]"
        :disabled="disabled"
        :placeholder="placeholder"
        v-bind="attrsRest"/>
    <LoadingIcon
        class="_loading-icon"
        :class="{ '_loading-icon-error': hasError }"
        v-if="validating"/>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import LoadingIcon from "../../assets/LoadingIcon.vue"

export default defineComponent({
  inheritAttrs: false,
  components: { LoadingIcon },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    validating: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: [String, Number]
    },
    hasError: {
      type: Boolean
    }
  },
  emits: ["update:modelValue"],
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
        this.$emit("update:modelValue", value);
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
    border-color: #000000 !important;
    box-shadow: 0 0 3px #000000 !important;
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