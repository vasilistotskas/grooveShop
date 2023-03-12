<script lang="ts" setup>
import { useCounter } from '~/stores/testing/counter'
import { useIdentity } from '~/stores/testing/identity'
import { capitalize } from '~/utils/str'

const config = useRuntimeConfig()
const { t } = useLang()

definePageMeta({
	layout: 'testing',
	middleware: ['breadcrumbs']
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

const counter = useCounter()
const identity = useIdentity()
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
							type="secondary"
							size="sm"
							:text="$t('pages.testing.test.increment')"
							@click.prevent="counter.increment"
						/>
						<Button
							class="w-full md:w-auto"
							type="secondary"
							size="sm"
							:text="`${$t('pages.testing.test.increment')} 2x`"
							@click.prevent="counter.increment2x"
						/>
						<Button
							class="w-full md:w-auto capitalize"
							type="secondary"
							size="sm"
							:text="$t('pages.testing.test.decrement')"
							@click.prevent="counter.decrement"
						/>
						<Button
							class="w-full md:w-auto capitalize"
							type="secondary"
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
							type="secondary"
							size="md"
							@click.prevent="identity.reset"
						/>
					</div>
				</div>
			</PageSection>
			<PageSection>
				<FormValidation> </FormValidation>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>
