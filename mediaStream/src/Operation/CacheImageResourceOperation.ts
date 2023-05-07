import { HttpService } from '@nestjs/axios'
import { Injectable, Scope } from '@nestjs/common'
import { existsSync, readFileSync, writeFileSync, unlink } from 'fs'
import ResourceMetaData from '../DTO/ResourceMetaData'
import CacheImageRequest from '../API/DTO/CacheImageRequest'
import { ResourceIdentifierKP } from '../API/Constant/KeyProperties'
import FetchResourceResponseJob from '../Job/FetchResourceResponseJob'
import WebpImageManipulationJob from '../Job/WebpImageManipulationJob'
import ValidateCacheImageRequestRule from '../Rule/ValidateCacheImageRequestRule'
import StoreResourceResponseToFileJob from '../Job/StoreResourceResponseToFileJob'
import GenerateResourceIdentityFromRequestJob from '../Job/GenerateResourceIdentityFromRequestJob'

@Injectable({ scope: Scope.REQUEST })
export default class CacheImageResourceOperation {
	constructor(
		private readonly httpService: HttpService,
		private readonly validateCacheImageRequest: ValidateCacheImageRequestRule,
		private readonly fetchResourceResponseJob: FetchResourceResponseJob,
		private readonly webpImageManipulationJob: WebpImageManipulationJob,
		private readonly storeResourceResponseToFileJob: StoreResourceResponseToFileJob,
		private readonly generateResourceIdentityFromRequestJob: GenerateResourceIdentityFromRequestJob
	) {}

	request: CacheImageRequest

	id: ResourceIdentifierKP

	metaData: ResourceMetaData

	get getResourcePath(): string {
		return `${process.cwd()}/storage/${this.id}.rsc`
	}

	get getResourceTempPath(): string {
		return `${process.cwd()}/storage/${this.id}.rst`
	}

	get getResourceMetaPath(): string {
		return `${process.cwd()}/storage/${this.id}.rsm`
	}

	get resourceExists(): boolean {
		if (!existsSync(this.getResourcePath)) return false

		if (!existsSync(this.getResourceMetaPath)) return false

		const headers = this.getHeaders

		if (!headers.version || 1 !== headers.version) return false

		return headers.dateCreated + headers.privateTTL > Date.now()
	}

	get getHeaders(): ResourceMetaData {
		if (null === this.metaData)
			this.metaData = JSON.parse(
				readFileSync(this.getResourceMetaPath) as unknown as string
			)

		return this.metaData
	}

	public async setup(cacheImageRequest: CacheImageRequest): Promise<void> {
		this.request = cacheImageRequest
		await this.validateCacheImageRequest.setup(this.request)
		await this.validateCacheImageRequest.apply()
		this.id = await this.generateResourceIdentityFromRequestJob.handle(this.request)
		this.metaData = null
	}

	public async execute(): Promise<void> {
		if (this.resourceExists) {
			return
		}

		const response = await this.fetchResourceResponseJob.handle(this.request)
		await this.storeResourceResponseToFileJob.handle(
			this.request.resourceTarget,
			this.getResourceTempPath,
			response
		)
		const manipulationResult = await this.webpImageManipulationJob.handle(
			this.getResourceTempPath,
			this.getResourcePath,
			this.request.resizeOptions
		)

		const resourceMetaDataOptions = {
			size: manipulationResult.size,
			format: manipulationResult.format,
			p: this.request.ttl,
			dateCreated: Date.now()
		} as unknown as ResourceMetaData
		if (this.request.ttl) {
			resourceMetaDataOptions['privateTTL'] = this.request.ttl
		}
		this.metaData = new ResourceMetaData(resourceMetaDataOptions)

		writeFileSync(this.getResourceMetaPath, JSON.stringify(this.metaData))
		unlink(this.getResourceTempPath, (err) => {
			if (null !== err) console.error(err)
		})
	}
}
