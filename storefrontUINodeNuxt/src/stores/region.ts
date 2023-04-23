import { FetchError } from 'ofetch'
import { Region, RegionsQuery } from '~/zod/region/region'
import { Pagination } from '~/zod/pagination/pagination'

export interface RegionState {
	regions: Pagination<Region>
	region: Region | null
	pending: boolean
	error: FetchError<unknown> | null
}

export const useRegionStore = defineStore({
	id: 'region',
	state: (): RegionState => ({
		regions: {
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
		region: null as Region | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	actions: {
		async fetchRegions({ alpha2 }: RegionsQuery) {
			this.pending = true
			const {
				data: regions,
				error,
				pending
			} = await useFetch(`/api/regions`, {
				method: 'get',
				params: {
					alpha2
				}
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (regions.value) {
				this.regions = regions.value
			}
			this.pending = pending.value
		}
	}
})
