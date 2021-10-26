import AppBaseModule from '@/state/common/AppBaseModule'
import EntityBase from '@/state/common/EntityBase'
import { Action, Mutation } from 'vuex-module-decorators'
import EntityDTO from '@/state/common/EntityDTO'

export default abstract class AbstractBaseEntityModule<D extends EntityDTO<D, B>, B extends EntityBase, KPT>
	extends AppBaseModule
{

	items: Array<B> = []

	get getItems (): Array<B> {
		return this.items
	}

	@Action
	async setItemsFromDTOArray(dtoItems: Array<D>): Promise<Array<B>> {
		const items = [] as Array<B>
		await Promise.all(Object.entries(dtoItems).map(([idx, item]) => items.push(item.makeEntityBase())))
		await this.context.commit('setItems', items)
		return items
	}

}