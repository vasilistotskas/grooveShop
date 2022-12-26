import AppSettings from '@/State/App/AppSettings'
import EntityUpdatable from '@/State/Common/EntityUpdatable'
import EntityUpdatableTypes from '@/State/Common/EntityUpdatableTypes'
import AppSettingsThemeModeOption from '@/State/App/AppSettingsThemeModeOption'
import EntityUpdatableItemFieldType from '@/State/Common/EntityUpdatableItemFieldType'

export default class AppSettingsUpdatable extends EntityUpdatable<
	AppSettingsUpdatable,
	AppSettings
> {
	themeMode!: EntityUpdatableItemFieldType<
		AppSettingsThemeModeOption,
		EntityUpdatableTypes
	>

	static makeEntityBase(entityUpdatable: AppSettingsUpdatable): AppSettings {
		return new AppSettings({
			themeMode: entityUpdatable.themeMode.value
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
	}
}
