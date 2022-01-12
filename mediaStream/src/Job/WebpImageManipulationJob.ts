import { each } from 'lodash'
import * as sharp from 'sharp'
import { Injectable, Scope } from '@nestjs/common'
import { ResizeOptions } from '../API/DTO/CacheImageRequest'
import ManipulationJobResult from '../DTO/ManipulationJobResult'

@Injectable({ scope: Scope.REQUEST })
export default class WebpImageManipulationJob {

	async handle(filePathFrom: string, filePathTo: string, options: ResizeOptions): Promise<ManipulationJobResult> {
		const manipulation = sharp(filePathFrom)
			.webp({ quality: options.quality })

		const resizeScales: Record<string, number> = {}
		each(['width', 'height'], scale => {
			if (null !== options[scale] && !isNaN(options[scale]))
				resizeScales[scale] = Number(options[scale])
		})

		if (Object.keys(resizeScales).length > 0) {
			manipulation.resize({
				...resizeScales,
				fit: options.fit,
				background: { r: 255, g: 255, b: 255, alpha: 1 }
			})
		}

		const manipulatedFile = await manipulation.toFile(filePathTo)

		return new ManipulationJobResult({
			size: String(manipulatedFile.size),
			format: manipulatedFile.format
		})
	}

}