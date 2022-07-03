const { registerRoute } = require('workbox-routing')
const { NetworkOnly } = require('workbox-strategies')
const { NavigationRoute } = require('workbox-routing')
const { precacheAndRoute } = require('workbox-precaching')

var staticCacheName = 'django-pwa-v' + new Date().getTime()

var filesToCache = [
  '/offline',
  '/backend/static/favicon/apple-icon-57x57.png',
  '/backend/static/favicon/apple-icon-60x60.png',
  '/backend/static/favicon/apple-icon-72x72.png',
  '/backend/static/favicon/apple-icon-76x76.png',
  '/backend/static/favicon/apple-icon-114x114.png',
  '/backend/static/favicon/apple-icon-120x120.png',
  '/backend/static/favicon/apple-icon-144x144.png',
  '/backend/static/favicon/apple-icon-152x152.png',
  '/backend/static/favicon/apple-icon-180x180.png',
  '/backend/static/favicon/android-icon-192x192.png',
  '/backend/static/favicon/favicon-32x32.png',
  '/backend/static/favicon/favicon-96x96.png',
  '/backend/static/favicon/favicon-16x16.png',
]

// Cache on install
self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return fetch('/offline/').then((response) => cache.put('/offline/', new Response(response.body)))
    })
  )
})

// Clear cache on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('django-pwa-'))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
})

// Serve from Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request)
      })
      .catch(() => {
        return caches.match('offline/')
      })
  )
})

let click_open_url
self.addEventListener('push', function (event) {
  let push_message = event.data.json()
  // push notification can send event.data.json() as well
  click_open_url = push_message.notification.data.url
  const options = {
    body: push_message.notification.body,
    icon: push_message.notification.icon,
    image: push_message.notification.image,
    tag: 'alert',
  }
  event.waitUntil(self.registration.showNotification(push_message.notification.title, options))
})

self.addEventListener('notificationclick', function (event) {
  const clickedNotification = event.notification
  clickedNotification.close()
  if (click_open_url) {
    const promiseChain = clients.openWindow(click_open_url)
    event.waitUntil(promiseChain)
  }
})

const FALLBACK_URL = '/offline'

const networkOnly = NetworkOnly()

const route = new NavigationRoute(({ event }) => {
  return networkOnly.handle({ event }).catch(() => caches.match(FALLBACK_URL))
})

registerRoute(route)
