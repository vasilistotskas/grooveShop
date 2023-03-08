export interface OrderingOption {
	value?: string
	label?: string
}

export type OrderingOptions = {
	[key: string]: OrderingOption[]
}

export type OrderingQuery = {
	[key: string]: string | number
}
