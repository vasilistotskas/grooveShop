import AppSettings from '@/store/app/AppSettings'
import EntityUpdatable from '@/store/common/EntityUpdatable'
import EntityUpdatableTypes from '@/store/common/EntityUpdatableTypes'
import AppSettingsThemeModeOption from '@/store/app/AppSettingsThemeModeOption'
import AppSettingsLocalizationOption from '@/store/app/AppSettingsLocalizationOption'
import EntityUpdatableItemFieldType from '@/store/common/EntityUpdatableItemFieldType'

export default class AppSettingsUpdatable extends EntityUpdatable<AppSettingsUpdatable, AppSettings> {

	themeMode!: EntityUpdatableItemFieldType<AppSettingsThemeModeOption, EntityUpdatableTypes>
	localization!: EntityUpdatableItemFieldType<AppSettingsLocalizationOption, EntityUpdatableTypes>

	static makeEntityBase(entityUpdatable: AppSettingsUpdatable): AppSettings {
		return new AppSettings({
			themeMode: entityUpdatable.themeMode.value,
			localization: entityUpdatable.localization.value
		})
	}

	public makeEntityBase(): AppSettings {
		return AppSettingsUpdatable.makeEntityBase(this)
	}

	public async transformFromEntityBase(entity: Partial<AppSettings>): Promise<void> {
		this.setupInputFieldSimpleDropdown(
			'themeMode',
			'themeMode',
			entity,
			AppSettingsThemeModeOption as unknown as Record<string, never>,
			'update.dynamic.themeMode'
		)
		this.setupInputFieldSimpleDropdown(
			'localization',
			'localization',
			entity,
			AppSettingsLocalizationOption as unknown as Record<string, never>,
			'update.dynamic.localization'
		)
	}

}