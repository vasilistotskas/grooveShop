<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { PropType } from 'vue'
import { OrderingOption } from '~/zod/ordering/ordering'

const route = useRoute()

const props = defineProps({
	orderingOptions: {
		type: Array as PropType<OrderingOption[]>,
		required: true
	},
	ordering: {
		type: String,
		required: true
	},
	applyOrderingQuery: {
		type: Boolean,
		required: false,
		default: true
	}
})
const { ordering } = toRefs(props)
const selectedOrderingLabel = computed(() => {
	if (!ordering?.value) return
	const orderingOptions = props.orderingOptions ?? []
	const selectedOrdering = orderingOptions.find((o) => o.value === ordering.value)
	return selectedOrdering?.label
})
const listBox = ref(null)
const { listBoxOpen, listBoxToggle } = useListBox(listBox)

const link = computed(() => {
	return route.path
})
</script>

<template>
	<div ref="listBox" class="grid md:flex md:flex-col md:items-center z-10">
		<div class="flex flex-row">
			<div class="flex flex-col">
				<Listbox v-model="ordering" name="Ordering">
					<div class="relative w-52">
						<ListboxButton
							class="cursor-pointer relative w-full rounded-lg bg-gray-200 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
							@click="listBoxToggle"
						>
							<span class="block truncate text-gray-700 dark:text-gray-200">{{
								selectedOrderingLabel ?? $t('components.ordering.title')
							}}</span>
							<span
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700 dark:text-gray-200"
							>
								<span class="text-gray-700 dark:text-gray-200"><IconFaSolid:sort /></span>
							</span>
						</ListboxButton>

						<div v-show="listBoxOpen">
							<Transition>
								<ListboxOptions
									role="none"
									static
									class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
								>
									<ListboxOption
										v-for="(option, index) in orderingOptions"
										v-slot="{ active, selected }"
										:key="index"
										:value="option.value"
										:disabled="ordering === option.value"
										as="template"
									>
										<li
											:class="[
												active ? 'bg-primary-400 text-amber-900' : 'text-gray-900',
												'relative cursor-default select-none py-2 pl-10 pr-4'
											]"
										>
											<Anchor
												:to="{
													path: link,
													query: {
														ordering: option.value
													}
												}"
												:class="{
													'text-primary-400 dark:text-primary-400':
														ordering === option.value
												}"
												:text="option.label"
												:title="option.label"
												:disabled="ordering === option.value"
												@click="listBoxToggle"
											>
												<span
													:class="[
														selected ? 'font-medium' : 'font-normal',
														'block truncate text-gray-700 dark:text-gray-200'
													]"
													>{{ option.label }}</span
												>
												<span
													v-if="selected"
													class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-400"
												>
													<IconFaSolid:check />
												</span>
											</Anchor>
										</li>
									</ListboxOption>
								</ListboxOptions>
							</Transition>
						</div>
					</div>
				</Listbox>
			</div>
		</div>
	</div>
</template>
