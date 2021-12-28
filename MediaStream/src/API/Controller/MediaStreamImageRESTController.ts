import { Response } from 'express'
import { createReadStream } from 'fs'
import { HttpService } from '@nestjs/axios'
import { Controller, Get, Param, Res, Scope } from '@nestjs/common'
import Locales from '../../Type/LocalesType'
import { ProductKP } from '../../Type/ProductKeyProperties'
import { CategoryKP } from '../../Type/CategoryKeyProperties'
import ResourceMetaData from '../../DTO/ResourceMetaData'
import { IMAGE, VERSION } from '../Constant/RoutePrefixes'
import CacheImageResourceOperation from '../../Operation/CacheImageResourceOperation'
import CacheImageRequest, { FitOptions, ResizeOptions } from '../../API/DTO/CacheImageRequest'
import GenerateResourceIdentityFromRequestJob from '../../Job/GenerateResourceIdentityFromRequestJob'

@Controller({
	path: IMAGE,
	version: VERSION,
	scope: Scope.REQUEST
})
export default class MediaStreamImageRESTController {

	constructor(
		private readonly httpService: HttpService,
		private readonly generateResourceIdentityFromRequestJob: GenerateResourceIdentityFromRequestJob,
		private readonly cacheImageResourceOperation: CacheImageResourceOperation
	){}

	private static addHeadersToRequest(res: Response, headers: ResourceMetaData): Response {
		const expiresAt = Date.now() + headers.publicTTL
		return res
			.header('Content-Type', `image/${headers.format}`)
			.header('Content-Length', headers.size)
			.header('Cache-Control', `age=${headers.publicTTL / 1000}, public`)
			.header('Expires', new Date(expiresAt).toUTCString())
	}

	// px http://localhost:3003/media_stream-image/media/uploads/products/charger2/500/500
	@Get('media/uploads/:imageType/:imageName/:width?/:height?')
	public async image(
		@Param('imageType') imageType: string,
		@Param('imageName') imageName: string,
		@Param('type') type: 'icon'|'image',
		@Param('width') width: number = null,
		@Param('height') height: number = null,
		@Res() res: Response
	): Promise<void> {
		const request = new CacheImageRequest({
			resourceTarget: `http://localhost:8000/media/uploads/${imageType}/${imageName}.jpg`,
			resizeOptions: new ResizeOptions({
				width,
				height,
				fit: ('icon' === type) ? FitOptions.contain : FitOptions.cover
			})
		})
		await this.streamRequestedResource(request, res)
	}

	private async streamRequestedResource(request: CacheImageRequest, res: Response): Promise<void> {
		await this.cacheImageResourceOperation.setup(request)
		if (this.cacheImageResourceOperation.resourceExists) {
			const headers = this.cacheImageResourceOperation.getHeaders
			res = MediaStreamImageRESTController.addHeadersToRequest(res, headers)
			const stream = createReadStream(this.cacheImageResourceOperation.getResourcePath).pipe(res)
			try {
				await new Promise((resolve, reject) => {
					stream.on('finish', () => resolve)
					stream.on('error', () => reject)
				})
			} catch (e) {
				// ignore failed stream to client for now
			} finally {
				await this.cacheImageResourceOperation.execute()
			}
		} else {
			await this.cacheImageResourceOperation.execute()
			const headers = await this.cacheImageResourceOperation.getHeaders
			res = MediaStreamImageRESTController.addHeadersToRequest(res, headers)
			createReadStream(this.cacheImageResourceOperation.getResourcePath).pipe(res)
		}
	}
}