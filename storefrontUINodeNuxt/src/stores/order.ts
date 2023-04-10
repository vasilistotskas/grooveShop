import { FetchError } from 'ofetch'
import { Order, OrderCreateRequest, OrderQuery } from '~/zod/order/order'
import { Pagination } from '~/zod/pagination/pagination'

export interface OrderState {
	orders: Pagination<Order>
	order: Order | null
	pending: boolean
	error: FetchError<any> | null
}

export const useOrderStore = defineStore({
	id: 'order',
	state: (): OrderState => ({
		orders: {
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
		order: null as Order | null,
		pending: true,
		error: null as FetchError<any> | null
	}),
	getters: {
		getOrderById: (state) => (id: number) => {
			return state.orders.results?.find((order) => order.id === id)
		}
	},
	actions: {
		async fetchOrders({ page, ordering, user_id }: OrderQuery): Promise<void> {
			console.log('==== page ====', page)
			const {
				data: orders,
				error,
				pending
			} = await useFetch(`/api/orders`, {
				method: 'get',
				params: {
					page,
					ordering,
					user_id
				}
			})
			this.pending = pending.value
			this.error = error.value
			if (orders.value) {
				this.orders = orders.value
			}
		},
		async fetchOrder(id: string | string[] | number): Promise<void> {
			const {
				data: order,
				error,
				pending
			} = await useFetch(`/api/order/${id}`, {
				method: 'get'
			})
			this.pending = pending.value
			this.error = error.value
			if (order.value) {
				this.order = order.value
			}
		},
		async createOrder(body: OrderCreateRequest): Promise<void> {
			const {
				data: order,
				error,
				pending
			} = await useFetch(`/api/orders`, {
				method: 'post',
				body
			})
			this.pending = pending.value
			this.error = error.value
			if (order.value) {
				this.order = order.value
			}
		}
	}
})
