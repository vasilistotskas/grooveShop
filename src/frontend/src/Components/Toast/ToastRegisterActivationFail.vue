<template>
	<span class="register-activation-failed-text"> Activation failed. </span>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'ToastRegisterActivationFail'
})
export default class ToastRegisterActivationFail extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Toast/ToastRegisterActivationFail.scss';
</style>
