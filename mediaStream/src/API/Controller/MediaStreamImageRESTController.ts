import { Response } from 'express'
import { createReadStream } from 'fs'
import { HttpService } from '@nestjs/axios'
import { Controller, Get, Param, Res, Scope } from '@nestjs/common'
import ResourceMetaData from '../../DTO/ResourceMetaData'
import { IMAGE, VERSION } from '../Constant/RoutePrefixes'
import CacheImageResourceOperation from '../../Operation/CacheImageResourceOperation'
import CacheImageRequest, { FitOptions, ResizeOptions, PositionOptions } from '../../API/DTO/CacheImageRequest'
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
	@Get('media/uploads/:imageType/:imageName/:width?/:height?/:fit?/:position?/:trimThreshold?/:format?')
	public async uploadedImage(
		@Param('imageType') imageType: string,
		@Param('imageName') imageName: any,
		@Param('width') width: number = null,
		@Param('height') height: number = null,
		@Param('fit') fit: FitOptions = FitOptions.contain,
		@Param('position') position = PositionOptions.entropy,
		@Param('trimThreshold') trimThreshold = 5,
		@Param('format') format: 'jpg'|'jpeg'|'png'|'webp' = 'jpg',
		@Res() res: Response
	): Promise<void> {
		const request = new CacheImageRequest({
			resourceTarget: `http://backend:8001/backend/media/uploads/${imageType}/${imageName}.${format}`,
			resizeOptions: new ResizeOptions({
				width,
				height,
				position,
				fit,
				trimThreshold
			})
		})
		await this.streamRequestedResource(request, res)
	}

	@Get('static/images/:imageName/:width?/:height?/:fit?/:position?/:trimThreshold?/:format?')
	public async staticImage(
		@Param('imageType') imageType: string,
		@Param('imageName') imageName: string,
		@Param('width') width: number = null,
		@Param('height') height: number = null,
		@Param('fit') fit: FitOptions = FitOptions.contain,
		@Param('position') position = PositionOptions.entropy,
		@Param('trimThreshold') trimThreshold = 5,
		@Param('format') format: 'jpg'|'jpeg'|'png'|'webp' = 'jpg',
		@Res() res: Response
	): Promise<void> {
		const request = new CacheImageRequest({
			resourceTarget: MediaStreamImageRESTController.resourceTargetPrepare(`http://backend:8001/backend/static/images/${imageName}.${format}`),
			resizeOptions: new ResizeOptions({
				width,
				height,
				position,
				fit,
				trimThreshold
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

	private static resourceTargetPrepare(resourceTarget: any): string {
		return resourceTarget;
	}

}
