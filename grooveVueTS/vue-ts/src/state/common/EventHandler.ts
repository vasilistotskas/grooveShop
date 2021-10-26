export default class EventHandler {

	action: string

	payload: unknown = null

	constructor(action: string, payload?: unknown) {
		this.action = action
		this.payload = payload
	}

}