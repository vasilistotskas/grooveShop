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
	const accountResponse = await fetch(
		`${config.public.apiBaseUrl}/user/account/session/`,
		{
			headers: {
				Cookie: cookie || ''
			}
		}
	)
	const accountData = await accountResponse.json()

	// Favourites
	const favouritesQuery: FavouriteQuery = {
		user_id: accountData.id,
		pagination: 'false'
	}
	const favouritesUrl = buildFullUrl(
		`${config.public.apiBaseUrl}/product/favourite/`,
		favouritesQuery
	)
	const favouritesResponse = await fetch(favouritesUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const favouritesData = await favouritesResponse.json()

	// Reviews
	const reviewsQuery: ReviewQuery = {
		user_id: accountData.id,
		pagination: 'false'
	}
	const reviewsUrl = buildFullUrl(
		`${config.public.apiBaseUrl}/product/review/`,
		reviewsQuery
	)
	const reviewsResponse = await fetch(reviewsUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const reviewsData = await reviewsResponse.json()

	// Orders
	const ordersQuery: OrderQuery = {
		user_id: accountData.id,
		pagination: 'false'
	}
	const ordersUrl = buildFullUrl(`${config.public.apiBaseUrl}/order/`, ordersQuery)
	const ordersResponse = await fetch(ordersUrl, {
		headers: {
			Cookie: cookie || ''
		}
	})
	const ordersData = await ordersResponse.json()

	// Parse data
	const accountParsedData = await parseDataAs(accountData, ZodAccount)
	const favouritesParsedData = await parseDataAs(favouritesData, z.array(ZodFavourite))
	const ordersParsedData = await parseDataAs(ordersData, z.array(ZodOrder))
	const reviewsParsedData = await parseDataAs(reviewsData, z.array(ZodReview))

	return {
		account: accountParsedData,
		favourites: favouritesParsedData,
		orders: ordersParsedData,
		reviews: reviewsParsedData
	}
})
