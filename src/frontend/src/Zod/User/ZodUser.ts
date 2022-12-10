import { z } from 'zod'
import zodPassword from '@/Helpers/Zod/Password'

export const ZodUserSettings = z.object({
	first_name: z.string().min(3).max(100),
	last_name: z.string().min(3).max(100),
	phone: z
		.number()
		.positive({ message: 'Must be a positive phone' })
		.int({ message: 'Must be an integer' }),
	city: z.string().min(3).max(100),
	zipcode: z.string().min(3).max(100),
	address: z.string().min(3).max(100),
	place: z.string().min(3).max(100)
})

export const ZodUserPassword = z
	.object({
		current_password: zodPassword,
		new_password: zodPassword,
		re_new_password: zodPassword
	})
	.superRefine(({ current_password, new_password, re_new_password }, ctx) => {
		if (new_password !== re_new_password) {
			ctx.addIssue({
				code: 'custom',
				message: 'New password and re-new password must be the same',
				path: ['re_new_password']
			})
		}
		if (current_password === new_password) {
			ctx.addIssue({
				code: 'custom',
				message: 'New password and current password must be different',
				path: ['new_password']
			})
		}
	})
