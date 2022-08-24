import { VuexModule } from 'vuex-module-decorators'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { getModule } from 'vuex-module-decorators/dist/types/vuexmodule'

export default interface FavouriteButtonInterface<TModule extends VuexModule> {
  readonly model: Record<string, never>
  readonly module: VuexModule<TModule>
  readonly getterType: string
  readonly dispatchType: string
  readonly icon: IconDefinition
  readonly isFavourite: boolean
  readonly useStore: boolean
  favouriteHandle(): Promise<void>
  getIsFavourite: boolean
  getModule(): typeof getModule<TModule>
}
