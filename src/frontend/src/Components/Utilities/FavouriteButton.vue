<template>
	<button
		:class="btnClass"
		data-mdb-ripple-color="dark"
		title="Favourite Actions"
		type="button"
		@click="favouriteHandle()"
	>
		<font-awesome-icon v-if="!isFavourite" :icon="icon" />
		<font-awesome-icon v-else :icon="icon" :style="{ color: 'rgba(200,60,60,0.79)' }" />
	</button>
</template>

<script lang="ts">
import { isEmpty, some } from 'lodash'
import { useToast } from 'vue-toastification'
import { DynamicStoreType } from '@/DynamicStore'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import { getModule, VuexModule } from 'vuex-module-decorators'
import { Options as Component, Vue } from 'vue-class-component'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import FavouriteButtonInterface from '@/Components/Utilities/Interface/FavouriteButtonInterface'

const toast = useToast()

@Component({
	name: 'FavouriteButton',
	props: {
		model: {
			type: Object,
			required: true
		},
		module: {
			type: Object,
			required: true
		},
		getterType: {
			type: String,
			required: false,
			default: ''
		},
		getterParams: {
			type: Object,
			required: false,
			default: {}
		},
		dispatchType: {
			type: String,
			required: false,
			default: ''
		},
		dispatchParams: {
			type: Object,
			required: false,
			default: {}
		},
		icon: {
			type: Object,
			required: false,
			default: faHeart
		},
		useStore: {
			type: Boolean,
			required: false,
			default: false
		},
		btnClass: {
			type: String,
			required: false,
			default: 'btn-outline-primary-three'
		}
	}
})
export default class FavouriteButton
	extends Vue
	implements FavouriteButtonInterface<VuexModule<DynamicStoreType>>
{
	userModule = getModule(UserModule)
	authModule = getModule(AuthModule)
	model!: Record<string, never>
	module!: VuexModule<VuexModule<DynamicStoreType, any>, any>
	getterType!: string
	getterParams!: Record<string, unknown>
	dispatchParams!: Record<string, unknown>
	dispatchType!: string
	isFavourite = false
	icon = faHeart
	useStore!: boolean
	btnClass!: string

	updated(): void {
		this.isFavourite = this.getIsFavourite
	}

	mounted(): void {
		this.isFavourite = this.getIsFavourite
	}

	get getIsFavourite(): boolean {
		if (this.useStore) {
			if (this.getterParams && !isEmpty(this.getterParams)) {
				return this.module[this.getterType](this.getterParams)
			}
			return this.module[this.getterType]
		}
		const likes = this.model.likes
		const userEmail = this.userModule.getUserData.email

		return some(likes, { email: userEmail })
	}

	async favouriteHandle(): Promise<void> {
		const IsAuthenticated: boolean = this.authModule.isAuthenticated
		if (!IsAuthenticated) {
			toast.error('You are not logged in')
			return
		}
		let dispatchPayload = {}
		if (this.getterParams && !isEmpty(this.getterParams)) {
			dispatchPayload = this.dispatchParams
		} else {
			dispatchPayload = this.model
		}
		await this.module[this.dispatchType](dispatchPayload).then((isFavourite: boolean) => {
			this.isFavourite = isFavourite
		})
		this.isFavourite
			? toast.success('Added to Favourites')
			: toast.info('Removed From Favourites')
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogFavouriteButton';
</style>
