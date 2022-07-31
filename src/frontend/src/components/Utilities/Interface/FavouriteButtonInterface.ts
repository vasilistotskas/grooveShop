import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export default interface FavouriteButtonInterface<TModel> {
  readonly model: TModel
  readonly getterType: string
  readonly dispatchType: string
  readonly icon: IconDefinition
  readonly isFavourite: boolean
  readonly useStore: boolean
  favouriteHandle(): Promise<void>
}
