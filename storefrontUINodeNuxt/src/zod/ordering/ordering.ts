import { LocationQueryValue } from 'vue-router'

export interface OrderingOption {
	value?: string
	label?: string
}

export type OrderingOptions = {
	[key: string]: OrderingOption[]
}

export type OrderingQuery = {
	ordering: string | LocationQueryValue[] | undefined
}
