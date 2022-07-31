var staticCacheName = 'django-pwa-v' + new Date().getTime()

const filesToCache = [
  '/',
  '/backend/static/js/chunk-vendors.js',
  '/backend/static/js/app.js',
  '/backend/static/favicon/favicon-16x16.png',
  '/backend/static/favicon/favicon-32x32.png',
  '/backend/static/favicon/favicon-96x96.png',
]

// Cache on install
self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
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
self.addEventListener('fetch', function (event) {
  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/'))
      return
    }
  }
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
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
