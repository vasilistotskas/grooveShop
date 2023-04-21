import { H3Event } from 'h3'
import { z } from 'zod'
import { parseDataAs } from '~/zod/parser'
import { ZodAccount } from '~/zod/user/account'
import { buildFullUrl } from '~/helpers/api'
import { FavouriteQuery, ZodFavourite } from '~/zod/product/favourite'
import { OrderQuery, ZodOrder } from '~/zod/order/order'
import { ReviewQuery, ZodReview } from '~/zod/product/review'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie

	// Account
	const accountResponse = await $fetch(
		`${config.public.apiBaseUrl}/user/account/session/`,
		{
			headers: {
				Cookie: cookie || ''
			}
		}
	)
	const accountParsedData = await parseDataAs(accountResponse, ZodAccount)

	// Favourites
	const favouritesQuery: FavouriteQuery = {
		userId: String(accountParsedData.id),
		pagination: 'false'
	}
	const favouritesUrl = buildFullUrl(
		`${config.public.apiBaseUrl}/product/favourite/`,
		favouritesQuery
	)
	const favouritesResponse = await $fetch(favouritesUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})

	// Reviews
	const reviewsQuery: ReviewQuery = {
		userId: String(accountParsedData.id),
		pagination: 'false'
	}
	const reviewsUrl = buildFullUrl(
		`${config.public.apiBaseUrl}/product/review/`,
		reviewsQuery
	)
	const reviewsResponse = await $fetch(reviewsUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})

	// Orders
	const ordersQuery: OrderQuery = {
		userId: String(accountParsedData.id),
		pagination: 'false'
	}
	const ordersUrl = buildFullUrl(`${config.public.apiBaseUrl}/order/`, ordersQuery)
	const ordersResponse = await $fetch(ordersUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})

	// Parse data
	const favouritesParsedData = await parseDataAs(
		favouritesResponse,
		z.array(ZodFavourite)
	)
	const reviewsParsedData = await parseDataAs(reviewsResponse, z.array(ZodReview))
	const ordersParsedData = await parseDataAs(ordersResponse, z.array(ZodOrder))

	return {
		account: accountParsedData,
		favourites: favouritesParsedData,
		orders: ordersParsedData,
		reviews: reviewsParsedData
	}
})
