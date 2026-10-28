import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { build } from 'esbuild'

// The engine the R package runs: bandage-core's gfaFigureData and the tabix cut
// as one script V8 can evaluate, with no modules, file system or network, and
// FMMM's WASM inlined. The banner names the core it was built from, so a
// committed bundle says what it is.
const local = process.env.BANDAGE_CORE
const { version } = JSON.parse(
  readFileSync(
    local
      ? path.join(local, 'package.json')
      : 'node_modules/@jbrowse/bandage-core/package.json',
    'utf8',
  ),
)
const built = local
  ? `${version}+${execFileSync('git', ['-C', local, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()}`
  : version

const localCore = {
  name: 'local-core',
  setup(b) {
    b.onResolve({ filter: /^@jbrowse\/bandage-core(\/.*)?$/ }, args => ({
      path: path.join(
        path.resolve(local),
        'src',
        `${args.path.replace(/^@jbrowse\/bandage-core\/?/, '') || 'index'}.ts`,
      ),
    }))
  },
}

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
      "import './scripts/v8-host.mjs'",
      "export { figure, walkRows } from './scripts/figure.mjs'",
      "export { cutWalks } from './scripts/walks-cut.mjs'",
      "export { cutTabix, indexedLines } from './scripts/tabix-cut.mjs'",
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
  plugins: local ? [noFs, localCore] : [noFs],
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
    return (~c >> 8) & c
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

const banner = [
  `// @jbrowse/bandage-core@${built}, bundled by scripts/build-js.mjs`,
  decoder,
].join('\n')

const js = base64Wasm(outputFiles[0].text).replace(
  /"[^"\n]*?node_modules\/(?=\.pnpm\/)/g,
  '"node_modules/',
)
if (/[^\x09\x0a\x0d\x20-\x7e]/.test(js)) {
  throw new Error('the bundle is not printable ASCII')
}
writeFileSync(OUT, `${banner}\n${js}`)
