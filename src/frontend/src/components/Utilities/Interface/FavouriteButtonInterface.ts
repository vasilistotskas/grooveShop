import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export default interface FavouriteButtonInterface<TPaginatedModel> {

	readonly model: RM
	readonly getterType: string
	readonly dispatchType: string
	readonly icon: IconDefinition
	readonly isFavourite: boolean;
	readonly useStore: boolean;
	favouriteHandle(): Promise<void>

}