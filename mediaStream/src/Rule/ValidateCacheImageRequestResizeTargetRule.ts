import { Injectable, Scope } from '@nestjs/common'
import CacheImageRequest from '../API/DTO/CacheImageRequest'
import RequestedResizeTargetTooLargeException from '../API/Exception/RequestedResizeTargetTooLargeException'

@Injectable({ scope: Scope.REQUEST })
export default class ValidateCacheImageRequestResizeTargetRule {
	allowedPixelCount = 2048 * 2048 //2K Squared

	request: CacheImageRequest = null

	public async setup(request: CacheImageRequest): Promise<void> {
		this.request = request
	}

	public async apply(): Promise<void> {
		const pixelCount =
			this.request.resizeOptions.width + this.request.resizeOptions.height
		if (pixelCount > this.allowedPixelCount)
			throw new RequestedResizeTargetTooLargeException(
				this.request.resizeOptions,
				this.allowedPixelCount
			)
	}
}
