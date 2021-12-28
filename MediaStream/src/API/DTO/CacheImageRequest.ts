import { each } from 'lodash'

export enum SupportedResizeFormats {
	webp = 'webp',
  jpeg = 'jpeg',
  png = 'png',
  gif = 'gif'
}

export enum FitOptions {
	contain = 'contain',
	cover = 'cover',
	fill = 'fill',
	inside = 'inside',
	outside = 'outside'
}

export class ResizeOptions {
	width: number = null
	height: number = null
	fit = FitOptions.contain
	format = SupportedResizeFormats.webp
	quality = 80

	constructor(data?: Partial<ResizeOptions>) {
		Object.assign(this, data)
		each(['width', 'height'], sizeOption => {
			if (null === data[sizeOption])
				delete this[sizeOption]
		})
	}
}

export default class CacheImageRequest {
	resourceTarget: string
	ttl?: number
	resizeOptions: ResizeOptions

	constructor(data?: Partial<CacheImageRequest>) {
		Object.assign(this, data)
	}
}