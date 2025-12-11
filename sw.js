// CleanPro Service Worker for PWA
const CACHE_NAME = 'cleanpro-timeclock-v1';
const urlsToCache = [
  '/timeclock.html',
  '/css/styles.css',
  '/js/firebase-config.js',
  '/js/i18n.js',
  '/js/utils.js',
  '/js/audit.js'
];

// Install - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll failed:', err);
        });
      })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - network first, fall back to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and Firebase requests
  if (event.request.method !== 'GET' || 
      event.request.url.includes('firebaseio.com') ||
      event.request.url.includes('googleapis.com') ||
      event.request.url.includes('firebase')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});

// Handle background sync for state persistence
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-timeclock-state') {
    event.waitUntil(syncTimeclockState());
  }
});

async function syncTimeclockState() {
  // This would sync state with the server when back online
  console.log('Background sync triggered');
}

// Keep service worker alive for timer
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'KEEP_ALIVE') {
    // Respond to keep-alive pings
    event.ports[0].postMessage({ type: 'ALIVE' });
  }
});