/*! For license information please see service-worker.js.LICENSE.txt */
(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.4"]&&_()}catch(e){}},550:()=>{try{self["workbox:expiration:6.5.4"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.4"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.4"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.4"]&&_()}catch(e){}}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}(()=>{a(913);const e=(e,...t)=>{let a=e;return t.length>0&&(a+=` :: ${JSON.stringify(t)}`),a};class t extends Error{constructor(t,a){super(e(t,a)),this.name=t,this.details=a}}const n=new Set;const s={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[s.prefix,e,s.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||r(s.precache),i=e=>e||r(s.runtime);function c(e,t){const a=new URL(e);for(const e of t)a.searchParams.delete(e);return a.href}let h;function l(e){e.then((()=>{}))}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function p(e,t){const a=t();return e.waitUntil(a),a}async function f(e,a){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const s=e.clone(),r={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},o=a?a(r):r,i=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?s.body:await s.blob();return new Response(i,o)}a(977);function m(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:a,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!a){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",a),{cacheKey:s.href,url:r.href}}class g{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:a})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;a?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return a}}}class w{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const a=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return a?new Request(a,{headers:e.headers}):e},this._precacheController=e}}a(873);function y(e){return"string"==typeof e?new Request(e):e}class A{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:a}=this;let n=y(e);if("navigate"===n.mode&&a instanceof FetchEvent&&a.preloadResponse){const e=await a.preloadResponse;if(e)return e}const s=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:a})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:a,request:r,response:e});return e}catch(e){throw s&&await this.runCallbacks("fetchDidFail",{error:e,event:a,originalRequest:s.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}async cacheMatch(e){const t=y(e);let a;const{cacheName:n,matchOptions:s}=this._strategy,r=await this.getCacheKey(t,"read"),o=Object.assign(Object.assign({},s),{cacheName:n});a=await caches.match(r,o);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await e({cacheName:n,matchOptions:s,cachedResponse:a,request:r,event:this.event})||void 0;return a}async cachePut(e,a){const s=y(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const o=await this.getCacheKey(s,"write");if(!a)throw new t("cache-put-with-no-response",{url:d(o.url)});const i=await this._ensureResponseSafeToCache(a);if(!i)return!1;const{cacheName:h,matchOptions:l}=this._strategy,u=await self.caches.open(h),p=this.hasCallback("cacheDidUpdate"),f=p?await async function(e,t,a,n){const s=c(t.url,a);if(t.url===s)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),o=await e.keys(t,r);for(const t of o)if(s===c(t.url,a))return e.match(t,n)}(u,o.clone(),["__WB_REVISION__"],l):null;try{await u.put(o,p?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of n)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:h,oldResponse:f,newResponse:i.clone(),request:o,event:this.event});return!0}async getCacheKey(e,t){const a=`${e.url} | ${t}`;if(!this._cacheKeys[a]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=y(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[a]=n}return this._cacheKeys[a]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const a=this._pluginStateMap.get(t),n=n=>{const s=Object.assign(Object.assign({},n),{state:a});return t[e](s)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return a||t&&200!==t.status&&(t=void 0),t}}class _{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,a="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,s=new A(this,{event:t,request:a,params:n}),r=this._getResponse(s,a,t);return[r,this._awaitComplete(r,s,a,t)]}async _getResponse(e,a,n){let s;await e.runCallbacks("handlerWillStart",{event:n,request:a});try{if(s=await this._handle(a,e),!s||"error"===s.type)throw new t("no-response",{url:a.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(s=await r({error:t,event:n,request:a}),s)break;if(!s)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))s=await t({event:n,request:a,response:s});return s}async _awaitComplete(e,t,a,n){let s,r;try{s=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:a,response:s}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:a,response:s,error:r}),t.destroy(),r)throw r}}class b extends _{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(b.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const a=await t.cacheMatch(e);return a||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,a){let n;const s=a.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=s.integrity,r=e.integrity,o=!r||r===t;if(n=await a.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&o&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await a.cachePut(e,n.clone());0}}return n}async _handleInstall(e,a){this._useDefaultCacheabilityPluginIfNeeded();const n=await a.fetch(e);if(!await a.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[a,n]of this.plugins.entries())n!==b.copyRedirectedCacheableResponsesPlugin&&(n===b.defaultPrecacheCacheabilityPlugin&&(e=a),n.cacheWillUpdate&&t++);0===t?this.plugins.push(b.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}b.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},b.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class x{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:a=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new b({cacheName:o(e),plugins:[...t,new w({precacheController:this})],fallbackToNetwork:a}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const a=[];for(const n of e){"string"==typeof n?a.push(n):n&&void 0===n.revision&&a.push(n.url);const{cacheKey:e,url:s}=m(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),a.length>0){const e=`Workbox is precaching URLs without revision info: ${a.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return p(e,(async()=>{const t=new g;this.strategy.plugins.push(t);for(const[t,a]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(a),s=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:n,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:r,event:e}))}const{updatedURLs:a,notUpdatedURLs:n}=t;return{updatedURLs:a,notUpdatedURLs:n}}))}activate(e){return p(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),a=new Set(this._urlsToCacheKeys.values()),n=[];for(const s of t)a.has(s.url)||(await e.delete(s),n.push(s.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,a=this.getCacheKeyForURL(t);if(a){return(await self.caches.open(this.strategy.cacheName)).match(a)}}createHandlerBoundToURL(e){const a=this.getCacheKeyForURL(e);if(!a)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:a},t.params),this.strategy.handle(t))}}let D;const v=()=>(D||(D=new x),D);a(80);const I=e=>e&&"object"==typeof e?e:{handle:e};class R{constructor(e,t,a="GET"){this.handler=I(t),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=I(e)}}class C extends R{constructor(e,t,a){super((({url:t})=>{const a=e.exec(t.href);if(a&&(t.origin===location.origin||0===a.index))return a.slice(1)}),t,a)}}class E{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const a=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const a=new Request(...t);return this.handleRequest({request:a,event:e})})));e.waitUntil(a),e.ports&&e.ports[0]&&a.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return void 0;const n=a.origin===location.origin,{params:s,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:a});let o=r&&r.handler;const i=e.method;if(!o&&this._defaultHandlerMap.has(i)&&(o=this._defaultHandlerMap.get(i)),!o)return void 0;let c;try{c=o.handle({url:a,request:e,event:t,params:s})}catch(e){c=Promise.reject(e)}const h=r&&r.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async n=>{if(h){0;try{return await h.handle({url:a,request:e,event:t,params:s})}catch(e){e instanceof Error&&(n=e)}}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw n}))),c}findMatchingRoute({url:e,sameOrigin:t,request:a,event:n}){const s=this._routes.get(a.method)||[];for(const r of s){let s;const o=r.match({url:e,sameOrigin:t,request:a,event:n});if(o)return s=o,(Array.isArray(s)&&0===s.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(s=void 0),{route:r,params:s}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,I(e))}setCatchHandler(e){this._catchHandler=I(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const a=this._routes.get(e.method).indexOf(e);if(!(a>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(a,1)}}let M;const L=()=>(M||(M=new E,M.addFetchListener(),M.addCacheListener()),M);function T(e,a,n){let s;if("string"==typeof e){const t=new URL(e,location.href);0;s=new R((({url:e})=>e.href===t.href),a,n)}else if(e instanceof RegExp)s=new C(e,a,n);else if("function"==typeof e)s=new R(e,a,n);else{if(!(e instanceof R))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return L().registerRoute(s),s}class U extends R{constructor(e,t){super((({request:a})=>{const n=e.getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:a="index.html",cleanURLs:n=!0,urlManipulation:s}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const o=function(e,t=[]){for(const a of[...e.searchParams.keys()])t.some((e=>e.test(a)))&&e.searchParams.delete(a);return e}(r,t);if(yield o.href,a&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=a,yield e.href}if(n){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(s){const e=s({url:r});for(const t of e)yield t.href}}(a.url,t)){const t=n.get(s);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};const q=(e,t)=>t.some((t=>e instanceof t));let S,N;const P=new WeakMap,$=new WeakMap,K=new WeakMap,O=new WeakMap,B=new WeakMap;let W={get(e,t,a){if(e instanceof IDBTransaction){if("done"===t)return $.get(e);if("objectStoreNames"===t)return e.objectStoreNames||K.get(e);if("store"===t)return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return Z(e[t])},set:(e,t,a)=>(e[t]=a,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function j(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(N||(N=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(H(this),t),Z(P.get(this))}:function(...t){return Z(e.apply(H(this),t))}:function(t,...a){const n=e.call(H(this),t,...a);return K.set(n,t.sort?t.sort():[t]),Z(n)}}function F(e){return"function"==typeof e?j(e):(e instanceof IDBTransaction&&function(e){if($.has(e))return;const t=new Promise(((t,a)=>{const n=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",r),e.removeEventListener("abort",r)},s=()=>{t(),n()},r=()=>{a(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",s),e.addEventListener("error",r),e.addEventListener("abort",r)}));$.set(e,t)}(e),q(e,S||(S=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,W):e)}function Z(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,a)=>{const n=()=>{e.removeEventListener("success",s),e.removeEventListener("error",r)},s=()=>{t(Z(e.result)),n()},r=()=>{a(e.error),n()};e.addEventListener("success",s),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&P.set(t,e)})).catch((()=>{})),B.set(t,e),t}(e);if(O.has(e))return O.get(e);const t=F(e);return t!==e&&(O.set(e,t),B.set(t,e)),t}const H=e=>B.get(e);const z=["get","getKey","getAll","getAllKeys","count"],X=["put","add","delete","clear"],Y=new Map;function V(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(Y.get(t))return Y.get(t);const a=t.replace(/FromIndex$/,""),n=t!==a,s=X.includes(a);if(!(a in(n?IDBIndex:IDBObjectStore).prototype)||!s&&!z.includes(a))return;const r=async function(e,...t){const r=this.transaction(e,s?"readwrite":"readonly");let o=r.store;return n&&(o=o.index(t.shift())),(await Promise.all([o[a](...t),s&&r.done]))[0]};return Y.set(t,r),r}W=(e=>({...e,get:(t,a,n)=>V(t,a)||e.get(t,a,n),has:(t,a)=>!!V(t,a)||e.has(t,a)}))(W);a(550);const J="cache-entries",Q=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class G{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(J,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const a=indexedDB.deleteDatabase(e);t&&a.addEventListener("blocked",(e=>t(e.oldVersion,e))),Z(a).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const a={url:e=Q(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(J,"readwrite",{durability:"relaxed"});await n.store.put(a),await n.done}async getTimestamp(e){const t=await this.getDb(),a=await t.get(J,this._getId(e));return null==a?void 0:a.timestamp}async expireEntries(e,t){const a=await this.getDb();let n=await a.transaction(J).store.index("timestamp").openCursor(null,"prev");const s=[];let r=0;for(;n;){const a=n.value;a.cacheName===this._cacheName&&(e&&a.timestamp<e||t&&r>=t?s.push(n.value):r++),n=await n.continue()}const o=[];for(const e of s)await a.delete(J,e.id),o.push(e.url);return o}_getId(e){return this._cacheName+"|"+Q(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:a,upgrade:n,blocking:s,terminated:r}={}){const o=indexedDB.open(e,t),i=Z(o);return n&&o.addEventListener("upgradeneeded",(e=>{n(Z(o.result),e.oldVersion,e.newVersion,Z(o.transaction),e)})),a&&o.addEventListener("blocked",(e=>a(e.oldVersion,e.newVersion,e))),i.then((e=>{r&&e.addEventListener("close",(()=>r())),s&&e.addEventListener("versionchange",(e=>s(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),i}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class ee{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new G(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),a=await self.caches.open(this._cacheName);for(const e of t)await a.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,l(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),a=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<a}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}var te,ae;!function(e){const t=20037508.342789244,a={};let n;const s=async(e,t,n)=>new Promise(((s,r)=>{try{if(a[e])s(a[e]);else{const o=indexedDB.open(e);o.onupgradeneeded=function(e){e.target.result.createObjectStore(t,{keyPath:n})},o.onsuccess=function(t){const n=t.target.result;a[e]=n,s(n)},o.onerror=function(e){r(e)}}}catch(e){r(e)}})),r=async(e,t,a,n)=>new Promise(((s,r)=>{const o=e.transaction([t],"readonly"),i=o.objectStore(t),c=n?i.getKey(a):i.get(a);c.onsuccess=function(e){},c.onerror=function(e){r(e)},o.oncomplete=function(e){s(c.result)},o.onabort=function(e){r(e)},o.onerror=function(e){r(e)}})),o=async(e,t,a)=>new Promise(((n,s)=>{const r=e.transaction([t],"readwrite"),o=r.objectStore(t).put(a);o.onsuccess=function(e){},o.onerror=function(e){s(e)},r.oncomplete=function(e){n()},r.onabort=function(e){s(e)},r.onerror=function(e){s(e)}})),i=async(e,t,a,i,c)=>{let h;const l=await s("Weiwudi"),u=await r(l,"mapSetting",e);if(!c){if(!u)return`Error: MapID "${e}" not found`;if(t<u.minZoom||t>u.maxZoom)h="zoom";else{const e=Math.floor(u.minX/Math.pow(2,u.maxZoom-t)),n=Math.floor(u.maxX/Math.pow(2,u.maxZoom-t)),s=Math.floor(u.minY/Math.pow(2,u.maxZoom-t)),r=Math.floor(u.maxY/Math.pow(2,u.maxZoom-t));(a<e||a>n||i<s||i>r)&&(h="extent")}}let d,p={},f=200,m="OK";if(h)"zoom"===h?(f=404,m="Not Found"):(p={"content-type":"image/png"},d=((e,t="",a=512)=>{const n=atob(e),s=[];for(let e=0;e<n.length;e+=a){const t=n.slice(e,e+a),r=new Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);const o=new Uint8Array(r);s.push(o)}return new Blob(s,{type:t})})("iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAB3RJTUUH3QgIBToaSbAjlwAAABd0RVh0U29mdHdhcmUAR0xEUE5HIHZlciAzLjRxhaThAAAACHRwTkdHTEQzAAAAAEqAKR8AAAAEZ0FNQQAAsY8L/GEFAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAFRJREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgBDwABHHIJwwAAAABJRU5ErkJggg==",p["content-type"]));else{const h=await s(`Weiwudi_${e}`),l=await r(h,"tileCache",`${t}_${a}_${i}`,c),g=(new Date).getTime();if(!l||!l.epoch||g-l.epoch>864e5){const e=((e,t,a,n)=>e.replace("{z}",t).replace("{x}",a).replace("{y}",n).replace("{-y}",Math.pow(2,t)-n-1))(u.url instanceof Array?u.url[Math.floor(Math.random()*u.url.length)]:u.url,t,a,i);try{const s=await fetch(e);s.ok?(p=[...s.headers.entries()].reduce(((e,t)=>({...e,[t[0]]:t[1]})),{}),d=await s.blob(),await o(h,"tileCache",{z_x_y:`${t}_${a}_${i}`,headers:p,blob:d,epoch:g})):(l?(p=l.headers,d=l.blob):(f=s.status,m=s.statusText,p=[...s.headers.entries()].reduce(((e,t)=>({...e,[t[0]]:t[1]})),{}),d=await s.blob()),n&&n.error++)}catch(e){l?(p=l.headers,d=l.blob):(f=404,m="Not Found"),n&&n.error++}}else c||(p=l.headers,d=l.blob)}return c?void 0:new Response(d,{status:f,statusText:m,headers:new Headers(p)})},c=async(e,t)=>{let a=0,r=0;const o=await s(`Weiwudi_${t.mapID}`),c=await(async(e,t)=>new Promise(((a,n)=>{const s=e.transaction([t],"readwrite"),r=s.objectStore(t).getAllKeys();r.onsuccess=function(e){},r.onerror=function(e){n(e)},s.oncomplete=function(e){a(r.result)},s.onabort=function(e){n(e)},s.onerror=function(e){n(e)}})))(o,"tileCache");try{const s=[];for(let e=t.minZoom;e<=t.maxZoom;e++){const a=Math.floor(t.maxX/Math.pow(2,t.maxZoom-e)),n=Math.floor(t.minX/Math.pow(2,t.maxZoom-e)),r=Math.floor(t.maxY/Math.pow(2,t.maxZoom-e)),o=Math.floor(t.minY/Math.pow(2,t.maxZoom-e));for(let t=n;t<=a;t++)for(let a=o;a<=r;a++)s.push([e,t,a])}s.length!=t.totalTile&&console.log("Number of tiles is different");let o=s.splice(0,5);for(;o.length;){if(!await self.clients.get(e.id))return void(n=void 0);if(n.cancel)return n=void 0,void e.postMessage({type:"canceled",message:`Fetching tile of ${t.mapID} is canceled`,mapID:t.mapID});const h=o.map((e=>{if(!(c.indexOf(`${e[0]}_${e[1]}_${e[2]}`)>=0))return i(t.mapID,e[0],e[1],e[2],!0)}));await Promise.all(h),a+=h.length,n.count=a,r=Math.floor(100*a/t.totalTile),e.postMessage({type:"proceed",message:`Proceeding the tile fetching: ${t.mapID} ${r}% (${a} / ${t.totalTile})`,percent:r,processed:a,error:n.error,total:t.totalTile,mapID:t.mapID}),o=s.splice(0,5)}const h=n.error;n=void 0,e.postMessage({type:"finish",message:`Fetched all tiles of ${t.mapID}${h?` with ${h} error cases`:""}`,total:t.totalTile,mapID:t.mapID,error:h})}catch(s){n=void 0,e.postMessage({type:"stop",message:`Fetching stopped: ${t.mapID} ${a} / ${t.totalTile}`,reason:s,processed:a,total:t.totalTile,mapID:t.mapID})}},h=async(e,h,l,u)=>{let d;const p=(e,t)=>t.reduce(((t,a)=>t||(void 0===e[a]?`Error: Attribute "${a}" is missing`:t)),void 0);try{switch(e){case"ping":d="Implemented";break;case"info":if(d=p(h,["mapID"]),!d){const e=await s("Weiwudi","mapSetting","mapID"),t=await r(e,"mapSetting",h.mapID);d=t?new Response(JSON.stringify(t),{headers:new Headers({"content-type":"application/json"})}):`Error: MapID "${h.mapID}" not found`}break;case"add":const f=await s("Weiwudi","mapSetting","mapID");if(d=p(h,["mapID","type","url"]),!d)switch(h.tileSize=parseInt(h.tileSize||256),h.type){case"xyz":if(d=p(h,["width","height"]),!d){h.width=parseInt(h.width),h.height=parseInt(h.height);const e=e=>Math.ceil(Math.log(e/h.tileSize)/Math.log(2));h.maxZoom=Math.max(e(h.width),e(h.height)),h.minZoom=h.minZoom?parseInt(h.minZoom):0,h.minX=0,h.minY=0,h.maxX=Math.ceil(h.width/h.tileSize)-1,h.maxY=Math.ceil(h.height/h.tileSize)-1}break;case"wmts":if(!d){const e=e=>6378137*e*Math.PI/180,a=e=>6378137*Math.log(Math.tan(Math.PI/360*(90+e)));if(h.maxZoom&&(h.maxZoom=parseInt(h.maxZoom)),h.minZoom&&(h.minZoom=parseInt(h.minZoom)),h.maxLng&&h.minLng&&h.maxLat&&h.minLat){h.maxLng=parseFloat(h.maxLng),h.minLng=parseFloat(h.minLng),h.maxLat=parseFloat(h.maxLat),h.minLat=parseFloat(h.minLat);const n=e(h.maxLng),s=e(h.minLng),r=a(h.maxLat),o=a(h.minLat);h.minX=Math.floor((t+s)/(2*t)*Math.pow(2,h.maxZoom)),h.maxX=Math.floor((t+n)/(2*t)*Math.pow(2,h.maxZoom)),h.minY=Math.floor((t-r)/(2*t)*Math.pow(2,h.maxZoom)),h.maxY=Math.floor((t-o)/(2*t)*Math.pow(2,h.maxZoom))}}break;default:d='Error: Unknown "type" value'}if(!d){if(!p(h,["maxX","minX","maxY","minY","minZoom","maxZoom"])){h.totalTile=0;const e=(e,t)=>Math.floor(e/Math.pow(2,h.maxZoom-t));for(let t=h.minZoom;t<=h.maxZoom;t++){const a=e(h.minX,t),n=e(h.minY,t),s=e(h.maxX,t),r=e(h.maxY,t);h.totalTile+=(s-a+1)*(r-n+1)}}await o(f,"mapSetting",h),await s(`Weiwudi_${h.mapID}`,"tileCache","z_x_y"),d=new Response(JSON.stringify(h),{headers:new Headers({"content-type":"application/json"})})}break;case"clean":if(d=p(h,["mapID"]),n&&n.mapID==h.mapID)d=`Error: ${h.mapID} is under fetching process. Please cancel it first`;else if(!d){const e=await s(`Weiwudi_${h.mapID}`);await(async(e,t)=>new Promise(((a,n)=>{const s=e.transaction([t],"readwrite"),r=s.objectStore(t).clear();r.onsuccess=function(e){},r.onerror=function(e){n(e)},s.oncomplete=function(e){a()},s.onabort=function(e){n(e)},s.onerror=function(e){n(e)}})))(e,"tileCache"),d=`Cleaned: ${h.mapID}`}break;case"delete":if(d=p(h,["mapID"]),n&&n.mapID==h.mapID)d=`Error: ${h.mapID} is under fetching process. Please cancel it first`;else if(!d){await(async e=>{a[e]&&(a[e].close(),delete a[e]);return new Promise(((t,a)=>{try{const n=indexedDB.deleteDatabase(e);n.onsuccess=async e=>{t()},n.onerror=function(e){a(e)}}catch(e){a(e)}}))})(`Weiwudi_${h.mapID}`);const e=await s("Weiwudi");await(async(e,t,a)=>new Promise(((n,s)=>{const r=e.transaction([t],"readwrite"),o=r.objectStore(t).delete(a);o.onsuccess=function(e){},o.onerror=function(e){s(e)},r.oncomplete=function(e){n()},r.onabort=function(e){s(e)},r.onerror=function(e){s(e)}})))(e,"mapSetting",h.mapID),d=`Deleted: ${h.mapID}`}break;case"cancel":d=p(h,["mapID"]),n&&n.mapID==h.mapID?(n.cancel=!0,d=`Fetching process of ${n.mapID} is canceled`):d=`Error: There are no fetching process of ${h.mapID}`;case"stats":if(d=p(h,["mapID"]),!d){const e=await s("Weiwudi"),t=await r(e,"mapSetting",h.mapID);if(t){const e=await s(`Weiwudi_${h.mapID}`),a=await(async(e,t)=>new Promise(((a,n)=>{const s=e.transaction([t],"readonly"),r=s.objectStore(t).openCursor();let o=0,i=0;r.onsuccess=function(e){const t=r.result;t&&(o++,i+=t.value.blob.size,t.continue())},r.onerror=function(e){n(e)},s.oncomplete=function(e){a({count:o,size:i})},s.onabort=function(e){n(e)},s.onerror=function(e){n(e)}})))(e,"tileCache");t.totalTile&&(a.total=t.totalTile,a.percent=Math.floor(a.count/a.total*100)),d=new Response(JSON.stringify(a),{headers:new Headers({"content-type":"application/json"})})}else d=`Error: MapID "${h.mapID}" not found`}break;case"cache":const m=l.match(/^([^\/]+)\/(\d+)\/(\d+)\/(\d+)$/);d=m?await i(m[1],parseInt(m[2]),parseInt(m[3]),parseInt(m[4])):'Error: "cache" api needs mapID, zoom, x, y settings';break;case"fetchAll":if(d=p(h,["mapID"]),!d){const e=await s("Weiwudi"),t=await r(e,"mapSetting",h.mapID);t?t.totalTile?n?d=`Error: Another fetching process is running: "${n.mapID}" (${n.count} / ${n.total})`:(setTimeout((()=>{n={mapID:h.mapID,total:t.totalTile,count:0,error:0},c(u,t)}),1),d=`Fetching task start: ${h.mapID}`):d=`Error: Map "${h.mapID}" cannot fetch all tiles`:d=`Error: MapID "${h.mapID}" not found`}break;default:d=`Error: API ${e} not found`}}catch(e){d=`Error: ${e}`}if(d)return d};e(/^https?:\/\/weiwudi.example.com/,(async({url:e,request:t,event:a,params:n})=>{const s=a.clientId?await self.clients.get(a.clientId):void 0,r=e.pathname.match(/^\/api\/([\w\d]+)(?:\/(.+))?$/);if(r){const t=[...e.searchParams.entries()].reduce(((t,a)=>{const n=e.searchParams.getAll(a[0]);return 1===n.length?t[a[0]]=n[0]:t[a[0]]=n,t}),{}),a=r[1],n=r[2];let o=await h(a,t,n,s);if(o)return o instanceof Response||(o=new Response(o)),o}}),"GET")}(T),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),te=[{'revision':'f139459989d467744b6f4f0a3ba9c079','url':'./assets/maplat.css'},{'revision':'2f418ff08f1d0347c27fab783f3504cd','url':'./assets/maplat.js'},{'revision':'eb6f444ff010f040bd800673c6a89c14','url':'./assets/maplat.js.LICENSE.txt'},{'revision':'a1a65a2d80880942f456dc84ba77113e','url':'./service-worker.js.LICENSE.txt'},{'revision':null,'url':'assets/fonts/a8c0074cf70b152b56105e6c4b227bd8.woff'},{'revision':null,'url':'assets/fonts/cfeff2e898a64ebe7e6b5ec078b174c3.woff'},{'revision':null,'url':'assets/images/09c3ce5a86d600e24f8e85de3a019853.png'},{'revision':null,'url':'assets/images/0beac2cb41dfab43ddfd9df80b32b85d.png'},{'revision':null,'url':'assets/images/1354b4f40dd58bb0f2a4871cb4ff81d8.png'},{'revision':null,'url':'assets/images/2a61e310e46b50b5f8ddd5e905ba9db9.png'},{'revision':null,'url':'assets/images/3131423d782cd3ea89a81247065e7f9d.png'},{'revision':null,'url':'assets/images/41b2cf0fa604d3f196ca52337d238219.jpg'},{'revision':null,'url':'assets/images/558bc7e8b9b6c5f41a7141cddb8cdb5e.png'},{'revision':null,'url':'assets/images/56f7003805ed02f8a21199947651db2e.png'},{'revision':null,'url':'assets/images/5ba349e3596aca094c41c56966b45dc7.png'},{'revision':null,'url':'assets/images/6111b8076a2cf81c73f0e46f41a3af60.png'},{'revision':null,'url':'assets/images/6345ee67d554fbfbf484ba4035ad19d9.jpg'},{'revision':null,'url':'assets/images/649fce122b354de2ac725ba5f2661955.png'},{'revision':null,'url':'assets/images/6a580287dea82c2fb9b214321a375145.png'},{'revision':null,'url':'assets/images/6c5dba7f7d76e74c3a8c7c5b1c3fc544.png'},{'revision':null,'url':'assets/images/6e1f2f2f6fed3c5cddeb925e7ae75aba.png'},{'revision':null,'url':'assets/images/799a0177b0dc540682fa4a2e349a8f4f.png'},{'revision':null,'url':'assets/images/7bef6f357e921c43f4f800cfcb757872.png'},{'revision':null,'url':'assets/images/7d9d643a903df6f57b8b7386316021e5.png'},{'revision':null,'url':'assets/images/7df82bae917b68159f84998182f2fdc6.png'},{'revision':null,'url':'assets/images/8e5d0335f6598b8d874ba23ea9fb295f.png'},{'revision':null,'url':'assets/images/90c32e751366be22777f3fe40a53fe06.png'},{'revision':null,'url':'assets/images/9247459937b9c882303962e42bd8d989.png'},{'revision':null,'url':'assets/images/927c34e7b9b2f95c82ba477993117eaf.png'},{'revision':null,'url':'assets/images/95e9ca8285131f8ccb6da5052093173c.png'},{'revision':null,'url':'assets/images/9a243e0cb0fc43e2a016d5d3aaa330d5.png'},{'revision':null,'url':'assets/images/9ac6d81f417d6a5626b7c8d5a087c32b.png'},{'revision':null,'url':'assets/images/9d3a01c866095b8b3e8e63f9cf11dd51.png'},{'revision':null,'url':'assets/images/9df733bcb29a746cb16b47eedea9fc3a.png'},{'revision':null,'url':'assets/images/acc6eab0ba9c470ae20fb4b74135e865.png'},{'revision':null,'url':'assets/images/b9ae27f0a01228380dff76a33b605707.jpg'},{'revision':null,'url':'assets/images/ba48b220f61a6e1028f1854326f43acd.png'},{'revision':null,'url':'assets/images/bf67cc860289b85c0402a4d4f890a3bd.png'},{'revision':null,'url':'assets/images/c49f2344772e33256ba24d64b59b20d1.png'},{'revision':null,'url':'assets/images/ca6b77b234b18e7bb9b1ccda774da286.png'},{'revision':null,'url':'assets/images/cd213169df16398b0017450e31788d73.png'},{'revision':null,'url':'assets/images/f101a0974972eeab41189185a5c5b225.png'},{'revision':null,'url':'assets/images/f115726e6249018905cca51653e1262c.png'},{'revision':null,'url':'assets/images/f7acb820d978ab2dd69e8bf695c574d1.png'},{'revision':null,'url':'assets/images/ffea4dd10bf2506aa1e0cd4c61426b42.png'},{'revision':'2ad04478b69f8c90bc59f3dfe540f7a6','url':'assets/locales/en/translation.json'},{'revision':'278e8baf9c6ad9d42c6a24ba7bc50e35','url':'assets/locales/ja/translation.json'},{'revision':'c2a766a600543f80ce505441e04b04a2','url':'assets/locales/ko/translation.json'},{'revision':'0a8396f814e3d4e1eef7a965b4ec175b','url':'assets/locales/zh-TW/translation.json'},{'revision':'410ded22d709b826a47c1976ce04b182','url':'assets/locales/zh/translation.json'},{'revision':'48092cc1331dbce253dad1d4f9580ccd','url':'index.html'}],ae={},function(e){v().precache(e)}(te),function(e){const t=v();T(new U(t,e))}(ae),T(/(?:maps\/.+\.json|pwa\/.+|pois\/.+\.json|apps\/.+\.json|tmbs\/.+\.jpg|images\/.+\.(?:png|jpg))$/,new class extends _{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(k)}async _handle(e,a){const n=a.fetchAndCachePut(e).catch((()=>{}));a.waitUntil(n);let s,r=await a.cacheMatch(e);if(r)0;else{0;try{r=await n}catch(e){e instanceof Error&&(s=e)}}if(!r)throw new t("no-response",{url:e.url,error:s});return r}}({cacheName:"resourcesCache",plugins:[new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:a,cachedResponse:n})=>{if(!n)return null;const s=this._isResponseDateFresh(n),r=this._getCacheExpiration(a);l(r.expireEntries());const o=r.updateTimestamp(t.url);if(e)try{e.waitUntil(o)}catch(e){0}return s?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const a=this._getCacheExpiration(e);await a.updateTimestamp(t.url),await a.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){n.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===i())throw new t("expire-custom-caches-only");let a=this._cacheExpirations.get(e);return a||(a=new ee(e,this._config),this._cacheExpirations.set(e,a)),a}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),a=new Date(t).getTime();return isNaN(a)?null:a}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxAgeSeconds:86400,purgeOnQuotaError:!1})]}),"GET")})()})();
//# sourceMappingURL=service-worker.js.map