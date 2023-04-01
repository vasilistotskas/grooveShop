<script lang="ts" setup>
import { PropType } from 'vue'
import { Favourite } from '~/zod/product/favourite'
import { useUserStore } from '~/stores/user'

const props = defineProps({
	productId: {
		type: Number as PropType<number | undefined>,
		required: true
	},
	userId: {
		type: Number as PropType<number | undefined>,
		required: false,
		default: undefined
	},
	isFavourite: {
		type: Boolean,
		required: true
	},
	favourite: {
		type: Object as PropType<Favourite | null>,
		required: false,
		default: null
	},
	isAuthenticated: {
		type: Boolean,
		required: true
	}
})

const { productId, userId, isFavourite, favourite, isAuthenticated } = toRefs(props)

const { t } = useLang()
const toast = useToast()
const userStore = useUserStore()
const { favourites } = storeToRefs(userStore)

const toggleFavourite = async () => {
	if (!isAuthenticated.value || !userId?.value || !favourites.value) {
		toast.error(t('components.add_to_favourite_button.not_authenticated'))
		return
	}
	const favouriteIndex = favourites.value.findIndex((f) => f.product === productId.value)
	if (favouriteIndex === -1) {
		await userStore.addFavourite({
			product: String(productId.value),
			user: String(userId.value)
		})
		toast.success(t('components.add_to_favourite_button.added'))
	} else {
		await userStore.removeFavourite(favourites.value[favouriteIndex].id)
		toast.success(t('components.add_to_favourite_button.removed'))
	}
}

const buttonLabel = computed(() => {
	return isFavourite.value
		? t('components.add_to_favourite_button.remove')
		: t('components.add_to_favourite_button.add')
})

const buttonColor = computed(() => {
	return isFavourite.value ? 'red' : 'grey'
})
</script>

<template>
	<button class="btn btn--icon" type="button" @click="toggleFavourite">
		<IconMdi:heart v-if="isFavourite" :style="{ color: buttonColor }" />
		<IconMdi:heart-outline v-else :style="{ color: buttonColor }" />
		<span class="ml-2 hidden">{{ buttonLabel }}</span>
	</button>
</template>
