import { cloneDeep } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'
import AddressModel from '@/State/Address/AddressModel'
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
	addresses!: Array<AddressModel>

	get getNamespace(): PaginationNamespaceTypesEnum {
		return this.namespace
	}

	get getAddresses(): Array<AddressModel> {
		return this.addresses
	}

	get getMainAddress(): AddressModel | undefined {
		return this.addresses.find((address: AddressModel) => address.is_main)
	}

	@Mutation
	setAddresses(addresses: Array<AddressModel>): void {
		this.addresses = addresses
	}

	@Action
	async fetchAddresses(): Promise<void> {
		return await api
			.get(`address/`)
			.then((response: AxiosResponse<PaginatedModel<AddressModel>>) => {
				const data = response.data
				this.context.commit('setAddresses', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async updateAddressById(address: AddressModel): Promise<void> {
		return await api
			.patch(`address/${address.id}/`, address)
			.then((response: AxiosResponse<AddressModel>) => {
				const data = response.data
				const addresses = cloneDeep(this.addresses)
				const index = addresses.findIndex(
					(address: AddressModel) => address.id === data.id
				)
				addresses[index] = data
				this.context.commit('setAddresses', addresses)
				toast.success('Address updated successfully')
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async createAddress(address: AddressModel): Promise<void> {
		return await api
			.post(`address/`, address)
			.then((response: AxiosResponse<AddressModel>) => {
				const data = response.data
				const addresses = cloneDeep(this.addresses)
				addresses.push(data)
				this.context.commit('setAddresses', addresses)
				toast.success('Address created successfully')
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async deleteAddressById(address: AddressModel): Promise<void> {
		return await api
			.delete(`address/${address.id}/`)
			.then((response: AxiosResponse<AddressModel>) => {
				const data = response.data
				const addresses = cloneDeep(this.addresses)
				const index = addresses.findIndex(
					(address: AddressModel) => address.id === data.id
				)
				addresses.splice(index, 1)
				this.context.commit('setAddresses', addresses)
				toast.success('Address deleted successfully')
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
