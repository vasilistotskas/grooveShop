<template>
	<div class="container mt-7">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="page-success">
			<div class="page-success-grid-content">
				<h1 class="title mb-5">Error , your order could not be completed</h1>
				<p>Contact us</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'

@Component({
	name: 'CheckoutError',
	components: {
		Breadcrumbs
	}
})
export default class CheckoutError extends Vue {
	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	mounted(): void {
		document.title = 'Order Error'
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Checkout/CheckoutSuccess';
</style>
