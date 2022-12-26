import { z } from 'zod'
import zodPassword from '@/Helpers/Zod/Password'

export const ZodLogin = z.object({
	email: z.string().email(),
	password: zodPassword
})

export const ZodSignup = z
	.object({
		email: z.string().email(),
		password: zodPassword,
		re_password: zodPassword
	})
	.superRefine(({ re_password, password }, ctx) => {
		if (re_password !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['re_password']
			})
		}
	})

export const ZodResetPassword = z.object({
	new_password: zodPassword,
	password2: zodPassword
})
