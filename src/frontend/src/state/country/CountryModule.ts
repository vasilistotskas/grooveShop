import { find } from 'lodash'
import store from '@/store'
import api from '@/api/api.service'

import CountryModel from '@/state/country/CountryModel'
import RegionsModel from '@/state/country/RegionsModel'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'

@Module({ namespaced: true })
export default class CountryModule extends AppBaseModule {
	countries: Array<CountryModel> = []
	regionsBasedOnAlpha: Array<RegionsModel> = []
	selectedCountry = new CountryModel()

	get getCountries(): Array<CountryModel> {
		return this.countries
	}

	get getRegionsBasedOnAlpha(): Array<RegionsModel> {
		return this.regionsBasedOnAlpha
	}

	get getSelectedCountry(): CountryModel {
		const isAuthenticated: boolean = store.getters['auth/isAuthenticated']
		if (isAuthenticated) {
			return <CountryModel>this.selectedCountry
		}
		return new CountryModel
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
	fetchCountriesFromRemote(): Promise<void> {
		return api.get('countries/')
			.then((response: any) => {
				const data: CountryModel = response.data
				this.context.commit('setCountries', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	@Action
	async findRegionsBasedOnAlphaForLoggedCustomer(): Promise<void> {
		const userDetails: UserDetailsModel = store.getters['user/data/getUserData']
		if (userDetails.country) {
			const result = this.countries.find(obj => {
				return obj.alpha_2 === userDetails.country
			})
			if (result) {
				await this.context.commit('setSelectedCountry', result)
				return this.context.commit('setRegionsBasedOnAlpha', result.regions)
			}
		}
	}

	@Action
	async findRegionsBasedOnAlphaFromInput(countryAlpha2Key: CountryModel['alpha_2']): Promise<void> {
		const country = <CountryModel>find(this.countries, ['alpha_2', countryAlpha2Key])
		await this.context.commit('setSelectedCountry', country)
		return this.context.commit('setRegionsBasedOnAlpha', country.regions)
	}
}