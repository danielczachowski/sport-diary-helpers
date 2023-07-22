const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), r = [
  e + "/_app/immutable/entry/app.9a9bc0ba.js",
  e + "/_app/immutable/assets/0.78e7bc02.css",
  e + "/_app/immutable/nodes/0.497cb6c9.js",
  e + "/_app/immutable/nodes/1.c632abf9.js",
  e + "/_app/immutable/nodes/2.a66b4ee2.js",
  e + "/_app/immutable/nodes/3.cfeb549b.js",
  e + "/_app/immutable/nodes/4.3bc42b8b.js",
  e + "/_app/immutable/chunks/index.a6e83f8f.js",
  e + "/_app/immutable/chunks/singletons.f47cb6e1.js",
  e + "/_app/immutable/entry/start.8f8219a3.js"
], m = [
  e + "/.nojeykll",
  e + "/favicon.png",
  e + "/manifest.json"
], i = "1690028415557", c = self, l = `cache${i}`, h = r.concat(m), u = new Set(h);
c.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(l).then((s) => s.addAll(h)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== l && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function f(t) {
  const s = await caches.open(`offline${i}`);
  try {
    const a = await fetch(t);
    return s.put(t, a.clone()), a;
  } catch (a) {
    const n = await s.match(t);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const s = new URL(t.request.url), a = s.protocol.startsWith("http"), n = s.hostname === self.location.hostname && s.port !== self.location.port, o = s.host === self.location.host && u.has(s.pathname), p = t.request.cache === "only-if-cached" && !o;
  a && !n && !p && t.respondWith(
    (async () => o && await caches.match(t.request) || f(t.request))()
  );
});
