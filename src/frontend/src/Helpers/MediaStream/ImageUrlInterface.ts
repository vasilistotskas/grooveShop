import {
  ImageFitOptions,
  ImageFormatOptions,
  ImagePositionOptions,
  ImagePathOptions,
  ImageTypeOptions,
} from '@/Helpers/MediaStream/ImageUrlEnum'

export default interface ImageUrlInterface {
  pathType: ImagePathOptions
  imageType: ImageTypeOptions
  fileName: string
  width?: number
  height?: number
  fit?: ImageFitOptions
  position?: ImagePositionOptions
  trimThreshold?: number
  format?: ImageFormatOptions
}