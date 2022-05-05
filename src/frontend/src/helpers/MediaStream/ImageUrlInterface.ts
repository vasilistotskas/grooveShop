import { ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

export default interface ImageUrlInterface {
	imageType: string
	imageName: string
	width?: string
	height?: string
	fit?: ImageFitOptions,
	position?: ImagePositionOptions,
	trimThreshold?: number,
}