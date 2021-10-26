import EntityBase from '@/state/common/EntityBase'
import EntityBaseTransformable from '@/state/common/EntityBaseTransformable'

export default abstract class EntityDTO<D extends EntityDTO<D, B>, B extends EntityBase>
	extends EntityBaseTransformable<D, B>
{
	public constructor(data?: Partial<D>){
		super()
		Object.assign(this, data)
	}

	abstract findFieldFromBase(field: keyof B): Promise<keyof D>
}
