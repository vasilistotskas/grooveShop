<script lang="ts" setup>
import { capitalize } from '~/utils/str'
import { useIdentityStore } from '~/stores/testing/identity'
import { useCounterStore } from '~/stores/testing/counter'

const config = useRuntimeConfig()
const { t } = useLang()

definePageMeta({
	layout: 'testing'
})
useHead(() => ({
	title: capitalize(t('pages.testing.test.title')),
	meta: [
		{
			name: 'description',
			content: t('pages.testing.test.description')
		}
	]
}))

const counter = useCounterStore()
const identity = useIdentityStore()
</script>

<template>
	<PageWrapper>
		<PageHeader>
			<PageTitle :text="$t('pages.testing.test.title')" class="capitalize" />
		</PageHeader>
		<PageBody>
			<PageSection>
				<PageSectionTitle :text="$t('pages.testing.test.counter')" class="capitalize" />
				<div class="">
					<div class="mb-2">
						<p class="text-gray-700 dark:text-gray-200">Counter : {{ counter.count }}</p>
					</div>
					<div
						class="flex flex-col items-center justify-items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2"
					>
						<Button
							class="w-full md:w-auto capitalize"
							type="button"
							:style="'secondary'"
							size="sm"
							:text="$t('pages.testing.test.increment')"
							@click.prevent="counter.increment"
						/>
						<Button
							class="w-full md:w-auto"
							type="button"
							:style="'secondary'"
							size="sm"
							:text="`${$t('pages.testing.test.increment')} 2x`"
							@click.prevent="counter.increment2x"
						/>
						<Button
							class="w-full md:w-auto capitalize"
							type="button"
							:style="'secondary'"
							size="sm"
							:text="$t('pages.testing.test.decrement')"
							@click.prevent="counter.decrement"
						/>
						<Button
							class="w-full md:w-auto capitalize"
							type="button"
							:style="'secondary'"
							size="sm"
							:text="$t('pages.testing.test.reset')"
							@click.prevent="counter.reset"
						/>
					</div>
				</div>
			</PageSection>
			<PageSection>
				<PageSectionTitle :text="$t('pages.testing.test.identity')" class="capitalize" />
				<div class="mb-2">
					<span class="capitalize text-gray-700 dark:text-gray-200"
						>{{ $t('pages.testing.test.full_name') }} :
					</span>
					<span class="text-gray-700 dark:text-gray-200">{{ identity.fullName }}</span>
				</div>
				<div class="mb-2">
					<div
						class="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2"
					>
						<FormTextInput
							:id="'firstName'"
							v-model="identity.firstName"
							:name="'firstName'"
							size="md"
							class="w-full md:w-1/3"
						/>
						<FormTextInput
							:id="'lastName'"
							v-model="identity.lastName"
							:name="'lastName'"
							size="md"
							class="w-full md:w-1/3"
						/>
						<Button
							class="capitalize w-full md:w-auto"
							:text="$t('pages.testing.test.reset')"
							type="button"
							:style="'secondary'"
							size="md"
							@click.prevent="identity.reset"
						/>
					</div>
				</div>
			</PageSection>
			<PageSection>
				<TestingFormValidation> </TestingFormValidation>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>
