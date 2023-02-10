var cacheName = "lessonStore-v1";
var cacheFiles = [
    'index.html',
    'product.js',
    'style.css',
    'webstore.webmanifest',
    'images/art.png',
    'images/biology.png',
    'images/chemistry.png',
    'images/cs.png',
    'images/english.png',
    'images/geography.png',
    'images/history.png',
    'images/math.png',
    'images/physics.png',
    'images/psychology.png'
]


self.addEventListener('install', (e) =>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request,response.close());
                    return response;
                })
            })
        })
    )
});