import store from '@/dynamicStore'
import api from '@/api/api.service'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import ProductFavouriteModel from '@/state/product/favourite/ProductFavouriteModel'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'productFavourite',
})
export default class ProductFavouriteModule extends AppBaseModule {
  favourites: Array<ProductFavouriteModel> = []
  userFavourites: Array<ProductFavouriteModel> = []

  get getFavouriteData(): Array<ProductFavouriteModel> {
    return this.favourites
  }

  get getUserFavouriteData(): Array<ProductFavouriteModel> {
    return this.userFavourites
  }

  get getIsCurrentProductInUserFavourites(): boolean {
    const productId: number = store.getters['product/getProductId']
    const favouriteProducts = this.context.getters['getFavouriteData']
    const exists = favouriteProducts.filter(
      (i: ProductFavouriteModel) => i.product_id === productId
    )
    return !!exists.length
  }

  @Mutation
  setFavourites(favourites: Array<ProductFavouriteModel>): void {
    this.favourites = favourites
  }

  @Mutation
  unsetFavourites(): void {
    this.favourites = []
  }

  @Mutation
  setUserFavourites(favourites: Array<ProductFavouriteModel>): void {
    this.userFavourites = favourites
  }

  @Mutation
  unsetUserFavourites(): void {
    this.userFavourites = []
  }

  @Action
  async toggleFavourite(product: ProductFavouriteModel): Promise<boolean> {
    try {
      if (!this.getIsCurrentProductInUserFavourites) {
        return await this.context.dispatch('addProductToFavourites', product)
      } else {
        return await this.context.dispatch('removeProductFavourites', product)
      }
    } catch (error) {
      console.log(error)
    }

    return false
  }

  @Action
  fetchUserFavouritesFromRemote(userId: number): Promise<void> {
    return api
      .get(`favourites/${userId}`)
      .then((response: AxiosResponse<Array<ProductFavouriteModel>>) => {
        const data = response.data
        this.context.commit('setFavourites', data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  @Action
  async addProductToFavourites(): Promise<boolean> {
    const productId: number = store.getters['product/getProductId']
    const data = {
      user_id: store.getters['user/getUserId'],
      product_id: productId,
    }
    const userId: number = data.user_id

    await api.post(`favourites/${userId}/`, data)

    await this.context.dispatch('fetchUserFavouritesFromRemote', userId)

    return true
  }

  @Action
  async removeProductFavourites(): Promise<boolean> {
    const userId: number = store.getters['user/getUserId']
    const productId: number = store.getters['product/getProductId']

    await api.delete(`favourites/delete/${userId}/${productId}`)

    await this.context.dispatch('fetchUserFavouritesFromRemote', userId)

    return false
  }
}
