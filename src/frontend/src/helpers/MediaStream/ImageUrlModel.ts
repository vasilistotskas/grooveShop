import session from '@/api/session'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

export default class ImageUrlModel {
	private static mediaStreamPath: string = '/mediastream/media/uploads/'
	private static imageType: string
	private static imageName: string
	private static width?: string
	private static height?: string
	private static fit?: ImageFitOptions
	private static position?: ImagePositionOptions
	private static trimThreshold?: number | string

	constructor(data: Partial<ImageUrlInterface>) {
		ImageUrlModel.imageType = data.imageType ?? ''
		ImageUrlModel.imageName = data.imageName ?? ''
		ImageUrlModel.width = data?.width ?? ''
		ImageUrlModel.height = data?.height ?? ''
		ImageUrlModel.fit = data?.fit ?? ImageFitOptions.no_fit
		ImageUrlModel.position = data?.position ?? ImagePositionOptions.no_position
		ImageUrlModel.trimThreshold = data?.trimThreshold ?? ''
		Object.assign(this, data)
	}

	private static buildImageUrl(): string {
		let fit = ''
		let position = ''
		let trimThreshold = ''
		if (this.fit != '') {
			fit = this.fit + '/'
		}
		if (this.position != '') {
			position = this.position + '/'
		}
		if (this.trimThreshold != '') {
			trimThreshold = this.trimThreshold as string
		}
		return 'http://localhost:8010' +
			this.mediaStreamPath +
			this.imageType + '/' +
			this.buildImageNameFileTypeRemove() + '/' +
			this.width + '/' +
			this.height + '/' +
			fit +
			position +
			trimThreshold
	}

	private static buildApiUrl(): string {
		let fit = ''
		let position = ''
		let trimThreshold = ''
		if (this.fit != '') {
			fit = this.fit + '/'
		}
		if (this.position != '') {
			position = this.position + '/'
		}
		if (this.trimThreshold != '') {
			trimThreshold = this.trimThreshold as string
		}
		return this.mediaStreamPath +
			this.imageType + '/' +
			this.buildImageNameFileTypeRemove() + '/' +
			this.width + '/' +
			this.height + '/' +
			fit +
			position +
			trimThreshold
	}

	private static buildImageNameFileTypeRemove(): string {
		return ImageUrlModel.imageName.substring(0, ImageUrlModel.imageName.lastIndexOf('.')) || ImageUrlModel.imageName
	}

	public async buildMediaStreamImageUrl(): Promise<string> {
		const image = ImageUrlModel.buildImageUrl()

		const ApiUrl = ImageUrlModel.buildApiUrl()

		const imageUrl = async(): Promise<string> => {
			const response = await session({
				url: ApiUrl,
				method: 'GET'
			})
				.then((response: any) => {
					return image
				})
				.catch((e: Error) => {
					return 'http://localhost:8010/backend/static/images/no_photo.jpg'
				})
			return response as unknown as string
		}

		return await imageUrl()
	}

}