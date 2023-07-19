const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  s + "/_app/immutable/entry/app.be920879.js",
  s + "/_app/immutable/assets/0.78e7bc02.css",
  s + "/_app/immutable/nodes/0.168a7e62.js",
  s + "/_app/immutable/nodes/1.c1e0ce82.js",
  s + "/_app/immutable/nodes/2.a66b4ee2.js",
  s + "/_app/immutable/nodes/3.cfeb549b.js",
  s + "/_app/immutable/nodes/4.3bc42b8b.js",
  s + "/_app/immutable/chunks/index.a6e83f8f.js",
  s + "/_app/immutable/chunks/singletons.4e2f7b1e.js",
  s + "/_app/immutable/entry/start.c26598f5.js"
], m = [
  s + "/favicon.png",
  s + "/manifest.json"
], i = "1689762360484", c = self, h = `cache${i}`, p = l.concat(m), u = new Set(p);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(h).then((t) => t.addAll(p)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (t) => {
      for (const a of t)
        a !== h && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function f(e) {
  const t = await caches.open(`offline${i}`);
  try {
    const a = await fetch(e);
    return t.put(e, a.clone()), a;
  } catch (a) {
    const n = await t.match(e);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const t = new URL(e.request.url), a = t.protocol.startsWith("http"), n = t.hostname === self.location.hostname && t.port !== self.location.port, o = t.host === self.location.host && u.has(t.pathname), r = e.request.cache === "only-if-cached" && !o;
  a && !n && !r && e.respondWith(
    (async () => o && await caches.match(e.request) || f(e.request))()
  );
});
