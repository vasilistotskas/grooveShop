<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import VueHorizontal from 'vue-horizontal'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'

type InstagramDataType = Record<string, any>
const instagramDataEmpty: InstagramDataType = {}

const appModule = getModule(AppModule)
const props = defineProps({
	count: Number,
	pagination: Boolean,
	caption: Boolean,
	useSlider: Boolean
})
const isLoading = ref(true)
const hasError = ref(false)
const instagramData: InstagramDataType = ref(instagramDataEmpty)
const usePagination = ref(false)
const showCaption = ref(false)
const paginationNextUrl = ref('')
const paginationPrevUrl = ref('')
const accessToken = appModule.getInstagramApiToken

const fetchInstaData = (url: string) => {
	axios
		.get(url)
		.then((response) => {
			if ('error' in response) {
				isLoading.value = false
				hasError.value = true
			} else {
				instagramData.value = response.data
				if (instagramData.value) {
					paginationNextUrl.value = instagramData.value._rawValue.paging.next
					paginationPrevUrl.value = instagramData.value._rawValue.paging.previous
				}
				isLoading.value = false
			}
		})
		.then(() => {
			if (props.pagination) {
				usePagination.value = props.pagination
			}
			if (props.caption) {
				showCaption.value = props.caption
			}
		})
		.catch((error) => {
			console.log('Error:', error)
			hasError.value = true
			isLoading.value = false
		})
}
onMounted(() => {
	const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&limit=${props.count}&access_token=${accessToken}`
	fetchInstaData(url)
})
const handlePaginationNext = () => {
	fetchInstaData(paginationNextUrl.value)
}
const handlePaginationPrev = () => {
	fetchInstaData(paginationPrevUrl.value)
}
</script>

<template>
	<div class="instagram-wrapper">
		<h1 v-if="isLoading">LOADING...</h1>
		<h1 v-else-if="hasError">Ooops, something went wrong.</h1>
		<div v-else class="instagram-gallery">
			<VueHorizontal
				responsive
				:displacement="0.7"
				snap="center"
				v-if="props.useSlider"
				class="instagram-gallery-slider horizontal"
			>
				<section
					v-for="image in instagramData.data"
					:key="image.id"
					class="instagram-gallery-item slider-item"
				>
					<a :href="image.permalink" :key="image.id" target="_blank" rel="noreferrer">
						<img
							v-if="image.media_type === 'IMAGE' || image.media_type === 'CAROUSEL_ALBUM'"
							:src="image.media_url"
							:alt="image.caption"
							:key="image.id"
							class="instagram-gallery-image"
						/>
						<video v-else :key="image.id" class="instagram-gallery-image">
							<source :src="image.media_url" type="video/mp4" />
						</video>
					</a>
					<span v-if="showCaption" class="instagram-caption">{{ image.caption }}</span>
				</section>
			</VueHorizontal>
			<div
				v-else
				v-for="image in instagramData.data"
				:key="image.id"
				class="instagram-gallery-item"
			>
				<a :href="image.permalink" :key="image.id" target="_blank" rel="noreferrer">
					<img
						v-if="image.media_type === 'IMAGE' || image.media_type === 'CAROUSEL_ALBUM'"
						:src="image.media_url"
						:alt="image.caption"
						:key="image.id"
						class="instagram-gallery-image"
					/>
					<video v-else :key="image.id" class="instagram-gallery-image">
						<source :src="image.media_url" type="video/mp4" />
					</video>
				</a>
				<span v-if="showCaption" class="instagram-caption">{{ image.caption }}</span>
			</div>
		</div>
		<div v-if="usePagination">
			<div v-if="paginationPrevUrl">
				<button class="" type="button" @click="handlePaginationPrev">Previous</button>
			</div>
			<div v-if="paginationNextUrl">
				<button class="" type="button" @click="handlePaginationNext">Next</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Utilities/InstagramFeed';
</style>
