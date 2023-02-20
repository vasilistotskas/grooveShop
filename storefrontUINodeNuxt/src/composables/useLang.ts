import {
	// eslint-disable-next-line import/named
	ComposerTranslation,
	useI18n,
	// eslint-disable-next-line import/named
	VueMessageType
} from 'vue-i18n'

import {
	// eslint-disable-next-line import/named
	LocaleMessage,
	// eslint-disable-next-line import/named
	LocaleMessageValue,
	// eslint-disable-next-line import/named
	RemoveIndexSignature
} from '@intlify/core-base'

export type useLang = {
	t: ComposerTranslation<
		{ [p: string]: LocaleMessage<VueMessageType> },
		string,
		RemoveIndexSignature<{ [p: string]: LocaleMessageValue<VueMessageType> }>,
		never,
		string,
		string
	>
}
export const useLang = () => {
	const { t } = useI18n()
	return {
		t
	}
}
