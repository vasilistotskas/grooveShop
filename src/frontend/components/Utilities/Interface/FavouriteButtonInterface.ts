import { VuexModule } from 'vuex-module-decorators'
import { DynamicStoreType } from '@/renderer/dynamicStore'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export default interface FavouriteButtonInterface<TModule extends VuexModule<DynamicStoreType>> {
  readonly model: Record<string, never>
  readonly module: VuexModule<TModule>
  readonly getterType: string
  readonly dispatchType: string
  readonly icon: IconDefinition
  readonly isFavourite: boolean
  readonly useStore: boolean
  favouriteHandle(): Promise<void>
  getIsFavourite: boolean
}
