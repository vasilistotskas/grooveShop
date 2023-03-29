import { FetchError } from 'ofetch'
import { Region, RegionsQuery } from '~/zod/region/region'
import { Pagination } from '~/zod/pagination/pagination'

export interface RegionState {
	regions: Pagination<Region>
	region: Region | null
	pending: boolean
	error: FetchError<any> | null
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
		pending: false,
		error: null as FetchError<any> | null
	}),
	getters: {
		getRegions: (state) => {
			return state.regions
		},
		getRegion: (state) => {
			return state.region
		}
	},
	actions: {
		async fetchRegions({ alpha2 }: RegionsQuery) {
			const {
				data: regions,
				error,
				pending
			} = await useFetch(`/api/regions`, {
				method: 'get',
				params: {
					alpha_2: alpha2
				}
			})
			this.pending = pending.value
			this.error = error.value
			if (regions.value) {
				this.regions = regions.value
			}
		}
	}
})
