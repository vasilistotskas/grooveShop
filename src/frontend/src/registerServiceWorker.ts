/* eslint-disable no-console */

import { register } from 'register-service-worker'

register(`${process.env.BASE_URL}serviceworker.js`, {
  ready() {
    console.log('ready')
    console.log(
      'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
    )
  },
  registered(registration) {
    console.log('registered')
    // Routinely check for app updates by testing for a new service worker.
    setInterval(() => {
      registration.update().then((r) => console.log('rrrrr', r))
    }, 1000 * 60 * 60) // e.g. hourly checks
  },
  cached() {
    console.log('cached')
    console.log('Content has been cached for offline use.')
  },
  updatefound() {
    console.log('updatefound')
    console.log('New content is downloading.')
  },
  updated(registration) {
    console.log('updated')
    // Add a custom event and dispatch it.
    // Used to display of a 'refresh' banner following a service worker update.
    // Set the event payload to the service worker registration object.
    document.dispatchEvent(new CustomEvent('swUpdated', { detail: registration }))
  },
  offline() {
    console.log('offline')
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(error) {
    console.log('error')
    console.error('Error during service worker registration:', error)
  },
})
