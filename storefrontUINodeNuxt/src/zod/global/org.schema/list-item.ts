export default class ListItem {
	'@context': 'https://schema.org'
	'@type': 'ListItem'
	itemListElement?: []
	numberOfItems?: number
	position?: number
	name?: string
	url?: string
	item?: string

	constructor(data?: Partial<ListItem>) {
		Object.assign(this, data)
	}
}
