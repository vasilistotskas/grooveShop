import EntityUpdatable from '@/state/common/EntityUpdatable'
import EntityUpdatableItemFieldType from '@/state/common/EntityUpdatableItemFieldType'
import EntityUpdatableTypes from '@/state/common/EntityUpdatableTypes'
import AppSettings from '@/state/app/AppSettings'
import AppSettingsLocalizationOption from '@/state/app/AppSettingsLocalizationOption'

export default class AppSettingsUpdatable extends EntityUpdatable<AppSettingsUpdatable, AppSettings> {
	localization!: EntityUpdatableItemFieldType<AppSettingsLocalizationOption, EntityUpdatableTypes>
	public makeEntityBase(): AppSettings {
		return AppSettingsUpdatable.makeEntityBase(this)
	}
	static makeEntityBase(entityUpdatable: AppSettingsUpdatable): AppSettings {
		return new AppSettings({
			localization: entityUpdatable.localization.value,
		})
	}

	public async transformFromEntityBase(entity: Partial<AppSettings>): Promise<void> {
		this.setupInputFieldSimpleDropdown(
			'localization',
			'localization',
			entity,
			AppSettingsLocalizationOption as unknown as Record<string, never>,
			'update.dynamic.localization'
		)
	}

}