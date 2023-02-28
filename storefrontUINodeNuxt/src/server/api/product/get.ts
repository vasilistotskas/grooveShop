import { H3Event } from 'h3'

// @TODO find best usage (Testing for now)
export default defineEventHandler(async (event: H3Event) => {
	console.log('event', event)
	console.log('event.context', event.context)
	const config = useRuntimeConfig()
	const productId = 1

	const response = await fetch(`${config.public.apiBaseUrl}/product/${productId}`)
	console.log('response', response)

	return new Response(JSON.stringify({ product: await response.json() }), {
		status: 200,
		headers: {
			'content-type': 'application/json',
			'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
		}
	})
})
