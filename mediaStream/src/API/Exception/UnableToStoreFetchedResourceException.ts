export default class UnableToStoreFetchedResourceException extends Error {
	constructor(resource: string) {
		super(`Requested resource: ${resource} couldn't be stored`)
	}
}
