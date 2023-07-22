const t = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), r = [
  t + "/_app/immutable/entry/app.06297e55.js",
  t + "/_app/immutable/assets/0.78e7bc02.css",
  t + "/_app/immutable/nodes/0.594b7ef5.js",
  t + "/_app/immutable/nodes/1.91752657.js",
  t + "/_app/immutable/nodes/2.a66b4ee2.js",
  t + "/_app/immutable/nodes/3.cfeb549b.js",
  t + "/_app/immutable/nodes/4.3bc42b8b.js",
  t + "/_app/immutable/chunks/index.a6e83f8f.js",
  t + "/_app/immutable/chunks/singletons.6e521078.js",
  t + "/_app/immutable/entry/start.1c537991.js"
], m = [
  t + "/.nojeykll",
  t + "/favicon.png",
  t + "/manifest.json"
], i = "1690030960241", c = self, l = `cache${i}`, h = r.concat(m), u = new Set(h);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(l).then((s) => s.addAll(h)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== l && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function d(e) {
  const s = await caches.open(`offline${i}`);
  try {
    const a = await fetch(e);
    return s.put(e, a.clone()), a;
  } catch (a) {
    const n = await s.match(e);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.protocol.startsWith("http"), n = s.hostname === self.location.hostname && s.port !== self.location.port, o = s.host === self.location.host && u.has(s.pathname), p = e.request.cache === "only-if-cached" && !o;
  a && !n && !p && e.respondWith(
    (async () => o && await caches.match(e.request) || d(e.request))()
  );
});
