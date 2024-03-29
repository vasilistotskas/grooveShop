<script lang="ts" setup>
import {
	RadioGroup,
	RadioGroupDescription,
	RadioGroupLabel,
	RadioGroupOption
} from '@headlessui/vue'
import { PayWay, PayWaysEnum } from '~/zod/pay-way/pay-way'
import CreditCardJSON from '~/assets/lotties/credit_card.json'
import PayOnDeliveryJSON from '~/assets/lotties/pay_on_delivery.json'

const { t } = useLang()

const payWayStore = usePayWayStore()

const payWayExtraCost = (payWay: PayWay): string => {
	if (payWay.freeForOrderAmount < 10) {
		return '(<span class="checkout-pay_way-cost-free green">Free</span>)'
	}
	return '(+' + payWay.cost + '€ per shipment)'
}

const emit = defineEmits(['update:model-value'])

const { payWay, getActivePayWays, pending, error } = storeToRefs(payWayStore)

try {
	await payWayStore.fetchPayWays()
} catch (error) {
	//
}

const selectedPayWay = computed(() => {
	if (getActivePayWays.value && !payWay.value) {
		return getActivePayWays.value[0]
	}
	return payWay.value
})

const getPayWayLottie = (name: string) => {
	switch (name) {
		case PayWaysEnum.CREDIT_CARD: {
			return CreditCardJSON
		}
		case PayWaysEnum.PAY_ON_DELIVERY: {
			return PayOnDeliveryJSON
		}
		default: {
			return CreditCardJSON
		}
	}
}

const updatePayWay = (value: PayWay) => {
	emit('update:model-value', payWay)
	payWay.value = value
}
</script>

<template>
	<div class="pay-ways">
		<div class="pay-ways__title">
			<h3 class="text-gray-700 dark:text-gray-200 text-md font-bold">
				{{ t('components.checkout.pay_ways.title') }}
			</h3>
		</div>
		<div class="pay-ways__list">
			<Error
				v-if="error.payWays"
				:code="error.payWays.statusCode"
				:error="error.payWays"
			/>
			<LoadingSkeleton
				v-else-if="pending && !getActivePayWays?.length"
				:card-height="'422px'"
				:class="pending ? 'block' : 'hidden'"
				:loading="pending.payWays"
				:replicas="getActivePayWays?.length || 4"
			></LoadingSkeleton>
			<template v-if="selectedPayWay && !pending.payWays && getActivePayWays?.length">
				<RadioGroup
					:model-value="selectedPayWay"
					by="id"
					name="pay-way"
					@update:model-value="(value) => updatePayWay(value)"
				>
					<RadioGroupLabel class="sr-only"
						>{{ t('components.checkout.pay_ways.label') }}
					</RadioGroupLabel>
					<div class="space-y-2">
						<RadioGroupOption
							v-for="option in getActivePayWays"
							:key="option.id"
							v-slot="{ active, checked }"
							:value="option"
							as="template"
						>
							<div
								:class="[
									active
										? 'ring-1 ring-white ring-opacity-60 ring-offset-1 ring-offset-sky-300'
										: '',
									checked ? 'bg-sky-900 bg-opacity-75' : 'bg-gray-50 dark:bg-gray-900'
								]"
								class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
							>
								<div class="grid grid-cols-3 w-full items-center justify-between">
									<div class="grid items-center">
										<div class="text-sm">
											<RadioGroupLabel
												:class="
													checked ? 'text-white' : 'text-gray-700 dark:text-gray-200'
												"
												as="p"
												class="font-medium"
											>
												{{ option.name }}
											</RadioGroupLabel>
											<RadioGroupDescription
												:class="
													checked ? 'text-sky-100' : 'text-gray-700 dark:text-gray-200'
												"
												as="span"
												class="inline"
											>
												<span>{{ option.cost }}</span>
											</RadioGroupDescription>
										</div>
									</div>
									<Lottie
										class="grid"
										:animation-data="getPayWayLottie(option.name)"
										:width="'40px'"
									/>
									<div
										v-show="checked"
										class="grid w-full h-full items-center justify-items-end"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24">
											<circle cx="12" cy="12" fill="#fff" fill-opacity="0.2" r="12" />
											<path
												d="M7 13l3 3 7-7"
												stroke="#fff"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
											/>
										</svg>
									</div>
								</div>
							</div>
						</RadioGroupOption>
					</div>
				</RadioGroup>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.pay-ways {
	display: grid;
	gap: 1rem;

	&__title {
		display: grid;
		align-items: center;
		justify-content: center;
		justify-items: center;
	}
}
</style>
