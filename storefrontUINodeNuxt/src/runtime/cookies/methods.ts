import Cookies from 'js-cookie'
import slugify from '@sindresorhus/slugify'

import { Cookie, ModuleOptions } from './types'

export const getAllCookieIdsString = (moduleOptions: ModuleOptions) =>
	getCookieIds([
		...moduleOptions.cookies.necessary,
		...moduleOptions.cookies.optional
	]).join('')

export const getCookie = (name: string) => Cookies.get(name)

export const getCookieId = (cookie: Cookie) => cookie.id || slugify(cookie.name)

export const getCookieIds = (cookies: Cookie[]) =>
	cookies.map((cookie) => getCookieId(cookie))

export const removeCookie = (name: string) => Cookies.remove(name)

export const setCookie = (
	name: string,
	value: string,
	options: Cookies.CookieAttributes
) => Cookies.set(name, value, { sameSite: 'Strict', ...options })
