export default class ManipulationJobResult {
	size: string
	format: string

	constructor(data?: Partial<ManipulationJobResult>) {
		Object.assign(this, data)
	}
}
