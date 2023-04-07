import { H3Event } from 'h3'
import { z } from 'zod'
import { parseDataAs } from '~/zod/parser'
import { ZodAccount } from '~/zod/user/account'
import { buildFullUrl } from '~/helpers/api'
import { FavouriteQuery, ZodFavourite } from '~/zod/product/favourite'

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig()
	const cookie = event.node.req.headers.cookie
	const accountResponse = await fetch(
		`${config.public.apiBaseUrl}/user/account/session/`,
		{
			headers: {
				Cookie: cookie || ''
			}
		}
	)
	const accountData = await accountResponse.json()

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

	const accountParsedData = await parseDataAs(accountData, ZodAccount)
	const favouritesParsedData = await parseDataAs(favouritesData, z.array(ZodFavourite))

	return {
		account: accountParsedData,
		favourites: favouritesParsedData
	}
})
