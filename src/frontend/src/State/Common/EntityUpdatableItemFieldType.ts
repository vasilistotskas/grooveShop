export default class EntityUpdatableItemFieldType<V, T> {
	value!: V
	type!: T
	options?: Record<string, never>

	constructor(data?: Partial<EntityUpdatableItemFieldType<V, T>>) {
		Object.assign(this, data)
	}
}
