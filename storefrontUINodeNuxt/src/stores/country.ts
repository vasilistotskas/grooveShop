import { FetchError } from 'ofetch'
import { CountriesQuery, Country } from '~/zod/country/country'
import { Pagination } from '~/zod/pagination/pagination'

export interface CountryState {
	countries: Pagination<Country>
	country: Country | null
	pending: boolean
	error: FetchError<unknown> | null
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
			pageTotalResults: 0,
			pageSize: 0,
			page: 0,
			results: []
		},
		country: null as Country | null,
		pending: true,
		error: null as FetchError<unknown> | null
	}),
	actions: {
		async fetchCountries(params?: CountriesQuery) {
			this.pending = true
			const {
				data: countries,
				error,
				pending
			} = await useFetch(`/api/countries`, {
				method: 'get',
				params
			})
			this.error = error.value?.data
			if (error.value) {
				const errorMessage = `Error: ${error.value?.data.data.detail} ${
					error.value?.statusMessage ? '(' + error.value?.statusMessage + ')' : ''
				}`
				throw new Error(errorMessage)
			}
			if (countries.value) {
				this.countries = countries.value
			}
			this.pending = pending.value
		}
	}
})
