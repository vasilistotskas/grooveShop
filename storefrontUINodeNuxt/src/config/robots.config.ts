export default [
	{ UserAgent: '*' },
	{ Disallow: '/' },
	{ BlankLine: true },
	{ Comment: 'Comment here' },
	// @ts-ignore
	{ Sitemap: (req) => `https://${req.headers.host}/sitemap.xml` }
]
