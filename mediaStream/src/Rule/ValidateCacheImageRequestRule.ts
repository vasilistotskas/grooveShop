import { Injectable, Scope } from '@nestjs/common'
import CacheImageRequest from '../API/DTO/CacheImageRequest'
import ValidateCacheImageRequestResizeTargetRule from '../Rule/ValidateCacheImageRequestResizeTargetRule'

@Injectable({ scope: Scope.REQUEST })
export default class ValidateCacheImageRequestRule {
	constructor(
		private readonly validateCacheImageRequestResizeTargetRule: ValidateCacheImageRequestResizeTargetRule
	) {}

	request: CacheImageRequest = null

	public async setup(request: CacheImageRequest): Promise<void> {
		this.request = request
		await Promise.all([this.validateCacheImageRequestResizeTargetRule.setup(request)])
	}

	public async apply(): Promise<void> {
		await Promise.all([this.validateCacheImageRequestResizeTargetRule.apply()])
	}
}
