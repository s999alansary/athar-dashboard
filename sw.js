/**
 * عامل الخدمة — لوحة مبادرة أثر
 * يخزّن اللوحة داخل الجهاز لتفتح فورًا وتعمل بلا إنترنت.
 * رفع رقم الإصدار عند كل تحديث يمسح المخزون القديم تلقائيًا.
 */
const CACHE = 'athar-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './app-icon-192.png',
  './app-icon-512.png',
  './apple-touch-icon.png',
  './logo3d-mark.png',
  './logo3d-word.png',
  './logo3d-icon.png',
  './i-home.png', './i-mkt.png', './i-dsg.png', './i-agn.png',
  './i-sec.png',  './i-std.png', './i-biz.png', './i-acc.png',
  './i-rsc.png',  './i-pks.png', './i-req.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* لا يُخزَّن إطلاقًا: الوسيط، Firebase، Google — تحتاج بيانات حيّة */
  if (
    url.origin !== self.location.origin ||
    /workers\.dev|googleapis|gstatic|firebase|accounts\.google/i.test(url.href)
  ) {
    return;
  }

  /* الصفحة نفسها: جرّب الشبكة أولًا ليصلك آخر تحديث، وارجع للمخزون عند الانقطاع */
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  /* بقية الملفات: من المخزون فورًا، مع تحديثه في الخلفية */
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
