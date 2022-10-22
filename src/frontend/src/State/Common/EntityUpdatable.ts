import EntityBase from '@/State/Common/EntityBase'
import EntityUpdatableTransformable from '@/State/Common/EntityUpdatableTransformable'
import EntityUpdatableItemFieldValueReference from '@/State/Common/EntityUpdatableItemFieldValueReference'

export default abstract class EntityUpdatable<
	U extends EntityUpdatable<U, B>,
	B extends EntityBase
> extends EntityUpdatableTransformable<U, B> {
	_meta!: Record<string, never>

	public constructor(data?: Partial<EntityUpdatable<U, B>>) {
		super()
		Object.assign(this, data)
	}

	public preMutation(fieldReference: EntityUpdatableItemFieldValueReference): void {
		// Override this to manipulate object at the beginning of the mutation
		console.log(fieldReference)
		return
	}

	public postMutation(fieldReference: EntityUpdatableItemFieldValueReference): void {
		// Override this to manipulate object at the end of the mutation
		console.log(fieldReference)
		return
	}
}
