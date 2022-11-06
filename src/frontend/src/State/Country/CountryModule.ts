import { find } from 'lodash'
import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import CountryModel from '@/State/Country/CountryModel'
import RegionsModel from '@/State/Country/RegionsModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'country'
})
export default class CountryModule extends AppBaseModule {
	countries!: Array<CountryModel>
	regionsBasedOnAlpha!: Array<RegionsModel>
	selectedCountry!: CountryModel

	get getCountries(): Array<CountryModel> {
		return this.countries
	}

	get getRegionsBasedOnAlpha(): Array<RegionsModel> {
		return this.regionsBasedOnAlpha
	}

	get getSelectedCountry(): (isAuthenticated: boolean) => CountryModel {
		return (isAuthenticated: boolean) => {
			if (isAuthenticated) {
				return <CountryModel>this.selectedCountry
			}
			return new CountryModel()
		}
	}

	@Mutation
	setCountries(countries: Array<CountryModel>): void {
		this.countries = countries
	}

	@Mutation
	setRegionsBasedOnAlpha(regions: Array<RegionsModel>): void {
		this.regionsBasedOnAlpha = regions
	}

	@Mutation
	setSelectedCountry(country: CountryModel): void {
		this.selectedCountry = country
	}

	@Mutation
	unsetUserCountryData(): void {
		this.regionsBasedOnAlpha = []
		this.selectedCountry = new CountryModel()
	}

	@Action
	async fetchCountriesFromRemote(): Promise<void> {
		return await api
			.get('countries/')
			.then((response: AxiosResponse<Array<CountryModel>>) => {
				const data = response.data
				this.context.commit('setCountries', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async findRegionsBasedOnAlphaForLoggedCustomer(
		UserProfileModel: UserProfileModel
	): Promise<void> {
		if (UserProfileModel.country) {
			const countries = this.context.getters['getCountries']
			const result = countries.find((country: CountryModel) => {
				return country.alpha_2 === UserProfileModel.country
			})
			if (result) {
				await this.context.commit('setSelectedCountry', result)
				return this.context.commit('setRegionsBasedOnAlpha', result.regions)
			}
		}
	}

	@Action
	async findRegionsBasedOnAlphaFromInput(
		countryAlpha2Key: CountryModel['alpha_2']
	): Promise<void> {
		const country = <CountryModel>find(this.countries, ['alpha_2', countryAlpha2Key])
		await this.context.commit('setSelectedCountry', country)
		return this.context.commit('setRegionsBasedOnAlpha', country.regions)
	}
}
