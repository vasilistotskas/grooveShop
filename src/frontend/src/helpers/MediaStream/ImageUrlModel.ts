import session from '@/api/session'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'

export default class ImageUrlModel {

	static async buildMediaStreamImageUrl(mediaStreamImageData: ImageUrlInterface): Promise<string> {
		const mediaStreamPath = '/mediastream/media/uploads/'
		const imageNameFileTypeRemove: string = mediaStreamImageData.imageName.substring(0, mediaStreamImageData.imageName.lastIndexOf('.')) || mediaStreamImageData.imageName
		const width: string = mediaStreamImageData.width ? mediaStreamImageData.width + '/' : ''
		const height: string = mediaStreamImageData.height ? mediaStreamImageData.height + '/' : ''
		const fit: string = mediaStreamImageData.fit ? mediaStreamImageData.fit + '/' : ''
		const position: string = mediaStreamImageData.position ? mediaStreamImageData.position + '/' : ''
		const trimThreshold: number|string = mediaStreamImageData.trimThreshold ? mediaStreamImageData.trimThreshold : ''
		let image = 'http://localhost:8010' +
			mediaStreamPath +
			mediaStreamImageData.imageType + '/' +
			imageNameFileTypeRemove + '/' +
			width +
			height +
			fit +
			position +
			trimThreshold

		const ApiUrl = mediaStreamPath +
			mediaStreamImageData.imageType + '/' +
			imageNameFileTypeRemove + '/' +
			width +
			height +
			fit +
			position +
			trimThreshold

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