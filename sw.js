// Service worker do Natal Solidário: sempre tenta a rede primeiro (o site é atualizado com frequência)
// e usa o que está guardado apenas se o aparelho estiver sem conexão. Não mexe nas chamadas ao Firebase.
const V = "natal-solidario-v1";
const ARQ = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "favicon.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.all(ARQ.map(a => c.add(a).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r)
      .then(res => { const c = res.clone(); caches.open(V).then(x => x.put(r, c)).catch(() => {}); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match("index.html")))
  );
});
