import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.LOGIN,
    name: MainRouteNames.LOGIN,
    component: () => import('@/Pages/Auth/LogIn.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Log In',
          to: {
            full_path: 'log-in',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.SIGNUP,
    name: MainRouteNames.SIGNUP,
    component: () => import('@/Pages/Auth/SignUp.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Sign Up',
          to: {
            full_path: 'sign-up',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.VERIFY_EMAIL,
    name: MainRouteNames.VERIFY_EMAIL,
    component: () => import('@/Pages/Auth/VerifyEmail.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Verify Email',
          to: {
            full_path: 'accounts/activate',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.VERIFY_EMAIL_RESEND_INPUT,
    name: MainRouteNames.VERIFY_EMAIL_RESEND_INPUT,
    component: () => import('@/Pages/Auth/VerifyEmailResendInput.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Verify Email Resend Input',
          to: {
            full_path: 'accounts/activate/verify_mail_resend',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.PASSWORD_RESET,
    name: MainRouteNames.PASSWORD_RESET,
    component: () => import('@/Pages/Auth/PasswordReset.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Password Reset',
          to: {
            full_path: 'password-reset',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
  {
    path: MainRoutePaths.PASSWORD_RESET_CONFIRM,
    name: MainRouteNames.PASSWORD_RESET_CONFIRM,
    component: () => import('@/Pages/Auth/PasswordResetConfirm.vue'),
    meta: {
      breadcrumb: [
        {
          name: 'Password Reset Confirm',
          to: {
            full_path: 'password-reset',
          },
        },
      ] as Array<BreadcrumbItemInterface>,
    },
  },
]

export default authRoutes
