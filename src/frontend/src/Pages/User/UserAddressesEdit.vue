<template>
	<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
	TEST
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'

@Component({
	name: 'UserAddressesEdit',
	components: {
		Breadcrumbs
	}
})
export default class UserAddressesEdit extends Vue {
	userModule = getModule(UserModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Address Edit`,
				description: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Address Edit`
			}))
		)
		return {
			meta
		}
	})

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddressesEdit';
</style>
