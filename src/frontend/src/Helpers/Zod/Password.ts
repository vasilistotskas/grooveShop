import { z } from 'zod'

const zodPassword = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.max(255, 'Password must be at most 255 characters')
	.refine((value) => {
		return /[A-Z]/.test(value)
	}, 'Password must contain at least one uppercase letter')
	.refine((value) => {
		return /[a-z]/.test(value)
	}, 'Password must contain at least one lowercase letter')
	.refine((value) => {
		return /[0-9]/.test(value)
	}, 'Password must contain at least one number')
	.refine((value) => {
		return /[!@#$%^&*()_+\-=\\[\]{};':"|,.<>/?]/.test(value)
	}, 'Password must contain at least one special character')
	.refine((value) => {
		return !/\s/.test(value)
	}, 'Password must not contain spaces')

export default zodPassword
