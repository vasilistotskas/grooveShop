export enum MainRoutePaths {
  HOME = '/',
  LOGIN = '/log-in',
  SIGNUP = '/sign-up',
  VERIFY_EMAIL = '/accounts/activate/:uid/:token',
  VERIFY_EMAIL_RESEND_INPUT = '/accounts/activate/verify_mail_resend',
  PASSWORD_RESET = '/password_reset',
  PASSWORD_RESET_CONFIRM = '/password_reset/:uid/:token',
  USER_ACCOUNT = '/user-account',
  USER_ACCOUNT_ORDERS = '/user-account/orders',
  USER_ACCOUNT_SETTINGS = '/user-account/settings',
  USER_ACCOUNT_FAVOURITES = '/user-account/favourites',
  USER_ACCOUNT_REVIEWS = '/user-account/reviews',
  USER_ACCOUNT_PASSWORD = '/user-account/password',
  SEARCH = '/search',
  CART = '/cart',
  CHECKOUT_SUCCESS = '/cart/success',
  CHECKOUT_ERROR = '/cart/error',
  CHECKOUT = '/cart/checkout',
  ALL_PRODUCTS = '/products/all',
  PRODUCT = '/product/:category_slug/:product_slug',
  CATEGORY = '/category/:category_slug',
  BLOG = '/blog',
  AUTHOR = '/author/:email',
  POST = '/post/:slug',
  POSTS_BY_TAG = '/tag/:tag',
  PAGE_NOT_FOUND = '/errors/error_404',
  NOT_FOUND = '/:pathMatch(.*)*',
}
