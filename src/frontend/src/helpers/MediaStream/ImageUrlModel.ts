import session from '@/api/session'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import {
  ImageFitOptions,
  ImageFormatOptions,
  ImagePathOptions,
  ImagePositionOptions,
} from '@/helpers/MediaStream/ImageUrlEnum'

export default class ImageUrlModel {
  private static mediaStreamPath = ''

  private static pathType: ImagePathOptions
  private static imageType: string
  private static fileName: string
  private static width?: number
  private static height?: number
  private static fit?: ImageFitOptions
  private static position?: ImagePositionOptions
  private static trimThreshold?: number
  private static format?: ImageFormatOptions

  constructor(data: Partial<ImageUrlInterface>) {
    ImageUrlModel.pathType = data.pathType ?? ImagePathOptions.media
    ImageUrlModel.imageType = data.imageType ?? ''
    ImageUrlModel.fileName = data.fileName ?? ''
    ImageUrlModel.width = data?.width ?? 1200
    ImageUrlModel.height = data?.height ?? 250
    ImageUrlModel.fit = data?.fit ?? ImageFitOptions.no_fit
    ImageUrlModel.position = data?.position ?? ImagePositionOptions.no_position
    ImageUrlModel.trimThreshold = data?.trimThreshold ?? 5
    ImageUrlModel.format = data?.format ?? ImageFormatOptions.no_format

    ImageUrlModel.mediaStreamPath = '/mediastream/media/uploads/'

    if (!(ImageUrlModel.pathType == ImagePathOptions.media)) {
      ImageUrlModel.mediaStreamPath = '/mediastream/static/images'
    }

    Object.assign(this, data)
  }

  private static buildImageUrl(): string {
    let fit = ''
    let position = ''
    const trimThreshold = 5
    let format = ''
    if (this.fit != '') {
      fit = this.fit + '/'
    }
    if (this.position != '') {
      position = this.position + '/'
    }
    if (this.format != '') {
      format = this.format as string
    }

    return (
      'http://localhost:8010' +
      this.mediaStreamPath +
      this.imageType +
      '/' +
      this.buildImageNameFileTypeRemove() +
      '/' +
      this.width +
      '/' +
      this.height +
      '/' +
      fit +
      position +
      trimThreshold +
      '/' +
      format
    )
  }

  private static buildApiUrl(): string {
    let fit = ''
    let position = ''
    const trimThreshold = 5
    let format = ''
    if (this.fit != '') {
      fit = this.fit + '/'
    }
    if (this.position != '') {
      position = this.position + '/'
    }
    if (this.format != '') {
      format = this.format as string
    }

    return (
      this.mediaStreamPath +
      this.imageType +
      '/' +
      this.buildImageNameFileTypeRemove() +
      '/' +
      this.width +
      '/' +
      this.height +
      '/' +
      fit +
      position +
      trimThreshold +
      '/' +
      format
    )
  }

  private static buildImageNameFileTypeRemove(): string {
    return (
      ImageUrlModel.fileName.substring(0, ImageUrlModel.fileName.lastIndexOf('.')) ||
      ImageUrlModel.fileName
    )
  }

  public async buildMediaStreamImageUrl(): Promise<string> {
    const image = ImageUrlModel.buildImageUrl()

    const ApiUrl = ImageUrlModel.buildApiUrl()

    const imageUrl = async (): Promise<string> => {
      const response = await session({
        url: ApiUrl,
        method: 'GET',
      })
        .then(() => {
          return image
        })
        .catch(() => {
          return 'http://localhost:8010/backend/static/images/no_photo.jpg'
        })
      return response as unknown as string
    }

    return await imageUrl()
  }
}
