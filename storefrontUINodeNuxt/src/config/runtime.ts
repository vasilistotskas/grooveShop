export const runtimeConfig = {
	// The private keys which are only available server-side
	apiSecret: process.env.NUXT_APP_PRIVATE_API_SECRET,
	buildDate: new Date().toISOString(),

	// Keys within public are also exposed client-side
	public: {
		appTitle: process.env.NUXT_APP_TITLE,
		appDescription: process.env.NUXT_APP_DESCRIPTION,
		appImage: process.env.NUXT_APP_IMAGE,
		domainName: process.env.NUXT_APP_PUBLIC_DOMAIN_NAME,
		canonicalUrl: process.env.NUXT_APP_PUBLIC_CANONICAL_URL,
		baseUrl: process.env.NUXT_APP_PUBLIC_BASE_URL,
		apiBaseUrl: process.env.NUXT_APP_PUBLIC_API_BASE_URL,
		facebookAppId: process.env.NUXT_APP_PUBLIC_FACEBOOK_APP_ID,
		i18n: {
			locales: process.env.NUXT_APP_LOCALES,
			defaultLocale: process.env.NUXT_APP_DEFAULT_LOCALE
		},
		author: {
			name: process.env.NUXT_APP_PUBLIC_AUTHOR_NAME,
			github_url: process.env.NUXT_APP_PUBLIC_AUTHOR_GITHUB_URL
		}
	}
}
