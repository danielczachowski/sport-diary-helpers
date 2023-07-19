const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  s + "/_app/immutable/entry/app.fe4d9acb.js",
  s + "/_app/immutable/assets/0.78e7bc02.css",
  s + "/_app/immutable/nodes/0.335c50d1.js",
  s + "/_app/immutable/nodes/1.5d2fad7b.js",
  s + "/_app/immutable/nodes/2.a66b4ee2.js",
  s + "/_app/immutable/nodes/3.cfeb549b.js",
  s + "/_app/immutable/nodes/4.3bc42b8b.js",
  s + "/_app/immutable/chunks/index.a6e83f8f.js",
  s + "/_app/immutable/chunks/singletons.27df1114.js",
  s + "/_app/immutable/entry/start.a5d7af78.js"
], d = [
  s + "/favicon.png",
  s + "/manifest.json"
], i = "1689761729990", c = self, h = `cache${i}`, p = l.concat(d), m = new Set(p);
c.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(h).then((e) => e.addAll(p)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (e) => {
      for (const a of e)
        a !== h && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function f(t) {
  const e = await caches.open(`offline${i}`);
  try {
    const a = await fetch(t);
    return e.put(t, a.clone()), a;
  } catch (a) {
    const n = await e.match(t);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const e = new URL(t.request.url), a = e.protocol.startsWith("http"), n = e.hostname === self.location.hostname && e.port !== self.location.port, o = e.host === self.location.host && m.has(e.pathname), r = t.request.cache === "only-if-cached" && !o;
  a && !n && !r && t.respondWith(
    (async () => o && await caches.match(t.request) || f(t.request))()
  );
});
