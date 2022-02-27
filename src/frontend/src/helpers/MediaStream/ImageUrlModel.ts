import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'

export default class ImageUrlModel {

	static buildMediaStreamImageUrl(mediaStreamImageData: ImageUrlInterface) {
		const mediaStreamPath: string = '/mediastream/media/uploads/'
		const imageNameFileTypeRemove: string = mediaStreamImageData.imageName.substring(0, mediaStreamImageData.imageName.lastIndexOf('.')) || mediaStreamImageData.imageName

		const width: string = mediaStreamImageData.width ? mediaStreamImageData.width + '/' : ''
		const height: string = mediaStreamImageData.height ? mediaStreamImageData.height + '/' : ''
		const fit: string = mediaStreamImageData.fit ? mediaStreamImageData.fit + '/' : ''
		const position: string = mediaStreamImageData.position ? mediaStreamImageData.position + '/' : ''
		const trimThreshold: number|string = mediaStreamImageData.trimThreshold ? mediaStreamImageData.trimThreshold : ''
		const image = 'http://localhost:8010' +
			mediaStreamPath +
			mediaStreamImageData.imageType + '/' +
			imageNameFileTypeRemove + '/' +
			width +
			height +
			fit +
			position +
			trimThreshold

		return image
	}
}