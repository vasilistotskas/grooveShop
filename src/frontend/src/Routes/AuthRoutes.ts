import LogIn from '@/Pages/Auth/LogIn.vue'
import { RouteRecordRaw } from 'vue-router'
import SignUp from '@/Pages/Auth/SignUp.vue'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import VerifyEmail from '@/Pages/Auth/VerifyEmail.vue'
import PasswordReset from '@/Pages/Auth/PasswordReset.vue'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import PasswordResetConfirm from '@/Pages/Auth/PasswordResetConfirm.vue'
import VerifyEmailResendInput from '@/Pages/Auth/VerifyEmailResendInput.vue'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

function checkAuthentication(to, from, next) {
	const authModule = getModule(AuthModule)
	if (authModule.isAuthenticated) {
		next({ name: 'Home' })
	} else {
		next()
	}
}

const authRoutes: Array<RouteRecordRaw> = [
	{
		path: MainRoutePaths.LOGIN,
		name: MainRouteNames.LOGIN,
		beforeEnter: [checkAuthentication],
		component: LogIn,
		meta: {
			breadcrumb: [
				{
					name: 'Log In',
					to: {
						full_path: 'log-in'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.SIGNUP,
		name: MainRouteNames.SIGNUP,
		beforeEnter: [checkAuthentication],
		component: SignUp,
		meta: {
			breadcrumb: [
				{
					name: 'Sign Up',
					to: {
						full_path: 'sign-up'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.VERIFY_EMAIL,
		name: MainRouteNames.VERIFY_EMAIL,
		component: VerifyEmail,
		meta: {
			breadcrumb: [
				{
					name: 'Verify Email',
					to: {
						full_path: 'accounts/activate'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.VERIFY_EMAIL_RESEND_INPUT,
		name: MainRouteNames.VERIFY_EMAIL_RESEND_INPUT,
		component: VerifyEmailResendInput,
		meta: {
			breadcrumb: [
				{
					name: 'Verify Email Resend Input',
					to: {
						full_path: 'accounts/activate/verify_mail_resend'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.PASSWORD_RESET,
		name: MainRouteNames.PASSWORD_RESET,
		component: PasswordReset,
		meta: {
			breadcrumb: [
				{
					name: 'Password Reset',
					to: {
						full_path: 'password-reset'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	},
	{
		path: MainRoutePaths.PASSWORD_RESET_CONFIRM,
		name: MainRouteNames.PASSWORD_RESET_CONFIRM,
		component: PasswordResetConfirm,
		meta: {
			breadcrumb: [
				{
					name: 'Password Reset Confirm',
					to: {
						full_path: 'password-reset'
					}
				}
			] as Array<BreadcrumbItemInterface>
		}
	}
]

export default authRoutes
