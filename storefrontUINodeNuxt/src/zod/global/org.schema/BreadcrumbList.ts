import ListItem from '~/zod/global/org.schema/ListItem'

export class BreadcrumbList {
	'@context': 'https://schema.org'
	'@type': 'BreadcrumbList'
	itemListElement: ListItem[] = []

	constructor(data?: Partial<BreadcrumbList>) {
		Object.assign(this, data)
		this.itemListElement = this.itemListElement.map((item, idx) => {
			return new ListItem({
				...item
			})
		})
	}

	toJSON(): string {
		return JSON.stringify({
			'@context': this['@context'],
			'@type': this['@type'],
			itemListElement: this.itemListElement
		})
	}
}
