import { CountriesQuery, Country } from '~/zod/country/country'
import { Pagination } from '~/zod/pagination/pagination'

export interface CountryState {
	countries: Pagination<Country>
	country: Country | null
	pending: boolean
	error: string | undefined
}

export const useCountryStore = defineStore({
	id: 'country',
	state: (): CountryState => ({
		countries: {
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
		country: null as Country | null,
		pending: false,
		error: undefined as string | undefined
	}),
	getters: {
		getCountries: (state) => {
			return state.countries
		},
		getCountry: (state) => {
			return state.country
		}
	},
	actions: {
		async initCountries(params?: CountriesQuery) {
			const {
				data: countries,
				error,
				pending
			} = await useFetch(`/api/countries`, {
				method: 'get',
				params
			})
			if (pending) {
				this.pending = true
			}
			if (error) {
				this.error = error.value?.statusMessage || error.value?.message
			}
			if (countries.value) {
				this.countries = countries.value
			}
		}
	}
})
