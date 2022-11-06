import { CartEvents } from '@/Emitter/Type/Cart/Events'

export type AppEvents = {
	setNavbarMenuHidden: boolean
} & CartEvents
