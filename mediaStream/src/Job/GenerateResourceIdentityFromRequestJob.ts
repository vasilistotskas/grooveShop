import { v5 as uuid5 } from 'uuid'
import { cloneDeep } from 'lodash'
import { Injectable, Scope } from '@nestjs/common'
import CacheImageRequest from '../API/DTO/CacheImageRequest'
import { ResourceIdentifierKP } from '../API/Constant/KeyProperties'

@Injectable({ scope: Scope.REQUEST })
export default class GenerateResourceIdentityFromRequestJob {
	async handle(cacheImageRequest: CacheImageRequest): Promise<ResourceIdentifierKP> {
		const request = cloneDeep(cacheImageRequest)
		return uuid5(JSON.stringify(request), uuid5.URL)
	}
}
