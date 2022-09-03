import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const session = axios.create({
  baseURL: process.env.VITE_APP_BASE_URL,
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

session.defaults.headers.put['Content-Type'] = 'application/json'
session.defaults.headers.put['X-CSRFToken'] = cookies.get('csrftoken')
export default session
