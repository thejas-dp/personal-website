// /api/track.gif - serves a real 1x1 transparent GIF with no-store headers and forwards the
// fetch to a private Apps Script webhook, which validates the issued (e, c) token pair.
// Env var (Vercel dashboard, never in repo): APPS_SCRIPT_URL - web app /exec URL.
var GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

module.exports = async function handler(req, res) {
  try {
    var q = req.query || {};
    var c = String(q.c || '');
    var e = String(q.e || '');
    if (/^[a-z0-9-]{1,40}$/.test(c) && /^[a-f0-9]{12,24}$/.test(e) && process.env.APPS_SCRIPT_URL) {
      var u = new URL(process.env.APPS_SCRIPT_URL);
      var ua = String((req.headers && req.headers['user-agent']) || '').slice(0, 120);
      var ctrl = new AbortController();
      var t = setTimeout(function () { ctrl.abort(); }, 4000);
      await fetch(u, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ c: c, e: e, ua: ua }),
        redirect: 'manual',
        signal: ctrl.signal
      }).catch(function () {});
      clearTimeout(t);
    }
  } catch (_) {}
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Content-Length', GIF.length);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).end(GIF);
};
