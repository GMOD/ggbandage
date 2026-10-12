import { readFileSync, writeFileSync } from 'node:fs'

import { build } from 'esbuild'

// The engine the R package runs: bandage-core's gfaFigureData and the tabix cut
// as one script V8 can evaluate, with no modules, file system or network, and
// FMMM's WASM inlined. The banner names the core it was built from, so a committed bundle
// says what it is.
const { version } = JSON.parse(
  readFileSync('node_modules/@jbrowse/bandage-core/package.json', 'utf8'),
)

const OUT = 'inst/js/bandage.js'

// generic-filehandle2 imports fs/promises for a local file class the cut never
// opens: R serves every byte
const noFs = {
  name: 'no-fs',
  setup(b) {
    b.onResolve({ filter: /^fs\/promises$/ }, () => ({
      path: 'fs/promises',
      namespace: 'no-fs',
    }))
    b.onLoad({ filter: /.*/, namespace: 'no-fs' }, () => ({
      contents: 'export const open = null, readFile = null, stat = null',
    }))
  },
}

const { outputFiles } = await build({
  stdin: {
    contents: [
      "export { gfaFigureData } from '@jbrowse/bandage-core/figureData'",
      "export { cutTabix } from './scripts/tabix-cut.mjs'",
    ].join('\n'),
    resolveDir: process.cwd(),
    loader: 'js',
  },
  bundle: true,
  format: 'iife',
  globalName: 'bandage',
  platform: 'neutral',
  mainFields: ['module', 'main'],
  charset: 'ascii',
  minifyWhitespace: true,
  plugins: [noFs],
  write: false,
  outfile: OUT,
  define: { 'import.meta.url': 'undefined' },
  logLevel: 'info',
})

// Emscripten inlines the wasm as one string of raw bytes, which esbuild prints
// as a template literal of control characters. V8 on Linux reads it; the R V8
// package on Windows rejects it, and a file of raw bytes is fragile under any
// text-mode reader. Base64 keeps the bundle printable ASCII.
const DECODE = 'binaryDecode(`'

function templateEnd(text, start) {
  for (let i = start; i < text.length; i++) {
    if (text[i] === '\\') {
      i++
    } else if (text[i] === '`') {
      return i
    }
  }
  throw new Error('the inlined wasm literal never closes')
}

function base64Wasm(js) {
  const start = js.indexOf(DECODE)
  if (start < 0 || js.indexOf(DECODE, start + 1) >= 0) {
    throw new Error('expected exactly one inlined wasm literal')
  }
  const body = start + DECODE.length
  const end = templateEnd(js, body)
  const cooked = new Function(`return \`${js.slice(body, end)}\``)()
  const bytes = Uint8Array.from(cooked, ch => {
    const c = ch.charCodeAt(0)
    return ~c >> 8 & c
  })
  if (String.fromCharCode(...bytes.subarray(1, 4)) !== 'asm') {
    throw new Error('the inlined literal is not a wasm module')
  }
  const b64 = Buffer.from(bytes).toString('base64')
  return `${js.slice(0, start)}bandageBase64("${b64}")${js.slice(end + 2)}`
}

const decoder = `function bandageBase64(s) {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const n = s.replace(/=+$/, '').length;
  const out = new Uint8Array((n * 3) >> 2);
  for (let i = 0, j = 0, acc = 0, bits = 0; i < n; i++) {
    acc = (acc << 6) | abc.indexOf(s[i]);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[j++] = (acc >> bits) & 0xff;
    }
  }
  return out;
}`

const textDecoder = `if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = class TextDecoder {
    decode(bytes = new Uint8Array(0)) {
      const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes.buffer ?? bytes);
      let out = '';
      for (let i = 0; i < b.length; ) {
        const c = b[i++];
        const extra = c >= 0xf0 ? 3 : c >= 0xe0 ? 2 : c >= 0xc0 ? 1 : 0;
        let cp = extra === 0 ? c : c & (0x3f >> extra);
        for (let k = 0; k < extra; k++) cp = (cp << 6) | (b[i++] & 0x3f);
        out += String.fromCodePoint(cp);
      }
      return out;
    }
  };
}`

const textEncoder = `if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = class TextEncoder {
    encode(text = '') {
      const out = [];
      for (const ch of text) {
        const cp = ch.codePointAt(0);
        if (cp < 0x80) out.push(cp);
        else if (cp < 0x800) out.push(0xc0 | (cp >> 6), 0x80 | (cp & 0x3f));
        else if (cp < 0x10000) out.push(0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
        else out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
      }
      return Uint8Array.from(out);
    }
    encodeInto(text, dest) {
      const bytes = this.encode(text);
      const written = Math.min(bytes.length, dest.length);
      dest.set(bytes.subarray(0, written));
      return { read: text.length, written };
    }
  };
}`

const abortController = `if (!globalThis.AbortController) {
  class AbortSignal {
    aborted = false;
    reason = undefined;
    listeners = [];
    addEventListener(_type, fn) { this.listeners.push(fn); }
    removeEventListener(_type, fn) { this.listeners = this.listeners.filter(f => f !== fn); }
    throwIfAborted() { if (this.aborted) throw this.reason; }
  }
  globalThis.AbortController = class AbortController {
    signal = new AbortSignal();
    abort(reason = new Error('aborted')) {
      if (this.signal.aborted) return;
      this.signal.aborted = true;
      this.signal.reason = reason;
      for (const fn of this.signal.listeners) fn({ type: 'abort' });
    }
  };
}`

const dataFetch = `if (!globalThis.fetch) {
  globalThis.fetch = async url => {
    const m = /^data:[^,]*;base64,(.*)$/.exec(url);
    if (!m) throw new Error('V8 has no network: cannot fetch ' + url);
    const bytes = bandageBase64(m[1]);
    return { ok: true, arrayBuffer: async () => bytes.buffer };
  };
}`

const banner = [
  `// @jbrowse/bandage-core@${version}, bundled by scripts/build-js.mjs`,
  'if (!globalThis.performance) globalThis.performance = { now: () => Date.now() };',
  decoder,
  textDecoder,
  textEncoder,
  abortController,
  dataFetch,
].join('\n')

const js = base64Wasm(outputFiles[0].text)
if (/[^\x09\x0a\x0d\x20-\x7e]/.test(js)) {
  throw new Error('the bundle is not printable ASCII')
}
writeFileSync(OUT, `${banner}\n${js}`)
