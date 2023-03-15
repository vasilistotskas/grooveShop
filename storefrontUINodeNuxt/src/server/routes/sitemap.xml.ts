import fs, { createWriteStream } from 'fs'
import { dirname, resolve } from 'path'
import { Readable } from 'stream'
import { fileURLToPath } from 'url'
import { SitemapAndIndexStream, SitemapStream, streamToPromise } from 'sitemap'
import { Product } from '~/zod/product/product'
import { serverQueryContent } from '#content/server'
import { Pagination } from '~/zod/pagination/pagination'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const baseUrl = config.public.baseUrl

	const availableLocales = config.public.i18n.locales.split(',')
	const defaultLocale = config.public.i18n.defaultLocale

	const productResponse = await fetch(`${config.public.apiBaseUrl}/product`)
	const products = (await productResponse.json()) as Pagination<Product>

	const docs = await serverQueryContent(event).find()

	// Collect all URLs in an array
	const urls: string[] = []
	availableLocales.forEach((locale) => {
		docs.forEach((doc) => {
			const docUrl = doc._path
			const url = `${baseUrl}${locale === defaultLocale ? '' : `/${locale}`}${docUrl}`
			urls.push(url)
		})

		const staticEndpoints = getStaticEndpoints()
		staticEndpoints.forEach((staticEndpoint) => {
			const url = `${baseUrl}${
				locale === defaultLocale ? '' : `/${locale}`
			}${staticEndpoint}`
			urls.push(url)
		})

		products.results.forEach((product) => {
			const productUrl = `/product${product.absoluteUrl}`
			const url = `${baseUrl}${locale === defaultLocale ? '' : `/${locale}`}${productUrl}`
			urls.push(url)
		})
	})

	// Write the sitemap with all URLs
	const sms = new SitemapAndIndexStream({
		limit: 100, // defaults to 45k
		// SitemapAndIndexStream will call this user provided function every time
		// it needs to create a new sitemap file. You merely need to return a stream
		// for it to write the sitemap urls to and the expected url where that sitemap will be hosted
		getSitemapStream: (i) => {
			const sitemapStream = new SitemapStream({ hostname: baseUrl })
			// if your server automatically serves sitemap.xml.gz when requesting sitemap.xml leave this line be
			// otherwise you will need to add .gz here and remove it a couple lines below so that both the index
			// and the actual file have a .gz extension
			const routePath = `./sitemap-${i}.xml`
			const sitemapPath = `./sitemap/sitemap-${i}.xml`

			const ws = sitemapStream.pipe(createWriteStream(resolve(sitemapPath))) // write it to sitemap-NUMBER.xml

			return [new URL(routePath, `${baseUrl}/`).toString(), sitemapStream, ws]
		}
	})

	sms.pipe(createWriteStream(resolve('./sitemap/sitemap-index.xml')))

	const arrayOfSitemapItems = urls.map((url) => ({ url, changefreq: 'daily' }))

	Readable.from(arrayOfSitemapItems).pipe(sms) // available as of node 10.17.0

	return streamToPromise(sms)
})

function getStaticEndpoints(): string[] {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const files = getFiles(`${__dirname}/../../pages`)
	const endpoints = files
		.filter((file) => !file.includes('slug') || !file.includes('id')) // exclude dynamic content
		.map((file) => file.split('pages')[1])
		.map((file) => {
			return getDirectoryName(file)
		})
	return endpoints
}

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
	const dirents = fs.readdirSync(dir, { withFileTypes: true })
	const files = dirents.map((dirent) => {
		const res = resolve(dir, dirent.name)
		return dirent.isDirectory() ? getFiles(res) : res
	})
	return files.flat()
}

function getDirectoryName(path: string): string {
	// Remove leading and trailing slashes
	let cleanedPath = path.replace(/^\/|\/$/g, '')

	// Remove "index.vue" if present at the end of the path for example: /about/index.vue -> /about
	if (cleanedPath.endsWith('index.vue')) {
		cleanedPath = cleanedPath.replace(/index.vue$/, '')
	}
	// Remove ".vue" if present at the end of the path for example: /about.vue -> /about
	if (cleanedPath.endsWith('.vue')) {
		cleanedPath = cleanedPath.replace(/\.vue$/, '')
	}
	// Split the path into segments
	const segments = cleanedPath.split('/')

	// Remove the last segment if it contains a dot
	const lastSegment = segments[segments.length - 1]
	if (lastSegment.includes('.')) {
		segments.pop()
	}

	// Join the segments back into a path
	let endpoint = segments.join('/')

	// Remove double slashes
	endpoint = endpoint.replace(/\/\//g, '/')

	// Remove slash at the end of the path
	if (endpoint.endsWith('/') || endpoint.endsWith('//') || endpoint.endsWith('\\')) {
		endpoint = endpoint.slice(0, -1)
	}
	return endpoint
}
