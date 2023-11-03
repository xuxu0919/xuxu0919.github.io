/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/about/index.html","ac2633217a9bf5e7e242e12e8debe993"],["/archives/2023/02/index.html","ad6e7c8d6fac28fdadacebb8c56ba04f"],["/archives/2023/03/index.html","228afb204a368d5460f9fae1d2d2f7a7"],["/archives/2023/04/index.html","75cb3f20aab81e43fe24e03bba71de2d"],["/archives/2023/05/index.html","2900e424719c327b1e29faab225c0da3"],["/archives/2023/07/index.html","2ed3a3356f40519b5d4512c765862fa9"],["/archives/2023/10/index.html","c48c2d3d6e79da9ffc32a0cd0b127c83"],["/archives/2023/11/index.html","f0e43237f8dbe5cb0e9be892da0c7028"],["/archives/2023/index.html","617a53abefaf9df4094ce163f264982d"],["/archives/2023/page/2/index.html","f5dbc2e0b988963e3a8d9f165d329446"],["/archives/index.html","472a82eb33bf2085c4fd6d4feea982ad"],["/archives/page/2/index.html","54489a348a25528559101d3937d5c537"],["/categories/index.html","cdc3d82a1023591a677c31346b314187"],["/css/background.css","88536271673ff5ee9996f7df8623e8d5"],["/css/index.css","54246d481a8cebd26e3c0dde4358a8d8"],["/css/rightMenu.css","2ba14ba4d1a0a06e83fddcb4b77daf35"],["/css/universe.css","52c685572ce95860fe8ddf20fb03df83"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/avatar.jpg","200ccba7b71743c315686df6788e26a2"],["/img/background.jpg","eb687078744c80cb460dded0a194e38c"],["/img/default_top_img.jpg","fe8240824c1a162268048e10b12f239c"],["/img/favicon.png","92f33621c3526e7d9af8959952e4f558"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/loading.gif","f262729ae942ac4a63f1eef2f4737ff9"],["/index.html","6640427068eb1a74d445808bf64ed67a"],["/js/main.js","b28662bf81abe2838d20faf2980f0034"],["/js/rightMenu.js","c0ba4d3e07b51f8020adda717ac9b743"],["/js/search/algolia.js","308de383b932f321e04751fd1f79cffb"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","58cb9443474ea5d84a1c4ac806c8b4b7"],["/js/universe.js","fafdd847299ee73d084aa36ced9bce97"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/js/weather.js","c568b5aa9eb3c8e1e9b48e36b7b508fd"],["/link/index.html","733fe454afd6884301548a74ce1b626e"],["/page/2/index.html","c30f8ff3d3e256661eadc727ef4a2e50"],["/post/2679200a.html","3e828ad4925038ca6ca1b8028cb20151"],["/post/3ce9d3bc.html","d6477d91be0c594cb24a3d951d9db97b"],["/post/5473bd.html","f2ebc67ed3bc25509ec996be4928c670"],["/post/5f593b8b.html","bf147163da43768857fc952e02f9088c"],["/post/6c198c6.html","5933a780a2bd6ba36ee572e2d493d87f"],["/post/80f02bc5.html","448f2e6406e5bb84bada15bddb2b029c"],["/post/83dcefb7.html","d336225553ebce1a4e15e977c3942ea1"],["/post/8ac6c1a1.html","7ee10d8548a00fb1496f0817e6f99531"],["/post/a64d78f2.html","1cb0d584316da62b5407b2570b139593"],["/post/a7eefc60.html","0047564c7608e1957e7defc7951dd286"],["/post/b3432909.html","3d9344f16914ca32a7a0d90eeec19ed4"],["/post/d17189cf.html","c82631ead1e7908695487131deabfd15"],["/post/ecb6de2c.html","aee0fd4d35b0f2553d2c646556ae1421"],["/sw-register.js","861e7c6eee2ac60f4682e134d1d8c677"],["/tags/BUUCTF/index.html","e8aeb632e048b62c27b2928df28e8b34"],["/tags/Misc/index.html","7f5a1f25485a8f906475318b805c7573"],["/tags/PHP/index.html","4152a91c8bf10812f89e417df9862826"],["/tags/SSTI/index.html","dc296e838b76fead7f6ae91a20cd3488"],["/tags/Spawn-failed/index.html","cbc654a69a75a0aa7d608a20784c352f"],["/tags/WP/index.html","7ebc181aeb68c0ddfd53ef76e1b1f4c2"],["/tags/index.html","3a96bdbba09907fd02b8af29eb0866ea"],["/tags/靶场/index.html","7e32f0a014d97efd7c08fb2ae3a9d319"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
