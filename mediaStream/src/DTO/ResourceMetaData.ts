export const defaultPrivateTTL = 1 * 60 * 60 * 1000 // 1 hour * 60 minutes * 60 seconds * 1000ms
export const defaultPublicTTL = 24 * 60 * 60 * 1000 // 24 hours * 60 minutes * 60 seconds * 1000ms
export const resourceMetaVersion = 1

export default class ResourceMetaData {
	version: number
	size: string
	format: string
	dateCreated: number
	privateTTL: number
	publicTTL: number

	constructor(data?: Partial<ResourceMetaData>) {
		if (!data.version) this.version = resourceMetaVersion
		if (!data.publicTTL) this.publicTTL = defaultPublicTTL
		if (!data.privateTTL) this.privateTTL = defaultPrivateTTL
		Object.assign(this, data)
	}
}
