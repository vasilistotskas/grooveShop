import { Region, RegionsQuery } from '~/zod/region/region'
import { Pagination } from '~/zod/pagination/pagination'

export interface RegionState {
	regions: Pagination<Region>
	region: Region | null
	pending: boolean
	error: string | undefined
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
		error: undefined as string | undefined
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
		async initRegions({ alpha2 }: RegionsQuery) {
			// console.log('===== initRegions =====', alpha2)
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
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (regions.value) {
				this.regions = regions.value
			}
		}
	}
})
