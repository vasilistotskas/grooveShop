import { cloneDeep } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import { Address } from '@/Zod/Address/ZodAddress'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

const toast = useToast()

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'address'
})
export default class AddressModule extends AppBaseModule {
	namespace = PaginationNamespaceTypesEnum.ADDRESS
	addresses: Array<Address> = []
	address!: Address

	get getNamespace(): PaginationNamespaceTypesEnum {
		return this.namespace
	}

	get getAddresses(): Array<Address> {
		return this.addresses
	}

	get getAddress(): Address {
		return this.address
	}

	get getMainAddress(): Address | undefined {
		return this.addresses.find((address: Address) => address.is_main)
	}

	@Mutation
	setAddresses(addresses: Array<Address>): void {
		this.addresses = addresses
	}

	@Mutation
	setAddress(address: Address): void {
		this.address = address
	}

	@Action
	async fetchAddresses(): Promise<void> {
		return await api
			.get(`address/`)
			.then((response: AxiosResponse<PaginatedModel<Address>>) => {
				const data = response.data
				this.context.commit('setAddresses', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async fetchAddressById(id: number): Promise<void | PaginatedModel<Address>> {
		return await api
			.get(`address/${id}/`)
			.then((response: AxiosResponse<PaginatedModel<Address>>) => {
				const data = response.data
				this.context.commit('setAddress', data)
				return data
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateAddressById(address: Address): Promise<void | Address> {
		return await api
			.patch(`address/${address.id}/`, address)
			.then((response: AxiosResponse<Address>) => {
				const data = response.data
				const addresses = cloneDeep(this.context.getters['getAddresses'])
				const index = addresses.findIndex((address: Address) => address.id === data.id)
				addresses[index] = data
				this.context.commit('setAddresses', addresses)
				toast.success('Address updated successfully')
				return data
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async createAddress(address: Address): Promise<void | Address> {
		return await api
			.post(`address/`, address)
			.then((response: AxiosResponse<Address>) => {
				const data = response.data
				const addresses = cloneDeep(this.context.getters['getAddresses'])
				addresses.push(data)
				this.context.commit('setAddresses', addresses)
				toast.success('Address created successfully')
				return data
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async deleteAddressById(address: Address): Promise<void> {
		return await api
			.delete(`address/${address.id}/`)
			.then((response: AxiosResponse<Address>) => {
				const data = response.data
				const addresses = cloneDeep(this.addresses)
				const index = addresses.findIndex((address: Address) => address.id === data.id)
				addresses.splice(index, 1)
				this.context.commit('setAddresses', addresses)
				toast.success('Address deleted successfully')
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
