import {
	ImageFitOptions,
	ImageFormatOptions,
	ImagePathOptions,
	ImagePositionOptions,
	ImageTypeOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'ImageCore'
})
export default class ImageCore extends Vue {
	ImageTypeOptions = ImageTypeOptions
	ImagePositionOptions = ImagePositionOptions
	ImageFitOptions = ImageFitOptions
	ImageFormatOptions = ImageFormatOptions
	ImagePathOptions = ImagePathOptions
}
