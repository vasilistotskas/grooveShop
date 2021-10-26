import EntityBase from '@/state/common/EntityBase'
import EntityDTO from '@/state/common/EntityDTO'
import AbstractBaseEntityModule from '@/state/common/AbstractBaseEntityModule'
import { Action, Mutation } from 'vuex-module-decorators'

export default abstract class AbstractBasketableBaseEntityModule<D extends EntityDTO<D, B>, B extends EntityBase, KPT>
	extends AbstractBaseEntityModule<D, B, KPT>
{

	basket: Array<KPT> = []

	get getBasket(): Array<KPT> {
		return this.basket
	}

	@Mutation
	clearBasket(): void {
		this.basket = []
	}

	@Mutation
	addToBasket(itemId: KPT): void {
		this.basket.push(itemId)
	}

	@Mutation
	removeFromBasket(itemId: KPT): void {
		// Vue.delete(this.basket, this.basket.findIndex((basketItemId) => basketItemId === itemId))
	}

	@Action
	public async addOrRemoveFromBasket(itemId: KPT): Promise<void> {
		const exists = await this.context.dispatch('existsInBasket', itemId)
		if (exists) {
			this.context.commit('removeFromBasket', itemId)
		} else {
			this.context.commit('addToBasket', itemId)
		}
	}

	@Action
	public async existsInBasket(itemId: KPT): Promise<boolean> {
		return this.basket.includes(itemId)
	}

}