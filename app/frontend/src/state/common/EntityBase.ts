export default abstract class EntityBase
{
	public constructor(data?: Partial<EntityBase>){
		Object.assign(this, data)
	}
}
