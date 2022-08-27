import { RouteRecordRaw } from 'vue-router'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: MainRoutePaths.LOGIN,
    name: MainRouteNames.LOGIN,
    component: () => import('@/pages/Auth/LogIn.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Log In',
          to: {
            full_path: 'log-in',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.SIGNUP,
    name: MainRouteNames.SIGNUP,
    component: () => import('@/pages/Auth/SignUp.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Sign Up',
          to: {
            full_path: 'sign-up',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.VERIFY_EMAIL,
    name: MainRouteNames.VERIFY_EMAIL,
    component: () => import('@/pages/Auth/VerifyEmail.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Verify Email',
          to: {
            full_path: 'accounts/activate',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.VERIFY_EMAIL_RESEND_INPUT,
    name: MainRouteNames.VERIFY_EMAIL_RESEND_INPUT,
    component: () => import('@/pages/Auth/VerifyEmailResendInput.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Verify Email Resend Input',
          to: {
            full_path: 'accounts/activate/verify_mail_resend',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.PASSWORD_RESET,
    name: MainRouteNames.PASSWORD_RESET,
    component: () => import('@/pages/Auth/PasswordReset.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Password Reset',
          to: {
            full_path: 'password-reset',
          },
        },
      ],
    },
  },
  {
    path: MainRoutePaths.PASSWORD_RESET_CONFIRM,
    name: MainRouteNames.PASSWORD_RESET_CONFIRM,
    component: () => import('@/pages/Auth/PasswordResetConfirm.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'Password Reset Confirm',
          to: {
            full_path: 'password-reset',
          },
        },
      ],
    },
  },
  {
    path: '/test_login',
    name: '/test_login',
    component: () => import('@/pages/TestLogin.vue'),
    meta: {
      breadcrumb: (): Array<BreadcrumbItemInterface> => [
        {
          name: 'test_login',
          to: {
            full_path: 'test_login',
          },
        },
      ],
    },
  },
]

export default authRoutes
