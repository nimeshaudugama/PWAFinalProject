const cacheName = 'cacheAssets-v8';

//On Install Event

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/library.html',
                    'img/1.jpg',
                    'img/2.jpg',
                    '/javascript.js',
                    '/css/style.css',
                    '/manifest.json',
                    '/js/scripts.js',
                    '/icons/favicon-16x16.png',
                    '/icons/favicon-32x32.png',
                    'icons/android-chrome-144x144.png',


                ])


            })
    )
});

//On Activate  Event
self.addEventListener('activate', (event) => {

    event.waitUntil(clients.claim());

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.forEach((item) => {
                    if (item !== cacheName) {
                        caches.delete(item);
                    }
                });
            })
    );
});



//Cache Startegy : Cache with Network Fallback

self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.open(cacheName)
            .then((cache) => {
                return cache.match(event.request)
                    .then((response) => {
                        return response || fetch(event.request);
                    })
            }
            )


    );
});


self.addEventListener("fetch", (event) => {

    //console.log('Request:',event.request.method);
    if(event.request.method === 'GET') {
        event.respondWith(
                        caches.open(cacheName)
                        .then((cache) => {
                            return cache.match(event.request)
                                .then((cachedResponse) => {
                                    const fetchedResponse = fetch(event.request)
                                        .then((networkResponse) => {
                                            cache.put(event.request, networkResponse.clone());
                                            return networkResponse;
                                        })
                                        .catch(() => {
                                            return caches.match('/offline.html');
                                        });
                                        return cachedResponse || fetchedResponse;
                                })
                        })
                    );
    }
});


self.addEventListener('notificationclick', (event) => {
    console.log('Event', event);
    const buttonClicked = event.action;
    let message = '';
    
    switch (buttonClicked) {
      case 'confirm':
        message = 'So we both agree on that';
        break;
      case 'cancel':
        message = "Let's agree to disagree.";
        break;
      default:
        return;
    }
  
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'notificationClick', message });
        });
      })
    );
  });


//   * On Background Synchronization.
// §* /
self. addEventListener ('sync', (event) => {
console.log ('[SW] Bg Sync:', event);
if (event.tag === 'my-tag-name') {
console. log ('Do something');
}
else if (event.tag === 'add-game') {
console. log ('Add game');
 }
});


  