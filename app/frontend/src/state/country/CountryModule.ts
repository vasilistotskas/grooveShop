import { find } from 'lodash'
import store from '@/store'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import CountryModel from "@/state/country/CountryModel"
import RegionsModel from "@/state/country/RegionsModel"
import AppBaseModule from "@/state/common/AppBaseModule"
import {Action, Module, Mutation} from 'vuex-module-decorators'
import UserDetailsModel from "@/state/user/data/UserDetailsModel"

@Module({ namespaced: true })
export default class CountryModule
    extends AppBaseModule
{
    countries: Array<CountryModel> = []
    regionsBasedOnAlpha: Array<RegionsModel> = []
    selectedCountry: {} = CountryModel

    get getCountries(): object {
        return this.countries
    }
    get getRegionsBasedOnAlpha(): object {
        return this.regionsBasedOnAlpha
    }
    get getSelectedCountry(): CountryModel {
        const isAuthenticated: boolean = store.getters['auth/isAuthenticated']
        if(isAuthenticated) {
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
        this.selectedCountry = {}
    }

    @Action
    async getCountriesFromRemote(): Promise<void> {
        await api.get('countries/')
            .then((response: ResponseData) => {
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
        if(userDetails.country){
            let result = this.countries.find(obj => {
                return obj.alpha_2 === userDetails.country
            })
            if(result) {
                this.context.commit('setSelectedCountry', result)
                this.context.commit('setRegionsBasedOnAlpha', result.regions)
            }
        }
    }

    @Action
    async findRegionsBasedOnAlphaFromInput(countryAlpha2Key: CountryModel['alpha_2']): Promise<void> {
        const country = <CountryModel>find(this.countries, ['alpha_2', countryAlpha2Key])
        await this.context.commit('setSelectedCountry', country)
        await this.context.commit('setRegionsBasedOnAlpha', country.regions)
    }
}
