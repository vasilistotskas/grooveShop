import { FetchError } from 'ofetch'
import {
	Address,
	AddressCreateRequest,
	AddressPutRequest,
	AddressQuery
} from '~/zod/user/address'
import { Pagination } from '~/zod/pagination/pagination'

export interface AddressState {
	addresses: Pagination<Address>
	address: Address | null
	pending: boolean
	error: FetchError<unknown> | null
}

export const useUserAddressStore = defineStore({
	id: 'user-address',
	state: (): AddressState => ({
		addresses: {
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
		address: null as Address | null,
		pending: false,
		error: null as FetchError<unknown> | null
	}),
	getters: {
		getAddressById: (state) => (id: number) => {
			return state.addresses.results?.find((address) => address.id === id)
		}
	},
	actions: {
		async fetchAddresses({ page, ordering, userId }: AddressQuery): Promise<void> {
			const {
				data: addresses,
				error,
				pending
			} = await useFetch(`/api/user-address`, {
				method: 'get',
				params: {
					page,
					ordering,
					userId
				}
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			console.log('page', page)
			console.log('ordering', ordering)
			console.log('userId', userId)
			if (addresses.value) {
				this.addresses = addresses.value
			}
			this.pending = pending.value
		},
		async fetchAddress(id: string | string[] | number): Promise<void> {
			const {
				data: address,
				error,
				pending
			} = await useFetch(`/api/user-address/${id}`, {
				method: 'get'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (address.value) {
				this.address = address.value
			}
			this.pending = pending.value
		},
		async createAddress(body: AddressCreateRequest): Promise<void> {
			const {
				data: newAddress,
				error,
				pending
			} = await useFetch(`/api/user-address`, {
				method: 'post',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (newAddress.value) {
				this.address = newAddress.value
			}
			this.pending = pending.value
		},
		async updateAddress(
			id: string | string[] | number,
			body: AddressPutRequest
		): Promise<void> {
			const {
				data: address,
				error,
				pending
			} = await useFetch(`/api/user-address/${id}`, {
				method: 'put',
				body
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (address.value) {
				this.address = address.value
			}
			this.pending = pending.value
		},
		async deleteAddress(id: string | string[] | number): Promise<void> {
			const { error, pending } = await useFetch(`/api/user-address/${id}`, {
				method: 'delete'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}

			const index = this.addresses.results.findIndex(
				(address) => Number(address.id) === Number(id)
			)
			if (index !== -1) {
				this.addresses.results.splice(index, 1)
			}
			this.pending = pending.value
		},
		async setMainAddress(id: string | string[] | number): Promise<void> {
			const { error, pending } = await useFetch(`/api/user-address/${id}/set-main`, {
				method: 'post'
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data?.data?.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (this.address) {
				this.address.isMain = true
			}
			this.pending = pending.value
		}
	}
})
