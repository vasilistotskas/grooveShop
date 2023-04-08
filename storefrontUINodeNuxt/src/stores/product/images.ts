import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import { Image, ImageQuery } from '~/zod/product/image'

export interface ImagesState {
	images: Pagination<Image>
	pending: boolean
	error: FetchError<any> | null
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
			pageSize: 0,
			page: 0,
			results: []
		},
		pending: true,
		error: null as FetchError<any> | null
	}),
	getters: {
		getImageById: (state) => (id: number) => {
			return state.images.results?.find((image) => image.id === id)
		}
	},
	actions: {
		async fetchImages({ product }: ImageQuery): Promise<void> {
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
			this.pending = pending.value
			this.error = error.value
			if (images.value) {
				this.images = images.value
			}
		}
	}
})
