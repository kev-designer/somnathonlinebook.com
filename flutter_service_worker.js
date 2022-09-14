'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "fbf292059d67f2795c5f083320630fa1",
"index.html": "91b7b69ed2a23124909fd9d793ba90a0",
"/": "91b7b69ed2a23124909fd9d793ba90a0",
"main.dart.js": "56167524c4c976d5ea6471fa29591d5d",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "458e98adafb0287b5f780729f7039fe6",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "32229aae2fb6bdfc4ae534bb603b5f3b",
"assets/AssetManifest.json": "cf084e3a3654136e13b3b07db365f223",
"assets/NOTICES": "8039e8eb43a1965ec7a95ff6c99c40c8",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "869d057e3c346ddee1e9550479f1aaa7",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/imgs/web/bg3.jpeg": "305e644cff26e0259118c5efcff790f7",
"assets/assets/imgs/web/bg2.jpeg": "497189827a4fc5b116c14fcf5c866cf0",
"assets/assets/imgs/web/tc.png": "550899fac3b0ab7e677b22c87b9505cf",
"assets/assets/imgs/web/UDui.gif": "31ef0b56f04e7f16be6e68432c683ba9",
"assets/assets/imgs/web/fb.png": "33842db4da4243e09cd39784c43f6a80",
"assets/assets/imgs/web/bg5.jpeg": "cc7efed29e055badd8a40080a966ac57",
"assets/assets/imgs/web/bg4.jpeg": "57a963f2c74d18faa44b553a3885f21b",
"assets/assets/imgs/web/logo1.png": "458e98adafb0287b5f780729f7039fe6",
"assets/assets/imgs/web/bg7.jpeg": "9c0132990e8c9898950b3040fdd10d6d",
"assets/assets/imgs/web/bg6.jpeg": "5af6d85d38dde41356e337524e787f33",
"assets/assets/imgs/web/insta.png": "f5931f3f1b46147015d764ad21f21636",
"assets/assets/imgs/web/new.png": "7b4cf135333c0b58d9ca34c5f7ff7e61",
"assets/assets/imgs/web/bg2.jpg": "079edfc380c4367cc1bbee1cc33a8888",
"assets/assets/imgs/web/bg1.jpeg": "0b049b49824c522d01c3801e2ed14de7",
"assets/assets/imgs/web/WhatsApp.png": "4001a51ea2335014bcb67102c61f22c6",
"assets/assets/imgs/web/image.png": "7b4cf135333c0b58d9ca34c5f7ff7e61",
"assets/assets/imgs/web/insta.jpeg": "6dd136ffd3d3aa068ddde477935a2a0a",
"assets/assets/imgs/icon/bg5.png": "29c649846d1390a96a7d9ffc16fb451b",
"assets/assets/imgs/icon/4.png": "23686e7c43a02331f32a152f65ee150f",
"assets/assets/imgs/icon/5.png": "63cc95265ec79a6775d427dd5d64fff1",
"assets/assets/imgs/icon/2.png": "d7ecc2388501ece5d70a7fc19cf9508f",
"assets/assets/imgs/icon/3.png": "b4d4e9a7b9d146ad4d79b963ea37a437",
"assets/assets/imgs/icon/1.png": "d9c9f2b4da908f1343499ba90b73d0d6",
"assets/assets/gif/4.gif": "31ef0b56f04e7f16be6e68432c683ba9",
"assets/assets/gif/5.gif": "f10f4eecbafe16d7a2b50a8e06d121f8",
"assets/assets/gif/2.gif": "5c0e699c6c340a413f6b49a02adf2128",
"assets/assets/gif/3.gif": "439981d94537faae3b0709e41e0b549b",
"assets/assets/gif/1.gif": "834bdc62616b124bf0d764b670763438",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
