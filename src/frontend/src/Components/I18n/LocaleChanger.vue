<template>
	<div class="locale-changer">
		<select v-model="$i18n.locale">
			<option
				v-for="locale in $i18n.availableLocales"
				:key="`locale-${locale}`"
				:value="locale"
			>
				{{ locale }}
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { DefineDateTimeFormat, MessageSchema, NumberSchema } from '@/Locales/LocaleType'

@Component({
	name: 'LocaleChanger'
})
export default class LocaleChanger extends Vue {
	myContext = setup(() => {
		const { t, d, n } = useI18n<{
			message: MessageSchema
			datetime: DefineDateTimeFormat
			number: NumberSchema
		}>({
			useScope: 'global'
		})
		return { t, d, n }
	})
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/I18n/LocaleChanger.scss';
</style>
