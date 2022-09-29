import { each } from 'lodash'

export enum SupportedResizeFormats {
	webp = 'webp',
	jpeg = 'jpeg',
	png = 'png',
	gif = 'gif'
}

export enum PositionOptions {
	centre = 'centre',
	center = 'center',
	left = 'left',
	right = 'right',
	top = 'top',
	bottom = 'bottom',
	west = 'west',
	east = 'east',
	north = 'north',
	south = 'south',
	northwest = 'northwest',
	northeast = 'northeast',
	southwest = 'southwest',
	southeast = 'southeast',
	entropy = 'entropy',
	attention = 'attention',
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
	position: PositionOptions | string = PositionOptions.entropy
	format = SupportedResizeFormats.webp
	background = { r: 255, g: 255, b: 255, alpha: 1 }
	trimThreshold: null|number = null
	quality = 80

	constructor(data?: Partial<ResizeOptions>) {
		Object.assign(this, data)
		if (null !== data.trimThreshold)
			this.trimThreshold = Number(data.trimThreshold)
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
