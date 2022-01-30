<template>
  <span class="register-activation-failed-text">
    Activation failed.
  </span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'ToastRegisterActivationFail'
})

export default class ToastRegisterActivationFail extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Toast/ToastRegisterActivationFail"

</style>
