import {Action, Module, Mutation} from 'vuex-module-decorators'
import AppBaseModule from "@/state/common/AppBaseModule";
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import CountryModel from "@/state/country/CountryModel";
import RegionsModel from "@/state/country/RegionsModel";
import store from '@/store'
import {find} from 'lodash'
import UserDetailsModel from "@/state/user/data/UserDetailsModel";

@Module({ namespaced: true })
export default class CountryModule
    extends AppBaseModule
{
    countries: Array<CountryModel> = []
    regionsBasedOnAlpha: Array<RegionsModel> = []
    selectedCountry: object = CountryModel

    get getCountries(): object { return this.countries}
    get getRegionsBasedOnAlpha(): object { return this.regionsBasedOnAlpha}
    get getSelectedCountry(): CountryModel {
        const IsAuthenticated: boolean = store.getters['user/data/getIsAuthenticated']
        if(IsAuthenticated) {
            const userDetails: UserDetailsModel = store.getters['user/data/getUserData']
            // check if user has country saved in his profile
            if(userDetails.country){
                return <CountryModel>find(this.countries, function (o) {
                    return o.alpha_2 = userDetails.country
                })
            }
            return <CountryModel>this.selectedCountry
        }
        return new CountryModel
    }

    @Mutation
    setCountries(countries: Array<any>): void {
        this.countries = countries
    }

    @Mutation
    setRegionsBasedOnAlpha(regions: Array<any>): void {
        this.regionsBasedOnAlpha = regions
    }

    @Mutation
    setSelectedCountry(country: CountryModel): void {
        this.selectedCountry = country
    }

    @Action
    async getCountriesFromRemote(): Promise<void> {
        await api.get('countries/')
            .then((response: ResponseData) => {
                const data: CountryModel = response.data
                this.context.commit('setCountries', data)
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    // @TODO na ginoun ola try?
    @Action
    findRegionsBasedOnAlphaForLoggedCustomer(): void {
        const country = this.context.getters['getSelectedCountry']
        // check if user has country saved in his profile
        if(country && Object.keys(country).length > 0) {
            this.context.commit('setSelectedCountry', country)
            this.context.commit('setRegionsBasedOnAlpha', country.regions)
        }

    }

    @Action
    async findRegionsBasedOnAlphaFromInput(countryAlpha2Key: string): Promise<void> {
        const country = <CountryModel>find(this.countries, ['alpha_2', countryAlpha2Key])
        await this.context.commit('setSelectedCountry', country)
        await this.context.commit('setRegionsBasedOnAlpha', country.regions)
    }
}
