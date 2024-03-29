<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import {
	getAllCookieIdsString,
	getCookieId,
	getCookieIds,
	removeCookie,
	setCookie
} from '#cookie-control/methods'
import { Cookie, CookieTypeEnum } from '#cookie-control/types'
import setCssVariables from '#cookie-control/set-vars'

defineSlots<{
	bar(props: {}): any
	modal(props: {}): any
}>()

const { t } = useLang()

const {
	cookiesEnabled,
	cookiesEnabledIds,
	isConsentGiven,
	isModalActive,
	moduleOptions
} = useCookieControl()
// data
const expires = new Date()
const localCookiesEnabled = ref([...(cookiesEnabled.value || [])])
const allCookieIdsString = getAllCookieIdsString(moduleOptions)
const cookieIsConsentGiven = useCookie(moduleOptions.cookieNameIsConsentGiven)
const cookieCookiesEnabledIds = useCookie(moduleOptions.cookieNameCookiesEnabledIds)
// computations
const isSaved = computed(
	() =>
		getCookieIds(cookiesEnabled.value || [])
			.sort()
			.join('|') !== getCookieIds(localCookiesEnabled.value).sort().join('|')
)
// methods
const accept = () => {
	setCookies({
		isConsentGiven: true,
		cookiesOptionalEnabled: moduleOptions.cookies.optional
	})
}
const decline = () => {
	setCookies({
		isConsentGiven: true,
		cookiesOptionalEnabled: moduleOptions.cookies.necessary
	})
}
const acceptPartial = () => {
	const localCookiesEnabledIds = getCookieIds(localCookiesEnabled.value)
	setCookies({
		isConsentGiven: true,
		cookiesOptionalEnabled: [
			...moduleOptions.cookies.necessary,
			...moduleOptions.cookies.optional
		].filter((cookie) => localCookiesEnabledIds.includes(getCookieId(cookie)))
	})
}
const declineAll = () => {
	setCookies({
		isConsentGiven: true,
		cookiesOptionalEnabled: moduleOptions.cookies.necessary
	})
}
const toggleCookie = (cookie: Cookie) => {
	const cookieIndex = getCookieIds(localCookiesEnabled.value).indexOf(getCookieId(cookie))
	if (cookieIndex < 0) {
		localCookiesEnabled.value.push(cookie)
	} else {
		localCookiesEnabled.value.splice(cookieIndex, 1)
	}
}
const getDescription = (description: string) =>
	`${!moduleOptions.isDashInDescriptionEnabled ? '' : '-'} ${t(description)}`
const getName = (name: string) => {
	return name === 'functional' ? t('components.cookie.cookies.functional') : t(name)
}
const resolveLinkEntryText = (entry: [string, unknown]) => {
	if (typeof entry[1] === 'string') {
		return t(entry[1] as string)
	}
	return entry[0]
}
const init = () => {
	expires.setTime(expires.getTime() + moduleOptions.cookieExpiryOffsetMs)
}
const setCookies = ({
	cookiesOptionalEnabled: cookiesOptionalEnabledNew,
	isConsentGiven: isConsentGivenNew
}: {
	cookiesOptionalEnabled: Cookie[]
	isConsentGiven: boolean
}) => {
	isConsentGiven.value = isConsentGivenNew // must come before an update to `cookiesEnabled`
	cookiesEnabled.value = isConsentGivenNew
		? [
				...moduleOptions.cookies.necessary,
				...moduleOptions.cookies.optional.filter((cookieOptional: Cookie) =>
					cookiesOptionalEnabledNew.includes(cookieOptional)
				)
		  ]
		: []
	cookiesEnabledIds.value = isConsentGivenNew ? getCookieIds(cookiesEnabled.value) : []
}
const toggleButton = ($event: MouseEvent) => {
	;(($event.target as HTMLButtonElement | null)?.nextSibling as HTMLLabelElement)?.click()
}
const toggleLabel = ($event: KeyboardEvent) => {
	if ($event.key === ' ') ($event.target as HTMLLabelElement)?.click()
}
// lifecycle
onBeforeMount(() => {
	if (moduleOptions.colors) {
		const variables: Record<string, any> = {}
		for (const key in moduleOptions.colors) {
			variables[`cookie-control-${key}`] = `${moduleOptions.colors[key]}`
		}
		setCssVariables(variables)
	}
	if (cookieIsConsentGiven.value === allCookieIdsString) {
		for (const cookieOptional of moduleOptions.cookies.optional) {
			if (
				typeof moduleOptions.isIframeBlocked === 'boolean'
					? moduleOptions.isIframeBlocked
					: moduleOptions.isIframeBlocked.initialState
			) {
				localCookiesEnabled.value.push(cookieOptional)
			}
		}
	}
})
watch(
	() => cookiesEnabled.value,
	(current, _previous) => {
		localCookiesEnabled.value = [...(current || [])]
		if (isConsentGiven.value) {
			setCookie(
				moduleOptions.cookieNameCookiesEnabledIds,
				getCookieIds(current || []).join('|'),
				{
					expires
				}
			)
			for (const cookieEnabled of current || []) {
				if (!cookieEnabled.src) continue
				const script = document.createElement('script')
				script.src = cookieEnabled.src
				document.getElementsByTagName('head')[0].appendChild(script)
			}
		} else {
			cookieCookiesEnabledIds.value = undefined
		}
		// delete formerly enabled cookies that are now disabled
		const cookiesOptionalDisabled = moduleOptions.cookies.optional.filter(
			(cookieOptional: Cookie) => !(current || []).includes(cookieOptional)
		)
		for (const cookieOptionalDisabled of cookiesOptionalDisabled) {
			if (!cookieOptionalDisabled.targetCookieIds) continue
			for (const cookieOptionalDisabledId of cookieOptionalDisabled.targetCookieIds) {
				removeCookie(cookieOptionalDisabledId)
			}
			if (cookieOptionalDisabled.src) {
				for (const script of [
					...document.head.querySelectorAll(`script[src="${cookieOptionalDisabled.src}"]`)
				]) {
					script.parentNode?.removeChild(script)
				}
			}
		}
	},
	{ deep: true }
)
watch(isConsentGiven, (current, _previous) => {
	if (current === undefined) {
		cookieIsConsentGiven.value = undefined
	} else {
		setCookie(
			moduleOptions.cookieNameIsConsentGiven,
			current ? allCookieIdsString : '0',
			{
				expires
			}
		)
	}
})

defineExpose({
	accept,
	acceptPartial,
	decline
})

// initialization
init()
</script>

<template>
	<section class="cookieControl">
		<Transition :name="`cookieControl__Bar--${moduleOptions.barPosition}`">
			<div
				v-if="!isConsentGiven"
				:class="`cookieControl__Bar cookieControl__Bar--${moduleOptions.barPosition}`"
			>
				<div class="cookieControl__BarContainer">
					<div>
						<slot name="bar">
							<h3 class="hidden" v-text="$t('components.cookie.banner.title')" />
							<p v-text="$t('components.cookie.banner.description')" />
						</slot>
					</div>
					<div class="cookieControl__BarButtons">
						<button
							class="cookieControl__BarButtons__ManageCookies"
							type="button"
							@click="isModalActive = true"
							v-text="$t('components.cookie.manage_cookies')"
						/>
						<button
							class="cookieControl__BarButtons__AcceptAll"
							type="button"
							@click="accept()"
							v-text="$t('components.cookie.accept')"
						/>
						<button
							v-if="moduleOptions.isAcceptNecessaryButtonEnabled"
							type="button"
							class="cookieControl__BarButtons__Decline"
							@click="decline()"
							v-text="$t('components.cookie.decline')"
						/>
					</div>
				</div>
			</div>
		</Transition>
		<button
			v-if="moduleOptions.isControlButtonEnabled && isConsentGiven"
			type="button"
			aria-label="Cookie control"
			class="cookieControl__ControlButton"
			data-testid="nuxt-cookie-control-control-button"
			@click="isModalActive = true"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path
					fill="currentColor"
					d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 00-57.79 57.81l-35.1 68.88a132.645 132.645 0 00-12.82 80.95l12.08 76.27a132.521 132.521 0 0037.16 72.96l54.77 54.76a132.036 132.036 0 0072.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0057.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
				/>
			</svg>
		</button>
		<Transition name="cookieControl__Modal">
			<div v-if="isModalActive" class="cookieControl__Modal">
				<p
					v-if="isSaved"
					class="cookieControl__ModalUnsaved"
					v-text="$t('components.cookie.settings.unsaved')"
				/>
				<div class="cookieControl__ModalContent">
					<div class="cookieControl__ModalContentInner">
						<slot name="modal" />
						<button
							class="cookieControl__ModalClose"
							type="button"
							@click="isModalActive = false"
							v-text="$t('components.cookie.close')"
						/>
						<template v-for="cookieType in CookieTypeEnum.enum" :key="cookieType">
							<template v-if="moduleOptions.cookies[cookieType].length">
								<h3
									v-text="
										cookieType === CookieTypeEnum.enum.necessary
											? $t('components.cookie.cookies.necessary')
											: $t('components.cookie.cookies.optional')
									"
								/>
								<ul>
									<li
										v-for="cookie in moduleOptions.cookies[cookieType]"
										:key="cookie.id"
									>
										<div class="cookieControl__ModalInputWrapper">
											<input
												v-if="
													cookieType === CookieTypeEnum.enum.necessary &&
													cookie.name !== 'functional'
												"
												:id="cookie.name"
												:name="cookie.name"
												:placeholder="cookie.name"
												type="checkbox"
												disabled
												checked
											/>
											<input
												v-else
												:id="cookie.name"
												type="checkbox"
												:checked="
													getCookieIds(localCookiesEnabled).includes(
														getCookieId(cookie)
													) ||
													(cookieIsConsentGiven !== allCookieIdsString &&
														typeof moduleOptions.isIframeBlocked === 'object' &&
														moduleOptions.isIframeBlocked.initialState)
												"
												@change="toggleCookie(cookie)"
											/>
											<button type="button" @click="toggleButton($event)">
												{{ getName(cookie.name) }}
											</button>
											<label
												class="cookieControl__ModalCookieName"
												:for="cookie.name"
												tabindex="0"
												@keydown="toggleLabel($event)"
											>
												{{ getName(cookie.name) }}
												<span v-if="cookie.description">
													{{ getDescription(cookie.description) }}
												</span>
												<span
													v-if="moduleOptions.isCookieIdVisible && cookie.targetCookieIds"
												>
													<br />
													{{
														'IDs: ' +
														cookie.targetCookieIds
															.map((id: string) => `"${id}"`)
															.join(', ')
													}}
												</span>
												<template v-if="Object.entries(cookie.links || {}).length">
													<span
														v-for="entry in Object.entries(cookie.links || {})"
														:key="entry[0]"
													>
														<br />
														<a :href="entry[0]">{{ resolveLinkEntryText(entry) }}</a>
													</span>
												</template>
											</label>
										</div>
									</li>
								</ul>
							</template>
						</template>
						<div class="cookieControl__ModalButtons">
							<button
								type="button"
								@click="
									() => {
										acceptPartial()
										isModalActive = false
									}
								"
								v-text="$t('components.cookie.save')"
							/>
							<button
								type="button"
								@click="
									() => {
										accept()
										isModalActive = false
									}
								"
								v-text="$t('components.cookie.accept_all')"
							/>
							<button
								type="button"
								@click="
									() => {
										declineAll()
										isModalActive = false
									}
								"
								v-text="$t('components.cookie.decline_all')"
							/>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</section>
</template>
