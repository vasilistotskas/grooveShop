<template>
  <span class="register-activation-failed-text">
    Activation failed.
  </span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'RegisterActivationFail'
})

export default class RegisterActivationFail extends Vue {
}
</script>

<style lang="scss" scoped>
  .register-activation-failed-text {
    color: var(--cp-palette-main-fifth);
  }
</style>
