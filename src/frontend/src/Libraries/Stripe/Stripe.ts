/**
 * Create a Stripe element.
 * @param stripeKey Stripe Private Key.
 * @param element Type of Stripe Element to create.
 * @param selector The anchor in DOM.
 * @param cbOnChange Callback on change.
 * @param cbError Callback on error.
 */

import { StripeElement } from '@/Libraries/Stripe/StripeElement'

const ELEMENT_CONFIG = {
	[StripeElement.CARD]: {},
	[StripeElement.IBAN]: {
		supportedCountries: ['SEPA'],
		placeholderCountry: 'FR',
		hideIcon: true
	},
	[StripeElement.CARD_NUMBER]: {
		placeholder: '1234 5678 9101 1121',
		showIcon: true,
		iconStyle: 'default'
	},
	[StripeElement.CARD_EXPIRY]: {
		placeholder: 'MM/YY'
	},
	[StripeElement.CARD_CVC]: {
		placeholder: 'CVC'
	}
}

const COMPONENT_STYLE = {
	base: {
		color: '#343a40',
		fontSize: '16px',
		fontFamily: '',
		fontSmoothing: 'antialiased',
		fontWeight: '500'
	},
	complete: {
		color: '#007dff',
		iconColor: '#00ff0f'
	},
	invalid: {
		color: '#ff0000',
		iconColor: '#ff0000'
	}
}

const COMPONENT_OPTIONS = {
	style: COMPONENT_STYLE,
	classes: {
		base: 'form-stripe-element',
		focus: 'form-stripe-element--focus',
		complete: 'form-stripe-element--is-success',
		invalid: 'form-stripe-element--is-error',
		empty: 'form-stripe-element'
	}
}

export default async function initStripeComponent(
	stripeKey: string | undefined,
	element: StripeElement,
	selector: string,
	cbOnChange: (ev: any) => void,
	cbError: (ev: any) => void
): Promise<{
	stripeInstance: any
	stripeEl: any
} | void> {
	if (!stripeKey) {
		console.error('Stripe Key is missing')
		return void 0
	}

	try {
		const stripeInstance = (window as any).Stripe(stripeKey)
		const stripeEl = stripeInstance
			.elements()
			.create(element, { ...COMPONENT_OPTIONS, ...ELEMENT_CONFIG[element] })
		stripeEl.mount(selector)
		stripeEl.on('change', cbOnChange)

		return { stripeInstance, stripeEl }
	} catch (err) {
		cbError(err)
		return void 0
	}
}
