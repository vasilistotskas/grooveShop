import { each } from 'lodash'

interface RGBA {
	r?: number | undefined
	g?: number | undefined
	b?: number | undefined
	alpha?: number | undefined
}

type Color = string | RGBA

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
	attention = 'attention'
}

export enum BackgroundOptions {
	white = '#FFFFFF',
	black = '#000000',
	transparent = 'transparent'
}

export enum FitOptions {
	contain = 'contain',
	cover = 'cover',
	fill = 'fill',
	inside = 'inside',
	outside = 'outside'
}

function parseColor(color: string): RGBA {
	// Convert the background property from a hex color string to an RGBA color object
	if (typeof color === 'string') {
		if (color === 'transparent') {
			return {
				r: 0,
				g: 0,
				b: 0,
				alpha: 0
			}
		}
		if (color[0] === '#') {
			color = color.slice(1)
		}
		if (color.length === 3) {
			color = color
				.split('')
				.map(function (char) {
					return char + char
				})
				.join('')
		}
		const num = parseInt(color, 16)
		const colorToRgba = {
			r: num >> 16,
			g: (num >> 8) & 255,
			b: num & 255,
			alpha: 1
		}
		return colorToRgba
	}
	return color
}

export class ResizeOptions {
	width: number = null
	height: number = null
	fit = FitOptions.contain
	position: PositionOptions | string = PositionOptions.entropy
	format = SupportedResizeFormats.webp
	background: Color = BackgroundOptions.white
	trimThreshold: null | number = null
	quality = 80

	constructor(data?: Partial<ResizeOptions>) {
		const {
			width,
			height,
			trimThreshold,
			background,
			fit,
			position,
			format,
			quality,
			...rest
		} = data || {}
		this.width = width ?? null
		this.height = height ?? null
		this.trimThreshold = trimThreshold ? Number(trimThreshold) : null
		this.background = typeof background === 'string' ? parseColor(background) : background
		this.fit = fit ?? FitOptions.contain
		this.position = position ?? PositionOptions.entropy
		this.format = format ?? SupportedResizeFormats.webp
		this.quality = quality ?? 80

		Object.assign(this, rest)
		each(['width', 'height'], (sizeOption) => {
			if (null === data[sizeOption]) delete this[sizeOption]
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
