export const app = {
	head: {
		charset: 'utf-8',
		viewport: 'width=device-width, initial-scale=1',
		meta: [
			{ name: 'robots', content: 'index, follow' },
			{ name: 'theme-color', content: '#ffffff' },
			{ name: 'msapplication-TileColor', content: '#ffffff' },
			{ name: 'msapplication-config', content: '/assets/favicon/browserconfig.xml' },
			{
				name: 'google-site-verification',
				content: process.env.NUXT_APP_GOOGLE_SITE_VERIFICATION
			}
		],
		link: [
			{
				rel: 'manifest',
				href: '/manifest.webmanifest'
			},
			{
				rel: 'shortcut icon',
				type: 'image/x-icon',
				href: '/assets/favicon/favicon.ico'
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/assets/favicon/apple-touch-icon.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/assets/favicon/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/assets/favicon/favicon-16x16.png'
			},
			{
				rel: 'mask-icon',
				href: '/assets/favicon/safari-pinned-tab.svg',
				color: '#5bbad5'
			}
		]
	}
	// pageTransition: {
	// 	name: 'page',
	// 	mode: 'out-in' // default
	// },
	// layoutTransition: {
	// 	name: 'layout',
	// 	mode: 'out-in' // default
	// }
}
