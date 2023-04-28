import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import { Image, ImageQuery } from '~/zod/product/image'

export interface ImagesState {
	images: Pagination<Image>
	pending: boolean
	error: FetchError<unknown> | null
}

export const useImagesStore = defineStore({
	id: 'productImages',
	state: (): ImagesState => ({
		images: {
			links: {
				next: null,
				prev: null
			},
			count: 0,
			totalPages: 0,
			pageTotalResults: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getImageById: (state) => (id: number) => {
			return state.images.results?.find((image) => image.id === id)
		}
	},
	actions: {
		async fetchImages({ product }: ImageQuery): Promise<void> {
			this.pending = true
			const {
				data: images,
				error,
				pending
			} = await useFetch(`/api/product-images`, {
				method: 'get',
				params: {
					product
				}
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (images.value) {
				this.images = images.value
			}
			this.pending = pending.value
		}
	}
})
