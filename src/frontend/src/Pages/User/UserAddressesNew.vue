<template>
	<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
	<div>test</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
	name: 'UserAddressesNew',
	components: {
		Breadcrumbs
	}
})
export default class UserAddressesNew extends Vue {
	userModule = getModule(UserModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Address New`,
				description: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Address New`
			}))
		)
		return {
			meta
		}
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddressesNew';
</style>
