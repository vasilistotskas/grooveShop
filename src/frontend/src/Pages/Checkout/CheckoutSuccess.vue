<template>
	<div class="container mt-7">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="page-success">
			<div class="page-success-grid-content">
				<h1 class="title mb-5">Thank you</h1>

				<p>Your order will be processed within 48 hours</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { useRouter } from 'vue-router'

@Component({
	name: 'CheckoutSuccess',
	components: {
		Breadcrumbs
	}
})
export default class CheckoutSuccess extends Vue {
	router = useRouter()
	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Checkout Success',
				description: 'Checkout Success'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return this.router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Checkout/CheckoutSuccess.scss';
</style>
