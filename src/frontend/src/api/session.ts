import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const session = axios.create({
  baseURL: 'http://localhost:8001',
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})
session.defaults.headers['Content-Type'] = 'application/json'
session.defaults.headers['X-CSRFToken'] = cookies.get('csrftoken')

export default session
