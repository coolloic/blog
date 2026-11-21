// Vercel starts Node with --no-experimental-require-module, so Waline's CommonJS code cannot
// require() its ESM-only dependencies (@mdit/plugin-emoji, nodemailer, ...). Load each one with
// import() on the first request and hand the namespace to require() from then on.
const Module = require('node:module');

const esm = new Map(); // resolved file path -> module namespace
const load = Module._load;
Module._load = function (request, parent, isMain) {
  if (esm.size) {
    try {
      const file = Module._resolveFilename(request, parent, isMain);
      if (esm.has(file)) return esm.get(file);
    } catch {}
  }
  return load.apply(this, arguments);
};

const interop = (ns) => (Object.keys(ns).some((k) => k !== 'default') ? ns : ns.default);

let ready;
async function boot() {
  const before = new Set(Object.keys(require.cache));
  for (let i = 0; i < 50; i++) {
    try {
      return require('@waline/vercel')({ plugins: [] });
    } catch (e) {
      const file = e.code === 'ERR_REQUIRE_ESM' && /ES Module (\S+) from/.exec(e.message)?.[1];
      if (!file || esm.has(file)) throw e;
      esm.set(file, interop(await import(file)));
      // A failed attempt leaves half-initialised modules (e.g. jsdom's circular imports) in the
      // cache; drop everything it loaded so the retry starts clean.
      for (const k of Object.keys(require.cache)) if (!before.has(k)) delete require.cache[k];
    }
  }
  throw new Error('too many ESM dependencies');
}

module.exports = async (req, res) => {
  ready ??= boot().catch((e) => { ready = undefined; throw e; });
  const app = await ready;
  return app(req, res);
};
