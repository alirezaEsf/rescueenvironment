/*
// ngsw-worker.js
const CACHE_VERSION = 'v1';
const APP_CACHE = `app-cache-${CACHE_VERSION}`;
const BASE_HREF = '/rescueenvironment/';
const OFFLINE_URL = `${BASE_HREF}offline.html`;

// لیست منابعی که باید cache شوند
const APP_SHELL_FILES = [
    `${BASE_HREF}`,
    `${BASE_HREF}index.html`,
    `${BASE_HREF}manifest.webmanifest`,
    `${BASE_HREF}main.*.js`,
    `${BASE_HREF}polyfills.*.js`,
    `${BASE_HREF}runtime.*.js`,
    `${BASE_HREF}styles.*.css`,
    `${BASE_HREF}assets/icons/pwa/icon-72x72.png`,
    `${BASE_HREF}assets/icons/pwa/icon-192x192.png`,
    `${BASE_HREF}assets/icons/pwa/icon-512x512.png`
    `${BASE_HREF}assets/icons/pwa/wide-screenshot-pwa1.png`
    `${BASE_HREF}assets/icons/pwa/wide-screenshot-pwa-mobile.png`
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(APP_CACHE)
            .then((cache) => cache.addAll(APP_SHELL_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== APP_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // فقط درخواست‌های GET را پردازش کن
    if (event.request.method !== 'GET') return;

    // برای APIها از استراتژی Network First استفاده کن
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // پاسخ API را cache کن
                    const responseClone = response.clone();
                    caches.open(APP_CACHE)
                        .then((cache) => cache.put(event.request, responseClone));
                    return response;
                })
                .catch(() => {
                    // اگر شبکه در دسترس نبود، از نسخه cache شده استفاده کن
                    return caches.match(event.request);
                })
        );
        return;
    }

    // برای فایل‌های استاتیک از استراتژی Cache First استفاده کن
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request)
                    .then((response) => {
                        // فایل‌های جدید را cache کن
                        if (event.request.url.startsWith('http') && !event.request.url.includes('/socket.io/')) {
                            const responseToCache = response.clone();
                            caches.open(APP_CACHE)
                                .then((cache) => cache.put(event.request, responseToCache));
                        }
                        return response;
                    })
                    .catch(() => {
                        // صفحه آفلاین را نمایش بده
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match(OFFLINE_URL);
                        }
                    });
            })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
*/
