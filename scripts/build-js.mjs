import { execFileSync } from 'node:child_process'
import { readFileSync, realpathSync } from 'node:fs'
import path from 'node:path'

import { build } from 'esbuild'

// The engine the R package runs: bandage-core's gfaFigureData as one script V8
// can evaluate, with no modules, file system or network, and FMMM's WASM
// inlined. The banner names the core it was built from, so a committed bundle
// says what it is.
const core = realpathSync('node_modules/@jbrowse/bandage-core')
const { version } = JSON.parse(
  readFileSync(path.join(core, 'package.json'), 'utf8'),
)
let commit = ''
try {
  commit = execFileSync('git', ['-C', core, 'rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8',
  }).trim()
} catch {}

await build({
  stdin: {
    contents: "export { gfaFigureData } from '@jbrowse/bandage-core/figureData'",
    resolveDir: process.cwd(),
    loader: 'js',
  },
  bundle: true,
  format: 'iife',
  globalName: 'bandage',
  platform: 'neutral',
  mainFields: ['module', 'main'],
  outfile: 'inst/js/bandage.js',
  define: { 'import.meta.url': 'undefined' },
  banner: {
    js: [
      `// @jbrowse/bandage-core@${version}${commit ? ` (${commit})` : ''}, bundled by scripts/build-js.mjs`,
      'globalThis.performance ??= { now: () => Date.now() };',
    ].join('\n'),
  },
  logLevel: 'info',
})
