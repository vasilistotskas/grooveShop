import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export default interface FavouriteButtonInterface<RM> {

	readonly model: RM
	readonly getterType: string
	readonly dispatchType: string
	readonly icon: IconDefinition
	readonly isFavourite: boolean;
	favouriteHandle(): Promise<void>

}