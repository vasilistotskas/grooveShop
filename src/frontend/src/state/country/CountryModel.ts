import EntityBase from '@/state/common/EntityBase'
import RegionsModel from '@/state/country/RegionsModel'

export default class CountryModel extends EntityBase {

	name!: string
	alpha_2!: string
	alpha_3!: string
	iso_cc!: number
	phone_code!: number
	regions!: RegionsModel

	public constructor(data?: Partial<CountryModel>) {
		super(data)
	}

}