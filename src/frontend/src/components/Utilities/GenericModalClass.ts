import { inject } from 'vue'
import { Emitter } from 'mitt'
import { Options, Vue } from 'vue-class-component'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'

@Options({
	name: 'GenericModalClass',
	props: {
		shouldModalStartInOpenState: {
			type: Boolean,
			required: false,
			default: false
		},
		uniqueId: {
			type: String,
			required: true
		},
		closeBtnColor: {
			type: String,
			required: false,
			default: '#9A9A9B'
		},
	}
})
export default class GenericModalClass extends Vue {

	emitter: Emitter<any> | undefined = inject('emitter')

	isModalCurrentlyOpen: boolean = false
	shouldModalStartInOpenState!: boolean
	uniqueId!: string
	closeBtnColor!: string

	get getMyId(): string {
		return this.uniqueId
	}

	get getExitModalIcon(): typeof faTimes {
		return faTimes
	}

	openModal(): void {
		this.isModalCurrentlyOpen = true
	}

	closeModal(): void {
		this.isModalCurrentlyOpen = false
	}

	mounted(): void {
		this.isModalCurrentlyOpen = this.shouldModalStartInOpenState
	}

	created(): void {
		this.emitter!.on('modal-open', () => this.openModal())
		this.emitter!.on('modal-close', () => this.closeModal())
	}

}