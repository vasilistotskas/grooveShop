export default class UnableToFetchResourceException extends Error {
	constructor(resource: string) {
		super(`Requested resource: ${resource} couldn't be fetched`)
	}
}
