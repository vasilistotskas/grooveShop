import { FetchError } from 'ofetch'
import { Pagination } from '~/zod/pagination/pagination'
import { PayWay, PayWayQuery } from '~/zod/pay-way/pay-way'

export interface PayWayState {
	payWays: Pagination<PayWay>
	payWay: PayWay | null
	pending: boolean
	error: FetchError<unknown> | null
}

export const usePayWayStore = defineStore({
	id: 'payWay',
	state: (): PayWayState => ({
		payWays: {
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
		payWay: null as PayWay | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getActivePayWays: (state): PayWay[] => {
			return state.payWays.results.filter((payWay) => payWay.active)
		}
	},
	actions: {
		async fetchPayWays(params?: PayWayQuery): Promise<void> {
			const {
				data: payWays,
				error,
				pending
			} = await useFetch(`/api/pay-way`, {
				method: 'get',
				params
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (payWays.value) {
				this.payWays = payWays.value
			}
			this.pending = pending.value
		}
	}
})
