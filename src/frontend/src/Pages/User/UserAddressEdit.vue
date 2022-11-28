<template>TEST</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
	name: 'UserAddressEdit'
})
export default class UserAddressEdit extends Vue {
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
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddressEdit';
</style>
