// @jbrowse/bandage-core@9.9.2 (d42495d), bundled by scripts/build-js.mjs
globalThis.performance ??= { now: () => Date.now() };
var bandage = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../bandage-core/src/bandage/bandage-layout.js
  var bandage_layout_exports = {};
  __export(bandage_layout_exports, {
    default: () => bandage_layout_default
  });
  async function createBandageLayoutModule(moduleArg = {}) {
    var Module = moduleArg;
    var ENVIRONMENT_IS_WEB = !!globalThis.window;
    var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
    var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
    var programArgs = [];
    var thisProgram = "./this.program";
    var _scriptName = void 0;
    var scriptDirectory = "";
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      try {
        scriptDirectory = new URL(".", _scriptName).href;
      } catch {
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = async (url) => {
          var response = await fetch(url, { credentials: "same-origin" });
          if (response.ok) {
            return response.arrayBuffer();
          }
          throw new Error(response.status + " : " + response.url);
        };
      }
    } else {
    }
    var out = console.log.bind(console);
    var err = console.error.bind(console);
    var wasmBinary;
    var ABORT = false;
    class EmscriptenEH {
    }
    class EmscriptenSjLj extends EmscriptenEH {
    }
    function binaryDecode(bin) {
      for (var i = 0, l = bin.length, o = new Uint8Array(l), c; i < l; ++i) {
        c = bin.charCodeAt(i);
        o[i] = ~c >> 8 & c;
      }
      return o;
    }
    var runtimeInitialized = false;
    function getMemoryBuffer() {
      return wasmMemory.buffer;
    }
    function updateMemoryViews() {
      if (HEAP8?.buffer?.resizable) return;
      var b = getMemoryBuffer();
      HEAP8 = new Int8Array(b);
      HEAP16 = new Int16Array(b);
      HEAPU8 = new Uint8Array(b);
      HEAPU16 = new Uint16Array(b);
      HEAP32 = new Int32Array(b);
      HEAPU32 = new Uint32Array(b);
      HEAPF32 = new Float32Array(b);
      HEAPF64 = new Float64Array(b);
      HEAP64 = new BigInt64Array(b);
      HEAPU64 = new BigUint64Array(b);
    }
    function preRun() {
      var preRun2 = Module["preRun"];
      if (preRun2) {
        if (typeof preRun2 == "function") preRun2 = [preRun2];
        onPreRuns.push(...preRun2);
      }
      callRuntimeCallbacks(onPreRuns);
    }
    function initRuntime() {
      runtimeInitialized = true;
      if (!Module["noFSInit"] && !FS.initialized) FS.init();
      TTY.init();
      wasmExports["K"]();
      FS.ignorePermissions = false;
    }
    function postRun() {
      var postRun2 = Module["postRun"];
      if (postRun2) {
        if (typeof postRun2 == "function") postRun2 = [postRun2];
        onPostRuns.push(...postRun2);
      }
      callRuntimeCallbacks(onPostRuns);
    }
    function abort(what) {
      Module["onAbort"]?.(what);
      what = `Aborted(${what})`;
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    var wasmBinaryFile;
    function findWasmBinary() {
      return binaryDecode(`\0asm\0\0\0\x89B\`\x7F\x7F\`\x7F\0\`\x7F\x7F\0\`\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\0\`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\0\`\x7F\x7F\x7F\x7F\x7F\0\`\b\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\x7F\x7F\0\`\x7F\x7F|\`\0\0\`\x07\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F~~~~\0\`\b\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0\`||\`\x07\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0\`\0\x7F\`\x7F\x7F\x7F\x7F~\x7F\`\x7F~~\x7F\0\`
\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0\`|||\`\x7F~\x7F~\`|\x7F|\`\f\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0\`\v\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`|\x7F\x7F\`\x07\x7F\x7F\x7F\x7F\x7F~~\x7F\`\x7F\x7F\x7F\x7F~~\x7F\`\x7F\x7F\x7F\x7F|\x7F\`\x7F|\x7F\x7F\`\x7F||||\x7F\0\`\x7F||\x7F\0\`\x7F||\0\`\x7F\x7F\x7F\x7F\x7F|\`\x7F\x7F\x7F~~\0\`\x7F~\x7F\x7F\x7F\`\0|\`||\x7F\`\x7F~\0\`\x7F|\0\`~~~~\x7F\`~\x7F\x7F\`||\x7F|\`\x7F\x7F\x7F~\x7F\0\`~~|\`\x7F|\x7F\x7F\0\`	\x7F\x7F\x7F\x7F\x7F\x7F||\x7F\0\`\x7F\x7F\x7F|\`\x7F\x7F\x7F}\`\x7F\x7F~\0\`~~}\`\x7F\x7F~\`~~~\x7F\`\x7F\x7F~\x7F\x7F\0\`\x07\x7F|\x7F\x7F\x7F\x7F\x7F\x7F\`\x7F\x7F|\0\`\b||||||||\x7F\`\x07\x7F\x7F|\x7F\x7F\x7F\x7F\0\`\x7F|\`\x7F|||\x7F\0\`\x7F|\x7F\0\xD3#aa\0ab\0ac\0\0ad\0ae\0af\0&ag\0ah\0ai\0aj\0
ak\0al\0am\0an\0\0ao\0\bap\0aq\0'ar\0as\0\0at\0au\0av\0	aw\0\0ax\0\bay\0(az\0\0aA\0aB\0aC\0)aD\0aE\0aF\0	aG\0aH\0aI\0\0\xA7\xA5\0\0\0\0\0\0\0\0\0	
\0\0\0*\0+\x07\x07\b\0\0\0,\0\v\v\0\b\0\b\0-\0\0\0.\0\0\0	\x07\0\b\0/		
\0\0\00
\0\0\0\0\b	\0\f	\0
\x1B
\x1B
	\0\0\0\0\0\x001\0\02\0\x07\0	\0\0\0\x07\v\v\x07\v\v\0\x073\v\0\0\0
\f
\f\f
\f\f\0\b	\b\x07	45\x07\b\0678	9\0\x07	\0\0\0\0\0\0\0\0	:\0;\0\x07<\0=	
\0>
	?

\0\0\0\0\0\0\0\f\f\f


			\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\x07\v\v\x07\x07\b\x07\b\b\b\b\f\f\v\0\v\x07\0 !\x07\x07\x07\x07 !\x07\x07\x07	\x07	\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r\0\0\0\0\0\0\0\r\0\0\r\0\0\0\0\0\0\0\0\0\0\0""@A#%$\0\x07p\xE4\xE4\x07\x82\x80\x80\b\x7FA\xB0\x90\x07\v\x07\x1BJ\0K\0\xC7L\0\xE5M\0#N\0O\0'	\xFD	\0A\v\xE3K\x91\xC6~\xC9rlQ\xB6\x9A\xE4s\x90rlQ\xA4\x9As\x90\xA3lQ\xA2\xA1\x9F\x9D\x84\x94\x93R\x8EI\x8A\xF9\xE1\xDA\xD8\x82\xEC\xE6\xE1\x84\xCC\xD7I\xC9R\xFA\xC6\xE1\xDA\xD8\xC0\xBAR\xB8I~\xB3\xAD\xA8\xAF~\xC9rlQs\x96\xAA\xA1\xAF\xFB\xF0R\xE6I\x95\xD4\xD6\xD5K\xD3\x87\xCE\xCB\xCA\xC9\x8C\x8B\xC5\xC4I\xCF\xC3I\xD0\xC2I\xD1\xC1I\xD2\xC0I\xBFR\xCD\xBE\xBD\xBCQ\xBB\xD0\xB0\xBA\xB8\xAF\xB7\xB6\xAE\xB5\xAD\xB4\xB3\xAC\xB2\xB1\xB9K1\xAB\xAA\xA9~\xA8\xAA\xA1\xAF~\xC9rlQ~\xC2\x86\x85Q~\xC2\x86\x85Q~\xC9rlQs\x90rlQs\xA7\x86\x85Qs\x90rlQs\x90rlQs\x90rlQ\xA6\x88\xA0\xA2\xA3\xA1\xA5\xA4\x9F\x9EI\x9D\x9C\x9BAO\x9A\x99\x98\x97\x96\x95\x94\x93\x92O\x90K1\x8FK1\x8E\x8DO^\x8C\x8B\x8A\x89\x86\x85\x88\x87\x84\x83\x82\x81\x80\xFFI\xFERK1\xFD1\xFC\xFB\xFAIs\xF9\xF8\xF7\xAF\xF6R\xF5\xF4\xF3\xF2\xF1I\xF0\xEFI\xEE\xEDIK1\xEC\xEBO^\xEA\xE9\xE81\xE7\xE6O^\xE5\xE4\xE3\xE2R\xE1R\xE0R\xDF\xA4\xDE\xDD\xDC\xFE\xDB\xDA\xD9\xD8\xD7\xD6\xD5\xD4\xD3\xC9\xD2\xD1\xD0I\xCF\xCEIK1\xCD\xCCO^\xCB\xCA\xC9\xC8R\xC7RK1\xC6\xC5O^\xC4\xC3\xC21\xC1\xC0O^\xBF\xBE\xBDK1\xBC\xBBO^\xBA\xB9\xB81\xB7\xB5O^\x9B\xB4\xB31\xB2\xB1O^\xB0\xAF\xAE1\xAD\xACO^\x9B\xAB\xAA\xA9\xA8\xA7\xA6\xA5\x89\x88\xA01\x9E\xF1\x98\xC1\x83\x82\x81HH\x97\x80\x96\xC0\x95\xC0\xFF\xF0\xFE\xFD\xEF\xEE\xFC\xFB\xEC\x92\xC1\x83\x82\x81HH\x91\x80\x90\xC0\x8F\xC0\xFF\xF0\xFE\xFD\xEF\xEE\xFC\xFBx\x8D\x99\x9A\x9CH\x9B\x8C\x8B\xF1\x89\x88\x87\x86\xF1\x85\xEF\x84\x83\xEE\x81\x80\xFF\xFE\xEE\xFD\xEF\xFC\xFB\xF8O#\xB0\x83\x81\xFF\xFD\xFA\xF8\xF6\xF4\xF2\xEF\xED\xEB\xE9\xE7\xB1\xAC^\xAF\x9F\x9E\x9D\x9C\x9B\xFE\x9A\x99\x98\xB3\x95\x94\x93\x92\x91H\x90\x8F\xA3\x8E\x8C\x8B\x8A\x88\x86\xA2\x8D\xA4R\x89\x87\x85K11\xAB\xAA\xA9\xA7\xA6\xA5\xA4\xA3\xFE\xA2\xA1\xA01\xAE\xAE\x95\xE9\xE9\x97\xE91\xA9\xA8\x95HH\xA7\xAE1\xA9\xA8\x95HH\xA7\xAE1\xA6\xA5\x95HH\xA4\xAE1\xA6\xA5\x95HH\xA4\xAEK1\xF7\xF6\xF5K1\xF4\xF3\xF21\xF1\xF0\xEF\xEE\xD7\xD7\xED\xEB\xEA\xE9\xE81\xE7\xE5\xE4\xE3\xD2\xD2\xE2\xE0\xDF\xDE\xDD1\xDC\xDB\xDA\xD9\xD8\xD6\xD5\xD41\xD3\xD2\xD1\xD0\xCF\xCE\xCD\xCBK1\xC6\xCA\xC9\xC8\xC7\xC5\xC4\x84\x80\xFC\xEE\xEA\xF7\xF3K1\xC6\xC3\xC2\xC1\xBF\xBE\xBD\x82\xFE\xF9\xEC\xE8\xF5\xF1\xD9\xA0\xBC\xD9\xA0\xBB1\xB1\xB1WWW\xBEHtt1\xB1\xB1WWW\xBEHtt1\xB0\xB0WWW\xBDHtt1\xB0\xB0WWW\xBDHtt1\xB9\xB71\xB6\xB51\xB4\xB21\xB1\xB01\xB4\xAF\xC11\xB4\xAE\xC1K1OO\xE31\xE2\xD9\xDC\xE11\xDA\xDD\xE01\xDB\xDE\xDF1\xD8\x90\xD7\x90\f6
\xFC\xE7\xA5\x82\f\b\x7F@ \0E\r\0 \0A\bk" \0Ak(\0"Axq"\0j!@ Aq\r\0 AqE\r  (\0"k"A\xB4\xE2(\0I\r \0 j!\0@@@A\xB8\xE2(\0 G@ (\f! A\xFFM@  (\b"G\rA\xA4\xE2A\xA4\xE2(\0A~ Avwq6\0\f\v (!\x07  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v ("AqAG\rA\xAC\xE2 \x006\0  A~q6  \0Ar6  \x006\0\v  6\f  6\b\f\vA\0!\v \x07E\r\0@ ("At"(\xD4\xE4 F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ wq6\0\f\v@  \x07(F@ \x07 6\f\v \x07 6\v E\r\v  \x076 ("@  6  6\v ("E\r\0  6  6\v  O\r\0 ("AqE\r\0@@@@ AqE@A\xBC\xE2(\0 F@A\xBC\xE2 6\0A\xB0\xE2A\xB0\xE2(\0 \0j"\x006\0  \0Ar6 A\xB8\xE2(\0G\rA\xAC\xE2A\x006\0A\xB8\xE2A\x006\0\vA\xB8\xE2(\0"\x07 F@A\xB8\xE2 6\0A\xAC\xE2A\xAC\xE2(\0 \0j"\x006\0  \0Ar6 \0 j \x006\0\v Axq \0j!\0 (\f! A\xFFM@ (\b" F@A\xA4\xE2A\xA4\xE2(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!\b  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v  A~q6  \0Ar6 \0 j \x006\0\f\vA\0!\v \bE\r\0@ ("At"(\xD4\xE4 F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ wq6\0\f\v@  \b(F@ \b 6\f\v \b 6\v E\r\v  \b6 ("@  6  6\v ("E\r\0  6  6\v  \0Ar6 \0 j \x006\0  \x07G\r\0A\xAC\xE2 \x006\0\v \0A\xFFM@ \0A\xF8qA\xCC\xE2j!\x7FA\xA4\xE2(\0"A \0Avt"\0qE@A\xA4\xE2 \0 r6\0 \f\v (\b\v!\0  6\b \0 6\f  6\f  \x006\b\vA! \0A\xFF\xFF\xFF\x07M@ \0A& \0A\bvg"kvAq AtrA>s!\v  6 B\x007 AtA\xD4\xE4j!\x7F@\x7FA\xA8\xE2(\0"A t"qE@A\xA8\xE2  r6\0  6\0A!A\b\f\v \0A AvkA\0 AG\x1Bt! (\0!@ "(Axq \0F\r Av! At!  Aqj"("\r\0\v  6A! !A\b\v!\0 "\f\v (\b" 6\f  6\bA!\0A\b!A\0\v!  j 6\0  6\f \0 j 6\0A\xC4\xE2A\xC4\xE2(\0Ak"\0A\x7F \0\x1B6\0\v\vF\0 \0A\xFFM@  \0At"\0(\xC0\xD86\0 \0 6\xC0\xD8\v (\0" G@@ (\0 #" G\r\0\v\v\v\xFE\x07\x7F \0At"A\xC0\xD8j! (\xC0\xD8"@  (\x006\0 A\x006\0 \v@ \0A\xFF\xFFq"\0At"(\xA4\xC8"\x07A\xFC?A \0 \0AM\x1BAj"A\xFC\xFF\x07q"n"N@  A\xA0\xC8j"(\0"\x006\0@ A\xFEK\r\0A  AM\x1B"Ak"A\x07q! AkA\x07O@ Axq!A\0!@ \0(\0(\0(\0(\0(\0(\0(\0(\0!\0 A\bj" G\r\0\v E\r\vA\0!@ \0(\0!\0 Aj" G\r\0\v\v \0(\0!  \x07 k6  6\0\f\vA\x80\xC0\0'"\0A\xA0\xD8(\x006\xFC?A\xA0\xD8 \x006\0  \x006\0 (\0!\0 A|q!@ \0 \0 j"\x006\0 AK Ak!\r\0\v\v \0A\x006\0  (\0"\0(\x006\0 \0\v|\x7F#\0Ak"$\0 \0 \0(\0A\fk(\0j(@ A\bj \0\xED@ -\0\bAG\r\0 \0 \0(\0A\fk(\0j(" (\0(\0\0A\x7FG\r\0 \0 \0(\0A\fk(\0j\xBE\v A\bj\xBD\v Aj$\0\v\xCB(\v\x7F#\0Ak"
$\0@@@@@@@@@@ \0A\xF4M@A\xA4\xE2(\0"A \0A\vjA\xF8q \0A\vI\x1B"Av"\0v"Aq@@ A\x7FsAq \0j"At"A\xCC\xE2j"\0 (\xD4\xE2"(\b"F@A\xA4\xE2 A~ wq6\0\f\v  \x006\f \0 6\b\v A\bj!\0  Ar6  j" (Ar6\f\v\v A\xAC\xE2(\0"\bM\r @@A \0t"A\0 kr  \0tqh"At"A\xCC\xE2j" (\xD4\xE2"\0(\b"F@A\xA4\xE2 A~ wq"6\0\f\v  6\f  6\b\v \0 Ar6 \0 j"\x07  k"Ar6 \0 j 6\0 \b@ \bAxqA\xCC\xE2j!A\xB8\xE2(\0!\x7F A \bAvt"qE@A\xA4\xE2  r6\0 \f\v (\b\v!  6\b  6\f  6\f  6\b\v \0A\bj!\0A\xB8\xE2 \x076\0A\xAC\xE2 6\0\f\v\vA\xA8\xE2(\0"\vE\r \vhAt(\xD4\xE4"(Axq k! !@@ ("\0E@ ("\0E\r\v \0(Axq k"   I"\x1B! \0  \x1B! \0!\f\v\v (!	  (\f"\0G@ (\b" \x006\f \0 6\b\f
\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v \x07A\x006\0\f	\vA\x7F! \0A\xBF\x7FK\r\0 \0A\vj"Axq!A\xA8\xE2(\0"\x07E\r\0A!\bA\0 k! \0A\xF4\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtkA>j!\b\v@@@ \bAt(\xD4\xE4"E@A\0!\0\f\vA\0!\0 A \bAvkA\0 \bAG\x1Bt!@@ (Axq k" O\r\0 ! "\r\0A\0! !\0\f\v \0 ("   AvAqj("F\x1B \0 \x1B!\0 At! \r\0\v\v \0 rE@A\0!A \bt"\0A\0 \0kr \x07q"\0E\r \0hAt(\xD4\xE4!\0\v \0E\r\v@ \0(Axq k" I!   \x1B! \0  \x1B! \0("\x7F  \0(\v"\0\r\0\v\v E\r\0 A\xAC\xE2(\0 kO\r\0 (!\b  (\f"\0G@ (\b" \x006\f \0 6\b\f\b\v ("\x7F Aj ("E\r Aj\v!@ ! "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v A\x006\0\f\x07\v A\xAC\xE2(\0"M@A\xB8\xE2(\0!\0@  k"AO@ \0 j" Ar6 \0 j 6\0 \0 Ar6\f\v \0 Ar6 \0 j" (Ar6A\0!A\0!\vA\xAC\xE2 6\0A\xB8\xE2 6\0 \0A\bj!\0\f	\v A\xB0\xE2(\0"I@A\xB0\xE2  k"6\0A\xBC\xE2A\xBC\xE2(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f	\vA\0!\0 A/j"\x7FA\xFC\xE5(\0@A\x84\xE6(\0\f\vA\x88\xE6B\x7F7\0A\x80\xE6B\x80\xA0\x80\x80\x80\x807\0A\xFC\xE5 
A\fjApqA\xD8\xAA\xD5\xAAs6\0A\x90\xE6A\x006\0A\xE0\xE5A\x006\0A\x80 \v"j"A\0 k"\x07q" M\r\bA\xDC\xE5(\0"@A\xD4\xE5(\0"\b j"	 \bM\r	  	I\r	\v@A\xE0\xE5-\0\0AqE@@@@@A\xBC\xE2(\0"@A\xE4\xE5!\0@ \0(\0"\b M@  \b \0(jI\r\v \0(\b"\0\r\0\v\vA\0\x8B"A\x7FF\r !A\x80\xE6(\0"\0Ak" q@  k  jA\0 \0kqj!\v  M\rA\xDC\xE5(\0"\0@A\xD4\xE5(\0" j"\x07 M\r \0 \x07I\r\v \x8B"\0 G\r\f\v  k \x07q"\x8B" \0(\0 \0(jF\r !\0\v \0A\x7FF\r A0j M@ \0!\f\vA\x84\xE6(\0"  kjA\0 kq"\x8BA\x7FF\r  j! \0!\f\v A\x7FG\r\vA\xE0\xE5A\xE0\xE5(\0Ar6\0\v \x8B!A\0\x8B!\0 A\x7FF\r \0A\x7FF\r \0 M\r \0 k" A(jM\r\vA\xD4\xE5A\xD4\xE5(\0 j"\x006\0A\xD8\xE5(\0 \0I@A\xD8\xE5 \x006\0\v@A\xBC\xE2(\0"@A\xE4\xE5!\0@  \0(\0" \0("jF\r \0(\b"\0\r\0\v\f\vA\xB4\xE2(\0"\0A\0 \0 M\x1BE@A\xB4\xE2 6\0\vA\0!\0A\xE8\xE5 6\0A\xE4\xE5 6\0A\xC4\xE2A\x7F6\0A\xC8\xE2A\xFC\xE5(\x006\0A\xF0\xE5A\x006\0@ \0At" A\xCC\xE2j"6\xD4\xE2  6\xD8\xE2 \0Aj"\0A G\r\0\vA\xB0\xE2 A(k"\0Ax kA\x07q"k"6\0A\xBC\xE2  j"6\0  Ar6 \0 jA(6A\xC0\xE2A\x8C\xE6(\x006\0\f\v  M\r  K\r \0(\fA\bq\r \0  j6A\xBC\xE2 Ax kA\x07q"\0j"6\0A\xB0\xE2A\xB0\xE2(\0 j" \0k"\x006\0  \0Ar6  jA(6A\xC0\xE2A\x8C\xE6(\x006\0\f\vA\0!\0\f\vA\0!\0\f\vA\xB4\xE2(\0 K@A\xB4\xE2 6\0\v  j!A\xE4\xE5!\0@@  \0(\0"G@ \0(\b"\0\r\f\v\v \0-\0\fA\bqE\r\vA\xE4\xE5!\0@@ \0(\0" M@   \0(j"I\r\v \0(\b!\0\f\v\vA\xB0\xE2 A(k"\0Ax kA\x07q"k"\x076\0A\xBC\xE2  j"6\0  \x07Ar6 \0 jA(6A\xC0\xE2A\x8C\xE6(\x006\0  A' kA\x07qjA/k"\0 \0 AjI\x1B"A\x1B6 A\xEC\xE5)\x007 A\xE4\xE5)\x007\bA\xEC\xE5 A\bj6\0A\xE8\xE5 6\0A\xE4\xE5 6\0A\xF0\xE5A\x006\0 Aj!\0@ \0A\x076 \0A\bj \0Aj!\0 I\r\0\v  F\r\0  (A~q6   k"Ar6  6\0\x7F A\xFFM@ A\xF8qA\xCC\xE2j!\0\x7FA\xA4\xE2(\0"A Avt"qE@A\xA4\xE2  r6\0 \0\f\v \0(\b\v! \0 6\b  6\fA\f!A\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xD4\xE4j!@@A\xA8\xE2(\0"A \0t"qE@A\xA8\xE2  r6\0  6\0\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"("\r\0\v  6\v  6A\b! "!\0A\f\f\v (\b"\0 6\f  6\b  \x006\bA\0!\0A!A\f\v j 6\0  j \x006\0\vA\xB0\xE2(\0"\0 M\r\0A\xB0\xE2 \0 k"6\0A\xBC\xE2A\xBC\xE2(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f\vA\xE8\xE0A06\0A\0!\0\f\v \0 6\0 \0 \0( j6 Ax kA\x07qj"\b Ar6 Ax kA\x07qj"  \bj"k!\x07@A\xBC\xE2(\0 F@A\xBC\xE2 6\0A\xB0\xE2A\xB0\xE2(\0 \x07j"\x006\0  \0Ar6\f\vA\xB8\xE2(\0 F@A\xB8\xE2 6\0A\xAC\xE2A\xAC\xE2(\0 \x07j"\x006\0  \0Ar6 \0 j \x006\0\f\v ("\0AqAF@ \0Axq!	 (\f!@ \0A\xFFM@ (\b" F@A\xA4\xE2A\xA4\xE2(\0A~ \0Avwq6\0\f\v  6\f  6\b\f\v (!@  G@ (\b"\0 6\f  \x006\b\f\v@ ("\0\x7F Aj ("\0E\r Aj\v!@ ! \0"Aj! \0("\0\r\0 Aj! ("\0\r\0\v A\x006\0\f\vA\0!\v E\r\0@ ("\0At"(\xD4\xE4 F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ \0wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("\0@  \x006 \0 6\v ("\0E\r\0  \x006 \0 6\v \x07 	j!\x07  	j"(!\0\v  \0A~q6  \x07Ar6  \x07j \x076\0 \x07A\xFFM@ \x07A\xF8qA\xCC\xE2j!\0\x7FA\xA4\xE2(\0"A \x07Avt"qE@A\xA4\xE2  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA! \x07A\xFF\xFF\xFF\x07M@ \x07A& \x07A\bvg"\0kvAq \0AtrA>s!\v  6 B\x007 AtA\xD4\xE4j!\0@@A\xA8\xE2(\0"A t"qE@A\xA8\xE2  r6\0 \0 6\0\f\v \x07A AvkA\0 AG\x1Bt! \0(\0!@ "\0(Axq \x07F\r Av! At! \0 Aqj"("\r\0\v  6\v  \x006  6\f  6\b\f\v \0(\b" 6\f \0 6\b A\x006  \x006\f  6\b\v \bA\bj!\0\f\v@ \bE\r\0@ ("At"(\xD4\xE4 F@ A\xD4\xE4j \x006\0 \0\rA\xA8\xE2 \x07A~ wq"\x076\0\f\v@  \b(F@ \b \x006\f\v \b \x006\v \0E\r\v \0 \b6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 A\xFFM@ A\xF8qA\xCC\xE2j!\0\x7FA\xA4\xE2(\0"A Avt"qE@A\xA4\xE2  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xD4\xE4j!@@ \x07A \0t"qE@A\xA8\xE2  \x07r6\0  6\0  6\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"\x07("\r\0\v \x07 6  6\v  6\f  6\b\f\v (\b"\0 6\f  6\b A\x006  6\f  \x006\b\v A\bj!\0\f\v@ 	E\r\0@ ("At"(\xD4\xE4 F@ A\xD4\xE4j \x006\0 \0\rA\xA8\xE2 \vA~ wq6\0\f\v@  	(F@ 	 \x006\f\v 	 \x006\v \0E\r\v \0 	6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 \b@ \bAxqA\xCC\xE2j!\0A\xB8\xE2(\0!\x7FA \bAvt"\x07 qE@A\xA4\xE2  \x07r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\vA\xB8\xE2 6\0A\xAC\xE2 6\0\v A\bj!\0\v 
Aj$\0 \0\vX\x7F (\0"(\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v \0 6\v @  6\v \0 6\v4\x7F#\0A k"$\0  (6  )7\b \0 A\bj\x83 A j$\0 \0\v\xB6\x7F#\0A k"$\0@@ \0(" \0,\0\v" A\0H"\x1B"@ Ak"A\xF7\xFF\xFF\xFF\x07O\r \0(\0!@ A\vM@  :\0\x1B Aj!\f\v A\xF8\xFF\xFF\xFF\x07q"\x07A\bj0!  \x07A\xF8\xFF\xFF\xFF\x07k6  6  6\v @   \0 A\0H\x1B \xFC
\0\0\v  jA\0:\0\0\f\v E@  \0(\b6  \0)\x007\f\v Aj \0(\0 a\v@ (" ,\0\v" A\0H"\x1B"\0@ \0Ak"A\xF7\xFF\xFF\xFF\x07O\r (\0!@ \0A\vM@  :\0\v !\0\f\v A\xF8\xFF\xFF\xFF\x07q"A\bj0!\0  A\xF8\xFF\xFF\xFF\x07k6\b  6  \x006\0\v @ \0   A\0H\x1B \xFC
\0\0\v \0 jA\0:\0\0\f\v E@  (\b6\b  )\x007\0\f\v  (\0 a\v ( Aj ,\0\x1B"\0A\0H"\x1B (\0"  ,\0\v"A\0H"\x1B (  \x1B" ( \0 \x1B"  I\x1B\\! A\0H\x7F (\b # -\0\x1B \0\v\xC0A\0H@ ( (#\v A j$\0 A\0H  K \x1B\v\x9D\0\vK\x7F \0(\0!\0 ;" \0(\f \0(\b"kAuI\x7F  Atj(\0A\0GA\0\vE@=\0\v \0(\b Atj(\0\vX\x7F (\0"(\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v \0 6$\v @  6\v \0 6(\v\0 \0\xF6 \xF6sAs\v\0 \0\xF7 \xF7sAs\v\0 \0A\xD0\0j'A\xD0\0j\v<\x7FA \0 \0AM\x1B!@@ '"\0\r\0A\xAC\x90(\0"E\r\0 \0\f\v\v \0E@=\0\v \0\v\0 \0#\v\xD4\x7F~@ \0)p"B\0R  \0)x \0(" \0(,"k\xAC|"WqE@ \0\xBB"A\0N\r \0(,! \0(!\v \0B\x7F7p \0 6h \0   k\xAC|7xA\x7F\v B|! \0(! \0(\b!@ \0)p"P\r\0  }"  k\xACY\r\0  \xA7j!\v \0 6h \0  \0(,"\0 k\xAC|7x \0 O@ Ak :\0\0\v \v\xA3\x7F@ \xDC" \0(\bA\xFF\xFF\xFF\xFF\x07qAkA \0,\0\v"A\0H"\x1B"M@ \0(\0 \0 \x1B! At"@   \xFC
\0\0\v@ \0,\0\vA\0H@ \0 6\f\v \0 A\xFF\0q:\0\v\v  AtjA\x006\0\f\v \0   k \0(  \x1B"\0A\0 \0  \x96\v\v\x9B\x7F@ \x8D" \0(\bA\xFF\xFF\xFF\xFF\x07qAkA
 \0,\0\v"A\0H"\x1B"M@ \0(\0 \0 \x1B! @   \xFC
\0\0\v@ \0,\0\vA\0H@ \0 6\f\v \0 A\xFF\0q:\0\v\v  jA\0:\0\0\f\v \0   k \0(  \x1B"\0A\0 \0  \x99\v\vO\x7FA\f%! (!  6\b  6 A\x006\0@ (@  6\0\f\v  6\v  6 \0 6\0\v1\x7F \0(\f" \0(F@ \0 \0(\0((\0\0\v (\0 \0 Aj6\f\v1\x7F \0(\f" \0(F@ \0 \0(\0((\0\0\v -\0\0 \0 Aj6\f\v\xB2
\x7F#\0Ak"\x07$\0@ \x07Aj \0\xED"\v-\0\0AG\r\0  j"	  \0 \0(\0A\fk(\0j"(A\xB0qA F\x1B!\b (!@ -\0PAF@ (L!\f\v \x07A\fj" ("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+"A  (\0(\0! J  6L A:\0P\v\x7F ! ! \xC0!\fA\0!#\0Ak"$\0@@ "E\r\0 (\f! \b k"
A\0J@   
 (\0(0\0 
G\r\v 	 k" H@  k"A\xF7\xFF\xFF\xFF\x07O\r@ A\vO@ A\xF8\xFF\xFF\xFF\x07q"A\bj0!  A\xF8\xFF\xFF\xFF\x07k6\f  6\b  6\f\v  :\0 Aj!\v @  \f \xFC\v\0\vA\0!  jA\0:\0\0  ( Aj ,\0A\0H\x1B  (\0(0\0 ,\0A\0H@ (#\v G\r\v 	 \bk"A\0J@  \b  (\0(0\0 G\r\v A\x006\f !\v Aj$\0 \f\v\x9D\0\v\r\0 \0 \0(\0A\fk(\0j" (Ar\xF5\v \v\xBD \x07Aj$\0 \0\v\xCF
\x7F	~#\0A\xE0\0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!
  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83!\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83"\fB \x88! B0\x88\xA7A\xFF\xFFq!\x07@@ B0\x88\xA7A\xFF\xFFq"	A\xFF\xFFkA\x82\x80~O@ \x07A\xFF\xFFkA\x81\x80~K\r\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"\rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T \rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\v\f\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\v !\f\v  \rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  \x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\vB\0!\f\v \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\vB\0!\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  \r\x84B\0!P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\v\f\v \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\v\f\v  \r\x84P@B\0!\f\v  \x84P@B\0!\f\v \rB\xFF\xFF\xFF\xFF\xFF\xFF?X@ A\xD0\0j  \f  \f \fP"\x1ByB\xC0\0B\0 \x1B|\xA7"AkFA k! )X"\fB \x88! )P!\v B\xFF\xFF\xFF\xFF\xFF\xFF?V\r\0 A@k  
  
 
P"\b\x1ByB\xC0\0B\0 \b\x1B|\xA7"\bAkF  \bkAj! )H!
 )@!\v \x07 	j jA\xFF\xFF\0k!@ 
B\x86"B \x88B\x80\x80\x80\x80\b\x84" B \x88"~" B\x86"B \x88"
 B\x80\x80\x84"\r~|" T\xAD  B1\x88 \x84B\xFF\xFF\xFF\xFF\x83" \fB\xFF\xFF\xFF\xFF\x83"\f~|" T\xAD|  \r~|   B\x80\x80\xFE\xFF\x83" \f~"  
~|" T\xAD    B\xFF\xFF\xFF\xFF\x83"~|"V\xAD||"V\xAD|  \r~"  \f~|" T\xADB \x86 B \x88\x84|   B \x86|"V\xAD|  \r ~"\r 
 \f~|"\f  ~|"  ~|"B \x88  V\xAD \f \rT\xAD  \fT\xAD||B \x86\x84|" T\xAD|    ~"\f  
~|"B \x88  \fT\xADB \x86\x84|"
 T\xAD 
 B \x86|" 
T\xAD||"
 T\xAD| 
  B \x86"  ~|" T\xAD|" T\xAD|" 
T\xAD|"B\x80\x80\x80\x80\x80\x80\xC0\0\x83B\0R@ Aj!\f\v B?\x88 B\x86 B?\x88\x84! B\x86 B?\x88\x84! B\x86! B\x86\x84!\v A\xFF\xFFN@ \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\vB\0!\f\v~ A\0L@A k"\x07A\xFF\0M@ A0j   A\xFF\0j"F A j   F Aj   \x07\x84    \x07\x84 )0 )8\x84B\0R\xAD )  )\x84\x84! )( )\x84! )\0! )\b\f\vB\0!\f\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \xADB0\x86\x84\v \v\x84!\v P B\0Y B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FQ\x1BE@ \v B|"P\xAD|!\v\f\v  B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85\x84B\0R@ !\f\v \v  B\x83|" T\xAD|!\v\v \0 7\0 \0 \v7\b A\xE0\0j$\0\v\xDC\x7F#\0Ak"$\0  6\f  \x006\b (\f"\0 (\b"G@\x7F \0 kAj"E@A\xA4\xC7(\0"\0AtA\xE4\xB3j" \0A\x8DjA\xF0pAtA\xE4\xB3j(\0A\xDF\xE1\xA2\xC8yA\0 \0AjA\xF0p"AtA\xE4\xB3j(\0"\0Aq\x1Bs \0A\xFE\xFF\xFF\xFF\x07q (\0A\x80\x80\x80\x80xqrAvs"\x006\0A\xA4\xC7 6\0 \0A\vv \0s"\0A\x07tA\x80\xAD\xB1\xE9yq \0s"\0AtA\x80\x80\x98\xFE~q \0s"\0Av \0s\f\vA\x7FA A A  g"\0tA\xFF\xFF\xFF\xFF\x07q\x1B \0k"\0 \0AjAv"nkvA\0 \0 O\x1B!A\xA4\xC7(\0!\0@ \0AtA\xE4\xB3j" \0A\x8DjA\xF0pAtA\xE4\xB3j(\0A\xDF\xE1\xA2\xC8yA\0 \0AjA\xF0p"\0AtA\xE4\xB3j(\0"Aq\x1Bs A\xFE\xFF\xFF\xFF\x07q (\0A\x80\x80\x80\x80xqrAvs"6\0 A\vv s"A\x07tA\x80\xAD\xB1\xE9yq s"AtA\x80\x80\x98\xFE~q s"Av s q" O\r\0\vA\xA4\xC7 \x006\0 (\b j\v!\0\v Aj$\0 \0\vq\x7F#\0Ak"$\0  \x006 \0(\0A\x7FG@  Aj6\f  A\fj6\b A\bj!@ \0(\0"AF\r\0\v E@ \0A6\0 \xB0 \0A\x7F6\0\v\v \0( Aj$\0Ak\v\xB2\x07\x7F~#\0Ak"\x07$\0 \0 \0(Aj6@A\xF8\x82(\0"A\xF4\x82(\0""kAu M\x7F#\0A\x90k"\b$\0@ Aj"  kAu"K@A\xFC\x82(\0 kAu O@  k\xB2\f\v \bAj! A\x80\x80\x80\x80O@=\0\vA\xFF\xFF\xFF\xFFA\xFC\x82(\0A\xF4\x82(\0k"Au"   K\x1B A\xFC\xFF\xFF\xFF\x07O\x1B!A\0! B\x007\0 A\0:\0\x88 B\x007\b @  Aj \x9C"6\0\v   Atj6\f   Atj"6\b  6 "(\b"  kAtj!@  G@ A\x006\0 Aj!\f\v\v  6\b "(A\xF8\x82(\0A\xF4\x82(\0"k"k! @   \xFC
\0\0\v  6A\xF8\x82A\xF4\x82(\x006\0A\xFC\x82(\0! )!	A\xFC\x82 (\f6\0A\xF4\x82)\0!
A\xF4\x82 	7\0  6\f  
7  (6\0  (\b"  (kA|qk6\b (\0"@ (\f Aj \x9B\v\f\v  M\r\0A\xF8\x82  Atj6\0\v \bA\x90j$\0A\xF4\x82(\0 \v Atj(\0"E\r\0  ("Ak6 \r\0  (\0(\b\0\v \x07A\x006\fA\xF4\x82(\0 Atj \x006\0 \x07(\f! \x07A\x006\f@ E\r\0  ("\0Ak6 \0\r\0  (\0(\b\0\v \x07Aj$\0\v\0\xF8\0\vO\x7FA\f%! ((!  6\b  6 A\x006\0@ ($@  6\0\f\v  6$\v  6( \0 6\0\vu~ \0  ~  ~| B \x88" B \x88"~| B\xFF\xFF\xFF\xFF\x83" B\xFF\xFF\xFF\xFF\x83"~"B \x88  ~|"B \x88|  ~ B\xFF\xFF\xFF\xFF\x83|"B \x88|7\b \0 B\xFF\xFF\xFF\xFF\x83 B \x86\x847\0\v\xC5\x7FA\xE8\x82-\0\0@A\xE4\x82(\0\v#\0A k"$\0@@@ A\bj" \0Atj \0A\xA2A\xF7A \0tA\xFF\xFF\xFF\xFF\x07q\x1B\xDE"6\0 A\x7FF\r \0Aj"\0AG\r\0\vA\xC8\xD9!\0 A\xC8\xD9A\\E\rA\xE0\xD9!\0 A\xE0\xD9A\\E\rA\0!\0A\xF0\x80-\0\0E@@ \0At \0A\xF7\xDE6\xC0\x80 \0Aj"\0AG\r\0\vA\xF0\x80A:\0\0A\xD8\x80A\xC0\x80(\x006\0\vA\xC0\x80!\0 A\bj"A\xC0\x80A\\E\rA\xD8\x80!\0 A\xD8\x80A\\E\rA'"\0E\r\0 \0 )7 \0 )7\b \0 )\b7\0\f\vA\0!\0\v A j$\0A\xE8\x82A:\0\0A\xE4\x82 \x006\0 \0\v\0A\xC0\xC7A\xC0\xC7(\0Ak"\x006\0 \0E@\x91\v\v\0A\xC0\xC7A\xC0\xC7(\0"\0Aj6\0 \0E@\xC1\v\v\0 \0-\0\0A qE@   \0\xF4\v\v\xC0\x7F@  kAH\r\0 \0( \0,\0\v" A\0H\x1BE\r\0  \xB2 \0(\0 \0 \0,\0\v"A\0H"\x1B" \0(  \x1Bj! Ak!\0@@@ -\0\0"Ak! \0 M\r\0 A\xFFqA\xFD\0M@ (\0 G\r\v Aj!   kAJj!\f\v\v A\xFFqA\xFD\0K\r \0(\0Ak I\r\v A6\0\v\v\xA0\x7F@ \0(" \0,\0\v"" A\0H\x1B" I@  k"@\x7F  \0(\b"A\xFF\xFF\xFF\xFF\x07qAkA
 A\0H"\x1B"   \x1B"kM@ Av\f\v \0   j k  \xDC \0-\0\v\v! \0(\0 \0 \xC0A\0H\x1B" j! !@ @ A\0:\0\0 Ak! Aj!\f\v\v  j!@ \0,\0\vA\0H@ \0 6\f\v \0 A\xFF\0q:\0\v\v  jA\0:\0\0\v\f\v@ \0,\0\vA\0H@ \0 6 \0(\0!\0\f\v \0 A\xFF\0q:\0\v\v \0 jA\0:\0\0\v\vP~@ A\xC0\0q@  A@j\xAD\x86!B\0!\f\v E\r\0  \xAD"\x86 A\xC0\0 k\xAD\x88\x84!  \x86!\v \0 7\0 \0 7\b\vk\x7F#\0A\x80k"$\0@  L\r\0 A\x80\xC0q\r\0    k"A\x80 A\x80I"\x1B\xF3 E@@ \0 A\x80C A\x80k"A\xFFK\r\0\v\v \0  C\v A\x80j$\0\v\0A\0\v"\x7F \0Aj!\0@ "Aj! \0(\0"\0\r\0\v \v5\x7F@ \0(\0"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v\v\0 \0\v\xD0	\x7F~#\0A\xF0\0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83!	@@ P" B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"
B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0}B\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FT 
P\x1BE@ B\0R 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0}"\vB\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FV \vB\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FQ\x1B\r\v  
B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T 
B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84! !\f\v P 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f\v  
B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0   \x85  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85\x84P"\x1B!B\0  \x1B!\f\v  	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P\r  
\x84P@  	\x84B\0R\r  \x83!  \x83!\f\v  	\x84B\0R\r\0 ! !\f\v    T 	 
V 	 
Q\x1B"\b\x1B!
   \b\x1B"\fB\xFF\xFF\xFF\xFF\xFF\xFF?\x83!	   \b\x1B"\vB0\x88\xA7A\xFF\xFFq!\x07 \fB0\x88\xA7A\xFF\xFFq"E@ A\xE0\0j 
 	 
 	 	P"\x1ByB\xC0\0B\0 \x1B|\xA7"AkF )h!	 )\`!
A k!\v   \b\x1B! \vB\xFF\xFF\xFF\xFF\xFF\xFF?\x83! \x07~  A\xD0\0j     P"\x07\x1ByB\xC0\0B\0 \x07\x1B|\xA7"\x07AkFA \x07k!\x07 )P! )X\vB\x86 B=\x88\x84B\x80\x80\x80\x80\x80\x80\x80\x84! 	B\x86 
B=\x88\x84  \x85!~ B\x86"  \x07F\r\0  \x07k"\x07A\xFF\0K@B\0!B\f\v A@k  A\x80 \x07kF A0j   \x07\x84 )8! )0 )@ )H\x84B\0R\xAD\x84\v!	B\x80\x80\x80\x80\x80\x80\x80\x84!\v 
B\x86!
@ B\0S@B\0!B\0! 	 
\x85  \v\x85\x84P\r 
 	}! \v } 	 
V\xAD}"B\xFF\xFF\xFF\xFF\xFF\xFF\xFFV\r A j     P"\x07\x1ByB\xC0\0B\0 \x07\x1B\x84\xA7A\fk"\x07F  \x07k! )(! ) !\f\v 	 
|" 	T\xAD  \v||"B\x80\x80\x80\x80\x80\x80\x80\b\x83P\r\0 	B\x83 B?\x86 B\x88\x84\x84! Aj! B\x88!\v \fB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83! A\xFF\xFFN@ B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!B\0!\f\vA\0!\x07@ A\0J@ !\x07\f\v Aj   A\xFF\0jF   A k\x84 )\0 ) )\x84B\0R\xAD\x84! )\b!\v B=\x86 B\x88\x84! B\x88B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \x07\xADB0\x86\x84 \x84!@@ \xA7A\x07q"AG@    AK\xAD|"V\xAD|!\f\v    B\x83|"V\xAD|!\f\v E\r\v\v \0 7\0 \0 7\b A\xF0\0j$\0\v?|\x7F D\x90A\xF2\xFF\xFF\xFF\xEF?\xA2" D8\xDF\0\0\0\xF0?\xA2" D\0\0\0\0\0\0\0\0d"\x1B \0e \0   \x1Beq\v\xC5\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\b"\0I@ (\0!@  6\0 Aj" \0I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\0\v\x84\x7F~#\0Ak"$\0 \0~ E@B\0\f\v   Au"s k"\xADB\0 g"A\xD1\0jF )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85A\x9E\x80 k\xADB0\x86|B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\0 A\0H\x1B\x84! )\0\v7\0 \0 7\b Aj$\0\v"\0 \0(# \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v\x07\0 \0(\f\v\xB3\x7F#\0Ak"$\0 !@ AO@ \0(\0\0A\x95\xD3\xC7\xDEl"Av sA\x95\xD3\xC7\xDEl A\x95\xD3\xC7\xDEls! Ak! \0Aj!\0\f\v\v@@@@ Ak\0\v \0-\0At s!\v \0-\0A\bt s!\v  \0-\0\0sA\x95\xD3\xC7\xDEl!\v A\rv sA\x95\xD3\xC7\xDEl"\0Av \0s Aj$\0\vj\x7F@ E\r\0 (\x9C"@ \0 T\v (\xA0"@ \0 T\v (\xA4"@ \0 T\v (\xA8"@ \0 T\v \x92"#  \0(\0G\r\0 \0A\x006\0\v\v\xCE\x7F \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0@ \0(" \0(\b"O\r\0 A\x7Fs  Aj"  K\x1BjApqAj"E\r\0 A\0 \xFC\v\0\v \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xAD\x7F|#\0Ak"$\0A\xD9
"A\x9C"! A	O@ \0\v A\xCD\b"! A	O@ \0\v  6\f#\0A k"$\0A\xEC\xB1-\0\0AqE@AA\xB83A!A\xEC\xB1A:\0\0A\xE8\xB1 6\0\v \0("\0A	O@ \0\x07\v  \x006 (\f"\0A	O@ \0\x07\v  \x006 A\x006\fA\xE8\xB1(\0 A\x90 A\fj Aj (\f"\0@ \0\v A j$\0D\0\0\0\0\0\0\0\0b (\f"A	O@ \0\v A	O@ \0\v A	O@ \0\v A	O@ \0\v Aj$\0\v\0 \0A\x006\b \0B\x007\0\vd\0 (A\xB0q"A F@ \v@ AG\r\0@@ \0-\0\0"A+k\0\0\v \0Aj\v  \0kAH\r\0 A0G\r\0 \0-\0A rA\xF8\0G\r\0 \0Aj!\0\v \0\v\x97R\x7F\r|~ \0  \xB1 !!#\0Ak"\v$\0 \vB\x007\b \vB\x007\0 (p"@ !(\f!
@ 
 (Atj"\fB\x007\b \fB\x007\0 (\0"\r\0\v\v \0! (|"@@ (\f"\0 (\f"(A\x98lj"
+\b \0 (\b"(A\x98lj"\0+\b\xA1!%@@ 
+\0 \0+\0\xA1"&A\xC8\xC7+\0"$cE\r\0 &D\0\0\0\0\0\0\0\0 $\xA1"'dE\r\0 $ %dE\r\0 % 'dE\r\0 \vB\x007\b \vB\x007\0D\0\0\0\0\0\0\0\0!$D\0\0\0\0\0\0\0\0!%\f\v & &\xA2 % %\xA2\xA0\x9F"$ \v\x91@ \v+\0!$ \v+\b!%\f\v \v % (\f (Alj+\0!%#\0Ak"\f$\0|@@@@ (h\0\v $ $\xA2 % % %\xA2\xA2\xA3\f\vD\0\0\0 _\xA0\xC2 $D\0\0\0\0\0\0\0\0a\r $ %\xA3\x8ED\0\0\0\0\0\0$@\xA2 %\xA3\f\vD\0\0\0 _\xA0\xC2 $D\0\0\0\0\0\0\0\0dE\r $ $ $ %\xA3\x8E\xA2\xA2 % % %\xA2\xA2\xA3\f\v \fA\fj"\rA\xA8\xF9A\xAF\fA8"\0 \0(\0A\fk(\0j("
6\0 
A\xEC\x82G@ 
 
(Aj6\v \rA\xA4\x84+"
A
 
(\0(\0!
 \rJ \0 
y \0&D\0\0\0\0\0\0\0\0\v \fAj$\0 $\xA3"$\xA2"%9\b \v & $\xA2"$9\0\v !(\f"
 (Atj"\0 \0+\b %\xA19\b \0 \0+\0 $\xA19\0 \v+\0!$ 
 (Atj"\0 \0+\b \v+\b\xA09\b \0 $ \0+\0\xA09\0 (\0"\r\0\v\v \vAj$\0@@@@@ (\x80\0\v   \xAA\f\v#\0A0k"$\0 (p"@ (\f!\0@ \0 (Atj"B\x007\b B\x007\0 (\0"\r\0\v\v A (l\xB7\x9F (\xE8\xB7\xA3\xFC"\0 \0AL\x1B"Ak"6\xEC@@  l"At"\0'"\r@ \0 \rj! @ \r!@ A\x006\f A\xAC,6\0 B\x007 Aj" I\r\0\v\v@ A\0N@ \r  lAtj!\vA\0!@ \v Atj"\0A\x006\f \0("
@A\f 
 \0(\b$ \0B\x007 (\xEC!\v  J Aj!\r\0\v\v  J Aj!\r\0\v (p"E\r +\xF0 Aj\xB7\xA3!$@ \r  (\f (A\x98lj"\0+\0 +\xF8\xA1 $\xA3\xFClAtj \0+\b +\x80\xA1 $\xA3\xFCAtj" (\fAj6\fA\f%!\0 (\b!\v \0 6\b \0 \v6 \0A\x006\0@ (@ \v \x006\0\f\v  \x006\v  \x006\b (\0"\r\0\v\f\v\f\v (\xEC!\vA\0!\vA\0!
 A\0N@A\0!\f@@ A\0H@ \fAj!\f\v \fAj! \fAk! \r \f lAtj!A\0!@    Atj"\x1B\xA9 \v@A \v 
$A\0!
\vA\0!\v@ Ak" rA\0H\r\0  (\xEC"\0J\r\0 \0 H\r\0A%"\v 6\f \v 6\b \v 
6 \vA\x006\0 \v!
\v@ \fA\0L@ 
!\0\f\v (\xEC"\0 H@ 
!\0\f\v \0 H@ 
!\0\f\vA%"\0 6\f \0 6\b \0 
6 \0A\x006\0 \vE@ \0!\v\f\v 
 \x006\0\v@ Aj" rA\0H@ \0!\f\v (\xEC" H@ \0!\f\v  H@ \0!\f\vA%" 6\f  6\b  \x006 A\x006\0 \vE@ !\v\f\v \0 6\0\v@  \frA\0H@ !\0\f\v (\xEC"\0 \fH@ !\0\f\v \0 H@ !\0\f\vA%"\0 6\f \0 \f6\b \0 6 \0A\x006\0 \vE@ \0!\v\f\v  \x006\0\v@ \f rA\0H@ \0!\f\v (\xEC" \fH@ \0!\f\v  H@ \0!\f\vA%" 6\f  \f6\b  \x006 A\x006\0 \vE@ !\v\f\v \0 6\0\v@  rA\0H@ !\0\f\v (\xEC"\0 H@ !\0\f\v \0 H@ !\0\f\vA%"\0 6\f \0 6\b \0 6 \0A\x006\0 \vE@ \0!\v\f\v  \x006\0\v@ A\0H@ \0!\f\v (\xEC" H@ \0!\f\v  H@ \0!\f\vA%" 6\f  6\b  \x006 A\x006\0 \vE@ !\v\f\v \0 6\0\v@  rA\0H@ !
\f\v (\xEC"\0 H@ !
\f\v \0 H@ !
\f\vA%"
 6\f 
 6\b 
 6 
A\x006\0 \vE@ 
!\v\f\v  
6\0\v \v"@@ (\b!\0@  (\f"G@  G\r \0 G\r\v \x1B("E\r\0 \r Atj \0 lAtj"("\0E\r\0@ \0@ (\b!@  (\f" \0(\b" (A\x98lj"+\x009  +\b9   (A\x98lj"+\x009\0  +\b9\b A j Aj \x8F (\f" (Atj" +  +\0\xA09\0  +( +\b\xA09\b   (Atj" +\0 + \xA19\0  +\b +(\xA19\b \0(\0"\0\r\0\v\v (\0"E\r (!\0\f\0\v\0\v (\0"\r\0\v\v  (\xEC"H !\r\0\v\v  \fJ !\f\r\0\v\v @ \r!@  (\0(\0\0\0 Aj" I\r\0\v\v \r# \v@A \v 
$\v A0j$\0\f\v@ A\x88j"-\0AF@A\0!#\0A\xB0k"$\0 A\xA8j"B\x007\0 A\x84j (\fAkU!   6\x80 A\x006| A\x846x A\xC8\0j"\0  A\xF8\0j5  (H6| B\x007\x98 A\xB4)6x B\x007\xA0 A\xD4\0j (\fAkU!  6P A\x006L A\x846H Aj"  \05  (6L B\x007h A\xB4)6H B\x007p A$j (\fAkU!"  6  A\x006 A\x846 A\bj  5  (\b6 B\x0078 A\xB4)6 B\x007@ A\xE0\xE5\x006\b B\x007\f@ (p"\0E\r\0 "(\0!  (\0"\v (\0"F@  F@@  \0(Atj"B\x007\b B\x007\0 \0(\0"\0\r\0\f\v\0\v@  \0(At"\vj"
B\x007\b 
B\x007\0  \vj"\vB\x007\b \vB\x007\0 \0(\0"\0\r\0\v\f\v  F@@  \0(At"
j"\fB\x007\b \fB\x007\0 
 \vj"\f  
j"
+\x009\0 \f 
+\b9\b \0(\0"\0\r\0\f\v\0\v@  \0(At"
j"\fB\x007\b \fB\x007\0  
j"\fB\x007\b \fB\x007\0 
 \vj"
B\x007\b 
B\x007\0 \0(\0"\0\r\0\v\v A\x006@@@ ((\0\vA\0!
A\0!#\0A@j"$\0 A\xE0\xE5\x0060 A\xE0\xE5\x006  B\x007$ A\x006 A\xC4\xE6\x006 B\x007 A\x006\f A\xC4\xE6\x006\0 B\x007 A\xB00k"\x006  \x006\0 \0A\x006\0 +@!$ \0 +H9 \0 $9\b \0 +89A%"A\x006\f A\xC4\xE6\x006\0 B\x007 \0 6  (\0A%"\0A\x006\f \0A\xC4\xE6\x006\0 \0B\x007 \x006$ (\0"\0( ! \0($!\vA\0!\f#\0A k"\r$\0 (p"@A\0!\0@ (\f (A\x98lj"+\b!$ +\0!%  (\fAj6\fA0%! (\b! A\x006(  \x006  %9  6\b  6 A\x006\0 B\x007 A\0:\0$@ (@ (\b 6\0\f\v  6\v  6\b \v \v(\fAj6\fA0%!\0 \v(\b! \0A\x006( \0 \f6 \0 $9 \0 6\b \0 6 \0A\x006\0 \0B\x007 \0A\0:\0$@ \v(@ \v(\b \x006\0\f\v \v \x006\v \v \x006\b (\b"\fA\x006( \f \x006 \f %9 \f 6\b \fB\x007 \fA\0:\0$ \v(\b"A\x006(  \f6  $9  6\b B\x007 A\0:\0$ (\0"\r\0\v\v \rA\x88\xE3\x006\b \r \rA\bj"\x006  \0\x9F ("\0@@ \0( \x006 \0(\0"\0\r\0\v\v \v \rA\bj\x9F \v("\0@@ \0( \x006 \0(\0"\0\r\0\v\v@ \r("\0 \rA\bjF\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v \rA j$\0 A\x006, (\0!\0 A6<A\f%" \x006\b B\x007\0  64  68 A4j! A j! A0j!\0A\0!A\0!\r@ ! \0!@ (\b!\x1B  (\fAk6\f  (\x006\0 A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ (\0"\0@ \0A\x006\f\v A\x006\b\v \x1B($! \x1B( ! A\x006\x7F E@ \r!\0 \f\vA0  \r$ B\x007A\0!\0A\0\v!\v A\x006\f\x7F E@ 
!\f \f\vA0  
$ B\x007A\0!\fA\0\v! (!
A\0!A\0!@ 
(\b! 
(\f! 
)!1 
(!  Aj"6A0%"\rA\x006( \r 6 \r 17 \r 6\f \r 6\b \r \x006 \rA\x006\0 \rB\x007 \rA\0:\0$ \r"! @ \0 \r6\0 ! \v!\v  \r6 
A\x006( 
A\0:\0$ 
 \r6  
A\x006 
 6 
 17 
 6\f 
 6\b (\b 
G@ !\v \r!\0 ! 
(\0"
\r (!
\f\v\v  6 (!A\0!\vA\0!\0@ (\b! (\f! )!1 ("#( !  \0Aj"\x006\fA0%"
A\x006( 
 6 
 17 
 6\f 
 6\b 
 \f6 
A\x006\0 
B\x007 
A\0:\0$ 
"! \v@ \f 6\0 ! \v!\v  
6\b  
6 A\x006( A\0:\0$  
6  A\x006  #6  17  6\f  6\b (\b G@ ! 
!\f !\v (\0"\r (!\f\v\v  6  \x1B6   Aj  \xA3 ("\r\0\v Aj! "\0("\r\0\vA0  
$A0  \r$ ($"\0@A\f \0 (($\v (4"\0@A\f \0 (8$\v A@k$\0\f\v#\0A k"$\0 A\xE0\xE5\x006 A\xE0\xE5\x006\0 B\x007 A\xB00k"\x006  \x006\0 \0A\x006\0 +@!$ \0 +H9 \0 $9\b \0 +89 \0 (l6( (p"@@ (\0" (TAj6TA\f%!\0 (P!\v \0 6\b \0 \v6 \0A\x006\0@ (L@ \v \x006\0\f\v  \x006L\v  \x006P (\0"\r\0\v\v Aj! A\x006\f (\0!\0 A6A\f%"\r \x006\b \rB\x007\0  \r6  \r6 "\0Aj!\v@ \0! \v!\0@ \r(\b!\v \0 \0(\fAk6\f  \r(\x006\0 \rA\xF0\xD8(\x006\0A\xF0\xD8 \r6\0@ (\0"
@ 
A\x006\f\v \0A\x006\b\vA\0!
#\0A k"\f$\0A\xD8\xE0+\0!$A!\r@ \v((\xB7\x9E $\xA3\x9CD\0\0\0\0\0\0\0\xC0\xA0"$D\0\0\0\0\0\0\xF0? $D\0\0\0\0\0\0\xF0?d\x1B\xFC"A\0L\r\0 A\x07q! A\bO@ A\xF8\xFF\xFF\xFF\x07q!@ \rA\bt!\r 
A\bj"
 G\r\0\v E\r\vA\0!
@ \rAt!\r 
Aj"
 G\r\0\v\v@ \v+ \r\xB8\xA3DY\xF3\xF8\xC2n\xA5f@A\0!
 \fA\x006 \fA\x006 \f \r6 \f \rAk"6 \f 6@ \rA\0L@ \fA\x006\0 \fB\x007\b\f\v \f \r \rlAt"'"
6\b 
E\r	 \f 
6\0 \f 
 j6\f\v  \v6   \x9E\x7F    \fA\0A\0A\0\xA4 \v(L"
@ \v+ \r\xB7\xA3!$@ 
(\b! \v \v(TAk6T \v 
(\x006L 
A\xF0\xD8(\x006\0A\xF0\xD8 
6\0@ \v(L"
@ 
A\x006\f\v \vA\x006P\v \f(\0 \f( (\f (A\x98lj"
+\0 \v+\b\xA1 $\xA3\xFC \f(klAtj 
+\b \v+\xA1 $\xA3\xFCAtj(\0"
 
(TAj6TA\f%!\r 
(P! \r 6\b \r 6 \rA\x006\0@ 
(L@  \r6\0\f\v 
 \r6L\v 
 \r6P 
 
((Aj6( \v(L"
\r\0\v\v  \v6  \xA3  \v6    \xA2 \f(\b 
\v#\v \fA j$\0\f\0\v \0("\r\r\0\v Aj! "\v("\r\r\0\v A\xDC\xE1\x006\0 ("\0@A\f \0 (\b$\v A\xDC\xE1\x006 ("\0@A\f \0 ($\v A j$\0\v  (\x006    A\bj\xA7   (\0\xA6 (\f"@@A\0!\0A\0!\r (\b"\v(L"
@@A\f%" \r6 A\x006\0  
(\b6\b ! \0@ \r 6\0 \0!\v !\0 !\r 
(\0"
\r\0\v (T! \0!
@ (4"\fA\0L@@  
(\b(Atj"\0B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F7\b \0B\x007\0 
(\0"
\r\0\f\v\0\v (\f! \v+8!* \v+0!+ \v(D!\v@  \0(\b("A\x98lj"
+\b *\xA1!( 
+\0 +\xA1!)D\0\0\0\0\0\0\xF0?!&D\0\0\0\0\0\0\0\0!'A!
D\0\0\0\0\0\0\0\0!$D\0\0\0\0\0\0\0\0!%@ ( '\xA2!, $ ' \v 
Atj"+\0 
\xB8"$\xA2"-\xA2 & +\b $\xA2".\xA2\xA0\xA0!$ % & -\xA2 ' .\xA2\xA1\xA0!% 
 \fF 
Aj!
 ( &\xA2 ) '\xA2\xA0!' ) &\xA2 ,\xA1!&E\r\0\v  Atj"
 $\x9A9\b 
 %9\0 \0(\0"\0\r\0\v\vA\f  \r$\v (\0"\r\0\v\v (\f"@@A\0!A\0!\r (\b"\v(L"\0@@A\f%" \r6 A\x006\0  \0(\b6\b \x7F \r 6\0  \v! !\r \0(\0"\0\r\0\v\vA\0!\0A\0! \v(\x8C"@@A\f%" 6 A\x006\0  (\b6\b !\v \0@  6\0 \0!\v\v \v!\0 ! (\0"\r\0\v@ E\r\0 ($!\f (\f! \0!
 (4"A\0L@@ 
(\b"\0+8!( \0+0!) \0(@"\0+\b!& \0+\0!' !\0@ \f \0(\b("Atj" +\b &  A\x98lj"+\0 )\xA1"$ +\b (\xA1"%D\0\0\0\0\0\0\0\0\xA2\xA0 $ $\xA2 % %\xA2\xA0"*\xA3"+\xA2 ' $D\0\0\0\0\0\0\0\0\xA2 %\xA1 *\xA3"$\xA2\xA0\xA19\b  ' +\xA2 & $\xA2\xA1 +\0\xA09\0 \0(\0"\0\r\0\v 
(\0"
\r\0\f\v\0\v@ \0(\b"+8!- +0!. (@"+\b!+ +\0!, !
@ +  
(\b("A\x98lj"+\0 .\xA1"& +\b -\xA1"'D\0\0\0\0\0\0\0\0\xA2\xA0 & &\xA2 ' '\xA2\xA0"(\xA3"$\xA2 , &D\0\0\0\0\0\0\0\0\xA2 '\xA1 (\xA3"%\xA2\xA0!) , $\xA2 + %\xA2\xA1!*A!@ ' %\xA2!/ ) & %\xA2 ' $\xA2\xA1 (\xA3"%  Atj"+\0 \xB8")\xA2"0\xA2 / & $\xA2\xA0 (\xA3"$ +\b )\xA2"/\xA2\xA0\xA1!) * $ 0\xA2 % /\xA2\xA1\xA1!*  F Aj!E\r\0\v \f Atj" +\b )\xA19\b  * +\0\xA09\0 
(\0"
\r\0\v \0(\0"\0\r\0\v\vA\f \v $\v @A\f  \r$\v (\0"\r\0\v\v A\xF8\0j!A\0!A\0!A\0!\vA\0!
A\0!\rA\0!A\0!A\0!#\0A\x80k"$\0 A\x006| A\xAC,6p B\x007t@ (\f"\x1BE\r\0@ \x1B(\b! (t"\0@A\f \0 (x$ B\x007t\v (L"\f@@A\f%"\0 (x"6 \0A\x006\0 \0 \f(\b6\b@ (t@  \x006\0\f\v  \x006t\v  \x006x \f(\0"\f\r\0\v\v  (T"\x006|@@ (0 \0N@   A\xF0\0j\xA9 \r@A\f \r $A\0!\vA\0!\f (l"E@ !\0A\0!\r\f\v@A\f%"\0 6 \0A\x006\0 \0 (\b6\b \0!\r \f@  \x006\0 \f!\r\v \r!\f \0! (\0"\r\0\v +!' +\b!$ +!% \f!@@@ % (\b"+"&d\r\0 % &b\r $ +\b"(A\xC8\xC7+\0"&\xA1")c\r\0 $ ( &\xA0cE\r $ )dE\r ' + &\xA1cE\r\v \v@A\f \v $A\0!\vA\0!\v (L"E\r\0@A\f%"\f 6 \fA\x006\0 \f (\b6\b \f! \v@  6\0 \v!\v !\v \f! (\0"\r\0\v (t"\v@@ \v(\b! !\f@  (\f" \f(\b"(A\x98lj"+\x009P  +\b9X   (A\x98lj"+\x009@  +\b9H A\xE0\0j A\xD0\0j A@k\x8F (\f" (Atj" +\` +\0\xA09\0  +h +\b\xA09\b  (Atj" +\0 +\`\xA19\0  +\b +h\xA19\b \f(\0"\f\r\0\v \v(\0"\v\r\0\v\v !\v\v (\0"\r\0\v\f\v (t"\fE\r@  (\f \f(\b"\0(A\x98lj"+\0"$9  +\b"%9\b  $9\0  %9 A\xE0\0j Aj \x8F (\f \0(Atj"\0 +\` \0+\0\xA09\0 \0 +h \0+\b\xA09\b \f(\0"\f\r\0\v\f\v 
@A\f 
 $A\0!\vA\0!\f (|"E@A\0!
 \0!\f\v@A\f%" 6 A\x006\0  (\b6\b !
 \f@  6\0 \f!
\v ! 
!\f (\0"\r\0\v 
!@ (\b @A\f  $A\0!\vA\0!(L"@@A\f%"\f 6 \fA\x006\0 \f (\b6\b \f! @  6\0 !\v ! \f! (\0"\r\0\v (t"@@ (\b! !\f@  (\f" \f(\b(A\x98lj"+\x0090  +\b98   (A\x98lj"+\x009   +\b9( A\xE0\0j A0j A j\x8F (\f (Atj" +\` +\0\xA09\0  +h +\b\xA09\b \f(\0"\f\r\0\v (\0"\r\0\v\v !\v (\0"\r\0\v \0!\v \x1B(\0"\x1B\r\0\v 
@A\f 
 $\v \r@A\f \r $\v @A\f  $\v \vE\r\0A\f \v $\v A\xAC-6p (t"\0@A\f \0 (x$\v A\x80j$\0 (p"@ (\f! "(\0!\v (\0!
  (\0!\f@ \v (At"\0j"\r+\0!$ \0 
j"+\0!% \0 \fj"+\0!& \0 j"\0 +\b +\b\xA0 \r+\b\xA09\b \0 $ & %\xA0\xA09\0 (\0"\r\0\v\v  (\0T A\xDC\xE1\x006\b (\f"\0@A\f \0 ($\v A\x846 ( "\0@  (6\b \0 A\bj(\v ((# A\x846H (P"\0@  (L6 \0 Aj(\v (X# A\x846x (\x80"\0@  (|6H \0 A\xC8\0j(\v (\x88# A\xB0j$\0\f\v   \xAA\v\v#\0Ak"\0$\0|@@@@@ -\0\xA0E@ B\x80\x80\x80\x80\x80\x80\x80\xF8?7\x88D\0\0\0\0\0\0\xF0?!$ 	Ak\v@@ 	\0\v +\xA8!$ \bAF@  $9\x88\f\v  $ +\x88\xA29\x88\f\v +\x88!$\v  $D\0\0\0\0\0\0$@\xA39\x88\f\v 	AJ\r\v A\xF0\0j! +x\f\v  +\xC8"$D\0\0\0\0\0\0$@\xA3 $ \b (\xC0AkJ\x1B9\x88\v A\xD8j! -\0\xD0E@ +\xE0\f\vD\0\0\0\0\0\0y@ (l\xB7\xA3"$D\x9A\x99\x99\x99\x99\x99\xC9? $D\x9A\x99\x99\x99\x99\x99\xC9?c\x1B\v!) (p"@ +\0!*D\0\0\0\0\0@\x8F@D\0\0\0\0\0\0@ \bAF\x1B!+A\xC8\xC7+\0!'@ (At" !(\fj"	+\0!% (\f j"+\0!( 	+\b!& +\b!, +\x90!$ \0B\x007\b \0B\x007\0 $ $\xA2"$ * &\xA2 ) ,\xA2\xA0\xA2!&@@ * %\xA2 ) (\xA2\xA0 $\xA2"( 'cE\r\0 (D\0\0\0\0\0\0\0\0 '\xA1",dE\r\0 & 'cE\r\0D\0\0\0\0\0\0\0\0!%D\0\0\0\0\0\0\0\0!$ & ,d\r\v ( (\xA2 & &\xA2\xA0\x9F"$ \0\x91A\xC8\xC7+\0!'@ +\x98!(@ \0+\0"$ +\xA8"%c@ %!$\f\v $ % (\xA0"%dE\r\0 %!$\v \0+\b"& +\xB0"%c\r & ( %\xA0"%d\r &!%\f\v & +\x98 +\xA3"% $ +\x88\xA2 +\x98\xA2"& % &c\x1B $\xA3"$\xA2!% ( $\xA2!$\v \0 (\f (Atj"G@  %9\b  $9\0\v (\0"\r\0\v\v \0Aj$\0@ \bAN@ (p"E\r \x07(\f! (\f!\x07@  (At"j!\0@  \x07j"+\0"$ $\xA2 +\b"% %\xA2\xA0"(D\0\0\0\0\0\0\0\0dE\r\0 \0+\0"& &\xA2 \0+\b"' '\xA2\xA0")D\0\0\0\0\0\0\0\0dE\r\0 (\x9F!( )\x9F|D\0\0\0\0\0\0\0\0 &D\0\0\0\0\0\0\0\0a 'D\0\0\0\0\0\0\0\0aq\r\0D\0\0\0\0\0\0\0\0 $D\0\0\0\0\0\0\0\0a %D\0\0\0\0\0\0\0\0aq\r\0 % $] ' &]\xA1"&D-DT\xFB!@\xA0 & &D\0\0\0\0\0\0\0\0c\x1B\vD}j\x8A:R\xC1\xE0?\xA3\x9B\xFCAtA\xC0\xC9\0j+\0\xA2 (\xA3"&D\0\0\0\0\0\0\xF0?cE\r\0  % &\xA2"%9\b  $ &\xA2"$9\0\v  \x07G@ \0 %9\b \0 $9\0\v (\0"\r\0\v\f\v \bAG\r\0 (p"\0E\r\0 \x07(\f" (\f"F\r\0@  \0(At"j"\x07  j"+\x009\0 \x07 +\b9\b \0(\0"\0\r\0\v\v (p"@ (\f! (\f!@  ("\0Atj"+\0!$  \0A\x98lj"\0 \0+\b +\b\xA09\b \0 $ \0+\0\xA09\0 (\0"\r\0\v\v   \xA8\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xC7\x7F| \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\b"\0I@ +\0!@  9\0 A\bj" \0I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vG\x7F \0 7p \0 \0(, \0("k\xAC7x \0(\b!@ P\r\0   k\xACY\r\0  \xA7j!\v \0 6h\v\x81\x7F@@ AO@ \0 rAq\r@ \0(\0 (\0G\r Aj! \0Aj!\0 Ak"AK\r\0\v\v E\r\v@ \0-\0\0" -\0\0"F@ Aj! \0Aj!\0 Ak"\r\f\v\v  k\vA\0\v\xA8\x7F~@ \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X@ \0\xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x81\x80\x80\x80\x80\x80\x80\xF8\xFF\0T\r\v \0 \xA0\v \xBD"\x07B \x88\xA7"A\x80\x80\xC0\xFFk \x07\xA7"rE@ \0\x90\v AvAq" \0\xBD"\x07B?\x88\xA7r!@@@@@ \x07B \x88\xA7A\xFF\xFF\xFF\xFF\x07q" \x07\xA7rE@ Ak\v A\xFF\xFF\xFF\xFF\x07q" rE@D-DT\xFB!\xF9? \0\xA6\v A\x80\x80\xC0\xFF\x07G\r A\x80\x80\xC0\xFF\x07G\r At+\x90~\vD-DT\xFB!	@\vD-DT\xFB!	\xC0\v A\x80\x80\xC0\xFF\x07G A\x80\x80\x80 j OqE@D-DT\xFB!\xF9? \0\xA6\v| @D\0\0\0\0\0\0\0\0 A\x80\x80\x80 j I\r\v \0 \xA3\x99\x90\v!\0@@@ Ak\0\v \0\x9A\vD-DT\xFB!	@ \0D\x07\\3&\xA6\xA1\xBC\xA0\xA1\v \0D\x07\\3&\xA6\xA1\xBC\xA0D-DT\xFB!	\xC0\xA0\v At+\xB0~!\0\v \0\v\0 \0 \0(\0(\0\vB\0 \0 Al"A\xB0\xAAj-\0\0:\0\0 \0 A\xB1\xAAj-\0\0:\0 A\xB2\xAAj-\0\0! \0A\xFF:\0 \0 :\0 \0\v\xEA	| \0+\b! +\b!@@ +\0" \0+\0"\x07A\xC8\xC7+\0"\xA1"\bc\r\0@  \x07 \xA0cE\r\0  \bdE\r\0   \xA1c\r\v +\b!\x07 +\0"  \xA1"\bcE@   \xA0cE\r  \bdE\r \x07  \xA1cE\r\v  G@  \x079\b  9\0\v  9\b  9\0 \0+\b! +\b! +\0" \0+\0"\x07 \xA1"\bcE@   \x07\xA0cE\r  \bdE\r   \xA1cE\r\v \0 G@ \0 9\b \0 9\0\v  9\b  \x079\0\f\v +\b!
@@ +\0"	  \xA1"\vcE@ 	  \xA0cE\r 	 \vdE\r 
  \xA1cE\r\v \0 F\r \0 
9\b \0 	9\0\f\v \0 G@ \0 9\b \0 9\0\v  9\b  \x079\0 +\b! +\0" \bcE@  \x07 \xA0cE\r  \bdE\r   \xA1cE\r\v  F\r\0  9\b  9\0\v  9\b  \x079\0\v\v\0 \0 \xBC!\0 Aj"@ \0  \xFC
\0\0\v\v\xAC\x7F#\0Ak"$\0  6\fA\0!@ \x7FA \0 A\fj-\r\0A A\xC0\0\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (\0(\f\0E\r\0  A\0 (\0(4\0!@@ \0e A0k! \0 A\fj-\r\0 AH\r\0 A\xC0\0\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (\0(\f\0E\r Ak!  A\0 (\0(4\0 A
lj!\f\v\v \0 A\fj-E\rA\v (\0r6\0\v Aj$\0 \v\xC9\x7F#\0Ak"\x07$\0 \x07 6\f@@ \0 \x07A\fj.@A\0!A!\f\vA\0!A!\x7F \0(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0"A\0H\r\0 (\b Atj-\0\0A\xC0\0qE\r\0  A\0 (\0($\0!@@ \0g A0k! \0 \x07A\fj.\r\0 AH\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\0H\r (\b Atj-\0\0A\xC0\0qE\r Ak!  A\0 (\0($\0 A
lj!\f\v\v \0 \x07A\fj.E\rA!\v  (\0 r6\0\v \x07Aj$\0 \v\xDC\x7F#\0Ak"$\0  6\fA\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\b (\f!#\0Ak"$\0  6\f  6\bA\x7F!@A\0A\0  \xC7"A\0H\r\0 \0 Aj"'"\x006\0 \0E\r\0 \0   (\f\xC7!\v Aj$\0 (\b"\0@A\xF0\xAD(\0 \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v\v Aj$\0 \v\f\0 \0(\06 \0\v.\0@ \0(A\xCA\0q"\0@ \0A\xC0\0F@A\b\v \0A\bG\rA\vA\0\vA
\v\f\0 \0(\07 \0\v\xCF~\x7F#\0Ak"$\0 \xBD"B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07\x83! \0~ B4\x88B\xFF\x83"B\0R@ B\xFFR@ B\x88! B\x80\xF8\0|! B<\x86\f\v B\x88!B\xFF\xFF! B<\x86\f\v P@B\0!B\0\f\v  B\0 y\xA7"\x07A1jF )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85!A\x8C\xF8\0 \x07k\xAD! )\0\v7\0 \0 B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83 B0\x86\x84 \x847\b Aj$\0\v\x8D\b\v\x7F \0E@ '\v A@O@A\xE8\xE0A06\0A\0\v\x7FA A\vjAxq A\vI\x1B! \0A\bk"("	Axq!\b@ 	AqE@ A\x80I\r Aj \bM@ ! \b kA\x84\xE6(\0AtM\r\vA\0\f\v  \bj!\x07@  \bM@ \b k"AI\r   	AqrAr6  j" Ar6 \x07 \x07(Ar6  \x87\f\vA\xBC\xE2(\0 \x07F@A\xB0\xE2(\0 \bj"\b M\r   	AqrAr6  j" \b k"Ar6A\xB0\xE2 6\0A\xBC\xE2 6\0\f\vA\xB8\xE2(\0 \x07F@A\xAC\xE2(\0 \bj" I\r@  k"AO@   	AqrAr6  j"\b Ar6  j" 6\0  (A~q6\f\v  	Aq rAr6  j" (Ar6A\0!\bA\0!\vA\xB8\xE2 \b6\0A\xAC\xE2 6\0\f\v \x07("Aq\r Axq \bj"\v I\r \v k!\f \x07(\f!@ A\xFFM@ \x07(\b" F@A\xA4\xE2A\xA4\xE2(\0A~ Avwq6\0\f\v  6\f  6\b\f\v \x07(!
@  \x07G@ \x07(\b" 6\f  6\b\f\v@ \x07("\x7F \x07Aj \x07("E\r \x07Aj\v!\b@ \b! "Aj!\b ("\r\0 Aj!\b ("\r\0\v A\x006\0\f\vA\0!\v 
E\r\0@ \x07("At"(\xD4\xE4 \x07F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ wq6\0\f\v@ \x07 
(F@ 
 6\f\v 
 6\v E\r\v  
6 \x07("@  6  6\v \x07("E\r\0  6  6\v \fAM@  	Aq \vrAr6  \vj" (Ar6\f\v   	AqrAr6  j" \fAr6  \vj" (Ar6  \f\x87\v !\v \v"@ A\bj\v '"E@A\0\v  \0A|Ax \0Ak(\0"Aq\x1B Axqj"   K\x1Bj \0# \v\x8B\x7F A\x80O@ @ \0  \xFC
\0\0\v \0\v \0 j!@ \0 sAqE@@ \0AqE@ \0!\f\v E@ \0!\f\v \0!@  -\0\0:\0\0 Aj! Aj"AqE\r  I\r\0\v\v A|q!@ A\xC0\0I\r\0  A@j"K\r\0@  (\x006\0  (6  (\b6\b  (\f6\f  (6  (6  (6  (6  ( 6   ($6$  ((6(  (,6,  (060  (464  (868  (<6< A@k! A@k" M\r\0\v\v  O\r@  (\x006\0 Aj! Aj" I\r\0\v\f\v AI@ \0!\f\v AI@ \0!\f\v Ak! \0!@  -\0\0:\0\0  -\0:\0  -\0:\0  -\0:\0 Aj! Aj" M\r\0\v\v  I@@  -\0\0:\0\0 Aj! Aj" G\r\0\v\v \0\v\xC9\0 \0B\x007\\ \0A\xAC,6H \0B\x007L \0B\x007l \0A\xE0\xE5\x006X \0B\x007| \0A\xE0\xE5\x006h \0B\x007\x8C \0A\xE0\xE5\x006x \0A\xE0\xE5\x006\x88 \0A\x006\x84 \0A\x006t \0A\x006d \0A\x006T \0A\x006\0 \0B\x007\b \0B\x007 \0B\x007 \0B\x007  \0A\x006( \0B\x007@ \0B\x0078 \0B\x0070 \0B\x007\xA4 \0B\x007\x9C \0B\x007\x94 \0\v\0 \0A\fj Ak \0A jN\v-\0 E@ \0( (F\v \0 F@A\v \0( (\xBAE\v\x90\x7F#\0Ak"\b$\0 \b 6\b \b 6\f \bAj" ("6\0 A\xEC\x82G@  (Aj6\v A\x9C\x84+!	@ \b("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v A\x006\0@@  \x07F\r (\0\r@ \bA\fj \bA\bj-\r\0 	 (\0A\0 	(\0(4\0A%F@ Aj \x07F\rA\0!\x7F@ 	 (A\0 	(\0(4\0"A\xC5\0F\r\0A!
 A\xFFqA0F\r\0 \f\v A\bj \x07F\rA\b!
 ! 	 (\bA\0 	(\0(4\0\v! \b \0 \b(\f \b(\b      \0(\0($\v\x006\f  
jAj!\f\v 	A (\0 	(\0(\f\0@@ \x07 Aj"G@ 	A (\0 	(\0(\f\0\r\v\v@ \bA\fj \bA\bj-\r 	A\x7F \b(\f"(\f" (F@  (\0($\0\0\f\v (\0\v 	(\0(\f\0E\r \b(\f6\f\0\v\0\v 	\x7F \b(\f"(\f" (F@  (\0($\0\0\f\v (\0\v 	(\0(\0 	 (\0 	(\0(\0F@ \b(\f6 Aj!\f\v A6\0\f\v\v A6\0\v \bA\fj \bA\bj-@  (\0Ar6\0\v \b(\f \bAj$\0\v\xBC\x7F#\0Ak"\b$\0 \b 6\b \b 6\f \bAj" ("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+!	@ \b("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v A\x006\0@@  \x07F\r (\0\r@ \bA\fj \bA\bj.\r\0 	 ,\0\0A\0 	(\0($\0A%F@ Aj \x07F\rA\0!\x7F@ 	 ,\0A\0 	(\0($\0"A\xC5\0F\r\0A!
 A\xFFqA0F\r\0 \f\v Aj \x07F\rA!
 ! 	 ,\0A\0 	(\0($\0\v! \b \0 \b(\f \b(\b      \0(\0($\v\x006\f  
jAj!\f\v@ ,\0\0"A\0H\r\0 	(\b" Atj-\0\0AqE\r\0@@ \x07 Aj"F@ \x07!\f\v ,\0\0"A\0H\r\0  Atj-\0\0Aq\r\v\v@ \bA\fj \bA\bj.\r\x7F \b(\f"(\f" (F@  (\0($\0\0\f\v -\0\0\v"A\x80q\r 	(\b A\xFF\0qAtj-\0\0AqE\r \b(\f7\f\0\v\0\v 	\x7F \b(\f"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0 	(\0(\f\0 	 ,\0\0 	(\0(\f\0F@ \b(\f7 Aj!\f\v A6\0\f\v\v A6\0\v \bA\fj \bA\bj.@  (\0Ar6\0\v \b(\f \bAj$\0\vd\x7F#\0A k"$\0 \0,\0\vA\0H@ A\x006 B\x007 B\x007\0 A\x006\b \0 \x83\v \0 (\b6\b \0 )\x007\0 A\0:\0\v A\0:\0\0 A j$\0\v\xA8\0@ A\x80\bN@ \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0 A\xFFI@ A\xFF\x07k!\f\v \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0A\xFD  A\xFDO\x1BA\xFEk!\f\v A\x81xJ\r\0 \0D\0\0\0\0\0\0\`\xA2!\0 A\xB8pK@ A\xC9\x07j!\f\v \0D\0\0\0\0\0\0\`\xA2!\0A\xF0h  A\xF0hM\x1BA\x92j!\v \0 A\xFF\x07j\xADB4\x86\xBF\xA2\v]\x7F@  \0( \0(kAj"F\r\0 \0A\fj  k\xA1 \0( Atj" \0("O\r\0 \0( !\0@  \x006\0 Aj" I\r\0\v\v\vB\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(# Aj$\0 \0\v\f\0 \0A\x82\x86\x80 6\0\0\v\xCC\x7F#\0Ak"\x07$\0@ \0E\r\0 (\f!	  kAu"A\0J@ \0   \0(\0(0\0 G\r\v  kAu" 	H@ \x07Aj" 	 k" \x97 \0 \x07(  \x07,\0A\0H\x1B  \0(\0(0\0! )  G\r\v  kAu"A\0J@ \0   \0(\0(0\0 G\r\v A\x006\f \0!\b\v \x07Aj$\0 \b\v\x85\x7F#\0Ak"$\0  6\fA\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\b \0A  (\f\xC7 (\b"\0@A\xF0\xAD(\0 \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v\v Aj$\0\v\xC3\x7F#\0Ak"\x07$\0@ \0E\r\0 (\f!	  k"A\0J@ \0   \0(\0(0\0 G\r\v  k" 	H@ \x07Aj" 	 k" \x9A \0 \x07(  \x07,\0A\0H\x1B  \0(\0(0\0! )  G\r\v  k"A\0J@ \0   \0(\0(0\0 G\r\v A\x006\f \0!\b\v \x07Aj$\0 \b\vr\x7F \0A\xE0\xD86\0 \0(@ \0((!@ @A\0 \0 Ak"At" \0($j(\0 \0(  j(\0\0\f\v\v \0AjJ \0( # \0($# \0(0# \0(<#\v \0\vl\x7F#\0Ak"$\0 A\bj \0\xED@ -\0\bAG\r\0  \0 \0(\0A\fk(\0j(6 Aj \xFA (\r\0 \0 \0(\0A\fk(\0j\xBE\v A\bj\xBD Aj$\0\v%\0 \0  l"\0 \xF4" \0F@ A\0 \x1B\v  n\v\xCA\x7F|#\0Ak"$\0@ \0\xBDB \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\xFB\xC3\xA4\xFFM@ A\x80\x80\xC0\xF2I\r \0D\0\0\0\0\0\0\0\0A\0\x9F!\0\f\v A\x80\x80\xC0\xFF\x07O@ \0 \0\xA1!\0\f\v \0 \x8F! +\b!\0 +\0!@@@@ AqAk\0\v  \0A\x9F!\0\f\v  \0\xA0!\0\f\v  \0A\x9F\x9A!\0\f\v  \0\xA0\x9A!\0\v Aj$\0 \0\v\xC2|\x7F#\0Ak"$\0| \0\xBDB \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\xFB\xC3\xA4\xFFM@D\0\0\0\0\0\0\xF0? A\x9E\xC1\x9A\xF2I\r \0D\0\0\0\0\0\0\0\0\xA0\f\v \0 \0\xA1 A\x80\x80\xC0\xFF\x07O\r\0 \0 \x8F! +\b!\0 +\0!@@@@ AqAk\0\v  \0\xA0\f\v  \0A\x9F\x9A\f\v  \0\xA0\x9A\f\v  \0A\x9F\v Aj$\0\v\xD2\b\x7F@ \0(\b"( (\0"k"Au"Aj"A\x80\x80\x80\x80I@A\xFF\xFF\xFF\xFF (\b k"Au"\x07   \x07I\x1B A\xFC\xFF\xFF\xFF\x07O\x1B"A\x80\x80\x80\x80O\r \0(! At"\x070"\b j" (\x006\0  Atk! @   \xFC
\0\0\v  \x07 \bj6\b  Aj"6  6\0 @ #\v \0(\0 6\0\v\x87\0\v\xCD\0\vB\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(# Aj$\0 \0\v?\x7F@ \0 F\r\0@ \0 Ak"O\r \0-\0\0! \0 -\0\0:\0\0  :\0\0 \0Aj!\0\f\0\v\0\v\v\xDB\x7F~A!@ \0B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 \0 \x84  \x84\x84P@A\0\v  \x83B\0Y@ \0 T  S  Q\x1B@A\x7F\v \0 \x85  \x85\x84B\0R\v \0 V  U  Q\x1B@A\x7F\v \0 \x85  \x85\x84B\0R!\v \v'\x7F#\0Ak"$\0  6\f \0A\xE4\0  \xC7 Aj$\0\vd\x7FA\x7F!@ \0A\x7FF\r\0 ("E@ \xC2 ("E\r\v  (,A\bkM\r\0  Ak"6  \0:\0\0  (\0Aoq6\0 \0A\xFFq!\v \v.\0 \0,\0\vA\0H@ \0(\b \0(\0#\v \0 (\b6\b \0 )\x007\0\vP~@ A\xC0\0q@  A@j\xAD\x88!B\0!\f\v E\r\0 A\xC0\0 k\xAD\x86  \xAD"\x88\x84!  \x88!\v \0 7\0 \0 7\b\v\x89\x7F \0(" \0(\bI\x7F@ A\xAC-6l (p"@A\f  (t$\v A\xAC-6T (X"@A\f  (\\$\v A\xB0\xCC\x006D (H"@A  (L$\v A\x98j" \0(\bI\r\0\v \0( \v#\v\xF3\x7F@ \0(" \0(\fG\r\0 \0 At6\f \0("E\r\0@ (\b" \0(\f (\0(\b\0 (\0"\r\0\v\vA %! \0 \0("Aj6 A\x006\f B\x007 A\x006  6 B\x007 A\x006\0  \0(t"6@ \0(p@  6\0\f\v \0 6p\v \0 6t \0 \0(lAj6l \0(<"@@ (\b"\0  \0(\0(\f\0 (\0"\r\0\v\v \v\xF0\x07\x07\x7F \0A\x9456\0 \0(\`"@@ (\b! \0 \0(hAk6h \0 (\x006\` A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ \0(\`"@ A\x006\f\v \0A\x006d\v (\0@ (!@ ("(\b! ("A\x006\0  ("\x076@ (@ \x07 6\0\f\v  6\v  6  (Aj6  (\fAj6\f (\f! ("A\x006\0  ("\x076@ (@ \x07 6\0\f\v  6\v  6  (Aj6  (\bAj6\b (\0!@ ("@  6\0\f\v  6\v@ @  6\f\v  6\b\v  (\0Ak6\0 A\x006\0  (\x80"6@ (|@  6\0\f\v  6|\v  6\x80  (xAj6x (\0\r\0\v\v A\x006 \r\0\v\v \0("@@ (\b! \0 (\x006 A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ \0("@ A\x006\f\v \0A\x006\v  (\0(\0 \0("\r\0\v\v \0($"@@ (\b! \0 (\x006$ A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ \0($"@ A\x006\f\v \0A\x006(\v  (\0(\0 \0($"\r\0\v\v \0(0"@@ (\b! \0 (\x0060 A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ \0(0"@ A\x006\f\v \0A\x0064\v  (\0(\0 \0(0"\r\0\v\v \0(p"@@ ("@A  ($\v (\0"\r\0\v\v \0(|"@A  \0(\x80$\v \0(p"@A   \0(t$\v \0A\xD056\\ \0(\`"@A\f  \0(d$\v \0A\xEC768 \0(<"@A\f  \0(@$\v \0A\xA476, \0(0"@A\f  \0(4$\v \0A\xE066  \0($"@A\f  \0(($\v \0A\x9C66 \0("@A\f  \0($\v \0\v0\x7F \0 \xDC"\xAD!\0 At"@ \0  \xFC
\0\0\v \0 jA\x006\0\v\xBA\x7F (\0!\x07A\0 \0(\0" \0(A\xCBF"\x1BA\x7FA (\0" k"At  F\x1B A\xFF\xFF\xFF\xFF\x07O\x1B"\bi"@@ E@ \0 6\0\f\v \0(\0! @   \xFC
\0\0\v \0 6\0 E\r\0  \0(\0 \0(\0!\v \0A\xCC6   \x07 kj6\0  \0(\0 \bA|qj6\0\v=\0\vf\x7F~#\0Ak"$\0 \0~ E@B\0\f\v  \xADB\0A\xF0\0 g"AskF )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85A\x9E\x80 k\xADB0\x86|! )\0\v7\0 \0 7\b Aj$\0\vW\x7F~@A\xF4\xAD(\0"\xAD \0\xADB\x07|B\xF8\xFF\xFF\xFF\x83|"B\xFF\xFF\xFF\xFFX@ \xA7"\0?\0AtM\r \0\r\vA\xE8\xE0A06\0A\x7F\vA\xF4\xAD \x006\0 \v\x88\x7F~ \0B\x80\x80\x80\x80Z@@ Ak" \0" \0B
\x80"\0B
~}\xA7A0r:\0\0 B\xFF\xFF\xFF\xFF\x9FV\r\0\v\v \0\xA7! \0B
Z@@ Ak" " A
n"A
lkA0r:\0\0 A\xE3\0K\r\0\v\v @ Ak" A0r:\0\0\v \v}\x7F@@ \0"AqE\r\0 -\0\0E@A\0\v@ Aj"AqE\r -\0\0\r\0\v\f\v@ "Aj!A\x80\x82\x84\b (\0"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xF\r\0\v@ "Aj! -\0\0\r\0\v\v  \0k\v\xEF\x7F\x07|~ \0\xBD"	B0\x88\xA7! 	B\x80\x80\x80\x80\xF0\x95\xA9\xF7?}B\xFF\xFF\xFF\xFF\x9F\x95\x84X@ 	B\x80\x80\x80\x80\x80\x80\x80\xF8?Q@D\0\0\0\0\0\0\0\0\vA\xF0\x94+\0" \0D\0\0\0\0\0\0\xF0\xBF\xA0"\0\xBDB\x80\x80\x80\x80p\x83\xBF"\xA2" \0 \0\xA2" \0A\xB8\x95+\0\xA2A\xB0\x95+\0\xA0\xA2"\xA0"\x07  \xA2"\b \b  \0A\xF8\x95+\0\xA2A\xF0\x95+\0\xA0\xA2 \0A\xE8\x95+\0\xA2A\xE0\x95+\0\xA0\xA0\xA2  \0A\xD8\x95+\0\xA2A\xD0\x95+\0\xA0\xA2 \0A\xC8\x95+\0\xA2A\xC0\x95+\0\xA0\xA0\xA0\xA2 \0 \xA1 \xA2 \0A\xF8\x94+\0\xA2\xA0   \x07\xA1\xA0\xA0\xA0\xA0\v@ A\xF0\xFFkA\x9F\x80~M@ \0D\0\0\0\0\0\0\0\0a@#\0Ak"D\0\0\0\0\0\0\xF0\xBF9\b +\bD\0\0\0\0\0\0\0\0\xA3\v 	B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0Q\r A\xF0\xFFqA\xF0\xFFG A\xFF\xFFMqE@ \0 \0\xA1"\0 \0\xA3\v \0D\0\0\0\0\0\x000C\xA2\xBDB\x80\x80\x80\x80\x80\x80\x80\xA0}!	\v 	B\x80\x80\x80\x80\x80\x80\x80\xF3?}"
B.\x88\xA7A?qAt"+\x88\x96 
B4\x87\xB9\xA0"A\xF0\x94+\0" +\x80\x96 	 
B\x80\x80\x80\x80\x80\x80\x80x\x83}\xBF +\x80\x9E\xA1 +\x88\x9E\xA1\xA2"\0\xBDB\x80\x80\x80\x80p\x83\xBF"\xA2"\xA0"\x07 \0 \0\xA2"  \xA2 \0A\xA8\x95+\0\xA2A\xA0\x95+\0\xA0\xA2  \0A\x98\x95+\0\xA2A\x90\x95+\0\xA0\xA2 \0A\x88\x95+\0\xA2A\x80\x95+\0\xA0\xA0\xA0\xA2 \0 \xA1 \xA2A\xF8\x94+\0 \0\xA2\xA0   \x07\xA1\xA0\xA0\xA0\xA0!\0\v \0\v\xA0
\x07|\x7F#\0A k"
$\0@ +\0" +\0"A\xC8\xC7+\0"\xA0c   \xA1dqE@ +\b!\f\v +\b"  +\b"\x07\xA0cE\r\0  \x07 \xA1dE\r\0 
 9 
 9#\0Ak"$\0 
B\x007\b 
B\x007\0@ D\x9A\x99\x99\x99\x99\x99\xB9?\xA0 
+"\xA1"  D\x9A\x99\x99\x99\x99\x99\xB9\xBF\xA0\xA1"\x07  \x07c\x1B" D\x9A\x99\x99\x99\x99\x99\xB9?\xA0 
+"\b\xA1" \b D\x9A\x99\x99\x99\x99\x99\xB9\xBF\xA0\xA1"  c\x1B"\b  \bc\x1B"D\0\0\0\0\0\0\0\0d@ D\x9A\x99\x99\x99\x99\x99\xB9?\xA2!	@AA\x80\x94\xEB\xDC:!\f AA\x80\x94\xEB\xDC:Aj\xB7D\0\0\0e\xCD\xCDA\xA3D\0\0\0\0\0\0\xE0\xBF\xA0" \xA0\xA2D\x9A\x99\x99\x99\x99\x99\xB9?\xA2 
+"\xA0!@ 
+"A\xC8\xC7+\0"\x07   \fAj\xB7D\0\0\0e\xCD\xCDA\xA3D\0\0\0\0\0\0\xE0\xBF\xA0"\b \b\xA0\xA2D\x9A\x99\x99\x99\x99\x99\xB9?\xA2\xA0"\b\xA0cE\r\0  \b \x07\xA1dE\r\0  \x07 \xA0cE\r\0   \x07\xA1d\r\v  \b\xA1" \xA2  \xA1" \xA2\xA0\x9F 	f\r\0\v 
 9\b 
 \b9\0\f\v D\0\0\0\0\0\0\0\0a@D\0\0\0\0\0\0\0\0!@ D\0\0\0\0\0\0\0\0d@ \x9A!\f\v D\0\0\0\0\0\0\0\0dE\r\0 !\vD\0\0\0\0\0\0\0\0!@ \x07D\0\0\0\0\0\0\0\0d@ \x07\x9A!\f\v D\0\0\0\0\0\0\0\0dE\r\0 !\v D\0\0\0\0\0\0\0\0a D\0\0\0\0\0\0\0\0aqE@@@AA\x80\x94\xEB\xDC:!\f AA\x80\x94\xEB\xDC:Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA2D\x9A\x99\x99\x99\x99\x99\xB9?\xA2 
+"\x07\xA0! 
+"\b \b  \fAj\xB7D\0\0\0e\xCD\xCDA\xA3\xA2D\x9A\x99\x99\x99\x99\x99\xB9?\xA2\xA0"	A\xC8\xC7+\0"\xA0cE\r\0 \b 	 \xA1dE\r\0 \x07  \xA0cE\r\0 \x07  \xA1d\r\v\v 
 9\b 
 	9\0\f\v A\bj"\rA\x98\xF8A\xA7\vA$8"\f \f(\0A\fk(\0j("\v6\0 \vA\xEC\x82G@ \v \v(Aj6\v \rA\xA4\x84+"\vA
 \v(\0(\0!\v \rJ \f \vy \f&\f\vA\x98\xF8A\xB0A\xC3\08 A\fj"\rA\x98\xF8A\xC9	A8"\f \f(\0A\fk(\0j("\v6\0 \vA\xEC\x82G@ \v \v(Aj6\v \rA\xA4\x84+"\vA
 \v(\0(\0!\v \rJ \f \vy \f&\v Aj$\0  
+\0"9\0  
+\b"9\b +\0!\vD\xFE\x94\xC6G0J\xC5V! \0|@|  \xA1" \xA2 +\b \xA1" \xA2\xA0\x9F"D\xFE\x94\xC6G0J\xC5Vd@D\xF2ys?\x90\f)!D\0\0\0\0\0\0\xF0?\f\v D\xF2ys?\x90\f)cE\rD\0\0\0\0\0\0\0\0\v!  AA\x80\x94\xEB\xDC:Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA0"\x9A A\0A:\x1B\xA2!  AA\x80\x94\xEB\xDC:Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA0"\x9A A\0A:\x1B\xA2\f\v D\0\0\0\0\0\0\xF0? \xA3 \xA3"\xA2!  \xA2\v9\b \0 9\0 
A j$\0\vU\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(# \0A\xD0\xD9(\x006\0A\xD0\xD9 \x006\0 Aj$\0\vv\0 \0B\x007X \0A\x006P \0A\xE0\xCC\x006D \0B\x007H \0B\x007p \0A\x006\` \0A\xAC,6T \0A\x006x \0A\xAC,6l \0B\x007\0 \0B\x007\b \0B\x007 \0B\x007 \0B\x007  \0A\x006( \0\x99 \0\v\x8D\x7FA%"A\x006\f B\x007 A\x006  6 A\x006\0  ("6@ (@  6\0\f\v  6\v  6  (Aj6  (\fAj6\fA%"A\x006\f B\x007 A\x006  6 A\x006\0  ("6@ (@  6\0\f\v  6\v  6  (Aj6  (\bAj6\b  6\b  6\b  \0    \x8D"\x006\f  \x006\f \0\v\x9C\0 \0B\x007\` \0A\xEC768 \0B\x0070 \0A\xA476, \0B\x007$ \0A\xE066  \0B\x007 \0A\x9C66 \0A\x9456\0 \0B\x007< \0B\x007D \0B\x007L \0B\x007T \0A\xB086\\ \0B\x007 \0A\x006\x80 \0B\x007x \0B\x007p \0B\x007h \0B\x90\x80\x80\x80\x807\f \0\v\xF9\x07\x7F}#\0Ak"\b$\0 (\0! \b (\0"	6\f \bA\fjAS! \0\x7F@ ("E\r\0 (\0\x7F Ak q i"\x07AM\r\0   K\r\0  p\v"Atj(\0"E\r\0 (\0"E\r\0 \x07AM@ Ak!\x07@@  ("
G@ \x07 
q G\r\f\v (\b 	G\r\0A\0\f\v (\0"\r\0\v\f\v@@  ("\x07G@  \x07M\x7F \x07 p \x07\v G\r\f\v (\b 	G\r\0A\0\f\v (\0"\r\0\v\vA0" 6 A\x006\0 (\0(\0! A\x006 B\x007\f  6\b@ (\fAj\xB3"\v *"\f \xB3\x94^E\r\0A!@  AkqA\0G AIr Atr" \v \f\x95\x8D\xFC"\x07  \x07K\x1B"AF\r\0  AkqE@ !\f\v \xC4! (!\v@  O@  M\r (\f\xB3 *\x95\x8D\xFC!  \x7F@ AI\r\0 iAK\r\0 AA  Akgkt AI\x1B\f\v \xC4\v"  I\x1B"M\r\v  \xA5\v (" Ak"qE@  q!\f\v  K@ !\f\v  p!\v@ (\0" Atj"(\0"E@  (\b6\0  6\b  A\bj6\0 (\0"E\r (!@  Ak"qE@  q!\f\v  K\r\0  p!\v  Atj 6\0\f\v  (\x006\0  6\0\v  (\fAj6\fA\v:\0 \0 6\0 \bAj$\0\v\v\0  6\0A\vd\x7F#\0A k"$\0 \0,\0\vA\0H@ A\x006 B\x007 B\x007\0 A\x006\b \0 \x83\v \0 (\b6\b \0 )\x007\0 A\0:\0\v A\x006\0 A j$\0\v1\x7F#\0Ak"$\0  6\f \0 \0A\xE8\0j A\fj\xDE Aj$\0 \0kAu\v\x8F\x7F#\0Ak"$\0 A\fj" \0("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\x9C\x84+"\0A\xB0\xE5A\xCA\xE5  \0(\0(0\b\0@ (\f"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v Aj$\0 \v\x95\x7F \0A\xFFq"A\xB0\xE5-\0\0F A\xB1\xE5-\0\0FAtr A\xB3\xE5-\0\0FAt A\xB2\xE5-\0\0FAtrr A\xB5\xE5-\0\0FAt A\xB4\xE5-\0\0Fr A\xB7\xE5-\0\0FAt A\xB6\xE5-\0\0FAtrrAtr A\xBD\xE5-\0\0FAt A\xBC\xE5-\0\0Fr A\xBF\xE5-\0\0FAt A\xBE\xE5-\0\0FAtrrA\ft A\xB9\xE5-\0\0FAt A\xB8\xE5-\0\0Fr A\xBB\xE5-\0\0FAt A\xBA\xE5-\0\0FAtrrA\btrr A\xC1\xE5-\0\0FAt A\xC0\xE5-\0\0Fr A\xC3\xE5-\0\0FAt A\xC2\xE5-\0\0FAtrr A\xC5\xE5-\0\0FAt A\xC4\xE5-\0\0Fr A\xC7\xE5-\0\0FAt A\xC6\xE5-\0\0FAtrrAtr \0E"\0 \0Atr"\0 \0At"\0rA\ft A\xC9\xE5-\0\0FAt A\xC8\xE5-\0\0Fr \0rA\btrrAtrA\x80\x80\x80 rh\v\xBB\x7F A\xC0\xF6 \x1B"(\0!@\x7F@ E@ \rA\0\vA~ E\r@ @ !\f\v -\0\0"\xC0"A\0N@ \0@ \0 6\0\v A\0G\vA\xF0\xAD(\0(\0E@A \0E\r \0 A\xFF\xBFq6\0A\v A\xC2k"A2K\r At(\x80\xDA! Ak"E\r Aj!\v -\0\0"Av"\x07Ak Au \x07jrA\x07K\r\0@ Ak! A\xFFqA\x80k Atr"A\0N@ A\x006\0 \0@ \0 6\0\v  k\v E\r Aj",\0\0"A@H\r\0\v\v A\x006\0A\xE8\xE0A6\0A\x7F\v\v  6\0A~\v\xA2\x7F\x7F@ \0(L"A\0N@ E\rA\x84\xE1(\0 A\xFF\xFF\xFF\xFFqG\r\v \0(" \0(\bG@ \0 Aj6 -\0\0\f\v \0\xBB\f\v \0 \0(L"A\xFF\xFF\xFF\xFF \x1B6L\x7F \0(" \0(\bG@ \0 Aj6 -\0\0\f\v \0\xBB\v \0(L \0A\x006L\v\v+\x7F \0 \x8D"\0\xBC! \0@   \0\xFC
\0\0\v \0 jA\0:\0\0\v	\0A\xA1\xB4\0\v\xD7\x7F|~ \0\xBD"\bB0\x88\xA7! \bB\x80\x80\x80\x80\x80\x80\x80\xF7?}B\xFF\xFF\xFF\xFF\xFF\x9F\xC2X@ \bB\x80\x80\x80\x80\x80\x80\x80\xF8?Q@D\0\0\0\0\0\0\0\0\v \0D\0\0\0\0\0\0\xF0\xBF\xA0"\0 \0 \0D\0\0\0\0\0\0\xA0A\xA2"\xA0 \xA1" \xA2A\xB8\xA6+\0"\xA2"\xA0"\x07 \0 \0 \0\xA2"\xA2"   A\x88\xA7+\0\xA2 A\x80\xA7+\0\xA2 \0A\xF8\xA6+\0\xA2A\xF0\xA6+\0\xA0\xA0\xA0\xA2 A\xE8\xA6+\0\xA2 \0A\xE0\xA6+\0\xA2A\xD8\xA6+\0\xA0\xA0\xA0\xA2 A\xD0\xA6+\0\xA2 \0A\xC8\xA6+\0\xA2A\xC0\xA6+\0\xA0\xA0\xA0\xA2 \0 \xA1 \xA2 \0 \xA0\xA2  \0 \x07\xA1\xA0\xA0\xA0\xA0\v@ A\xF0\xFFkA\x9F\x80~M@ \0D\0\0\0\0\0\0\0\0a@#\0Ak"D\0\0\0\0\0\0\xF0\xBF9\b +\bD\0\0\0\0\0\0\0\0\xA3\v \bB\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0Q\r A\xF0\xFFqA\xF0\xFFG A\xFF\xFFMqE@ \0 \0\xA1"\0 \0\xA3\v \0D\0\0\0\0\0\x000C\xA2\xBDB\x80\x80\x80\x80\x80\x80\x80\xA0}!\b\v \bB\x80\x80\x80\x80\x80\x80\x80\xF3?}"	B4\x87\xB9"A\x80\xA6+\0\xA2 	B-\x88\xA7A\xFF\0qAt"+\x98\xA7\xA0" +\x90\xA7 \b 	B\x80\x80\x80\x80\x80\x80\x80x\x83}\xBF +\x90\xB7\xA1 +\x98\xB7\xA1\xA2"\0\xA0" \0 \0 \0\xA2"\xA2  \0A\xB0\xA6+\0\xA2A\xA8\xA6+\0\xA0\xA2 \0A\xA0\xA6+\0\xA2A\x98\xA6+\0\xA0\xA0\xA2 A\x90\xA6+\0\xA2 A\x88\xA6+\0\xA2 \0  \xA1\xA0\xA0\xA0\xA0\xA0!\0\v \0\v\x99| \0 \0\xA2"  \xA2\xA2 D|\xD5\xCFZ:\xD9\xE5=\xA2D\xEB\x9C+\x8A\xE6\xE5Z\xBE\xA0\xA2  D}\xFE\xB1W\xE3\xC7>\xA2D\xD5a\xC1\xA0*\xBF\xA0\xA2D\xA6\xF8\x81?\xA0\xA0! \0 \xA2! E@   \xA2DIUUUUU\xC5\xBF\xA0\xA2 \0\xA0\v \0  D\0\0\0\0\0\0\xE0?\xA2  \xA2\xA1\xA2 \xA1 DIUUUUU\xC5?\xA2\xA0\xA1\v\x92|D\0\0\0\0\0\0\xF0? \0 \0\xA2"D\0\0\0\0\0\0\xE0?\xA2"\xA1"D\0\0\0\0\0\0\xF0? \xA1 \xA1    D\x90\xCB\xA0\xFA>\xA2DwQ\xC1l\xC1V\xBF\xA0\xA2DLUUUUU\xA5?\xA0\xA2  \xA2" \xA2  D\xD48\x88\xBE\xE9\xFA\xA8\xBD\xA2D\xC4\xB1\xB4\xBD\x9E\xEE!>\xA0\xA2D\xADR\x9C\x80O~\x92\xBE\xA0\xA2\xA0\xA2 \0 \xA2\xA1\xA0\xA0\v\xFB\x7F@@ ("(\x9C"\r\0 (\xA0\r\0 (\xA4\r\0 (\xA8\r (L"E\r@ (\b!  (TAk6T  (\x006L A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ (L"@ A\x006\f\v A\x006P\v  (TAj6TA\f%! (P!  6\b  6 A\x006\0@ (L@  6\0\f\v  6L\v  6P ("(L"\r\0\v\f\v E\r\0  6 \0  \xA1 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v@ (\xA0"E\r\0  6 \0  \xA1 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v@ (\xA4"E\r\0  6 \0  \xA1 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v (\xA8"@  6 \0  \xA1 ((\x98"\0@  \x006\vA\x98\xF8A\xEE
A'8\v\v\x97\r\x7F@@ ("(\x9C"E\r\0 ((\r\0  T A\x006\x9C\v@ (\xA0"E\r\0 ((\r\0  T A\x006\xA0\v@ (\xA4"E\r\0 ((\r\0  T A\x006\xA4\v@ (\xA8"E\r\0 ((\r\0  T A\x006\xA8\v  6#\0Ak"	$\0 ("(\xA8! (\xA4! (\x9C!\x07@@@ (\xA0"\b\r\0 \x07E\r\0 \r\0 \r\0@ (\0 F@  \x076\0\f\v \x07 (\x98"6\x98  (\x9CF@  \x076\x9C\f\v  (\xA0F@  \x076\xA0\f\v  (\xA4F@  \x076\xA4\f\v  (\xA8F@  \x076\xA8\f\v 	A\bj"\bA\x98\xF8A\xB2A18" (\0A\fk(\0j("6\0 A\xEC\x82G@  (Aj6\v \bA\xA4\x84+"A
 (\0(\0! \bJ  y &\v  \x076\f\v@ \x07\r\0 \bE\r\0 \r\0 \r\0@ (\0 F@  \b6\0\f\v \b (\x98"6\x98  (\x9CF@  \b6\x9C\f\v  (\xA0F@  \b6\xA0\f\v  (\xA4F@  \b6\xA4\f\v  (\xA8F@  \b6\xA8\f\v 	A\fj"\x07A\x98\xF8A\xB2A18" (\0A\fk(\0j("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+"A
 (\0(\0! \x07J  y &\v  \b6\f\v@ \x07 \br"\b\r\0 E\r\0 \r\0@ (\0 F@  6\0\f\v  (\x98"6\x98  (\x9CF@  6\x9C\f\v  (\xA0F@  6\xA0\f\v  (\xA4F@  6\xA4\f\v  (\xA8F@  6\xA8\f\vA\x98\xF8A\xB2A18\x9D\v  6\f\vA\0!\x07 E\r  \br\r@ (\0 F@  6\0\f\v  (\x98"6\x98  (\x9CF@  6\x9C\f\v  (\xA0F@  6\xA0\f\v  (\xA4F@  6\xA4\f\v  (\xA8F@  6\xA8\f\vA\x98\xF8A\xB2A18\x9D\v  6\v \x92#A!\x07\v 	Aj$\0 \x07\r\0\v@@ ("(\x9C\r\0 (\xA0\r\0 (\xA4\r\0 (\xA8E\r\v (( \0(0J\r\0 \0  \xA1 (\x9C"@  T A\x006\x9C\v (\xA0"@  T A\x006\xA0\v (\xA4"@  T A\x006\xA4\v (\xA8"E\r\0  T A\x006\xA8\v@@@ ("(\x9C"\r\0 (\xA0\r\0 (\xA4\r\0 (\xA8\r (( \0(0J@  (\fAj6\fA\f%!\0 (\b! \0 6\b \0 6 \0A\x006\0 (@  \x006\0  \x006\b\v  \x006  \x006\b\v (( \0(0J\r \0  \x9E\v E\r\0  6 \0   \xA2 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v@ (\xA0"E\r\0  6 \0   \xA2 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v@ (\xA4"E\r\0  6 \0   \xA2 ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v (\xA8"E\r\0  6 \0   \xA2 ((\x98"\0@  \x006\vA\x98\xF8A\xEE
A'8\v\v\xAD\x7F ("(\xA0!@@@ (\x9C"\r\0 \r\0 (\xA4\r\0 (\xA8E\r A\x006(\f\v A\x006( @  6 \0 \xA3@ ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v  (( (\x9C((j6( (\xA0!\v E\r\0  6 \0 \xA3@ ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v  (( (\xA0((j6(\v (\xA4"@  6 \0 \xA3@ ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v  (( (\xA4((j6(\v (\xA8"E\r\0  6 \0 \xA3@ ((\x98"@  6\f\vA\x98\xF8A\xEE
A'8 (!\v  (( (\xA8((j6(\v\v\xE1\x7F|#\0Ak"
$\0@  J@A\xB00k!\x07 ("\b+!\v \b(\0!	 \b+!\f \b+\b!\r \x07 \b6\x98 \x07 \r9\b \x07 \fD\0\0\0\0\0\0\xE0?\xA2"\f9 \x07 	Aj6\0 \x07 \v \f\xA09 \b \x076\x9CA\xB00k!\x07 ("\b+\b!\f \b+!\r \b(\0!	 \b+!\v \x07 \b6\x98 \x07 \vD\0\0\0\0\0\0\xE0?\xA2"\v9 \x07 	Aj6\0 \x07 \r \v\xA09 \x07 \f \v\xA09\b \b \x076\xA0A\xB00k!\x07 ("\b(\0!	 \b+\b!\v \x07 \b+9 \x07 \v9\b \x07 	Aj6\0 \b+!\v \x07 \b6\x98 \x07 \vD\0\0\0\0\0\0\xE0?\xA29 \b \x076\xA4A\xB00k!\x07 ("\b+\b!\v \b(\0!	 \b+!\f \b+!\r \x07 \b6\x98 \x07 \r9 \x07 \fD\0\0\0\0\0\0\xE0?\xA2"\f9 \x07 	Aj6\0 \x07 \v \f\xA09\b \b \x076\xA8  ((\x9C6 \0    Aj" At" At"Ar"\x07\xA4  ((\x98"\b\x7F \bA\x98\xF8A\xEE
A'8 (\v(\xA06 \0     Ar"\b \x07\xA4  ((\x98"\x07\x7F \x07A\x98\xF8A\xEE
A'8 (\v(\xA46 \0      \xA4  ((\x98"\x7F A\x98\xF8A\xEE
A'8 (\v(\xA86 \0     \b \xA4 ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\f\v  F@ (\0 (  (klAtj Atj (6\0\f\v 
A\fj"A\x98\xF8A\xABA68"\0 \0(\0A\fk(\0j("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+"A
 (\0(\0! J \0 y \0&\v 
Aj$\0\v\xB9\x7F#\0Ak"$\0@ \0 F\r\0 (! \0 \0("F@  F@   (\0(\f\0 \0(" (\0(\0 \0A\x006 (" \0 (\0(\f\0 (" (\0(\0 A\x006 \0 \x006   (\0(\f\0  (\0(\0  6\f\v   (\0(\f\0 \0(" (\0(\0 \0 (6  6\f\v  F@  \0 (\0(\f\0 (" (\0(\0  \0(6 \0 \x006\f\v \0 6  6\v Aj$\0\v\xAA*\x7F|@@@@\x7F (\x98"
E@ (\x9C"@A\f%" 6\b B\x007\0\v@ (\xA0"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v@ (\xA4"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v  (\xA8"E\rA\f%" 6\b  6 A\x006\0 \r !\f\v 
(l"@@A\f%" \b6 A\x006\0  (\b6\b !\x07 @ \b 6\0 !\x07\v \x07! !\b (\0"\r\0\v\v 
(\\"\r \x07! \v! \rA\0!
A\0!\b\f\vA\0!\b@A\f%" \b6 A\x006\0  (\b6\b ! @ \b 6\0 !\v ! !\b (\0"\r\0\v !\b@ \b(\b!A\f%" 6\b  6 A\x006\0 ! \x07@  6\0 \x07!\v ! !\x07 \b(\0"\b\r\0\vA\f  $\f\v  6\0\vA\0!A\0!\bA\0!
@ (\0! (\b!	 A\xF0\xD8(\x006\0A\xF0\xD8 6\0A\0!\x07 @ A\x006 !\x07\v +\b!!@ +" 	+"\x1Be@  !\xA0!" \x1B \x1B\xA0" 	+"\xA0!   \x1B\xA1!  	+\b"\xA0!  \x1B\xA1!  +"\xA0!\x1B\f\v \x1B 	+"\xA0!  \x1B 	+\b"\xA0!  \xA0" +"\xA0!\x1B  \xA1!  !\xA0!" ! \xA1!!\vA!\x7FA  "f\r\0A " M\r\0A  !e\r\0  !M\v!@ \x1B e\r\0 \x1B M\r\0   f\r\0   M r!\v@ @A\f%" 	6\b  6 A\x006\0 E@ ! \x07! "!\f\v  6\0 ! \x07! !\f\v (\0 	(\0H@A\f%" 	6\b  6 A\x006\0 \vAj!\v E@ ! \x07! "!\f\v  6\0 ! \x07! !\f\v@@@ 	(\x9C"\r\0 	(\xA0\r\0 	(\xA4\r\0 	(\xA8E\r \x07!\f\v E@ \x07!\f\vA\f%" 6\b  \x076 A\x006\0 E@ !\f\v \x07 6\0\v@ 	(\xA0"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v@ 	(\xA4"E@ !\x07\f\vA\f%"\x07 6\b \x07 6 \x07A\x006\0 E@ \x07!\f\v  \x076\0\v 	(\xA8"E@ ! \x07!\f\vA\f%" 6\b  \x076 A\x006\0 E@ !\f\v \x07 6\0 !\f\v@  	\xFD@A\f%" 	6\b  \f6 A\x006\0 \bAj!\b 
E@ "
!\f\f\v \f 6\0 !\f\f\v  	F\r\0@ (\x9C\r\0 (\xA0\r\0 (\xA4\r\0 (\xA8E@A\f%" 	6\b  \r6 A\x006\0 Aj! E@ "!\r\f\v \r 6\0 !\r\f\v (\xA8E\r\vA\f%" 	6\b  6 A\x006\0\x7F E@ ! ! \x07\f\v  6\0 ! \x07\v! !\f\v ! \x07!\v \r\0\v\v (\\"@A\f  (\`$ B\x007\\\v @ !@A\f%" (\`"6 A\x006\0  (\b6\b@ (\\@  6\0\f\v  6\\\v  6\` (\0"\r\0\v\v  \v6d (l"@A\f  (p$ B\x007l\v 
@ 
!@A\f%" (p"6 A\x006\0  (\b6\b@ (l@  6\0\f\v  6l\v  6p (\0"\r\0\v\v  \b6t (|"@A\f  (\x80$ B\x007|\v @ !@A\f%" (\x80"6 A\x006\0  (\b6\b@ (|@  6\0\f\v  6|\v  6\x80 (\0"\r\0\v\v  6\x84 (\x98"@A\0!#\0A k"$\0 +8! +0!\x1B +8! +0! A\fj \0(4U"\v(\0"B\x007\b B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0A!\x07@@ \0(4"A\0J@  \xA1! \x1B \xA1! AG@ Aq A\xFE\xFF\xFF\xFF\x07q!@  \x07Atj"\b  \bAk+\0"\xA2  \bA\bk+\0"\xA2\xA0"\x1B9\b \b  \xA2  \xA2\xA1"9\0 \b  \xA2  \x1B\xA2\xA09 \b  \xA2  \x1B\xA2\xA19 \x07Aj!\x07 Aj" G\r\0\vE\r\v  \x07Atj"  Ak+\0"\xA2  A\bk+\0"\xA2\xA09\b   \xA2  \xA2\xA19\0\f\v A\0H\r\v (D! (D!	 \0(T!\bA\0!@D\0\0\0\0\0\0\0\0! At!\x07 !D\0\0\0\0\0\0\0\0!@  \b Atj(\0 \x07j+\0" 	 Atj"+\b\xA2"   kAtj"+\0"\x1B\xA2  +\0\xA2" +\b"\xA2\xA0\xA0!   \x1B\xA2  \xA2\xA1\xA0!  F Aj!E\r\0\v  Atj"  +\0\xA09\0   +\b\xA09\b  F Aj!E\r\0\v\v \v(# A j$\0\v @ !@ +0 (\b"+0\xA1"DH\xAF\xBC\x9A\xF2\xD7z>\xA0  +8 +8\xA1"\x1BD\0\0\0\0\0\0\0\0a\x1B  D\0\0\0\0\0\0\0\0e\x1B" \x1B\xF9! (@"\v+\0! \x1B ]! \v+\b" \x9E"\xA2  \xA2\xA0!#  \xA2  \xA2\xA1!$A!@ \0(4"	A\0J@ \x1B! !@ \x1B \xA2!" #  \v Atj"+\b" \xA2  +\0"\xA2\xA1  \xA2  \xA2\xA0"\xA3\xA0!# $  \xA2   \xA2\xA0 \xA3\xA0!$ 	 F Aj! \x1B \xA2  \xA2\xA0!  \xA2 "\xA1!E\r\0\v (D" $ +\0\xA09\0  # +\b\xA09\b \0(T!\bA! \x1B! !@D\0\0\0\0\0\0\0\0!#  \xB8"\xA2"! \v+\0""D\0\0\0\0\0\0\0\0\xA2D\0\0\0\0\0\0\xF0?D\0\0\0\0\0\0\xF0\xBF Aq"\x1B" \v+\b"\xA2\xA0" \xA2  \xA2"  "\xA2 D\0\0\0\0\0\0\0\0\xA2\xA1"\xA2\xA1 ! !\xA2  \xA2\xA0"\xA3!& ! \xA2   \xA2\xA0 \xA3!! \x1B \xA2  \xA2\xA0  \xA2 \x1B \xA2\xA1! D\0\0\0\0\0\0\0\0\xA2 D\0\0\0\0\0\0\xF0\xBFD\0\0\0\0\0\0\xF0? \x1B""\xA2\xA1  \xA2  \xA2\xA0" \xA3!' D\0\0\0\0\0\0\0\0\xA2  "\xA2\xA0  \xA3!% Aj \b Atj!\x07A! \x1B! !D\0\0\0\0\0\0\0\0!$@ #  \x07 AtjAk(\0 AtjA\bk+\0"  \v Atj"+\b\xA2"\xA2    +\0\xA2""\xA2\xA1  \xA2  \xA2\xA0" \xA3\xA0!# $  "\xA2  \xA2\xA0  \xA3\xA0!$ \x1B \xA2  \xA2 \x1B \xA2\xA1! 	 F! Aj!  \xA2\xA0! E\r\0\v  Atj" ! % $\xA2 ' #\xA2\xA1\xA0 +\0\xA09\0  & ' $\xA2 % #\xA2\xA0\xA0 +\b\xA09\b  	F!!! ! E\r\0\v\f\v (D" $ +\0\xA09\0  # +\b\xA09\b\v (\0"\r\0\v\v @ !@A\0!A\0!\x07 (\b(L"\b@ +8! +0!\x1B@A\f%" \x076 A\x006\0  \b(\b6\b ! @ \x07 6\0 !\v ! !\x07 \b(\0"\b\r\0\v (\f! (D"\v+\b!& \v+\0!!@ \0(4"	A\0L@ !\b@   \b(\b(A\x98lj"+\b\xA1" \x1B +\0\xA1"DH\xAF\xBC\x9A\xF2\xD7z>\xA0  D\0\0\0\0\0\0\0\0a\x1B  D\0\0\0\0\0\0\0\0e\x1B"] &\xA0!&  \xF9\x9E !\xA0!! \b(\0"\b\r\0\v\f\v@A!\b   (\b(A\x98lj"+\b\xA1"!" \x1B +\0\xA1"%! @ \v \bAtj" " \b\xB8"\xA2"D\0\0\0\0\0\0\0\0\xA2   \xA2"D\0\0\0\0\0\0\xF0?D\0\0\0\0\0\0\xF0\xBF \bAq\x1B"\xA2\xA0  \xA2  \xA2\xA0"\xA3 +\0\xA09\0  D\0\0\0\0\0\0\0\0\xA2  \xA2\xA1 \xA3 +\b\xA09\b   \xA2 %  \xA2  "\xA2\xA1!  \b 	F! \bAj!\b % "\xA2\xA0!" E\r\0\v  %DH\xAF\xBC\x9A\xF2\xD7z>\xA0 % D\0\0\0\0\0\0\0\0a\x1B % %D\0\0\0\0\0\0\0\0e\x1B"] &\xA0!&  \xF9\x9E !\xA0!! (\0"\r\0\v\v \v &9\b \v !9\0A\f  \x07$\v (\0"\r\0\v\v (\xA0!@\x7F@@@ (\x9C"\r\0 \r\0 (\xA4\r\0 (\xA8\r 
\r \f\f\v @ \0  \xA6 (\xA0!\v E\r\0 \0  \xA6\v (\xA4"@ \0  \xA6\v (\xA8"E\r \0  \xA6\f\vA\f 
 \f$A\0\v!A\0!@ (l"E@A\0!
 !\f\f\v@A\f%"\f 6 \fA\x006\0 \f (\b6\b \f!
 @  
6\0 !
\v 
! \f! (\0"\r\0\v\v (t! \x7FA\f  \r$A\0 \r\v!A\0!\b@ (|"E@A\0! !\r\f\vA\0!@A\f%"\r 6 \rA\x006\0 \r (\b6\b \r! @  6\0 !\v ! \r! (\0"\r\0\v\v (\x84!\v@ E@A\0!\0A\0!\x07\f\vA\0!\x07A\0!\0@ (\0! (\b!	 A\xF0\xD8(\x006\0A\xF0\xD8 6\0A\0! @ A\x006 !\v\x7F@@ 	(\x9C\r\0 	(\xA0\r\0 	(\xA4\r\0 	(\xA8\r\0  	\xFDA\f%"A\x006\0@  	6\b  \f6 Aj! 
E@ "
!\f\f\v \f 6\0 !\f\f\v  	6\b  \r6 \vAj!\v E@ "!\r\f\v \r 6\0 !\r\f\v  	\xFD@@ 	(\x9C"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v@ 	(\xA0"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v@ 	(\xA4"E@ !\f\vA\f%" 6\b  6 A\x006\0 E@ !\f\v  6\0\v 	(\xA8"E@ ! \f\vA\f%" 6\b  6 A\x006\0  E\r  6\0 \f\vA\f%" 	6\b  \x076 A\x006\0 \bAj!\b@ \0E@ !\0\f\v \x07 6\0\v !\x07\v ! \v"\r\0\v\v (l"@A\f  (p$ B\x007l\v 
@ 
!@A\f%" (p"6 A\x006\0  (\b6\b@ (l@  6\0\f\v  6l\v  6p (\0"\r\0\v\v  6t (|"@A\f  (\x80$ B\x007|\v @ !@A\f%" (\x80"6 A\x006\0  (\b6\b@ (|@  6\0\f\v  6|\v  6\x80 (\0"\r\0\v\v  \v6\x84 (\x8C"@A\f  (\x90$ B\x007\x8C\v@ \0E@  \b6\x94\f\v \0!@A\f%" (\x90"6 A\x006\0  (\b6\b@ (\x8C@  6\0\f\v  6\x8C\v  6\x90 (\0"\r\0\v  \b6\x94A\f \0 \x07$\vA\0!\v @A\f  \r$\v 
@A\f 
 \f$\v @A\f  $\v @A\f  $\v @A\f  $\v\v\x83
\x7F\x07| (!\b#\0A k"\f$\0 \fA\fj \0"(4U!	@ \0(4"\0A\0H\r\0 \0AtAj"E\r\0 	(\0A\0 \xFC\v\0\vA\x7F!A\x7F \0Aj"At A\xFF\xFF\xFF\xFF\0K\x1B0!\x07@ E@ \b \x076@\f\v \0AtAj"@ \x07A\0 \xFC\v\0\v \b \x076@ \0A\0H@ \0!\f\v@@ \0E@A\0!\f\v A\xFE\xFF\xFF\xFF\x07q!\vA\0!A\0!\x07@ At" \b(@j"
 	(\0 j"\r)\b7\b 
 \r)\x007\0 Ar" \b(@j"
 	(\0 j")\b7\b 
 )\x007\0 Aj! \x07Aj"\x07 \vG\r\0\v \0Aq\r\v At"\0 \b(@j" 	(\0 \0j"\0)\b7\b  \0)\x007\0\v (4!\vA\x7F Aj"\0At \0A\xFF\xFF\xFF\xFF\0K\x1B0!@ \0E@ \b 6D\f\v AtAj"\x07@ A\0 \x07\xFC\v\0\v \b 6D A\0H\r\0@ E@A\0!\f\v \0A\xFE\xFF\xFF\xFF\x07q!\vA\0!A\0!\x07@ At"\0 \b(Dj"
 	(\0 \0j"\r)\b7\b 
 \r)\x007\0 \0Ar"\0 \b(Dj"
 	(\0 \0j"\0)\b7\b 
 \0)\x007\0 Aj! \x07Aj"\x07 \vG\r\0\v Aq\r\v At"\0 \b(Dj" 	(\0 \0j"\0)\b7\b  \0)\x007\0\v 	(# \fA j$\0 ("\0+! \0+\b! \0+!AA\x80\x94\xEB\xDC:! \0  D\0\0\0\0\0\0\xE0?\xA2"\xA090 \0 D\xFC\xA9\xF1\xD2MbP?\xA2 Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA2  \xA0\xA098@@ ("\0(\x9C"\r\0 \0(\xA0\r\0 \0(\xA4\r\0 \0(\xA8\r  (\fAj6\fA\f%! (\b!  \x006\b  6 A\x006\0@ (@  6\0\f\v  6\v  6\b ! (!\bA\0!A\0!A\0!\0A\0!A\0!\f#\0A k"\v$\0 \b+8! \b+0! \vA\fj (4U!	 \b(L"@@A\f%" 6 A\x006\0  (\b6\b !\0 @  \x006\0 !\0\v \0! ! (\0"\r\0\v\v \b(T! 	(\0"\x07B\x007\b \x07 \xB79\0@@ (4"A\0L\x7F \0E At"@ \x07AjA\0 \xFC\v\0\v \0E@A!\f\v (\f! \0!@A!  (\b(A\x98lj"+\b \xA1"! +\0 \xA1"!@ \x07 Atj" +\0  \xB8"\xA3\xA19\0  +\b  \xA3\xA19\b  \xA2  \xA2  \xA2\xA1!  F! Aj!  \xA2\xA0! E\r\0\v (\0"\r\0\vA\0\v! A\0H\r\v@ E@A\0!\f\v AjA~q!A\0!@ At" \b(@j"\x07 	(\0 j"
)\b7\b \x07 
)\x007\0 Ar" \b(@j"\x07 	(\0 j")\b7\b \x07 )\x007\0 Aj! \fAj"\f G\r\0\v Aq\r\v At" \b(@j" 	(\0 j")\b7\b  )\x007\0\v E@A\f \0 $\v 	(# \vA j$\0\v E\r\0  6    \xA7  (\xC8 ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8 (!\0\v@ \0(\xA0"E\r\0  6    \xA7  (\xC8 ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8 (!\0\v@ \0(\xA4"E\r\0  6    \xA7  (\xC8 ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8 (!\0\v \0(\xA8"\0@  \x006    \xA7  (\xC8 ((\x98"\0@  \x006\vA\x98\xF8A\xEE
A'8\v\v\xD2\x07|\x7F#\0Ak"
$\0 (\f"\f (p"(A\x98lj"\v+\0"! \v+\b"\x07!@ \f (A\x98lj"\v+\b" \x07  \x07d\x1B!\x07    c\x1B! \v+\0"   d\x1B!    c\x1B! (\0"\r\0\v \0 D\0\0\0\0\0\0\xF0\xBF\xA0\x9C"\b9\xB0 \0 D\0\0\0\0\0\0\xF0\xBF\xA0\x9C"	9\xA8 \0  \xA1" \x07 \xA1"  d\x1BD)\\\x8F\xC2\xF5(\xF0?\xA2D\0\0\0\0\0\0\0@\xA0\x9B"9\x98 D\0\0\0\0\0\0\0@e@ \0 (lAl\xB7"9\x98 \0 \x9C D\0\0\0\0\0\0\xE0?\xA2"\xA1"\b9\xB0 \0 \x9C \xA1"	9\xA8\v@@@ \0(\x80\0\0\v \0 \b9\x80 \0 	9\xF8 \0 9\xF0\f\v 
 \b9\b 
 	9\0@\x7F \0A\x88j"-\0AF@  98 A@k"\0 
F\r \0 
+\x009\0 
+\b!A\xC8\0\f\v 
+\b!  
+\x009  9A \v j 9\0\v\v 
Aj$\0\v\x7FA/"\0A\xF8\xCE6\0 \0A\x84\xCFA\xD3\0\0\v\xFF\x7F#\0Ak"$\0A\xF4\xB1-\0\0AqE@AA\xF43A!A\xF4\xB1A:\0\0A\xF0\xB1 6\0\v ("A	O@ \x07\v  6\b A\x006A\xF0\xB1(\0 A\0 Aj A\bj\xFC"(\0"A\xF7\xFF\xFF\xFF\x07I@ (!@ A
M@ \0 :\0\v\f\v A\xF8\xFF\xFF\xFF\x07q"A\bj0! \0 A\xF8\xFF\xFF\xFF\x07k6\b \0 6 \0 6\0 !\0\v @ \0 Aj \xFC
\0\0\v \0 jA\0:\0\0 @ \v Aj$\0\v\x9D\0\vI\x7F \0("A\bu! \0(\0"\0  Aq\x7F (\0 j(\0 \v j A Aq\x1B  \0(\0(
\0\v,\x7F \0 A\xC0\x84=n"At/\xF0\x9A;\0\0 \0Aj  A\xC0\x84=lk\xD5\v_\x7F#\0Ak"$\0 A\xF7\xFF\xFF\xFFI@@ AM@ \0 :\0\v\f\v Aj \xD8 \0 (\f6\b \0 )7\0 \0(\0!\0\v Aj$\0 \0\v=\0\v\0A\v"\0 \0(# \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v\b\0A\xFF\xFF\xFF\xFF\x07\v\0A\xFF\0\v?\x7F@ \0 F\r\0@ \0 Ak"O\r \0(\0! \0 (\x006\0  6\0 \0Aj!\0\f\0\v\0\v\v\xD4	\x7F#\0Ak"	$\0 A\x9C\x84+!
 	Aj A\xE4\x84+" (\0(\0@ 	(\b 	,\0"\x07 \x07A\0H\x1BE@ 
 \0   
(\0(0\b\0    \0kAtj6\0\f\v  6\0@@ \0"\x07-\0\0"\bA+k\0\0\v 
 \b\xC0 
(\0(,\0!\x07  (\0"\bAj6\0 \b \x076\0 \0Aj!\x07\v@  \x07kAH\r\0 \x07-\0\0A0G\r\0 \x07-\0A rA\xF8\0G\r\0 
A0 
(\0(,\0!\b  (\0"\vAj6\0 \v \b6\0 
 \x07,\0 
(\0(,\0!\b  (\0"\vAj6\0 \v \b6\0 \x07Aj!\x07\v \x07 \x7F  (\0(\0\0!A\0!\vA\0!\b \x07!@  M@  \x07 \0kAtj (\0\xB2@ 	("\f 	Aj"\r 	,\0A\0H"\x1B \bj-\0\0E\r\0 \v \f \r \x1B \bj,\0\0G\r\0  (\0"\vAj6\0 \v 6\0A\0!\v \b \b 	(\b 	,\0"\f \fA\0H\x1BAkIj!\b\v 
 ,\0\0 
(\0(,\0!\f  (\0"\rAj6\0 \r \f6\0 Aj! \vAj!\v\f\v\v\v \x7F  F@ (\0\f\v   \0kAtj\v6\0 	Aj) 	Aj$\0\v\xD0\x7F A\x80q@ \0A+:\0\0 \0Aj!\0\v A\x80\bq@ \0A#:\0\0 \0Aj!\0\v A\x84q"A\x84G@ \0A\xAE\xD4\0;\0\0 \0Aj!\0\v A\x80\x80q!@ -\0\0"@ \0 :\0\0 \0Aj!\0 Aj!\f\v\v \0\x7F@ A\x80G@ AG\rA\xC6\0A\xE6\0 \x1B\f\vA\xC5\0A\xE5\0 \x1B\f\vA\xC1\0A\xE1\0 \x1B A\x84F\r\0A\xC7\0A\xE7\0 \x1B\v:\0\0 A\x84G\v\xB4\x7F~@@@@@@ AwAk\b\0\v \0\x7F  k"AL@A= A\xC0\0 B\x84y\xA7kA\xD1	lA\fv"  At)\x80\xA2TkAjH\r\v\x7F B\xFF\xFF\xFF\xFFX@  \xA7\xD7\f\v B\x80\xC8\xAF\xA0%Z@  B\x80\xC8\xAF\xA0%\x80"B\x80\xC8\xAF\xA0%~}!  \xA7\xD7!\v  B\x80\xC2\xD7/\x80"\xA7At/\xF0\x9A;\0\0 Aj  B\x80\xC2\xD7/~}\xA7\xAC\v!A\0\v6\f\v \0A\xC0\0 B\x84y\xA7k"  kJ\x7FA=  j"!\x7F BT\x7F@ Ak" \xA7Aq-\0\xE6:\0\0 B\x88"B\0R\r\0\vA\0 Ak" \xA7AtA<q(\xC0\x9C6\0\0 B\x88!\f\v\v\v6\f\v \0A\xC2\0 B\x84y\xA7kAn"  kJ\x7FA=  j"!\x7F B\xC1\0T\x7F@ Ak" \xA7A\x07q-\0\xDD:\0\0 B\x88"B\0R\r\0\vA\0 Ak" \xA7AtA\xFE\0q/\x80\x9D;\0\0 B\x88!\f\v\v\v6\f\v \0A\xC3\0 B\x84y\xA7kAv"  kJ\x7FA=  j"!\x7F B\x81T\x7F@ Ak" \xA7Aq-\0\xDC:\0\0 B\x88"B\0R\r\0\vA\0 Ak" \xA7AtA\xFEq/\x80\x9E;\0\0 B\b\x88!\f\v\v\v6\f\v\x7F !  l" l\xAD!\b \xAD!	 \xAD!
  l\xAD!\x07A\0!\x7F Ar  	T\r Ar  
T\r Ar  \bT\r  \x07T\x7F Aj Aj!  \x07\x80!\f\v\v\v"  kJ@ \0A=6\f\v \xAC!\x07  j"!@ Ak"   \x07\x80" \x07~}\xA7-\0\xA8\b:\0\0  \x07Z !\r\0\v \0A\x006 \0 6\0\v \0 6\0\v\xCA	\x7F#\0Ak"	$\0 A\xA4\x84+!
 	Aj A\xDC\x84+" (\0(\0@ 	(\b 	,\0"\x07 \x07A\0H\x1BE@ 
 \0   
(\0( \b\0    \0kj6\0\f\v  6\0@@ \0"\x07-\0\0"\bA+k\0\0\v 
 \b\xC0 
(\0(\0!\x07  (\0"\bAj6\0 \b \x07:\0\0 \0Aj!\x07\v@  \x07kAH\r\0 \x07-\0\0A0G\r\0 \x07-\0A rA\xF8\0G\r\0 
A0 
(\0(\0!\b  (\0"\vAj6\0 \v \b:\0\0 
 \x07,\0 
(\0(\0!\b  (\0"\vAj6\0 \v \b:\0\0 \x07Aj!\x07\v \x07 \x7F  (\0(\0\0!A\0!\vA\0!\b \x07!@  M@  \x07 \0kj (\0\x7F@ 	("\f 	Aj"\r 	,\0A\0H"\x1B \bj-\0\0E\r\0 \v \f \r \x1B \bj,\0\0G\r\0  (\0"\vAj6\0 \v :\0\0A\0!\v \b \b 	(\b 	,\0"\f \fA\0H\x1BAkIj!\b\v 
 ,\0\0 
(\0(\0!\f  (\0"\rAj6\0 \r \f:\0\0 Aj! \vAj!\v\f\v\v\v \x7F  F@ (\0\f\v   \0kj\v6\0 	Aj) 	Aj$\0\v\x99\x7F@@@@@@ AwAk\b\0\v \0\x7F  k"A	L@A= A  ArgkA\xD1	lA\fv"  At(\x80\bIkAjH\r\v  \xD7!A\0\v6\f\v \0A  Argk"  kJ\x7FA=  j"!\x7F AI\x7F@ Ak" Aq-\0\xE6:\0\0 Av"\r\0\vA\0 Ak" AtA<q(\xC0\x9C6\0\0 Av!\f\v\v\v6\f\v \0A" ArgkAn"  kJ\x7FA=  j"!\x7F A\xC1\0I\x7F@ Ak" A\x07q-\0\xDD:\0\0 Av"\r\0\vA\0 Ak" AtA\xFE\0q/\x80\x9D;\0\0 Av!\f\v\v\v6\f\v \0A# ArgkAv"  kJ\x7FA=  j"!\x7F A\x81I\x7F@ Ak" Aq-\0\xDC:\0\0 Av"\r\0\vA\0 Ak" AtA\xFEq/\x80\x9E;\0\0 A\bv!\f\v\v\v6\f\v\x7F !  l"\x07 l!	 \x07 \x07l!\b\x7F Ar  K\r Ar  \x07I\r Ar  	I\r  \bI\x7F Aj Aj!  \bn!\f\v\v\v"  kJ@ \0A=6\f\v  j"!@ Ak"   n" lk-\0\xA8\b:\0\0  O !\r\0\v \0A\x006 \0 6\0\v \0 6\0\v\xF3\v\x7F#\0A\xF0\0k"\f$\0 \f 6l \f!	@@@  kA\fm"
A\xE5\0O@ 
'"!	 E\r\v 	!\x07 !@  F@A\0!\b@ \0 \fA\xEC\0j"-A 
\x1B@ \0 -@  (\0Ar6\0\v@  F\r 	-\0\0AF\r\x07 	Aj!	 A\fj!\f\0\v\0\v\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v!\r E@  \r (\0(\0!\r\v \bAj!A\0! 	!\x07 !@  F@ !\b E\r \0e 	!\x07 ! 
 \vjAI\r@  F@\f@ \x07-\0\0AG\r\0 ( ,\0\v" A\0H\x1B \bF\r\0 \x07A\0:\0\0 \vAk!\v\v \x07Aj!\x07 A\fj!\f\v\0\v\0@ \x07-\0\0AG\r\0 \bAt (\0  ,\0\vA\0H\x1Bj(\0!@ \x7F    (\0(\0\v \rF@A! ( ,\0\v" A\0H\x1B G\r \x07A:\0\0 \vAj!\v\f\v \x07A\0:\0\0\v 
Ak!
\v \x07Aj!\x07 A\fj!\f\v\0\v\0\v\0 \x07AA ( ,\0\v"\b \bA\0H\x1B"\b\x1B:\0\0 \x07Aj!\x07 A\fj! \v \bE"\bj!\v 
 \bk!
\f\v\0\v\0\v=\0\v  (\0Ar6\0\v # \fA\xF0\0j$\0 \v\xF1\v\x7F#\0A\xF0\0k"\f$\0 \f 6l \f!	@@@  kA\fm"
A\xE5\0O@ 
'"!	 E\r\v 	!\x07 !@  F@A\0!\b@ \0 \fA\xEC\0j".A 
\x1B@ \0 .@  (\0Ar6\0\v@  F\r 	-\0\0AF\r\x07 	Aj!	 A\fj!\f\0\v\0\v\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0!\r E@  \r (\0(\f\0!\r\v \bAj!A\0! 	!\x07 !@  F@ !\b E\r \0g 	!\x07 ! 
 \vjAI\r@  F@\f@ \x07-\0\0AG\r\0 ( ,\0\v" A\0H\x1B \bF\r\0 \x07A\0:\0\0 \vAk!\v\v \x07Aj!\x07 A\fj!\f\v\0\v\0@ \x07-\0\0AG\r\0 (\0  ,\0\vA\0H\x1B \bj,\0\0!@ \x7F    (\0(\f\0\v \rF@A! ( ,\0\v" A\0H\x1B G\r \x07A:\0\0 \vAj!\v\f\v \x07A\0:\0\0\v 
Ak!
\v \x07Aj!\x07 A\fj!\f\v\0\v\0\v\0 \x07AA ( ,\0\v"\b \bA\0H\x1B"\b\x1B:\0\0 \x07Aj!\x07 A\fj! \v \bE"\bj!\v 
 \bk!
\f\v\0\v\0\v=\0\v  (\0Ar6\0\v # \fA\xF0\0j$\0 \vM\x7F -\0\0!@ \0-\0\0"E\r\0  G\r\0@ -\0! \0-\0"E\r Aj! \0Aj!\0  F\r\0\v\v  k\vA\x7F#\0Ak"$\0A\x7F!@ \0\xC2\r\0 \0 AjA \0( \0AG\r\0 -\0!\v Aj$\0 \v_\x7F#\0Ak"$\0 A\xF7\xFF\xFF\xFF\x07I@@ A
M@ \0 :\0\v\f\v Aj \xEA \0 (\f6\b \0 )7\0 \0(\0!\0\v Aj$\0 \0\v=\0\vq\x7F@ \0("" (\0A\fk(\0j"(E\r\0 (\r\0 -\0A qE\r\0 " (\0A\fk(\0j(" (\0(\0\0A\x7FG\r\0 \0("\0 \0(\0A\fk(\0j\xBE\v\v\0 \0 \0(Ar\xF5\v\x1B\0 \0 \xF4 \0A\0:\0P \0B\x80\x80\x80\x80p7H\v\0A\x7F\v\0\v|\x7F \0 \0(H"Ak r6H \0( \0(G@ \0A\0A\0 \0($\0\v \0A\x006 \0B\x007 \0(\0"Aq@ \0 A r6\0A\x7F\v \0 \0(, \0(0j"6\b \0 6 A\x1BtAu\v\xCB\x7F \0E@A\x98\xB0(\0"\0@ \0\xC3!\vA\xB0\xB1(\0"\0@ \0\xC3 r!\vA\xE8\xE1(\0"\0@@ \0( \0(G@ \0\xC3 r!\v \0(8"\0\r\0\v\v \v@ \0( \0(F\r\0 \0A\0A\0 \0($\0 \0(\r\0A\x7F\v \0(" \0(\b"G@ \0  k\xACA \0((\0\v \0A\x006 \0B\x007 \0B\x007A\0\v\xE4\f	\x7F#\0Ak"$\0  \x006\f@ \0A\xD3M@A\xB0\xCFA\xF0\xD0 A\fj\x86(\0!\0\f\v \0A|O@\xF8\0\v  \0 \0A\xD2n"A\xD2l"\0k6\bA\xF0\xD0A\xB0\xD2 A\bj\x86"(\0 \0j!\0 A\xF0\xD0kAu!\x07@A! !@@@ ! A/F@A\xD3!@ \0 n" I\r \0  lF\r \0 A
j"n" I\r \0  lF\r \0 A\fj"n" I\r \0  lF\r \0 Aj"n" I\r \0  lF\r \0 Aj"n" I\r \0  lF\r \0 Aj"n" I\r \0  lF\r \0 Aj"n" I\r \0  lF\r \0 Aj"n" I\r \0  lF\r \0 A$j"n" I\r \0  lF\r \0 A(j"n" I\r \0  lF\r \0 A*j"n" I\r \0  lF\r \0 A.j"n" I\r \0  lF\r \0 A4j"n" I\r \0  lF\r \0 A:j"n" I\r \0  lF\r \0 A<j"n" I\r \0  lF\r \0 A\xC2\0j"n" I\r \0  lF\r \0 A\xC6\0j"n" I\r \0  lF\r \0 A\xC8\0j"n" I\r \0  lF\r \0 A\xCE\0j"n" I\r \0  lF\r \0 A\xD2\0j"n" I\r \0  lF\r \0 A\xD8\0j"n" I\r \0  lF\r \0 A\xE0\0j"n" I\r \0  lF\r \0 A\xE4\0j"n" I\r \0  lF\r \0 A\xE6\0j"n" I\r \0  lF\r \0 A\xEA\0j"n" I\r \0  lF\r \0 A\xEC\0j"n" I\r \0  lF\r \0 A\xF0\0j"n" I\r \0  lF\r \0 A\xF8\0j"n" I\r \0  lF\r \0 A\xFE\0j"n" I\r \0  lF\r \0 A\x82j"n" I\r \0  lF\r \0 A\x88j"n" I\r \0  lF\r \0 A\x8Aj"n" I\r \0  lF\r \0 A\x8Ej"n" I\r \0  lF\r \0 A\x94j"n" I\r \0  lF\r \0 A\x96j"n" I\r \0  lF\r \0 A\x9Cj"n" I\r \0  lF\r \0 A\xA2j"n" I\r \0  lF\r \0 A\xA6j"n" I\r \0  lF\r \0 A\xA8j"n" I\r \0  lF\r \0 A\xACj"n" I\r \0  lF\r \0 A\xB2j"n" I\r \0  lF\r \0 A\xB4j"n" I\r \0  lF\r \0 A\xBAj"n" I\r \0  lF\r \0 A\xBEj"n" I\r \0  lF\r \0 A\xC0j"n" I\r \0  lF\r \0 A\xC4j"n" I\r \0  lF\r \0 A\xC6j"n" I\r \0  lF\r \0 A\xD0j"n" I\r A\xD2j! \0  lG\r\0\v\f\v \0 At(\xB0\xCF"n" O!\b  l!	  K"E@  \0 \b\x1B! Aj! \0 	G\r\v\v \0 	G\r \r\vA\0 \x07Aj"\0 \0A0F"\0\x1B"\x07At(\xF0\xD0 \0 j"A\xD2lj!\0\f\v\v  \0 \b\x1B!\0\v Aj$\0 \0\v\0 \0E@A\0\v \0 \xC6\v\x89\0@ \0\x7F A\xFF\0M\r@A\xF0\xAD(\0(\0E@ A\x80\x7FqA\x80\xBFF\r\f\v A\xFFM@ \0 A?qA\x80r:\0 \0 AvA\xC0r:\0\0A\v A\x80@qA\x80\xC0G A\x80\xB0OqE@ \0 A?qA\x80r:\0 \0 A\fvA\xE0r:\0\0 \0 AvA?qA\x80r:\0A\v A\x80\x80kA\xFF\xFF?M@ \0 A?qA\x80r:\0 \0 AvA\xF0r:\0\0 \0 AvA?qA\x80r:\0 \0 A\fvA?qA\x80r:\0A\v\vA\xE8\xE0A6\0A\x7FA\v\v \0 :\0\0A\v\x96\x7F#\0A\xA0k"$\0  \0 A\x9Ej \x1B"\x006\x94   A\0Gk6\x98 A\0A\x90\xFC\v\0 A\x7F6L A\xFE6$ A\x7F6P  A\x9Fj6,  A\x94j6T \0A\0:\0\0#\0A\xD0k"$\0  6\xCC A\xA0j"\0A\0A(\xFC\v\0  (\xCC6\xC8A\0  A\xC8j A\xD0\0j \0\x8CA\0H\x7FA\x7F  (\0"A_q6\0\x7F@@ (0E@ A\xD0\x0060 A\x006 B\x007 (,!  6,\f\v (\r\vA\x7F \xF6\r\v   A\xC8j A\xD0\0j A\xA0j\x8C\v! @ A\0A\0 ($\0 A\x0060  6, A\x006 (!\0 B\x007 A\x7F \0\x1B!\v  (\0"\0 A qr6\0A\x7F  \0A q\x1B\v A\xD0j$\0 A\xA0j$\0\v\x89\f\x7F\x07|#\0A k"
$\0 (\x98! 
A\fj \0(4U!\v +8! +0! +8! +0! (@" (@"+\0 +\0\xA09\0  +\b +\b\xA09\b \v(\0"B\x007\b B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0A! \0(4"A\0J@  \xA1!  \xA1!@ AG@ Aq A\xFE\xFF\xFF\xFF\x07q!	@  Atj"  Ak+\0"\xA2  A\bk+\0"\xA2\xA0"9\b   \xA2  \xA2\xA1"9\0   \xA2  \xA2\xA09   \xA2  \xA2\xA19 Aj! \x07Aj"\x07 	G\r\0\vE\r\v  Atj"  Ak+\0"\xA2  A\bk+\0"\xA2\xA09\b   \xA2  \xA2\xA19\0\v Aj! \0(T!\x07A!\0A!@  At"\bj"+\b" +\0"\x9A\xA2 +\b" +\0"\xA2\xA1 \xB8"\xA3!  \xA2  \xA2\xA1 \xA3! \x07 AtjAk(\0!	A!@   Atj"\f+\b"   kAtj"\r+\0"\xA2 \f+\0" \r+\b"\xA2\xA0 	 AtjA\bk+\0"\xA2\xA0!   \xA2  \xA2\xA1 \xA2\xA0! Aj" \0G\r\0\v  \bj"  +\0\xA09\0   +\b\xA09\b Aj! \0 F \0Aj!\0E\r\0\v\v \v(# 
A j$\0\vU\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(# \0A\xD0\xD9(\x006\0A\xD0\xD9 \x006\0 Aj$\0\v\xBB\x7F (\0 \0(\0*! (\0 (\0*!@ E@ E\r (\0!  (\x006\0  6\0 (\0 \0(\0*E\r \0(\0! \0 (\x006\0  6\0\f\v \0(\0! @ \0 (\x006\0  6\0\f\v \0 (\x006\0  6\0 (\0 *E\r\0 (\0!  (\x006\0  6\0\v@ (\0 (\0*E\r\0 (\0!  (\x006\0  6\0 (\0 (\0*E\r\0 (\0!  (\x006\0  6\0 (\0 \0(\0*E\r\0 \0(\0! \0 (\x006\0  6\0\v\v\x8B\x07\x7F#\0A k"$\0 \0( \0(\bG@ A\x006\b A\fj  A\bj"\xB7!\b@@ A\0H\x7F   AjAt"'"\x076\b \x07E\r  \x07j! Aj\v 6\0 \0("E\r@ \x07  A\bj (\0(\b\0At"j!@ \b(\0 j"(\0@  (\0"6  6\0  6\0\f\v  6\0  6\0\v (\0"\r\0\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vA\0! A\0N@ \b(\0!@  	At"j(\0"@@ @  6\0\f\v \0 6\v  6  \x07j(\0!\v  	F 	Aj!	E\r\0\v\v \0 6\b A\x006\0 (\b# \b(#\v A j$\0\v\xC3\x7FA\xE4\xB3 \x006\0A!@ AtA\xE4\xB3j \0Av \0sA\xE5\x92\x9E\xE0l j"\x006\0 Aj"AtA\xE4\xB3j \0Av \0sA\xE5\x92\x9E\xE0l j"\x006\0 Aj"AtA\xE4\xB3j \0Av \0sA\xE5\x92\x9E\xE0l j"\x006\0 Aj"A\xF0FE@ AtA\xE4\xB3j \0Av \0sA\xE5\x92\x9E\xE0l j"\x006\0 Aj!\f\v\vA\xA4\xC7A\x006\0\v\x7FA/"\0A\x90\xA86\0 \0A\xD0\xA8A\0\v\xDA\r|
\x7F~#\0A\xF0\0k"$\0@@@\x7F "+ +\b"\xA1"\x07A\xC8\xC7+\0"c \x07D\0\0\0\0\0\0\0\0 \xA1"	dq! \0"A\bj!\0@ + +\b"\xA1"\b cE\r\0 \b 	dE\r\0 @ \0 G@  9\0  +9\b +\b! +\b!\vAA\0   \xA1d\x1BA\0   \xA0c\x1B\f\v +! + !  9\0   \xA1 \x07\xA3" \xA2   \xA2\xA1\xA09\bA\f\v +  +"
\xA1 \b\xA3! @  9\0   \xA2 
  \xA2\xA1\xA09\bA\f\v@   +  +"\v\xA1 \x07\xA3"\x07\xA0cE\r\0  \x07 \xA1dE\r\0| \0 G@  
9\b  9\0 + +\b"\xA1!\b\v  \bd@D\xFF\xFF\xFF\xFF\xFF\xFF\xEF\x7F \b 	d\r\v +" +  \xA1 \b\xA3 \xA2\xA1\v!AA\0 |  + +\b"\xA1"d@D\xFF\xFF\xFF\xFF\xFF\xFF\xEF\x7F  	d\r\v +"\b +  \b\xA1 \xA3 \xA2\xA1\v" \xA1d\x1BA\0   \xA0c\x1B\f\v  \v \x07 \xA2\xA1 
  \xA2\xA1"\xA1  \x07\xA1\xA3"9\0   \xA2 \xA09\bA\v"\0\0\v + " +"  d\x1B!\x07 +" +\b"  d\x1B!	A\0!\0 +\0"\b    c\x1BA\xC8\xC7+\0"\xA1dE\r \b 	 \xA0cE\r +\b"    c\x1B \xA1dE\r  \x07 \xA0cE\r + " +"  d\x1B!
 +"\x07 +\b"	 \x07 	d\x1B!\v \b \x07 	 \x07 	c\x1B \xA1dE\r \b  \v\xA0cE\r     c\x1B \xA1dE\r   
\xA0c!\0\f\v  +\b9  +9  +9   + 9(  +\b90  +98  +9@ + ! A6X  9H  Aj"6T  )T7\b\x7F (\f!\0 A\xDC\0j"A\x006\f  \0Ak6@\x7F \0A\0L@ A\x006\0 A\x006\bA\f\v  \0At"'"\x006 \0E\r  \x006\0 \0 j!A\b\v j 6\0@ )\b"B \x88"\x1BP\r\0 \xA7! (!@ \x1B\xA7At"Ak"AvAjAq"E@ !\0\f\vA\0! !\0@  \0+\x009\0  \0+\b9\b \0Aj!\0 Aj! Aj" G\r\0\v\v A0I\r\0  j!@  \0+\x009\0  \0+\b9\b  \0+9  \0+9  \0+ 9   \0+(9(  \0+090  \0+898 A@k! \0A@k"\0 G\r\0\v\v \f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v"("\0 (\b"G@ \0    \0kAugAtA>sA\xC5\v@ (\0"Aj F@ +\0!\f\v  +"9\0  +9\b\v + " +"\b  \bd\x1B!
 +"\x07 +\b"	 \x07 	d\x1B!  \b  \bc\x1B!\vA\0!\0@  \x07 	 \x07 	c\x1BA\xC8\xC7+\0"\xA1dE\r\0   \xA0cE\r\0 +\b" \v \xA1dE\r\0  
 \xA0cE\r\0 + "
 +"\v 
 \vd\x1B!\f +" +\b"  d\x1B!\r     c\x1B \xA1dE\r\0   \r\xA0cE\r\0  
 \v 
 \vc\x1B \xA1dE\r\0   \f\xA0cE\r\0@ +"\f  + "\r\xA0cE\r\0 \f \r \xA1dE\r\0 +"\f  +("\r\xA0cE\r\0 \f \r \xA1dE\r\0  \xA1!\f@ 	  \xA0"cE\r\0 	 \fdE\r\0 \b  \xA0"	cE\r\0 \b  \xA1"\rdE\r\0  \x07dE\r\0 \x07 \fdE\r\0  	cE\r\0  \rd\r\vA!\0  dE\r \f cE\r \v  \xA0"cE\r \v  \xA1"dE\r  dE\r \f cE\r  
dE\r  
cE\r\vA!\0\v (#\v A\xF0\0j$\0 \0\v\xCC\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjA\fl"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\bI@@  (\b6\b  )\x007\0 A\fj" \0(\bI\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xAF\f\x7F#\0Ak"$\0 \0A\x80:6\0 \0A\xD06\xAC\x07 \0(\xB4\x07"@  \0(\xB0\x076\f  A\fj,\v \0(\xBC\x07# \0A\xD06\x88\x07 \0(\x90\x07"@  \0(\x8C\x076\f  A\fj,\v \0(\x98\x07# \0A\xD06\xE0 \0(\xE8"@  \0(\xE46\f  A\fj,\v \0(\xF0# \0A\xD06\xBC \0(\xC4"@  \0(\xC06\f  A\fj,\v \0(\xCC# \0A\xD06\x90 \0(\x98"@  \0(\x946\f  A\fj,\v \0(\xA0# \0A\xD06\xEC \0(\xF4"@  \0(\xF06\f  A\fj,\v \0(\xFC# \0A\xF8!6\xC0 \0,\0\xEBA\0H@ \0(\xE8 \0(\xE0#\v \0A\xD06\xC0 \0(\xC8"@  \0(\xC46\f  A\fj,\v \0(\xD0" \0(\xD4"I\x7F@ ,\0\vA\0H@ (\b (\0# \0(\xD4!\v A\fj" I\r\0\v \0(\xD0 \v# \0A\xA8%6\xB0 \0A\xE4#6\x90 \0(\xB4"@A  \0(\xB8$\v \0A\xD06\x90 \0(\x98"@  \0(\x946\f  A\fj,\v \0(\xA0" \0(\xA4I\x7F@  (\0(\0\0\0 Aj" \0(\xA4I\r\0\v \0(\xA0 \v# \0A\x846\xEC \0(\xF4"@  \0(\xF06\f  A\fj(\v \0(\xFC# \0A\x846\xC8 \0(\xD0"@  \0(\xCC6\f  A\fj(\v \0(\xD8# \0A\x846\xA4 \0(\xAC"@  \0(\xA86\f  A\fj(\v \0(\xB4# \0A\xF8&6\xF8 \0,\0\xA3A\0H@ \0(\xA0 \0(\x98#\v \0A\x846\xF8 \0(\x80"@  \0(\xFC6\f  A\fj(\v \0(\x88" \0(\x8C"I\x7F@ ,\0\vA\0H@ (\b (\0# \0(\x8C!\v A\fj" I\r\0\v \0(\x88 \v# \0A\x846\xCC \0(\xD4"@  \0(\xD06\f  A\fj(\v \0(\xDC# \0A\x846\xA0 \0(\xA8"@  \0(\xA46\f  A\fj(\v \0(\xB0# \0A\xF8&6\xF4 \0,\0\x9FA\0H@ \0(\x9C \0(\x94#\v \0A\x846\xF4 \0(\xFC"@  \0(\xF86\f  A\fj(\v \0(\x84" \0(\x88"I\x7F@ ,\0\vA\0H@ (\b (\0# \0(\x88!\v A\fj" I\r\0\v \0(\x84 \v# \0A\x846\xD0 \0(\xD8"@  \0(\xD46\f  A\fj(\v \0(\xE0# \0A\x846\xA8 \0(\xB0"@  \0(\xAC6\f  A\fj(\v \0(\xB8# \0A\x846\x80 \0(\x88"@  \0(\x846\f  A\fj(\v \0(\x90# \0A\x846\xD8 \0(\xE0"@  \0(\xDC6\f  A\fj(\v \0(\xE8# \0A\x846\xB0 \0(\xB8"@  \0(\xB46\f  A\fj(\v \0(\xC0# \0A\x846\x88 \0(\x90"@  \0(\x8C6\f  A\fj(\v \0(\x98# \0A\x846\` \0(h"@  \0(d6\f  A\fj(\v \0(p# \0A\x8468 \0(@"@  \0(<6\f  A\fj(\v \0(H# \0A\x846 \0("@  \0(6\f  A\fj(\v \0( # Aj$\0 \0\v\xDE\x7F@ \0("E\r\0 \0(\fE\r\0 (\0  ,\0\v"A\0H"\x1B" (  \x1B"S!A\0! \0(\0\x7F  Akq i"\x07AM\r\0   I\r\0  p\v"Atj(\0"\0E\r\0 \0(\0"\0E\r\0@@ \x07AM@ Ak!@@  \0("G@  q G\r\f\v \0(\f \0,\0" A\0H"\x1B G\r\0 \0(\b \0A\bj \x1B  \\E\r\v \0(\0"\0\r\0\v\f\v@@  \0("G@  O\x7F  p \v G\r\f\v \0(\f \0,\0" A\0H"\x1B G\r\0 \0(\b \0A\bj \x1B  \\E\r\v \0(\0"\0\r\0\v\vA\0\v \0!\v \vK\x7F \0("A\bu!\x07 \0(\0"\0   Aq\x7F (\0 \x07j(\0 \x07\v j A Aq\x1B  \0(\0(\f\0\v\x9A\0 \0A:\x005@  \0(G\r\0 \0A:\x004@ \0("E@ \0A6$ \0 6 \0 6 AG\r \0(0AF\r\f\v  F@ \0("AF@ \0 6 !\v \0(0AG\r AF\r\f\v \0 \0($Aj6$\v \0A:\x006\v\vv\x7F \0($"E@ \0 6 \0 6 \0A6$ \0 \0(86\v@@ \0( \0(8G\r\0 \0( G\r\0 \0(AG\r \0 6\v \0A:\x006 \0A6 \0 Aj6$\v\v,\x7F \0 A\x90\xCE\0n"At/\xF0\x9A;\0\0 \0Aj  A\x90\xCE\0lk\xD6\v4\x7F \0 A\xE4\0n"At/\xF0\x9A;\0\0 \0  A\xE4\0lkAt/\xF0\x9A;\0 \0Aj\v\xE9\x7F A\xBF\x84=M@ A\x8F\xCE\0M@ A\xE3\0M@ A	M@ \0 A0r:\0\0 \0Aj\v \0 At/\xF0\x9A;\0\0 \0Aj\v A\xE7\x07M@ \0 A\xFF\xFFqA\xE4\0n"A0r:\0\0 \0  A\xE4\0lkA\xFF\xFFqAt/\xF0\x9A;\0 \0Aj\v \0 \xD6\v A\x9F\x8DM@ \0 A\x90\xCE\0n"A0j:\0\0 \0Aj  A\x90\xCE\0lk\xD6\v \0 \xD5\v A\xFF\xC1\xD7/M@ A\xFF\xAC\xE2M@ \0 A\xC0\x84=n"A0j:\0\0 \0Aj  A\xC0\x84=lk\xD5\v \0 \xAC\v A\xFF\x93\xEB\xDCM@ \0 A\x80\xC2\xD7/n"A0j:\0\0 \0Aj  A\x80\xC2\xD7/lk\xAC\v \0 A\x80\xC2\xD7/n"At/\xF0\x9A;\0\0 \0Aj  A\x80\xC2\xD7/lk\xAC\v/\x7F A~qAj"\x9F! \0 A\x80\x80\x80\x80xr6\b \0 6 \0 6\0\v\0 \0(\b@G@ \0(\b\xDD\v \0\vw\x7F#\0Ak"$\0A\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\f \0 \xC6 (\f"\0@A\xF0\xAD(\0 \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v\v Aj$\0\v\xD5
\0 \0A\x94\x84-\0\0E@A\x8C\x84-\0\0E@A\xEC\x82A\xA8\xE76\0A\xF0\x82A\x006\0A\xF8\x83A\0:\0\0A\xFC\x82A\x006\0A\xF4\x82B\x007\0A\xF8\x82A\x80\x83A\x9C"\x006\0A\xF4\x82 \x006\0A\xFC\x82 \0A\xF8\0j6\0A\xB2A\xFC\x83A\xA2\x9CA\xF8\x82A\xF4\x82(\x006\0A\xFC\x8DA\xC8\xFB6\0A\x80\x8EA\x006\0A\xFC\x8DA\xC4\x81;<A\x84\x8EA\xE8\xFB6\0A\x88\x8EA\x006\0A\x84\x8EA\xCC\x81;<A\x8C\x8EA\xBC\xE76\0A\x94\x8EA\xF0\xE76\0A\x98\x8EA\0:\0\0A\x90\x8EA\x006\0A\x8C\x8EA\xA4\x84;<A\x9C\x8EA\xA8\xF36\0A\xA0\x8EA\x006\0A\x9C\x8EA\x9C\x84;<A\xA4\x8EA\xC0\xF46\0A\xA8\x8EA\x006\0A\xA4\x8EA\xAC\x84;<A\xAC\x8EA\xF8\xEF6\0A\xB0\x8EA\x006\0A\xB4\x8E@6\0A\xAC\x8EA\xB4\x84;<A\xB8\x8EA\xD4\xF56\0A\xBC\x8EA\x006\0A\xB8\x8EA\xBC\x84;<A\xC0\x8EA\xBC\xF76\0A\xC4\x8EA\x006\0A\xC0\x8EA\xCC\x84;<A\xC8\x8EA\xC8\xF66\0A\xCC\x8EA\x006\0A\xC8\x8EA\xC4\x84;<A\xD0\x8EA\xB0\xF86\0A\xD4\x8EA\x006\0A\xD0\x8EA\xD4\x84;<A\xE4\x8EB\x007\0A\xE0\x8EA\xAE\xD8\0;\0A\xD8\x8EA\xA8\xF06\0A\xDC\x8EA\x006\0A\xEC\x8EA\x006\0A\xD8\x8EA\xDC\x84;<A\x80\x8FB\x007\0A\xFC\x8EA,6\0A\xF0\x8EA\xD0\xF06\0A\xF4\x8EB\x80\x80\x80\x80\xE07\0A\x88\x8FA\x006\0A\xF0\x8EA\xE4\x84;<A\x8C\x8FA\x88\xFC6\0A\x90\x8FA\x006\0A\x8C\x8FA\xD4\x81;<A\x94\x8FA\x80\xFE6\0A\x98\x8FA\x006\0A\x94\x8FA\xDC\x81;<A\x9C\x8FA\xD4\xFF6\0A\xA0\x8FA\x006\0A\x9C\x8FA\xE4\x81;<A\xA4\x8FA\xC0\x816\0A\xA8\x8FA\x006\0A\xA4\x8FA\xEC\x81;<A\xAC\x8FA\xA4\x896\0A\xB0\x8FA\x006\0A\xAC\x8FA\x94\x82;<A\xB4\x8FA\xB8\x8A6\0A\xB8\x8FA\x006\0A\xB4\x8FA\x9C\x82;<A\xBC\x8FA\xAC\x8B6\0A\xC0\x8FA\x006\0A\xBC\x8FA\xA4\x82;<A\xC4\x8FA\xA0\x8C6\0A\xC8\x8FA\x006\0A\xC4\x8FA\xAC\x82;<A\xCC\x8FA\x94\x8D6\0A\xD0\x8FA\x006\0A\xCC\x8FA\xB4\x82;<A\xD4\x8FA\xBC\x8E6\0A\xD8\x8FA\x006\0A\xD4\x8FA\xBC\x82;<A\xDC\x8FA\xE4\x8F6\0A\xE0\x8FA\x006\0A\xDC\x8FA\xC4\x82;<A\xE4\x8FA\x8C\x916\0A\xE8\x8FA\x006\0A\xE4\x8FA\xCC\x82;<A\xF4\x8FA\xB8\x836\0A\xEC\x8FA\x88\x836\0A\xF0\x8FA\x006\0A\xEC\x8FA\xF4\x81;<A\x80\x90A\xC4\x856\0A\xF8\x8FA\x94\x856\0A\xFC\x8FA\x006\0A\xF8\x8FA\xFC\x81;<A\x84\x90A\xF0\xF26\0A\x88\x90A\x006\0@!\0A\x84\x90A\x84\x876\0A\x8C\x90 \x006\0A\x84\x90A\x84\x82;<A\x90\x90A\xF0\xF26\0A\x94\x90A\x006\0@!\0A\x90\x90A\xA4\x886\0A\x98\x90 \x006\0A\x90\x90A\x8C\x82;<A\x9C\x90A\xB4\x926\0A\xA0\x90A\x006\0A\x9C\x90A\xD4\x82;<A\xA4\x90A\xAC\x936\0A\xA8\x90A\x006\0A\xA4\x90A\xDC\x82;<A\x8C\x84A:\0\0A\x88\x84A\xEC\x826\0\vA\x90\x84A\x88\x84(\0"\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\vA\x94\x84A:\0\0\vA\x90\x84(\0"\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v\v\xA6\x7F#\0A k"$\0 Aj \0  j\x9E\xEA \0(\0 \0 \0,\0\vA\0H\x1B!@ E"\r\0 \r\0 (  \xFC
\0\0\v@  F\r\0  k"E\r\0  (j  j \xFC
\0\0\v A\x7F6  (6  )7\b \0 A\bj\x83 A j$\0 \0 6\v0\0 ,\0\vA\0N@ \0 (\b6\b \0 )\x007\0\v \0 (\0 (a\vT\x7F#\0Ak"$\0\x7F (\0!  \0kAu"@@ \0  \0(\0F\r \0Aj!\0 Ak"\r\0\v\vA\0\v"\0  \0\x1B Aj$\0\v\xD9\x7F#\0Ak"\f$\0 \f \x006\f@@ \0 F@ -\0\0AG\rA\0!\0 A\0:\0\0  (\0"Aj6\0 A.:\0\0 \x07( \x07,\0\v" A\0H\x1BE\r 	(\0" \bkA\x9FJ\r 
(\0! 	 Aj6\0  6\0\f\v@@ \0 G\r\0 \x07( \x07,\0\v"\0 \0A\0H\x1BE\r\0 -\0\0AG\r 	(\0"\0 \bkA\x9FJ\r 
(\0! 	 \0Aj6\0 \0 6\0A\0!\0 
A\x006\0\f\v \v \vA\xF0\0j \fA\fj\xDE \vk"\0Au"A\x1BJ\r A\xB0\xE5j,\0\0!@@ \0A{q"\0A\xD8\0G@ \0A\xE0\0G\r  (\0"G@A\x7F!\0 Ak,\0\0"A\xDF\0q  A\xE1\0kAI\x1B ,\0\0"A\xDF\0q  A\xE1\0kAI\x1BG\r\v  Aj6\0  :\0\0\f\v A\xD0\0:\0\0\f\v A\xDF\0q  A\xE1\0kAI\x1B"\0 ,\0\0G\r\0  \0A r \0 \0A\xC1\0kAI\x1B:\0\0 -\0\0AG\r\0 A\0:\0\0 \x07( \x07,\0\v"\0 \0A\0H\x1BE\r\0 	(\0"\0 \bkA\x9FJ\r\0 
(\0! 	 \0Aj6\0 \0 6\0\v  (\0"\0Aj6\0 \0 :\0\0A\0!\0 AJ\r 
 
(\0Aj6\0\f\vA\0!\0\f\vA\x7F!\0\v \fAj$\0 \0\v\xC8\x7F#\0Ak"$\0 A\fj" ("6\0 A\xEC\x82G@  (Aj6\v A\x9C\x84+"A\xB0\xE5A\xCC\xE5  (\0(0\b\0  A\xE4\x84+" (\0(\f\0\x006\0   (\0(\0\x006\0 \0  (\0(\0@ (\f"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v Aj$\0\v\xD1\x7F#\0Ak"\f$\0 \f \0:\0@@ \0 F@ -\0\0AG\rA\0!\0 A\0:\0\0  (\0"Aj6\0 A.:\0\0 \x07( \x07,\0\v" A\0H\x1BE\r 	(\0" \bkA\x9FJ\r 
(\0! 	 Aj6\0  6\0\f\v@@ \0 G\r\0 \x07( \x07,\0\v"\0 \0A\0H\x1BE\r\0 -\0\0AG\r 	(\0"\0 \bkA\x9FJ\r 
(\0! 	 \0Aj6\0 \0 6\0A\0!\0 
A\x006\0\f\v \v \vAj \fAj\xD0 \vk"A\x1BJ\r A\xB0\xE5j,\0\0!@@@@ A~qAk\0\v  (\0"G@A\x7F!\0 Ak,\0\0"A\xDF\0q  A\xE1\0kAI\x1B ,\0\0"A\xDF\0q  A\xE1\0kAI\x1BG\r\v  Aj6\0  :\0\0\f\v A\xD0\0:\0\0\f\v A\xDF\0q  A\xE1\0kAI\x1B"\0 ,\0\0G\r\0  \0A r \0 \0A\xC1\0kAI\x1B:\0\0 -\0\0AG\r\0 A\0:\0\0 \x07( \x07,\0\v"\0 \0A\0H\x1BE\r\0 	(\0"\0 \bkA\x9FJ\r\0 
(\0! 	 \0Aj6\0 \0 6\0\v  (\0"\0Aj6\0 \0 :\0\0A\0!\0 AJ\r 
 
(\0Aj6\0\f\vA\0!\0\f\vA\x7F!\0\v \fAj$\0 \0\v\xC8\x7F#\0Ak"$\0 A\fj" ("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+"A\xB0\xE5A\xCC\xE5  (\0( \b\0  A\xDC\x84+" (\0(\f\0\0:\0\0   (\0(\0\0:\0\0 \0  (\0(\0@ (\f"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v Aj$\0\v~\x7F~#\0A\xA0k"$\0  6<  6 A\x7F6 Aj"B\0[   A\xE4 )\b! )\0!\x07 @  (\x88  ( (<kjj6\0\v \0 7\b \0 \x077\0 A\xA0j$\0\v\x9C\b\x7F@ \0"Aq@@ -\0\0"E\r A=F\r Aj"Aq\r\0\v\v@@A\x80\x82\x84\b (\0"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r\0@A\x80\x82\x84\b A\xBD\xFA\xF4\xE9s"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r (! Aj"! A\x80\x82\x84\b krA\x80\x81\x82\x84xqA\x80\x81\x82\x84xF\r\0\v\f\v !\v@ "-\0\0"E\r Aj! A=G\r\0\v\v \0 F@A\0\v@ \0  \0k"j-\0\0\r\0A\xB4\x80(\0"E\r\0 (\0"E\r\0@@\x7F \0!A\0 "E\r\0 \0-\0\0"\x7F@@  -\0\0"\x07G\r \x07E\r Ak"E\r Aj! -\0! Aj! \r\0\vA\0!\v A\0\v -\0\0k\vE@ (\0 j"-\0\0A=F\r\v (! Aj! \r\f\v\v Aj!\b\v \b\vD\x7F#\0Ak"$\0     B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85L )\0! \0 )\b7\b \0 7\0 Aj$\0\v\x9C\x7FA5!@ \0(" \0("AjA\x07pkA\x07jA\x07n  k"A\xF1jA\x07pAIj"A5G@ "\rA4!@@ AjA\x07pAk\0\v \0(A\x90oAk\xE9E\r\vA5\v@@ A\xF3jA\x07pAk\0\v \0(\xE9\r\vA!\v \v\xAC\x7F B\x0070#\0Ak"$\0 \xF9" \x006  A\x84\xDE6\0 A\fj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xB4\x84+!\0 J  A0j6(  \x006$  \0 \0(\0(\0\0:\0, Aj$\0 A\xC8\xD46 A\xB4\xD46\0 A\x006  Aj \xBF\v\xAC\x7F B\x0070#\0Ak"$\0 \x85" \x006  A\xB8\xDC6\0 A\fj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xAC\x84+!\0 J  A0j6(  \x006$  \0 \0(\0(\0\0:\0, Aj$\0 A\xB8\xD36 A\xA4\xD36\0 A\x006  Aj \xBF\v\0A\v.\x7F AxqA\bj"0! \0 A\x80\x80\x80\x80xr6\b \0 6 \0 6\0\v\xAC\x7F#\0Ak"$\0 \0 \0(\0A\fk(\0j(@  \x006\f A\0:\0\b \0 \0(\0A\fk(\0j"(E@ (H"@ \xEB\v A:\0\b\v@ -\0\bAG\r\0 \0 \0(\0A\fk(\0j(" (\0(\0\0A\x7FG\r\0 \0 \0(\0A\fk(\0j\xBE\v A\bj\xBD\v Aj$\0\v\0 \0A\xC8\xD36\0 \0AjJ \0\v>\0 \0 6 \0A\0:\0\0  (\0A\fk(\0j"(E@ (H"@ &\v \0A:\0\0\v \0\v\0 \0Ajx \0#\v\f\0 \0Ajx \0\v\0 \0A\bjx \0#\v\0 \0A\xB8\xD26\0 \0AjJ \0\v\x80~\x7F#\0A k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!~ B0\x88B\xFF\xFF\x83"\xA7"A\x81\xF8\0kA\xFDM@ B\x86 \0B<\x88\x84! A\x80\xF8\0k\xAD!@ \0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x83"\0B\x81\x80\x80\x80\x80\x80\x80\x80\bZ@ B|!\f\v \0B\x80\x80\x80\x80\x80\x80\x80\x80\bR\r\0 B\x83 |!\vB\0  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07V"\x1B!\0 \xAD |\f\v@ \0 \x84P\r\0 B\xFF\xFFR\r\0 B\x86 \0B<\x88\x84B\x80\x80\x80\x80\x80\x80\x80\x84!\0B\xFF\f\v A\xFE\x87K@B\0!\0B\xFF\f\vA\x80\xF8\0A\x81\xF8\0 P"\x1B"\b k"\x07A\xF0\0J@B\0!\0B\0\f\v  B\x80\x80\x80\x80\x80\x80\xC0\0\x84 \x1B!A\0!  \bG@ Aj \0 A\x80 \x07kF ) )\x84B\0R!\v  \0  \x07\x84 )\bB\x86 )\0"B<\x88\x84!\0@ \xAD B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x83\x84"B\x81\x80\x80\x80\x80\x80\x80\x80\bZ@ \0B|!\0\f\v B\x80\x80\x80\x80\x80\x80\x80\x80\bR\r\0 \0B\x83 \0|!\0\v \0B\x80\x80\x80\x80\x80\x80\x80\b\x85 \0 \0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07V"\x1B!\0 \xAD\v! A j$\0 B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83 B4\x86\x84 \0\x84\xBF\v\xF0\x7F~@ E\r\0 \0 :\0\0 \0 j"Ak :\0\0 AI\r\0 \0 :\0 \0 :\0 Ak :\0\0 Ak :\0\0 A\x07I\r\0 \0 :\0 Ak :\0\0 A	I\r\0 \0A\0 \0kAq"j" A\xFFqA\x81\x82\x84\bl"\x006\0   kA|q"j"Ak \x006\0 A	I\r\0  \x006\b  \x006 A\bk \x006\0 A\fk \x006\0 AI\r\0  \x006  \x006  \x006  \x006\f Ak \x006\0 Ak \x006\0 Ak \x006\0 Ak \x006\0  AqAr"k"A I\r\0 \0\xADB\x81\x80\x80\x80~!  j!@  7  7  7\b  7\0 A j! A k"AK\r\0\v\v\v\xC3\x7F@ ("\x7F  \xF6\r (\v ("k I@  \0  ($\0\v@@ (PA\0H\r\0 E\r\0 !@ \0 j"Ak-\0\0A
G@ Ak"\r\f\v\v  \0  ($\0" I\r  k! (!\f\v \0!A\0!\v   j  ( j6  j!\v \v\xE5\x7F A\0G!@@@ \0AqE\r\0 E\r\0 A\xFFq!@ \0-\0\0 F\r Ak"A\0G! \0Aj"\0AqE\r \r\0\v\v E\r@ A\xFFq" \0-\0\0F\r\0 AI\r\0 A\x81\x82\x84\bl!@A\x80\x82\x84\b \0(\0 s"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r \0Aj!\0 Ak"AK\r\0\v\v E\r\v A\xFFq!@  \0-\0\0F@ \0\v \0Aj!\0 Ak"\r\0\v\vA\0\vY\x7F \0 \0(H"Ak r6H \0(\0"A\bq@ \0 A r6\0A\x7F\v \0B\x007 \0 \0(,"6 \0 6 \0  \0(0j6A\0\v\x91\x7F@ \0A\xFAM@ \0At.\x90\xC7"\0\r\vA\xE8\xE0A6\0A\x7F\v@@ \0A~J\r\0A\xE9\xA0\f!@@@@@@@ \0A\xFFqAk\v\b\0\x07\vA\x80\x80\b\vA\x80\x80\vA\x80\x80\vA\xFF\xFF\xFF\xFF\x07\vA\vAv\vA\0\v \0!\v \v\0\x1B\0\v\xAE\x7F|~#\0A k"$\0@ \0\x99" \x99" \xBD \xBDT"\x1B"\xBD"B4\x88"\x07B\xFFQ\r\0   \x1B!\0@ P\r\0 \0\xBD"\bB4\x88"	B\xFFQ\r\0 	\xA7 \x07\xA7kA\xC1\0N@  \xA0!\f\v| \bB\x80\x80\x80\x80\x80\x80\x80\xF0\xDF\0Z@ D\0\0\0\0\0\x000\xA2! \0D\0\0\0\0\0\x000\xA2!\0D\0\0\0\0\0\0\xB0k\f\vD\0\0\0\0\0\0\xF0? B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xE7#V\r\0 D\0\0\0\0\0\0\xB0k\xA2! \0D\0\0\0\0\0\0\xB0k\xA2!\0D\0\0\0\0\0\x000\v Aj Aj \0\x8E A\bj  \x8E +\0 +\xA0 +\b\xA0 +\xA0\x9F\xA2!\f\v \0!\v A j$\0 \v\xEF\x7F|~#\0A@j"$\0@@  \0kA(m"A'M@ \0A(j" K\r \0!@ !  ")\b7  )\x007\b  (86  (<6  (@6   -\0D:\0$  (H6( !@ A(k"\x07 \0I\r\0@ \x07! ("\x07E\r \x07 A\bj \x07(\0(\r\0!	 ("\x07E\r \x07  \x07(\0(\r\0 	dE@ !\f\v  )\b7\b  )\x007\0  Ak(\x006  Ak)\x007  A\fk-\0\0:\0  A\bk(\x006  ! A(k"\x07 \0O\r\0\v\v  )7\b  )\b7\0  (6  (6  ( 6  -\0$:\0  ((6  A(j" M\r\0\v\f\v  \0 AvA(lj")\b7  )\x007\b  (6  (6  (6   -\0:\0$  ( 6( \0! !@ ("E\r   (\0(\r\0!	 ("E\r  A\bj (\0(\r\0 	d@ A(j!\f@ ("E\r  A\bj (\0(\r\0!	 ("E\r   (\0(\r\0 	d@ A(k!\f\v\v  O@  )\b78  )\x0070  )\x007\0  )\b7\b )!
  (6  (6 (!\b  (6 -\0!\x07  -\0:\0 ( !  ( 6   )87\b  )07\0  6   \x07:\0  \b6  
7 A(j! A(k!\v  O\r \0 I@ \0  \xFA\v  M\r   \xFA\f\v\0\v\0\v\xA9\0\v A@k$\0\v\xE8\b\x7F#\0A\x90k"\b$\0 \bA\x006p \bA\x006P \bB\x007X \bB\x007\` \bB\x007\0e  \0( 6\0  \0($6\0A%"\0A\x006\f \0A\xC4\xE6\x006\0 \0B\x007  \x006\0A%"\0A\x006\f \0A\xC4\xE6\x006\0 \0B\x007  \x006\0@ E@ !	 !\0 ! !\f\v (\0!\0  (\x006\0  \x006\0 (\0!\0  (\x006\0  \x006\0 !	 !\0\v \b 6L \bA\xA4\xE7\x0060 \b \bA0j6@ \bA\xDC\xEB\x006 \b \bAj6(@ \x07E@ !\f\v \b 6L \bA0j \bAj\xA5\v \bA\x006 \b(L(\0!@ @@ (\0"@ (\0"\r\v (!\v \bA\x9C\xEF\x006x \b \bA\xF8\0j"6\x88 \b \bA\xCC\0j6|  \b\xA5  \b(\x88"F\x7FA E\rA\v!  (\0 j(\0\0\f\v (! \b 6| \bA\xCC\xF3\x006x \b \bA\xF8\0j"6\x88  \b\xA5  \b(\x88"F\x7FA E\rA\v!  (\0 j(\0\0\v@@ \b )7X \b )\b7P \b ("6\` \b (6d \b ( 6h \b -\0$:\0l \b ((6p \b(@"E\r \bA\xF8\0j"  \bA\xD0\0j" (\0(\0 \b(x 	(\x006 \b(("E\r    (\0(\0 \b(x \0(\x006 \b("E\r   (\0(\0 !@  \b(x"
F\r\0 (\0"\r\0 \b(L(\0(!\v (\0"\x07 \x07(\fAk6\f (\0! (! A\x80\xDA(\x006\0A\x80\xDA 6\0@ @  6\0\f\v \x07 6\v@ @  6\f\v \x07 6\b\v \b(L(\0" (\fAk6\f (\0! (! A\x80\xDA(\x006\0A\x80\xDA 6\0@ @  6\0\f\v  6\v@ @  6\f\v  6\b\v  
G !\r\0\v@ \b \b("\0F\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v@ \b(("\0 \bAjF\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v@ \b(@"\0 \bA0jF\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v \bA\x90j$\0\v\xA9\0\v\x9D\x07|\x7FA\xC8\xC7+\0!@ +\0"\b +\0"\x07\xA1DY\xF3\xF8\xC2n\xA5f +\b" +\b"
\xA1DY\xF3\xF8\xC2n\xA5frE\r\0 \0+!@ "\v \0+"\f\xA0!	 \vD\0\0\0\0\0\0\xE0?\xA2" \f\xA0!@@@ \0+\b"\r \x07e \b  \r\xA0"cq"E\r\0  
eE\r\0  	c\r\v \rD\0\0\0\0\0\0\0\0\xA0!@@ \x07 \b \xA0c \x07 \b \xA1dq"@  \xA1!@ 
  \xA0c"E\r\0 
 dE\r\0 \b  \xA0cE\r\0 \b  \xA1dE\r\0  	 \xA0cE\r\0  	 \xA1dE\r\0   \xA0cE\r\0   \xA1dE\r\0 	  \xA0cE\r\0 	  \xA1d\r\v  \x07e \b \v \r\xA0"\x07cq"E\r  
eE\r  	cE\r !\f\f\v  \x07e \b \v \r\xA0"\x07cq"E\r  
eE\r  	cE\r !\f\f\v E\r\0 
 dE\r\0 \b \x07 \xA0cE\r\0 \b \x07 \xA1dE\r\0  	 \xA0cE\r\0  	 \xA1dE\r\0 \x07  \xA0cE\r\0 \x07  \xA1dE\r\0 	  \xA0cE\r\0 	  \xA1dE\r\0 !\f\f\v@  
 \ff"qE\r\0  dE\r\0 \r!\f\v @ \fD\0\0\0\0\0\0\0\0\xA0!\v  \xA1!	@ 
  \xA0c"E\r\0 	 
cE\r\0 \b  \xA0cE\r\0 \b  \xA1dE\r\0   \xA0cE\r\0   \xA1dE\r\0   \xA0cE\r\0   \xA1dE\r\0  \v \xA0cE\r\0  \v \xA1dE\r\0 \r!\f\v  q  dq\r E\r 	 
cE\r \b \x07 \xA0cE\r \b \x07 \xA1dE\r   \xA0cE\r   \xA1dE\r \x07  \xA0cE\r \x07  \xA1dE\r  \v \xA0cE\r  \v \xA1d\r\f\v  qE\r  dE\r\f\v \r! !\f\v \0 9 \0 \f9 \0 9\b \0 \0(\0Aj6\0 +\b!
 +\b! +\0"\b +\0"\x07\xA1DY\xF3\xF8\xC2n\xA5f\r\0  
\xA1DY\xF3\xF8\xC2n\xA5f\r\0\v\v\v\xBF\v| \0+\b"
 +\b"\x07 
 \0+"\xA0" \x07 +"\xA0"\b \0+"\v +"  \v\xA0"  \xA0"	\x9C\x7FA\0@  f@@ \x07 
d@  \xA0!\f\v  \bdE@ ! 
!\f\v  \xA1! 
 \xA1!\v  \vd@  \xA0!\f\f\v  	dE@ !\f \v!\f\v  \xA1!\f \v \xA1!\f\v| \x07 
c@  \b"\x07\xA0\f\v \b  \bcE\r\0 \x07 \xA1!\x07 \b \xA1\v!\b@  \vc@  	"\xA0!	\f\v  	c@ 	 \xA1!	  \xA1!\v\v !\f \v! ! 
!\v  \x07  \b   \f 	\x9C\v\v\0 \v\x92\x07\x7F|#\0A\xD0\0k"$\0@@  \0kA8m"A'M@ \0A8j" K\r \0!@  +89\0  +@9\b  +H9  +P9  )\0e7\0-  )\`7(  )X7 @ ""A8k"\x07 \0I\r\0@ \x07! ("\x07E\r \x07  \x07(\0(\r\0!\b ("\x07E\r \x07  \x07(\0(\r\0 \bdE@ !\f\v  +\x009\0  A0k+\x009\b  A(k+\x009  A k+\x009  Ak"\x07)\x007   \x07)\b7(  \x07)\0\r7\0- "A8k"\x07 \0O\r\0\v\v  G@  +\x009\0  +\b9\b  +9  +9\v  )\0-7\0-  )(7(  ) 7  "A8j" M\r\0\v\f\v  \0 AvA8lj"+\x009\0  +\b9\b  +9  +9  ) 7   )(7(  )\0-7\0- \0! !@ ("E\r   (\0(\r\0!\b ("E\r   (\0(\r\0 \bd@ A8j!\f@ ("E\r   (\0(\r\0!\b ("E\r   (\0(\r\0 \bd@ A8k!\f\v\v  O@ +!\b +!	 +\b!
 +\0!\v  )\0-7\0E  )(7@  ) 78  G@  +\x009\0  +\b9\b  +9  +9\v "A8j!  )\0-7\0-  )(7(  ) 7   \b9  	9  
9\b  \v9\0  )87   )@7(  )\0E7\0- A8k!\v  O\r \0 I@ \0  \xFF\v  M\r   \xFF\f\v\0\v\0\v\xA9\0\v A\xD0\0j$\0\v7\0 \0A  A\0H\x1B6\0  \0AjG@ \0 +\x009 \0 +\b9\v \0 9\b\v\xCD\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAl"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\bI@@ A\0; B\x007\b B\x007\0 Aj" \0(\bI\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xBB\x7F \0\x85 \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjA\x98l"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\bI@@ \x91A\x98j" \0(\bI\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xDE\x7F#\0Ak"$\0 (! \0A\x006 \0 Ak6 \0A\fj!@\x7F A\0L@ \0A\x006\f \0A\x006A\f\v \0 At"'"6 E\r  6\0  j!A\b\v j 6\0 \0 6\b \0A\x006 \0A\xD06\0 A\fj  \0> \0 (\f6 \0A\xBC+6\0 Aj$\0 \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x80\x7F \0(" \0(\bI\x7F@  (\0(\0\0\0 Aj" \0(\bI\r\0\v \0( \v# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\b"\0I@@ A\x006\f A\xE4 6\0 B\x007 Aj" \0I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\0 \0A\fj Ak \0A j\xCF\v\x85\x7F@  \0(" \0("kAj"F\r\0  k" j kAj"A\fl!@@@ \0("\x07@ \x07 i"E\r \0 6 \0(! \0(!\f\v \0 '"6 E\r\v \0  j6 \0  A\flj6 \0  Atlj6\f\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v \0( A\flj" \0(O\r\0@  \0((6\b  \0) 7\0 A\fj" \0(I\r\0\v\v\v	\0A\xF4\v\xB4\0\v\xF1\x7F#\0Ak"$\0 \0A\xE4!6\xB8 \0A\xBC6\x98 \0A\xB4\xC5\x006\0 \0(\xBC"@A\f  \0(\xC0$\v \0A\xD06\x98 \0(\xA0"@  \0(\x9C6\f  A\fj,\v \0(\xA8" \0(\xACI\x7F@  (\0(\0\0\0 Aj" \0(\xACI\r\0\v \0(\xA8 \v# \0A\x846\xF4 \0(\xFC"@  \0(\xF86\f  A\fj(\v \0(\x84# \0A\xD06\xD0 \0(\xD8"@  \0(\xD46\f  A\fj,\v \0(\xE0# \0A\xD06\xAC \0(\xB4"@  \0(\xB06\f  A\fj,\v \0(\xBC# \0A\x846\x88 \0(\x90"@  \0(\x8C6\f  A\fj(\v \0(\x98# \0\x87 Aj$\0\v\x87\x7F \0(" \0(\b"I\x7F@ ,\0\vA\0H@ (\0# \0(\b!\v A\fj" I\r\0\v \0( \v# \0 6 \0A\x006\f@\x7F A\0H@ \0A\x006\0 \0A\x006\bA!A\0\f\v \0 AjA\fl"'"6 E\r \0 6\0A\b!  j\v! \0 j 6\0 \0(" \0(\bI@@ A\x006\b B\x007\0 A\fj" \0(\bI\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x96\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xB5\x07\x7F (\f! (!  (\f6\f (! ((!\x07  \0(0"\x7F (!\b@ (\b"	 \x07 \b 	(\0(\0 (\0"\r\0\v (( \x07\v6  6  6\b  6\f  6\b@ \0(<"E\r\0@ (\b"  (\0(\0 (\0"\r\0\v \0(<"E\r\0@ (\b"  (\0(\b\0 (\0"\r\0\v\v (\0!@ ("@  6\0\f\v \0 6|\v@ @  6\f\v \0 6\x80\v \0 \0(xAk6x A\xB0\xD9(\x006\0A\xB0\xD9 6\0 (\0!@ ("@  6\0\f\v \0 6p\v@ @  6\f\v \0 6t\v \0 \0(lAk6l ("\0@A \0 ($\v A\xC0\xD9(\x006\0A\xC0\xD9 6\0\v\xFF\x07\x7F \0\x86"B\x81\x80\x80\x807\bA%"A\x006\b B\x007\0 A\x006  6  6\f  ("6\b  6\b  ((6  ("6@ (@  6\0\f\v  6\v  6  (Aj6A%"B\x007\b B\x007\0 A\x006  6  ("6\b  ("6@ (@  6\0\f\v  6\v  6  (Aj6 (!\x07 \0  (\f  \x8D! (! \0(0"\0@ (!@ \0(\b"\b  \x07 \b(\0(\0 \0(\0"\0\r\0\v (!\v ( 6\b  6\f  6\f  6  6\f \v\xBE\x7F@ \0(\b" \0(G\r\0 \0 At6 \0($"@@ (\b" \0( (\0(\b\0 (\0"\r\0\v\v \0(0"E\r\0@ (\b" \0(At (\0(\b\0 (\0"\r\0\v\v  \0(\bAt"6  Ar6A%! \0 \0(\b"Aj6\b  6  6  6  6\f  6\b A\x006\0  \0(\x80"6@ \0(|@  6\0\f\v \0 6|\v \0 6\x80 \0 \0(xAj6x \0(<"\0@@ \0(\b"  (\0(\0 \0(\0"\0\r\0\v\v \v#\x7F @@ \0 (\0\x8E ( #"\r\0\v\v\v\xAE\x7F#\0A k"$\0@ ( ,\0\v" A\0H\x1BE\r\0 \0 VE\r\0 \0( "! A	O@ \0\v " A	O@ \0\vE\r\0  \0( "\0"6 \0A	O@ \0\0\v Aj  A\fj\xAA ("\0A	O@ \0\0\v@ ( ,\0"\0 \0A\0H\x1BAG\r\0@ (\0  ,\0\v"A\0H"\x1B (  \x1BjAk-\0\0"A+k\0\0\v@ ( Aj \0A\0H\x1B-\0\0"A+k\0\0\v  G!\v \0A\0N\r\0 ( (#\v A j$\0 \v\f\0 \0\x91 \0#\v7\x7F \0A\x80\xA96\0 \0("Ak" (\0Ak"6\0 A\0H@ A\fk#\v \0\v{\x7F \0("Aq!\x7F -\x007AF@ A\bu" E\r (\0 j(\0\f\v A\bu E\r\0  \0(\0(68A\0!A\0\v! \0(\0"\0   j A Aq\x1B \0(\0(	\0\v\x9F\x7F#\0Ak"$\0 (!@A\x84\xB2-\0\0Aq@A\x80\xB2(\0!\f\vAA\xCC4A!A\x84\xB2A:\0\0A\x80\xB2 6\0\v  (\x006\b A\x006 A\0A\0 Aj A\bj\xFC! ("@ \v \0  6 A	O@ \0\v Aj$\0\v\x88\x7F@@@ \0,\0\v"A\0N@A! AF\r \0 AjA\xFF\0q:\0\v\f\v \0(" \0(\bA\xFF\xFF\xFF\xFF\x07qAk"G\r\v \0 A  \xB9 !\v \0 Aj6 \0(\0!\0\v \0 Atj"\0A\x006 \0 6\0\v\xE9\0A\xF4\xA4A\x92 A\x80\xA5A\xF9\rAA\0A\x8C\xA5A\xD8\fAA\x80\x7FA\xFF\0	A\xA4\xA5A\xD1\fAA\x80\x7FA\xFF\0	A\x98\xA5A\xCF\fAA\0A\xFF	A\xB0\xA5A\xC6
AA\x80\x80~A\xFF\xFF	A\xBC\xA5A\xBD
AA\0A\xFF\xFF	A\xC8\xA5A\xD5
AA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07	A\xD4\xA5A\xCC
AA\0A\x7F	A\xE0\xA5A\x8FAA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07	A\xEC\xA5A\x86AA\0A\x7F	A\xF8\xA5A\xFCA\bB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\x84\xA6A\xF3A\bB\0B\x7FA\x90\xA6A\xE4
AA\x9C\xA6A\xABA\bA\xFC3A\xAEA\xD0-AA\x94\vA\x98.AA\xBA\vA\xE4.AA\xC9\vA\xC43A\xB0/A\0A\xFB\bA\xD8/A\0A\xC0\bA\x800AA\x99\bA\xA80AA\xC8\bA\xD00AA\xE7\bA\xF80AA\x8F\bA\xA01AA\xAC\bA\xC81AA\xE5\bA\xF01AA\x83\bA\xD8/A\0A\x92\bA\x800AA\xF1\bA\xA80AA\xD4\bA\xD00AA\xB2\bA\xF80AA\xDA\bA\xA01AA\xB8\bA\x982A\bA\x97\bA\xC02A	A\xF5\bA\xE82AA\xD2\bA\x903A\x07A\xAA\b\v\xFD\x7F#\0A k"\b$\0 \bAj \0  j\x9D\xD8 \0(\0 \0 \0,\0\vA\0H\x1B!@ E\r\0 At"E\r\0 \b(  \xFC
\0\0\v@ E\r\0 At"E\r\0 \b( Atj \x07 \xFC
\0\0\v   j"\x07k!@  \x07F\r\0 At"E\r\0 At"\x07 \b(j Atj  \x07j Atj \xFC
\0\0\v \b  j j"6 \b( AtjA\x006\0 \b \b(6 \b \b)7\b \0 \bA\bj\x83 \bA j$\0\v?\x7F ! \0 \xAD"!\0@ @ \0 6\0 Ak! \0Aj!\0\f\v\v  AtjA\x006\0\v\x85\x7F@@@ \0,\0\v"A\0N@A
! A
F\r \0 AjA\xFF\0q:\0\v\f\v \0(" \0(\bA\xFF\xFF\xFF\xFF\x07qAk"G\r\v \0 A  \xDC !\v \0 Aj6 \0(\0!\0\v \0 j"\0A\0:\0 \0 :\0\0\v\xDF\x7F#\0A k"\b$\0 \bAj \0  j\x9E\xEA \0(\0 \0 \0,\0\vA\0H\x1B!@ E"\r\0 \r\0 \b(  \xFC
\0\0\v@ E"\r\0 \r\0 \b( j \x07 \xFC
\0\0\v   j"\x07k!@  \x07F\r\0 E\r\0 \b( j j  j j \xFC
\0\0\v \b  j j"6 \b( jA\0:\0\0 \b \b(6 \b \b)7\b \0 \bA\bj\x83 \bA j$\0\v<\x7F ! \0 \xBC"!\0@ @ \0 :\0\0 Ak! \0Aj!\0\f\v\v  jA\0:\0\0\v\0 \0 F@ \0A\0:\0x\v #\v=\x7F#\0Ak"$\0@@ AK\r\0 \0-\0xAq\r\0 \0A:\0x\f\v \x9F!\0\v Aj$\0 \0\vL\x7F A\xF7\xFF\xFF\xFFO@=\0\vA\xF6\xFF\xFF\xFF A \0(\bA\xFF\xFF\xFF\xFF\x07qAk \0,\0\vA\0N\x1B"\0At"  K\x1B \0A\xF3\xFF\xFF\xFFK\x1B\vL\x7F A\xF7\xFF\xFF\xFF\x07O@=\0\vA\xF6\xFF\xFF\xFF\x07 A
 \0(\bA\xFF\xFF\xFF\xFF\x07qAk \0,\0\vA\0N\x1B"\0At"  K\x1B \0A\xF3\xFF\xFF\xFFK\x1B\v\0 \0A\x80\x80\x80\x80O@=\0\v \0At0\v	\0 \0\xD9#\v\0 \0A\fj Ak \0A jZ\v\0 \0A\xD0\xF06\0 \0Aj) \0\v\0 \0A\xA8\xF06\0 \0A\fj) \0\v\x8F\x7F@  "\0kAH\r\0\v@@ \0 O\r\0  \x07M\r\0 \0,\0\0"A\xFFq!\x7FA A\0N\r\0 ABI\r A_M@  \0kAH\r \0-\0A\xC0qA\x80G\rA\f\v AoM@  \0kAH\r \0-\0 \0,\0!@@ A\xEDG@ A\xE0G\r A\`qA\xA0\x7FF\r\f\v A\xA0\x7FN\r\f\v A\xBF\x7FJ\r\vA\xC0qA\x80G\rA\f\v AtK\r  \0kAH\r \0-\0! \0-\0!\b \0,\0!@@@@ A\xF0k\0\v A\xF0\0jA\xFFqA0O\r\f\v A\x90\x7FN\r\f\v A\xBF\x7FJ\r\v \bA\xC0qA\x80G\r A\xC0qA\x80G\r A?q \bAtA\xC0q AtA\x80\x80\xF0\0q A?qA\ftrrrA\xFF\xFF\xC3\0K\rA\v! \x07Aj!\x07 \0 j!\0\f\v\v \0 k\v\xC7\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@  kAH\r\0\v@@@@  O\r\0  O\r\0 ,\0\0"\bA\xFFq!\x7F \bA\0N@ A\xFF\xFF\xC3\0K\rA\f\v \bABI\r \bA_M@A  kAH\rA!\b -\0"	A\xC0qA\x80G\r 	A?q AtA\xC0qr!A\f\v \bAoM@A!\b  k"
AH\r ,\0!	@@ A\xEDG@ A\xE0G\r 	A\`qA\xA0\x7FF\r\f\b\v 	A\xA0\x7FH\r\f\x07\v 	A\xBF\x7FJ\r\v 
AF\r -\0"\bA\xC0qA\x80G\r \bA?q A\ftA\x80\xE0q 	A?qAtrr!A\f\v \bAtK\rA!\b  k"
AH\r ,\0!	@@@@ A\xF0k\0\v 	A\xF0\0jA\xFFqA0O\r\x07\f\v 	A\x90\x7FN\r\f\v 	A\xBF\x7FJ\r\v 
AF\r -\0"\vA\xC0qA\x80G\r 
AF\r -\0"
A\xC0qA\x80G\rA!\b 
A?q \vAtA\xC0q AtA\x80\x80\xF0\0q 	A?qA\ftrrr"A\xFF\xFF\xC3\0K\rA\v!\b  6\0 \0  \bj"6\f \0 Aj"6\b\f\v\v  I!\b\v \b\f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xF6\0#\0Ak"\0$\0\x7F \0 6\f \0 6\b@@@  O@A\0!\f\vA! (\0"A\xFF\xFF\xC3\0K\r\0 A\x80pqA\x80\xB0F\r\0@ A\xFF\0M@A!  \0(\b"kA\0L\r \0 Aj6\b  :\0\0\f\v A\xFFM@  \0(\b"kAH\r \0 Aj6\b  AvA\xC0r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v  \0(\b"k! A\xFF\xFFM@ AH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v AH\r \0 Aj6\b  AvA\xF0r:\0\0 \0 \0(\b"Aj6\b  A\fvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\v \0 \0(\fAj"6\f\f\v\v \f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xA2\x7F@  "\0kAH\r\0\v@@ \0 O\r\0  M\r\0\x7F \0Aj \0-\0\0"\xC0A\0N\r\0 A\xC2I\r A\xDFM@  \0kAH\r \0-\0A\xC0qA\x80G\r \0Aj\f\v A\xEFM@  \0kAH\r \0-\0 \0,\0!@@ A\xEDG@ A\xE0G\r A\`qA\xA0\x7FF\r\f\v A\xA0\x7FN\r\f\v A\xBF\x7FJ\r\vA\xC0qA\x80G\r \0Aj\f\v A\xF4K\r  \0kAH\r  kAI\r \0-\0!\x07 \0-\0!\b \0,\0!@@@@ A\xF0k\0\v A\xF0\0jA\xFFqA0O\r\f\v A\x90\x7FN\r\f\v A\xBF\x7FJ\r\v \bA\xC0qA\x80G\r \x07A\xC0qA\x80G\r \x07A?q \bAtA\xC0q AtA\x80\x80\xF0\0q A?qA\ftrrrA\xFF\xFF\xC3\0K\r Aj! \0Aj\v!\0 Aj!\f\v\v \0 k\v\x90\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@  kAH\r\0\v@@@@  O\r\0  O\r\0A!	 \0\x7F -\0\0"\xC0A\0N@  ;\0A\f\v A\xC2I\r A\xDFM@A  kAH\r -\0"\bA\xC0qA\x80G\r  \bA?q AtA\xC0qr;\0A\f\v A\xEFM@A!	  k"
AH\r ,\0!\b@@ A\xEDG@ A\xE0G\r \bA\`qA\xA0\x7FG\r\b\f\v \bA\xA0\x7FN\r\x07\f\v \bA\xBF\x7FJ\r\v 
AF\r -\0"	A\xC0qA\x80G\r  	A?q \bA?qAt A\ftrr;\0A\f\v A\xF4K\rA!	  k"
AH\r -\0"\v\xC0!\b@@@@ A\xF0k\0\v \bA\xF0\0jA\xFFqA0O\r\x07\f\v \bA\x90\x7FN\r\f\v \bA\xBF\x7FJ\r\v 
AF\r -\0"\bA\xC0qA\x80G\r 
AF\r -\0"
A\xC0qA\x80G\r  kAH\rA!	 
A?q"
 \bAt"\fA\xC0q \vA\ftA\x80\xE0q A\x07q"AtrrrA\xFF\xFF\xC3\0K\r  
 \fA\xC0\x07qrA\x80\xB8r;  \bAvAq \vAt"	A\xC0q A\btr 	A<qrrA\xC0\xFF\0jA\x80\xB0r;\0 Aj!A\v j"6\f \0 Aj"6\b\f\v\v  I!	\v 	\f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xCB\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@@@  O@A\0!\f\vA!@@ /\0"A\xFF\0M@A!  \0(\b"kA\0L\r \0 Aj6\b  :\0\0\f\v A\xFFM@  \0(\b"kAH\r \0 Aj6\b  AvA\xC0r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v A\xFF\xAFM@  \0(\b"kAH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v A\xFF\xB7M@A!  kAH\r /"\bA\x80\xF8qA\x80\xB8G\r  \0(\b"	kAH\r \bA\xFF\x07q A
tA\x80\xF8q A\xC0\x07q"A
trrA\xFF\xFF?K\r \0 Aj6\f \0 	Aj6\b 	 AvAj"AvA\xF0r:\0\0 \0 \0(\b"Aj6\b  AtA0q AvAqrA\x80r:\0\0 \0 \0(\b"Aj6\b  \bAvAq AtA0qrA\x80r:\0\0 \0 \0(\b"Aj6\b  \bA?qA\x80r:\0\0\f\v A\x80\xC0I\r  \0(\b"kAH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA\xBFq:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\v \0 \0(\fAj"6\f\f\v\vA\f\v \f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\x80\x7F|@  \0(" \0("kAj"F\r\0  k" j kAj"At!@@@ \0("\x07@ \x07 i"E\r \0 6 \0(! \0(!\f\v \0 '"6 E\r\v \0  j6 \0  Atj6 \0  Atk6\f\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v \0( Atj" \0("O\r\0 \0+ !\b@  \b9\0 A\bj" I\r\0\v\v\vr\x7F#\0Ak"$\0A\xF0\xAD(\0! \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\fAAA\xF0\xAD(\0(\0\x1B (\f"\0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v Aj$\0\v{\x7F#\0Ak"$\0A\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\f \0   \x9A (\f"\0@A\xF0\xAD(\0 \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v\v Aj$\0\v\xCB\b\x7F|#\0A0k"	$\0 	 \x006@  	Aj\xBA\r\0 	("\0("
@ 	 
6   	A j\xBA\r 	(!\0\vA +" AA\b (\0\x1Bj+\0 \0(\f\xB8\xA2D\0\0\0\0\x80\x84.A\xA3"  d\x1B" + \xA3\x9B\xFC"
 
AL\x1B!@ \b\r\0 \0-\0(AG\r\0 \0+8!\x07 \0+0!A!\v 	 \x866\f 	 	Aj"\x006 	 6 	A j"\v 	Aj"\r \0 	Aj\x94 	 	( "
("\x006 
(!\f 	 
A\fj6( 	 	A\fj6$ 	 \r6   \xB8\xA3! 
\x7F \0 \fO@ \v} 	(\f\v \0 	(\f6\0 \0Aj\v6 	(\f"\r(!\0@ \bE@ E\r \0At"
 (j 9\0 (D 
j \x079\0  \xA0!\f\v \0At"
 (j 9\0 (D 
j \x079\0  + \xA0!\v \0At"\0 (\x8Cj +("9\0 (\xB4 \0j 9\0A!\0@ \0!
 	 \x866\f 	 	Aj"\x006 	 6 	A j 	Aj" \0 	Aj\x94 	 	( "\f("\x006 \f(!\v 	 \fA\fj6( 	 	A\fj6$ 	 6  \f\x7F \0 \vI@ \0 	(\f6\0 \0Aj\f\v 	A j} 	(\v6 	(\f"\f(!\0@ \b@ \0At"\v (j 9\0 (D \vj \x079\0  + \xA0!\f\v E\r\0 \0At"\v (j 9\0 (D \vj \x079\0  \xA0!\v \0At"\0 (\x8Cj +("9\0 (\xB4 \0j 9\0  \r \f\x92!\0 (\f \0(Atj 9\0 
Aj!\0 	(\f!\r 
 G\r\0\v\v 	A0j$\0\v\0  6\0 \x07 6\0A\v+\x7F \0A\xBC\xE76\0@ \0(\b"E\r\0 \0-\0\fAqE\r\0 #\v \0\v'\x7F \0(\0(\0(\0A\x98\x84A\x98\x84(\0Aj"6\0 6\v\xB1\x7F \0A\xA8\xE76\0 \0A\bj!@ \0(\f \0(\b"kAu K@@  Atj(\0"E\r\0  ("Ak6 \r\0  (\0(\b\0\v Aj!\f\v\v \0A\x90j)#\0Ak"$\0  6\f (\f"(\0"@  6 (\b A\fj \x9B\v Aj$\0 \0\v:\x7FA\xF8\x82(\0" \0Atj!\0@ \0 F@A\xF8\x82 \x006\0 A\x006\0 Aj!\f\v\v\v \0 \0A\xF8\xEF6\0 \0(\b@G@ \0(\b\xDD\v \0\v\0A\x7F\v\x92\x07
\x7F  \x006\0AA\0 \x07\x1B! A\x80q!@ AF@ \r( \r,\0\v" A\0H"\x1B"AK@ (\0! AtAk"@  \r(\0 \r \x1BAj \xFC
\0\0\v   j6\0\v A\xB0q"AG@  A F\x7F (\0 \0\v6\0\v@@@@@@ \b j-\0\0\0\v  (\x006\0\f\v  (\x006\0 A  (\0(,\0!\x07  (\0"Aj6\0  \x076\0\f\v \r( \r,\0\v"\x07 \x07A\0H"\x07\x1BE\r \r(\0 \r \x07\x1B(\0!\x07  (\0"Aj6\0  \x076\0\f\v E\r \f( \f,\0\v"\x07 \x07A\0H"\x1B"E\r (\0!\x07 At"@ \x07 \f(\0 \f \x1B \xFC
\0\0\v  \x07 j6\0\f\v (\0  j"!\x07@@  \x07M\r\0 A\xC0\0 \x07(\0 (\0(\f\0E\r\0 \x07Aj!\x07\f\v\v "A\0J@@@  \x07O\r\0 E\r\0 Ak! \x07Ak"\x07(\0!  (\0"Aj6\0  6\0\f\v\v \x7F A0 (\0(,\0A\0\v! (\0!@ Aj! A\0LE@  6\0 Ak! !\f\v\v  6\0  	6\0\v@  \x07F@ A0 (\0(,\0!  (\0"Aj"\x076\0  6\0\f\v \v( \v,\0\v" A\0H"\x1B\x7F \v(\0 \v \x1B,\0\0A\x7F\v!A\0!A\0!@  \x07FE@ (\0!@  G@ ! !\f\v  Aj"6\0  
6\0A\0! Aj" \v( \v,\0\v" A\0H\x1BO@ !\f\vA\x7F! \v(\0" \v A\0H"\x1B j-\0\0A\xFF\0F\r\0  \v \x1B j,\0\0!\v \x07Ak"\x07(\0!  Aj6\0  6\0 Aj!\f\v\v (\0!\x07\v \x07\xB2\v Aj!\f\v\v\v\x90\x7F#\0Ak"
$\0\x7F \0@ A\xAC\x82+\f\v A\xA4\x82+\v!@ @ 
Aj"\0  (\0(,\0  
(6\0\0 \0  (\0( \0\f\v 
Aj"\0  (\0((\0  
(6\0\0 \0  (\0(\0\v \b \0\x96 \0)   (\0(\f\0\x006\0   (\0(\0\x006\0 
Aj"\0  (\0(\0  \0p \0) \0  (\0(\0 \x07 \0\x96 \0) 	  (\0($\0\x006\0 
Aj$\0\v\xF5	\x7F  \x006\0 A\x80q!@ AF@ \r( \r,\0\v" A\0H"\x1B"AK@ (\0! Ak"@  \r(\0 \r \x1BAj \xFC
\0\0\v   j6\0\v A\xB0q"AG@  A F\x7F (\0 \0\v6\0\v@@@@@@ \b j-\0\0\0\v  (\x006\0\f\v  (\x006\0 A  (\0(\0!  (\0"Aj6\0  :\0\0\f\v \r( \r,\0\v" A\0H"\x1BE\r \r(\0 \r \x1B-\0\0!  (\0"Aj6\0  :\0\0\f\v E\r \f( \f,\0\v" A\0H"\x1B"E\r (\0! @  \f(\0 \f \x1B \xFC
\0\0\v   j6\0\f\v (\0  \x07j"!@@  M\r\0 ,\0\0"A\0H\r\0 (\b Atj-\0\0A\xC0\0qE\r\0 Aj!\f\v\v "A\0J@@@  O\r\0 E\r\0 Ak! Ak"-\0\0!  (\0"Aj6\0  :\0\0\f\v\v \x7F A0 (\0(\0A\0\v!@  (\0"Aj6\0 A\0LE@  :\0\0 Ak!\f\v\v  	:\0\0\v@  F@ A0 (\0(\0!  (\0"Aj6\0  :\0\0\f\v \v( \v,\0\v" A\0H"\x1B\x7F \v(\0 \v \x1B,\0\0A\x7F\v!A\0!A\0!@  F\r@  G@ !\f\v  (\0"Aj6\0  
:\0\0A\0! Aj" \v( \v,\0\v" A\0H\x1BO@ !\f\vA\x7F! \v(\0" \v A\0H"\x1B j-\0\0A\xFF\0F\r\0  \v \x1B j,\0\0!\v Ak"-\0\0!  (\0"Aj6\0  :\0\0 Aj!\f\0\v\0\v (\0\x7F\v Aj!\f\v\v\v\x8E\x7F#\0Ak"
$\0\x7F \0@ A\x9C\x82+\f\v A\x94\x82+\v!@ @ 
Aj"\0  (\0(,\0  
(6\0\0 \0  (\0( \0\f\v 
Aj"\0  (\0((\0  
(6\0\0 \0  (\0(\0\v \b \0p \0)   (\0(\f\0\0:\0\0   (\0(\0\0:\0\0 
Aj"\0  (\0(\0  \0p \0) \0  (\0(\0 \x07 \0p \0) 	  (\0($\0\x006\0 
Aj$\0\v\xB2\x7F#\0A k"$\0 Aj \0  j\x9D\xD8 \0(\0 \0 \0,\0\vA\0H\x1B!@ E\r\0 At"E\r\0 (  \xFC
\0\0\v@  F\r\0  kAt"E\r\0 At" (j  j \xFC
\0\0\v A\x7F6  (6  )7\b \0 A\bj\x83 A j$\0 \0 6\v\xE9\x7F#\0A\x90k"\v$\0 \v 
6\x88 \v 6\x8C@ \0 \vA\x8Cj-@  (\0Ar6\0A\0!\0\f\v \vA\xCB6l \v \vA\xF0\0j"6h \v 6d \v \vA\x80j6\` \vA\x006P \vB\x007H \vA\x006@ \vB\x0078 \vA\x0060 \vB\x007( \vA\x006  \vB\x007 \vA\x006 \vB\x007\b \vA\xC8\0j \vA8j!\f \vA(j \vAj#\0Ak"
$\0@ @ 
Aj" A\xAC\x82+" (\0(,\0\f\v 
Aj" A\xA4\x82+" (\0(,\0\v \v 
(6\0\\   (\0( \0 \x96 )   (\0(\0 \x96 ) \v  (\0(\f\0\x006X \v  (\0(\0\x006T   (\0(\0 p )   (\0(\0 \f \x96 ) \v  (\0($\0\x006 
Aj$\0 	 \b(\x006\0 A\x80q!A\0!A\0!
@ 
!@@\x7F@@@@ AF\r\0 \0 \vA\x8Cj-\r\0A\0!@@@@@@ \vA\xDC\0j j"\f-\0\0\0\f\v AF\r
 \x07A\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0\r\x07  (\0Ar6\0A\0!\0\f\v AG\r\x07\f	\v@ \v(, \v,\x003" A\0H\x1BE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \v(( \vA(j" \v,\x003"A\0H\x1B(\0G\r\0 \0e A\0:\0\0   \v(, \v,\x003" A\0H\x1BAK\x1B!
\f
\v \v( \v,\0#"
 
A\0H\x1B@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \v( \vAj \v,\0#"
A\0H\x1B(\0F\r \v-\x003!\v \v( 
 
A\0H\x1B!@ \v(, A\xFFq \xC0A\0H\x1B"@ E\r  (\0Ar6\0A\0!\0\f\v E\r	\v  A\0G:\0\0\f\b\v@ \r\0 AI\r\0 \r\0A\0!
 AF \v-\0_A\0GqE\r	\v \v(8" \vA8j \v,\0C"
A\0H\x1B!@ E\r\0 \fAk-\0\0AK\r\0@@   \vA8j 
\xC0A\0H"\f\x1B \v(< 
A\xFFq \f\x1BAtjF\r\0 \x07A (\0 \x07(\0(\f\0 \v(8! \v-\0C!
E\r\0 Aj!\f\v\v   \vA8j 
\xC0A\0H\x1B"\fkAu" \v(\f \v,\0"\r \rA\0H"\r\x1B"M\x7F At \v(\b \vA\bj \r\x1Bj" Atk"
 \f  
kA|q\\E\r \v-\0C!
 \v(8 \v \vA8j 
\xC0A\0H\x1B!\v@@  \v(8 \vA8j \v,\0C"A\0H"
\x1B \v(<  
\x1BAtjF\r\0 \0 \vA\x8Cj-\r\0\x7F \0(\0"(\f"
 (F@  (\0($\0\0\f\v 
(\0\v (\0G\r\0 \0e Aj!\f\v\v E\r\x07 !
  \v(8 \vA8j \v,\0C"A\0H"\x1B \v(<  \x1BAtjF\r\b  (\0Ar6\0A\0!\0\f\v@@ \0 \vA\x8Cj-\r\0\x7F \x07A\xC0\0\x7F \0(\0"(\f"
 (F@  (\0($\0\0\f\v 
(\0\v"
 \x07(\0(\f\0@ 	(\0" \v(\x88F@ \b 	 \vA\x88j\x89 	(\0!\v 	 Aj6\0  
6\0 Aj\f\v \v(L \v,\0S" A\0H\x1BE\r E\r 
 \v(TG\r \v(d"
 \v(\`F@ \vA\xE8\0j \vA\xE4\0j \vA\xE0\0j\x89 \v(d!
\v \v 
Aj6d 
 6\0A\0\v! \0e\f\v\v@ \v(d"
 \v(hF\r\0 E\r\0 \v(\` 
F@ \vA\xE8\0j \vA\xE4\0j \vA\xE0\0j\x89 \v(d!
\v \v 
Aj6d 
 6\0\v@ \v(A\0L\r\0@ \0 \vA\x8Cj-E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \v(XF\r\v  (\0Ar6\0A\0!\0\f\v@ \0e \v(A\0L\r@ \0 \vA\x8Cj-E@ \x07A\xC0\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0\r\v  (\0Ar6\0A\0!\0\f\v 	(\0 \v(\x88F@ \b 	 \vA\x88j\x89\v\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v! 	 	(\0"Aj6\0  6\0 \v \v(Ak6\f\0\v\0\v !
 	(\0 \b(\0G\r\x07  (\0Ar6\0A\0!\0\f\v \0e A:\0\0 \vAj  \v( \v,\0#" A\0H\x1BAK\x1B!
\f\v@ E\r\0A!\x07@ \x07 ( ,\0\v" A\0H\x1BO\r@ \0 \vA\x8Cj-E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07At (\0  ,\0\vA\0H\x1Bj(\0F\r\v  (\0Ar6\0A\0!\0\f\v \0e \x07Aj!\x07\f\0\v\0\vA!\0 \v(h" \v(d"F\r\0A\0!\0 \vA\x006\0 \vA\xC8\0j   \vD \v(\0@  (\0Ar6\0\f\vA!\0\v \vA\bj) \vAj) \vA(j) \vA8j) \vA\xC8\0j) \v(h! \vA\x006h E\r  \v(l\0\f\vA\0\f\vA\v!@ E@ \vA\bj \0(\06\x94A!\f\v \0 \vA\x8Cj-\r \x07A\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0E\rA\0!\f\0\v\0\v !
\v Aj!\f\0\v\0\v \vA\x90j$\0 \0\v\xB7\x7F (\0!\x07A\0 \0(\0" \0(A\xCBF"\x1BA\x7FA (\0 k"At" AM\x1B A\xFF\xFF\xFF\xFF\x07O\x1B"\bi"@@ E@ \0 6\0\f\v \0(\0! @   \xFC
\0\0\v \0 6\0 E\r\0  \0(\0 \0(\0!\v \0A\xCC6   \x07 kj6\0  \0(\0 \bj6\0\v=\0\v\x92\x7F#\0A\x90k"\v$\0 \v 
6\x88 \v 6\x8C@ \0 \vA\x8Cj.@  (\0Ar6\0A\0!\0\f\v \vA\xCB6l \v \vA\xF0\0j"6h \v 6d \v \vA\x80j6\` \vA\x006P \vB\x007H \vA\x006@ \vB\x0078 \vA\x0060 \vB\x007( \vA\x006  \vB\x007 \vA\x006 \vB\x007\b \vA\xC8\0j \vA8j! \vA(j \vAj#\0Ak"
$\0@ @ 
Aj" A\x9C\x82+" (\0(,\0\f\v 
Aj" A\x94\x82+" (\0(,\0\v \v 
(6\0\\   (\0( \0 p )   (\0(\0 p ) \v  (\0(\f\0\0:\0[ \v  (\0(\0\0:\0Z   (\0(\0 p )   (\0(\0  p ) \v  (\0($\0\x006 
Aj$\0 	 \b(\x006\0 A\x80q!A\0!A\0!
@@ 
!@@@@@@@\x7F@@@ AF\r\0 \0 \vA\x8Cj.\r\0A\0!@@@@@@ \vA\xDC\0j j"\f-\0\0\0\v AF\r\r\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\0N@ \x07(\b Atj-\0\0Aq\r\x07\v  (\0Ar6\0A\0!\0\f\v AG\r\f\f\v@ \v(, \v,\x003" A\0H\x1BE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq \v(( \vA(j" \v,\x003"A\0H\x1B-\0\0G\r\0 \0g A\0:\0\0   \v(, \v,\x003" A\0H\x1BAK\x1B!
\f\v \v( \v,\0#"
 
A\0H\x1B@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq \v( \vAj \v,\0#"
A\0H\x1B-\0\0F\r \v-\x003!\v \v( 
 
A\0H\x1B!@ \v(, A\xFFq \xC0A\0H\x1B"@ E\r  (\0Ar6\0A\0!\0\f\v E\r\f\v  A\0G:\0\0\f\v\v@ \r\0 AI\r\0 \r\0A\0!
 AF \v-\0_A\0GqE\r\r\v \v(8" \vA8j \v,\0C"\rA\0H"\x1B! E\r\b \fAk-\0\0AK\r\b  \v(< \r \x1Bj! !
@  
F\r\b 
,\0\0"\fA\0H\r\x07 \x07(\b \fAtj-\0\0AqE\r\x07 
Aj!
\f\0\v\0\v@@ \0 \vA\x8Cj.\r\0\x7F@\x7F \0(\0"(\f"
 (F@  (\0($\0\0\f\v 
-\0\0\v\xC0"
A\0H\r\0 \x07(\b 
Atj-\0\0A\xC0\0qE\r\0 	(\0" \v(\x88F@ \b 	 \vA\x88j\xBB 	(\0!\v 	 Aj6\0  
:\0\0 Aj\f\v \v(L \v,\0S" A\0H\x1BE\r E\r \v-\0Z 
A\xFFqG\r \v(d"
 \v(\`F@ \vA\xE8\0j \vA\xE4\0j \vA\xE0\0j\x89 \v(d!
\v \v 
Aj6d 
 6\0A\0\v! \0g\f\v\v@ \v(d"
 \v(hF\r\0 E\r\0 \v(\` 
F@ \vA\xE8\0j \vA\xE4\0j \vA\xE0\0j\x89 \v(d!
\v \v 
Aj6d 
 6\0\v@ \v(A\0L\r\0@ \0 \vA\x8Cj.E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq \v-\0[F\r\v  (\0Ar6\0A\0!\0\f\v@ \0g \v(A\0L\r@@ \0 \vA\x8Cj.\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\0H\r\0 \x07(\b Atj-\0\0A\xC0\0q\r\v  (\0Ar6\0A\0!\0\f\v 	(\0 \v(\x88F@ \b 	 \vA\x88j\xBB\v\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0! 	 	(\0"Aj6\0  :\0\0 \v \v(Ak6\f\0\v\0\v !
 	(\0 \b(\0G\r\v  (\0Ar6\0A\0!\0\f\f\v \0g A:\0\0 \vAj  \v( \v,\0#" A\0H\x1BAK\x1B!
\f
\v@ E\r\0A!@  ( ,\0\v" A\0H\x1BO\r@ \0 \vA\x8Cj.E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq (\0  ,\0\vA\0H\x1B j-\0\0F\r\v  (\0Ar6\0A\0!\0\f\r\v \0g Aj!\f\0\v\0\vA!\0 \v(h" \v(d"F\r
A\0!\0 \vA\x006\0 \vA\xC8\0j   \vD \v(\0@  (\0Ar6\0\f\v\vA!\0\f
\vA\0\f\vA\v!@ E@ \vA\bj \0(\07\xC0\x98A!\f\v \0 \vA\x8Cj.\r\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\0H\r \x07(\b Atj-\0\0AqE\rA\0!\f\0\v\0\v 
!\v  k"
 \v(\f \v,\0"\f \fA\0H"\f\x1B"M@ \v(\b \vA\bj \f\x1B j"\r 
k"
  \r 
k\\E\r \v(8! \v-\0C!\r\v  \vA8j \r\xC0A\0H\x1B!\f\v !\v@@  \v(8 \vA8j \v,\0C"A\0H"
\x1B \v(<  
\x1BjF\r\0 \0 \vA\x8Cj.\r\0\x7F \0(\0"(\f"
 (F@  (\0($\0\0\f\v 
-\0\0\v\xC0A\xFFq -\0\0G\r\0 \0g Aj!\f\v\v \r\v !
\f\v !
  \v(8 \vA8j \v,\0C"A\0H"\x1B \v(<  \x1BjF\r\0  (\0Ar6\0A\0!\0\f\v Aj!\f\v\v \vA\bj) \vAj) \vA(j) \vA8j) \vA\xC8\0j) \v(h! \vA\x006h E\r\0  \v(l\0\v \vA\x90j$\0 \0\v\v\0 \0AA-\x97\v\v\0 \0AA-\x9A\vd\x7F#\0Ak"$\0 A\0:\0  :\0  :\0\r A%:\0\f @  :\0  :\0\r\v   (\0 k A\fj  \0(\0\xEA j6\0 Aj$\0\vA\0    Ab! -\0\0AqE@ \0 A\xD0j A\xECj  A\xE4\0I\x1B A\xC5\0H\x1BA\xECk6\0\v\v@\0   \0A\bj \0(\b(\0\0"\0 \0A\xA0j  A\0\xB8 \0k"\0A\x9FL@  \0A\fmA\fo6\0\v\v@\0   \0A\bj \0(\b(\0\0\0"\0 \0A\xA8j  A\0\xB8 \0k"\0A\xA7L@  \0A\fmA\x07o6\0\v\vA\0    Ac! -\0\0AqE@ \0 A\xD0j A\xECj  A\xE4\0I\x1B A\xC5\0H\x1BA\xECk6\0\v\v@\0   \0A\bj \0(\b(\0\0"\0 \0A\xA0j  A\0\xB9 \0k"\0A\x9FL@  \0A\fmA\fo6\0\v\v@\0   \0A\bj \0(\b(\0\0\0"\0 \0A\xA8j  A\0\xB9 \0k"\0A\xA7L@  \0A\fmA\x07o6\0\v\v\0A\v\xE7\v\x7F#\0Ak"\v$\0 A\x9C\x84+!	 \vAj A\xE4\x84+"\f \f(\0(\0  6\0 !
@@ \0"\b-\0\0"A+k\0\0\v 	 \xC0 	(\0(,\0!  (\0"\x07Aj"
6\0 \x07 6\0 \0Aj!\b\v@@  \b"kAL\r\0 -\0\0A0G\r\0 -\0A rA\xF8\0G\r\0 	A0 	(\0(,\0!\x07  (\0"\bAj6\0 \b \x076\0 	 ,\0 	(\0(,\0!\x07  (\0"\bAj"
6\0 \b \x076\0 Aj"\b!@  M\r -\0\0"\x07A0kA\xFFqA
O@ \x07A rA\xE1\0kA\xFFqAK\r\v Aj!\f\0\v\0\v@  M\r -\0\0A0kA\xFFqA	K\r Aj!\f\0\v\0\v@ \v(\b \v,\0"\x07 \x07A\0H\x1BE@ 	 \b  
 	(\0(0\b\0  (\0  \bkAtj6\0\f\v \b \x7F \f \f(\0(\0\0!A\0!
 \b!\x07@  \x07M@  \b \0kAtj (\0\xB2@ \v("\r \vAj" \v,\0A\0H"\x1B j,\0\0A\0L\r\0 
 \r  \x1B j,\0\0G\r\0  (\0"
Aj6\0 
 6\0A\0!
   \v(\b \v,\0"\r \rA\0H\x1BAkIj!\v 	 \x07,\0\0 	(\0(,\0!\r  (\0"Aj6\0  \r6\0 \x07Aj!\x07 
Aj!
\f\v\v\v@@@  M\r Aj!\x07 ,\0\0"A.G@ 	  	(\0(,\0!  (\0"\bAj6\0 \b 6\0 \x07!\f\v\v \f \f(\0(\f\0\0!  (\0"\bAj"
6\0 \b 6\0\f\v (\0!
 !\x07\v 	 \x07  
 	(\0(0\b\0  (\0  \x07kAtj"6\0     \0kAtj  F\x1B6\0 \vAj) \vAj$\0\v\x8C\x7F#\0A\x90k"$\0A\bAA
 ("A\xCA\0q"\x07A\bF\x1B \x07A\xC0\0F"\b\x1B!	 A\x83j!@ E\r\0 A\x80qE\r\0 \b@ A0:\0\x83 A\x84j!\f\v \x07A\bG\r\0 A0:\0\x83 A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0\x84 A\x85j!\v A\xF8\0j  A\x90j  	\xB7 (x!@ A\x88\x80qA\x88\x80G\r\0@  F\r  -\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 Aj!\f\0\v\0\v A\x83j"  X!\x07 Aj"\b ("6\0 A\xEC\x82G@  (Aj6\v  \x07  Aj" A\fj A\bj \b\xB3@ ("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0  (\f (\b  u A\x90j$\0\v6\x7F \0A\xA8%6\0 \0("@A  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v\xD6\x7F@@@ A\bk!\f Ak!\r Ak! A\fk! Ak! Ak!\v@ Aq!@@@@@@  \0"kAu"\b\b\0\v A\bk"\0(\0" (\0"N\r\x07  6\0 \0 6\0\f\b\v A\bk"\0(\0! (\b" (\0"N@  N\r\x07  6\b \0 6\0 (\f!\0  Ak"(\x006\f  \x006\0 (\b"\0 (\0"N\r\x07  6\b  \x006\0 (!\0  (\f6  \x006\f\v  H@  6\0 \0 6\0\f\b\v  6\b  6\0 (!  (\f6  6\f \0(\0" N\r  6\b \0 6\0  Ak"\0(\x006\f \0 6\0\v A\bk! (!@ (\b"\0 (\0"N@ \0 L@ !\0\f\v  \x006  6\b (\f!\x07  ("6\f  \x076  N\r  6\b  6\0 (!  6  6\f\f\v@ \0 J@  6  6\0 (!\0  (6  \x006\f\v  6\b  \x006\0 (!\0  (\f6  \x006\f  N@ !\0\f\v  6  6\b (!  \x006  6\f\v !\0\v (\0" \0N\r  6  \x006\0 (!\0  Ak"(\x006  \x006\0 ("\0 (\b"N\r  6  \x006\b (\f!  ("6\f  6 \0 (\0"N\r  6\b  \x006\0 (!\0  6  \x006\f\v AL@  F A\bj" Fr!\0 Aq@ \0\r !\0@  \0(\b"\x07 \0(\0"H@ \0 6\b \0(\f!  \0(6\x7F  \0 F\r\0@@ \x07 \0A\bk"(\0"N\r \0 6\0 \0 \0Ak(\x006 "\0 G\r\0\v \f\v \0\v" 6  \x076\0\v"\0A\bj" G\r\0\v\f\v \0\r@ ! (\b" (\0"H@ (\f!\x07 !\0@ \0 6\0 \0 "\0(6  A\bk"(\0"H\r\0\v \0 \x076 \0 6\0\v "A\bj" G\r\0\v\f\v E@  F\r AkAv"!\0@@  \0"I\r\0  \0At"Ar"\0Atj!\x07@  Aj"M@ \x07(\0!\x07\f\v \x07(\0"\b  Atj(\0"	 \b 	J\x1B!\x07  \0 \b 	H\x1B!\0\v \x07  Atj"\b(\0"H\r\0 \b(!\r !\b@@  \bAtj"\b \x076\0 \b  \0Atj"
(6 \0 J\r\0  \0At"\bAr"	Atj!\x07@  \bAj"\bL@ \x07(\0!\x07\f\v \x07(\0"\v  \bAtj(\0"\f \v \fJ\x1B!\x07 \b 	 \v \fH\x1B!	\v \0!\b 	!\0  \x07L\r\v\v 
 \r6 
 6\0\v Ak!\0 A\0J\r\0\v@ ! "AkAv!\v (! (\0!\bA\0!\x07 !@ \x07At"	Ar!  \x07Atj"
A\bj!\0@  	Aj"\fL@ \0(\0!	 !\x07\f\v \0(\0"\x07 
Aj"\r(\0"
 \x07 
J\x1B!	 \f  \x07 
H"\x1B!\x07 \r \0 \x1B!\0\v  	6\0  \0(6 \0! \x07 \vL\r\0\v@ A\bk" \0F@ \0 6 \0 \b6\0\f\v \0 (\x006\0 \0 Ak"(\x006  \b6\0  6\0 \0 kA\bjAu"AH\r\0  AkAv"Atj"\x07(\0"	 \0(\0"N\r\0 \0(!@@ \0 	6\0 \0 \x07"\0(6 E\r\0  AkAv"Atj"\x07(\0"	 H\r\v\v \0 6 \0 6\0\v Ak! AJ\r\0\v\f\v  AtAxqj! \f(\0!\0@ A\x81O@@ (\0" (\0"\x07N@ \0 N\r  \x006\0 \f 6\0 (!\0  \v(\x006 \v \x006\0 (\0"\0 (\0"N\r  \x006\0  6\0 (!\0  (6  \x006\f\v \0 H@  \x006\0 \f \x076\0 (!\0  \v(\x006 \v \x006\0\f\v  6\0  \x076\0 (!\0  (6  \x006 \f(\0" \x07N\r\0  6\0 \f \x076\0  \v(\x006 \v \x006\0\v (\0!\0@ A\bk"\b(\0" (\b"\x07N@ \0 N\r \b \x006\0  6\0 Ak"\0(\0! \0 (\x006\0  6\0 \b(\0" (\b"\x07N\r  6\b \b \x076\0 (\f!  \0(\x006\f \0 6\0\f\v \0 H@  \x006\b  \x076\0 (\f!\0  (\x006\f  \x006\0\f\v  6\b \b \x076\0 (\f!\0  Ak"(\x006\f  \x006\0 (\0"	 \x07N\r\0 \b 	6\0  \x076\0  (\x006\0  \x006\0\v (\0!\0@ (\b" ("\x07N@ \0 N\r  \x006\b  6\0 (\f!\0  \r(\x006\f \r \x006\0 (\b"\0 ("N\r  \x006  6\b (!\0  (\f6  \x006\f\f\v \0 H@  \x006  \x076\0 (!\0  \r(\x006 \r \x006\0\f\v  6  \x076\b (!\0  (\f6  \x006\f (\0" \x07N\r\0  6\b  \x076\0  \r(\x006\f \r \x006\0\v (\b!\x07@@ (\0"\0 \b(\0"N@ \0 \x07L@ \0!\f\v  \x006\b  \x076\0 (!\0  (\f"	6  \x006\f  \x07L\r \b \x076\0  6\0 Ak"\0(\0!\x07 \0 	6\0  \x076\f\v Ak!	 \0 \x07J@ \b \x076\0  6\b 	(\0! 	 (\f6\0  6\f \0!\f\v \b \x006\0  6\0 	(\0!\0 	 (6\0  \x006  \x07L\r  6\b  \x076\0 (\f!  \x006\f  6\v \x07!\v (\0!\0  6\0  \x006\0 (!\0  (6  \x006\f\v (\0" (\0"\x07N@ \0 N\r  \x006\0 \f 6\0 (!\0  \v(\x006 \v \x006\0 (\0"\0 (\0"N\r  \x006\0  6\0 (!\0  (6  \x006\f\v \0 H@  \x006\0 \f \x076\0 (!\0  \v(\x006 \v \x006\0\f\v  6\0  \x076\0 (!\0  (6  \x006 \f(\0" \x07N\r\0  6\0 \f \x076\0  \v(\x006 \v \x006\0\v Ak! (\0!
@ \r\0 A\bk(\0 
H\r\0 !\0@ \f(\0 
J@@ \0"A\bj!\0 
 (\bN\r\0\f\v\0\v@ \0A\bj"\0 O\r 
 \0(\0N\r\0\v\v "\x07 \0K@@ 
 \x07A\bk"\x07(\0H\r\0\v\v (! \0 \x07I@ \x07(\0!	 \0(\0!\b@ \0 	6\0 \x07 \b6\0 \0(! \0 \x07(6 \x07 6@ \0"A\bj!\0 
 (\b"\bN\r\0\v@ 
 \x07A\bk"\x07(\0"	H\r\0\v \0 \x07I\r\0\v\v \0A\bk" G@  (\x006\0  \0Ak(\x006\v  
6\0 \0Ak 6\0A\0!\f\v (! !@ "\0A\bj! \0(\b"	 
H\r\0\v !@ \0 F@@  O\r A\bk"(\0 
N\r\0\f\v\0\v@ A\bk"(\0 
N\r\0\v\v  "\0K@ (\0!\b !\x07@ \0 \b6\0 \x07 	6\0 \0(!\b \0 \x07(6 \x07 \b6@ \0"\bA\bj!\0 \b(\b"	 
H\r\0\v@ \x07A\bk"\x07(\0"\b 
N\r\0\v \0 \x07I\r\0\v\v \0A\bk"\x07 G@  \x07(\x006\0  \0Ak(\x006\v \x07 
6\0 \0Ak 6\0  O@  \x07\xB2! \0 \xB2@ \x07! !\0 E\r\f\v \r\v\v  \x07  \xCAA\0!\f\v\v\v  A\bj Aj Aj A\bk\xAE\v\v (!\0  Ak"(\x006  \x006\0\v\xC6\x7F#\0Ak"$\0#\0Ak"$\0#\0Ak"$\0  6\f@ \0 G@ \0(\0!@ (\f"E\r\0\x7F ("\x07 (F@   (\0(4\0\f\v \x07 6\0  \x07Aj6 \vA\x7FG\r\0 A\x006\f\v \0Aj!\0\f\v\v  \x006\b  (\f6\f Aj$\0  )\b7\b Aj$\0 (\f Aj$\0\v\xCD\v\x7F#\0Ak"
$\0 A\xA4\x84+!	 
Aj A\xDC\x84+"\v \v(\0(\0  6\0@@ \0"\b-\0\0"A+k\0\0\v 	 \xC0 	(\0(\0!  (\0"\x07Aj6\0 \x07 :\0\0 \0Aj!\b\v@@  \b"kAL\r\0 -\0\0A0G\r\0 -\0A rA\xF8\0G\r\0 	A0 	(\0(\0!\x07  (\0"\bAj6\0 \b \x07:\0\0 	 ,\0 	(\0(\0!\x07  (\0"\bAj6\0 \b \x07:\0\0 Aj"\b!@  M\r -\0\0"\x07A0kA\xFFqA
O@ \x07A rA\xE1\0kA\xFFqAK\r\v Aj!\f\0\v\0\v@  M\r -\0\0A0kA\xFFqA	K\r Aj!\f\0\v\0\v@ 
(\b 
,\0"\x07 \x07A\0H\x1BE@ 	 \b  (\0 	(\0( \b\0  (\0  \bkj6\0\f\v \b \x7F \v \v(\0(\0\0! \b!\x07@  \x07M@  \b \0kj (\0\x7F@ 
("\f 
Aj" 
,\0A\0H"\x1B j,\0\0A\0L\r\0 \r \f  \x1B j,\0\0G\r\0  (\0"\rAj6\0 \r :\0\0A\0!\r   
(\b 
,\0"\f \fA\0H\x1BAkIj!\v 	 \x07,\0\0 	(\0(\0!\f  (\0"Aj6\0  \f:\0\0 \x07Aj!\x07 \rAj!\r\f\v\v\v@@@  M@ !\x07\f\v Aj!\x07 ,\0\0"A.G\r \v \v(\0(\f\0\0!  (\0"\bAj6\0 \b :\0\0\v 	 \x07  (\0 	(\0( \b\0  (\0  \x07kj"6\0     \0kj  F\x1B6\0 
Aj) 
Aj$\0\v 	  	(\0(\0!  (\0"\bAj6\0 \b :\0\0 \x07!\f\0\v\0\v\x81\x7F#\0A@j"$\0A\bAA
 ("A\xCA\0q"\x07A\bF\x1B \x07A\xC0\0F"\b\x1B!	 A3j!@ E\r\0 A\x80qE\r\0 \b@ A0:\x003 A4j!\f\v \x07A\bG\r\0 A0:\x003 A\xD8\0A\xF8\0 A\x80\x80q\x1B:\x004 A5j!\v A(j  A@k  	\xB7 ((!@ A\x88\x80qA\x88\x80G\r\0@  F\r  -\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 Aj!\f\0\v\0\v A3j"  X!\x07 Aj"\b ("6\0 A\xEC\x82G@  (Aj6\v  \x07  Aj" A\fj A\bj \b\xB6@ ("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0  (\f (\b  w A@k$\0\v\xF9\x7F \0(" \0(\bI\x7F@  (\0(\0\0\0 Aj" \0(\bI\r\0\v \0( \v# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\b"I@@ B\x007 A\xA8%6\0 ("@@A%" (\b"6 A\x006\0  +\b9\b  +9@ (@  6\0\f\v  6\v  6\b (\0"\r\0\v \0(\b!\v (\f! A\xEC%6\0  6\f Aj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v|\x7F#\0Ak"$\0#\0Ak"$\0#\0Ak"$\0  6\f@ \0 G@ A\fj \0,\0\0\xFA \0Aj!\0\f\v\v  \x006\b  (\f6\f Aj$\0  )\b7\b Aj$\0 (\f Aj$\0\v*\x7F#\0Ak"$\0 \0 ,\0\0  \0k\xF5"\0  \0\x1B Aj$\0\v\xB5

\x7F~#\0A\xA0k"$\0  6\x98  \x006\x9C f!  ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xE4\x84+!@ (\0"\x07A\xEC\x82F\r\0 \x07 \x07("\0Ak6 \0\r\0 \x07 \x07(\0(\b\0\v  (\0(\0\0!\v A\x8Cj  (\0(\0  A\xA0j\x98!\b@ A\x9Cj A\x98j-E@ !\x07@ \x07 kA\x9FJ!@@ (\x90 ,\0\x97"\0 \0A\0H\x1BE\r\x7F (\x9C"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\v \vG\r (\x9C6 \r\0\v \x07A\x006\0 \x07Aj!\x07\f\v\v\x7F (\x9C"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\v! \b(d!\x7F \b(\`"\0 G@A\0  G\r\v (\x9C6  F \0 Gr\v!\r A\x9Cj A\x98j-@  (\0Ar6\0 A\x006\0\f\vA!\0@@@ AG@ @ !\0\f\v\x7F (\x9C"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\v \b(\0G@A
!\0\f\v (\x9C6 A\x9Cj A\x98j-E@\x7F (\x9C"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\v"\0 \b(XF\r \0 \b(\\F\rA\b!\0\f\v  (\0Ar6\0 A\x006\0\f\v\x7F (\x9C"(\f" (F@  (\0($\0\0\f\v (\0\v \b(\0G\r (\x9C6 A\x9Cj A\x98j-@  (\0Ar6\0 A\x006\0\f\v\x7F (\x9C"(\f" (F@  (\0($\0\0\f\v (\0\v" \b(XF\r  \b(\\F\r\vA!
\f\v (\x9C6A!\0\v \0AF!A\0!@@ A\x9Cj A\x98j-\r\0@@\x7F (\x9C"(\f" (F@  (\0($\0\0\f\v (\0\v" \vG\r\0 (\x90 ,\0\x97" A\0H\x1BE\r\0 \x07 kA\x9FJ\r \x07 	6\0 \x07Aj!\x07A\0!	\f\v \b \x97"AJ\r Ak  AJ\x1B  \x1B" \0N\r \0\xAD \xAD~"\xA7!A!
@ B \x88B\0R@A!\f\v \xAC \xAD|"B\x86B\x87" R B\0Sr! \xA7!\v 	Aj!	  \fAqr!\f\v (\x9C6\f\v\v  
A\x7Fs \frAq\x7F  (\0Ar6\0A\0 
kA\0 k  \r\x1B\v6\0@ (\x90 ,\0\x97"\0 \0A\0H\x1BE\r\0 \x07 kA\x9FJ\r\0 \x07 	6\0 \x07Aj!\x07\v A\x8Cj  \x07 D A\x9Cj A\x98j-E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\x006\0\v (\x9C A\x8Cj) A\xA0j$\0\v\0     \xD1\v\xB1~\x7F#\0A k"\b$\0@@@  G@A\xE8\xE0(\0!\fA\xE8\xE0A\x006\0#\0Ak"	$\0@#\0Ak"
$\0#\0Ak"\v$\0 \v  \bAjA\xE3 \v)\0! 
 \v)\b7\b 
 7\0 \vAj$\0 
)\0! 	 
)\b7\b 	 7\0 
Aj$\0 	)\0! \b 	)\b7 \b 7\b 	Aj$\0 \b)! \b)\b!A\xE8\xE0(\0"E\r \b( G\r ! !\x07 A\xC4\0G\r\f\v A6\0\f\vA\xE8\xE0 \f6\0 \b( F\r\v A6\0 ! \x07!\v \0 7\0 \0 7\b \bA j$\0\v\xC0\x7F|#\0Ak"$\0@@@ \0 G@A\xE8\xE0(\0!A\xE8\xE0A\x006\0@#\0Ak"$\0  \0 A\fjA\xE3 )\0 )\b\xF2! Aj$\0@A\xE8\xE0(\0"\0@ (\f F\r\f\vA\xE8\xE0 6\0 (\f G\r\f\v \0A\xC4\0G\r\f\v A6\0\f\vD\0\0\0\0\0\0\0\0!\v A6\0\v Aj$\0 \v\xBC\x7F}#\0Ak"$\0@@@ \0 G@A\xE8\xE0(\0!A\xE8\xE0A\x006\0@#\0Ak"$\0  \0 A\fjA\0\xE3 )\0 )\b\xE2! Aj$\0@A\xE8\xE0(\0"\0@ (\f F\r\f\vA\xE8\xE0 6\0 (\f G\r\f\v \0A\xC4\0G\r\f\v A6\0\f\vC\0\0\0\0!\v A6\0\v Aj$\0 \v\x93
	\x7F~#\0A\xC0k"$\0  6\xB8  \x006\xBC f!\0  ("6\0 A\xEC\x82G@  (Aj6\v A\xDC\x84+!@ (\0"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v  (\0(\0\0!
 A\xACj  (\0(\0@ A\xBCj A\xB8j.E@ !@  kA\x9FJ!@@ (\xB0 ,\0\xB7" A\0H\x1BE\r 
A\xFFq\x7F (\xBC"\x07(\f" \x07(F@ \x07 \x07(\0($\0\0\f\v -\0\0\vA\xFFqG\r (\xBC7 \r\0\v A\x006\0 Aj!\f\v\v@@\x7F (\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFq"A+k\0\0\v (\xBC7 A-F!\f\v A\xBCj A\xB8j.@  (\0Ar6\0 A\x006\0\f\vA!@@@ \0AG@ \0@ \0!\f\v\x7F (\xBC"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\vA\xFFqA0G@A
!\f\v (\xBC7 A\xBCj A\xB8j.E@\x7F (\xBC"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\vA rA\xFFqA\xF8\0F\rA\b!\f\v  (\0Ar6\0 A\x006\0\f\v\x7F (\xBC"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\vA\xFFqA0G\r (\xBC7 A\xBCj A\xB8j.@  (\0Ar6\0 A\x006\0\f\v\x7F (\xBC"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\vA rA\xFFqA\xF8\0F\r\vA!	\f\v (\xBC7\v AF!\rA\0!\0@@ A\xBCj A\xB8j.\r\0@@ 
A\xFFq\x7F (\xBC"\x07(\f" \x07(F@ \x07 \x07(\0($\0\0\f\v -\0\0\v"\x07A\xFFqG\r\0 (\xB0 ,\0\xB7" A\0H\x1BE\r\0  kA\x9FJ\r  \b6\0 Aj!A\0!\b\f\v \x07\xC0\x99"AJ\r Ak  AJ\x1B  \r\x1B" N\r \xAD \0\xAD~"\xA7!\0A!	@ B \x88B\0R@A!\f\v \xAC \0\xAD|"B\x86B\x87" R B\0Sr! \xA7!\0\v \bAj!\b  \vAqr!\v\v (\xBC7\f\v\v  	A\x7Fs \vrAq\x7F  (\0Ar6\0A\0 	kA\0 \0k \0 \f\x1B\v6\0@ (\xB0 ,\0\xB7"\0 \0A\0H\x1BE\r\0  kA\x9FJ\r\0  \b6\0 Aj!\v A\xACj   D A\xBCj A\xB8j.E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\x006\0\v (\xBC A\xACj) A\xC0j$\0\v\0     \xD6\vg\x7F \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v,\0 \0  k"Au\xAD!\0 @ \0  \xFC
\0\0\v \0 jA\x006\0\v\xC1\x7F@ Ak! \0A\fj"(" (\b"I\x7F@ ,\0\vA\0H@ (\b (\0# (\b!\v A\fj" I\r\0\v ( \v#  6 A\x006\f@\x7F A\0H@ A\x006\0 A\x006\bA!A\0\f\v  AjA\fl"'"6 E\r  6\0A\b!  j\v!  j 6\0 (" (\bI@@@ \0,\0+A\0N@  \0((6\b  \0) 7\0\f\v  \0(  \0($a\v A\fj" (\bI\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\x8A\b\x7F (\0!@@@@@@@\x7F@@@@ E\r\0 (\0"E\r\0 \0E@ !\f\v A\x006\0 !\f\v@A\xF0\xAD(\0(\0E@ \0E\r E\r\f !@ ,\0\0"@ \0 A\xFF\xBFq6\0 \0Aj!\0 Aj! Ak"\r\f\v\v \0A\x006\0 A\x006\0  k\v ! \0E\r\f\v \x8D\vA!\x07\f\vA\0\f\vA\v!\x07@ \x07E@ -\0\0Av"Ak Au jrA\x07K\r\x7F Aj" A\x80\x80\x80qE\r\0 ,\0\0A@N@ Ak!\f\x07\v Aj" A\x80\x80 qE\r\0 ,\0\0A@N@ Ak!\f\x07\v Aj\v! Ak!A!\x07\f\v@@ ,\0\0"A\0L\r\0 Aq\r\0 (\0"A\x81\x82\x84\bk rA\x80\x81\x82\x84xq\r\0@ Ak! "Aj! ("A\x81\x82\x84\bk rA\x80\x81\x82\x84xqE\r\0\v\v \xC0A\0J@ Ak! Aj!\f\v\v A\xFFqA\xC2k"A2K\r Aj! At(\x80\xDA!A\0!\x07\f\0\v\0\v@ \x07E@ E\r\x07@@ -\0\0"\x07\xC0"A\0L\r\0@ AI\r\0 Aq\r\0@@ (\0"A\x81\x82\x84\bk rA\x80\x81\x82\x84xq\r \0 A\xFFq6\0 \0 -\06 \0 -\06\b \0 -\06\f \0Aj!\0 Aj! Ak"AK\r\0\v -\0\0!\v A\xFFq!\x07 \xC0A\0L\r\v \0 \x076\0 \0Aj!\0 Aj! Ak"\r\f	\v\v \x07A\xC2k"A2K\r Aj! At(\x80\xDA!A!\x07\f\v -\0\0"\bAv"Ak  AujrA\x07K\r@@\x7F Aj" \bA\x80k Atr"\x07A\0N\r\0 -\0\0A\x80k"A?K\r  \x07At"\br!\x07 Aj" \bA\0N\r\0 -\0\0A\x80k"A?K\r  \x07Atr!\x07 Aj\v! \0 \x076\0 Ak! \0Aj!\0\f\vA\xE8\xE0A6\0 Ak!\f\vA\0!\x07\f\0\v\0\v Ak! \r -\0\0!\v A\xFFq\r\0 \0@ \0A\x006\0 A\x006\0\v  k\vA\xE8\xE0A6\0 \0E\r\v  6\0\vA\x7F\v  6\0 \v#\x7F \0!@ "Aj! (\0\r\0\v  \0kAu\v.\0 \0A\0G \0A\xC8\xD9Gq \0A\xE0\xD9Gq \0A\xC0\x80Gq \0A\xD8\x80Gq@ \0#\v\v\xE6\x7F@ -\0\0\r\0A\x8C\xE4"@ -\0\0\r\v \0A\flA\xE0\xE4j\xE4"@ -\0\0\r\vA\x99\xE4"@ -\0\0\r\vA\xD5!\v@@@  j-\0\0"E\r\0 A/F\r\0A! Aj"AG\r\f\v\v !\vA\xD5!@@@@@ -\0\0"A.F\r\0  j-\0\0\r\0 ! A\xC3\0G\r\v -\0E\r\v A\xD5\xBAE\r\0 A\xED\xBA\r\v \0E@A\xA4\xD9! -\0A.F\r\vA\0\vA\xBC\x80(\0"@@  A\bj\xBAE\r ( "\r\0\v\vA$'"@ A\xA4\xD9)\x007\0 A\bj"  j  jA\0:\0\0 A\xBC\x80(\x006 A\xBC\x80 6\0\v A\xA4\xD9 \0 r\x1B!\v \v\x8A\x7F~#\0Ak"$\0  6\f#\0A\x90k"$\0 A\0A\x90\xFC\v\0 A\x7F6L  \x006, A\xCA6   \x006T !A\xF3!#\0A\xB0k"$\0@@ "(E@ \xC2 (E\r\vA\xF3-\0\0"E\r@@@@@ A\xFFq"\0A F \0A	kAIr@@ "Aj! -\0"\0A F \0A	kAIr\r\0\v B\0[@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A F \0A	kAIr\r\0\v (! )pB\0Y@  Ak"6\v  (,k\xAC )x ||!\f\v\x7F@@ \0A%F@ -\0"\0A*F\r \0A%G\r\v B\0[@ -\0\0A%F@@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v""\0A F \0A	kAIr\r\0\v Aj!\f\v ("\0 (hG@  \0Aj6 \0-\0\0!\f\v 2!\v -\0\0 G@ )pB\0Y@  (Ak6\v A\0N\r
 \r\r
\f	\v ( (,k\xAC )x ||! !\f\vA\0!\x07 Aj\f\v@ \0A0k"A	K\r\0 -\0A$G\r\0#\0Ak"\0 6\f \0  AtjAk  AK\x1B"\0Aj6\b \0(\0!\x07 Aj\f\v (\0!\x07 Aj! Aj\v!A\0!\vA\0! -\0\0"A0kA\xFFqA	M@@ A
l A\xFFqjA0k! -\0! Aj! A0kA\xFFqA
I\r\0\v\v A\xFFqA\xED\0G\x7F A\0!	 \x07A\0G!\v -\0!A\0!
 Aj\v"Aj!A!\0@@@@@@ A\xFFqA\xC1\0k:																								\0								\v Aj  -\0A\xE8\0F"\0\x1B!A~A\x7F \0\x1B!\0\f\v Aj  -\0A\xEC\0F"\0\x1B!AA \0\x1B!\0\f\vA!\0\f\vA!\0\f\vA\0!\0 !\vA \0 -\0\0"A/qAF"\0\x1B!@ A r  \0\x1B"\fA\xDB\0F\r\0@ \fA\xEE\0G@ \fA\xE3\0G\rA  AL\x1B!\f\v \x07  \xE0\f\v B\0[@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A F \0A	kAIr\r\0\v (! )pB\0Y@  Ak"6\v  (,k\xAC )x ||!\v  \xAC"[@ ("\0 (hG@  \0Aj6\f\v 2A\0H\r\v )pB\0Y@  (Ak6\vA!@@@@@@@@@@@@ \fA\xD8\0k!\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\0\v \fA\xC1\0k"\0AK\r
A \0tA\xF1\0qE\r
\v A\bj  A\0\xE4 )xB\0 ( (,k\xAC}Q\r \x07E\r	 )! )\b! \x07	\v \fArA\xF3\0F@ A jA\x7FA\x81\xF3 A\0:\0  \fA\xF3\0G\r\b A\0:\0A A\0:\0. A\x006*\f\b\v A j -\0"A\xDE\0F"\0A\x81\xF3 A\0:\0  Aj Aj \0\x1B!\x7F@@ AA \0\x1Bj-\0\0"\0A-G@ \0A\xDD\0F\r A\xDE\0G!\b \f\v  A\xDE\0G"\b:\0N\f\v  A\xDE\0G"\b:\0~\v Aj\v!@@ -\0\0"\0A-G@ \0E\r \0A\xDD\0F\r
\f\vA-!\0 -\0"E\r\0 A\xDD\0F\r\0 Aj!@  Ak-\0\0"M@ !\0\f\v@ Aj" A jj \b:\0\0  -\0\0"\0I\r\0\v\v !\v A j \0j \b:\0 Aj!\f\0\v\0\vA\b!\f\vA
!\f\vA\0!\vB\0!A\0!A\0!A\0!#\0Ak"$\0@ AG A$MqE@A\xE8\xE0A6\0\f\v@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A F \0A	kAIr\r\0\v@@ \0A+k\0\0\vA\x7FA\0 \0A-F\x1B! ("\0 (hG@  \0Aj6 \0-\0\0!\0\f\v 2!\0\v@@@@@ A\0G AGq\r\0 \0A0G\r\0\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A_qA\xD8\0F@A!\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A\xD1\xE2j-\0\0AI\r )pB\0Y@  (Ak6\v B\0[\f\v \rA\b!\f\v A
 \x1B" \0A\xD1\xE2j-\0\0K\r\0 )pB\0Y@  (Ak6\v B\0[A\xE8\xE0A6\0\f\v A
G\r\0 \0A0k"A	M@A\0!\0@ \0A
l j"\0A\x99\xB3\xE6\xCCI\x7F (" (hG@  Aj6 -\0\0\f\v 2\vA0k"A	Mq\r\0\v \0\xAD!\v A	K\r B
~! \xAD!@@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A0k"A	M  |"B\x9A\xB3\xE6\xCC\x99\xB3\xE6\xCCTqE@ A	M\r\f\v B
~" \xAD"B\x7F\x85X\r\v\vA
!\f\v@@  Akq@  \0A\xD1\xE2j-\0\0"K\r\f\v  \0A\xD1\xE2j-\0\0"M\r AlAvA\x07q,\0\xD1\xE4!\b@   \bt"r! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A\xD1\xE2j-\0\0"M"E A\x80\x80\x80\xC0\0Iq\r\0\v \xAD! \rB\x7F \b\xAD"\x88" T\r@ \xADB\xFF\x83  \x86\x84! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A\xD1\xE2j-\0\0"M\r  X\r\0\v\f\v@   lj! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A\xD1\xE2j-\0\0"M"E A\xC7\xE3\xF18Iq\r\0\v \xAD! \r \xAD!@  ~" \xADB\xFF\x83"B\x7F\x85V\r  |! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0A\xD1\xE2j-\0\0"M\r  B\0 B\0? )\bP\r\0\v\v\v  \0A\xD1\xE2j-\0\0M\r\0@ \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\vA\xD1\xE2j-\0\0K\r\0\vA\xE8\xE0A\xC4\x006\0A\0!B\x7F!\v )pB\0Y@  (Ak6\v  \xAC"\x85 }!\v Aj$\0 )xB\0 ( (,k\xAC}Q\r	@ \fA\xF0\0G\r\0 \x07E\r\0 \x07 >\0\f\v \x07  \xE0\f\v \x07  \xE28\0\f\v \x07  \xF29\0\f\v \x07 7\0 \x07 7\b\f\vA Aj \fA\xE3\0G"\x1B!\b\x7F AF@ \x07! \v@ \bAt'"E\r\v B\x007\xA8A\0!@@@ !\0@ \x7F (" (hG@  Aj6 -\0\0\f\v 2\v"j-\0!E\r  :\0\x1B Aj A\x1BjA A\xA8j\x9A"A~F\r\0 A\x7FF@A\0!	\f\v \0@ \0 Atj (6\0 Aj!\v \vE\r\0  \bG\r\0\v \0 \bAtAr"\bAti"\r\0\vA\0!	 \0!
A!\v\f\b\vA\0!	 \0 A\xA8j\x7F (\xA8A\0\vE\r\v \0!
\f\v \v@A\0! \b'"E\r@ !\0@ \x7F (" (hG@  Aj6 -\0\0\f\v 2\v"j-\0!E@ \0!	A\0\f\v \0 j :\0\0 Aj" \bG\r\0\v \0 \bAtAr"\bi"\r\0\vA\0!
 \0!	A!\v\f\vA\0! \x07@@ \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v"\0j-\0!@  \x07j \0:\0\0 Aj!\f \x07"\0!	A\0\f\v\0\v\0\v@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 2\v j-\0!\r\0\vA\0!\0A\0!	A\0\v!
 (! )pB\0Y@  Ak"6\v )x  (,k\xAC|"P\r   QrE\r \v@ \x07 \x006\0\v \fA\xE3\0F\r\0 
@ 
 AtjA\x006\0\v 	E@A\0!	\f\v  	jA\0:\0\0\v ( (,k\xAC )x ||! \r \x07A\0Gj!\r\v Aj! -\0"\r\f\v\vA!\vA\0!	A\0!
\v \rA\x7F \r\x1B!\r\v \vE\r 	# 
#\f\vA\x7F!\r\v A\xB0j$\0 A\x90j$\0 Aj$\0 \r\vC\0@ \0E\r\0@@@@ Aj\0\v \0 <\0\0\v \0 =\0\v \0 >\0\v \0 7\0\v\v\xDF	\x7F@@  \0(" \0("kAj"F\r\0  k"\x07  kAj"j!@ \0(@@ A\fl'"@@    J\x1B"A\0L\r\0A\0! AG@ Aq A\xFE\xFF\xFF\xFF\x07q!	@  A\fl"j" \0( j"(\b6\b  )\x007\0 B\x007\0 A\x006\b  ArA\fl"j" \0( j"(\b6\b  )\x007\0 B\x007\0 A\x006\b Aj! 
Aj"
 	G\r\0\vE\r\v  A\fl"j" \0( j"(\b6\b  )\x007\0 B\x007\0 A\x006\b\v \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# \0 6\f\v\f\v \0(! \0(! \0(!\f\v \0 A\fl'"6 \r\0\f\v \0  \x07j6 \0  A\flj6 \0  Atlj6\f \0( A\flj" \0(O\r\0@@ \0,\0+A\0N@  \0((6\b  \0) 7\0\f\v  \0(  \0($a\v A\fj" \0(I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xE7\x7F~#\0A k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\x07@ B0\x88B\xFF\xFF\x83"\b\xA7"A\x81\xFF\0kA\xFDM@ \x07B\x88\xA7!@ \0P B\xFF\xFF\xFF\x83"\x07B\x80\x80\x80\bT \x07B\x80\x80\x80\bQ\x1BE@ Aj!\f\v \0 \x07B\x80\x80\x80\b\x85\x84B\0R\r\0 Aq j!\vA\0  A\xFF\xFF\xFFK"\x1B!A\x81\x81\x7FA\x80\x81\x7F \x1B j!\f\v@ \0 \x07\x84P\r\0 \bB\xFF\xFFR\r\0 \x07B\x88\xA7A\x80\x80\x80r!A\xFF!\f\v A\xFE\x80K@A\xFF!\f\vA\x80\xFF\0A\x81\xFF\0 \bP"\x1B" k"A\xF0\0J@A\0!A\0!\f\v \x07 \x07B\x80\x80\x80\x80\x80\x80\xC0\0\x84 \x1B!\x07A\0!  G@ Aj \0 \x07A\x80 kF ) )\x84B\0R!\v  \0 \x07 \x84 )\b"\0B\x88\xA7!@ )\0 \xAD\x84"\x07P \0B\xFF\xFF\xFF\x83"\0B\x80\x80\x80\bT \0B\x80\x80\x80\bQ\x1BE@ Aj!\f\v \x07 \0B\x80\x80\x80\b\x85\x84B\0R\r\0 Aq j!\v A\x80\x80\x80s  A\xFF\xFF\xFFK"\x1B!\v A j$\0 B \x88\xA7A\x80\x80\x80\x80xq Atr r\xBE\v\x89\x7F~@@@@@\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \02\v"A+k\0\0\v A-F!\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \02\v"A:k! E\r AuK\r \0)pB\0S\r \0 \0(Ak6\f\v A:k! !\v AvI\r\0@ A0kA
O\r\0A\0!@  A
lj\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \02\v!A0k! A\xCC\x99\xB3\xE6\0H A0k"A	Mq\r\0\v \xAC! A
O\r\0@ \xAD B
~|!\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \02\v"A0k"A	M B0}"B\xAE\x8F\x85\xD7\xC7\xC2\xEB\xA3Sq\r\0\v A
O\r\0@\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \02\vA0kA
I\r\0\v\v \0)pB\0Y@ \0 \0(Ak6\vB\0 }  \x1B!\f\vB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F! \0)pB\0S\r\0 \0 \0(Ak6B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\v \v\xDE2\x7F\x07~|#\0A0k"\r$\0@@ AK\r\0 At(\xC4\xE2! -\0\xC0\xE2!@\x7F (" (hG@  Aj6 -\0\0\f\v 2\v"A F A	kAIr\r\0\vA!\v@@ A+k\0\0\vA\x7FA A-F\x1B!\v (" (hG@  Aj6 -\0\0!\f\v 2!\v@@ A_qA\xC9\0F@@ A\x07F\r\x7F (" (hG@  Aj6 -\0\0\f\v 2\v! ,\0\xDD\b Aj! A rF\r\0\v\v AG@ A\bF"\x07\r E\r AI\r \x07\r\v )pB\0S\r\0  (Ak6 E\r\0 AI\r\0  ( kAj6\v#\0Ak"\x07$\0 \v\xB2C\0\0\x80\x7F\x94\xBC"A\xFF\xFF\xFFq!\x7F Av"A\xFFq"@ A\xFFG@ \xADB\x86! A\xFFqA\x80\xFF\0j\f\v \xADB\x86!A\xFF\xFF\f\vA\0 E\r\0 \x07 \xADB\0 g"A\xD1\0jF \x07)\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85! \x07)\0!A\x89\xFF\0 k\v! \r 7\0 \r \xADB0\x86 Av\xADB?\x86\x84 \x847\b \x07Aj$\0 \r)\b! \r)\0!\f\v@@@@@@ \r\0A\0! A_qA\xCE\0G\r\0@ AF\r\x7F (" (hG@  Aj6 -\0\0\f\v 2\v! ,\0\xE9\r Aj! A rF\r\0\v\v \0\v@\x7F (" (hG@  Aj6 -\0\0\f\v 2\vA(F@A!A\x7F!\v\f\vB\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0! )pB\0S\r  (Ak6\f\v@\x7F (" (hG@  Aj6 -\0\0\f\v 2\v"\x07A\xC1\0k!@@ \x07A0kA
I\r\0 AI\r\0 \x07A\xDF\0F\r\0 \x07A\xE1\0kAO\r\v \vAk!\v Aj!\f\v\vB\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0! \x07A)F\r )p"B\0Y@  (Ak6\v @ E\r B\0S\r  ( \vj6\f\v\f\v )pB\0Y@  (Ak6\v\vA\xE8\xE0A6\0 B\0[\f\v@ A0G\r\0\x7F ("\x07 (hG@  \x07Aj6 \x07-\0\0\f\v 2\vA_qA\xD8\0F@#\0A\xB0k"$\0\x7F (" (hG@  Aj6 -\0\0\f\v 2\v!@\x7F@ A0G@@ A.G\r (" (hF\r\0  Aj6 -\0\0\f\v (" (hG\x7FA!  Aj6 -\0\0A! 2\v!\f\v\v 2\v"A0G@A!\f\f\v@ B}!\x7F (" (hG@  Aj6 -\0\0\f\v 2\v"A0F\r\0\vA!\fA!\vB\x80\x80\x80\x80\x80\x80\xC0\xFF?!@@ !@@ A0k"\bA
I\r\0 A.G"\x07 A r"A\xE1\0kAKq\r \x07\r\0 \f\rA!\f !\f\v A\xD7\0k \b A9J\x1B!@ B\x07W@  	Atj!	\f\v BX@ A0j P A j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFD?9 Aj )0 )8 ) " )("9  ) )  L )\b! )\0!\f\v E\r\0 
\r\0 A\xD0\0j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF?9 A@k )P )X  LA!
 )H! )@!\v B|!A!\v (" (hG\x7F  Aj6 -\0\0 2\v!\f\v\v~ E@@@ )pB\0Y@  ("Ak6 E\r  Ak6 \fE\r  Ak6\f\v \r\v B\0[\v A\xE0\0jD\0\0\0\0\0\0\0\0 \v\xB7\xA6h )\`! )h\f\v B\x07W@ !@ 	At!	 B|"B\bR\r\0\v\v@@@ A_qA\xD0\0F@  \xE3"B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FR\r @ )pB\0Y\r\f\vB\0! B\0[B\0\f\vB\0! )pB\0S\r\v  (Ak6\vB\0!\v 	E@ A\xF0\0jD\0\0\0\0\0\0\0\0 \v\xB7\xA6h )p! )x\f\v   \f\x1BB\x86 |B }"A\0 k\xADU@A\xE8\xE0A\xC4\x006\0 A\xA0j \vP A\x90j )\xA0 )\xA8B\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\09 A\x80j )\x90 )\x98B\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\09 )\x80! )\x88\f\v A\xE2k\xAC W@ 	A\0N@@ A\xA0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF\xBF\x7FL  B\x80\x80\x80\x80\x80\x80\x80\xFF?\xE8! A\x90j   )\xA0  A\0N"\x1B )\xA8  \x1BL  	At"r!	 B}! )\x98! )\x90! A\0N\r\0\v\v~ A  k\xAD|"\xA7"A\0 A\0J\x1B   \xADS\x1B"A\xF1\0O@ A\x80j \vP )\x88! )\x80!B\0\f\v A\xE0jD\0\0\0\0\0\0\xF0?A\x90 kqh A\xD0j \vP )\xD0! )\xE0!  )\xE8B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83 )\xD8"B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83\x847\xF8  7\xF0 )\xF8! )\xF0\v! A\xC0j 	 	AqE  B\0B\0\x80A\0G A Iqq"r\x8A A\xB0j   )\xC0 )\xC89 A\x90j )\xB0 )\xB8  L A\xA0j  B\0  \x1BB\0  \x1B9 A\x80j )\xA0 )\xA8 )\x90 )\x98L A\xF0j )\x80 )\x88  \xE5 )\xF0" )\xF8"B\0B\0\x80E@A\xE8\xE0A\xC4\x006\0\v A\xE0j   \xA7\xE7 )\xE0! )\xE8\f\vA\xE8\xE0A\xC4\x006\0 A\xD0j \vP A\xC0j )\xD0 )\xD8B\0B\x80\x80\x80\x80\x80\x80\xC0\09 A\xB0j )\xC0 )\xC8B\0B\x80\x80\x80\x80\x80\x80\xC0\09 )\xB0! )\xB8\v! \r 7 \r 7 A\xB0j$\0 \r)! \r)!\f\v )pB\0S\r\0  (Ak6\v !\b ! !\x07A\0!#\0A\x90\xC6\0k"$\0A\0 k" k!@\x7F@@ A0G@ A.G\r \b(" \b(hF\r \b Aj6 -\0\0\f\v \b(" \b(hG@ \b Aj6 -\0\0! \b2!\vA!\f\v\v \b2\v"A0F@@ B}!\x7F \b(" \b(hG@ \b Aj6 -\0\0\f\v \b2\v"A0F\r\0\vA!\vA!\f\v A\x006\x90 A0k!~@@@@@@ A.F"\r\0 A	M\r\0\f\v@@ Aq@ \fE@ !A!\f\f\v E!\f\v B|! 	A\xFCL@  \xA7 A0F\x1B! A\x90j 	Atj" 
\x7F  (\0A
ljA0k \v6\0A!A\0 
Aj" A	F"\x1B!
  	j!	\f\v A0F\r\0  (\x80FAr6\x80FA\xDC\x8F!\v\x7F \b(" \b(hG@ \b Aj6 -\0\0\f\v \b2\v"A0k! A.F"\r\0 A
I\r\0\v\v   \f\x1B!@ E\r\0 A_qA\xC5\0G\r\0@ \b \x07\xE3"B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FR\r\0 \x07E\rB\0! \b)pB\0S\r\0 \b \b(Ak6\v  |!\f\v E! A\0H\r\v \b)pB\0S\r\0 \b \b(Ak6\v E\rA\xE8\xE0A6\0\v \bB\0[B\0!B\0\f\v (\x90"E@ D\0\0\0\0\0\0\0\0 \v\xB7\xA6h )\b! )\0\f\v@ B	U\r\0  R\r\0 AMA\0  v\x1B\r\0 A0j \vP A j \x8A Aj )0 )8 )  )(9 )! )\f\v Av\xAD S@A\xE8\xE0A\xC4\x006\0 A\xE0\0j \vP A\xD0\0j )\` )hB\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\09 A@k )P )XB\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\09 )H! )@\f\v A\xE2k\xAC U@A\xE8\xE0A\xC4\x006\0 A\x90j \vP A\x80j )\x90 )\x98B\0B\x80\x80\x80\x80\x80\x80\xC0\09 A\xF0\0j )\x80 )\x88B\0B\x80\x80\x80\x80\x80\x80\xC0\09 )x! )p\f\v 
@ 
A\bL@ A\x90j 	Atj"(\0!@ A
l! 
Aj"
A	G\r\0\v  6\0\v 	Aj!	\v \xA7!
@ A	N\r\0 BU\r\0 
 H\r\0 B	Q@ A\xC0j \vP A\xB0j (\x90\x8A A\xA0j )\xC0 )\xC8 )\xB0 )\xB89 )\xA8! )\xA0\f\v B\bW@ A\x90j \vP A\x80j (\x90\x8A A\xF0j )\x90 )\x98 )\x80 )\x889 A\xE0jA\b 
kAt(\xA0\xE2P A\xD0j )\xF0 )\xF8 )\xE0 )\xE8\xE6 )\xD8! )\xD0\f\v  
A}ljA\x1Bj"ALA\0 (\x90" v\x1B\r\0 A\xE0j \vP A\xD0j \x8A A\xC0j )\xE0 )\xE8 )\xD0 )\xD89 A\xB0j 
AtA\xF8\xE1j(\0P A\xA0j )\xC0 )\xC8 )\xB0 )\xB89 )\xA8! )\xA0\f\v@ 	"Ak!	 A\x90j Atj"Ak(\0E\r\0\vA\0!@ 
A	o"E@A\0!\f\v A	j  B\0S\x1B!@ E@A\0!A\0!\f\vA\x80\x94\xEB\xDCA\0 kAtA\xC0\xE2j(\0"\fm!\bA\0!A\0!A\0!@ A\x90j Atj"\x07  \x07(\0"	 \fn"\x07j"6\0 AjA\xFFq  E  Fq"\x1B! 
A	k 
 \x1B!
 \b 	 \x07 \flkl! Aj" G\r\0\v E\r\0  6\0 Aj!\v 
 kA	j!
\v@ A\x90j Atj! 
A$H!\b@@ \bE@ 
A$G\r (\0A\xD1\xE9\xF9O\r\v A\xFFj!	A\0!@ !\x07 \xAD A\x90j 	A\xFFq"\fAtj"5\0B\x86|"B\x81\x94\xEB\xDCT\x7FA\0  B\x80\x94\xEB\xDC\x80"B\x80\x94\xEB\xDC~}! \xA7\v!  >\0 \x07 \x07 \x07 \f B\0R\x1B \f \x07AkA\xFFq"G\x1B  \fF\x1B! \fAk!	  \fG\r\0\v Ak! \x07! E\r\0\v AkA\xFFq" F@ A\x90j"\x07 A\xFEjA\xFFqAtj" (\0 At \x07j(\0r6\0 !\v 
A	j!
 A\x90j Atj 6\0\f\v\v@@ AjA\xFFq!\x07 A\x90j AkA\xFFqAtj!@A	A 
A-J\x1B!@@ !A\0!@@@  jA\xFFq" F\r\0 A\x90j Atj(\0"	 At(\x90\xE2"I\r\0  	I\r Aj"AG\r\v\v 
A$G\r\0B\0!A\0!B\0!@   jA\xFFq"F@ AjA\xFFq"At jA\x006\x8C\v A\x80j A\x90j Atj(\0\x8A A\xF0j  B\0B\x80\x80\x80\x80\xE5\x9A\xB7\x8E\xC0\09 A\xE0j )\xF0 )\xF8 )\x80 )\x88L )\xE8! )\xE0! Aj"AG\r\0\v A\xD0j \vP A\xC0j   )\xD0 )\xD89B\0! )\xC8! )\xC0! A\xF1\0j" k"	A\0 	A\0J\x1B  	 H"\x07\x1B"\bA\xF0\0M\r\f\v  j! !  F\r\0\vA\x80\x94\xEB\xDC v!\fA\x7F tA\x7Fs!A\0! !@ A\x90j"\b Atj"	  	(\0"	 vj"6\0 AjA\xFFq  E  Fq"\x1B! 
A	k 
 \x1B!
 	 q \fl! AjA\xFFq" G\r\0\v E\r  \x07G@ At \bj 6\0 \x07!\f\v  (\0Ar6\0\f\v\v\v A\x90jD\0\0\0\0\0\0\xF0?A\xE1 \bkqh )\x90!  )\x98B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83 B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83\x847\xB8  7\xB0 )\xB8! )\xB0! A\x80jD\0\0\0\0\0\0\xF0?A\xF1\0 \bkqh A\xA0j   )\x80 )\x88\xE5 A\xF0j   )\xA0" )\xA8"\xE5 A\xE0j   )\xF0 )\xF8L )\xE8! )\xE0!\v@ AjA\xFFq" F\r\0@ A\x90j Atj(\0"A\xFF\xC9\xB5\xEEM@ E@ AjA\xFFq F\r\v A\xF0j \v\xB7D\0\0\0\0\0\0\xD0?\xA2h A\xE0j   )\xF0 )\xF8L )\xE8! )\xE0!\f\v A\x80\xCA\xB5\xEEG@ A\xD0j \v\xB7D\0\0\0\0\0\0\xE8?\xA2h A\xC0j   )\xD0 )\xD8L )\xC8! )\xC0!\f\v \v\xB7!\x1B  AjA\xFFqF@ A\x90j \x1BD\0\0\0\0\0\0\xE0?\xA2h A\x80j   )\x90 )\x98L )\x88! )\x80!\f\v A\xB0j \x1BD\0\0\0\0\0\0\xE8?\xA2h A\xA0j   )\xB0 )\xB8L )\xA8! )\xA0!\v \bA\xEF\0K\r\0 A\xD0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF?\xE5 )\xD0 )\xD8B\0B\0\x80\r\0 A\xC0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF?L )\xC8! )\xC0!\v A\xB0j    L A\xA0j )\xB0 )\xB8  \xE5 )\xA8! )\xA0!@ Ak A\xFF\xFF\xFF\xFF\x07qN\r\0  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x837\x98  7\x90 A\x80j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF?9 )\x90 )\x98B\x80\x80\x80\x80\x80\x80\x80\xB8\xC0\0\xE8! )\x88  A\0N"\x1B! )\x80  \x1B!  B\0B\0\x80!   j"A\xEE\0jN@ \x07 \b 	G A\0Hrq A\0GqE\r\vA\xE8\xE0A\xC4\x006\0\v A\xF0j   \xE7 )\xF8! )\xF0\v! \r 7( \r 7  A\x90\xC6\0j$\0 \r)(! \r) !\f\v\f\vB\0!\v \0 7\0 \0 7\b \rA0j$\0\v\xC3\x7F~#\0A\x80k"$\0@@@  B\0B\0\x80E\r\0\x7F B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!
\x7F B0\x88\xA7A\xFF\xFFq"\x07A\xFF\xFFG@A \x07\rAA  
\x84P\x1B\f\v  
\x84P\v\vE\r\0 B0\x88\xA7"\bA\xFF\xFFq"A\xFF\xFFG\r\v Aj    9  )" )"  \xE6 )\b! )\0!\f\v  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"
  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"	\x80A\0L@  
  	\x80@ !\f\v A\xF0\0j  B\0B\09 )x! )p!\f\v B0\x88\xA7A\xFF\xFFq!\x07 ~  A\xE0\0j  
B\0B\x80\x80\x80\x80\x80\x80\xC0\xBB\xC0\09 )h"
B0\x88\xA7A\xF8\0k! )\`\v! \x07E@ A\xD0\0j  	B\0B\x80\x80\x80\x80\x80\x80\xC0\xBB\xC0\09 )X"	B0\x88\xA7A\xF8\0k!\x07 )P!\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83B\x80\x80\x80\x80\x80\x80\xC0\0\x84!\v 
B\xFF\xFF\xFF\xFF\xFF\xFF?\x83B\x80\x80\x80\x80\x80\x80\xC0\0\x84!
  \x07J@@~ 
 \v}  V\xAD}"	B\0Y@ 	  }"\x84P@ A j  B\0B\09 )(! ) !\f\v 	B\x86 B?\x88\x84\f\v 
B\x86 B?\x88\x84\v!
 B\x86! Ak" \x07J\r\0\v \x07!\v@ 
 \v}  V\xAD}"	B\0S@ 
!	\f\v 	  }"\x84B\0R\r\0 A0j  B\0B\09 )8! )0!\f\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?X@@ B?\x88 Ak! B\x86! 	B\x86\x84"	B\x80\x80\x80\x80\x80\x80\xC0\0T\r\0\v\v \bA\x80\x80q!\x07 A\0L@ A@k  	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 A\xF8\0j \x07r\xADB0\x86\x84B\0B\x80\x80\x80\x80\x80\x80\xC0\xC3?9 )H! )@!\f\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83  \x07r\xADB0\x86\x84!\v \0 7\0 \0 7\b A\x80j$\0\v\x88\x7F~#\0A\xD0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!
  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83!\f B0\x88\xA7A\xFF\xFFq!\x07@@ B0\x88\xA7A\xFF\xFFq"\bA\xFF\xFFkA\x82\x80~O@ \x07A\xFF\xFFkA\x81\x80~K\r\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f\f\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f !\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\0!B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\f\f\v \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\0!\f\v  \x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0 \f  \x84P\x1B!\fB\0!\f\v  \x84P@ \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v B\xFF\xFF\xFF\xFF\xFF\xFF?X@ A\xC0j  
  
 
P"\x1ByB\xC0\0B\0 \x1B|\xA7"AkFA k! )\xC8!
 )\xC0!\v B\xFF\xFF\xFF\xFF\xFF\xFF?V\r\0 A\xB0j  \v  \v \vP"	\x1ByB\xC0\0B\0 	\x1B|\xA7"	AkF  	jAk! )\xB8!\v )\xB0!\v A\xA0j \vB\x80\x80\x80\x80\x80\x80\xC0\0\x84"B\x86 B1\x88\x84"B\0B\x80\x80\x80\x80\xB0\xE6\xBC\x82\xF5\0 }"B\0? A\x90jB\0 )\xA8}B\0 B\0? A\x80j )\x98B\x86 )\x90B?\x88\x84"B\0 B\0? A\xF0jB\0 )\x88}B\0 B\0? A\xE0j )\xF8B\x86 )\xF0B?\x88\x84"B\0 B\0? A\xD0jB\0 )\xE8}B\0 B\0? A\xC0j )\xD8B\x86 )\xD0B?\x88\x84"B\0 B\0? A\xB0jB\0 )\xC8}B\0 B\0? A\xA0j B\0 )\xB8B\x86 )\xB0B?\x88\x84B}"B\0? A\x90j B\x86B\0 B\0? A\xF0\0j B\0B\0 )\xA8 )\xA0" )\x98|" T\xAD| BV\xAD|}B\0? A\x80jB }B\0 B\0?  \b \x07kj"\bA\xFF\xFF\0j!~ )p"B\x86"\r )\x88"B\x86 )\x80B?\x88\x84|"B\xE7\xEC\0}"B \x88" 
B\x80\x80\x80\x80\x80\x80\xC0\0\x84"B\x86"B \x88"~" B\x86"B \x88"\v  V\xAD \r V\xAD )xB\x86 B?\x88\x84 B?\x88|||B}"B \x88"~|"\r T\xAD \r \r B\xFF\xFF\xFF\xFF\x83" B?\x88" 
B\x86\x84B\xFF\xFF\xFF\xFF\x83"
~|"\rV\xAD|  ~|  ~" 
 ~|" T\xADB \x86 B \x88\x84| \r B \x86|" \rT\xAD|   B\xFF\xFF\xFF\xFF\x83" 
~"\r  \v~|" \rT\xAD    B\xFE\xFF\xFF\xFF\x83"\r~|"V\xAD||"V\xAD|   ~" \r ~|"  
~|"
 \v ~|"B \x88 
 V\xAD  T\xAD  
V\xAD||B \x86\x84|" T\xAD|     \r~"
 \v ~|"B \x88  
T\xADB \x86\x84|"
 T\xAD 
 
 B \x86|"
V\xAD||"V\xAD|   
 B \x86" \r ~| T\xADB\x7F\x85"V  
Rq\xAD|"V\xAD|"B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0X@  \x84! A\xD0\0j  B\x80\x80\x80\x80\x80\x80\xC0\0T"\x07\xAD"\v\x86"
  \v\x86 B\x88 \x07A?s\xAD\x88\x84"  ? \bA\xFE\xFF\0j  \x07\x1BAk! B1\x86 )X} )P"B\0R\xAD}!\vB\0 }\f\v A\xE0\0j B?\x86 B\x88\x84"
 B\x88"  ? B0\x86 )h} )\`"B\0R\xAD}!\v !B\0 }\v! A\xFF\xFFN@ \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v~ A\0J@ \vB\x86 B?\x88\x84! B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \xADB0\x86\x84!\v B\x86\f\v A\x8F\x7FL@B\0!\f\v A@k 
 A k\x84 A0j   A\xF0\0jF A j   )@"
 )H"\v? )8 )(B\x86 ) "B?\x88\x84} )0" B\x86"T\xAD}!  }\v! Aj  BB\0?   BB\0? \v 
  
B\x83" |"T   T\xAD|" V  Q\x1B\xAD|" 
T\xAD|"   B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T  )V  )"V  Q\x1Bq\xAD|"V\xAD|"  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T  )\0V  )\b"V  Q\x1Bq\xAD|" T\xAD| \f\x84!\f\v \0 7\0 \0 \f7\b A\xD0j$\0\v\xBF\x7F#\0A\xD0\0k"$\0@ A\x80\x80N@ A j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF\xFF\09 )(! ) ! A\xFF\xFFI@ A\xFF\xFF\0k!\f\v Aj  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF\xFF\09A\xFD\xFF  A\xFD\xFFO\x1BA\xFE\xFFk! )! )!\f\v A\x81\x80\x7FJ\r\0 A@k  B\0B\x80\x80\x80\x80\x80\x80\x8099 )H! )@! A\xF4\x80~K@ A\x8D\xFF\0j!\f\v A0j  B\0B\x80\x80\x80\x80\x80\x80\x8099A\xE8\x81}  A\xE8\x81}M\x1BA\x9A\xFEj! )8! )0!\v   B\0 A\xFF\xFF\0j\xADB0\x869 \0 )\b7\b \0 )\x007\0 A\xD0\0j$\0\v\xC0\x7F~A\x7F!@ \0B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Rq\r\0 \0  \x84\x84P@A\0\v  \x83B\0Y@  R  Sq\r \0  \x85\x84B\0R\v \0B\0R  U  Q\x1B\r\0 \0  \x85\x84B\0R!\v \v8\0 \0A\xD0k \0 \0A\x93\xF1\xFF\xFF\x07J\x1B"\0Aq@A\0\v \0A\xECj"\0A\xE4\0o@A\v \0A\x90oE\v\xB5\x7F~#\0A\x80k"
$\0 @\x7F@@\x7F@@@ -\0\0"A%G@ \r \v\f\x07\vA\0!A!\b@ -\0"\x07A-k\0\v \x07A\xDF\0F\r \x07\r\v \0 \vj :\0\0 \vAj\f\v \x07! -\0!\x07A!\b\vA\0!@\x7F  \bj \x07"A+Fj"\b,\0\0A0kA	M@ 
A\fj!B\0!A\0!\fA\0!B\xFF\xFF\xFF\xFF!#\0Ak"\r$\0@ \b-\0\0"	E@ \b!\f\v \b!@@ 	\xC0"A F A	kAIrE\r -\0!	 Aj! 	\r\0\v\f\v@ 	A\xFFq"A+k\0\0\vA\x7FA\0 A-F\x1B!\f Aj!\vA\0!@@@ -\0\0"\x07A0k"	A\xFFqA
I\r\0 \x07A\xE1\0kA\xFFqAM@ \x07A\xD7\0k!	\f\v \x07A\xC1\0kA\xFFqAK\r \x07A7k!	\v 	A\xFFqA
O\r\0 \rB
B\0 B\0?A!\x07@ \r)\bB\0R\r\0 B
~" 	\xADB\xFF\x83"B\x7F\x85V\r\0  |!A! !\x07\v Aj! \x07!\f\v\v @   \b \x1B6\0\v@@@ @A\xE8\xE0A\xC4\x006\0A\0!\fB\xFF\xFF\xFF\xFF!\f\v B\xFF\xFF\xFF\xFFT\r\v@ \f\r\0\v B\xFF\xFF\xFF\xFFX\r\0A\xE8\xE0A\xC4\x006\0\f\v  \f\xAC"\x85 }!\v \rAj$\0 \xA7! 
(\f\f\v 
 \b6\fA\0! \b\v"\x07-\0\0"A\xC3\0k"	AK\r\0A 	tA\x99\x80\x80qE\r\0 "\r\0 \x07 \bG!\v\x7F@ A\xCF\0F\r\0 A\xC5\0F\r\0 \x07\f\v \x07-\0! \x07Aj\v! 
Aj!\x07 !\bA\0!#\0A\xD0\0k"	$\0A\xC0	!\fA0!A\xA8\x80\b!\r@ 
\x7F@@@@@@@\x7F@@@@@@@@@~@@@@@@@@@@@@@@@@@@@@@@@@@@ \xC0"A%kV!---------------------------'-\x07\b	
---\r---- ------\0&-\b-\v--\f--%-\x1B-\v ("AM\r"\f*\v ("AK\r) A\x87\x80\bj\f"\v ("A\vK\r( A\x8E\x80\bj\f!\v ("A\vK\r' A\x9A\x80\bj\f \v 4B\xEC|B\xE4\0\x7F!\f#\vA\xDF\0!\v 4\f!\f!\vA\xC7!\f\f\v 4"B\xEC|!@ ("AL@  B\xEB| \xE6AF\x1B!\f\v A\xE9I\r\0 B\xED|  \xE6AF\x1B!\v A\xE7\0F\r\f \v 4\b!\f\vA! (\b"E@B\f!\f \v \xAC"B\f}  A\fJ\x1B!\f\v (Aj\xAC!A!\f\v (Aj\xAC!\f\x1B\v 4!\f\v 
A6|A\xF4!\f\vA\xA7\x80\bA\xA6\x80\b (\bA\vJ\x1B\f\vA\x86!\f\f\vA\0!\rA\0!#\0Ak"$\0 4!~ ("\fA\fO@ \f \fA\fm"A\flk"A\fj  A\0H\x1B!\f  Auj\xAC |!\v A\fj! B}B\x88X@ \xA7"\rA\xC4\0kAu!@ \x7F \rAqE@ Ak! E\rA\f\v E\rA\0\v6\0\v \rA\x80\xE7\x84l A\x80\xA3ljA\x80\xD6\xAF\xE3\x07j\xAC\f\v B\xE4\0}" B\x90\x7F"B\x90~}"B?\x87\xA7 \xA7j!@@@ \xA7"A\x90j  B\0S\x1B"\x7F\x7F A\xC8N@ A\xACO@A!\r A\xACk\f\vA!\r A\xC8k\f\v A\xE4\0k  A\xE3\0J"\r\x1B\v"\rA\0A\v! \r\f\v Av! AqE! E\r\v  6\0\v B\x80\xE7\x84~  \rAl A\xE1\0ljj k\xACB\x80\xA3~|B\x80\xAA\xBA\xC3|\v! \fAtA\xF0\xDEj(\0"A\x80\xA3j  (\f\x1B  \fAJ\x1B! (\f! 4\b! 4! 4\0 Aj$\0  \xAC| Ak\xACB\x80\xA3~| B\x90~| B<~|| 4$}\f\b\v 4\0!\f\v 
A6|A\xF6!\f\vA\xF3!\f\f\v ("A\x07 \x1B\xAC\f\v ( (kA\x07jA\x07n\xAD!\f\v ( (AjA\x07pkA\x07jA\x07n\xAD!\f\v \xE6\xAD!\f\v 4\v!A!\f\vA\xA9\x80\b!\r\f
\vA\xAA\x80\b!\r\f	\v 4B\xEC|B\xE4\0\x81" B?\x87"\x85 }!\f
\v 4"B\xEC|! B\xA4?S\r
 	 70 
 \x07A\x85 	A0j\x816| \x07!\f\v ( A\0H@ 
A\x006|A\xF7!\f\v 	 ($"A\x90m"A\xE4\0l  A\x90lk\xC1A<m\xC1j6@ 
 \x07A\x8B 	A@k\x816| \x07!\f\r\v ( A\0H@ 
A\x006|A\xF7!\f\r\v ((A\xE8\xFF(\0E@A\xE0\xFFA\xE4\xFFA\x80\x80A\xA0\x80A\xEC\xFFA\xA0\x806\0A\xE8\xFFA\x80\x806\0\v\f\v\v 
A6|A\xE2!\f\v\v B\xE4\0\x81!\f\v A\x80\x80\br\v \xEB\f\x07\vA\xAB\x80\b!\r\v \r \xEB!\f\v 
 \x07A\xE4\0 \f  \xEA"6| \x07A\0 \x1B!\f\vA!\f\vA!\v@ \b  \b\x1B"A\xDF\0G@ A-G\r 	 7 
 \x07A\x86 	Aj\x816| \x07!\f\v 	 7( 	 6  
 \x07A\xFF 	A j\x816| \x07!\f\v 	 7\b 	 6\0 
 \x07A\xF8 	\x816| \x07!\f\vA\xEB\v"\x8D6|\v 	A\xD0\0j$\0 E\r@ E@ 
(|!\b\f\v\x7F@@ -\0\0"A+k\0\0\v 
(|\f\v -\0! Aj! 
(|Ak\v!\b@ A\xFFqA0G\r\0@ ,\0"\x07A0kA	K\r Aj! \bAk!\b \x07A0F\r\0\v\v 
 \b6|A\0!@ "\x07Aj!  \x07j,\0\0A0kA
I\r\0\v  \b \b I\x1B!@ \0 \vj (A\x94qH\x7FA- A+G\r  \bk \x07jAA 
(\f-\0\0A\xC3\0F\x1BI\rA+\v:\0\0 Ak! \vAj!\v\v  \bM\r\0  \vM\r\0@ \0 \vjA0:\0\0 \vAj!\v Ak" \bM\r  \vK\r\0\v\v 
 \b  \vk"\x07 \x07 \bK\x1B"\x076| \0 \vj  \x07j 
(| \vj\v!\v Aj!  \vK\r\v\v Ak \v  \vF\x1B!\vA\0\v! \0 \vjA\0:\0\0\v 
A\x80j$\0 \v\xBC\x7F \0AF@A\xD7A\x93 (\0\x1B\v \0Au!@ \0A\xFF\xFFq"A\xFF\xFFG\r\0 AJ\r\0  Atj(\0"\0A\bjA\xA2 \0\x1B\vA\xF7!\0@\x7F@@@ Ak\0\v AK\rA\xA0\xDF\f\v A1K\rA\xB0\xDF\f\v AK\rA\xF0\xE1\v!\0 E\r\0@ \0"Aj!\0 -\0\0\r\0 Ak"\r\0\v\v \0\v\xB2
\x7F@@@@ Ak!\b A\fk!\v A\bk!\f@@@@@@  \0"kAu"\0\x07\x07\0\v Ak"\0(\0 (\0*E\r (\0!\f\x07\v ( (\0* Ak"\0(\0 (*!E@ E\r (!  \0(\x006 \0 6\0 ( (\0*E\r\f\b\v (\0! @\f\x07\v (!  6  6\0 \0(\0 *E\r (!  \0(\x006 \0 6\0\v  Aj A\bj A\fj\xCA Ak"\0(\0 (\f*E\r (\f!  \0(\x006\f \0 6\0 (\f (\b*E\r (\b!\0  (\f"6\b  \x006\f  (*E\r (\b!\0  (6\b  \x006 \0 (\0*E\r\f\v \0AL@  F Aj" Fr!\0 Aq@ \0\r !@  ( (\0*@ (!  (\x006\x7F   F\r\0@@  Ak"(\0*E\r  (\x006\0 " G\r\0\v \f\v \v 6\0\v"Aj" G\r\0\v\f\v \0\r@ ( (\0*@ (\0!\0 !@  "(\x006\0 \0 Ak"(\0*\r\0\v  \x006\0\v "Aj" G\r\0\v\f\v E@  F\r \0AkAv"!@@  "I\r\0 At"Ar! \0 Aj"K@    Atj(\0  Atj(\0*\x1B!\v  Atj(\0  Atj"(\0*\r\0 (\0!\x07 !@@  Atj  "Atj"
(\x006\0  H\r\0 At"	Ar! \0 	Aj"	J@ 	   Atj(\0  	Atj(\0*\x1B!\v  Atj(\0 \x07*E\r\v\v 
 \x076\0\v Ak! \r\0\v@ \0"AkAv!	 (\0!\x07A\0! !\0@ At"
Ar! \0 Atj"Aj!@  
Aj"
L@ !\f\v 
  (\0 A\bj"(\0*"
\x1B!   
\x1B!\v \0 (\x006\0 !\0  	L\r\0\v@ Ak" F@  \x076\0\f\v  (\x006\0  \x076\0  kAjAu"\0AH\r\0  \0AkAv"Atj"\0(\0 (\0*E\r\0 (\0!@@  \0"(\x006\0 E\r\0  AkAv"Atj"\0(\0 *\r\v\v  6\0\v Ak!\0 AJ\r\0\v\f\v  \0AtA|qj!@ \0A\x81O@ (\0 (\0*!\0 \b(\0 (\0*!@ \0E@ E\r (\0!\0  \b(\x006\0 \b \x006\0 (\0 (\0*E\r (\0!\0  (\x006\0  \x006\0\f\v (\0!\0 @  \b(\x006\0 \b \x006\0\f\v  (\x006\0  \x006\0 \b(\0 \0*E\r\0 (\0!\0  \b(\x006\0 \b \x006\0\v Ak"\x07(\0 (*!\0 \f(\0 \x07(\0*!@ \0E@ E\r \x07(\0!\0 \x07 \f(\x006\0 \f \x006\0 \x07(\0 (*E\r (!\0  \x07(\x006 \x07 \x006\0\f\v (!\0 @  \f(\x006 \f \x006\0\f\v  \x07(\x006 \x07 \x006\0 \f(\0 \0*E\r\0 \x07(\0!\0 \x07 \f(\x006\0 \f \x006\0\v ( (\b*!\0 \v(\0 (*!@ \0E@ E\r (!\0  \v(\x006 \v \x006\0 ( (\b*E\r (\b!\0  (6\b  \x006\f\v (\b!\0 @  \v(\x006\b \v \x006\0\f\v  (6\b  \x006 \v(\0 \0*E\r\0 (!\0  \v(\x006 \v \x006\0\v (\0 \x07(\0*!\0 ( (\0*!@@ \0E@ (\0!\0 E\r (!  \x006  6\0  \x07(\0* (\0!E@ !\0\f\v \x07(\0!\0 \x07 6\0\f\v \x07(\0!\0 @ \x07 (6\0  \x006 (\0!\0\f\v \x07 (\x006\0  \x006\0 ( \0* (\0!E@ !\0\f\v (!\0  6\v  \x006\0\v (\0!  \x006\0  6\0\f\v (\0 (\0* \b(\0 (\0*!E@ E\r (\0!\0  \b(\x006\0 \b \x006\0 (\0 (\0*E\r (\0!\0  (\x006\0  \x006\0\f\v (\0!\0 @  \b(\x006\0 \b \x006\0\f\v  (\x006\0  \x006\0 \b(\0 \0*E\r\0 (\0!\0  \b(\x006\0 \b \x006\0\v Ak! (\0!@ Aq"\r\r\0 Ak(\0 * (\0!\r\0 !\0@  \b(\0*@@ \0"Aj!\0  (*E\r\0\f\v\0\v@ \0Aj"\0 O\r  \0(\0*E\r\0\v\v " \0K@@  Ak"(\0*\r\0\v\v \0 I@@ \0(\0! \0 (\x006\0  6\0@ \0"Aj!\0  (*E\r\0\v@  Ak"(\0*\r\0\v \0 I\r\0\v\v \0Ak" G@  (\x006\0\v  6\0A\0!\f\v !\x07@ \x07"Aj!\x07 ( *\r\0\v !	@  F@@ \x07 	O\r 	Ak"	(\0 *E\r\0\f\v\0\v@ 	Ak"	(\0 *E\r\0\v\v 	!
 	 \x07"\0K@@ \0(\0! \0 
(\x006\0 
 6\0@ \0"Aj!\0 ( *\r\0\v@ 
Ak"
(\0 *E\r\0\v \0 
I\r\0\v\v  G@  (\x006\0\v  6\0 \x07 	O@  \xA6! Aj"\0 \xA6@ ! !\0 E\r\f\v \r\v    \r\xEC Aj!\0A\0!\f\v\v\v  Aj A\bj Ak\xCA\v\v  \0(\x006\0 \0 6\0\v  )\0B \x897\0\v\xB6\b\x7F~#\0A k"$\0@ \0-\x004AF@ \0(0!\x07 E\r \0A\0:\x004 \0A\x7F60\f\v@ \0\x7F \0-\x005AF@A\x7F!\x07A\xF0\xAD(\0"!\b \0( "(HA\0L@ (\x88E@ A\xE0\xD9A\xC8\xD9 (\0\x1B6\x88\v (HE@ A6H\v\vA\xF0\xAD (\x886\0#\0A k"$\0@@@ (" (\b"F\r\0 Aj   k\xF2"A\x7FF\r\0  (A  AM\x1Bj6\f\v B\x007A\0!@ !@ (" (\bG@  Aj6  -\0\0:\0\f\v  \xBB":\0 A\0N\r\0A\x7F! AqE\r  (\0A r6\0A\xE8\xE0A6\0\f\vA! Aj AjA Aj\x9A"	A~F\r\0\vA\x7F! 	A\x7FG\r\0 AqE\r  (\0A r6\0 -\0 \x82\f\v (!\v A j$\0A\xF0\xAD \b6\0 "A\x7FG@  6\v A\x7FF\r (" \r  \0( \xF3!\0A\x7F ( \0A\x7FF\x1B!\x07\f\vA \0(," AL\x1B!@  G@A\x7F!\x07 \0( \x9B"A\x7FF\r Aj j :\0\0 Aj!\f\v\v Aj!@@@ \0((")\0!
A\x7F!\x07@ \0($"  Aj"  j" Aj Aj  A\fj (\0(\v\0Ak\0\v \0(( 
7\0 A\bF\r \0( \x9B"A\x7FF\r  :\0\0 Aj!\f\v\v  ,\06\v E@@ A\0L\r Ak" Ajj,\0\0 \0( \x82A\x7FG\r\0\f\v\0\v (\v"\x0760\f\v (!\x07\v A j$\0 \x07\v	\0 \0\xEC#\v\x84\x7F#\0Ak"$\0 Aj!@@ \0($" \0(( A\bj"  Aj (\0(\x07\0!A\x7F! A ( k" \0( z G\r@ Ak\0\v\vA\x7FA\0 \0( \xC3\x1B!\v Aj$\0 \v\xC7\x7F~#\0A k"$\0@ \0-\x004AF@ \0(0! E\r \0A\0:\x004 \0A\x7F60\f\v \0-\x005AF@A\x7F! \0( \x9B"A\x7FG@  :\0\v A\x7FF\r -\0! E@  \0( \x82A\x7FF\r -\0!\f\v \0 60 !\f\vA \0(," AL\x1B!@  G@A\x7F! \0( \x9B"A\x7FF\r Aj j :\0\0 Aj!\f\v\v Aj!@@@ \0((")\0!\bA\x7F!@ \0($"\x07  Aj"  j" Aj Aj  A\fj \x07(\0(\v\0Ak\0\v \0(( \b7\0 A\bF\r \0( \x9B"\x07A\x7FF\r  \x07:\0\0 Aj!\f\v\v  -\0:\0\v@ E@@ A\0L\r Ak" Ajj-\0\0 \0( \x82A\x7FG\r\0\f\v\0\v \0 -\0"60\f\v -\0!\v A j$\0 \v	\0 \0\xF1#\v\xBC\x7F E@A\0\v\x7F@ E\r\0 -\0\0"\xC0"A\0N@ \0@ \0 6\0\v A\0G\vA\xF0\xAD(\0(\0E@A \0E\r \0 A\xFF\xBFq6\0A\v A\xC2k"A2K\r\0 At(\x80\xDA! AM@  AlAktA\0H\r\v -\0"Av"Ak  AujrA\x07K\r\0 A\x80k Atr"A\0N@A \0E\r \0 6\0A\v -\0A\x80k"A?K\r\0  At"r! A\0N@A \0E\r \0 6\0A\v -\0A\x80k"A?K\r\0A \0E\r \0  Atr6\0A\vA\xE8\xE0A6\0A\x7F\v\v\x89\x7F#\0Ak"$\0A\xF0\xAD(\0"! (HA\0L@ (\x88E@ A\xE0\xD9A\xC8\xD9 (\0\x1B6\x88\v (HE@ A6H\v\vA\xF0\xAD (\x886\0 (E@ \xC2 (E!\vA\x7F!@ \0A\x7FF\r\0 \r\0 A\fj \0\xC6"A\0H\r\0 (" (, jA\bkI\r\0@ \0A\xFF\0M@  Ak"6  \0:\0\0\f\v   k"6  A\fj j\v  (\0Aoq6\0 \0!\vA\xF0\xAD 6\0 Aj$\0 \v?\0 \0A\x006 \0 6 \0A\x006\f \0B\x82\xA0\x80\x80\xE0\x007 \0 E6 \0A jA\0A(\xFC\v\0 \0Aj\xDB\v!\0 \0  \0(Er"6 \0( q@\xF8\0\v\vK\x7F \0(\0"@\x7F (\f" (F@  (\0($\0\0\f\v (\0\vA\x7FG@ \0(\0E\v \0A\x006\0\vA\vK\x7F \0(\0"@\x7F (\f" (F@  (\0($\0\0\f\v -\0\0\vA\x7FG@ \0(\0E\v \0A\x006\0\vA\v)\0 \0  k"\xBC!\0 @ \0  \xFC
\0\0\v \0 jA\0:\0\0\v*\0 \0A\xC8\xD36\0 \0Aj\xDB \0B\x007 \0B\x007 \0B\x007\b \0\v_\x7F@ \0(\0"E\r\0\x7F (" (F@  A\xFFq (\0(4\0\f\v  :\0\0  (Aj6 A\xFFq\vA\x7FG\r\0 \0A\x006\0\v\v\0 \0 \0(\0A\fk(\0j\xEE\v\0 \0 \0(\0A\fk(\0j"\0Ajx \0\v\0 \0 \0(\0A\fk(\0j\xF0\v\0 \0 \0(\0A\fk(\0j"\0A\bjx \0\v\f\0 \0A\bjx \0\v\0A\x7F\v\0 \0B\x7F7\b \0B\x007\0\v\0 \0B\x7F7\b \0B\x007\0\v\0 \0\vW\x7F \0(" \0(I\x7F@  (\0(\0\0\0 Aj" \0(I\r\0\v \0( \v# \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v*\0 \0A\xB8\xD26\0 \0Aj\xDB \0B\x007 \0B\x007 \0B\x007\b \0\vh\x7F#\0Ak"$\0 A\0:\0  \0kAu! (\0!@ @  Av"A\x7Fsj  \0 Atj"(\0 I"\x1B! Aj \0 \x1B!\0\f\v\v Aj$\0 \0\v\xAD\v\x07\x7F \0 j!@@ \0("Aq\r\0 AqE\r \0(\0" j!@@@ \0 k"\0A\xB8\xE2(\0G@ \0(\f! A\xFFM@  \0(\b"G\rA\xA4\xE2A\xA4\xE2(\0A~ Avwq6\0\f\v \0(! \0 G@ \0(\b" 6\f  6\b\f\v \0("\x7F \0Aj \0("E\r \0Aj\v!@ !\x07 "Aj! ("\r\0 Aj! ("\r\0\v \x07A\x006\0\f\v ("AqAG\rA\xAC\xE2 6\0  A~q6 \0 Ar6  6\0\v  6\f  6\b\f\vA\0!\v E\r\0@ \0("At"(\xD4\xE4 \0F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ wq6\0\f\v@ \0 (F@  6\f\v  6\v E\r\v  6 \0("@  6  6\v \0("E\r\0  6  6\v@@@@ ("AqE@A\xBC\xE2(\0 F@A\xBC\xE2 \x006\0A\xB0\xE2A\xB0\xE2(\0 j"6\0 \0 Ar6 \0A\xB8\xE2(\0G\rA\xAC\xE2A\x006\0A\xB8\xE2A\x006\0\vA\xB8\xE2(\0"\b F@A\xB8\xE2 \x006\0A\xAC\xE2A\xAC\xE2(\0 j"6\0 \0 Ar6 \0 j 6\0\v Axq j! (\f! A\xFFM@ (\b" F@A\xA4\xE2A\xA4\xE2(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "Aj! ("\r\0 Aj! ("\r\0\v \x07A\x006\0\f\v  A~q6 \0 Ar6 \0 j 6\0\f\vA\0!\v E\r\0@ ("At"(\xD4\xE4 F@ A\xD4\xE4j 6\0 \rA\xA8\xE2A\xA8\xE2(\0A~ wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("@  6  6\v ("E\r\0  6  6\v \0 Ar6 \0 j 6\0 \0 \bG\r\0A\xAC\xE2 6\0\v A\xFFM@ A\xF8qA\xCC\xE2j!\x7FA\xA4\xE2(\0"A Avt"qE@A\xA4\xE2  r6\0 \f\v (\b\v!  \x006\b  \x006\f \0 6\f \0 6\b\vA! A\xFF\xFF\xFF\x07M@ A& A\bvg"kvAq AtrA>s!\v \0 6 \0B\x007 AtA\xD4\xE4j!@@A\xA8\xE2(\0"A t"\x07qE@A\xA8\xE2  \x07r6\0  \x006\0 \0 6\f\v A AvkA\0 AG\x1Bt! (\0!@ "(Axq F\r Av! At!  Aqj"\x07("\r\0\v \x07 \x006 \0 6\v \0 \x006\f \0 \x006\b\v (\b" \x006\f  \x006\b \0A\x006 \0 6\f \0 6\b\v\v)\0  (\0A\x07jAxq"Aj6\0 \0 )\0 )\b\xF29\0\v\xB9\x7F|~#\0A\xB0k"\f$\0 \fA\x006\xAC@ \xBD"B\0S@A!A\xDA	! \x9A"\xBD!\f\v A\x80q@A!A\xDD	!\f\vA\xE0	A\xDB	 Aq"\x1B! E!\v@ B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0Q@ \0A   Aj" A\xFF\xFF{qG \0  C \0A\xE8\rA\xFC A q"\x1BA\xD8A\x9E \x1B  b\x1BAC \0A    A\x80\xC0\0sG    J\x1B!
\f\v \fA\x90j!@@@  \fA\xACj\x8D" \xA0"D\0\0\0\0\0\0\0\0b@ \f \f(\xAC"Ak6\xAC A r"A\xE1\0G\r\f\v A r"A\xE1\0F\r \f(\xAC!
\f\v \f Ak"
6\xAC D\0\0\0\0\0\0\xB0A\xA2!\vA  A\0H\x1B!\v \fA\xE8A\0 
A\0N\x1Bj"\r!\x07@ \x07 \xFC"6\0 \x07Aj!\x07  \xB8\xA1D\0\0\0\0e\xCD\xCDA\xA2"D\0\0\0\0\0\0\0\0b\r\0\v@ 
A\0L@ 
!	 \x07! \r!\b\f\v \r!\b 
!	@A 	 	AO\x1B!@ \x07Ak" \bI\r\0 \xAD!\x1BB\0!@  5\0 \x1B\x86 |" B\x80\x94\xEB\xDC\x80"B\x80\x94\xEB\xDC~}>\0 Ak" \bO\r\0\v B\x80\x94\xEB\xDCT\r\0 \bAk"\b >\0\v@ \b \x07"I@ Ak"\x07(\0E\r\v\v \f \f(\xAC k"	6\xAC !\x07 	A\0J\r\0\v\v 	A\0H@ \vAjA	nAj! A\xE6\0F!@A	A\0 	k" A	O\x1B!@  \bM@A\0A \b(\0\x1B!\x07\f\vA\x80\x94\xEB\xDC v!A\x7F tA\x7Fs!A\0!	 \b!\x07@ \x07 	 \x07(\0" vj6\0  q l!	 \x07Aj"\x07 I\r\0\vA\0A \b(\0\x1B!\x07 	E\r\0  	6\0 Aj!\v \f \f(\xAC j"	6\xAC \r \x07 \bj"\b \x1B" Atj   kAu J\x1B! 	A\0H\r\0\v\vA\0!	@  \bM\r\0 \r \bkAuA	l!	A
!\x07 \b(\0"A
I\r\0@ 	Aj!	  \x07A
l"\x07O\r\0\v\v \v 	A\0 A\xE6\0G\x1Bk A\xE7\0F \vA\0Gqk"  \rkAuA	lA	kH@ \fA\x84\`A\xECc 
A\0H\x1Bj A\x80\xC8\0j"A	m"Atj!
A
!\x07  A	lk"A\x07L@@ \x07A
l!\x07 Aj"A\bG\r\0\v\v@ 
(\0"  \x07n" \x07lk"E 
Aj" Fq\r\0@ AqE@D\0\0\0\0\0\0@C! \x07A\x80\x94\xEB\xDCG\r \b 
O\r 
Ak-\0\0AqE\r\vD\0\0\0\0\0@C!\vD\0\0\0\0\0\0\xE0?D\0\0\0\0\0\0\xF0?D\0\0\0\0\0\0\xF8?  F\x1BD\0\0\0\0\0\0\xF8?  \x07Av"F\x1B  K\x1B!@ \r\0 -\0\0A-G\r\0 \x9A! \x9A!\v 
  k"6\0  \xA0 a\r\0 
  \x07j"6\0 A\x80\x94\xEB\xDCO@@ 
A\x006\0 \b 
Ak"
K@ \bAk"\bA\x006\0\v 
 
(\0Aj"6\0 A\xFF\x93\xEB\xDCK\r\0\v\v \r \bkAuA	l!	A
!\x07 \b(\0"A
I\r\0@ 	Aj!	  \x07A
l"\x07O\r\0\v\v 
Aj"   I\x1B!\v@ " \bM"\x07E@ Ak"(\0E\r\v\v@ A\xE7\0G@ A\bq!\f\v 	A\x7FsA\x7F \vA \v\x1B" 	J 	A{Jq"\x1B j!\vA\x7FA~ \x1B j! A\bq"\r\0Aw!@ \x07\r\0 Ak(\0"
E\r\0A
!A\0! 
A
p\r\0@ "\x07Aj! 
 A
l"pE\r\0\v \x07A\x7Fs!\v  \rkAuA	l!\x07 A_qA\xC6\0F@A\0! \v  \x07jA	k"A\0 A\0J\x1B"  \vJ\x1B!\v\f\vA\0! \v \x07 	j jA	k"A\0 A\0J\x1B"  \vJ\x1B!\v\vA\x7F!
 \vA\xFD\xFF\xFF\xFF\x07A\xFE\xFF\xFF\xFF\x07  \vr"\x1BJ\r \v A\0GjAj!@ A_q"\x07A\xC6\0F@ 	 A\xFF\xFF\xFF\xFF\x07sJ\r 	A\0 	A\0J\x1B!\f\v  	 	Au"s k\xAD \x8C"kAL@@ Ak"A0:\0\0  kAH\r\0\v\v Ak" :\0\0 AkA-A+ 	A\0H\x1B:\0\0  k" A\xFF\xFF\xFF\xFF\x07sJ\r\v  j" A\xFF\xFF\xFF\xFF\x07sJ\r \0A    j"
 G \0  C \0A0  
 A\x80\x80sG@@@ \x07A\xC6\0F@ \fA\x90jA	r! \r \b \b \rK\x1B"!\b@ \b5\0 \x8C!@  \bG@  \fA\x90jM\r@ Ak"A0:\0\0  \fA\x90jK\r\0\v\f\v  G\r\0 Ak"A0:\0\0\v \0   kC \bAj"\b \rM\r\0\v @ \0A\xE9AC\v \b O\r \vA\0L\r@ \b5\0 \x8C" \fA\x90jK@@ Ak"A0:\0\0  \fA\x90jK\r\0\v\v \0 A	 \v \vA	N\x1BC \vA	k! \bAj"\b O\r \vA	J !\v\r\0\v\f\v@ \vA\0H\r\0  \bAj \b I\x1B! \fA\x90jA	r!\r \b!\x07@ \r \x075\0 \r\x8C"F@ Ak"A0:\0\0\v@ \x07 \bG@  \fA\x90jM\r@ Ak"A0:\0\0  \fA\x90jK\r\0\v\f\v \0 AC Aj!  \vrE\r\0 \0A\xE9AC\v \0  \r k" \v  \vH\x1BC \v k!\v \x07Aj"\x07 O\r \vA\0N\r\0\v\v \0A0 \vAjAA\0G \0   kC\f\v \v!\v \0A0 A	jA	A\0G\v \0A   
 A\x80\xC0\0sG  
  
J\x1B!
\f\v  AtAuA	qj!	@ A\fK\r\0 	-\0\0D\0\0\0\0\0\0\xF0?A4 Atkq!A-F@  \x9A \xA1\xA0\x9A!\f\v  \xA0 \xA1!\v  \f(\xAC"\x07 \x07Au"s k\xAD \x8C"F@ Ak"A0:\0\0 \f(\xAC!\x07\v A q!\r Ak"\v Aj:\0\0 AkA-A+ \x07A\0H\x1B:\0\0 A\bqE A\0Lq!\b \fA\x90j!\x07@ \x07" \xFC"A\xE0\xCEj-\0\0 \rr:\0\0  \xB7\xA1D\0\0\0\0\0\x000@\xA2!@ \x07Aj"\x07 \fA\x90jkAG\r\0 D\0\0\0\0\0\0\0\0a \bq\r\0 A.:\0 Aj!\x07\v D\0\0\0\0\0\0\0\0b\r\0\vA\x7F!
 A\xFB\xFF\xFF\xFF\x07   \vk"\bjkJ\r\0 \0A   Aj \x07 \fA\x90j"k"\r \rAk H\x1B \r \x1B" \b Ar"jj"\x07 G \0 	 C \0A0  \x07 A\x80\x80sG \0  \rC \0A0  \rkA\0A\0G \0 \v \bC \0A   \x07 A\x80\xC0\0sG  \x07  \x07J\x1B!
\v \fA\xB0j$\0 
\v\xBA\0@@@@@@@@@@@ A	k\0\b	
\b	
	

\b	\x07\v  (\0"Aj6\0 \0 (\x006\0\v  (\0"Aj6\0 \0 2\x007\0\v  (\0"Aj6\0 \0 3\x007\0\v  (\0"Aj6\0 \0 0\0\x007\0\v  (\0"Aj6\0 \0 1\0\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 +\x009\0\v \0 \x88\v\v  (\0"Aj6\0 \0 4\x007\0\v  (\0"Aj6\0 \0 5\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 )\x007\0\vo\x7F \0(\0",\0\0A0k"A	K@A\0\v@A\x7F! A\xCC\x99\xB3\xE6\0M@A\x7F  A
l"j  A\xFF\xFF\xFF\xFF\x07sK\x1B!\v \0 Aj"6\0 ,\0 ! !A0k"A
I\r\0\v \v\xF9\x7F~#\0A@j"$\0  6< A)j! A'j! A(j!@@@@@A\0!@ !\v  \fA\xFF\xFF\xFF\xFF\x07sJ\r  \fj!\f@@@@ "-\0\0"	@@@@ 	A\xFFq"E@ !\f\v A%G\r !	@ 	-\0A%G@ 	!\f\v Aj! 	-\0 	Aj"!	A%F\r\0\v\v  \vk" \fA\xFF\xFF\xFF\xFF\x07s"J\r	 \0@ \0 \v C\v \r\x07  6< Aj!A\x7F!@ ,\0A0k"\bA	K\r\0 -\0A$G\r\0 Aj!A! \b!\v  6<A\0!
@ ,\0\0"	A k"AK@ !\b\f\v !\bA t"A\x89\xD1qE\r\0@  Aj"\b6<  
r!
 ,\0"	A k"A O\r \b!A t"A\x89\xD1q\r\0\v\v@ 	A*F@\x7F@ \b,\0A0k"A	K\r\0 \b-\0A$G\r\0\x7F \0E@  AtjA
6\0A\0\f\v  Atj(\0\v!\r \bAj!A\f\v \r \bAj! \0E@  6<A\0!A\0!\r\f\v  (\0"Aj6\0 (\0!\rA\0\v!  6< \rA\0N\rA\0 \rk!\r 
A\x80\xC0\0r!
\f\v A<j\x8B"\rA\0H\r
 (<!\vA\0!A\x7F!\x07\x7FA\0 -\0\0A.G\r\0 -\0A*F@\x7F@ ,\0A0k"\bA	K\r\0 -\0A$G\r\0 Aj!\x7F \0E@  \bAtjA
6\0A\0\f\v  \bAtj(\0\v\f\v \r Aj!A\0 \0E\r\0  (\0"\bAj6\0 \b(\0\v!\x07  6< \x07A\0N\f\v  Aj6< A<j\x8B!\x07 (<!A\v!@ !A!\b ",\0\0"A\xFB\0kAFI\r\v Aj! A:l jA\xCF\xCAj-\0\0"AkA\xFFqA\bI\r\0\v  6<@ A\x1BG@ E\r\f A\0N@ \0E@  Atj 6\0\f\f\v   Atj)\x0070\f\v \0E\r\b A0j  \x8A\f\v A\0N\r\vA\0! \0E\r\b\v \0-\0\0A q\r\v 
A\xFF\xFF{q"	 
 
A\x80\xC0\0q\x1B!
A\0!A\xD0	! !\b@@\x7F@@@@@@\x7F@@@@@@@ -\0\0"\xC0"ASq  AqAF\x1B  \x1B"A\xD8\0k!	
\0\v@ A\xC1\0k\x07\v\0\v A\xD3\0F\r\v\f\v )0!A\xD0	\f\vA\0!@@@@@@@ \b\0\v (0 \f6\0\f\x1B\v (0 \f6\0\f\v (0 \f\xAC7\0\f\v (0 \f;\0\f\v (0 \f:\0\0\f\v (0 \f6\0\f\v (0 \f\xAC7\0\f\vA\b \x07 \x07A\bM\x1B!\x07 
A\br!
A\xF8\0!\v ! A q!\v )0""B\0R@@ Ak" \xA7Aq-\0\xE0\xCE \vr:\0\0 B\x88"B\0R\r\0\v\v !\v P\r 
A\bqE\r AvA\xD0	j!A!\f\v ! )0""B\0R@@ Ak" \xA7A\x07qA0r:\0\0 B\x88"B\0R\r\0\v\v !\v 
A\bqE\r \x07  k"  \x07H\x1B!\x07\f\v )0"B\0S@ B\0 }"70A!A\xD0	\f\v 
A\x80q@A!A\xD1	\f\vA\xD2	A\xD0	 
Aq"\x1B\v!  \x8C!\v\v  \x07A\0Hq\r 
A\xFF\xFF{q 
 \x1B!
@ B\0R\r\0 \x07\r\0 !\vA\0!\x07\f\v \x07 P  \vkj"  \x07H\x1B!\x07\f\r\v -\x000!\f\v\v (0"A\xA4 \x1B"\vA\0A\xFF\xFF\xFF\xFF\x07 \x07 \x07A\xFF\xFF\xFF\xFF\x07O\x1B"\xF5" \vk  \x1B" \vj!\b \x07A\0N@ 	!
 !\x07\f\f\v 	!
 !\x07 \b-\0\0\r\f\v\v )0"B\0R\rA\0!\f	\v \x07@ (0\f\vA\0! \0A  \rA\0 
G\f\v A\x006\f  >\b  A\bj"60A\x7F!\x07 \v!	A\0!@@ 	(\0"\vE\r\0 Aj \v\xC5"\vA\0H\r \v \x07 kK\r\0 	Aj!	  \vj" \x07I\r\v\vA=!\b A\0H\r\f \0A  \r  
G E@A\0!\f\vA\0!\b (0!	@ 	(\0"\vE\r Aj"\x07 \v\xC5"\v \bj"\b K\r \0 \x07 \vC 	Aj!	  \bK\r\0\v\v \0A  \r  
A\x80\xC0\0sG \r   \rH\x1B!\f\b\v  \x07A\0Hq\r	A=!\b \0 +0 \r \x07 
  \x89"A\0N\r\x07\f
\v -\0!	 Aj!\f\0\v\0\v \0\r	 E\rA!@  Atj(\0"\0@  Atj \0 \x8AA!\f Aj"A
G\r\f\v\v\v A
O@A!\f\f
\v@  Atj(\0\rA!\f Aj"A
G\r\0\v\f	\vA!\b\f\v  :\0'A!\x07 !\v 	!
\v \x07 \b \vk"	 \x07 	J\x1B" A\xFF\xFF\xFF\xFF\x07sJ\rA=!\b \r  j"\x07 \x07 \rH\x1B" K\r \0A   \x07 
G \0  C \0A0  \x07 
A\x80\x80sG \0A0  	A\0G \0 \v 	C \0A   \x07 
A\x80\xC0\0sG (<!\f\v\v\vA\0!\f\f\vA=!\b\vA\xE8\xE0 \b6\0\vA\x7F!\f\v A@k$\0 \f\v\x7F\x7F~ \0\xBD"B4\x88\xA7A\xFFq"A\xFFG| E@  \0D\0\0\0\0\0\0\0\0a\x7FA\0 \0D\0\0\0\0\0\0\xF0C\xA2 \x8D!\0 (\0A@j\v6\0 \0\v  A\xFE\x07k6\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x87\x80\x7F\x83B\x80\x80\x80\x80\x80\x80\x80\xF0?\x84\xBF \0\v\vE| \0  \xA2"9\0   D\0\0\0\0\0\xA0A\xA2"  \xA1\xA0"\xA1" \xA2  \xA0 \xA2  \xA2 \xA1\xA0\xA09\0\v\xD5\x7F|~#\0A0k"	$\0@@@ \0\xBD"B \x88\xA7"A\xFF\xFF\xFF\xFF\x07q"A\xFA\xD4\xBD\x80M@ A\xFF\xFF?qA\xFB\xC3$F\r A\xFC\xB2\x8B\x80M@ B\0Y@  \0D\0\0@T\xFB!\xF9\xBF\xA0"\0D1cba\xB4\xD0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xD0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!\xF9?\xA0"\0D1cba\xB4\xD0=\xA0"9\0  \0 \xA1D1cba\xB4\xD0=\xA09\bA\x7F!\f\v B\0Y@  \0D\0\0@T\xFB!	\xC0\xA0"\0D1cba\xB4\xE0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xE0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!	@\xA0"\0D1cba\xB4\xE0=\xA0"9\0  \0 \xA1D1cba\xB4\xE0=\xA09\bA~!\f\v A\xBB\x8C\xF1\x80M@ A\xBC\xFB\xD7\x80M@ A\xFC\xB2\xCB\x80F\r B\0Y@  \0D\0\x000\x7F|\xD9\xC0\xA0"\0D\xCA\x94\x93\xA7\x91\xE9\xBD\xA0"9\0  \0 \xA1D\xCA\x94\x93\xA7\x91\xE9\xBD\xA09\bA!\f\v  \0D\0\x000\x7F|\xD9@\xA0"\0D\xCA\x94\x93\xA7\x91\xE9=\xA0"9\0  \0 \xA1D\xCA\x94\x93\xA7\x91\xE9=\xA09\bA}!\f\v A\xFB\xC3\xE4\x80F\r B\0Y@  \0D\0\0@T\xFB!\xC0\xA0"\0D1cba\xB4\xF0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xF0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!@\xA0"\0D1cba\xB4\xF0=\xA0"9\0  \0 \xA1D1cba\xB4\xF0=\xA09\bA|!\f\v A\xFA\xC3\xE4\x89K\r\v \0D\x83\xC8\xC9m0_\xE4?\xA2D\0\0\0\0\0\x008C\xA0D\0\0\0\0\0\x008\xC3\xA0"\xFC!@ \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0" D1cba\xB4\xD0=\xA2"\xA1"D-DT\xFB!\xE9\xBFc@ Ak! D\0\0\0\0\0\0\xF0\xBF\xA0"D1cba\xB4\xD0=\xA2! \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0!\f\v D-DT\xFB!\xE9?dE\r\0 Aj! D\0\0\0\0\0\0\xF0?\xA0"D1cba\xB4\xD0=\xA2! \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0!\v   \xA1"\x009\0@ Av" \0\xBDB4\x88\xA7A\xFFqkAH\r\0   D\0\0\`a\xB4\xD0=\xA2"\0\xA1" Dsp.\x8A\xA3;\xA2  \xA1 \0\xA1\xA1"\xA1"\x009\0  \0\xBDB4\x88\xA7A\xFFqkA2H@ !\f\v   D\0\0\0.\x8A\xA3;\xA2"\0\xA1" D\xC1I %\x9A\x83{9\xA2  \xA1 \0\xA1\xA1"\xA1"\x009\0\v   \0\xA1 \xA19\b\f\v A\x80\x80\xC0\xFF\x07O@  \0 \0\xA1"\x009\0  \x009\bA\0!\f\v 	Aj"A\br! B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07\x83B\x80\x80\x80\x80\x80\x80\x80\xB0\xC1\0\x84\xBF!\0A!@  \0\xFC\xB7"9\0 \0 \xA1D\0\0\0\0\0\0pA\xA2!\0 A\0! !\r\0\v 	 \x009 A!@ "Ak! 	Aj"\r Atj+\0D\0\0\0\0\0\0\0\0a\r\0\vA\0!#\0A\xB0k"$\0 AvA\x96\bk"AkAm"\bA\0 \bA\0J\x1B"\x07Ahl j!\vA\xD4\xFE\0(\0"\b Aj"Ak"
jA\0N@ \b j! \x07 
k!@ A\xC0j Atj A\0H|D\0\0\0\0\0\0\0\0 At(\xE0~\xB7\v9\0 Aj! Aj" G\r\0\v\v \vAk!A\0! \bA\0 \bA\0J\x1B! A\0L!\f@@ \f@D\0\0\0\0\0\0\0\0!\0\f\v  
j!A\0!D\0\0\0\0\0\0\0\0!\0@ \r Atj+\0 A\xC0j  kAtj+\0\xA2 \0\xA0!\0 Aj" G\r\0\v\v  Atj \x009\0  F Aj!E\r\0\vA/ \vk!A0 \vk! \x07AtA\xE0\xFE\0j! \b!@@  Atj+\0!\0A\0! ! A\0J@@ A\xE0j Atj \0D\0\0\0\0\0\0p>\xA2\xFC\xB7"D\0\0\0\0\0\0p\xC1\xA2 \0\xA0\xFC6\0  AtjA\bk+\0 \xA0!\0 Ak! Aj" G\r\0\v\v \0 q"\0 \0D\0\0\0\0\0\0\xC0?\xA2\x9CD\0\0\0\0\0\0 \xC0\xA2\xA0"\0 \0\xFC"\f\xB7\xA1!\0@@@\x7F A\0L"E@ At j" (\xDC"  u" tk"6\xDC  \fj!\f  u\f\v \r At j(\xDCAu\v"
A\0L\r\f\vA!
 \0D\0\0\0\0\0\0\xE0?f\r\0A\0!
\f\vA\0!A\0!\x07A! A\0J@@ A\xE0j Atj"(\0!\x7F@  \x07\x7FA\xFF\xFF\xFF\x07 E\rA\x80\x80\x80\b\v k6\0A!\x07A\0\f\vA\0!\x07A\v! Aj" G\r\0\v\v@ \r\0A\xFF\xFF\xFF!@@ Ak\0\vA\xFF\xFF\xFF!\v At j"\x07 \x07(\xDC q6\xDC\v \fAj!\f 
AG\r\0D\0\0\0\0\0\0\xF0? \0\xA1!\0A!
 \r\0 \0D\0\0\0\0\0\0\xF0? q\xA1!\0\v \0D\0\0\0\0\0\0\0\0a@A\0! !@  \bL\r\0@ A\xE0j Ak"Atj(\0 r!  \bJ\r\0\v E\r\0@ Ak! A\xE0j Ak"Atj(\0E\r\0\v\f\vA!@ "Aj! A\xE0j \b kAtj(\0E\r\0\v  j!@ A\xC0j  j"\x07Atj  Aj"Atj(\0\xB79\0A\0!D\0\0\0\0\0\0\0\0!\0 A\0J@@ \r Atj+\0 A\xC0j \x07 kAtj+\0\xA2 \0\xA0!\0 Aj" G\r\0\v\v  Atj \x009\0  H\r\0\v !\f\v\v@ \0A \vkq"\0D\0\0\0\0\0\0pAf@ A\xE0j Atj \0D\0\0\0\0\0\0p>\xA2\xFC"\xB7D\0\0\0\0\0\0p\xC1\xA2 \0\xA0\xFC6\0 Aj! \v!\f\v \0\xFC!\v A\xE0j Atj 6\0\vD\0\0\0\0\0\0\xF0? q!\0 A\0N@ !@  "Atj \0 A\xE0j Atj(\0\xB7\xA29\0 Ak! \0D\0\0\0\0\0\0p>\xA2!\0 \r\0\v !\x07@@ \b  \x07k"  \bJ\x1B"A\0H@D\0\0\0\0\0\0\0\0!\0\f\v  \x07Atj!\vA\0!D\0\0\0\0\0\0\0\0!\0@ At"\r+\xB0\x94 \v \rj+\0\xA2 \0\xA0!\0  G Aj!\r\0\v\v A\xA0j Atj \x009\0 \x07A\0J \x07Ak!\x07\r\0\v\vD\0\0\0\0\0\0\0\0!\0 A\0N@ !@ "Ak! \0 A\xA0j Atj+\0\xA0!\0 \r\0\v\v 	 \0\x9A \0 
\x1B9\0 +\xA0 \0\xA1!\0A! A\0J@@ \0 A\xA0j Atj+\0\xA0!\0  G Aj!\r\0\v\v 	 \0\x9A \0 
\x1B9\b A\xB0j$\0 \fA\x07q! 	+\0!\0 B\0S@  \0\x9A9\0  	+\b\x9A9\bA\0 k!\f\v  \x009\0  	+\b9\b\v 	A0j$\0 \v\xF1|\x7F~ \0\xBD"B \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\x80\x80\xC0\xA0O@ \0D-DT\xFB!\xF9? \0\xA6 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0V\x1B\v@\x7F A\xFF\xFF\xEF\xFEM@A\x7F A\x80\x80\x80\xF2O\r\f\v \0\x99!\0 A\xFF\xFF\xCB\xFFM@ A\xFF\xFF\x97\xFFM@ \0 \0\xA0D\0\0\0\0\0\0\xF0\xBF\xA0 \0D\0\0\0\0\0\0\0@\xA0\xA3!\0A\0\f\v \0D\0\0\0\0\0\0\xF0\xBF\xA0 \0D\0\0\0\0\0\0\xF0?\xA0\xA3!\0A\f\v A\xFF\xFF\x8D\x80M@ \0D\0\0\0\0\0\0\xF8\xBF\xA0 \0D\0\0\0\0\0\0\xF8?\xA2D\0\0\0\0\0\0\xF0?\xA0\xA3!\0A\f\vD\0\0\0\0\0\0\xF0\xBF \0\xA3!\0A\v \0 \0\xA2" \xA2"    D/lj,D\xB4\xA2\xBF\xA2D\x9A\xFD\xDER-\xDE\xAD\xBF\xA0\xA2Dm\x9At\xAF\xF2\xB0\xB3\xBF\xA0\xA2Dq#\xFE\xC6q\xBC\xBF\xA0\xA2D\xC4\xEB\x98\x99\x99\x99\xC9\xBF\xA0\xA2!      D\xDA"\xE3:\xAD\x90?\xA2D\xEB\rv$K{\xA9?\xA0\xA2DQ=\xD0\xA0f\r\xB1?\xA0\xA2Dn L\xC5\xCDE\xB7?\xA0\xA2D\xFF\x83\0\x92$I\xC2?\xA0\xA2D\rUUUUU\xD5?\xA0\xA2! A\xFF\xFF\xEF\xFEM@ \0 \0  \xA0\xA2\xA1\vAt"+\xD0} \0  \xA0\xA2 +\xF0}\xA1 \0\xA1\xA1"\0\x9A \0 B\0S\x1B!\0\v \0\v\xC5|\x7FD\xF2ys?\x90\f)!\x7F \0D\xF2ys?\x90\f)c|D\0\0\0\0\0\0\xF0?D\xFE\x94\xC6G0J\xC5V!A\0 \0D\xFE\x94\xC6G0J\xC5VdE\rD\0\0\0\0\0\0\0\0\v!\0AA\x80\x94\xEB\xDC:!A\0A:!AA\x80\x94\xEB\xDC:!A\0A:!\x07  Aj\xB7D\0\0\0e\xCD\xCDA\xA3 \0\xA0"\x9A  \x1B \xA29\0  Aj\xB7D\0\0\0e\xCD\xCDA\xA3 \0\xA0"\0\x9A \0 \x07\x1B \xA29\bA\v\v\xAC\x7F \0( "@  (\0(\0\v \0A\x006  \0($"@  (\0(\0\v \0A\x006T \0A\x006$ \0(L"@A\f  \0(P$ \0B\x007L\v \0A\x006d \0(\\"@A\f  \0(\`$ \0B\x007\\\v \0A\x006t \0(l"@A\f  \0(p$ \0B\x007l\v \0A\x006\x84 \0(|"@A\f  \0(\x80$ \0B\x007|\v \0A\x006\x94 \0(\x8C"@A\f  \0(\x90$ \0B\x007\x8C\v \0(@"@ #\v \0(D"@ #\v \0A\xDC\xE1\x006\x88 \0(\x8C"@A\f  \0(\x90$\v \0A\xDC\xE1\x006x \0(|"@A\f  \0(\x80$\v \0A\xDC\xE1\x006h \0(l"@A\f  \0(p$\v \0A\xDC\xE1\x006X \0(\\"@A\f  \0(\`$\v \0A\xAC-6H \0(L"@A\f  \0(P$\v \0\v|\x7F|A\xB00k! \0("\0+\b! \0(\0! \0+! \0+!\x07  \x006\x98  6$  6   \x079  D\0\0\0\0\0\0\xE0?\xA2"9  Aj6\0   \xA09\b \0 6\xA8\vs\x7F|A\xB00k! \0("\0(\0! \0+\b!  \0+9  9\b  Aj6\0 \0+!  \x006\x98  6$  6   D\0\0\0\0\0\0\xE0?\xA29 \0 6\xA4\v\x7F\x7F|A\xB00k! \0("\0+\b! \0+!\x07 \0(\0! \0+!  \x006\x98  6$  6   D\0\0\0\0\0\0\xE0?\xA2"9  Aj6\0  \x07 \xA09   \xA09\b \0 6\xA0\v|\x7F|A\xB00k! \0("\0+! \0(\0! \0+! \0+\b!\x07  \x006\x98  6$  6   \x079\b  D\0\0\0\0\0\0\xE0?\xA2"9  Aj6\0   \xA09 \0 6\x9C\vl\x07\x7F \0(\0" \0("Atj"(\0! \0("\x07 (Atj"\b(\0!  6\0  Atj 6\0 \b 6\0 \x07 (Atj 6\0 \0 \0(Ak6\v\xCC\x7F#\0Ak"$\0 \0A\x7F (l"At A\xFF\xFF\xFF\xFFK\x1B06\0 \0Aj (\fAk\x8A \0("@  \0(\f6\f  A\fj(\v \0 6 A\bj  \0A\bj5 \0 (\b6\f (p"@ \0(! \0(\0!@  ("At"\x07j 6\0  \x07j 6\0 (\0"\r\0\v\v \0 (lAk6 Aj$\0\v\xC4\x7F \0A\x006P \0A\x006@ \0B\x0078 \0B\x007, \0(H"@A  \0(L$ \0B\x007H\v \0A\x006\` \0(X"@A\f  \0(\\$ \0B\x007X\v \0A\x006x \0 \0A\xD4\0j6h \0 \0A\xC4\0j6d \0(p"@A\f  \0(t$ \0B\x007p\v \0B\x98\xDA\x90\xA2\xB5\xBF\xC8\x8C\xC0\x007\x90 \0B\x007\x88 \0A\0:\0\x80 \0 \0A\xEC\0j6|\v\0\0\v\0 \0 ((\x006\0\v\xA7\x7F@@ \0 fE@  \0ME\r\v  eE@  ME\r\v  fE@  ME\r\vA!\b  \x07e\r  \x07M\r\v@ \0 e\r\0 \0 M\r\0A\0\v@  f\r\0  M\r\0A\0\v@  e\r\0  M\r\0A\0\v  \x07f@A\v \x07 M!\b\v \b\vo\x7F#\0Ak"$\0 A\fj" \0 \0(\0A\fk(\0j("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+"A
 (\0(\0! J \0 y \0& Aj$\0\v\x82\x7F|#\0A k"$\0 ((L!@A\f%" \x076 A\x006\0  (\b6\b \x7F \x07 6\0  \v! !\x07 (\0"\r\0\v (\0! (\b! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ E@ (\f (A\x98lj"+\0"	!
 +\b"\v!\f\f\v A\x006 (\f (A\x98lj"+\b"\f!\v +\0"
!	@ (\0! (\b! A\xF0\xD8(\x006\0A\xF0\xD8 6\0 @ A\x006\v (\f (A\x98lj"+\b"\b \v \b \vd\x1B!\v \b \f \b \fc\x1B!\f +\0"\b 	 \b 	d\x1B!	 \b 
 \b 
c\x1B!
 "\r\0\v\v\x7F@ 
 	A\xC8\xC7+\0"\b\xA0cE\r\0 
 	 \b\xA1dE\r\0 \f \v \b\xA0cE\r\0A\0 \f \v \b\xA1d\r\v (!@@@ \0(,\0\v  \f9  
9  \v9\b  	9\0  Aj \xFC\f\v  \f9  
9  \v9\b  	9\0 \0  Aj \xA2\vA\v A j$\0\v\x8C\x7F#\0A k"$\0\x7F A\fj" \0 \0(\0(\b\0\0Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjA(l"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\bI@@ A\x006  A\x006\0 B\x007\b B\x007 B\x007\0 A(j" (\bI\r\0\v\v \f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v! \0("@@ (\0 A(lj" )7\b  )\b7\0  (6  (6  ( 6  -\0$:\0  ((6  Aj! (\0"\r\0\v\v (\f (H@ ( (\bA(k \xFA\v \0("@ (\0!A\0!@   A(lj"\0)\b7  \0)\x007\b  \0(6  \0(6  \0(6   \0-\0:\0$  \0( 6( Aj! (\0"\r\0\v\v (# A j$\0\v\xAF	\x7F~#\0A0k"\b$\0A!
A%"	A\x006\f 	A\xC4\xE6\x006\0 	B\x007  	6\0A%"	A\x006\f 	A\xC4\xE6\x006\0 	B\x007  	6\0  \0(\x006\0  (\x006\0 \bA\x006@@ \x07@ (\0!\0  (\x006\0  \x006\0 (\0!\0  (\x006\0  \x006\0 \b 6 \bA\x88\xF7\x006 \b \bAj"6(  \b\xA5@  \b(("\0F\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v (\0! (\0"E@ !\0\f\v !\0 (\0"E\r\f\v \b 6 \bA\xAC\xFA\x006 \b \bAj"6(  \b\xA5@  \b(("\0G@A!
 \0E\r\v \0 \0(\0 
j(\0\0\v (\0! !\0 !\v (!\v@@ )\b!\r )! (!	 )! -\0$!
 ((!\v (\0" (\fAj6\fA0%! (\b!\f  \v6(  
:\0$  7  	6  7  \r7\b  \f6 A\x006\0@ (@ (\b 6\0\f\v  6\v  6\b (\0(\b! 	A:\0$ 	 6 \b("E\r \bAj  (\0(\0\x7F  \b(G"\vE@ \0(\0! ! (\0\f\v \0(\0! (\0"@ \f\v (!A\0\v!	  (\fAk6\f (!
 A\x80\xDA(\x006\0A\x80\xDA 6\0@ 
@ 
 	6\0\f\v  	6\v@ 	@ 	 
6\f\v  
6\b\v ! \v\r\0\v   \x07\x1B!   \x07\x1B"(\0(!@ "\0-\0$AF@ )\b!\r )! (! \0)! \0((! (\0" (\fAj6\fA0%! (\b!\x07  6( A\0:\0$  7  6  7  \r7\b  \x076 A\x006\0@ (@ (\b 6\0\f\v  6\v  6\b  (\0(\b6\v@ (\0"(\b"\x07 \0"F\r\0 (\0"\r\0 (!\v@ \0-\0$AG\r\0  (\fAk6\f \0(\0! \0(! \0A\x80\xDA(\x006\0A\x80\xDA \x006\0@ @  6\0\f\v  6\v @  6\f\v  6\b\v \0 \x07G\r\0\v@ \b \b("\0F\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v \bA0j$\0\v\xA9\0\v\xAF\x7F  \0("j \0(\f"kAj"At!@@ \0("@  i"E\r \0 6 \0(! \0(\f!\f\v \0 '"6 E\r\v \0  j6 \0  Atj6\b \0  Atk6\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xD1\x07\x07\x7F|#\0A k"\x07$\0 +!\v +\b! +\0! (\0!
 \0(P +\b!  +\b" +"\xA19\b  +\0" \xA19\0  +\0 \xA1"\f9\0  +\b \xA1"9\bA!Aj! +\b!\x7F@ +\0"\r \fA\xC8\xC7+\0"\xA0cE\r\0 \r \f \xA1dE\r\0   \xA0cE\r\0   \xA1dE\r\0A!A\0! \f\v \f \ra@   b\r\vA\0! \v \f \r\xA1\xA3\x8E\x9B\xFC\v!\b  a \f \rbq"	E@ \v  \xA1\xA3\x8E\x9B\xFC!\v@ \r\0@@  \xA1 \r \f\xA1ME\r\0  \xA1 +\b +\b\xA1ME\r\0 +\0"\f \v\xA3"DY\xF3\xF8\xC2n\xA5c\r\0 +\0" \v\xA3"DY\xF3\xF8\xC2n\xA5c\r\0 +\b" \v\xA3"DY\xF3\xF8\xC2n\xA5c\r\0 +\b"\r \v\xA3"DY\xF3\xF8\xC2n\xA5c\r\0 \0(P" \bH  Hq\r\0 A\x7Fs  \bHq\r\0 	  Nr\r\v \x07 9 \x07 9 \x07 9\b \x07 9\0  \x07Aj \x07\xFC\f\v@@@@ \f a"	E@ \b A \bt\xB7"\xA2\x9C\xFC"    \xA2\x9B\xFC"\0 \0Aq\x1B \0 F\x1B \v \xA3 \0\xB7\xA2 \fa\x1B"Ak sAj\xB7\x8ED\0\0\0\0\0\0\xF0\xBF\xA0\xFC"A\x7Fsj! \0A Ajtm!\0 \r a\r !\f\vA\0!\0A\0!A\0!A\0!A\0! \r a\r\v A t\xB7"\r\xA2\x9C\xFC!@  \v \r\xA3  \r\xA2\x9B\xFC"\b\xB7\xA2a@ !\f\v \b" F\r\0   Aq\x1B!\v  Ak sAj\xB7\x8ED\0\0\0\0\0\0\xF0\xBF\xA0\xFC"A\x7Fsj! \bA Ajtm! 	@ !\f\v  F\r  H@ A  ktm!\f\v \0A  ktm!\0 !\f\vA\0!A\0!\v \f a@ \fA t\xB7\xA2 \v\xA3\x9C\xFC!\0 !\f\v A t\xB7\xA2 \v\xA3\x9C\xFC! !\v   
j6\0  \vA t\xB7\xA3"\v9  \v \xB7\xA2 \xA09  \v \0\xB7\xA2 \xA09\b\v \x07A j$\0\v\xC6\x1B\b\x7F|~#\0A\xD0\0k"$\0 ("\b( " (\0(\b\0\0!	 A\x006, A\x006( A\x006$ A\x006  A\x006 A\x006 A\x006 A\x006 A\x006\f A\x006\b A\x006 A\x006\0 ("($"\x07(\b+!\r ( "
(\b+! \x07(+! 
(+!@@@ \0(,\0\v  9H  9@  \r98  90  A@k A0j\xFC\f\v  9H  9@  \r98  90 \0  A@k A0j\xA2\v@ \x7F@@@@@@ 	 \0(0L\r\0  \xA1DY\xF3\xF8\xC2n\xA5f \r \xA1DY\xF3\xF8\xC2n\xA5frE\r\0 \b+\b \b+D\0\0\0\0\0\0\xE0?\xA2\xA0"\r \b( "
("	+e\r 
(\b"\v!\x07 	!@ \x07+ \rc"\fE@ \x07("\x07 \v \x07\x1B!\x07 (\0" 	 \x1B"+ \rfE\r\f\v\v \x07 \vG\r  
6, \b($! A\x006(  6 A\x006\f\vA\0!@ \b( ("E@A\0!
A\0!\x07A\0!	\f\vA\0!\0A\0!
@ (\b!	A\f%"\x07 	6\b \x07 \x006 \x07A\x006\0 \x07!	 
Aj!
 @ \0 \x076\0 !	\v 	! \x07!\0 (\0"\r\0\v\v ("(L"\0@A\f \0 (P$ B\x007L\v 	@ 	!\0@A\f%" (P"6 A\x006\0  \0(\b6\b@ (L@  6\0\f\v  6L\v  6P \0(\0"\0\r\0\v\v  
6T ("\0@@ \0("@ \0(\b! \0(\f! \0)! \0(!
  (\fAj6\fA0%! (\b!\v A\x006(  
6  7  6\f  6\b  \v6 A\x006\0 B\x007 A\0:\0$@ (@ (\b 6\0\f\v  6\v  6\b \0 
6 \0 7 \0 6\f \0 6\b \0A\0:\0$ \0B\x007 \0 6(\v \0(\0"\0\r\0\v\v ("@@ ("@ )\b! )! (((!  (\fAj6\fA0%!\0 (\b! \0A\x006( \0 6 \0 7 \0 7\b \0 6 \0A\x006\0 \0B\x007 \0A\0:\0$@ (@ (\b \x006\0\f\v  \x006\v  \x006\b  \x006\v (\0"\r\0\v\v \b( "\0A\x006\f \0("@A0  \0(\b$ \0B\x007\v \b($"\0A\x006\f \0("@A0  \0(\b$ \0B\x007\v 	E\rA\f 	 \x07$\f\v  	F\r (" \v \x1B!\x07\v  \x076@ \b A,j Aj A(j Aj A@k \fA\xFB ((!
\f\v A\x006 A\x006,  
6(  \b($6\v 
E\r\0 (,"@  (\0(\b\0\0 ((" (\0(\b\0\0J\r\v@@@@ \b+ \b+D\0\0\0\0\0\0\xE0?\xA2\xA0"\r \b($"
("	+e\r\0 
(\b"\v!\x07 	!@@@ \x07+ \rc"\fE@ \x07("\x07 \v \x07\x1B!\x07 (\0" 	 \x1B"+ \rfE\r\f\v\v \x07 \vG\r \b( !  
6\b  6  A\x006 A\x006\0\f\v  	F\r (" \v \x1B!\x07\v  \x076@ \b A j A\bj Aj  A@k \fA\0\xFB ( ! ("\x07E\r E\r  (\0(\b\0\0 (" (\0(\b\0\0L\r ( !\f\vA\0! A\x006\b A\x006  \b( !\x07  
6\0  \x076 \x07E\r\f\v (!\x07\v  \x07 (\0\x95A\xA0\f\v   (\b\x93A\xA8\f\v@@@@ \b+ \b+D\0\0\0\0\0\0\xE0?\xA2\xA0"\r \b($"
("	+e\r\0 
(\b"\v!\x07 	!@@@ \x07+ \rc"\fE@ \x07("\x07 \v \x07\x1B!\x07 (\0" 	 \x1B"+ \rfE\r\f\v\v \x07 \vG\r \b( !  
6\f  6$ A\x006 A\x006\f\v  	F\r (" \v \x1B!\x07\v  \x076@ \b A$j A\fj Aj Aj A@k \fA\0\xFB ($! ("\x07E\r E\r  (\0(\b\0\0 (" (\0(\b\0\0L\r ($!\f\vA\0! A\x006\f A\x006$ \b( !\x07  
6  \x076 \x07E\r\f\v (!\x07\v  \x07 (\x96A\x9C\f\v   (\f\x94A\xA4\v (j(\x006 \0    \xA3@ ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\v@@@@@ (,"	E\r\0 ($\r\0 (\r\0 \b(\xA4\r\0 \b(\x9C\r\0 \b+ \b+D\0\0\0\0\0\0\xE0?\xA2\xA0"\r ("("\0+e\r (\b"!\x07 \0!@ \x07+ \rc"
E@ \x07("\x07  \x07\x1B!\x07 (\0" \0 \x1B"+ \rfE\r\f\v\v  \x07G\r  6\f  	6$ A\x006 A\x006\f\v (("	E\r ( \r (\r \b(\xA8\r \b(\xA0\r@ \b+ \b+D\0\0\0\0\0\0\xE0?\xA2\xA0"\r ("("\0+e\r\0 (\b"!\x07 \0!@@@ \x07+ \rc"
E@ \x07("\x07  \x07\x1B!\x07 (\0" \0 \x1B"+ \rfE\r\f\v\v  \x07G\r  6\b  	6  A\x006 A\x006\0\f\v \0 F\r ("\0  \0\x1B!\x07\v  \x076@ A(j A j Aj Aj A\bj  A@k 
\xA0\f\v A\x006\b A\x006   	6  6\0\f\v \0 F\r ("\0  \0\x1B!\x07\v  \x076@ A,j A$j Aj Aj A\fj Aj A@k 
\xA0\f\v A\x006\f A\x006$  	6  6\v@ \b(\xA4\r\0 ($"\0E\r\0  \0 (\f\x94  ((\xA4"6  (\fAj6\fA\f%!\0 (\b! \0 6\b \0 6 \0A\x006\0@ (@  \x006\0\f\v  \x006\v  \x006\b ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\v@ \b(\x9C\r\0 ("\0E\r\0  \0 (\x96  ((\x9C"6  (\fAj6\fA\f%!\0 (\b! \0 6\b \0 6 \0A\x006\0@ (@  \x006\0\f\v  \x006\v  \x006\b ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\v@ \b(\xA8\r\0 ( "\0E\r\0  \0 (\b\x93  ((\xA8"6  (\fAj6\fA\f%!\0 (\b! \0 6\b \0 6 \0A\x006\0@ (@  \x006\0\f\v  \x006\v  \x006\b ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\v@ \b(\xA0\r\0 ("\0E\r\0  \0 (\0\x95  ((\xA0"6  (\fAj6\fA\f%!\0 (\b! \0 6\b \0 6 \0A\x006\0@ (@  \x006\0\f\v  \x006\v  \x006\b ((\x98"\0@  \x006\f\vA\x98\xF8A\xEE
A'8\v \bB\x007 \v A\xD0\0j$\0\v\x07\0 \0(\b\v\xAE\x7F@@@ \x7F A\x80\x80\x80\x80O\r At0A\0\v! \0(\0! \0 6\0 @ \0( #\v \0 6 E\r \0(\0! At"@ A\0 \xFC\v\0\v \0(\b"E\r \0A\bj!\0 (!  Ak"qE\r  M@  p!\v  Atj \x006\0@ (\0"E\r  ("\0M@ \0 p!\0\v \0 F@ !\f\v  \0Atj"(\0@  (\x006\0  (\0(\x006\0 (\0 6\0  6\0 ! \0!\v\f\0\v\0\v\xCD\0\v   q"Atj \x006\0 (\0"\0E\r\0 Ak!@@  \0( q"F@ \0!\f\v  Atj"(\0@  \0(\x006\0 \0 (\0(\x006\0 (\0 \x006\0\f\v  6\0 \0! !\v (\0"\0\r\0\v\v\v\xFC\x7F@@@@@@@@  \0kAu\0\v Ak"(\0 \0(\0*E\r \0(\0!\f\v \0( \0(\0* Ak"(\0 \0(*!E@ E\r \0(! \0 (\x006  6\0 \0( \0(\0*E\r\f\v \0(\0! @\f\v \0(! \0 6 \0 6\0 (\0 *E\r \0(! \0 (\x006  6\0A\v \0 \0Aj \0A\bj Ak\xCAA\v \0 \0Aj \0A\bj \0A\fj\xCA Ak"(\0 \0(\f*E\r \0(\f! \0 (\x006\f  6\0 \0(\f \0(\b*E\r \0(\b! \0 \0(\f"6\b \0 6\f  \0(*E\r \0(\b! \0 \0(6\b \0 6  \0(\0*E\r\f\v \0( \0(\0*! \0(\b \0(*!@ E@ E\r \0(\b! \0 \0(6\b \0 6  \0(\0*E\r \0 \0)\0B \x897\0\f\v \0(\0! @ \0(\b! \0 6\b \0 6\0\f\v \0(! \0 6 \0 6\0 \0(\b *E\r\0 \0 \0)B \x897\v \0A\fj" F\r\0 \0A\bj!@@ (\0 (\0*E\r\0 (\0!  (\x006\0@@  Ak"(\0*E\r  (\x006\0 " \0G\r\0\v \0!\v  6\0 Aj"A\bG\r\0 Aj F\v "Aj" G\r\0\v\vA\v \0 (\x006\0  6\0A\v \0 \0)\0B \x897\0A\v\xBB\x7F#\0A k"$\0\x7F A\fj" \0 \0(\0(\b\0\0Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjA8l"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\bI@@ B\x007( B\x007  B\x007 B\x007 B\x007\b B\x007\0 A\0:\x004 A\x7F60 A8j" (\bI\r\0\v\v \f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v! \0("@ (\0!\x07@ \x07 A8lj" A\bjG@  +\b9\0  +9\b  +9  + 9\v Aj!  )\x0057\0-  )07(  )(7  (\0"\r\0\v\v (\f (H@ ( (\bA8k \xFF\v \0("@ (\0!A\0!@  A8lj"\0 A\bjG@  \0+\x009\b  \0+\b9  \0+9  \0+9 \v Aj!  \0)\0-7\x005  \0)(70  \0) 7( (\0"\r\0\v\v (# A j$\0\v\x94\x1B\f\x7F
|#\0A\xC0k"\x07$\0 \x07A\x006\x8C \x07A\x80\xDA\x006\x80 \x07B\x007\x84 \x07A\x006| \x07A\xE4\xDA\x006p \x07B\x007t \x07A\xE8\xDB\x006\` \x07A\x006P \x07 \x07A\xA8j6TA\f0"\bA\x006\b \bA\xE4\xDC\x006\0 \x07 \b6X@@@ Ak\0\v \x07A\xC4\xD7\x006\xA8 \x07A\xC4\xD7\x006\x90 \x07 \x07A\xA8j"6\xB8 \x07 \x07A\x90j6\xA0  \xA7@  \x07(\xB8"\bF\x7FA \bE\rA\v! \b \b(\0 j(\0\0\v \x07(\xA0"\b \x07A\x90jF\x7FA \bE\rA\v! \b \b(\0 j(\0\0\f\v \x07A\xB8\xD4\x006\xA8 \x07A\xB8\xD4\x006\x90 \x07 \x07A\xA8j"6\xB8 \x07 \x07A\x90j6\xA0  \xA7@  \x07(\xB8"\bF\x7FA \bE\rA\v! \b \b(\0 j(\0\0\v \x07(\xA0"\b \x07A\x90jF\x7FA \bE\rA\v! \b \b(\0 j(\0\0\v@ ("@@A\f%" 6\b  \v6 A\x006\0 "\b! 
@ \v \b6\0 
! 	!\b\v \fAj!\f !
 !\v \b!	 (\0"\r\0\v (! \x07 \v6h \x07 \b6d \x07 \f6l E\r AkAK!@@ \x07(\x84E@|  +(" \0+\b"  d\x1B" +0" \0+\0"\xA0"\xA3"d@  \xA3\f\v  \xA3\v! !|  \r\0  \xA2 \xA2!\x1B|     d\x1B"  \xA0"\xA3"d@  \xA3\f\v  \xA3\v!   \xA2 \xA2 \x1BDwJ\x07\xEB\xFF\xEF?\xA2cE\r\0 +\b!  90  9(  -\0<"\bAs:\0< +!  \x9A \xA1  \bAq"\b\x1B9   \x9A \xA1 \b\x1B9\b ! \v! \x07A\x80j \x07(\x80(\b\0\0!\b \x07 \x07(\x8CAj6\x8CA %!
 \x07(\x88!	 
 \b6 
 9 
 9\b 
 	6 
A\x006\0@ \x07(\x84@ 	 
6\0\f\v \x07 
6\x84\v \x07 
6\x88 \x07 \x07(|Aj6|A\f%!	 \x07(x!\b 	 
6\b 	 \b6 	A\x006\0@ \x07(t@ \b 	6\0\f\v \x07 	6t\v \x07 	6x  \0+\bd@ \0 9\b\v \0  \0+\0\xA09\0 \x07 \x07(\x886\xA8 \x07 \x07(PAj6P \x07 9\xB0 \x07(X"\b \x07A\xA8j \b(\0(\b\0   \xA2|   \xA3"d@  \xA3\f\v  \xA3\v\xA29\0\f\v \x07 6L \x07A\xD0\0j!\v|  \x07(L"\b+(" \0+\b"  c\x1B" \b+0" \0+\0\xA0"\xA3"d@  \xA3\f\v  \xA3\v!   \xA2 \xA2"9\0A!\f@ AkAK\r\0|   \0+\b"  c\x1B"  \0+\0\xA0"\xA3"d@  \xA3\f\v  \xA3\v!  \xA2 \xA2" DwJ\x07\xEB\xFF\xEF?\xA2cE\r\0  9\0A!\f\v|   \v(\b"\b \b(\0(\0\0(\0"	+"\xA0" \0+\b"\x1B  \x1Bd\x1B"  \0+\0" 	+\b"\xA1"\xA0"   d\x1B"\xA3"d@  \xA3\f\v  \xA3\v!  \xA2 \xA2!A!\b@@@ Ak\0\v  c\r\v|   \xA0" \x1B  \x1Bd\x1B"  \xA0"   d\x1B"\xA3"d@  \xA3\f\v  \xA3\v!  \xA2 \xA2" DwJ\x07\xEB\xFF\xEF?\xA2cE\r\0A!\b !\v@  +\0"eE@  ME\r\v  9\0 \b!\f\vA\0!\b@@@@@ \fAk\0\v \x07(L"	+0! 	 	+("90 	 9( 	 	-\0<"\bAs:\0< 	+! 	 \x9A 	+\b"\xA1  \bAq"\b\x1B9 	  \x9A \xA1 \b\x1B9\b \x07A\x006\f\f\v \x07(L"
+0! 
 
+("90 
 9( 
 
-\0<"\bAs:\0< 
+! 
 \x9A 
+\b"\xA1  \bAq"\b\x1B9 
  \x9A \xA1 \b\x1B9\b\v 	!\b\v \x07 \b6\f\v \x07 +\b9 \x07 +9 \x07 +9  \x07 + 9( \x07 )\x0057\0= \x07 )078 \x07 )(70 \x07A\x80j!\b \x07A\xF0\0j!
#\0A\xD0\0k"\r$\0@ \x07(\f"	E@ \r \x07+9\b \r \x07+9 \r \x07+ 9 \r \x07+(9  \r \x07)07( \r \x07)870 \r \x07)\0=7\x005 \v!	#\0Ak"$\0 \r+0! \r+(! \b \b(\0(\b\0\0!\f \b \b(\fAj6\fA %! \b(\b!\v  \f6  9  9\b  \v6 A\x006\0@ \b(@ \v 6\0\f\v \b 6\v \b 6\b 
 
(\fAj6\fA\f%!\v 
(\b!\f \v 6\b \v \f6 \vA\x006\0@ 
(@ \f \v6\0\f\v 
 \v6\v 
 \v6\b \r+(" \0+\bd@ \0 9\b \r+(!\v \0 \r+0 \0+\0\xA09\0 \b(\b!\b  9\b  \b6\0 	 	(\0Aj6\0 	(\b"\b  \b(\0(\b\0 Aj$\0\f\v \x07+8! \x07+0! 	 	)> 	  	+\xA0"9 	  	+\b"  c\x1B9\b 
 
(\fAj6\fA\f%"	 
(\b"\b6 	A\x006\0 	 \x07(\f6\b@ 
(@ \b 	6\0\f\v 
 	6\v 
 	6\b  \0+\bd@ \0 9\b\v \0+\0"  \xA1 \x07+8\xA0"c@ \0 9\0\v \v \v(\0Ak6\0 \v(\b"\b \b(\0(\f\0 \x07(\f!\b \r 9H \r \b6@ \v \v(\0Aj6\0 \v(\b"\b \rA@k \b(\0(\b\0\v \rA\xD0\0j$\0\v (\0"\r\0\v\f\v \x07B\x007d \x07A\x006l\vA\0!A\0!\vA\0!
#\0Ak"\f$\0@@ \x07A\x80j"\b \b(\0(\b\0\0"\0A\0L\x7F \fA\fj \f \0At"\0'"\v6\f \vE\r \0 \vj! \fA\bj\v 6\0\x7F \b \b(\0(\b\0\0"\0A\0L@A\0! \fAj\f\v \f \0At"\0'"
6 
E\r \0 
j! \f\v 6\0 \b \b(\0(\b\0\0A\0J@A\0!@ 
 AtjB\x007\0 \b \b(\0(\b\0\0 Aj"J\r\0\v\v \b("\0@ \0!@@ \0 F@ \vB\x007\0\f\v \v (Atj" ("\x7F  \b(\b\v+\b A\bk+\0\xA09\0\v (\0"\r\0\v\v \x07(d"@ \x07(t!	@ 	(\b"\0+\b! (\b"+\b! +! +0! (8!\b -\0<! 
 \0(At"j"\0 \0+\0" +("\xA09\0  \vj+\0!  :\0<  \b68  90  9(  9  9  9\b    \xA1D\0\0\0\0\0\0\xE0?\xA2\xA09 @ 	 \x07(xF\r\0 	(\0"	\r\0 \x07(t!	\v (\0"\r\0\v\v \f(# \f(\f# \fAj$\0\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vD\0\0\0\0\0\0\0\0! ("@@ +( +0\xA2 \xA0! (\0"\r\0\v\v  9\0 \x07(X"\0@ \0 \0(\0( \0\v \x07A\xF8\xD1\x006\` @A\f  $\v \x07(t"\0@A\f \0 \x07(x$\v \x07A\xE0\xD3\x006\x80 \x07(\x84"\0@A  \0 \x07(\x88$\v \x07A\xC0j$\0\v\xBB	\x7F#\0A@j"$\0A!@  (\0(\b\0\0"\bA\0H\x7F A<j  \bAjAt"'"6< E\r  j! A8j\v 6\0 ("@@  Atj (\b6\0 Aj! (\0"\r\0\v\v \bAN@A!@  Atj!	 Aj"!@  Atj(\0!  (\f"\x07 	(\0"
(A\x98lj"\v+\x009  \v+\b9   \x07 (A\x98lj"\x07+\x009\b  \x07+\b9 A(j Aj A\bj\x8F \0(\f"\x07 (Atj" +( +\0\xA09\0  +0 +\b\xA09\b \x07 
(Atj" +\0 +(\xA19\0  +\b +0\xA19\b  \bF Aj!E\r\0\v  \bG\r\0\v\v (<# A@k$\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xE0	\x7F#\0A@j"$\0@ \0(l"\bA\0H\x7F A<j  \bAjAt"'"6< E\r  j! A8j\v 6\0 \0(p"\0@ (\f! \0!@  (Atj"	B\x007\b 	B\x007\0 (\0"\r\0\vA!@  Atj \x006\0 Aj! \0(\0"\0\r\0\v\v \bAN@A!@  Atj!	 Aj"!\0@  \0Atj(\0!  (\f"\x07 	(\0"
(A\x98lj"\v+\x009  \v+\b9   \x07 (A\x98lj"\x07+\x009\b  \x07+\b9 A(j Aj A\bj\x8F (\f"\x07 (Atj" +( +\0\xA09\0  +0 +\b\xA09\b \x07 
(Atj" +\0 +(\xA19\0  +\b +0\xA19\b \0 \bF \0Aj!\0E\r\0\v  \bG\r\0\v\v (<# A@k$\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x92\x7F~ \0 +\x009\0 \0 +\b9\b \0 )7 \0 )7 \0 ) 7  \0 )(7( \0 )070 \0 )878 \0 (@6@ \0B\x007H \0A\xB0\xCC\x006D (H"@@A%" \0(L"6 A\x006\0  +\b9\b@ \0(H@  6\0\f\v \0 6H\v \0 6L (\0"\r\0\v\v \0A\xE0\xCC\x006D (P! \0B\x007X \0A\xAC-6T \0 6P (X"@@A\f%" \0(\\"6 A\x006\0  (\b6\b@ \0(X@  6\0\f\v \0 6X\v \0 6\\ (\0"\r\0\v\v \0A\xAC,6T \0 (\`6\` )d! \0B\x007p \0A\xAC-6l \0 7d (p"@@A\f%" \0(t"6 A\x006\0  (\b6\b@ \0(p@  6\0\f\v \0 6p\v \0 6t (\0"\r\0\v\v \0A\xAC,6l \0 (x6x \0 )|7| \0 )\x847\x84 \0 )\x8C7\x8C \0 (\x946\x94 \0\v\xD3\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0@ \0(" \0(\b"\0O\r\0 A\x7Fs \0 Aj" \0 K\x1BjApqAj"\0E\r\0 A\0 \0\xFC\v\0\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xE5\x7F \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjA0l"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\bI@@ A\x7F6 B\x007 B\x007 B\x007\f B\x007  A\xB4)6\0 B\x007( A0j" \0(\bI\r\0\v\v \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x9E\x7F (\0!@ (\0" \0(\0"\x07N@  L@ !\f\v  6\0  6\0 (!  (6  6 (\0" \0(\0"\x07N\r \0 6\0  \x076\0 \0(! \0 (6  6 (\0!\f\v@  J@ \0 6\0  \x076\0 \0(! \0 (6  6\f\v \0 6\0  \x076\0 \0(! \0 (6  6 (\0" \x07N\r  6\0  \x076\0  (6  6\v \x07!\v@ (\0" N\r\0  6\0  6\0 (!  (6  6 (\0" (\0"N\r\0  6\0  6\0 (!  (6  6 (\0" \0(\0"N\r\0 \0 6\0  6\0 \0(! \0 (6  6\v@ (\0" (\0"N\r\0  6\0  6\0 (!  (6  6 (\0" (\0"N\r\0  6\0  6\0 (!  (6  6 (\0" (\0"N\r\0  6\0  6\0 (!  (6  6 (\0" \0(\0"N\r\0 \0 6\0  6\0 \0(! \0 (6  6\v\v\xE1z\x7F|#\0A\xD0\0k"\v$\0 \vA6H \0-\0LAF@ \0 (l6P\v \vB\x80\x80\x80\x80\xE07@ \vA\xFC\0'"68@@@ @ \v 64 \v A\xFC\0j6< \vB\x80\x80\x80\x80\xE07, \vA\xFC\0'"6$ E\r \v 6  \v A\xFC\0j6( \vB\x80\x80\x80\x80\xE07 \vA\xFC\0'"6 E\r \v 6\f \v A\xFC\0j6 \0(T! \0(P!  \0(X! \0( "\xCC \vA4j"(\0" 6\0 \v(  6\0 \vA\fj"\b(\0 6\0A\0!@   (lN@ \vA\x006H\f\v@@@ E\r\0 (x\xB7  AtjAk(\0(x\xB7D\x9A\x99\x99\x99\x99\x99\xE9?\xA2e\r\0 \fAJ@ \v 6H\f\v \fAj!\f\vA\x84'"E\r \x93!A\xB8%"A\x7F6 B\x007 B\x007 B\x007\f A\xF8\xCA\x006\0 A j\x91A8%"	A\x7F6 	B\x007 	B\x007 	B\x007\f 	A\xC4\xCF\x006\0 	A\0;0 	B\x007( 	B\x007  (\0" Aj"At"j 6\0 \v( " j 6\0 \b(\0" j 	6\0  At"j(\0!  j(\0"(p"@  j(\0!@ (\f (A\x98lj\x99 (\0"\r\0\v\v (|"@ (\f!@  (Alj"A\0:\0 A\x006\f (\0"\r\0\v\vA\0!A\0!A\0!	#\0A\xE0\0k"$\0 A\bj"A\x7F6$ B\x007 B\x007\f B\x007 A\x7F6H A\xCC*6\b B\x0070 B\x0078 B\x007@ A\xCC*6, B\x80\x80\x80\x80p7\0 \xCC@ (\0 "Atj(\0"(p"\x07E\r\0 \r\0 \v( (\0(\f!@  \x07(A\x98ljA6( \x07(\0"\x07\r\0\v\v@@@ \0\v  \x98\f\v \v(  Atj(\0!#\0Ak"
$\0  \x98 A8j (\fAk\x8A (4"@ 
 (06\f  
A\fj(\v  64 
A\bj  A,j5  
(\b60 (p"@ (8!\x07 (\f!@ \x07 ("Atj  A\x98lj((6\0 ("@@  (\f"(\b"F@ (\f!\v \x07 (Atj" (\0  (A\x98lj((j6\0 (\0"\r\0\v\v (\0"\r\0\v\v 
Aj$\0\vA\0! (A\0N@ At!@ @A\f  $A\0!\v !A\0!@@@@ \0\vA\0 (:!
 (\0" ("Atj"(\0!\x07   
Atj"(\0"6\0  \x076\0 (" (Atj 6\0  \x07(Atj 
6\0  (Ak6\f\v@ A\0J ("A\0NqE@ (! (\0!A\x7F!\f\vA\0 :! (\0" Atj"
(\0"\x07(At" (8j(\0!  Atj"(\0!\r  \x076\0 
 \r6\0 (" j 6\0  \r(Atj 6\0@  Ak"  K\x1B"E@ !\f\v Aj! !A!\x1B@A\0 Ak":! (\0" Atj"\r(\0"
(At"\x07 (8j(\0!  Atj"(\0!  
6\0 \r 6\0 (" \x07j 6\0  (Atj 6\0    H"\x1B!   \x1B!  \x1BF \x1BAj!\x1BE\r\0\v\v (!\v  Atj"(\0!
   Atj"(\0"\x076\0  
6\0  \x07(Atj 6\0  
(Atj 6\0  (Ak6 \x07!\f\v@ A\0J ("A\0NqE@ (! (\0!A\x7F!\f\vA\0 :! (\0" Atj"
(\0"\x07(At" (8j(\0!  Atj"(\0!\r  \x076\0 
 \r6\0 (" j 6\0  \r(Atj 6\0@  Ak"  K\x1B"E@ !\f\v Aj! !A!\x1B@A\0 Ak":! (\0" Atj"\r(\0"
(At"\x07 (8j(\0!  Atj"(\0!  
6\0 \r 6\0 (" \x07j 6\0  (Atj 6\0    J"\x1B!   \x1B!  \x1BF \x1BAj!\x1BE\r\0\v\v (!\v  Atj"(\0!
   Atj"(\0"\x076\0  
6\0  \x07(Atj 6\0  
(Atj 6\0  (Ak6 \x07!\vA\f%" 6\b  6 A\x006\0 	\x7F  6\0 	 \v!	 (\0 j(\x86! \v(  j(\0(\f (A\x98lj"B\x0078  60 A6,  6$A\0! ("@@ \b(\0 j(\0(\f (\f"(Alj+\0!!  (\b"\x07F@ (\f!\x07\v \v(  j(\0(\f \x07(A\x98lj" !98  60 A6,A\f%" \x076\b  6 A\x006\0 ! @  6\0 !\v ! ! (\0"\r\0\v !\x07@ ( \x07(\b"(Atj(\0 (L@  \x97\v \x07(\0"\x07\r\0\v !@ (\b"
("\x07@@ 
 \x07(\f"(\b"F@ (\f!\v ( (Atj(\0 (L@  \x97\v \x07(\0"\x07\r\0\v\v (\0"\r\0\v ! !\v (A\0N\r\0\v\v Aj"At" \v( j(\0"
A\fj (\0 j(\0"\x07(\fAk\x82 
(\b"@  
(6\\  A\xDC\0j(\v 
 \x076\b A\xD8\0j \x07 
5 
 (X6 	@ \v( " Atj(\0(\f!
  Atj(\0(\f!\x07 	!@ \x07 (\b"(A\x98lj"\r+\0!# \r+\b!" \r+!! 
 \r($(A\x98lj" \r+9  !9 B\x007$  6   "9\b  #9\0 (\0"\r\0\vA\f 	 $\v @A\f  $\v#\0Ak"$\0 (\0"@ #\v A\x846, (4"@  (06\b  A\bj(\v (<# A\x846\b ("@  (\f6\f  A\fj(\v (# Aj$\0 A\xE0\0j$\0 \v(  j(\0! \b(\0 j(\0!	 (\0 j(\0(p"@@ (\f"
 (A\x98lj"\r(,E@ 	(\f!\x07 (!D\0\0\0\0\0\0\0\0!!A\0!A\0!@ (\f"(\b" F@ (\f!\v@ 
 (A\x98lj(,A~qAG\r\0A\0  \x07 (Alj+\0"" !c\x1B\r\0 ! "!! !\v (\0"\r\0\v \x07 (AljA:\0 
 (A\x98lj"+8!" (0! \r 6@ \r 60 \rA6, \r ! "\xA098 A6, (|" (\fAj6\fA\f%! (\b!  6\b  6 A\x006\0@ (@  6\0\f\v  6\v  6\b\v (\0"\r\0\v\v#\0A0k"
$\0 
A\x7F6 
B\x007 
B\x007 
B\x007\f 
A\xBC+6\0 At" (\0j(\0(p"@ \v(  j"(\0(\f! ((\f!@    (A\x98lj(0(A\x98lj($(A\x98lj" ((Aj6( (\0"\r\0\v\vA\0!A\0!#\0Ak"$\0 
A\fj (\0" At"	j(\0(|"\r\x7F@ \v(  	j(\0(\f" \r(\b(A\x98lj(0"  \r(\f(A\x98lj(0"G@ (\0 	j(  (A\x98lj($  (A\x98lj($\x92! \b(\0 	j(\0(\f \r(Alj 6\fA\f%" \r6\b  6 A\x006\0@ E@ !\f\v  6\0\v !\v \r(\0"\r\r\0\v (\0 \v 	j("(Ak\xB0 
(\b"@  
(6\f  A\fj,\v 
 6\b A\bj  
> 
 (\b6 @ At! !@ \v(  j(\0(\f" (\b"(\f"(A\x98lj"\x07(0!  (\b"	(A\x98lj"\r(0! 
(\f \b(\0 j(\0(\f (Alj"(\f(Atj +\0 \r+8""\xA0 \x07+8"!\xA0"#9\0 \r(d"\x07 \x07(\fAj6\fA%!\r \x07(\b! \r " #\xA39\b \r 6 \rA\x006\0 ! #\xA3!!@ \x07(@  \r6\0\f\v \x07 \r6\v \x07 \r6\b \v(  j(\0(\f (A\x98lj(d"\x07 \x07(\fAj6\fA%!\r \x07(\b! \r !9\b \r 6 \rA\x006\0@ \x07(@  \r6\0\f\v \x07 \r6\v \x07 \r6\b \v(  j(\0(\f 	(A\x98lj(h"	 	(\fAj6\fA\f%!\x07 	(\b! \x07 6\b \x07 6 \x07A\x006\0@ 	(@  \x076\0\f\v 	 \x076\v 	 \x076\b \v(  j(\0(\f (A\x98lj(h"	 	(\fAj6\fA\f%! 	(\b!  6\b  6 A\x006\0@ 	(@  6\0\f\v 	 6\v 	 6\b (\0"\r\0\vA\f  $\v Aj$\0A\0!A\0!	A\0!A\0!#\0A k"$\0 A\x9C\xCD\x006 A\xA8\xCE\x006 A\xFC\xD0\x006\0 (\0 Aj"Atj(\0"\x07!#\0A k"$\0 A\xA8\xC7\x006\0  6  6A!\r@@ (|"E@ !\f\v (\0!  6 !@@  Aj (\0(\0 (! E\r (\0  6! \r\0\v\xA9\0\v  F\r\0 E\rA!\r\v  (\0 \rj(\0\0\v A j$\0#\0A0k"$\0 \x07(xAN@\x7F A\fj" \x07(Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjA\fl"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\b"I@@ B\x007 A\xF8\xC5\x006\0 A\fj" I\r\0\v\v \f\v\f\b\v!  \x076\b A\x006 A\xD06\0 A,j \x07 >  (,6 B\x007$ A\xF8\xC5\x006  A\x98\xE0\x006\0#\0A\xE0\0k"$\0@ \x07(xAH\r\0 B\x007T A\xF8\xC5\x006P A,j \x07\xB6!\x1B A\bj \x07\xB6!#\0Ak"\r$\0 A\xD0\0j"("@A\b  (\b$ B\x007\v@ \x07(|"E\r\0@A\b%" 6 A\x006\0@ (E@  6\f\v (\b 6\0\v  6\b (\0"\r\0\v \x07(|"E\r\0 (\f! \x1B(\f!@  (Atj (\b(" (\f("  J\x1B6\0  (Atj    H\x1B6\0 (\0"\r\0\v\v \r \x1B6\f \rA\xEC\xC6\x006\b \r 6 \rA\xEC\xC6\x006\0  \x07(Ak \rA\bj\xB8  \x07(Ak \r\xB8 \rAj$\0 (T"(\0"@ (!@ (! (\0!@ \x1B(\f" ("\rAt"j(\0  (At"j(\0G@ !\f\v  (\f"j(\0  j(\0G@ !\f\v (\f!A\b%" 6 A\x006\0@  \rA\flj"(E@  6\f\v (\b 6\0\v  6\b\v \r\0\v\v A\xD06\0 (\b"@  (6\\  A\xDC\0j,\v (# \x1BA\xD06\0 \x1B(\b"@  \x1B(6\b  A\bj,\v \x1B(# A\xF8\xC5\x006P (T"E\r\0A\b  (X$\v A\xE0\0j$\0 \x07(|"@@ (\0 (A\flj("@@ \x07 ( \x07(\0(\f\0 (\0"\r\0\v\v (\0"\r\0\v\v A\xF8\xC5\x006  A\x98\xE0\x006\0 ($"@A\b  (($\v A\xD06\0 (\b"@  (6,  A,j,\v (" (I\x7F@  (\0(\0\0\0 A\fj" (I\r\0\v ( \v#\v A0j$\0@ \x07(|"\rE@A\0!\f\v@A %"B\x007  \x076\f  \r6\b  	6 A\x006\0 A\x006 ! @ 	 6\0 !\v Aj! !	 ! \r(\0"\r\r\0\v\v  6\b  6\f  6  \x07(lAk Aj\xCB  \x07(lAk Aj\xCB@ ("E\r\0 (\0"\rE\r\0 (\b"(\b(! (\f(!A!	@ \r(\b"(\f(!@@  (\b("F  FqE@  G\r  G\r\v 
(\f" (Atj"  (Atj+\0 +\0\xA09\0 \x07  \x07(\0(\f\0 	Aj!	\f\v 	AN@ 
(\f (Atj" +\0 	\xB8\xA39\0A!	\v ! ! !\v \r(\0"\r\r\0\v 	AL\r\0 
(\f (Atj" +\0 	\xB8\xA39\0\v At" \b(\0j(\0"A\fj (\0 j(\0"(Ak\x81 (\b"@  (6  Aj,\v  6\b Aj  >  (6 \x07(|"@ \b(\0 Atj(\0(\f! 
(\f!@  ("Alj  Atj+\x009\0 (\0"\r\0\v\v A\xF8\xCE\x006\0 ("@A   (\b$\v A j$\0 
A\xD06\0 
(\b"@ 
 
(6,  
A,j,\v 
(# 
A0j$\0 ! (\0" j(\0"(l  J\r\0\v \v 6H\f\v\f\v \v(H"A\0H\r@@ \v(H F@ At" \v(4j(\0!\x07 \v(  j(\0!D\0\0\0\0\0\0\0\0!!D\0\0\0\0\0\0\0\0!" \x07(p"@ (\f!@ !D\0\0\0\0\0\0$@  (A\x98lj"+"! !D\0\0\0\0\0\0$@c\x1B\xA0!! "D\0\0\0\0\0\0$@ +"" "D\0\0\0\0\0\0$@c\x1B\xA0!" (\0"\r\0\v\v \0B\x007\xA8 \0B\x007\xB0 \0 ! " ! "d\x1BD\x9A\x99\x99\x99\x99\x99\xF1?\xA2\x9B9\x98@@@@ \0(\xB0\0\vA\0!#\0A k"\b$\0 \0+\x98!"A\xC8\xE0+\0!! \x07(l! \bB\x007 \bB\x007\f \bA\x7F6 \bA\fj Ak\x8A \xB7\x9E !\xA3\x9B\xFC! \b(\f! \x07(p"@@  Atj 6\0 Aj! (\0"\r\0\v\v@ AF\r\0AA t" AL\x1B!	 " \xB7"$\xA3D\0\0\0\0\0\0\xE0?\xA2!# \x07(lAk! \0+\x98!" (\f! (\0!A\0!A\0!@ # " \xB8\xA2 $\xA3\xA0!!A\0!@  (A\x98lj" !9\0  # " \xB8\xA2 $\xA3\xA09\b  F\r  Aj"Atj(\0! Aj" 	G\r\0\v Aj" 	G\r\0\v\v \b(# \bA j$\0 \0 \x07 \xA8\f\vD\0\0\0\0\0@\x8F@\xA3\xFC\xA7\xCC \x07(p"E\r@A\0A\x80\x94\xEB\xDC:!A\0A\x80\x94\xEB\xDC:! (\f (A\x98lj" \xB7D\0\0\0\0e\xCD\xCDA\xA3 \0+\x98D\0\0\0\0\0\0\0\xC0\xA0"!\xA2D\0\0\0\0\0\0\xF0?\xA09\b  \xB7D\0\0\0\0e\xCD\xCDA\xA3 !\xA2D\0\0\0\0\0\0\xF0?\xA09\0 (\0"\r\0\v\f\v \0( \xCC \x07(p"E\r\0@A\0A\x80\x94\xEB\xDC:!A\0A\x80\x94\xEB\xDC:! (\f (A\x98lj" \xB7D\0\0\0\0e\xCD\xCDA\xA3 \0+\x98D\0\0\0\0\0\0\0\xC0\xA0"!\xA2D\0\0\0\0\0\0\xF0?\xA09\b  \xB7D\0\0\0\0e\xCD\xCDA\xA3 !\xA2D\0\0\0\0\0\0\xF0?\xA09\0 (\0"\r\0\v\v \0 \x07 \xA8\f\v \0(d!	#\0Ak"$\0 A\x006\f A\xAC,6\0 B\x007 AjAt" \v(4j(\0(p"@ \v( " Atj(\0(\f!  j(\0(\f!@  (A\x98lj"+\0!" +\b!!  ( (A\x98lj"A:\0\x80  !9\b  "9\0 (\0"\r\0\v\v#\0Ak"\b$\0 \bA\x006\f \bA\xC8\xE1\x006\0 \bB\x007 \v(4" AjAt"j(\0(p"
\x7F@A!\x07|@@ 
("E@A\0!\f\v \v(  j(\0(\f 
(A\x98lj"+\b!+ +\0!,A\0!A\0!A\0!@ \v(\f j(\0(\f (\f"(Alj-\0E@ \v(  j(\0(\f (\b" 
F\x7F (\f \v(A\x98lj"+\0!" +\b!!A%" !9  "9\b  6 A\x006\0 Aj!@ E@ !\f\v  6\0\v !\v (\0"\r\0\v \r\vA\0!D\0\0\0\0\0\0\0\0!(D-DT\xFB!@\f\v ,D\0\0\0\0\0\0\xF0?\xA0!" AG@D\0\0\0\0\0\0\0\0!( " ,\xA1""D\0\0\0\0\0\0\0\0a + +\xA1"!D\0\0\0\0\0\0\0\0aq!A\xC8\xC7+\0!)A! ! "]!* !D\0\0\0\0\0\0\0\0!-@ +". +\xA1!# +\b"/ ,\xA1!"|D\0\0\0\0\0\0\0\0 \r\0D\0\0\0\0\0\0\0\0 "D\0\0\0\0\0\0\0\0a #D\0\0\0\0\0\0\0\0aq\r\0 # "] *\xA1"!D-DT\xFB!@\xA0 ! !D\0\0\0\0\0\0\0\0c\x1B\v!&D\xFF\xFF\xFF\xFF\xFF\xFF\xEF\x7F!! # "]!' !@ "D\0\0\0\0\0\0\0\0a #D\0\0\0\0\0\0\0\0aq@@@@@ / +\b"" )\xA0cE\r\0 / " )\xA1dE\r\0 . ) +""\xA0c . " )\xA1dq\r !D\0\0\0\0\0\0\0\0d\r\f\v !D\0\0\0\0\0\0\0\0dE\r\vD\0\0\0\0\0\0\0\0!!\v (\0"\r\0\f\v\0\v@ +!%@@ / +\b"# )\xA0cE\r\0 / # )\xA1dE\r\0 . ) %\xA0cE\r\0 . % )\xA1d\r\vD\0\0\0\0\0\0\0\0!" # ,\xA1"$D\0\0\0\0\0\0\0\0a % +\xA1"#D\0\0\0\0\0\0\0\0aqE@ # $] '\xA1""D-DT\xFB!@\xA0 " "D\0\0\0\0\0\0\0\0c\x1B!"\v ! "dE\r\0 "!!\v (\0"\r\0\v\v & (  F ! - (\xA1dr"\x1B!( & !\xA0 - \x1B!- A
G@ Aj! (\0"  \x1B"(\0\r\v\vA\0!\x07 (D-DT\xFB!	@\xA0 - ( -a\x1B\f\v +!' +\b!!A\0!\x07|D\0\0\0\0\0\0\0\0 " ,\xA1"$D\0\0\0\0\0\0\0\0a + +\xA1"#D\0\0\0\0\0\0\0\0aq\r\0D\0\0\0\0\0\0\0\0 ! ,\xA1""D\0\0\0\0\0\0\0\0a ' +\xA1"!D\0\0\0\0\0\0\0\0aq\r\0 ! "] # $]\xA1"!D-DT\xFB!@\xA0 ! !D\0\0\0\0\0\0\0\0c\x1B\v"(D-DT\xFB!	@\xA0\v!! \v( " Atj(\0(\f  j(\0(\f 
(A\x98lj( (A\x98lj" !9\x90  (9\x88 \x07E@A  $\v 
(\0"
\r\0\v \v(4 \v At"j(\0(p"@  \v( j(\0(\f!@  (A\x98lj"  (0(A\x98lj"+\x889\x88  +\x909\x90 (\0"\r\0\v\v@ At" \v(4j(\0(p"\x07E\r\0@@@@ \v(  j(\0(\f" \x07("A\x98lj(,Ak\0\v  (\fAj6\fA\f%! (\b!  \x076\b  6 A\x006\0 (@  6\0  6\b\f\v  6  6\b\f\v \bA\x006\fA! \b("@A  \b(\b$ \bB\x007 \x07(! \v(  j(\0(\f!\v   A\x98lj"(0(A\x98lj"+\b!% +\0!&@ 	AG\r\0 \x07("E\r\0 +8!*A\0!@@ \v(  j(\0(\f" \x07(A\x98lj(0  \x07 (\f"(\b"F\x7F (\f \v(A\x98lj"(0G\r\0 (,AF\r\0 -\0\x80AG\r\0 \v(\f j(\0(\f (Alj+\0!" +\0!' +\b!$AA\x80\x94\xEB\xDC:!AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  * & '\xA1"! !\xA2 % $\xA1"! !\xA2\xA0\x9F"! *\xA1 "\xA1D\0\0\0\0\0\0\xE0?\xA2\xA0 !\xA3"# $ %\xA1"!\xA2 %\xA0 ' &\xA1"$ $\xA2 ! !\xA2\xA0\x9FD\x9A\x99\x99\x99\x99\x99\xA9?\xA2 Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA2"" Aj\xB7D\0\0\0e\xCD\xCDA\xA3D-DT\xFB!@\xA2D\0\0\0\0\0\0\0\0\xA0"!{\xA2\xA09  # $\xA2 &\xA0 " !|\xA2\xA09\b@ \b("@  6\0\f\v \b 6 !\v \b 6\b\v (\0"\r\0\v \v(  j(\0(\f! E! \x07(!\v@  A\x98lj"(d("E@ E\r +8!# +\x90!! +\x88!"AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  % # " ! "\xA1 Aj\xB7D\0\0\0e\xCD\xCDA\xA3\xA2\xA0"!{\xA2\xA09  & # !|\xA2\xA09\b@ \b(@  6\0\f\v \b 6\v \b 6\b \v(  j(\0(\f! \x07(!\f\v (h("E\r\0@  (\b(A\x98lj"+\0!" +\b!! +\b!$AA\x80\x94\xEB\xDC:!AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  $ ! %\xA1"!\xA2 %\xA0 Aj\xB7D\0\0\0e\xCD\xCDA\xA3 " &\xA1"# #\xA2 ! !\xA2\xA0\x9FD\x9A\x99\x99\x99\x99\x99\xA9?\xA2\xA2"" Aj\xB7D\0\0\0e\xCD\xCDA\xA3D-DT\xFB!@\xA2D\0\0\0\0\0\0\0\0\xA0"!{\xA2\xA09  $ #\xA2 &\xA0 " !|\xA2\xA09\b@ \b(@  6\0\f\v \b 6\v \b 6\b@  \v(  j(\0(\f" \x07("A\x98lj(d"(\bF\r\0 (\0"\r\0 (!\v (\0"\r\0\v\v  A\x98lj!D\0\0\0\0\0\0\0\0!!D\0\0\0\0\0\0\0\0!" \b("@@ ! +\xA0!! " +\b\xA0!" (\0"\r\0\v\v \b \b(\0(\b\0\0! \b \b(\0(\b\0\0!  " \xB7\xA39\0  ! \xB7\xA39\b \v(  j(\0(\f \x07(A\x98ljA:\0\x80\v \x07(\0"\x07\r\0\v \bA\xA8%6\0 \b("E\r\0A  \b(\b$\v \bAj$\0#\0Ak"\b$\0 \bA\xC8\xE1\x006\0 \bB\x007@ ("\x07E\r\0 At! 	AG!	@ \x07(\b! \bA\x006\f \b("@A  \b(\b$ \bB\x007\v \v(  j(\0(\f" ("A\x98lj"+8!*  (0(A\x98lj"+\b!% +\0!&@ 	\r\0 ("E\r\0@  (\f"(\b"F@ (\f!\v@ \v(\f j(\0(\f (Alj"-\0\r\0 \v(  j(\0(\f" (A\x98lj(0  (A\x98lj"(0G\r\0 (,AF\r\0 -\0\x80AG\r\0 +\0!" +\0!' +\b!$AA\x80\x94\xEB\xDC:!AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  * & '\xA1"! !\xA2 % $\xA1"! !\xA2\xA0\x9F"! *\xA1 "\xA1D\0\0\0\0\0\0\xE0?\xA2\xA0 !\xA3"# $ %\xA1"!\xA2 %\xA0 Aj\xB7D\0\0\0e\xCD\xCDA\xA3 ' &\xA1"$ $\xA2 ! !\xA2\xA0\x9FD\x9A\x99\x99\x99\x99\x99\xA9?\xA2\xA2"" Aj\xB7D\0\0\0e\xCD\xCDA\xA3D-DT\xFB!@\xA2D\0\0\0\0\0\0\0\0\xA0"!{\xA2\xA09  # $\xA2 &\xA0 " !|\xA2\xA09\b@ \b(@  6\0\f\v \b 6\v \b 6\b\v (\0"\r\0\v \v(  j(\0(\f! (!\v  A\x98lj(|("@@ \v(  j(\0(\f (\b(A\x98lj"+\0!$ +8!" +\b!!AA\x80\x94\xEB\xDC:!AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  * "\xA3"# ! %\xA1"!\xA2 %\xA0 Aj\xB7D\0\0\0e\xCD\xCDA\xA3 $ &\xA1"$ $\xA2 ! !\xA2\xA0\x9FD\x9A\x99\x99\x99\x99\x99\xA9?\xA2\xA2"" Aj\xB7D\0\0\0e\xCD\xCDA\xA3D-DT\xFB!@\xA2D\0\0\0\0\0\0\0\0\xA0"!{\xA2\xA09  # $\xA2 &\xA0 " !|\xA2\xA09\b@ \b(@  6\0\f\v \b 6\v \b 6\b (\0"\r\0\v \v(  j(\0(\f! (!\v@  A\x98lj"(d("E\r\0 (h("E\r\0@  (\b(A\x98lj"+\0!" +\b!! +\b!$AA\x80\x94\xEB\xDC:!AA\x80\x94\xEB\xDC:! \b \b(\fAj6\fA%" \b(\b"6 A\x006\0  $ ! %\xA1"!\xA2 %\xA0 Aj\xB7D\0\0\0e\xCD\xCDA\xA3 " &\xA1"# #\xA2 ! !\xA2\xA0\x9FD\x9A\x99\x99\x99\x99\x99\xA9?\xA2\xA2"" Aj\xB7D\0\0\0e\xCD\xCDA\xA3D-DT\xFB!@\xA2D\0\0\0\0\0\0\0\0\xA0"!{\xA2\xA09  $ #\xA2 &\xA0 " !|\xA2\xA09\b@ \b(@  6\0\f\v \b 6\v \b 6\b@  \v(  j(\0(\f" ("A\x98lj(d"(\bF\r\0 (\0"\r\0 (!\v (\0"\r\0\v\v  A\x98lj!D\0\0\0\0\0\0\0\0!!D\0\0\0\0\0\0\0\0!" \b("@@ ! +\xA0!! " +\b\xA0!" (\0"\r\0\v\v \b \b(\0(\b\0\0! \b \b(\0(\b\0\0!  " \xB7\xA39\0  ! \xB7\xA39\b \v(  j(\0(\f (A\x98ljA:\0\x80 \x07(\0"\x07\r\0\v \bA\xA8%6\0 \b("E\r\0A  \b(\b$\v \bAj$\0 ("@A\f  (\b$\v Aj$\0 \0 At" \v(4j(\0 \v(  j(\0\xA8\v At" \v(4j(\0! \v(  j(\0! \v(\f j(\0! \v(H!A\0!D\0\0\0\0\0\0\0\0!!#\0A\xD0k"\f$\0 (l"	AN@@@@@ \0(\\\0\v \0(\x90!\f\v E@ \0(\x90 \0(\`l!\f\v \0(\x90" \xB7 \xB7\xA3 \0(\`Ak\xB7\xA2 \xB7\xA2\xFCj!\f\v \0(\x90!@@@  k\0\v \0(\` l!\f\v  \0(\`Ak\xB7D\0\0\0\0\0\0\xE0?\xA2 \xB7\xA2\xFCj!\f\v  \0(\`Ak\xB7D\0\0\0\0\0\0\xD0?\xA2 \xB7\xA2\xFCj!\v \0+\x88 \fA\xA4j (\fAkU \f 6\xA0 \fA\x006\x9C \fA\x846\x98 \fA\xE8\0j"  \fA\x98j5 \f \f(h6\x9C \fB\x007\xB8 \fA\xB4)6\x98 \fB\x007\xC0 \fA\xF4\0j (\fAkU \f 6p \fA\x006l \fA\x846h \fA8j"  5 \f \f(86l \fB\x007\x88 \fA\xB4)6h \fB\x007\x90 \fA\xC4\0j (\fAkU!\b \f 6@ \fA\x006< \fA\x8468 \fA\bj"  5 \f \f(\b6< \fB\x007X \fA\xB4)68 \fB\x007\` \fAj (\fAkU \f 6 \fA\x006\f \fA\x846\b \fA\xCCj  5 \f \f(\xCC6\f \fB\x007( \fA\xB4)6\b \fB\x0070A\xE4\0  A\xE4\0L\x1B 	A\xF5I! (x"	A\0L|D\0\0\0\0\0\0I@ (|"@ (\f!@ !  (Alj+\0\xA0!! (\0"\r\0\v\v ! 	\xB8\xA3\v!"  \x1B!\x07D\0\0\0\0\0\0\xF0?\xA0!! \0 "9\x90A\0!
#\0A0k"$\0@@@@ \0(\x80\0\v \0+\x98!"  \0+\xA89   \0+\xB09( \0A\xE8j " A j \0(\xE8\x80\f\v \0+\x98!"  \0+\xA89  \0+\xB09 \0A\xE8j " Aj \0(\xE8\x80\f\v \0+\x98!"  \0+\xA89\0  \0+\xB09\b \0(\xF4! \0(\xF8!	 \0(\xEC! \0(\xF0!#\0Ak"$\0@ (l \0A\x88j"(\0N@ A:\0  6,  6( A 	 	AL\x1B"64 A  AL\x1B60  A@kG@  +\x009@  +\b9H\v  "98 A\x7F AtAr 	A\xFF\xFF\xFF\xFFJ\x1B0"6T At!\rA\0!@  AtjA\x7F Aj"At A\xFE\xFF\xFF\xFFK\x1B06\0  \rG !\r\0\vA\0! 	AN@ \rA|q!A\0!@  Atj(\0" AtjB\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0  Ar"	Atj(\0" 	AtjB\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0  Ar"	Atj(\0" 	AtjB\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0  Ar"	Atj(\0" 	AtjB\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 Aj! Aj" G\r\0\v\v \rAq!@A!  Atj(\0" AtjB\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 B\x80\x80\x80\x80\x80\x80\x80\xF8?7\0 Aj!  
G 
Aj!
\r\0\vA\0!@ Aj!  Atj"(\0! Ak(\0!
A!@ @ A~q!A\0!@  At"j 
 j"	A\bk+\0 	+\0\xA09\0  A\bj"	j 	 
j"	A\bk+\0 	+\0\xA09\0 Aj! Aj" G\r\0\v Aq\r\v  At"j  
j"A\bk+\0 +\0\xA09\0\v \r F ! Aj!E\r\0\v\f\v A\0:\0  +\x009\0  +\b9\b A\bj " A\0\x80\v Aj$\0\v A0j$\0 \0(\x84!	A!@@@@@@ 	\0\v A\x90\xCE\0K\r ! \0+\x88fE\r\f\v  \x07J\r ! \0+\x88f\r\f\v  \x07J\r\v \0    \fA8j \fA\xE8\0j \fA\x98j \fA\bj A\0Y \0(\x84"	@@ (p"E@D\0\0\0\0\0\0\0\0!!\f\v \b(\0!D\0\0\0\0\0\0\0\0!!@ !  (Atj"+\0"! !\xA2 +\b"! !\xA2\xA0\x9F\xA0!! (\0"\r\0\v\v ! (l\xB7\xA3!!\v Aj!\f\v\v E@D\0\0\0\0\0\0\0\0!!D\0\0\0\0\0\0\0\0!"A!	 \0 " "  \fA8j" \fA\xE8\0j"
 \fA\x98j"\x07 \fA\bj"\bAAY \0     
 \x07 \bAAY \0     
 \x07 \bAAY \0     
 \x07 \bAAY \0     
 \x07 \bAAY \0     
 \x07 \bAAY \0     
 \x07 \bA\x07AY \0     
 \x07 \bA\bAY \0     
 \x07 \bA	AY \0     
 \x07 \bA
AY \0-\0\xB4AF@ (|"@ (\f! (\f!@ !  (\b(A\x98lj"+\0  (\f(A\x98lj"+\0\xA1"! !\xA2 +\b +\b\xA1"! !\xA2\xA0\x9F\xA0!! "  (Alj+\0\xA0!" (\0"\r\0\v\v (p"@D\0\0\0\0\0\0\xF0? " !\xA3 !D\0\0\0\0\0\0\0\0a\x1B \0+\xB8\xA2!! (\f!@  (A\x98lj" ! +\b\xA29\b  ! +\0\xA29\0 (\0"\r\0\v\v \0  \xA8\v \0(\xC0A\0J@@ \0     
 \x07 \b 	AY 	 \0(\xC0H 	Aj!	\r\0\v\v@ \0-\0\xB4E\r\0@ (|"	E@D\0\0\0\0\0\0\0\0!"D\0\0\0\0\0\0\0\0!!\f\v (\f! (\f!D\0\0\0\0\0\0\0\0!!D\0\0\0\0\0\0\0\0!"@ !  	(\b(A\x98lj"+\0  	(\f(A\x98lj"+\0\xA1"! !\xA2 +\b +\b\xA1"! !\xA2\xA0\x9F\xA0!! "  	(Alj+\0\xA0!" 	(\0"	\r\0\v\v (p"E\r\0D\0\0\0\0\0\0\xF0? " !\xA3 !D\0\0\0\0\0\0\0\0a\x1B \0+\xB8\xA2!! (\f!@  (A\x98lj" ! +\b\xA29\b  ! +\0\xA29\0 (\0"\r\0\v\v\v \0(\x80AF@A\0!@ \0-\0\x8CAG\r\0 \0(\xBC"A\0N@@ \0(\xDC Atj(\0"@ # \0(\xBC!\v  AtH Aj!\r\0\v\v \0(\xDC"E\r\0 #\v\v \fA\x846\b \f("@ \f \f(\f6\xCC  \fA\xCCj(\v \f(# \fA\x8468 \f(@"@ \f \f(<6\b  \fA\bj(\v \f(H# \fA\x846h \f(p"@ \f \f(l68  \fA8j(\v \f(x# \fA\x846\x98 \f(\xA0"@ \f \f(\x9C6h  \fA\xE8\0j(\v \f(\xA8#\v \fA\xD0j$\0 A\0J Ak!\r\0\v\f\v\f\v \v(H!\v A\0J@A!\0@ \0At" \v(4j(\0"@  (\0(\0\v \v(  j(\0"@  (\0(\0\v \v(\f j(\0"@  (\0(\0\v \0 F \0Aj!\0E\r\0\v\v \v(# \v($# \v(8# \vA\xD0\0j$\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x96\x7F \0(# \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xB8\x07\x7F|#\0A\xE0k"$\0@@@ \0((\0\v \0 \0+\x90D\0\0\0\0\0\0Y@\xA2 (l\xB7"\b\xA2 \b\xA29\x80\v (p"E\r\0@@@ (\f (A\x98lj"+\0"	 \0+\x80"\bd\r\0 +\b"
 \bd\r\0 	 \b\x9A"\vc\r\0 
 \vcE\r\v B\x007\xD0 B\x007\xC8 +\0!	 +\b!
 B\x007\xB0 B\x007\xA8  
9\xC0  	9\xB8 A\x94;6\xA0  \b9\x98  \b\x9A"	9\x90  	9\x88  	9\x80 A\x94;6x  \b9p  \b9h  	9\`  \b9X A\x94;6P  \b9H  \b9@  \b98  	90 A\x94;6(  	9   \b9  	9  	9\b A\x94;6\0 A\xA0j A\xF8\0j A\xC8j\xCEAF@ (\f (A\x98lj" +\xC89\0  +\xD09\b\f\v A\xA0j A\xD0\0j A\xC8j\xCEAF@ (\f (A\x98lj" +\xC89\0  +\xD09\b\f\v A\xA0j A(j A\xC8j\xCEAF@ (\f (A\x98lj" +\xC89\0  +\xD09\b\f\v A\xA0j  A\xC8j\xCEAF@ (\f (A\x98lj" +\xC89\0  +\xD09\b\f\v (xE\r\0 A\xDCj"\x07A\x98\xF8A\x82A-8A\xEDA68" (\0A\fk(\0j("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+"A
 (\0(\0! \x07J  y &\v (\0"\r\0\v (p"E\r\0 \0+\xB0!\b \0+\xA8!	 (\f!@  (A\x98lj"+\b\x9C!
 	 +\0\x9C"\vd@ \0 	D\0\0\0\0\0\0\0\xC0\xA0"	9\xA8 \0 \0+\x98D\0\0\0\0\0\0\0@\xA09\x98\v \b 
d@ \0 \bD\0\0\0\0\0\0\0\xC0\xA0"\b9\xB0 \0 \0+\x98D\0\0\0\0\0\0\0@\xA09\x98\v  
9\b  \v9\0 (\0"\r\0\v\v A\xE0j$\0\v\xE4	\x07\x7F@@@@@@@  \0kAu\0\v A\bk"(\0" \0(\0"N\r \0 6\0  6\0\f\v A\bk"(\0! \0(\b" \0(\0"N@  N\r \0 6\b  6\0 \0(\f! \0 Ak"(\x006\f  6\0 \0(\b" \0(\0"N\r \0 6\b \0 6\0 \0(! \0 \0(\f6 \0 6\fA\v  H@ \0 6\0  6\0\f\v \0 6\b \0 6\0 \0(! \0 \0(\f6 \0 6\f (\0" N\r \0 6\b  6\0 \0 Ak"\0(\x006\f \0 6\0A\v A\bk! \0(!@ \0(\b" \0(\0"N@  L@ !\f\v \0 6 \0 6\b \0(\f! \0 \0("\x076\f \0 6  N\r \0 6\b \0 6\0 \0(! \0 \x076 \0 6\f\f\v@  J@ \0 6 \0 6\0 \0(! \0 \0(6 \0 6\f\v \0 6\b \0 6\0 \0(! \0 \0(\f6 \0 6\f  N@ !\f\v \0 6 \0 6\b \0(! \0 6 \0 6\f\v !\v (\0" N\r \0 6  6\0 \0(! \0 Ak"(\x006  6\0 \0(" \0(\b"N\r \0 6 \0 6\b \0(\f! \0 \0("6\f \0 6  \0(\0"N\r \0 6\b \0 6\0 \0(! \0 6 \0 6\fA\v \0 \0A\bj \0Aj \0Aj A\bk\xAEA\v \0(!@ \0(\b" \0(\0"N@  N\r \0 6 \0 6\b \0(\f! \0 \0("6\f \0 6  N\r \0 6\b \0 6\0 \0(! \0 6 \0 6\f\f\v  H@ \0 6 \0 6\0 \0(! \0 \0(6 \0 6\f\v \0 6\b \0 6\0 \0(! \0 \0(\f6 \0 6\f  N\r\0 \0 6 \0 6\b \0(! \0 6 \0 6\f\v \0Aj" F\r\0 \0Aj!A\0!@@ (\0" (\0"N\r\0  6\0 (!\x07  (6@@  A\bk"(\0"\bN\r  \b6\0  Ak(\x006 " \0G\r\0\v \0!\v  \x076  6\0 Aj"A\bG\r\0 A\bj F\v "A\bj" G\r\0\v\vA\v \0(! \0 Ak"\0(\x006 \0 6\0A\v\xE0F\x7F|~#\0A\xB0k"$\0@\x7F A\xFCj"
 ("	(\fAk"6 
A\x006\f@\x7F A\0H@ 
A\x006\0 
A\x006\bA\f\v 
 AjA\x98l"'"6 E\r 
 6\0  j!A\b\v 
j 6\0 
(" 
(\bI@@ \x91A\x98j" 
(\bI\r\0\v\v 
\f\v\f\v!  	6\xF8 A\x006\xF4 A\x846\xF0 A@k" 	 A\xF0j5  (@6\xF4 A\xF8\xCA\x006\xF0 A\x90j\x91\x7F A\xC4j"
 	(Ak"6 
A\x006\f@\x7F A\0H@A\0! 
A\x006\0 
A\x006\bA\f\v 
 AjAl"'"6 E\r 
 6\0  j!A\b\v 
j 6\0 
(" 
(\bI@@ A\0; B\x007\b B\x007\0 Aj" 
(\bI\r\0\v\v 
\f\v\f\v!  	6\xC0 A\x006\xBC A\xD06\xB8  	 A\xB8j>  (@6\xBC A\xC4\xCF\x006\xB8 A\0;\xE8 B\x007\xE0 B\x007\xD8 A\xB4j\x93!
 A\x7F6\x94 B\x007\x8C B\x007\xFC B\x007\x84 A\xC4\xCF\x006\xF8 A\0;\xA8 B\x007\xA0 B\x007\x98 A\x7F6\\ B\x007T B\x007D B\x007L A\xF8\xCA\x006@ A\xE0\0j\x91@ 	(l"AN@@ "-\0\xD0\x07AqE\r\0 ((|"E\r\0@ (\x9C (Atj"A\x006\f ("\v@A \v (\b$ B\x007\v (\0"\r\0\v\v@ \0-\0AG\r\0 \0(\b"AM@ \0 At+\xD0Q90\v \0AA \0-\0\x1B6\xB0 \0("AK\r\0 \0 -\0\xECQ6\xC0 \0 -\0\xE8Q6\x90 \0A Atk6\xF8\v 	(p"\x07@ (\xB4!\v (\x8C!\b (\0! (D!\f (!\r@ \r \x07("At"j+\0!   \fj+\0!"  \bj+\0!$  A\x98lj"  \vj+\x009  $9 B\x007   "9\b   9\0 \x07(\0"\x07\r\0\v\v 	(|"@ (\0! (\f!@  ("Atj+\0!   Alj"B\x007\b   D\0\0\0\0\0\0\xF0?  D\0\0\0\0\0\0\0\0d\x1B9\0 (\0"\r\0\v\v A8j\xC0 \0D\0\0\0\0\0\0\xF0? \0(,q9\x80 	!#\0Ak"$\0@@@ \0"	($\0\v (|"\0E\r 	+!  (\xC4!@  \0(Alj" +\0  \xA29\0 \0(\0"\0\r\0\v\f\v 	A\xC4j (\fAk\xB0 	(\xC0"\0@  	(\xBC6\f \0 A\fj(\v 	 6\xC0 A\bj  	A\xB8j5 	 (\b6\xBC (p"\0@ 	(\xC4! (\xFC!@  \0("\vAtj  \vA\x98lj"\v+D\0\0\0\0\0\0\xE0?\xA2"   \xA2 \v+D\0\0\0\0\0\0\xE0?\xA2"   \xA2\xA0\x9F9\0 \0(\0"\0\r\0\v\v (|"\0E\r\0 	(\xC4! 	+!  (\xC4!@  \0(Alj"\v \v+\0  \xA2  \0(\b(Atj+\0\xA0  \0(\f(Atj+\0\xA09\0 \0(\0"\0\r\0\v\v Aj$\0 (\f! A\fj"\0 ("6 \0 6\f\x7F  k"A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAl"'"6 E\r \0  Ahlj6\0  j!A\b\v \0j 6\0@ \0("E\r\0  \0(\b"O\r\0 (\b!@ Ak" Ak")7  )\b7\b  )\x007\0  \0(K\r\0\v\v A\x006 A\xD06\0  (\xC0"\x006\b \0@ A\xACj \0 >  (\xAC6\v A\xC4\xCF\x006\0  )\xD87   )\xE07(  )\xE870#\0A@j"\b$\0 
 
(\0(\0 "(p"@@ (\xFC (A\x98lj 
\x866$ (\0"\r\0\v\v (|"@@ (\f (Alj (\b"\0 (\f"F\x7FA\0 
 (\xFC" \0(A\x98lj($  (A\x98lj($\x92\v6\f (\0"\r\0\v\v \bAj 
\x83!\r \bA\x006\f \bA\xE4 6\0 \bB\x007#\0A@j"\f$\0 \fA\x9C\xCD\x0068 \fA\xA8\xCE\x0064 \fA\x0060 \fA\xFC\xD0\x006$ \fB\x007( \f 
\xC8! (|"\0@ (\f! (\f!@  \0(Alj(\f"@  (Atj \x006\0\v \0(\0"\0\r\0\v\v 
(|"\x07@@ \f \f(0Aj60A %!\0 \f(,! \0B\x007 \0 
6\f \0 \x076\b \0 6 \0A\x006\0 \0A\x006@ \f((@  \x006\0\f\v \f \x006(\v \f \x006, \x07(\0"\x07\r\0\v\v \fA$j"\0 
(lAk \fA8j\xCB \0 
(lAk \fA4j\xCB@ \f(("\0E\r\0 \0(\0"\x07E\r\0 \0(\b"\0(\b(! \0(\f(!A!@ \x07(\b"(\f(!@@  (\b("\vF  Fq\r\0  \vF  Fq\r\0 AN@ \r(\f \0(Atj"\0 \0+\0 \xB8\xA39\0A!\v !\0 ! \v!\f\v@ AF@ \b \b(\fAj6\fA\f%! \b(\b!\v  \x006\b  \v6 A\x006\0@ \b(@ \v 6\0\f\v \b 6\v \b 6\b \r(\f \0("Atj (\f"\v (\f" Atj(\0(Alj+\0 \v  (Atj(\0("Alj+\0\xA09\0\f\v \r(\f \0(Atj" (\f"\v (\f (Atj(\0("Alj+\0 +\0\xA09\0\v \v AljA\x006\f 
  
(\0(\f\0 Aj!\v \x07(\0"\x07\r\0\v AL\r\0 \r(\f \0(Atj"\0 \0+\0 \xB8\xA39\0\v A\xD06\0 (\b"\0@ \f (6< \0 \fA<j,\v (# \fA\xF8\xCE\x006$ \f(("\0@A  \0 \f(,$\v \fA@k$\0 A@k"\0A\fj 
(\fAk\x82 \0(\b"@ \b \0(6<  \bA<j(\v \0 
6\b \bA8j 
 \05 \0 \b(86 A\xF8j"A\fj 
(Ak\x81 (\b"@ \b (6<  \bA<j,\v  
6\b \bA8j 
 >  \b(86 (p"\x07@ \0(\f! (\xFC!@  \x07(A\x98lj"+\0!  +\b!" +!$  ($(A\x98lj"\0 +9 \0 $9 \0A\x006$ \0 \x076  \0 "9\b \0  9\0 \x07(\0"\x07\r\0\v\v (|"@ (\f!@  (Alj"\0(\f"@ \0+\0!  (\f (Alj"\0A\x006\f \0 6\b \0  9\0\v (\0"\r\0\v\v \b("\0@ \0(\0! \0(\b!\x07 \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0 @@ A\x006 (\f \x07("\0Alj \r(\f \0Atj+\x009\0 (\0 (\b!\x07 A\xF0\xD8(\x006\0A\xF0\xD8 6\0"\r\0\v\v (\f \x07("\0Alj \r(\f \0Atj+\x009\0\v \rA\xD06\0 \r(\b"\0@ \b \r(6\0 \0 \b,\v \r(# \bA@k$\0 A\xD06\0 (\b"\0@  (6\xAC \0 A\xACj,\v (#A\0!#\0A0k"$\0 	 
 A\bj 
\xCC"\r\xB5"6\xA0A\x7FA\x7F \xADB\x84~"0\xA7"\0Aj" \0 K\x1B 0B \x88\xA7\x1B0"\0 6\0 \0Aj!A\0!\0 @  A\x84lj! !\0@ \0\x93A\x84j"\0 G\r\0\v 	(\xA0!\0\vA\x7FA\x7F \0\xADB\xB8~"0\xA7"A\bj"  K\x1B 0B \x88\xA7\x1B0" \x006 A\bj! \0@  \0A\xB8lj! !\0@ \0A\x7F6 \0B\x007 \0B\x007 \0B\x007\f \0A\xF8\xCA\x006\0 \0A j\x91 \0A\xB8j"\0 G\r\0\v 	(\xA0!\vA\x7FA\x7F \xADB8~"0\xA7"\0A\bj" \0 K\x1B 0B \x88\xA7\x1B0"\0 6 \0A\bj! @  A8lj! !\0@ \0A\x7F6 \0B\x007 \0B\x007 \0B\x007\f \0A\xC4\xCF\x006\0 \0A jA\0; \0B\x007( \0B\x007  \0A8j"\0 G\r\0\v\v A@k!#\0Ak"\0$\0 
(p"\x07@@ (\f \x07("A\x98lj  \r(\f Atj(\0A\x84lj\x866$ \x07(\0"\x07\r\0\v\v 
(|"\x07@@ (\x84 \x07(Alj  \r(\f \x07(\b("Atj(\0A\x84lj (\f" A\x98lj($  \x07(\f(A\x98lj($\x926\f \x07(\0"\x07\r\0\v\vA\0!\x07 	(\xA0A\0J@@  \x07A\xB8lj"A\fj  \x07A\x84lj"(\fAk\x82 (\b"\v@ \0 (6\f \v \0A\fj(\v  6\b \0A\bj  5  \0(\b6  \x07A8lj"A\fj (Ak\x81 (\b"\v@ \0 (6\f \v \0A\fj,\v  6\b \0A\bj  >  \0(\b6 \x07Aj"\x07 	(\xA0H\r\0\v\v 
(p"\x07@ \r(\f!\v (\f!\b@ \b \x07("A\x98lj"+\0!  +\b!" +!$  \v Atj(\0A\xB8lj(\f ($(A\x98lj" +9  $9 A\x006$  \x076   "9\b   9\0 \x07(\0"\x07\r\0\v\v 
(|"\x07@ \r(\f! (\x84!\v@ \v \x07(Alj"+\0!    \x07(\b(Atj(\0A8lj(\f (\f(Alj"A\x006\f  \x076\b   9\0 \x07(\0"\x07\r\0\v\v \0Aj$\0@ 	(\xA0"AG@A\0!\0 A\0L\r@ 	  \0A\x84lj  \0A\xB8lj  \0A8lj\xAF \0Aj"\0 	(\xA0H\r\0\v\f\v 	   \xAF\v !A\0!#\0A0k"\b$\0 \bAj"\x1BB\x007\b \x1BB\x007\0 \bA\x006\f \bA\x88(6\0 \bB\x007@ 	(8E@ \bA\x006\f \b("\0@A\xC0\0 \0 \b(\b$ \bB\x007\v 	(\xA0A\0J@@  A\xB8lj(\f"\v  A\x84lj(p"(A\x98lj"\0+\b"" \0+D\0\0\0\0\0\0\xE0?\xA2"  \0+D\0\0\0\0\0\0\xE0?\xA2"$   $d\x1B"&\xA0!  " &\xA1!" \0+\0"! &\xA0!$ ! &\xA1!& (\0"\0@@ \v \0(A\x98lj"+\b"# +D\0\0\0\0\0\0\xE0?\xA2"! +D\0\0\0\0\0\0\xE0?\xA2") ! )d\x1B"!\xA0")     )c\x1B!  # !\xA1"# " " #d\x1B!" +\0"# !\xA0") $ $ )c\x1B!$ # !\xA1"! & ! &c\x1B!& \0(\0"\0\r\0\v\v 	+@!! \b \b(\fAj6\fA\xC0\0%!\0 \b(\b! \0B\x007 \0 " !D\0\0\0\0\0\0\xE0?\xA2""\xA1"!9 \0 & "\xA1"&9\b \0 6 \0A\x006\0 \0B\x007  \0A\0:\0< \0 68 \0   "\xA0 !\xA190 \0 $ "\xA0 &\xA19(@ \b(@ \b(\b \x006\0\f\v \b \x006\v \b \x006\b Aj" 	(\xA0H\r\0\v\v\f\v#\0A0k"\x07$\0 \x07Aj 	(\xA0Ak\xAD!\f \x07 	(\xA0Ak\xAD! \bA\x006\f \b("\0@A\xC0\0 \0 \b(\b$ \bB\x007\v 	(\xA0"A\0J@@  A\xB8lj"(\f"  A\x84lj"(p"\v(A\x98lj"\0+\b"" \0+D\0\0\0\0\0\0\xE0?\xA2"  \0+D\0\0\0\0\0\0\xE0?\xA2"$   $d\x1B" \xA0!! "  \xA1!# \0+\0""  \xA0!' "  \xA1!% \v(\0"\0@@  \0(A\x98lj"\v+\b"" \v+D\0\0\0\0\0\0\xE0?\xA2"  \v+D\0\0\0\0\0\0\xE0?\xA2"$   $d\x1B" \xA0"$ ! ! $c\x1B!! "  \xA1"" # " #c\x1B!# \v+\0""  \xA0"$ ' $ 'd\x1B!' "  \xA1"  %   %c\x1B!% \0(\0"\0\r\0\v\v ! 	+@D\0\0\0\0\0\0\xE0?\xA2""\xA0 # "\xA1"&\xA1!  ' "\xA0 % "\xA1"$\xA1!"|D\0\0\0\0\0\0\xF0? AG\r\0 "  \xA3"! 	+0"#c@ # !\xA3\f\v ! #\xA3\v!# A0l" \f(\0j"\0A\fj (\fAk\xAC \0(\b"@ \x07 \0(6,  \x07A,j(\v \0 6\b \x07A(j  \05 \0 \x07((6 (\0 j"\0A\fj (\fAk\xAC \0(\b"@ \x07 \0(6,  \x07A,j(\v \0 6\b \x07A(j  \05 \0 \x07((6 (p"@ (\0 j(\f! \f(\0 j(\f!\v (\f! !\0@  \0("A\x98lj"+\0!! \v At"j" +\b")9\b  !9\0  \vG@  j" )9\b  !9\0\v \0(\0"\0\r\0\v\v 	(8"A\0J@ "  \xA2 #\xA2!) (\f" (A\x98lj"+D\0\0\0\0\0\0\xE0?\xA2"! +D\0\0\0\0\0\0\xE0?\xA2"# ! #d\x1B!- \f(\0 j! 	+@D\0\0\0\0\0\0\xE0?\xA2!. (\0 j!A!\0 Aj\xB7!/ 	(\xA0! (\0!\v@ \0"\xB8 /\xA3D-DT\xFB!\xF9?\xA2"#|!! #{!# @ (\f! (\f! !\0@  \0("A\x98lj" #  Atj"+\0"(\xA2 ! +\b"'\xA2\xA09\b  ! (\xA2 # '\xA2\xA19\0 \0(\0"\0\r\0\v\v +\b"# -\xA0!! # -\xA1!# +\0"( -\xA0!' ( -\xA1!% \v"\0@@  \0(A\x98lj"+\b"+ +D\0\0\0\0\0\0\xE0?\xA2"( +D\0\0\0\0\0\0\xE0?\xA2", ( ,d\x1B"(\xA0", ! ! ,c\x1B!! + (\xA1"+ # # +d\x1B!# +\0"+ (\xA0", ' ' ,c\x1B!' + (\xA1"( % % (d\x1B!% \0(\0"\0\r\0\v\v ! .\xA0 # .\xA1"(\xA1!! ' .\xA0 % .\xA1"'\xA1!#@ )||@ AG"\0E@ # !\xA3"% 	+0"*cE\r * %\xA3\f\v # !\xA2\f\v % *\xA3\v!+ # !\xA2",| * ! #\xA3"%d@ * %\xA3\f\v % *\xA3\v\xA2!* , +\xA2\v"%d@ (\f! !\0@  \0("A\x98lj"+\0!   Atj" +\b9\b   9\0 \0(\0"\0\r\0\v !!  #!" (!& '!$ %!)\f\v \0\r\0 ) *dE\r\0 (\f! !\0@  \0("A\x98lj"+\0!   Atj" +\b9\b   9\0 \0(\0"\0\r\0\v !!  #!" (!& '!$ *!)\v Aj!\0  G\r\0\v\v@@ 	+0"!D\0\0\0\0\0\0\xF0?c "  \xA3"#D\0\0\0\0\0\0\xF0?dqE@ #D\0\0\0\0\0\0\xF0?cE\r !D\0\0\0\0\0\0\xF0?fE\r\v @ \f(\0 j(\f!\v !\0@ \v \0(Atj"+\b!!  +\x009\b  !\x9A9\0 \0(\0"\0\r\0\v\v  \x9A &\xA1!# "!! $!&\f\v  !! "!  $!#\v @ \f(\0 j(\f!\0 (\f!@ \0 ("\vAtj"+\0!"  \vA\x98lj"\v +\b9\b \v "9\0 (\0"\r\0\v\v \b \b(\fAj6\fA\xC0\0%!\0 \b(\b! \0B\x007 \0 &9 \0 #9\b \0 6 \0A\x006\0 \0B\x007  \0A\0:\0< \0 68 \0 !90 \0  9(@ \b(@ \b(\b \x006\0\f\v \b \x006\v \b \x006\b Aj" 	(\xA0"H\r\0\v\v ("\0 (\bI\x7F@ \0 \0(\0(\0\0\0 \0A0j"\0 (\bI\r\0\v ( \0\v# \f("\0 \f(\bI\x7F@ \0 \0(\0(\0\0\0 \0A0j"\0 \f(\bI\r\0\v \f( \0\v# \x07A0j$\0\v \x1B \b 	+0 	(H 	(< \bA(j \bA j\xA8 \b("\v@ (\f! \v!@  (8"\0A\x84lj(p!@@ -\0<AF@ E\r  \0A\xB8lj(\f!\x07 !\0@ \x07 \0(A\x98lj"\f+\b!  \f \f+\x009\b \f  \x9A9\0 \0(\0"\0\r\0\v\f\v E\r  \0A\xB8lj(\f!\x07\v@ \x07 (A\x98lj"\0+\0!  +\b!" +!$  \0( (A\x98lj"\f \0+\b + \xA0 +\xA19\b \f   $\xA0 "\xA19\0 (\0"\r\0\v\v (\0"\r\0\v \bA\xA0)6\0A\xC0\0 \v \b(\b$\v \bA0j$\0#\0Ak"$\0 @ Ak"(\0"\0@  \0A\x84lj!\0@ \0A\x84k\x87"\0 G\r\0\v\v #\v @ Ak(\0"\0@  \0A\xB8lj!\0@ \0A,kA\xAC-6\0 \0A\xB8k"A\xF8\xCA\x006\0 \0A(k(\0"@A\f  \0A$k(\0$\v \0A\xC4\0kA\xAC-6\0 \0A@j(\0"@A\f  \0A<k(\0$\v \0A\xD4\0kA\xB0\xCC\x006\0 \0A\xD0\0k(\0"@A  \0A\xCC\0k(\0$\v A\x846\0 \0A\xB0k(\0"@  \0A\xB4k(\x006\b  A\bj(\v \0A\xACk\x85 "\0 G\r\0\v\v A\bk#\v @ Ak(\0"\0@  \0A8lj!\0@ \0A8k"A\xD06\0 \0A0k(\0"@  \0A4k(\x006\f  A\fj,\v \0A(k(\0# "\0 G\r\0\v\v A\bk#\v Aj$\0 \rA\x846\0 \r(\b"\0@  \r(6, \0 A,j(\v \r(# A0j$\0 	 
 \xB1 	 A8j\xC09\xE0 
(p"E\r (D! (!	 (L!@ 	  (A\x98lj"\0( (At"j \0+\x009\0  j \0+\b9\0 (\0"\r\0\v\f\v AG\r\0 	(p(At"\0 (jB\x007\0 (D \0jB\x007\0\v A\xAC-6\xCC A\xF8\xCA\x006@ (\xD0"\0@A\f \0 (\xD4$\v A\xAC-6\xB4 (\xB8"\0@A\f \0 (\xBC$\v A\xB0\xCC\x006\xA4 (\xA8"\0@A \0 (\xAC$\v A\x846@ (H"\0@  (D68 \0 A8j(\v (P" (TI\x7F@ A\xAC-6l (p"\0@A\f \0 (t$\v A\xAC-6T (X"\0@A\f \0 (\\$\v A\xB0\xCC\x006D (H"\0@A \0 (L$\v A\x98j" (TI\r\0\v (P \v# A\xD06\xF8 (\x80"\0@  (\xFC6@ \0 A@k,\v (\x88# 
\x87 A\xD06\xB8 (\xC0"\0@  (\xBC6@ \0 A@k,\v (\xC8# A\xAC-6\xFC A\xF8\xCA\x006\xF0 (\x80"\0@A\f \0 (\x84$\v A\xAC-6\xE4 (\xE8"\0@A\f \0 (\xEC$\v A\xB0\xCC\x006\xD4 (\xD8"\0@A \0 (\xDC$\v A\x846\xF0 (\xF8"\0@  (\xF46@ \0 A@k(\v (\x80" (\x84I\x7F@ A\xAC-6l (p"\0@A\f \0 (t$\v A\xAC-6T (X"\0@A\f \0 (\\$\v A\xB0\xCC\x006D (H"\0@A \0 (L$\v A\x98j" (\x84I\r\0\v (\x80 \v# A\xB0j$\0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vh\x7FA\b/"A\x80\xA96\0 \0\x8D"A\rj0"A\x006\b  6  6\0 A\fj! Aj"@  \0 \xFC
\0\0\v  6 A\xB0\xA96\0 A\xBC\xA9A\0\v\xD2
\x7F#\0A k"$\0 (\b("A\0J@ (\f" Atj!@ Ak"A\x7F6\0  K\r\0\v\v B\x007\f A:\0 B\xFF\xFF\xFF\xFF7 B\x007@ \0(p"\x7F@@@ (\f (Atj(\0A\x7FF@A\0" ( (kAjF@ AjA\xA1 (!\v  Aj6 ("\0 Atj 6\0 (\f (Atj \x076\0 (!@ @  Ak"6 \0 Atj(\0("E\r@ (\f (\b("
(Atj"(\0A\x7FF@  \x076\0 (" (" ("\bkAjF@A  AL\x1B"\v j \bkAjAt!	@ (\b"\0@ \0 	i"\0E\r\b  \x006\b (! (! (!\b\f\v  	'"\x006\b \0E\r\v\v   \vj6  \0 	j6\f  \0 \bAtk"\x006\v  Aj"6 \0 Atj 
6\0\v (\0"\r\0\v\f\v\v \x07Aj!\x07\v (\0"\r\f\v\v\f\v (\bA\0\v# A j$\0 \x07\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xDF\x7F#\0Ak"$\0 (! \0A\x006 \0 Ak6 \0A\fj!@\x7F A\0L@ \0A\x006\f \0A\x006A\f\v \0 At"'"6 E\r  6\0  j!A\b\v j 6\0 \0 6\b \0A\x006 \0A\xD06\0 A\fj  \0> \0 (\f6 \0A\xE0\xC2\x006\0 Aj$\0 \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xC0\x7F \0 6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjAt"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\b"I@ (\0!@  6\0 Aj" I\r\0\v\v \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xE4\b\x7F#\0A k"$\0 \0( \0(\bG@ A\x006\b A\fj  A\bj"\xB7!\b@@ A\0H\x7F   AjAt"'"\x076\b \x07E\r  \x07j! Aj\v 6\0 \0("E\r@ \x07  Aj (\0(\b\0At"j!@ \b(\0 j"(\0@ (\0 6\0  6\0\f\v  6\0  6\0\v (\0"\r\0\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vA\0!@ A\0H\r\0 \b(\0! Aq\x7FA\0 (\0"\x7F \0 6 \x07(\0A\0\v!A\v! E\r\0@  At"	j(\0"@@ @  6\0\f\v \0 6\v \x07 	j(\0!\v  Aj"	At"
j(\0"@@ @  6\0\f\v \0 6\v \x07 
j(\0!\v Aj!  	G\r\0\v\v \0 6\b A\x006\0 (\b# \b(#\v A j$\0\v5\x7F @@ \0 (\0\xB9 ( ,\0\x1BA\0H@ (#\v #"\r\0\v\v\v\x8D\x7F#\0Ak"$\0@ \0("E\r\0 \0(\fE\r\0  (\0"6\f A\fjAS! \0(\0\x7F  Akq i"AM\r\0   I\r\0  p\v"\x07Atj(\0"\0E\r\0 \0(\0"\0E\r\0@ AM@ Ak!@@  \0("G@  q \x07G\r\f\v \0(\b F\r\v \0(\0"\0\r\0\v\f\v@@  \0("G@  M\x7F  p \v \x07G\r\f\v \0(\b F\r\v \0(\0"\0\r\0\v\f\v \0!\v Aj$\0 \v5\x7F @@ \0 (\0\xBB ( ,\0A\0H@ (#\v #"\r\0\v\v\v5\x7F @@ \0 (\0\xBC ( ,\0\x1BA\0H@ (#\v #"\r\0\v\v\v5\x7F @@ \0 (\0\xBD ( ,\0A\0H@ (#\v #"\r\0\v\v\v5\x7F @@ \0 (\0\xBE ( ,\0\x1BA\0H@ (#\v #"\r\0\v\v\v5\x7F @@ \0 (\0\xBF ( ,\0A\0H@ (#\v #"\r\0\v\v\vI\x7F|#\0Ak"$\0 \0+\0! @ B\x007\b B\x007\0\v \0 (\0\xB7A\xF7\xB7\xA3"9\0 Aj$\0  \xA1\v\x1B\0A\xE0\xB3A\xF76\0A\xAC\xAAA\xD3\0\xF76\0\vU\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(# \0A\xF0\xD9(\x006\0A\xF0\xD9 \x006\0 Aj$\0\v\xA4|\x7F@@@@@@  \0kAu\0\v A\bk"\b+\0! \0+\b! Ak"+\0" \0+\0"A\xC8\xC7+\0"\xA1"\x07cE@   \xA0cE\r  \x07dE\r   \xA1cE\r\v \0 G@ \0 9\b \0 9\0\v  9\0 \b 9\0A\v \0 \0Aj Ak\`A\v \0 \0Aj \0A j"\b\` A\bk"	+\0! \0+(! Ak"+\0" \0+ "A\xC8\xC7+\0"\xA1"\x07cE@   \xA0cE\r  \x07dE\r   \xA1cE\r\v  \bG@ \0 9( \0 9 \v  9\0 	 9\0 \0+! \0+(! \0+ " \0+" \xA1"\x07cE@   \xA0cE\r  \x07dE\r   \xA1cE\r\v \0 9( \0 9  \0 9 \0 9 \0+\b!  \0+\0" \xA1"\x07cE@   \xA0cE\r  \x07dE\r   \xA1cE\r\v \0 9 \0 9 \0 9\b \0 9\0A\v \0 \0Aj \0A j \0A0j Ak\xC4A\v \0 \0Aj \0A j"\b\` \0A0j"	 F\r\0A\xC8\xC7+\0!@ 	+\b!@ 	+\0" \b+\0" \xA1"cE@   \xA0cE\r  dE\r  \b+\b \xA1cE\r\v 	 9\0 	 \b+\b9\b@@  \bAk"
+\0" \xA1"cE@   \xA0cE\r  dE\r  \bA\bk+\0 \xA1cE\r\v \b 9\0 \b \bA\bk+\x009\b 
"\b \0G\r\0\v \0!\b\v \b 9\b \b 9\0 \vAj"\vA\bG\r\0 	Aj F\v 	"\bAj"	 G\r\0\v\vA\v\xF1| \0  \` +\b! +\b!\x07@ +\0" +\0"\bA\xC8\xC7+\0"	\xA1"
cE@  \b 	\xA0cE\r  
dE\r \x07  	\xA1cE\r\v  G@  \x079\b  9\0\v  9\b  \b9\0 +\b! +\b!\x07 +\0" +\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v  G@  \x079\b  9\0\v  9\b  \b9\0 \0+\b! +\b!\x07 +\0" \0+\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v \0 G@ \0 \x079\b \0 9\0\v  9\b  \b9\0\v +\b! +\b!\x07@ +\0" +\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v  G@  \x079\b  9\0\v  9\b  \b9\0 +\b! +\b!\x07 +\0" +\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v  G@  \x079\b  9\0\v  9\b  \b9\0 +\b! +\b!\x07 +\0" +\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v  G@  \x079\b  9\0\v  9\b  \b9\0 \0+\b! +\b!\x07 +\0" \0+\0"\b 	\xA1"
cE@  	 \b\xA0cE\r  
dE\r \x07  	\xA1cE\r\v \0 G@ \0 \x079\b \0 9\0\v  9\b  \b9\0\v\v\x91\x1B\x7F	|#\0Ak"
$\0@@@@@@@  \0kAu"\0\v A\bk"+\0!\f \0+\b! Ak"+\0"\r \0+\0"A\xC8\xC7+\0"\xA1"\vcE@ \r  \xA0cE\r \v \rcE\r \f  \xA1cE\r\v \0 G@ \0 \f9\b \0 \r9\0\v  9\0  9\0\f\v \0 \0Aj Ak\`\f\v \0 \0Aj \0A j"\` A\bk"+\0! \0+(! Ak"+\0"\f \0+ "A\xC8\xC7+\0"\r\xA1"\vcE@ \f  \r\xA0cE\r \v \fcE\r   \r\xA1cE\r\v  G@ \0 9( \0 \f9 \v  9\0  9\0 \0+! \0+(! \0+ "\f \0+" \r\xA1"\vcE@ \f \r \xA0cE\r \v \fcE\r   \r\xA1cE\r\v \0 9( \0 9  \0 9 \0 \f9 \0+\b! \f \0+\0" \r\xA1"\vcE@ \f \r \xA0cE\r \v \fcE\r   \r\xA1cE\r\v \0 9 \0 9 \0 9\b \0 \f9\0\f\v \0 \0Aj \0A j \0A0j Ak\xC4\f\v AL@ Aq@ \0 F\r \0Aj" F\rA\xC8\xC7+\0!\r \0!@ ! ! +\b! +!@ +"\f +\0" \r\xA1"\vcE@ \f \r \xA0cE\r \v \fcE\r   \r\xA1cE\r\v  9  9\b\x7F \0 \0 F\r\0@ A\bk+\0!@ \f Ak"+\0" \r\xA1"\vc\r\0  \f \r \xA0cE\r  \v \fcE\r   \r\xA1c\r\0 \f\v  9\b  9\0 " \0G\r\0\v \0\v" 9\b  \f9\0\v  Aj"G\r\0\v\f\v \0 F\r \0Aj" F\rA\xC8\xC7+\0!\f@ \0! !\0 +!@ +" +\0" \f\xA1"\vcE@  \f \xA0cE\r \v cE\r  +\b \f\xA1cE\r\v \0!@  9\0  "+\b9\b  Ak"+\0" \f\xA1"\vc\r\0@  \f \xA0cE\r\0 \v cE\r\0  A\bk+\0 \f\xA1c\r\v\v  9\b  9\0\v  \0Aj"G\r\0\v\f\v E@ \0 F\r AkAv!@ !@ AH\r\0 AkAv"	 H\r\0 At"Ar!A\xC8\xC7+\0!@ Aj" N\r\0 \0 Atj"\b+\0" \0 Atj"\x07+\0" \xA1"\vcE@   \xA0cE\r \v cE\r \b+\b \x07+\b \xA1cE\r\v !\v \0 Atj"\x07+\0" \0 Atj"+\0" \xA1"c\r\0 +\b" \xA1!\r \x07+\b!\v@   \xA0"cE\r\0  dE\r\0 \v \rc\r\v@ " G@ \0 Atj" \v9\b  9\0\v@  	J\r\0 At"Ar!@ Aj" N\r\0 \0 Atj"\b+\0"\f \0 Atj"\x07+\0" \xA1"\vcE@ \f  \xA0cE\r \v \fcE\r \b+\b \x07+\b \xA1cE\r\v !\v \0 Atj"+\0" c\r\0 +\b!\v !  cE\r  dE\r \v \rcE\r\v\v \0 Atj" 9\b  9\0\v Ak! \r\0\v@ !A\0!@ AH\r\0 AkAv!\x07A\xC8\xC7+\0! \0+\b!\f \0+\0! \0!@  Atj"	Aj!\x7F At"Ar"\b  Aj"L\r\0 	+" 	A j"+\0" \xA1"\vcE@ \b   \xA0cE\r \b \v cE\r \b 	+ 	+( \xA1cE\r\v ! \v!  G@  +\x009\0  +\b9\b\v !  \x07L\r\0\v@ Ak" F@\f\v  +\x009\0  A\bk"+\x009\b  9\0  \f9\0  \0kAjAu"AH\r +\b!\f@ \0 AkAv"Atj"+\0"\r +\0" \xA1"c@ \f \xA1!  \xA0!\v\f\v \r  \xA0"\vcE\r \r dE\r \f \xA1" +\bdE\r\v@ " G@  \r9\0  +\b9\b\v@ E\r\0 ! \0 AkAv"Atj"+\0"\r c\r \v \rdE\r\0 \r dE\r\0 +\b c\r\v\v\v  9\0  \f9\b\v Ak! AK Ak!\r\0\v\f\v Av!@ A\x81O@ \0 \0 Atj"\x07 Ak\` \0Aj \x07Ak" A k\` \0A j \x07Aj" A0k\`  \x07 \` \0+\0! \0 \x07+\x009\0 \0+\b!\v \0 \x07+\b9\b \x07 \v9\b \x07 9\0\f\v \0 Atj \0 Ak\`\v Ak!@ Aq"	\r\0 \0Ak+\0" \0+\0"A\xC8\xC7+\0"\xA1"\vc\r\0@   \xA0cE\r\0 \v cE\r\0 \0A\bk+\0 \0+\b \xA1c\r\vA\0! \0"+\b!@@ \0+\0"\r "Ak+\0"A\xC8\xC7+\0"\f\xA1"\vcE@ \r  \f\xA0cE\r \v \rcE\r  A\bk+\0 \f\xA1cE\r\v !\0@ \0"\x07Aj!\0 \r \x07+" \f\xA1"\vc\r \r \f \xA0cE\r\0 \v \rcE\r\0  \x07+ \f\xA1cE\r\0\v\f\v@ \0"\x07Aj"\0 O\r \r \0+\0" \f\xA1"\vc\r \r \f \xA0cE\r\0 \v \rcE\r\0  \x07+ \f\xA1cE\r\0\v\v@ \0 O\r\0@ Ak!\x07@ \r  \f\xA1"\vc\r\0@ \r \f \xA0cE\r\0 \v \rcE\r\0  A\bk+\0 \f\xA1c\r\v \x07!\f\v A k+\0! \x07!\f\0\v\0\v \0 I@ +\0! \0+\0!@ \0 9\0 \0+\b!\v \0 +\b9\b  \v9\b  9\0@@ \0"\x07Aj!\0 \r \x07+" \f\xA1"\vc\r\0 \r \f \xA0cE\r \v \rcE\r  \x07+ \f\xA1cE\r\v\v@ \r "\x07Ak"+\0" \f\xA1"\vc\r\0@ \r \f \xA0cE\r\0 \v \rcE\r\0  \x07A\bk+\0 \f\xA1c\r\v\v \0 I\r\0\v\v \0Ak" G@  +\x009\0  \0A\bk+\x009\b\v  \r9\0 \0A\bk 9\0\f\v ! \0+\b"A\xC8\xC7+\0"\v\xA1!\f \0+\0" \v\xA0!  \v\xA1! \0!@ "\x07Aj! \x07+"\r c\r\0@ \r cE\r\0 \r dE\r\0 \x07+ \fc\r\v\v@ \0 \x07G@@ "\x07Ak"+\0"\v c\r \v cE\r\0 \v dE\r\0 \x07A\bk+\0 \fcE\r\0\f\v\0\v  M\r\0@ "\x07Ak"+\0"\v c\r@ \v cE\r\0 \v dE\r\0 \x07A\bk+\0 \fc\r\v  K\r\0\v\v  M"\bE@ +\0!\v@  \v9\0 +\b!\v  +\b9\b  \v9\b  \r9\0@ "\x07Aj! \x07+"\r c\r\0@ \r cE\r\0 \r dE\r\0 \x07+ \fc\r\v\v@ "\x07Ak"+\0"\v cE@ \v cE\r \v dE\r \x07A\bk+\0 \fcE\r\v\v  K\r\0\v\v Ak" \0G@ \0 +\x009\0 \0 A\bk+\x009\b\v  9\0 A\bk 9\0 
 \b:\0\f 
 6\b 
(\b!@ 
-\0\fAG\r\0 \0 \xC3!\x07 Aj" \xC3@ ! \x07E\r\f\v \x07E\r\0 !\0\f\v \0    	\xC5 Aj!\0A\0!\f\v\v 
Aj$\0\v\xE0\b\x7F#\0A k"$\0 \0 \0(\xD0\x07 r6\xD0\x07 Aq@ \0("(\f! \0B\x0070 \0Aj Ak \0A0jZ \0("@  \0(6\f  A\fj(\v \0 6 Aj  \0Aj5 \0 (6 \0("(\f! \0B\x007X \0A\xC4\0j Ak \0A\xD8\0jZ \0(@"@  \0(<6\f  A\fj(\v \0 6@ Aj  \0A8j5 \0 (6< \0("(\f! \0A\x80\xAA+\x009\xA0 \0A\x8Cj Ak \0A\xA0jZ \0(\x88"@  \0(\x846\f  A\fj(\v \0 6\x88 Aj  \0A\x80j5 \0 (6\x84 \0("(\f! \0A\x88\xAA+\x009\xC8 \0A\xB4j Ak \0A\xC8jZ \0(\xB0"@  \0(\xAC6\f  A\fj(\v \0 6\xB0 Aj  \0A\xA8j5 \0 (6\xAC \0("(\f! \0A\xC4\xB2(\x006\xF0 \0A\xDCj Ak \0A\xF0jN \0(\xD8"@  \0(\xD46\f  A\fj(\v \0 6\xD8 Aj  \0A\xD0j5 \0 (6\xD4\v@ A\x80\x80qE\r\0 \0("(\f! \0B\x007\x80 \0A\xEC\0j Ak \0A\x80jZ \0(h"@  \0(d6\f  A\fj(\v \0 6h Aj  \0A\xE0\0j5 \0 (6d \0(\xD0\x07 rA\x80\x80qE\r\0 \0("(\f! \0B\x007\xF8 \0A\xE4j Ak \0A\xF8jZ \0(\xE0"@  \0(\xDC6\f  A\fj(\v \0 6\xE0 Aj  \0A\xD8j5 \0 (6\xDC\v A\x80q@ \0("(\f! \0A\xC8\xB2)\x007\xC0 \0A\xCF\xB2(\0\x006\0\xC7 \0A\xACj Ak \0A\xC0j\xCF \0(\xA8"@  \0(\xA46\f  A\fj(\v \0 6\xA8 Aj  \0A\xA0j5 \0 (6\xA4 \0("(\f! \0A\xD4\xB2)\x007\xEC \0A\xDC\xB2(\x006\xF4 \0A\xD8j Ak \0A\xECj\xCF \0(\xD4"@  \0(\xD06\f  A\fj(\v \0 6\xD4 Aj  \0A\xCCj5 \0 (6\xD0\v@ AqE\r\0 \0(! A\x006 B\x007 A\xEC%6\f#\0Ak"$\0 (!\b \0A\x90j"($"@A  (($ B\x007$\v ("\x07@@A%" (("	6 A\x006\0  \x07+\b9\b  \x07+9@ ($@ 	 6\0\f\v  6$\v  6( \x07(\0"\x07\r\0\v\v  (6, A\fj \bAk A j\xCE (\b"@  (6\f  A\fj,\v  6\b A\bj  >  (\b6 Aj$\0 A\xA8%6\f ("E\r\0A  ($\v A\x80\bq@ \0("(! \0A\xE0\xB2)\x007\xB0 \0A\xE7\xB2(\0\x006\0\xB7 \0A\x9Cj Ak \0A\xB0j\xCF \0(\x98"@  \0(\x946\f  A\fj,\v \0 6\x98 Aj  \0A\x90j> \0 (6\x94\v A\x80\x80q@ \0("(\f! \0A\x006\xE8 \0A\xD4j Ak \0A\xE8jN \0(\xD0"@  \0(\xCC6\f  A\fj(\v \0 6\xD0 Aj  \0A\xC8j5 \0 (6\xCC\v Aq@ \0("(! \0A6\xDC \0A\xC8j Ak \0A\xDCjN \0(\xC4"@  \0(\xC06\f  A\fj,\v \0 6\xC4 Aj  \0A\xBCj> \0 (6\xC0\v A\bq@ \0("(! \0B\x80\x80\x80\x80\x80\x80\x80\xF8?7\x80\x07 \0A\xECj Ak \0A\x80\x07jZ \0(\xE8"@  \0(\xE46\f  A\fj,\v \0 6\xE8 Aj  \0A\xE0j> \0 (6\xE4\v A q@ \0A\x80j \0("(\fAk\x89 \0(\xFC"@  \0(\xF86\f  A\fj(\v \0 6\xFC Aj  \0A\xF4j5 \0 (6\xF8\v@ A\x80\x80qE\r\0 \0("(\f! \0B\x007\xA8 \0A\x94j Ak \0A\xA8jZ \0(\x90"@  \0(\x8C6\f  A\fj(\v \0 6\x90 Aj  \0A\x88j5 \0 (6\x8C \0("(\f! \0B\x007\xD0 \0A\xBCj Ak \0A\xD0jZ \0(\xB8"@  \0(\xB46\f  A\fj(\v \0 6\xB8 Aj  \0A\xB0j5 \0 (6\xB4 \0(\xD0\x07 rA\x80\x80qE\r\0 \0("(\f! \0B\x007\xF8 \0A\xE4j Ak \0A\xF8jZ \0(\xE0"@  \0(\xDC6\f  A\fj(\v \0 6\xE0 Aj  \0A\xD8j5 \0 (6\xDC\v Aq@ \0A\xCCj \0("(Ak\x89 \0(\xC8"@  \0(\xC46\f  A\fj,\v \0 6\xC8 Aj  \0A\xC0j> \0 (6\xC4\v A\xC0\0q@ \0("(! \0A\x006\xA8\x07 \0A\x94\x07j Ak \0A\xA8\x07jN \0(\x90\x07"@  \0(\x8C\x076\f  A\fj,\v \0 6\x90\x07 Aj  \0A\x88\x07j> \0 (6\x8C\x07\v A\x80q@ \0("(\f! \0A\x006\x8C \0A\xF8j Ak \0A\x8CjN \0(\xF4"@  \0(\xF06\f  A\fj(\v \0 6\xF4 Aj  \0A\xECj5 \0 (6\xF0\v A\x80q@ \0("(\f! \0A\x7F6\xC4 \0A\xB0j Ak \0A\xC4jN \0(\xAC"@  \0(\xA86\f  A\fj(\v \0 6\xAC Aj  \0A\xA4j5 \0 (6\xA8\v A\x80q@ \0("(! \0A\x90\xAA(\x006\x8C \0A\xF8j Ak \0A\x8CjN \0(\xF4"@  \0(\xF06\f  A\fj,\v \0 6\xF4 Aj  \0A\xECj> \0 (6\xF0\v A\x80 q@ \0A\x84j \0("(\fAk\x89 \0(\x80"@  \0(\xFC6\f  A\fj(\v \0 6\x80 Aj  \0A\xF8j5 \0 (6\xFC\v A\x80\xC0\0q@ \0("(! \0A\x006\xCC\x07 \0A\xB8\x07j Ak \0A\xCC\x07jN \0(\xB4\x07"@  \0(\xB0\x076\f  A\fj,\v \0 6\xB4\x07 Aj  \0A\xAC\x07j> \0 (6\xB0\x07\v A j$\0\v\xF8	\0 \0A\x7F6, \0A:\0\b \0A\x006 \0A\x80:6\0 \0B\x007 \0B\x007 \0B\x007$ \0A\x7F6T \0A\x98<6 \0B\x007< \0B\x007D \0B\x007L \0B\x80\x80\x80\x80p7x \0A\x98<68 \0B\x007d \0B\x007l \0A\x006t \0B\x80\x80\x80\x80p7\xA0 \0A\x98<6\` \0B\x007\x8C \0B\x007\x94 \0A\x006\x9C \0A\x98<6\x88 \0B\x80\x80\x80\x80p7\xC8 \0B\x007\xB4 \0B\x007\xBC \0A\x006\xC4 \0A\x98<6\xB0 \0B\x80\x80\x80\x80p7\xF0 \0B\x007\xDC \0B\x007\xE4 \0A\x006\xEC \0B\x80\x80\x80\x80p7\x98 \0A\x98<6\xD8 \0A\x006\x94 \0B\x007\x8C \0B\x007\x84 \0B\x80\x80\x80\x80p7\xC0 \0A\x98<6\x80 \0A\x006\xBC \0B\x007\xB4 \0B\x007\xAC \0B\x80\x80\x80\x80p7\xE8 \0A\x98<6\xA8 \0A\x006\xE4 \0B\x007\xDC \0B\x007\xD4 \0B\x80\x80\x80\x80p7\x8C \0A\xEC<6\xD0 \0A\x006\x88 \0B\x007\x80 \0B\x007\xF8 \0A\xF8&6\xF4 \0B\x007\x94 \0A\x006\x9C \0B\x80\x80\x80\x80p7\xB8 \0A\x006\xB4 \0B\x007\xAC \0B\x007\xA4 \0A\xEC=6\xA0 \0A\xC0jA\x07_ \0A\x7F6\xE8 \0A\0:\0\xCA \0A;\xC8 \0A\x80\x80\x80\xFC6\xC4 \0B\x007\xD0 \0B\x007\xD8 \0B\x007\xE0 \0A\xEC>6\xCC \0A\xECjA\x8F_ \0A\xF0jA\x07_ \0A\x7F6\x94 \0A6\xF4 \0B\x007\xFC \0B\x007\x84 \0B\x007\x8C \0B\x007\x98 \0A\xF8&6\xF8 \0A\x006\xA0 \0A\x7F6\xC0 \0B\x007\xA8 \0B\x007\xB0 \0B\x007\xB8 \0B\x80\x80\x80\x80p7\xE0 \0A\xCC*6\xA4 \0B\x007\xCC \0B\x007\xD4 \0A\x006\xDC \0A\xCC*6\xC8 \0B\x80\x80\x80\x80p7\x84 \0A\x006\x80 \0B\x007\xF8 \0B\x007\xF0 \0A\xEC?6\xEC \0B\x80\x80\x80\x80p7\xA8 \0B\x007\x94 \0B\x007\x9C \0A\x006\xA4 \0A\xE4#6\x90 \0A\x006\xBC \0B\x007\xB4 \0A\xEC%6\xB0 \0B\x80\x80\x80\x80p7\xD8 \0B\x007\xC4 \0B\x007\xCC \0A\x006\xD4 \0A\xF8!6\xC0 \0B\x007\xE0 \0A\x006\xE8 \0A\x006\x80 \0B\x80\x80\x80\x80p7\x84 \0B\x007\xF8 \0B\x007\xF0 \0B\x80\x80\x80\x80p7\xA8 \0A\xFC\xC0\x006\xEC \0A\x006\xA4 \0B\x007\x9C \0B\x007\x94 \0A\x84\xC2\x006\x90 \0A\xB0jA\x07_ \0A\x7F6\xD8 \0A\0:\0\xBA \0A;\xB8 \0A\x80\x80\x80\xFC6\xB4 \0B\x007\xC0 \0B\x007\xC8 \0B\x007\xD0 \0A\x7F6\xFC \0A\xE0\xC2\x006\xBC \0B\x007\xE4 \0B\x007\xEC \0B\x007\xF4 \0B\x80\x80\x80\x80p7\xA0\x07 \0A\xBC+6\xE0 \0B\x007\x8C\x07 \0B\x007\x94\x07 \0A\x006\x9C\x07 \0B\x80\x80\x80\x80p7\xC4\x07 \0A\xB4\xC3\x006\x88\x07 \0B\x007\xB0\x07 \0B\x007\xB8\x07 \0A\x006\xC0\x07 \0A\xC4\xC4\x006\xAC\x07 \0A\x006\xD0\x07 \0 6 \0 \xC6 \0\v\xDE\x7F#\0Ak"$\0 (! \0A\x006 \0 Ak6 \0A\fj!@\x7F A\0L@ \0A\x006\f \0A\x006A\f\v \0 At"'"6 E\r  6\0  j!A\b\v j 6\0 \0 6\b \0A\x006 \0A\xD06\0 A\fj  \0> \0 (\f6 \0A\xA06\0 Aj$\0 \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xBA\x7F \0(<"@@ (\b" (\0(\0 (\0"\r\0\v\v@ \0(p"E\r\0@ ("@A  ($\v (\0"\r\0\v \0(p"E\r\0A   \0(t$ \0A\x006t \0B\x007l\v \0(|"@A  \0(\x80$ \0A\x006\x80 \0B\x007x\v \0A6\f \0B\x007 \0("@@ (\b" \0(\f (\0(\f\0 (\0"\r\0\v\v \0($"@@ (\b" \0( (\0(\f\0 (\0"\r\0\v\v \0(0"@@ (\b" \0(At (\0(\f\0 (\0"\r\0\v\v\v\xFB\x7F \0(<"@@ (\b"  (\0(\0 (\0"\r\0\v\v (\f! (\b! ("(\0!@ ("@  6\0\f\v  6\v@ @  6\f\v  6\v  (Ak6 A\xA0\xD9(\x006\0A\xA0\xD9 6\0  (\fAk6\f ("(\0!@ ("@  6\0\f\v  6\v@ @  6\f\v  6\v  (Ak6 A\xA0\xD9(\x006\0A\xA0\xD9 6\0  (\bAk6\b (\0!@ ("@  6\0\f\v \0 6|\v@ @  6\f\v \0 6\x80\v \0 \0(xAk6x A\xB0\xD9(\x006\0A\xB0\xD9 6\0\v\xC2\x7F \0(<"@@ (\b"  (\0(\b\0 (\0"\r\0\v\v@ ("@ \0 (\f \0(\0(\f\0\f\v\v (\0!@ ("@  6\0\f\v \0 6p\v@ @  6\f\v \0 6t\v \0 \0(lAk6l ("\0@A \0 ($\v A\xC0\xD9(\x006\0A\xC0\xD9 6\0\v\xDE\x7F#\0Ak"$\0 (\f! \0A\x006 \0 Ak6 \0A\fj!@\x7F A\0L@ \0A\x006\f \0A\x006A\f\v \0 At"'"6 E\r  6\0  j!A\b\v j 6\0 \0 6\b \0A\x006 \0A\x846\0 A\fj  \05 \0 (\f6 \0A\xCC*6\0 Aj$\0 \0\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vw\x7F \0A\xD06\0 \0(\b"@ \0("(\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v  6$\v@ @  6\f\v  6(\v\v \0(# \0\v	\0 \0\x87#\v#\x7F \0A\x9C66\0 \0("@A\f  \0(\b$\v \0\v#\x7F \0A\xE066\0 \0("@A\f  \0(\b$\v \0\v#\x7F \0A\xA476\0 \0("@A\f  \0(\b$\v \0\v#\x7F \0A\xEC76\0 \0("@A\f  \0(\b$\v \0\v\b\0A\xC0\xB2A\vd\x7F#\0A k"$\0  6  6\f Aj Aj A\bj \0\0 ( A\x006 (\f"A	O@ \0\v ("A	O@ \0\v A j$\0\v\0A\xA8
AA\xE03A\xEC3A\xD0\0A\xD1\0A\0A\0\v\xC9\xAA'\x7F|~}#\0A\xF0\0k"$\0A!\b@ A\xE5\bVE\r\0 (A\xE5\b"\b! \bA	O@ \b\0\vA\x9C\xB2-\0\0AqE@AA\xE44A!\bA\x9C\xB2A:\0\0A\x98\xB2 \b6\0\v A	O@ \x07\v  6 A\x006\0A\x98\xB2(\0 A\0  Aj (\0"\b@ \b\v\xFC!\b A	I\r\0 \0\v@ A\x9B
VE\r\0 (A\x9B
"! A	O@ \0\vA\xBC\xB2-\0\0AqE@AA\x845A!A\xBC\xB2A:\0\0A\xB8\xB2 6\0\v A	O@ \x07\v  6 A\x006\0A\xB8\xB2(\0 A\0  Aj (\0"@ \vD\0\0\0\0\0\0\0\0b! A	I\r\0 \0\vD\0\0\0\0\0\0.@!+@ A\xD0\rVE\r\0 (A\xD0\r"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6 A\x006\0A\x90\xB2(\0 A\0  Aj!+ (\0"@ \v A	I\r\0 \0\vDR\xD7\xDA\xFBTU\xF5?!1@ A\xBC\rVE\r\0 (A\xBC\r"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6 A\x006\0A\x90\xB2(\0 A\0  Aj!1 (\0"@ \v A	I\r\0 \0\v A:\0d A6\` B\x80\x80\x80\x80\x80\x80\x80\xF8?7@ B\x80\x80\x80\x80\x80\x80\x80\xF8?78 B\x80\x80\x80\x80\x80\x80\x80\xF8?70 B\x80\x80\x80\x80\x80\x80\xD0\xC7\xC0\x007( B\x80\x80\x80\x80\x80\x80\xD0\xC7\xC0\x007  A\x006  19X  +9P  :\0L  \b6H@ A\x86VE\r\0 (A\x86"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x90\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *9  A	O@ \0\v (A\x86"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x90\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *9( A	I\r\0 \0\v@ A\xD7VE\r\0 (A\xD7"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x90\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *90 A	I\r\0 \0\v@ A\xBAVE\r\0 (A\xBA"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x90\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *98 A	I\r\0 \0\v@ A\xCCVE\r\0 (A\xCC"! A	O@ \0\vA\x94\xB2-\0\0AqE@AA\xDC4A!A\x94\xB2A:\0\0A\x90\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x90\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *9@ A	I\r\0 \0\v@ A\xBEVE\r\0 (A\xBE"! A	O@ \0\vA\x9C\xB2-\0\0AqE@AA\xE44A!A\x9C\xB2A:\0\0A\x98\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\x98\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *\xFC6\` A	I\r\0 \0\v@ A\x96\vVE\r\0 (A\x96\v"! A	O@ \0\vA\xBC\xB2-\0\0AqE@AA\x845A!A\xBC\xB2A:\0\0A\xB8\xB2 6\0\v A	O@ \x07\v  6\0 A\x006lA\xB8\xB2(\0 A\0 A\xEC\0j !* (l"@ \v  *D\0\0\0\0\0\0\0\0b:\0d A	I\r\0 \0\v#\0A\xD0\0k"$\0A 0"B\x007\b B\x007\0 B\x007 B\x80\x80\x80\xFC7  (A\xE0\v""6H A	O@ \0\v A\xB3"! A	O@ \0\vA\xFC\xB1-\0\0AqE@AA\xC44A!A\xFC\xB1A:\0\0A\xF8\xB1 6\0\v A	O@ \x07\v  68 A\x006(A\xF8\xB1(\0 A\0 A(j A8j (("@ \v A	O@ \0\v A\x006L\xFC"\r@@ Aj A\xC4\0j A\xCC\0j\x93  (A\x94""6, A8j A	O\x7F \0 (, \v A(j\xAA (,"A	O@ \0\v (A\xB3"! A	O@ \0\vA\xFC\xB1-\0\0AqE@AA\xC44A!A\xFC\xB1A:\0\0A\xF8\xB1 6\0\v A	I"E@ \x07\v  6( A\x006A\xF8\xB1(\0 A\0 Aj A(j ("
@ 
\v E@ \0\v (A\x9F"! A	O@ \0\vA\x8C\xB2-\0\0AqE@AA\xD44A!A\x8C\xB2A:\0\0A\x88\xB2 6\0\v A	I"E@ \x07\v  6( A\x006A\x88\xB2(\0 A\0 Aj A(j!- ("
@ 
\v E@ \0\v\xFC! -\xB6!<A\xC0\00!\x07@ ,\0CA\0N@ \x07 (@6\b \x07 )87\0\f\v \x07 (8 (<a\v \x07B\x007 \x07A\0:\0 \x07 <8 \x07 6\f \x07B\x007  \x07A\0:\0( \x07B\x0070 \x07B\x0078  A8j"6  6A\0! (\0  ,\0\v"
A\0H"\f\x1B"	 ( 
 \f\x1B"S! \x7F@ ("("\fE\r\0 (\0\x7F \fAk q \fi"AM\r\0   \fI\r\0  \fp\v"Atj(\0"
E\r\0 
(\0"
E\r\0 AM@ \fAk!@@  
("G@  q F\r\f\v 
(\f 
,\0" A\0H"\x1B G\r\0A\0 
(\b 
A\bj \x1B 	 \\E\r\v 
(\0"
\r\0\v\f\v@@  
("G@ \f M\x7F  \fp \v F\r\f\v 
(\f 
,\0" A\0H"\x1B G\r\0A\0 
(\b 
A\bj \x1B 	 \\E\r\v 
(\0"
\r\0\v\vA0"
 6 
A\x006\0 
A\bj!@ (",\0\vA\0N@  (\b6\b  )\x007\0\f\v  (\0 (a\v 
A\x006@ (\fAj\xB3"< *"= \f\xB3\x94^E\r\0@\x7FA \f \fAkqA\0G \fAIr \fAtr" < =\x95\x8D\xFC"\f  \fK\x1B"AF\r\0   AkqE\r\0 \xC4\v"\f ("M@  \fM\r (\f\xB3 *\x95\x8D\xFC!  \f\x7F@ AI\r\0 iAK\r\0 AA  Akgkt AI\x1B\f\v \xC4\v" \f K\x1B"\fM\r\v  \f\xA5\v ("\f \fAk"qE@  q!\f\v  \fI@ !\f\v  \fp!\v@ (\0" Atj"(\0"E@ 
 (\b6\0  
6\b  A\bj6\0 
(\0"E\r (!@ \f \fAk"qE@  q!\f\v  \fI\r\0  \fp!\v  Atj 
6\0\f\v 
 (\x006\0  
6\0\v  (\fAj6\fA\v:\0,  
6( (( \x076 \x07A:\0 (A\xEB	"! A	O@ \0\v (A\xC7	"
! 
A	O@ 
\0\v@ \rE\r\0 \rE\r\0A\x94\xB2-\0\0AqE@AA\xDC4A!
A\x94\xB2A:\0\0A\x90\xB2 
6\0\v A	O@ \x07\v  6( A\x006A\x90\xB2(\0 A\0 Aj A(j!* ("
@ 
\vA\x94\xB2-\0\0AqE@AA\xDC4A!
A\x94\xB2A:\0\0A\x90\xB2 
6\0\v A	O@ \x07\v  6( A\x006A\x90\xB2(\0 A\0 Aj A(j!- ("
@ 
\v *\xBDB\x86B\xFF\xFF\xFF\xFF\xFF\xFF\xFFoV\r\0 -\xBDB\x86B\x80\x80\x80\x80\x80\x80\x80pZ\r\0 \x07 -98 \x07 *90 \x07A:\0(\v A	O@ \0\v A	O@ \0\v ,\0CA\0H@ (@ (8#\v ("A	O@ \0\v  (LAj"6L  \rI\r\0\v\v@ (\b"E\r\0@@ ,\0A\0N@  (6@  )\b78\f\v A8j (\b (\fa\v@ (< ,\0C" A\0H"\x07\x1B"\f\x7F \fAk"
A\xF7\xFF\xFF\xFF\x07O\r 
 (8 A8j \x07\x1B"\x07j-\0\0!@ \fA\vM@  
:\x003 A(j!\f\v 
A\xF8\xFF\xFF\xFF\x07q"\fA\bj0!  \fA\xF8\xFF\xFF\xFF\x07k60  
6,  6(\v 
@  \x07 
\xFC
\0\0\v  
jA\0:\0\0 ,\x003!\f@ A+G\r\0 (, \f \fA\0H"\x1B"\x07Aj"
A\xF7\xFF\xFF\xFF\x07O\r ((!@ 
A
M@  
:\0# Aj!\f\v 
A\xF8\xFF\xFF\xFF\x07q"A\bj0!  A\xF8\xFF\xFF\xFF\x07k6   
6  6\v \x07@   A(j \x1B \x07\xFC
\0\0\v  \x07jA-;\0\0  Aj\xD1"@ ("
 ("6  
6\v ,\0#A\0N\r\0 (  (#\v \fA\0H@ (0 ((#\v -\0C \v\xC0A\0H@ (@ (8#\v (\0"\r\f\v\v\x9D\0\v  (A\xDA\v""6 A	O\x7F \0 ( \vA\xB3"! A	O@ \0\vA\xFC\xB1-\0\0AqE@AA\xC44A!A\xFC\xB1A:\0\0A\xF8\xB1 6\0\v A	O@ \x07\v  68 A\x006(A\xF8\xB1(\0 A\0 A(j A8j (("@ \v A	O@ \0\v A\x006\f\xFC"@@ Aj Aj A\fj\x93  (\bA\xF0\r""6, A8j A	O\x7F \0 (, \v A(j\xAA (,"A	O@ \0\v  (\bA\xB9\r""6 A(j A	O\x7F \0 ( \v Aj\xAA ("A	O@ \0\vA\0!
@ AjA\xA5\rVE\r\0 (\bA\xA5\r"! A	O@ \0\vA\x9C\xB2-\0\0AqE@AA\xE44A!A\x9C\xB2A:\0\0A\x98\xB2 6\0\v A	I"E@ \x07\v  6 A\x006LA\x98\xB2(\0 A\0 A\xCC\0j Aj (L"@ \v\xFC!
 \r\0 \0\vA\0!#\0A k"$\0  A8j"\xD1!\f  A(j"\xD1!\x07@ \fE\r\0 \x07E\r\0A0! \f(! \x07(!	 A\0;  	6  6\0 A\0:\0  6\b A\x006\f  
6\b  ("6\f (!
  Aj6  A\bj6  A\fj6 \x7F  
I@  6\0 Aj\f\v Aj} (\f\v6  \f("( "6\f ($!
  Aj6  A\bj6  A\fj6 \x7F  
I@  (\b6\0 Aj\f\v Aj} (\f\v6   \x07("( "6\f ($!
  Aj6  A\bj6  A\fj6 \x7F  
I@  (\b6\0 Aj\f\v Aj} (\f\v6  (\b!\v A j$\0 @ A:\0  Aj"A\xED \x8F:\0  A\xE4 \x8F:\0\v ,\x003A\0H@ (0 ((#\v ,\0CA\0H@ (@ (8#\v (\b"A	O@ \0\v  (\fAj"6\f  I\r\0\v\v ("A	O@ \0\v (H"A	O@ \0\v A\xD0\0j$\0 !\f \b! "
Aj!A\0!A\0!\b#\0A\xE0k"$\0 A\xA8j A\xD4j\x93"\x83!\x1B A\xD0j A\xF49(\0A\xF09(\0r\xC7! B\x007\xC0 B\x007\xB8 A\x80\x80\x80\xFC6\xC8@\x7F@ @ A\x006\xF8
 B\x007\xF0
 A\x006\xB0\b B\x007\xA8\b@ (\b"E\r\0@ ("-\0AF@@@@@ (" ,\0\v" A\0H"\b\x1B"@ Ak"A\xF7\xFF\xFF\xFF\x07O\r (\0!@ A\vM@  :\0\v !\f\v A\xF8\xFF\xFF\xFF\x07q"\x07A\bj0!  \x07A\xF8\xFF\xFF\xFF\x07k6\b  6  6\0\v @    \b\x1B \xFC
\0\0\v  jA\0:\0\0\f\v \bE@  (\b6\b  )\x007\0\f\v  (\0 a\v (\0 (! ,\0\v! A\x006\x94 A\x80\bj!\b A\x94j!\v#\0A0k!\r  A\0H"\x1B"\x07 \x07   \x1Bj"" \x07F\x7FA\0 \x07-\0\0A-F\v"j"	!@  	F\r\0@ -\0\0A0G\r Aj" G\r\0\v !\v@@@@@@@@  G@A
! -\0\0A0kA\xFFqA
I\r\v  	G\r \b \x076\0 \bA6\f\x07\v@@ -\0\0"\x07A:kA\xFFqA\xF6I\r\0 \r Ak"Atj \x07A0kA\xFFq6\0 Aj" F\r\0 \r\v\v\x7F \r At"	j"\x07(\0" A\x07J\r\0 \x07(A
l j" 	A\x1BK\r\0 \x07(\bA\xE4\0l j" 	AK\r\0 \x07(\fA\xE8\x07l j" 	AK\r\0 \x07(A\x90\xCE\0l j" 	AK\r\0 \x07(A\xA0\x8Dl j" 	A\vK\r\0 \x07(A\xC0\x84=l j" 	A\x07K\r\0 \x07(A\x80\xAD\xE2l j"\x07 \r\0 \r( A\x80\xC2\xD7/l \x07j\v!\x07 \r5$A\0 kAtA\xA4\bj5\0~"9\xA7!@   9B \x88\xA7A\0Gk"G@  \x07A\x7FsM -\0\0A0kA\xFFqA
Oq\r@ -\0\0A0kA\xFFqA	K@ \b 6\0\f\b\v Aj" G\r\0\v\f\v  \x07A\x7FsK\r\v  \x07j!@ @ A\x80\x80\x80\x80xK\r\f\v A\0N\r\v \b 6\0\f\vA\0! \r\v \v 6\0\f\v \vA\0 k6\0\f\v \b 6\0\v \bA\xC4\x006\f\v \b 6\0 \bA\x006\v (\x84\bE (\x80\b Fq (\x94! ,\0\vA\0H@ (\b (\0#\v\r \f(\b"E\r@ ("-\0AF@  (\xF4
"6\x80\b (\xF8
!  Aj6  A\xF0
j6\b  A\x80\bj6\0 \x7F  I@  6\0 Aj\f\v } (\x80\b\v6\xF4
\v (\0"\r\0\v\f\v\x9D\0\v (\xF0
" (\xF4
"\bF\r  \b \b kAugAtA>sA\xEC (\xF4
!\b\f\v  6\x84\b  6\x80\b  (\xAC\b"6\x94 (\xB0\b!  A\xA8\bj6\b  A\x80\bj6  A\x94j6\0 \x7F  I@  )\x80\b7\0 A\bj\f\v@@ (\b"( (\0"k"Au"Aj"\bA\x80\x80\x80\x80I@A\xFF\xFF\xFF\xFF (\b k"\x07Au"	 \b \b 	I\x1B \x07A\xF8\xFF\xFF\xFF\x07O\x1B"\bA\x80\x80\x80\x80O\r (!\x07 \bAt"	0"\r j"\b \x07)\x007\0 \b Atk! @   \xFC
\0\0\v  	 \rj6\b  \bA\bj"6  6\0 @ #\v (\0 6\0\f\v\x87\0\v\xCD\0\v (\x94\v"6\xAC\b\v (\0"\r\0\v  (\xA8\b"G@    kAugAtA>sA\xCA (\xA8\b! (\xAC\b!\v (\xF4
!\b  F\r\0@  \b6\x80\b (\xF8
!  Aj6  A\xF0
j6\b  A\x80\bj6\0 \x7F  \bK@ \b (6\0 \bAj\f\v } (\x80\b\v"\b6\xF4
 A\bj" G\r\0\v\v B\x007\x84\b  A\x84\bj"\x076\x80\bA\0 \b (\xF0
"F\r@  (\0"\r6\xD8@@ (\xBC"	E\r\0 (\xC4E\r\0  \r6\0 AS!@ 	iAK"\vE@  	Akq!\f\v " 	I\r\0  	p!\v@ (\xB8" Atj(\0"E\r\0 (\0"E\r\0 \vE@ 	Ak!@@  ("G@  q F\r\f\v (\b \rF\r\v (\0"\r\0\v\f\v@@  ("G@  	O\x7F  	p \v F\r\f\v (\b \rF\r\v (\0"\r\0\v\v \r("E\r\0  6\0 AS!@ \vE@  	Akq!\f\v " 	I\r\0  	p!\v  Atj(\0"E\r\0 (\0"E\r\0 \vE@ 	Ak!	@@  ("\vG@ 	 \vq F\r\f\v (\b F\r\v (\0"\r\0\v\f\v@@  ("\vG@ 	 \vM\x7F \v 	p \v\v F\r\f\v (\b F\r\v (\0"\r\0\v\vA\0! A\x006\x9C B\x007\x94@ \r(" \r( "F\r\0@ \r (\0"(F@  (\0"6\x80  6\xDC\x07 (\x9C!	  A\x94j6\b  A\x80j6  A\xDC\x07j6\0 \x7F  	I@  6\0 Aj\f\v } (\xDC\x07\v"6\x98\v Aj" G\r\0\v  (\x94"\vF\r\0 (\xBC"	E\r\0 (\xC4E\r\0  \vkAu! 	Ak! 	i! (!A\0! (\xB8!@  \v Atj(\0"6\0 AS!@ AK"\rE@  q!\f\v " 	I\r\0  	p!\v@  Atj(\0"E\r\0 (\0"E\r\0@ \rE@@@  ("\rG@ \r q F\r\f\v (\b F\r\v (\0"\r\0\f\v\0\v@@  ("\rG@ 	 \rM\x7F \r 	p \r\v F\r\f\v (\b F\r\v (\0"\r\0\v\f\v  (Ak(\0(Atj+\0!* E@ *!,\f\v * , * ,d\x1B!,\v Aj" G\r\0\v\v , +("*\xA0"-D\0\0\0\0\0\0Y@\xA2\xFC!;D\0\0\0\0\0\0\0\0!,B\0!9@ (\x84\b"E\r\0@ !@@@@ ; )":Y@ : ;S\r 9 )":Y\r\v (\0"\r\f\v 9 :W\r\v ("\r\f\v\v  \x07F\r * ,\xA0",D\0\0\0\0\0\0Y@\xA2\xFC!9\f\0\v\0\v (\xD8   \x1B A\xB8j  - ,A\xAD \x07"!@@ (\x84\b"E\r\0@@@ ; ")":Y@ : ;S\r 9 )":Y\r\v "(\0"\r\f\v 9 :W\r\v ("\r\0\v Aj!\vA 0" 97  ;7  6\b B\x007\0  6\0 (\x80\b(\0"@  6\x80\b\v  (\x84\b"	 F":\0\f@ \r\0@ (\b"-\0\f\r@@ (\b"(\0" F@@ ("\rE\r\0 \r-\0\f\r\0 A:\0\f   	F:\0\f \rA:\0\f\f\v@ (\0 F@ !\f\v  ("(\0"6@ E@  6\b  6\0\f\v  6\b (\b"(\0!  6\b  F@  6\0\f\v  6\v  6\0  6\b (\b"(\0!\v A:\0\f A\0:\0\f  ("6\0 @  6\b\v  (\b"6\b@ (\0 F@  6\0\f\v  6\v  6  6\b\f\v E\r -\0\f\r A:\0\f   	F:\0\f A:\0\f\v " 	G\r\f\v\v@ (\0" G@ !\f\v  ("6\0 @  6\b (\b!\v  6\b@ (\0 F@  6\0\f\v  6\v  6  6\b (\b!\v A:\0\f A\0:\0\f  ("(\0"6 @  6\b\v  (\b"6\b@ (\0 F@  6\0\f\v  6\v  6\0  6\b\v  (\x88\bAj6\x88\b\v  A\xD8j"6\x80  A\xB8j6\xDC\x07  A\xDC\x07j  A\x80j\x94 ( (\0(Ak(\0(Atj+\0!, (\x94"E\r\0  6\x98 (\x9C #\v \b Aj"G\r\0\v\f\v \f(\b"E\r@@ ("-\0AG\r\0@ (\xBC"\bE\r\0 (\xC4E\r\0  6\0 AS!@ \biAK"\x07E@  \bAkq!\f\v " \bI\r\0  \bp!\v@ (\xB8"\r Atj(\0"E\r\0 (\0"E\r\0 \x07E@ \bAk!	@@  ("\vG@ 	 \vq F\r\f\v (\b F\r\v (\0"\r\0\v\f\v@@  ("	G@ \b 	M\x7F 	 \bp 	\v F\r\f\v (\b F\r\v (\0"\r\0\v\v ("E\r\0  6\0 \r\x7F AS" \bAkq \x07E\r\0   \bI\r\0  \bp\v"	Atj(\0"E\r\0 (\0"E\r\0 \x07E@ \bAk!\b@@  ("\x07G@ \x07 \bq 	F\r\f\v (\b F\r\v (\0"\r\0\v\f\v@@  ("\x07G@ \x07 \bO\x7F \x07 \bp \x07\v 	F\r\f\v (\b F\r\v (\0"\r\0\v\v    \x1B A\xB8j D\0\0\0\0\0\0\0\0D\0\0\0\0\0\0\0\0A\0\xAD\v (\0"\r\0\v\f\v (\x84\b\v!  A\x80\bj6\0  \x8E (\xA8\b"@  6\xAC\b (\xB0\b #\v (\xF0
"E\r\0  6\xF4
 (\xF8
 #\v \f(" \f("G@@@ (\0"\r-\0AG\r\0 \r(\fAkAI\r\0 (\xBC"\x07E\r\0 (\xC4E\r\0  \r(\0"\v6\0 AS!A\0!\b@ (\xB8"\x7F  \x07Akq \x07iAK"	E\r\0   \x07I\r\0  \x07p\v"Atj(\0"E\r\0 (\0"E\r\0@ 	E@ \x07Ak!@@ (" G@  q G\r\f\v (\b \vF\r\v (\0"\r\0\v\f\v@@ (" G@  \x07O\x7F  \x07p \v G\r\f\v (\b \vF\r\v (\0"\r\0\v\f\v !\b\v\x7F@@@@ \v("@  6\0 AS!@ 	E@  \x07Akq!\f\v " \x07I\r\0  \x07p!\vA\0!  Atj(\0"E\r (\0"E\r 	\r \x07Ak!@@ (" G@  q G\r\f\v (\b F\r\v (\0"\r\0\v\f\v \bE\r\f\v@@ (" G@ \x07 M\x7F  \x07p \v G\r\f\v (\b F\r\v (\0"\r\0\v\f\v !\v \b\r\0 E\r (\f\f\v \r-\0AF@ \b(\f\f\v \b(Ak\v(\0!  \r("6\0 AS!@ 	E@  \x07Akq!\f\v " \x07I\r\0  \x07p!\vA\0!@  Atj(\0"E\r\0 (\0"E\r\0@ 	E@ \x07Ak!\b@@ (" G@ \b q G\r\f\v (\b F\r\v (\0"\r\0\v\f\v@@ ("\b G@ \x07 \bM\x7F \b \x07p \b\v G\r\f\v (\b F\r\v (\0"\r\0\v\f\v !\v\x7F@@@@ ("@  6\0 AS!@ 	E@  \x07Akq!\b\f\v "\b \x07I\r\0  \x07p!\b\vA\0!  \bAtj(\0"E\r (\0"E\r 	\r \x07Ak!\x07@@ ("	 G@ \x07 	q \bG\r\f\v (\b F\r\v (\0"\r\0\v\f\v E\r\f\v@@ ("	 G@ \x07 	M\x7F 	 \x07p 	\v \bG\r\f\v (\b F\r\v (\0"\r\0\v\f\v !\v \r\0 E\r (Ak\f\v \r-\0AF@ (Ak\f\v (\f\v(\0! \v F@ +"* AA\b (\0\x1Bj+\0 \v(\f\xB8\xA2D\0\0\0\0\x80\x84.A\xA3"- * -d\x1B + \xA3\x9B\xFCAH\r\v   \x92! \x1B(\f (Atj +(9\0\v Aj" G\r\0\v\v@@@  A\x94j \xCC"\xB5"E@ 
B\x007 
 \f6\0 
B\x007\f 
A\x80\x80\x80\xFC6\f\v\x7F A\x80j" Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjAt"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\b"I@@ A\x006\f A\xAC,6\0 B\x007 Aj" I\r\0\v\v \f\v\f\v!\r (p"@@ \r(\0 (\f (Atj(\0Atj" (\fAj6\fA\f%! (\b!  6\b  6 A\x006\0@ (@  6\0\f\v  6\v  6\b (\0"\r\0\v\v@ \f(\b"E\r\0@@ ("-\0AG\r\0 -\0(E\r\0A!\f\v (\0"\r\0\v\v A\0J@ A\xC4
j! A\xA0
j! A\xFC	j!  A\xD8	j!! A\xB4	j!" A\x90\vj!\x07@ (H!  -\0L:\0\x8C\v  6\x88\v  19\x80\v  +9\xF8
  :\0\xF4
  6\xF0
 \x07A\xAC\xC9\x006\0 \x07B\x007\xA8 \x07B\x007\xB0 \x07A\x7F6\xD4 \x07B\x007\xBC \x07B\x007\xC4 \x07B\x007\xCC \x07A\x98<6\xB8 \x07B\x007\x80 \x07B\x007\xF8 \x07A6\xE8 \x07A:\0\x8C \x07A\xAF6\x88 \x07B\x007\xA8 \x07B\x007\xA0 \x07A6\x90 \x07B\x007\xD0 \x07B\x007\xC8 \x07B\x007\xE4 \x07A6\xD8 \x07A\x006\xEC \x07A\xC8\xE1\x006\xE0 \x07B\x99\x80\x80\x80\xC0\x007\xB8 \x07B7\xB0 \x07A6\b \x07A\0:\0A\x98\xAA+\0!* \x07B\x8A\x80\x80\x8078 \x07B\x80\x80\x80\x80\x80\x80\x80\xF8?70 \x07A(6, \x07B\x81\x80\x80\x807$ \x07B\x81\x80\x80\x80\xC0\f7 \x07A\0:\0 \x07 *D\0\0\0\0\0\0\xF0? *D\0\0\0\0\0\0\0\0d\x1B9A\xA0\xAA+\0!* \x07B\x8A\x80\x80\x807\` \x07B\x94\x80\x80\x807X \x07B\xB2\x80\x80\x807P \x07A6H \x07A6\xF8 \x07B\x80\x80\x80\x80\x907\xF0 \x07B\x82\x80\x80\x807\xE8 \x07B\xFB\xA8\xB8\xBD\x94\xDC\x9E\xC2?7\xE0 \x07B\x80\x80\x80\x80\x80\x80\x80\x80\xC0\x007\xD8 \x07A:\0\xD0 \x07B\x9A\xB3\xE6\xCC\x99\xB3\xE6\xE4?7\xC8 \x07A6\xC0 \x07B\x80\x80\x80\x80\x80\x80\x80\xF8?7\xB8 \x07A:\0\xB4 \x07A6\xB0 \x07B\xAE\x8F\x85\xD7\xC7\xC2\xEB\xF7?7\xA8 \x07A\0:\0\xA0 \x07B\x9A\xB3\xE6\xCC\x99\xB3\xE6\xD4?7\x98 \x07A6\x90 \x07B\xFB\xA8\xB8\xBD\x94\xDC\x9E\xC2?7\x88 \x07B\x82\x80\x80\x80 7\x80 \x07B\x80\x80\x80\x80\x80\x80\x80\xF8?7x \x07B\x80\x80\x80\x80\x80\x80\x80\xF8?7p \x07A6h \x07A\0:\0L \x07 *D\0\0\0\0\0\0\xF0? *D\0\0\0\0\0\0\0\0d\x1B9@ A\x006\xB8\v B\x80\x80\x80\x80\x80\x80\x80\xF8?7\xA0\v A\0:\0\x94\v A2A\0 -\0\x8C\v"\x1B6\xC8\v A (\x88\v" A\0H\x1B6\xB0\v  +\x80\v"*D\0\0\0\0\0\0\xF0? *D\0\0\0\0\0\0\0\0d\x1B9\xC0\v  +\xF8
"*D\0\0\0\0\0\0\xF0? *D\0\0\0\0\0\0\0\0d\x1B9\xD0\v E@ A\x006\xCC\v\v AA -\0\xF4
\x1B6\xC0\f (\xF0
"AM@  -\0\xC8-6\x88\r  -\0\xC0-6\xD0\f  -\0\xB8-6\xA0\f\v A\xA8\bj\x93"A\xB4\xC5\x006\0 B\x80\x80\x80\x80p7\xC8	 A\x006\xAC	 "A\x006 "B\x007\b "B\x007\0 B\x80\x80\x80\x80p7\xEC	 A\x846\xB0	 !A\x006 !B\x007\b !B\x007\0 B\x80\x80\x80\x80p7\x90
 A\xA06\xD4	  A\x006  B\x007\b  B\x007\0 B\x80\x80\x80\x80p7\xB4
 A\x006\x98
 A\xEC6\xF8	 A\x006 B\x007\b B\x007\0 B\x80\x80\x80\x80p7\xD8
 A\x846\x9C
 A\x006 B\x007\b B\x007\0 B\x007\xE4
 A\xBC6\xC0
 A\x006\xEC
 A\xE4 6\xE0
 A\x80\bj \x83!# A\xDC\x07j \xC8!#\0Ak"$\0  6\x84 (\f! A\x006\x94 A\x80j Ak A\x94jN (\xFC"@  (\xF86\f  A\fj(\v  6\xFC A\bj  A\xF4j5  (\b6\xF8 A\xA4j (Ak\x84 (\xA0"@  (\x9C6\f  A\fj,\v  6\xA0 A\bj  A\x98j>  (\b6\x9C A\x006\xA8 A\x94j (\fAk A\xA8jN (\x90"@  (\x8C6\f  A\fj(\v  6\x90 A\bj  A\x88j5  (\b6\x8C A\x006\xCC A\xB8j (Ak A\xCCjN (\xB4"@  (\xB06\f  A\fj,\v  6\xB4 A\bj  A\xACj>  (\b6\xB0 A\x006\xF0 A\xDCj (Ak A\xF0jN (\xD8"@  (\xD46\f  A\fj,\v  6\xD8 A\bj  A\xD0j>  (\b6\xD4 Aj$\0 \r(\0 Atj!#\0Ak"$\0 (\x84"(\f! A\x006\x94 A\x80j Ak A\x94jN (\xFC"@  (\xF86\f  A\fj(\v  6\xFC A\bj  A\xF4j5  (\b6\xF8 A\xA4j (\x84"(Ak\x84 (\xA0"@  (\x9C6\f  A\fj,\v  6\xA0 A\bj  A\x98j>  (\b6\x9C (\x84!A\0!\b#\0A0k"	$\0@ (p"E\r\0@ ("@A  ($\v (\0"\r\0\v (p"E\r\0A   (t$ A\x006t B\x007l\v (|"@A  (\x80$ A\x006\x80 B\x007x\v A6\f B\x007@ ("\vE@A!A\0!\f\vA\0!@ \v(\b!A %!  ("Aj6 A\x006\f B\x007 A\x006  6 B\x007 A\x006\0  (t"6@ (p@  6\0\f\v  6p\v  6t  (lAj6l (<"@@ (\b"  (\0(\f\0 (\0"\r\0\v\v (\x80 (Atj 6\0  (\b6\b  (\f6\f ("@@ -\0AqE@A\b%"A\x006\0  (\f6@ E@ !\f\v \b 6\0\v !\b\v (\0"\r\0\v\v \v(\0"\v\r\0\v E@A\0!A!\f\v !@ (\x80" ("(\b(Atj(\0!\v  (\f(Atj(\0!A%" (\b6 B\x007  6\f  \v6\b (\f (Atj 6\0 A\x006\0  (\x80"6@ (|@  6\0\f\v  6|\v  6\x80  (xAj6xA%! (\b!\vA\0! A\x006  6\f A\x006\b B\x007\0  \vAt6  6A%!\v (\b! \vA\x006 \v 6\f \vB\x007\0 \v AtAr6  \v6 \v 6\b ( \v6\b  Aj6\b (\0"\r\0\v\v 	A\0:\0\v\x7F 	Aj" (Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  Aj"'"6 E\r  6\0  j!A\b\v j 6\0@ (" (\b"O\r\0  k"E\r\0  	-\0\v \xFC\v\0\v \f\v\f\v!$ 	 6 	A\x006 	A\xD06\fA\f%" (("6 A\x006\0  	A\fj6\b@ ($@  6\0\f\v  6$\v  6( 	A\x8896\f 	 6 	 	-\0\v:\0, ("@ (\x80!&@ (\b"("@ & (Atj(\0"(!\v (! (! $(\0!' (\f!(@@ ( (\f("%Atj(\0"(\b") (\fF@ % 'j"%-\0\0AF@ (!\f\v (! %A:\0\0\f\v AA  )F\x1Bj(\0!\v  6 A\x006\0@ @  6\0\f\v  6 !\v  6  6 \vAj!\v ! (\0"\r\0\v  \v6\v (\0"\r\0\v\v A (" AL\x1B"Av r"Av r"Av r"A\bv r"Av rAj6\f A (\b" AL\x1B"Av r"Av r"Av r"A\bv r"Av rAj6 ("@@ (\b" (\f (\0(\f\0 (\0"\r\0\v\v ($"@@ (\b" ( (\0(\f\0 (\0"\r\0\v\v (0"@@ (\b" (At (\0(\f\0 (\0"\r\0\v\v 	A\xD06\f 	("\v@ 	("(\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v \v 6$\v@ @  6\f\v \v 6(\v\v 	(# E@A\b  \b$\v 	A0j$\0 ("\b@@ (\x94 (\x80 \b(\b"(Atj(\0(Atj 6\0 ("@@ -\0AqE@ (\f!	 (\xA4 (\f"("\vAtj" (\fAj6\fA\f%" (\b"6 A\x006\0  	 \vAtj(\x006\b@ (@  6\0\f\v  6\v  6\b (\f (Atj(\0(At" (\xDCj 6\0 (\xB8 j 6\0\v (\0"\r\0\v\v \b(\0"\b\r\0\v\v Aj$\0   (\xD0\x07\xC7! (\x98	"@ (\xB4!\b (\x8C!	 (D!\v (! (\xB4! (\x8C! (D! (! (\xBC	!@  ("At"j   Atj(\0(At"j+\x009\0  j  \vj+\x009\0  j  	j+\x009\0  j  \bj+\x009\0 (\0"\r\0\v\v (\xA4	"@ \x1B(\f! (\x8C\b! (\xE0	!\b@  ("	Atj  \b 	Atj(\0(Atj+\x009\0 (\0"\r\0\v\v \x07  #\xB3 (\x98	"@ (D! (! (D!\b (!	 (\xBC	!\v@ \v ("Atj(\0"@  (At"j 	 At"j+\x009\0  j \b j+\x009\0\v (\0"\r\0\v\v \xD0 A\xD06\0 (\xE4\x07"@  (\xE0\x076\0  ,\v (\xEC\x07# #A\xD06\0 (\x88\b"@  (\x84\b6\0  ,\v (\x90\b# \x88 \x07A\xAC\xC9\x006\0 A\xA8%6\xF0 (\xF4"@A  (\xF8$\v A\x846\xC8\r (\xD0\r"@  (\xCC\r6\0  (\v (\xD8\r# Aj" G\r\0\v\v -\0L!A\0! A\x006\xB4\b A\x88(6\xA8\b B\x007\xAC\b@@@ E@ \r( \r(\fkAjA\0J\rA\0!A\0!\f\v@ \r( \r(\fkAj"A\0L@A\0!A\0!\f\v (!	 +D\0\0\0\0\0\0\xE0?\xA2!5 A\x90\vj! A\xFC
j!  A\fj!! AG!A\0!A\0!A\0!@ ! ! !\b ! 	(\fAkU!\v  	6\b A\x006 A\x846\0 A\xF0
j" 	 5  (\xF0
6 A\xB4)6\0 B\x007( B\x007    	(\fAkU!  	6\xF8
 A\x006\xF4
 A\x846\xF0
 A\x80\bj 	 5  (\x80\b6\xF4
 A\xB4)6\xF0
 B\x007\b B\x007\0 (\xB4" \r(\0 Atj("(\b(At"j""+\0D\0\0\0\0\0\0\xE0?\xA2"+ (\x8C" j"+\0D\0\0\0\0\0\0\xE0?\xA2"* * +c\x1B"+ (D"\x07 j"+\0"*\xA0!. * +\xA1!0 (" j"+\0"* +\xA0!/ * +\xA1!, !@ \x07 (\b(At"j+\0"*  j+\0D\0\0\0\0\0\0\xE0?\xA2"+  j+\0D\0\0\0\0\0\0\xE0?\xA2"- + -d\x1B"+\xA0"- . - .d\x1B!. * +\xA1"* 0 * 0c\x1B!0  j+\0"* +\xA0"- / - /d\x1B!/ * +\xA1"+ , + ,c\x1B!, (\0"\r\0\v 5 .\xA0 0 5\xA1"3\xA1!+ 5 /\xA0 , 5\xA1"-\xA1!*|D\0\0\0\0\0\0\xF0? \r\0 1 * +\xA3",d@ 1 ,\xA3\f\v , 1\xA3\v!. (\0! \v(\0! !@  (\b("At"#j+\0!,  At"j"$ \x07 #j+\0"69\b $ ,9\0  G@  j" 69\b  ,9\0\v (\0"\r\0\v * +\xA2 .\xA2!6 \v(\0! (\0!A!\v@ \v\xB8D\0\0\0\0\0\x80I@\xA3D-DT\xFB!\xF9?\xA2".|!, .{!. !@  (\b("At"j ,  Atj"+\0"0\xA2 . +\b"2\xA2\xA19\0 \x07 j . 0\xA2 , 2\xA2\xA09\0 (\0"\r\0\v +\0"0 "+\0D\0\0\0\0\0\0\xE0?\xA2", +\0D\0\0\0\0\0\0\xE0?\xA2". , .d\x1B",\xA0!. 0 ,\xA1!0 +\0"2 ,\xA0!/ 2 ,\xA1!, !@ \x07 (\b(At"j+\0"7  j+\0D\0\0\0\0\0\0\xE0?\xA2"2  j+\0D\0\0\0\0\0\0\xE0?\xA2"8 2 8d\x1B"2\xA0"8 . . 8c\x1B!. 7 2\xA1"7 0 0 7d\x1B!0  j+\0"7 2\xA0"8 / / 8c\x1B!/ 7 2\xA1"2 , , 2d\x1B!, (\0"\r\0\v 5 .\xA0 0 5\xA1"0\xA1!. 5 /\xA0 , 5\xA1"2\xA1!,@|@ E@ , .\xA3"/ 1cE\r 1 /\xA3\f\v , .\xA2!/\f\v / 1\xA3\v!/ , .\xA2"4 /\xA2!/ 4| 1 . ,\xA3"4d@ 1 4\xA3\f\v 4 1\xA3\v\xA2!4\v !@ / 6c@@  (\b("At"j+\0!+  Atj" \x07 j+\x009\b  +9\0 (\0"\r\0\v .!+ ,!* 0!3 2!- /!6\f\v \r\0 4 6cE\r\0@  (\b("At"j+\0!+  Atj" \x07 j+\x009\b  +9\0 (\0"\r\0\v .!+ ,!* 0!3 2!- 4!6\v \vAj"\vA3G\r\0\v !@@ 1D\0\0\0\0\0\0\xF0?c * +\xA3",D\0\0\0\0\0\0\xF0?dq\r\0 ,D\0\0\0\0\0\0\xF0?c 1D\0\0\0\0\0\0\xF0?fq\r\0 +!, *!+ -!.\f\v@  (\b(Atj"+\b!,  +\x009\b  ,\x9A9\0 (\0"\r\0\v +\x9A 3\xA1!. *!, -!3\v@  (\b("At"j  Atj"+\x009\0  \x07j +\b9\0 (\0"\r\0\vA\xC0\0%"B\x007  39  .9\b  6 A\x006\0 B\x007  A\0:\0<  68  ,90  +9( "! @  6\0 \b! !\v A\x846\xF0
 (\xF8
"@  (\xF4
6\x80\b  A\x80\bj(\v (\x80\v# A\x846\0 (\b"@  (6\xF0
  A\xF0
j(\v (# Aj" G\r\0\v\v  6\xB0\b  6\xAC\b  6\xB4\b\f\v +D\0\0\0\0\0\0\xE0?\xA2!+A\0!A\0!@ ! !\b (\xB4" \r(\0 Atj("(\b(At"j+\0D\0\0\0\0\0\0\xE0?\xA2"* (\x8C" j+\0D\0\0\0\0\0\0\xE0?\xA2"- * -d\x1B"* (D"\x07 j+\0"-\xA0!. - *\xA1!0  ("j+\0"- *\xA0!/ - *\xA1!,@ \x07 (\b(At"j+\0"-  j+\0D\0\0\0\0\0\0\xE0?\xA2"*  j+\0D\0\0\0\0\0\0\xE0?\xA2"3 * 3d\x1B"*\xA0"3 . . 3c\x1B!. - *\xA1"- 0 - 0c\x1B!0  j+\0"- *\xA0"3 / / 3c\x1B!/ - *\xA1"* , * ,c\x1B!, (\0"\r\0\vA\xC0\0%"B\x007  0 +\xA1"*9  , +\xA1"-9\b  \b6 A\x006\0 B\x007  A\0:\0<  68  + .\xA0 *\xA190  + /\xA0 -\xA19( ! @ \b 6\0 !\v Aj" \r( \r(\fkAjH\r\0\v\v  6\xB0\b  6\xB4\b  6\xAC\b\v B\x007\b B\x007\0  A\xA8\bj 1A  A\xF0
j A\x80\bj\xA8 (\xAC\b"@ (!\b (D! \r(\0! !@  (8Atj(!@\x7F -\0<AF@ "E\r@ \b (\b(At"\x07j"+\0!+   \x07j"\x07+\0\x9A9\0 \x07 +9\0 (\0"\r\0\vA\0\f\vA\v!@ E@  (\b(At"j"\x07+\0!+ +!* + !-  \bj" +\0 +\xA0 +\b\xA19\0 \x07 + -\xA0 *\xA19\0 (\0!A!\f\v E\rA\0!\f\0\v\0\v (\0"\r\0\v A\xA0)6\xA8\bA\xC0\0  (\xB0\b$\v 
B\x007 
 \f6\0 
B\x007\f 
A\x80\x80\x80\xFC6@ (\xC0"E\r\0 
Aj!@@@ (\f" ("G@@ (\0(At" (Dj+\0!+ ( j+\0!*  (\b6\x80\b  A\x80\bj"6\xA8\b  6\xF0
  A\xF0
j  A\xA8\bj\x94@ (\0"(" ("\x07I@  +9\b  *9\0 Aj!\f\v  (\f"\bk"Au"	Aj"A\x80\x80\x80\x80O\rA\xFF\xFF\xFF\xFF\0 \x07 \bk"\x07Au"   I\x1B \x07A\xF0\xFF\xFF\xFF\x07O\x1B"A\x80\x80\x80\x80O\r At"0"\v j" +9\b  *9\0  	Atk!\x07 @ \x07 \b \xFC
\0\0\v  \v j6  Aj"6  \x076\f \bE\r\0 \b#\v  6 Aj" G\r\0\v\v (\0"\r\0\v (\xC0"E\r@@ (\b("\x07E\r\0 \x07-\0AG\r\0 (" (\fF\r\0@ Ak"(\0(At" (Dj+\0!+ ( j+\0!*  \x076\x80\b  A\x80\bj"6\xA8\b  6\xF0
  A\xF0
j  A\xA8\bj\x94@ (\0"(" ("I@  +9\b  *9\0 Aj!\f\v  (\f"\bk"Au"	Aj"A\x80\x80\x80\x80O\rA\xFF\xFF\xFF\xFF\0  \bk"Au"   I\x1B A\xF0\xFF\xFF\xFF\x07O\x1B"A\x80\x80\x80\x80O\r At"0"\v j" +9\b  *9\0  	Atk! @  \b \xFC
\0\0\v  \v j6  Aj"6  6\f \bE\r\0 \b#\v  6  (\fG\r\0\v\v (\0"\r\0\v\f\v\x87\0\v\xCD\0\v \r(" \r(\bI\x7F@  (\0(\0\0\0 Aj" \r(\bI\r\0\v \r( \v#\v A\x846\0 (\b"@  (6\0  (\v (# (\xC0"@@ (\0 (\f"@  6 ( #\v #"\r\0\v\v (\xB8! A\x006\xB8 @ (\xBC #\v \xD0 \x1BA\xD06\0 \x1B(\b"@  \x1B(6\xD0  A\xD0j,\v \x1B(# \x87 A\xE0j$\0\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v#\0A k"$\0 \0\f"6\f! 
(\f"\b@@@ \b(\b"\0,\0\vA\0N@  \0(\b6  \0)\x007\b\f\v A\bj \0(\0 \0(a\v!!A\0! \b( \b(\fG@@\f! At"\x07 \b(\fj!A\xEB	!@A\xA4\xB2-\0\0Aq@A\xA0\xB2(\0!\0\f\vAA\xEC4A!\0A\xA4\xB2A:\0\0A\xA0\xB2 \x006\0\v  +\x009 A\x006 \0A\0A\0 Aj Aj\xFC!\0 ("@ \v   \0
 \0A	O@ \0\0\v A	O@ \0\v \b(\f \x07j!\x07A\xC7	!@A\xA4\xB2-\0\0Aq@A\xA0\xB2(\0!\0\f\vAA\xEC4A!\0A\xA4\xB2A:\0\0A\xA0\xB2 \x006\0\v  \x07+\b9 A\x006 \0A\0A\0 Aj Aj\xFC!\0 ("\x07@ \x07\v   \0
 \0A	O@ \0\0\v A	O@ \0\v@A\xAC\xB2-\0\0Aq@A\xA8\xB2(\0!\0\f\vAA\xF44A!\0A\xAC\xB2A:\0\0A\xA8\xB2 \x006\0\v  6 A\x006 \0A\0A\0 Aj Aj\xFC!\0 ("@ \v  \0 
 \0A	O@ \0\0\v A	O@ \0\v Aj" \b( \b(\fkAuI\r\0\v\v#\0Ak"\0$\0A\xB4\xB2-\0\0AqE@AA\xFC4A!A\xB4\xB2A:\0\0A\xB0\xB2 6\0\v A\bj"( ,\0\v" A\0H\x1BAj'" ( ,\0\v" A\0H"\x07\x1B"6\0 @ Aj (\0  \x07\x1B \xFC
\0\0\v \0 6\b \0A\x006A\xB0\xB2(\0A\0A\0 \0Aj \0A\bj!+ \0(!  +\xFC6 @ \v \0Aj$\0  ( 
 ("\0A	O@ \0\0\v A	O@ \0\v ,\0A\0H@ ( (\b#\v \b(\0"\b\r\0\v\v A\xCC\v"\0 
 \0A	O@ \0\0\v A	O@ \0\v A j$\0 
(\f"@@ (\0 (\f"@  6 ( #\v #"\r\0\v\v 
(!\0 
A\x006 \0@ 
(\b \0#\v \f(\b"\0@@ \0("@ ("@  6  ($ #\v ,\0\vA\0H@ (\b (\0#\v #\v \0(\0"\0\r\0\v\v \f("\0 \f("G@@ \0(\0"@ #\v \0Aj"\0 G\r\0\v \f(!\0\v \0@ \f \x006 \f( \0#\v \f(\b"\0@@ \0(\0 \0,\0A\0H@ \0( \0(\b#\v \0#"\0\r\0\v\v \f(\0!\0 \fA\x006\0 \0@ \f( \0#\v \f# 
A\xF0\0j$\0\v\x07\0 \0(\v\0A\xA5\v\x1B\0 \0 (\b m@    \xD3\v\v8\0 \0 (\b m@    \xD3\v \0(\b"\0      \0(\0(\f\0\v\x92\x7F \0 (\b m@    \xD3\v -\x005 \0(\f! A\0:\x005 -\x004 A\0:\x004 \0Aj"	     \xD2 -\x004"
r!\b -\x005"\vr!\x07@ AI\r\0 	 Atj!	 \0Aj!@ -\x006\r@ 
Aq@ (AF\r \0-\0\bAq\r\f\v \vAqE\r\0 \0-\0\bAqE\r\v A\0;4      \xD2 -\x005"\v \x07rAq!\x07 -\x004"
 \brAq!\b A\bj" 	I\r\0\v\v  \x07Aq:\x005  \bAq:\x004\v\xA4\0@ \0 (\b m@  (G\r (AF\r  6\v \0 (\0 mE\r\0@ ( G@  (G\r\v AG\r A6 \v  6  6   ((Aj6(@ ($AG\r\0 (AG\r\0 A:\x006\v A6,\v\v\x88\0@ \0 (\b m@  (G\r (AF\r  6\v \0 (\0 m@@ ( G@  (G\r\v AG\r A6 \v  6 @ (,AF\r\0 A\0;4 \0(\b"\0   A  \0(\0(\f\0 -\x005AF@ A6, -\x004E\r\f\v A6,\v  6  ((Aj6( ($AG\r (AG\r A:\x006\v \0(\b"\0     \0(\0(
\0\v\v\xC1\x7F@ \0 (\b m@  (G\r (AF\r  6\v@ \0 (\0 m@@ ( G@  (G\r\v AG\r A6 \v  6  (,AF\r \0Aj" \0(\fAtj!\x07A\0!@@@ \x7F@  \x07O\r\0 A\0;4    A \xD2 -\x006\r\0 -\x005AG\r -\x004AF@ (AF\rA!A! \0-\0\bAqE\r\f\vA! \0-\0\bAq\rA\f\vAA \x1B\v6, \r\f\v A6,\f\v A\bj!\f\0\v\0\v \0(\f! \0Aj"    \xAB AI\r  Atj! \0Aj!@ \0(\b"\0AqE@ ($AG\r\v@ -\x006\r     \xAB A\bj" I\r\0\v\f\v \0AqE@@ -\x006\r ($AF\r     \xAB A\bj" I\r\0\f\v\0\v@ -\x006\r ($AF@ (AF\r\v     \xAB A\bj" I\r\0\v\f\v  6  ((Aj6( ($AG\r\0 (AG\r\0 A:\x006\v\vr\x7F \0( (\b(F@   \xD4\v \0(\f! \0Aj"   \x92@ AI\r\0  Atj! \0Aj!\0@ \0   \x92 -\x006\r \0A\bj"\0 I\r\0\v\v\v5\0 \0( (\b(F@   \xD4\v \0(\b"\0    \0(\0(	\0\v\0 \0( (\b(F@   \xD4\v\v\xD2\x7F#\0A\xD0\0k"$\0@\x7FA \0( (F\r\0#\0A@j"$\0  (\0"A\bk(\0"\x07j!@ Ak(\0"(A\xF8\xA3(\0F@A\0  \x07\x1B!\f\v  N@ B\x007 A\x006 A\xF4\xA36\f  6\b  6 B\x007 B\x007$ B\x007, A\x006< B\x81\x80\x80\x80\x80\x80\x80\x8074  Aj  AA\0 (\0(\f\0 (\r\v B\x007 A\x006 A\xC4\xA36\f  6\b A\xF4\xA36 B\x007 B\x007$ B\x007, B\x007\x003 A\x006< A:\0;  Aj AA\0 (\0(
\0A\0!@@ ((\0\v (A\0 ($AF\x1BA\0 ( AF\x1BA\0 (,AF\x1B!\f\v (AG@ (,\r ( AG\r ($AG\r\v (!\v A@k$\0A\0 E\r\0 (\0"E\r AjA\0A8\xFC\v\0 A:\0K A\x7F6   \x006  6 A6D  Aj A (\0(	\0 (,"\0AF@  ($6\0\v \0AF\v A\xD0\0j$\0\v A\xA46\b A\xE76 A\xE1\f6\0=\0\v\r\0 \0( (F\v\0=\0\v%\x7F \0("\0\x8DAj"'"\x7F  \0 jA\0\v\v6\x7F \0A\xAC-6\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v	\0A\xEC\x85)\v%\0A\xF8\x85-\0\0E@A\xEC\x85A\xB8\xF2\x88A\xF8\x85A:\0\0\vA\xEC\x85\v	\0A\xDC\x85)\v$\0A\xE8\x85-\0\0E@A\xDC\x85A\xAD\r\x9CA\xE8\x85A:\0\0\vA\xDC\x85\v	\0A\xCC\x85)\v%\0A\xD8\x85-\0\0E@A\xCC\x85A\xE4\xF1\x88A\xD8\x85A:\0\0\vA\xCC\x85\v	\0A\xBC\x85)\v$\0A\xC8\x85-\0\0E@A\xBC\x85A\xD8\x9CA\xC8\x85A:\0\0\vA\xBC\x85\v	\0A\xAC\x85)\v6\x7F \0A\xAC-6\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v%\0A\xB8\x85-\0\0E@A\xAC\x85A\xC0\xF1\x88A\xB8\x85A:\0\0\vA\xAC\x85\v	\0A\xC0\xB1)\v\0A\xA9\x85-\0\0E@A\xA9\x85A:\0\0\vA\xC0\xB1\v	\0A\x9C\x85)\v%\0A\xA8\x85-\0\0E@A\x9C\x85A\x9C\xF1\x88A\xA8\x85A:\0\0\vA\x9C\x85\v	\0A\xB4\xB1)\v\0A\x99\x85-\0\0E@A\x99\x85A:\0\0\vA\xB4\xB1\v\x1B\0A\xF8\x8D!\0@ \0A\fk)"\0A\xE0\x8DG\r\0\v\vT\0A\x98\x85-\0\0@A\x94\x85(\0\vA\xF8\x8D-\0\0E@A\xF8\x8DA:\0\0\vA\xE0\x8DA\xD8\x9A3A\xEC\x8DA\xE4\x9A3A\x98\x85A:\0\0A\x94\x85A\xE0\x8D6\0A\xE0\x8D\v\x1B\0A\xD8\x8D!\0@ \0A\fk)"\0A\xC0\x8DG\r\0\v\v#\x7F \0A\xAC-6\0 \0("@A\f  \0(\b$\v \0\vR\0A\x90\x85-\0\0@A\x8C\x85(\0\vA\xD8\x8D-\0\0E@A\xD8\x8DA:\0\0\vA\xC0\x8DA\x834A\xCC\x8DA\x804A\x90\x85A:\0\0A\x8C\x85A\xC0\x8D6\0A\xC0\x8D\v\x1B\0A\xB0\x8D!\0@ \0A\fk)"\0A\x90\x8BG\r\0\v\v\xB0\0A\x88\x85-\0\0@A\x84\x85(\0\vA\xB0\x8D-\0\0E@A\xB0\x8DA:\0\0\vA\x90\x8BA\xD0\x963A\x9C\x8BA\xF0\x963A\xA8\x8BA\x94\x973A\xB4\x8BA\xAC\x973A\xC0\x8BA\xC4\x973A\xCC\x8BA\xD4\x973A\xD8\x8BA\xE8\x973A\xE4\x8BA\xFC\x973A\xF0\x8BA\x98\x983A\xFC\x8BA\xC0\x983A\x88\x8CA\xE0\x983A\x94\x8CA\x84\x993A\xA0\x8CA\xA8\x993A\xAC\x8CA\xB8\x993A\xB8\x8CA\xC8\x993A\xC4\x8CA\xD8\x993A\xD0\x8CA\xC4\x973A\xDC\x8CA\xE8\x993A\xE8\x8CA\xF8\x993A\xF4\x8CA\x88\x9A3A\x80\x8DA\x98\x9A3A\x8C\x8DA\xA8\x9A3A\x98\x8DA\xB8\x9A3A\xA4\x8DA\xC8\x9A3A\x88\x85A:\0\0A\x84\x85A\x90\x8B6\0A\x90\x8B\v\x1B\0A\x80\x8B!\0@ \0A\fk)"\0A\xE0\x88G\r\0\v\v\x98\0A\x80\x85-\0\0@A\xFC\x84(\0\vA\x80\x8B-\0\0E@A\x80\x8BA:\0\0\vA\xE0\x88A\xF6\b4A\xEC\x88A\xED\b4A\xF8\x88A\xE94A\x84\x89A\x954A\x90\x89A\xBC	4A\x9C\x89A\xA64A\xA8\x89A\xFE\b4A\xB4\x89A\xB6
4A\xC0\x89A\x9C\f4A\xCC\x89A\x8B\f4A\xD8\x89A\x93\f4A\xE4\x89A\xA6\f4A\xF0\x89A\xEC\r4A\xFC\x89A\xD44A\x88\x8AA\xDD\f4A\x94\x8AA\xF0\v4A\xA0\x8AA\xBC	4A\xAC\x8AA\xCC\r4A\xB8\x8AA\xF5\r4A\xC4\x8AA\xEF4A\xD0\x8AA\xA1\r4A\xDC\x8AA\xE0
4A\xE8\x8AA\xED	4A\xF4\x8AA\xD04A\x80\x85A:\0\0A\xFC\x84A\xE0\x886\0A\xE0\x88\v\x1B\0A\xD8\x88!\0@ \0A\fk)"\0A\xB0\x87G\r\0\v\v\xCC\0A\xF8\x84-\0\0@A\xF4\x84(\0\vA\xD8\x88-\0\0E@A\xD8\x88A:\0\0\vA\xB0\x87A\xFC\x933A\xBC\x87A\x98\x943A\xC8\x87A\xB4\x943A\xD4\x87A\xD4\x943A\xE0\x87A\xFC\x943A\xEC\x87A\xA0\x953A\xF8\x87A\xBC\x953A\x84\x88A\xE0\x953A\x90\x88A\xF0\x953A\x9C\x88A\x80\x963A\xA8\x88A\x90\x963A\xB4\x88A\xA0\x963A\xC0\x88A\xB0\x963A\xCC\x88A\xC0\x963A\xF8\x84A:\0\0A\xF4\x84A\xB0\x876\0A\xB0\x87\v\x1B\0A\xA8\x87!\0@ \0A\fk)"\0A\x80\x86G\r\0\v\v\xBE\0A\xF0\x84-\0\0@A\xEC\x84(\0\vA\xA8\x87-\0\0E@A\xA8\x87A:\0\0\vA\x80\x86A\xA7	4A\x8C\x86A\xAE	4A\x98\x86A\x8C	4A\xA4\x86A\x94	4A\xB0\x86A\x83	4A\xBC\x86A\xB5	4A\xC8\x86A\x9E	4A\xD4\x86A\xC8\r4A\xE0\x86A\xE4\r4A\xEC\x86A\xFC4A\xF8\x86A\xC34A\x84\x87A\xF1	4A\x90\x87A\x9B4A\x9C\x87A\xEA
4A\xF0\x84A:\0\0A\xEC\x84A\x80\x866\0A\x80\x86\v\v\0 \0A\x84\xF1\x88\v
\0 \0A\x80\x9C\v\v\0 \0A\xF0\xF0\x88\v
\0 \0A\xF7\x9C\v\f\0 \0 Aj\xDD\v\f\0 \0 A\fj\xDD\v\x07\0 \0,\0	\v\x07\0 \0,\0\b\v	\0 \0\xA2#\v	\0 \0\xA3#\v\0 \0(\b"\0E@A\v \0\xAB\v\xD4\x7F@@  	M\r\0  F\r\0A!\x07 \0(\b!#\0Ak"\b$\0A\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v \bA\x7F  A\x8C\xE2F\x1B6\fA\0   k A\xC0\x81 \x1B\x9A! \b(\f"@A\xF0\xAD(\0 @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v\v \bAj$\0@@ Aj\0\v !\x07\v 	Aj!	 \x07 
j!
  \x07j!\f\v\v 
\v\x9C\x7F \0(\b!#\0Ak"$\0A\xF0\xAD(\0! @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\fA\0A\0A\xF2 (\f"@A\xF0\xAD(\0 @A\xF0\xADA\x8C\xE2  A\x7FF\x1B6\0\v\v Aj$\0@A\x7F\v \0(\b"\0E@A\v \0\xABAF\v\x89\x7F#\0Ak"$\0  6\0\x7FA A\fj"A\0 \0(\b\xDA"\0AjAI\r\0A \0Ak"  (\0kK\r\0\x7F \x7F -\0\0!\0  (\0"Aj6\0  \0:\0\0 Ak! Aj!\fA\0\v\v\v Aj$\0\v\xA2\x07\r\x7F#\0Ak"$\0 !
@@  
F@ !
\f\v 
-\0\0E\r\0 
Aj!
\f\v\v \x07 6\0  6\0@@\x7F@  F\r\0  F\r\0  )\x007\b \0(\b!	#\0Ak"$\0A\xF0\xAD(\0!\b 	@A\xF0\xADA\x8C\xE2 	 	A\x7FF\x1B6\0\v A\x7F \b \bA\x8C\xE2F\x1B6\f 
 k!A\0!\b#\0A\x90\bk"\r$\0 \r (\0"	6\f  kAuA\x80 \x1B!\v A\xBC\x81 \x1B!  \rAj \x1B!@@@@ 	E\r\0 \vE\r\0@ Av!\f@ A\x83K\r\0 \v \fM\r\0 	!\f\f\v  \rA\fj \f \v \v \fK\x1B \xDB! \r(\f!\f A\x7FF@A\0!\vA\x7F!\b\f\v \v A\0  \rAjG\x1B"k!\v  Atj! 	 j \fkA\0 \f\x1B! \b j!\b \fE\r \f!	 \v\r\0\v\f\v 	!\f\v \fE\r\v \vE\r\0 E\r\0 \b!	@@@@  \f  \x9A"\bAjAM@A\0!\v \bAj\v \r \r(\f \bj"\f6\f 	Aj!	 \vAk"\vE\r Aj!  \bk! 	!\b \r\f\v\v \r(\f j!\v\v \r \v6\f\v 	!\b\v @  \r(\f6\0\v \rA\x90\bj$\0 \b!	 (\f"\b@A\xF0\xAD(\0 \b@A\xF0\xADA\x8C\xE2 \b \bA\x7FF\x1B6\0\v\v Aj$\0@@@@ 	A\x7FF@@@ \x07 6\0  (\0F\r\0A!@@@   
 k A\bj \0(\b\xAC"Aj\b\0\v  6\0\f\v !\v  j! \x07(\0Aj!\f\v\v  6\0\f\v \x07 \x07(\0 	Atj"6\0  F\r (\0!  
F\r  A  \0(\b\xACE\r\vA\f\v \x07 \x07(\0Aj"6\0  (\0Aj"6\0 !
@  
F\r 
-\0\0E\r 
Aj!
\f\0\v\0\v  6\0A\f\v (\0!\v  G\v Aj$\0\v !
\f\0\v\0\v\xF4\v\x7F#\0Ak"$\0 !\b@@  \bF@ !\b\f\v \b(\0E\r\0 \bAj!\b\f\v\v \x07 6\0  6\0@@@@@  F\r\0  F\r\0  )\x007\bA! \0(\b!	#\0Ak"$\0A\xF0\xAD(\0!
 	@A\xF0\xADA\x8C\xE2 	 	A\x7FF\x1B6\0\v A\x7F 
 
A\x8C\xE2F\x1B6\f \b kAu!  "	k!\vA\0!\r#\0Ak"$\0@ (\0"
E\r\0 E\r\0 \vA\0 	\x1B!\v@ A\fj 	 \vAI\x1B 
(\0\xC6"\fA\x7FF@A\x7F!\r\f\v 	\x7F \vAM@ \v \fI\r 	 A\fj \fj\v \v \fk!\v 	 \fjA\0\v!	 
(\0E@A\0!
\f\v \f \rj!\r 
Aj!
 Ak"\r\0\v\v 	@  
6\0\v Aj$\0 \r!	 (\f"
@A\xF0\xAD(\0 
@A\xF0\xADA\x8C\xE2 
 
A\x7FF\x1B6\0\v\v Aj$\0@@@@ 	Aj\0\b\v \x07 6\0@  (\0F\r  (\0 \0(\b\xDA"A\x7FF\r \x07 \x07(\0 j"6\0 Aj!\f\0\v\0\v \x07 \x07(\0 	j"6\0  F\r  \bF@ (\0! !\b\f\v Aj"A\0 \0(\b\xDA"\bA\x7FF\r  \x07(\0k \bI\r@ \b@ -\0\0! \x07 \x07(\0"	Aj6\0 	 :\0\0 \bAk!\b Aj!\f\v\v  (\0Aj"6\0 !\b@  \bF@ !\b\f\v \b(\0E\r \bAj!\b\f\0\v\0\v  6\0\f\v (\0!\v  G!\f\v \x07(\0!\f\v\vA!\v Aj$\0 \v	\0 \0\xB3#\vU\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(# \0A\xE0\xD9(\x006\0A\xE0\xD9 \x006\0 Aj$\0\v\0  k"\0  \0 I\x1B\v4\0@  FE@   ,\0\0"\0 \0A\0H\x1B:\0\0 Aj! Aj!\f\v\v \v\f\0   A\0H\x1B\v*\0@  FE@  -\0\0:\0\0 Aj! Aj!\f\v\v \v9\0@  FE@  -\0\0"\0 \0A r \0A\xDB\0kA\xFFqA\xE6I\x1B:\0\0 Aj!\f\v\v \v\0  A r A\xDB\0kA\xFFqA\xE6I\x1B\v:\0@  FE@  -\0\0"\0 \0A\xDF\0q \0A\xFB\0kA\xFFqA\xE6I\x1B:\0\0 Aj!\f\v\v \v\0  A\xDF\0q A\xFB\0kA\xFFqA\xE6I\x1B\v	\0 \0\xAF#\v5\0@  FE@  (\0"\0  \0A\x80I\x1B:\0\0 Aj! Aj!\f\v\v \v\0   A\x80I\x1B\xC0\v*\0@  FE@  ,\0\x006\0 Aj! Aj!\f\v\v \v4\0@  FE@  (\0"\0 \0A r \0A\xDB\0kAfI\x1B6\0 Aj!\f\v\v \v\0  A r A\xDB\0kAfI\x1B\v5\0@  FE@  (\0"\0 \0A\xDF\0q \0A\xFB\0kAfI\x1B6\0 Aj!\f\v\v \v\0  A\xDF\0q A\xFB\0kAfI\x1B\v7\0@@  F\r\0 (\0"\0A\xFF\0K\r\0 \0At(\xF0\xE7 qE\r\0 Aj!\f\v\v \v\xE3\x7F|@ \0A\fj"(#  Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjAt"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\b"I@ \0+(! \0+ !@  9\b  9\0 Aj" I\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v7\0@@  F\r\0 (\0"\0A\xFF\0M@ \0At(\xF0\xE7 q\r\v Aj!\f\v\v \vF\x7F@  FE@A\0!\0  (\0"A\xFF\0M\x7F At(\xF0\xE7A\0\v6\0 Aj! Aj!\f\v\v \v"\0A\0!\0 A\xFF\0M\x7F At(\xF0\xE7 qA\0GA\0\v\v	\0 \0\xB1#\v\xC0\r\x7F|@@  \0( \0(kAj"
F\r\0  
k"\r \0A\fj"(" (\f"kAj"j!\x07@ (@@ \x07At'"@ (!@ \x07   \x07J\x1B"A\0L\r\0 Aq!\fA\0! AO@ A\xFC\xFF\xFF\xFF\x07q!@  At"j"  j"\b+\x009\0  \b+\b9\b  Ar"j"\b  j"+\x009\0 \b +\b9\b  A r"j"\b  j"+\x009\0 \b +\b9\b  A0r"j"  j"+\x009\0  +\b9\b Aj! 	Aj"	 G\r\0\v \fE\r\v@  At"j"	  j"+\x009\0 	 +\b9\b Aj! \vAj"\v \fG\r\0\v\v #  6\f\v\f\v (! (\f! (!\f\v  \x07At'"6 \r\0\f\v   \rj6   \x07Atj6\b   Atk6\0 \0( 
Atj" \0("O\r\0 \0+(! \0+ !@  9\b  9\0 Aj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\vR\0@ ,\0\vA\0N@ \0 (\b6\b \0 )\x007\0\f\v (\0! \0 ("\0\xAD! \0AtAj"\0@   \0\xFC
\0\0\v\v\v	\0 \0 \xDD\v\xEA\x07\x7F#\0A\xF0k"\0$\0 \0A\xECj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\x9C\x84+!\b ( ,\0\v" A\0H"\x1B@ (\0  \x1B(\0 \bA- \b(\0(,\0F!	\v \0A\x006\xD8 \0B\x007\xD0 \0A\x006\xC8 \0B\x007\xC0 \0A\x006\xB8 \0B\x007\xB0  	 \0A\xECj \0A\xE8j \0A\xE4j \0A\xE0j \0A\xD0j \0A\xC0j \0A\xB0j \0A\xACj\xB6@\x7F\x7F ("
 ,\0\v" A\0H\x1B" \0(\xAC"\x07J@ \x07  \x07kAtj \0(\xB4 \0,\0\xBB" A\0H\x1Bj \0(\xC4 \0,\0\xCB" A\0H\x1BjAj\f\v \x07 \0(\xB4 \0,\0\xBB" A\0H\x1Bj \0(\xC4 \0,\0\xCB" A\0H\x1BjAj\v"A\xE5\0I@A\0! \0Aj\f\v At'"E\r -\0\v! (!
 \v"\v \0A\fj \0A\bj ( (\0  \xC0A\0H"\x1B"\f \f 
  \x1BAtj \b 	 \0A\xE8j \0(\xE4 \0(\xE0 \0A\xD0j" \0A\xC0j" \0A\xB0j"\b \x07\xB5  \v \0(\f \0(\b  u # \b) ) )@ \0(\xEC"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0A\xF0j$\0\v=\0\v\xB0\b\x7F#\0A\xA0\bk"\0$\0 \0 7 \0 7 \0 \0A\xB0\x07j"\x076\xAC\x07 \0A\x90j!	@ \x07A\xED \0Aj\x81"\x07A\xE4\0O@@!\x07 \0 7\0 \0 7\b \0A\xAC\x07j \x07A\xED \0d"\x07A\x7FF\r \0(\xAC\x07! \x07At'"\f!	 \fE\r\v \0A\x8Cj"
 ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v 
A\x9C\x84+"
 \0(\xAC\x07"\b \x07 \bj 	 
(\0(0\b\0 \x07A\0J@ \0(\xAC\x07-\0\0A-F!\v\v \0A\x006\xF8 \0B\x007\xF0 \0A\x006\xE8 \0B\x007\xE0 \0A\x006\xD8 \0B\x007\xD0  \v \0A\x8Cj \0A\x88j \0A\x84j \0A\x80j \0A\xF0j \0A\xE0j \0A\xD0j \0A\xCCj\xB6@\x7F \0(\xCC"\b \x07H@ \b \x07 \bkAtj \0(\xD4 \0,\0\xDB" A\0H\x1Bj \0(\xE4 \0,\0\xEB" A\0H\x1BjAj\f\v \b \0(\xD4 \0,\0\xDB" A\0H\x1Bj \0(\xE4 \0,\0\xEB" A\0H\x1BjAj\v"A\xE5\0I@ \0A0j!\f\v At'"\r! \rE\r\v  \0A,j \0A(j ( 	 	 \x07Atj 
 \v \0A\x88j \0(\x84 \0(\x80 \0A\xF0j"\x07 \0A\xE0j"	 \0A\xD0j"
 \b\xB5   \0(, \0((  u \r# 
) 	) \x07)@ \0(\x8C"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \f# # \0A\xA0\bj$\0\v=\0\v\xE4\x07\x7F#\0A\xB0k"\0$\0 \0A\xACj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+!\b ( ,\0\v" A\0H"\x1B@ (\0  \x1B-\0\0 \bA- \b(\0(\0A\xFFqF!	\v \0A\x006\xA0 \0B\x007\x98 \0A\x006\x90 \0B\x007\x88 \0A\x006\x80 \0B\x007x  	 \0A\xACj \0A\xA8j \0A\xA7j \0A\xA6j \0A\x98j \0A\x88j \0A\xF8\0j \0A\xF4\0j\xB8@\x7F\x7F ("
 ,\0\v" A\0H\x1B" \0(t"\x07J@ \x07  \x07kAtj \0(| \0,\0\x83" A\0H\x1Bj \0(\x8C \0,\0\x93" A\0H\x1BjAj\f\v \x07 \0(| \0,\0\x83" A\0H\x1Bj \0(\x8C \0,\0\x93" A\0H\x1BjAj\v"A\xE5\0I@A\0! \0Aj\f\v '"E\r -\0\v! (!
 \v"\v \0A\fj \0A\bj ( (\0  \xC0A\0H"\x1B"\f \f 
  \x1Bj \b 	 \0A\xA8j \0,\0\xA7 \0,\0\xA6 \0A\x98j" \0A\x88j" \0A\xF8\0j"\b \x07\xB7  \v \0(\f \0(\b  w # \b) ) )@ \0(\xAC"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0A\xB0j$\0\v=\0\vU\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(# \0A\x80\xDA(\x006\0A\x80\xDA \x006\0 Aj$\0\v\xA7\b\x7F#\0A\xB0k"\0$\0 \0 7 \0 7 \0 \0A\xC0j"\x076\xBC \0A\xD0j!	@ \x07A\xED \0Aj\x81"\x07A\xE4\0O@@!\x07 \0 7\0 \0 7\b \0A\xBCj \x07A\xED \0d"\x07A\x7FF\r \0(\xBC! \x07'"\f!	 \fE\r\v \0A\xCCj"
 ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v 
A\xA4\x84+"
 \0(\xBC"\b \x07 \bj 	 
(\0( \b\0 \x07A\0J@ \0(\xBC-\0\0A-F!\v\v \0A\x006\xC0 \0B\x007\xB8 \0A\x006\xB0 \0B\x007\xA8 \0A\x006\xA0 \0B\x007\x98  \v \0A\xCCj \0A\xC8j \0A\xC7j \0A\xC6j \0A\xB8j \0A\xA8j \0A\x98j \0A\x94j\xB8@\x7F \0(\x94"\b \x07H@ \b \x07 \bkAtj \0(\x9C \0,\0\xA3" A\0H\x1Bj \0(\xAC \0,\0\xB3" A\0H\x1BjAj\f\v \b \0(\x9C \0,\0\xA3" A\0H\x1Bj \0(\xAC \0,\0\xB3" A\0H\x1BjAj\v"A\xE5\0I@ \0A0j!\f\v '"\r! \rE\r\v  \0A,j \0A(j ( 	 \x07 	j 
 \v \0A\xC8j \0,\0\xC7 \0,\0\xC6 \0A\xB8j"\x07 \0A\xA8j"	 \0A\x98j"
 \b\xB7   \0(, \0((  w \r# 
) 	) \x07)@ \0(\xCC"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \f# # \0A\xB0j$\0\v=\0\v\x8A\x07\x7F#\0A\xC0k"\0$\0 \0 6\xB8 \0 6\xBC \0A\xCB6 \0 \0A j6 \0Aj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\x9C\x84+! \0A\0:\0 \0A\xBCj   \x07 (  \0Aj  \0Aj \0Aj \0A\xB0j\xBA@@ ,\0\vA\0H@ (\0A\x006\0 A\x006\f\v A\0:\0\v A\x006\0\v \0-\0AF@  A- (\0(,\0\x94\v A0 (\0(,\0! \0("Ak! \0(!@@  O\r\0 (\0 G\r\0 Aj!\f\v\v#\0Ak"$\0@  F\r\0 ,\0\v"	! (\b!\b (!\x07  (\0  	A\0H"
\x1B"\vO\x7F  \v \x07 	 
\x1BAtjAjIA\0\vE@ \x07  A\0H"	\x1B"  k"Au"
j!\x07 
 \bA\xFF\xFF\xFF\xFF\x07qAkA 	\x1B"\b kK@  \b \x07 \bk  \xB9\v At (\0  ,\0\vA\0H\x1Bj! @   \xFC
\0\0\v  jA\x006\0 ,\0\vA\0H@  \x076\f\v  \x07A\xFF\0q:\0\v\f\v Aj"\x07  \xD9 ( \x07 ,\0"A\0H"
\x1B!@ (\b  
\x1B" (\bA\xFF\xFF\xFF\xFF\x07qAkA ,\0\v"\bA\0H"\x1B"	 ( \b \x1B"kK@  	  j 	k  A\0  \x96\f\v @ (\0  \bA\0H\x1B!\b At"	@ \b Atj  	\xFC
\0\0\v  j!@ ,\0\vA\0H@  6\f\v  A\xFF\0q:\0\v\v \b AtjA\x006\0\v\v \x07)\v Aj$\0\v \0A\xBCj \0A\xB8j-@  (\0Ar6\0\v \0(\xBC@ \0("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0(! \0A\x006 @  \0(\0\v \0A\xC0j$\0\v\xA8\x7F#\0A\xF0k"\x07$\0 \x07 6\xE8 \x07 6\xEC \x07A\xCB6\xCC \x07 \x07A\xD0j6\xC8 \x07A\xC0j" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\x9C\x84+!\0 \x07A\0:\0\xBF@ \x07A\xECj    (  \x07A\xBFj \0 \x07A\xC8j \x07A\xC4j \x07A\xE0j\xBAE\r\0 \x07A\xD1(\0\x006\0\xB7 \x07A\xCA)\0\x007\xB0 \0 \x07A\xB0j \x07A\xBAj \x07A\x80j \0(\0(0\b\0 \x07Aj!\0@ \x07(\xC4" \x07(\xC8"k"A\x89N@ AvAj'"\0!\b \0E\r\v \0! \x07-\0\xBFAF@ \0A-:\0\0 \0Aj!\v \x07A\xA8j!@  M@@ A\0:\0\0 \x07 6\0 \0 \x07\xDFAG\r\0 \b#\f\v  \x07A\xB0j \x07A\x80j"  \xDE kAuj-\0\0:\0\0 Aj! Aj! \x07(\xC4!\f\v\v=\0\v=\0\v \x07A\xECj \x07A\xE8j-@  (\0Ar6\0\v \x07(\xEC@ \x07(\xC0"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v \x07(\xC8!\0 \x07A\x006\xC8 \0@ \0 \x07(\xCC\0\v \x07A\xF0j$\0\v\xF3\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xCB6 \0 \0A j6 \0Aj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+! \0A\0:\0 \0A\x8Cj   \x07 (  \0Aj  \0Aj \0Aj \0A\x84j\xBC@@ ,\0\vA\0H@ (\0A\0:\0\0 A\x006\f\v A\0:\0\v A\0:\0\0\v \0-\0AF@  A- (\0(\0\x98\v A0 (\0(\0 \0("Ak! \0(!A\xFFq!@@  O\r\0 -\0\0 G\r\0 Aj!\f\v\v#\0Ak"$\0@  F\r\0 ,\0\v"	! (\b!\b (!\x07  (\0  	A\0H"
\x1B"\vO  \v \x07 	 
\x1BjAjIqE@ \x07  A\0H"	\x1B"  k"j!\x07  \bA\xFF\xFF\xFF\xFF\x07qAkA
 	\x1B"\b kK@  \b \x07 \bk  \xDC\v (\0  ,\0\vA\0H\x1B j! @   \xFC
\0\0\v  jA\0:\0\0 ,\0\vA\0H@  \x076\f\v  \x07A\xFF\0q:\0\v\f\v Aj"\x07  \xF8 ( \x07 ,\0"A\0H"
\x1B!@ (\b  
\x1B" (\bA\xFF\xFF\xFF\xFF\x07qAkA
 ,\0\v"\bA\0H"\x1B"	 ( \b \x1B"kK@  	  j 	k  A\0  \x99\f\v @ (\0  \bA\0H\x1B!\b @  \bj  \xFC
\0\0\v  j!@ ,\0\vA\0H@  6\f\v  A\xFF\0q:\0\v\v  \bjA\0:\0\0\v\v \x07)\v Aj$\0\v \0A\x8Cj \0A\x88j.@  (\0Ar6\0\v \0(\x8C@ \0("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0(! \0A\x006 @  \0(\0\v \0A\x90j$\0\v7\x7F \0A\xA0)6\0 \0("@A\xC0\0  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v\x9C\x7F#\0A\x90k"\x07$\0 \x07 6\x88 \x07 6\x8C \x07A\xCB6\x9C \x07 \x07A\xA0j6\x98 \x07A\x90j" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xA4\x84+!\0 \x07A\0:\0\x8F@ \x07A\x8Cj    (  \x07A\x8Fj \0 \x07A\x98j \x07A\x94j \x07A\x84j\xBCE\r\0 \x07A\xD1(\0\x006\0\x87 \x07A\xCA)\0\x007\x80 \0 \x07A\x80j \x07A\x8Aj \x07A\xF6\0j \0(\0( \b\0 \x07Aj!\0@ \x07(\x94" \x07(\x98"k"A\xE3\0N@ Aj'"\0!\b \0E\r\v \0! \x07-\0\x8FAF@ \0A-:\0\0 \0Aj!\v \x07A\x80j!@  M@@ A\0:\0\0 \x07 6\0 \0 \x07\xDFAG\r\0 \b#\f\v  \x07A\xF6\0j  \xD0 \x07k \x07j-\0
:\0\0 Aj! Aj! \x07(\x94!\f\v\v=\0\v=\0\v \x07A\x8Cj \x07A\x88j.@  (\0Ar6\0\v \x07(\x8C@ \x07(\x90"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v \x07(\x98!\0 \x07A\x006\x98 \0@ \0 \x07(\x9C\0\v \x07A\x90j$\0\v7\x7F \0A\xA0)6\0 \0("@A\xC0\0  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v\xA0\x7F#\0A\xA0k"$\0  A\xA0j"6\f#\0A\x90k"\x07$\0 \x07 \x07A\x84j6 \0A\bj \x07A j"\b \x07Aj   \xBF \x07B\x007 \x07 \b6\f (\f Aj"kAu!\b \0(\b!\0#\0Ak"$\0A\xF0\xAD(\0! \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v A\x7F  A\x8C\xE2F\x1B6\f  \x07A\fj \b \x07Aj\xDB! (\f"\0@A\xF0\xAD(\0 \0@A\xF0\xADA\x8C\xE2 \0 \0A\x7FF\x1B6\0\v\v Aj$\0 A\x7FF@=\0\v   Atj6\f \x07A\x90j$\0  (\f \xCB $\0\vE\0#\0A\x80k"$\0  A\xF4\0j6\f \0A\bj Aj"\0 A\fj   \xBF \0 (\f \xCF A\x80j$\0\v\xF8\x7F#\0A0k"\x07$\0 \x07 6, A\x006\0 \x07 ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v \x07A\x9C\x84+!\b@ \x07(\0"	A\xEC\x82F\r\0 	 	("
Ak6 
\r\0 	 	(\0(\b\0\v\x7F@@@@@@@@@@@@@@@@@@@@@@@@@@ A\xC1\0k9\0\x07
\0\b	\v\f\r\v\v \0 Aj \x07A,j   \b\xC2\f\v \0 Aj \x07A,j   \b\xC1\f\v \0A\bj \0(\b(\f\0\0! \x07 \0 \x07(,     (\0  ,\0\v"\0A\0H"\x1B"  ( \0 \x1BAtjn6,\f\v \x07A,j   \bAb!\0 (\0!@@ \0AkAK\r\0 Aq\r\0  \x006\f\f\v  Ar6\0\v\f\v \x07A\x88\xE6)\x007 \x07A\x80\xE6)\x007 \x07A\xF8\xE5)\x007\b \x07A\xF0\xE5)\x007\0 \x07 \0      \x07 \x07A jn6,\f\v \x07A\xA8\xE6)\x007 \x07A\xA0\xE6)\x007 \x07A\x98\xE6)\x007\b \x07A\x90\xE6)\x007\0 \x07 \0      \x07 \x07A jn6,\f\v \x07A,j   \bAb!\0 (\0!@@ \0AJ\r\0 Aq\r\0  \x006\b\f\v  Ar6\0\v\f\v \x07A,j   \bAb!\0 (\0!@@ \0AkA\vK\r\0 Aq\r\0  \x006\b\f\v  Ar6\0\v\f\v \x07A,j   \bAb!\0 (\0!@@ \0A\xEDJ\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A,j   \bAb! (\0!\0@@ Ak"A\vK\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A,j   \bAb!\0 (\0!@@ \0A;J\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A,j!\0#\0Ak"$\0  6\f@@ \0 A\fj-\r\0 \bA\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \b(\0(\f\0E\r\0 \0e\f\v\v \0 A\fj-@  (\0Ar6\0\v Aj$\0\f\r\v \x07A,j!@ \0A\bj \0(\b(\b\0\0"\0( \0,\0\v" A\0H\x1BA\0 \0( \0,\0" A\0H\x1BkF@  (\0Ar6\0\f\v@ \0   \0 \0Aj \b A\0\xB8"F@ (\bA\fG\r A\x006\b\f\v  \0kA\fG\r\0 (\b"\0A\vJ\r\0  \0A\fj6\b\v\v\f\f\v \x07A\xB0\xE6A,\xFC
\0\0 \x07 \0      \x07 \x07A,jn6,\f\v\v \x07A\xF0\xE6(\x006 \x07A\xE8\xE6)\x007\b \x07A\xE0\xE6)\x007\0 \x07 \0      \x07 \x07Ajn6,\f
\v \x07A,j   \bAb!\0 (\0!@@ \0A<J\r\0 Aq\r\0  \x006\0\f\v  Ar6\0\v\f	\v \x07A\x98\xE7)\x007 \x07A\x90\xE7)\x007 \x07A\x88\xE7)\x007\b \x07A\x80\xE7)\x007\0 \x07 \0      \x07 \x07A jn6,\f\b\v \x07A,j   \bAb!\0 (\0!@@ \0AJ\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\x07\v \0      \0(\0(\0\f\x07\v \0A\bj \0(\b(\0\0! \x07 \0 \x07(,     (\0  ,\0\v"\0A\0H"\x1B"  ( \0 \x1BAtjn6,\f\v Aj \x07A,j   \b\xC0\f\v \x07A,j   \bAb!\0 -\0\0AqE@  \0A\xECk6\v\f\v A%F\r\v  (\0Ar6\0\f\v#\0Ak"\0$\0 \0 6\f@ \x7FA \x07A,j" \0A\fj"-\r\0A \b\x7F (\0"(\f" (F@  (\0($\0\0\f\v (\0\vA\0 \b(\0(4\0A%G\r\0 e -E\rA\v (\0r6\0\v \0Aj$\0\v \x07(,\v \x07A0j$\0\v\x96\x7F#\0Ak"\0$\0 \0 6\f \0A\bj" ("6\0 A\xEC\x82G@  (Aj6\v A\x9C\x84+!@ \0(\b"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v Aj \0A\fj   \xC0 \0(\f \0Aj$\0\v\x98\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\x9C\x84+!@ (\b"A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 Aj A\fj   \xC1 (\f Aj$\0\v$\x7F \0A\xA0)6\0 \0("@A\xC0\0  \0(\b$\v \0\v\x98\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\x9C\x84+!@ (\b"A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 Aj A\fj   \xC2 (\f Aj$\0\vF\0 \0      \0A\bj \0(\b(\0\0"\0(\0 \0 \0,\0\v"A\0H"\x1B"  \0(  \x1BAtjn\vX\x7F#\0A k"$\0 A\x98\xE7)\x007 A\x90\xE7)\x007 A\x88\xE7)\x007\b A\x80\xE7)\x007\0 \0       A j"n $\0\v\x9D\x7F#\0Ak"\x07$\0 \x07 6\f A\x006\0 \x07 ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v \x07A\xA4\x84+!\b@ \x07(\0"	A\xEC\x82F\r\0 	 	("
Ak6 
\r\0 	 	(\0(\b\0\v\x7F@@@@@@@@@@@@@@@@@@@@@@@@@@ A\xC1\0k9\0\x07
\0\b	\v\f\r\v\v \0 Aj \x07A\fj   \b\xC5\f\v \0 Aj \x07A\fj   \b\xC4\f\v \0A\bj \0(\b(\f\0\0! \x07 \0 \x07(\f     (\0  ,\0\v"\0A\0H"\x1B"  ( \0 \x1Bjo6\f\f\v \x07A\fj   \bAc!\0 (\0!@@ \0AkAK\r\0 Aq\r\0  \x006\f\f\v  Ar6\0\v\f\v \x07B\xA5\xDA\xBD\xA9\xC2\xEC\xCB\x92\xF9\x007\0 \x07 \0      \x07 \x07A\bjo6\f\f\v \x07B\xA5\xB2\xB5\xA9\xD2\xAD\xCB\x92\xE4\x007\0 \x07 \0      \x07 \x07A\bjo6\f\f\v \x07A\fj   \bAc!\0 (\0!@@ \0AJ\r\0 Aq\r\0  \x006\b\f\v  Ar6\0\v\f\v \x07A\fj   \bAc!\0 (\0!@@ \0AkA\vK\r\0 Aq\r\0  \x006\b\f\v  Ar6\0\v\f\v \x07A\fj   \bAc!\0 (\0!@@ \0A\xEDJ\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A\fj   \bAc! (\0!\0@@ Ak"A\vK\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A\fj   \bAc!\0 (\0!@@ \0A;J\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A\fj!\0#\0Ak"$\0  6\f@@ \0 A\fj.\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\0H\r\0 \b(\b Atj-\0\0AqE\r\0 \0g\f\v\v \0 A\fj.@  (\0Ar6\0\v Aj$\0\f\r\v \x07A\fj!@ \0A\bj \0(\b(\b\0\0"\0( \0,\0\v" A\0H\x1BA\0 \0( \0,\0" A\0H\x1BkF@  (\0Ar6\0\f\v@ \0   \0 \0Aj \b A\0\xB9"F@ (\bA\fG\r A\x006\b\f\v  \0kA\fG\r\0 (\b"\0A\vJ\r\0  \0A\fj6\b\v\v\f\f\v \x07A\xD8\xE5(\0\x006\0\x07 \x07A\xD1\xE5)\0\x007\0 \x07 \0      \x07 \x07A\vjo6\f\f\v\v \x07A\xE0\xE5-\0\0:\0 \x07A\xDC\xE5(\0\x006\0 \x07 \0      \x07 \x07Ajo6\f\f
\v \x07A\fj   \bAc!\0 (\0!@@ \0A<J\r\0 Aq\r\0  \x006\0\f\v  Ar6\0\v\f	\v \x07B\xA5\x90\xE9\xA9\xD2\xC9\xCE\x92\xD3\x007\0 \x07 \0      \x07 \x07A\bjo6\f\f\b\v \x07A\fj   \bAc!\0 (\0!@@ \0AJ\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\x07\v \0      \0(\0(\0\f\x07\v \0A\bj \0(\b(\0\0! \x07 \0 \x07(\f     (\0  ,\0\v"\0A\0H"\x1B"  ( \0 \x1Bjo6\f\f\v Aj \x07A\fj   \b\xC3\f\v \x07A\fj   \bAc!\0 -\0\0AqE@  \0A\xECk6\v\f\v A%F\r\v  (\0Ar6\0\f\v#\0Ak"\0$\0 \0 6\f@ \x7FA \x07A\fj" \0A\fj".\r\0A \b\x7F (\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\0 \b(\0($\0A%G\r\0 g .E\rA\v (\0r6\0\v \0Aj$\0\v \x07(\f\v \x07Aj$\0\v\x96\x7F#\0Ak"\0$\0 \0 6\f \0A\bj" ("6\0 A\xEC\x82G@  (Aj6\v A\xA4\x84+!@ \0(\b"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v Aj \0A\fj   \xC3 \0(\f \0Aj$\0\v\xB8\x7F#\0Ak"$\0 \0A\xF8&6\0 \0,\0+A\0H@ \0(( \0( #\v \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# \0A\xF0\xD9(\x006\0A\xF0\xD9 \x006\0 Aj$\0\v\x98\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+!@ (\b"A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 Aj A\fj   \xC4 (\f Aj$\0\v\x98\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xEC\x82G@  (Aj6\v \x07A\xA4\x84+!@ (\b"A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 Aj A\fj   \xC5 (\f Aj$\0\vC\0 \0      \0A\bj \0(\b(\0\0"\0(\0 \0 \0,\0\v"A\0H"\x1B"  \0(  \x1Bjo\v;\x7F#\0Ak"$\0 B\xA5\x90\xE9\xA9\xD2\xC9\xCE\x92\xD3\x007\b \0      A\bj Aj"o $\0\v+\x7F  ("A\xB5\xFB~qA\x88r6    \xC8  6\v#\x7F \0A\xA8%6\0 \0("@A  \0(\b$\v \0\v\xFE\b\x7F\x7F#\0A\x90k"\0$\0 \0B%7\x88 \0A\x88j"\x07ArA\x91 (\xB4!\b \0 \0A\xE0j"	6\xDC@!@\x7F@\x7F@ \b@ (\b!\b \0 70 \0 7( \0 \b6  	  \x07 \0A jv"AJ\r\f\v \0 7P \0 7X \0A\xE0j  \0A\x88j"\x07 \0A\xD0\0jv"AL\r@! \0 7@ \0 7H \0A\xDCj  \x07 \0A@kd\f\v@! (\b!\x07 \0 7 \0 7\b \0 \x076\0 \0A\xDCj  \0A\x88j \0d\v"A\x7FF\r \0(\xDC\f\vA\0\v \0(\xDC"\x07  \x07j"\v X!\f@ \0A\xE0j \x07F@ \0A\xF0\0j!A\0!\b\f\v At'"\b! \bE\r\v \0A\xE4\0j"\r ("	6\0 	A\xEC\x82G@ 	 	(Aj6\v \x07 \f \v  \0A\xEC\0j \0A\xE8\0j \r\xC7@ \0(d"\x07A\xEC\x82F\r\0 \x07 \x07("	Ak6 	\r\0 \x07 \x07(\0(\b\0\v   \0(l \0(h  u! \b## \0A\x90j$\0 \f\v=\0\v\v\xE1\b\x7F\x7F#\0A\xF0k"\0$\0 \0B%7\xE8 \0A\xE8j"ArA\xF7 (\xB4!\x07 \0 \0A\xC0j"\b6\xBC@!@\x7F@\x7F@ \x07@ (\b!\x07 \0 9 \0 \x076 \b   \0Ajv"AJ\r\f\v \0 90 \0A\xC0j  \0A\xE8j" \0A0jv"AL\r@! \0 9  \0A\xBCj   \0A jd\f\v@! (\b! \0 9\b \0 6\0 \0A\xBCj  \0A\xE8j \0d\v"A\x7FF\r \0(\xBC\f\vA\0\v \0(\xBC"  j"
 X!\v@ \0A\xC0j F@ \0A\xD0\0j!A\0!\x07\f\v At'"\x07! \x07E\r\v \0A\xC4\0j"\f ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v  \v 
  \0A\xCC\0j \0A\xC8\0j \f\xC7@ \0(D"A\xEC\x82F\r\0  ("\bAk6 \b\r\0  (\0(\b\0\v   \0(L \0(H  u! \x07## \0A\xF0j$\0 \f\v=\0\v\v\x8F\x7F#\0A\xF0k"\0$\0A\bAA
 ("A\xCA\0q"\x07A\bF\x1B \x07A\xC0\0F"\b\x1B!	 \0A\xD0j!@ P\r\0 A\x80qE\r\0 \b@ \0A0:\0\xD0 Ar!\f\v \x07A\bG\r\0 \0A0:\0\xD0 \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0\xD1 \0A\xD0jAr!\v \0A\xC8j  \0A\xE8j  	\xB5 \0(\xC8!\x07@ A\x88\x80qA\x88\x80G\r\0@  \x07F\r  -\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 Aj!\f\0\v\0\v \0A\xD0j" \x07 X!\b \0Aj"	 ("6\0 A\xEC\x82G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj 	\xB3@ \0("A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v   \0(\f \0(\b  u \0A\xF0j$\0\v\r\0    \xC8\v\xFE\x7F~#\0A\xF0k"$\0 ("A\xCA\0q"\x07A\bF!\b A\xD0j!\0~@ B\0Y\r\0 \b\r\0  \x07A\xC0\0F\r A-:\0\xD0 \0Ar!\0B\0 }\f\v \v!\vAA
 \b\x1B!
 \x07A\xC0\0F!	@ \b\r\0 	\r\0 B\0S\r\0 A\x80qE\r\0 \0A+:\0\0 \0Aj!\0\vA\b 
 	\x1B!\b@ P\r\0 A\x80qE\r\0 \x07A\xC0\0F@ \0A0:\0\0 \0Aj!\0\f\v \x07A\bG\r\0 \0A0:\0\0 \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0 \0Aj!\0\v A\xC8j \0 A\xE8j \v \b\xB5@ A\x88\x80qA\x88\x80F@@ \0 (\xC8"F\r \0 \0-\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 \0Aj!\0\f\0\v\0\v (\xC8!\v A\xD0j"\x07  X!\b Aj"	 ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v \x07 \b  Aj" A\fj A\bj 	\xB3@ ("\0A\xEC\x82F\r\0 \0 \0("\x07Ak6 \x07\r\0 \0 \0(\0(\b\0\v   (\f (\b  u A\xF0j$\0\v\xFB\x07\x7F#\0A\x90k"$\0 ("A\xCA\0q"\bA\bF!\x07 A\x83j!\0\x7F@ A\0N\r\0 \x07\r\0  \bA\xC0\0F\r A-:\0\x83 A\x84j!\0A\0 k\f\v \v!
AA
 \x07\x1B!\v \bA\xC0\0F!	@ \x07\r\0 	\r\0 A\0H\r\0 A\x80qE\r\0 \0A+:\0\0 \0Aj!\0\vA\b \v 	\x1B!\x07@ E\r\0 A\x80qE\r\0 \bA\xC0\0F@ \0A0:\0\0 \0Aj!\0\f\v \bA\bG\r\0 \0A0:\0\0 \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0 \0Aj!\0\v A\xF8\0j \0 A\x90j 
 \x07\xB7@ A\x88\x80qA\x88\x80F@@ \0 (x"F\r \0 \0-\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 \0Aj!\0\f\0\v\0\v (x!\v A\x83j"  X!\b Aj"\x07 ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v  \b  Aj" A\fj A\bj \x07\xB3@ ("\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v   (\f (\b  u A\x90j$\0\v\xEA\x7F#\0Ak"$\0@ -\0AqE@ \0     \0(\0(\x07\0!\f\v Aj"\0 ("6\0 A\xEC\x82G@  (Aj6\v \0A\xE4\x84+!@ ("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0  (\0AA \x1Bj(\0\0 ( \0 ,\0"A\0H"\x1B"  (\b  \x1BAtj \xCB! \0)\v Aj$\0 \v+\x7F  ("A\xB5\xFB~qA\x88r6    \xCD  6\v\xFE\b\x7F\x7F#\0A\xE0k"\0$\0 \0B%7\xD8 \0A\xD8j"\x07ArA\x91 (\xB4!\b \0 \0A\xB0j"	6\xAC@!@\x7F@\x7F@ \b@ (\b!\b \0 70 \0 7( \0 \b6  	  \x07 \0A jv"AJ\r\f\v \0 7P \0 7X \0A\xB0j  \0A\xD8j"\x07 \0A\xD0\0jv"AL\r@! \0 7@ \0 7H \0A\xACj  \x07 \0A@kd\f\v@! (\b!\x07 \0 7 \0 7\b \0 \x076\0 \0A\xACj  \0A\xD8j \0d\v"A\x7FF\r \0(\xAC\f\vA\0\v \0(\xAC"\x07  \x07j"\v X!\f@ \0A\xB0j \x07F@ \0A\xF0\0j!A\0!\b\f\v At'"\b! \bE\r\v \0A\xE4\0j"\r ("	6\0 	A\xEC\x82G@ 	 	(Aj6\v \x07 \f \v  \0A\xEC\0j \0A\xE8\0j \r\xCC@ \0(d"\x07A\xEC\x82F\r\0 \x07 \x07("	Ak6 	\r\0 \x07 \x07(\0(\b\0\v   \0(l \0(h  w! \b## \0A\xE0j$\0 \f\v=\0\v\v\xE1\b\x7F\x7F#\0A\xC0k"\0$\0 \0B%7\xB8 \0A\xB8j"ArA\xF7 (\xB4!\x07 \0 \0A\x90j"\b6\x8C@!@\x7F@\x7F@ \x07@ (\b!\x07 \0 9 \0 \x076 \b   \0Ajv"AJ\r\f\v \0 90 \0A\x90j  \0A\xB8j" \0A0jv"AL\r@! \0 9  \0A\x8Cj   \0A jd\f\v@! (\b! \0 9\b \0 6\0 \0A\x8Cj  \0A\xB8j \0d\v"A\x7FF\r \0(\x8C\f\vA\0\v \0(\x8C"  j"
 X!\v@ \0A\x90j F@ \0A\xD0\0j!A\0!\x07\f\v At'"\x07! \x07E\r\v \0A\xC4\0j"\f ("\b6\0 \bA\xEC\x82G@ \b \b(Aj6\v  \v 
  \0A\xCC\0j \0A\xC8\0j \f\xCC@ \0(D"A\xEC\x82F\r\0  ("\bAk6 \b\r\0  (\0(\b\0\v   \0(L \0(H  w! \x07## \0A\xC0j$\0 \f\v=\0\v\v6\x7F \0A\xA8%6\0 \0("@A  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v\x8B\x7F#\0A\xF0\0k"\0$\0A\bAA
 ("A\xCA\0q"\x07A\bF\x1B \x07A\xC0\0F"\b\x1B!	 \0A\xD0\0j!@ P\r\0 A\x80qE\r\0 \b@ \0A0:\0P Ar!\f\v \x07A\bG\r\0 \0A0:\0P \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0Q \0A\xD0\0jAr!\v \0A\xC8\0j  \0A\xE8\0j  	\xB5 \0(H!\x07@ A\x88\x80qA\x88\x80G\r\0@  \x07F\r  -\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 Aj!\f\0\v\0\v \0A\xD0\0j" \x07 X!\b \0Aj"	 ("6\0 A\xEC\x82G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj 	\xB6@ \0("A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v   \0(\f \0(\b  w \0A\xF0\0j$\0\v\r\0    \xCD\v\xFB\x7F~#\0A\xF0\0k"$\0 ("A\xCA\0q"\x07A\bF!\b A\xD0\0j!\0~@ B\0Y\r\0 \b\r\0  \x07A\xC0\0F\r A-:\0P \0Ar!\0B\0 }\f\v \v!\vAA
 \b\x1B!
 \x07A\xC0\0F!	@ \b\r\0 	\r\0 B\0S\r\0 A\x80qE\r\0 \0A+:\0\0 \0Aj!\0\vA\b 
 	\x1B!\b@ P\r\0 A\x80qE\r\0 \x07A\xC0\0F@ \0A0:\0\0 \0Aj!\0\f\v \x07A\bG\r\0 \0A0:\0\0 \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0 \0Aj!\0\v A\xC8\0j \0 A\xE8\0j \v \b\xB5@ A\x88\x80qA\x88\x80F@@ \0 (H"F\r \0 \0-\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 \0Aj!\0\f\0\v\0\v (H!\v A\xD0\0j"\x07  X!\b Aj"	 ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v \x07 \b  Aj" A\fj A\bj 	\xB6@ ("\0A\xEC\x82F\r\0 \0 \0("\x07Ak6 \x07\r\0 \0 \0(\0(\b\0\v   (\f (\b  w A\xF0\0j$\0\v\xF3\x07\x7F#\0A@j"$\0 ("A\xCA\0q"\bA\bF!\x07 A3j!\0\x7F@ A\0N\r\0 \x07\r\0  \bA\xC0\0F\r A-:\x003 A4j!\0A\0 k\f\v \v!
AA
 \x07\x1B!\v \bA\xC0\0F!	@ \x07\r\0 	\r\0 A\0H\r\0 A\x80qE\r\0 \0A+:\0\0 \0Aj!\0\vA\b \v 	\x1B!\x07@ E\r\0 A\x80qE\r\0 \bA\xC0\0F@ \0A0:\0\0 \0Aj!\0\f\v \bA\bG\r\0 \0A0:\0\0 \0A\xD8\0A\xF8\0 A\x80\x80q\x1B:\0 \0Aj!\0\v A(j \0 A@k 
 \x07\xB7@ A\x88\x80qA\x88\x80F@@ \0 (("F\r \0 \0-\0\0"A k  A\xE1\0kA\xFFqAI\x1B:\0\0 \0Aj!\0\f\0\v\0\v ((!\v A3j"  X!\b Aj"\x07 ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v  \b  Aj" A\fj A\bj \x07\xB6@ ("\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v   (\f (\b  w A@k$\0\v\xE7\x7F#\0Ak"$\0@ -\0AqE@ \0     \0(\0(\x07\0!\f\v Aj"\0 ("6\0 A\xEC\x82G@  (Aj6\v \0A\xDC\x84+!@ ("A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v \0  (\0AA \x1Bj(\0\0 ( \0 ,\0"A\0H"\x1B"  (\b  \x1Bj \xCF! \0)\v Aj$\0 \vI\x7F#\0Ak"$\0  ("\x07A\xB5\xFF~qA\br6     A\fj\xD1  \x076  (\f6\0 Aj$\0\v\xE2\x7F~\x7F#\0A\xF0k"\0$\0 \0 6\xE8 \0 6\xEC \0A\xDCj  \0A\xF0j \0A\xECj \0A\xE8j\xE0 \0A\x006\xD8 \0B\x007\xD0 \0A\xD0j"A
E \0 \0(\xD0  \0,\0\xDBA\0H\x1B"6\xCC \0 \0A j6 \0A\x006 \0A:\0 \0A\xC5\0:\0A\0!@@@@ \0A\xECj \0A\xE8j-\r\0 \0(\xCC  \0(\xD4 \0,\0\xDB" A\0H\x1B"jF@ \0A\xD0j" AtE A
 \0(\xD8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xDBA\0N\x1BE \0 \0(\xD0  \0,\0\xDBA\0H\x1B" j6\xCC\v\x7F \0(\xEC"(\f" (F@  (\0($\0\0\f\v (\0\v \0Aj \0Aj  \0A\xCCj \0(\xEC \0(\xE8 \0A\xDCj \0A j \0Aj \0Aj \0A\xF0j\xDF\r\0 \rA\0! \0(\xCC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xE0 \0,\0\xE7" A\0H\x1BE\r\0 \0-\0AqE\r\0 \0(" \0A jkA\x9FJ\r\0 \0 Aj6  \0(6\0\v \0  \0(\xCC \xD3 \0)\0!\b  \0)\b7\b  \b7\0 \0A\xDCj \0A j \0( D \0A\xECj \0A\xE8j-@  (\0Ar6\0\v \0(\xEC \0A\xD0j) \0A\xDCj) \0A\xF0j$\0\f\vA!\v \0(\xEC6\f\0\v\0\v\v\xCB\x7F\x7F#\0A\xE0k"\0$\0 \0 6\xD8 \0 6\xDC \0A\xCCj  \0A\xE0j \0A\xDCj \0A\xD8j\xE0 \0A\x006\xC8 \0B\x007\xC0 \0A\xC0j"A
E \0 \0(\xC0  \0,\0\xCBA\0H\x1B"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xDCj \0A\xD8j-\r\0 \0(\xBC  \0(\xC4 \0,\0\xCB" A\0H\x1B"jF@ \0A\xC0j" AtE A
 \0(\xC8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xCBA\0N\x1BE \0 \0(\xC0  \0,\0\xCBA\0H\x1B" j6\xBC\v\x7F \0(\xDC"(\f" (F@  (\0($\0\0\f\v (\0\v \0A\x07j \0Aj  \0A\xBCj \0(\xDC \0(\xD8 \0A\xCCj \0Aj \0A\fj \0A\bj \0A\xE0j\xDF\r\0 \rA\0! \0(\xBC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xD0 \0,\0\xD7" A\0H\x1BE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xD49\0 \0A\xCCj \0Aj \0(\f D \0A\xDCj \0A\xD8j-@  (\0Ar6\0\v \0(\xDC \0A\xC0j) \0A\xCCj) \0A\xE0j$\0\f\vA!\v \0(\xDC6\f\0\v\0\v\v\xCB\x7F\x7F#\0A\xE0k"\0$\0 \0 6\xD8 \0 6\xDC \0A\xCCj  \0A\xE0j \0A\xDCj \0A\xD8j\xE0 \0A\x006\xC8 \0B\x007\xC0 \0A\xC0j"A
E \0 \0(\xC0  \0,\0\xCBA\0H\x1B"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xDCj \0A\xD8j-\r\0 \0(\xBC  \0(\xC4 \0,\0\xCB" A\0H\x1B"jF@ \0A\xC0j" AtE A
 \0(\xC8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xCBA\0N\x1BE \0 \0(\xC0  \0,\0\xCBA\0H\x1B" j6\xBC\v\x7F \0(\xDC"(\f" (F@  (\0($\0\0\f\v (\0\v \0A\x07j \0Aj  \0A\xBCj \0(\xDC \0(\xD8 \0A\xCCj \0Aj \0A\fj \0A\bj \0A\xE0j\xDF\r\0 \rA\0! \0(\xBC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xD0 \0,\0\xD7" A\0H\x1BE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xD58\0 \0A\xCCj \0Aj \0(\f D \0A\xDCj \0A\xD8j-@  (\0Ar6\0\v \0(\xDC \0A\xC0j) \0A\xCCj) \0A\xE0j$\0\f\vA!\v \0(\xDC6\f\0\v\0\v\v\0 \0A\fj Ak \0A j\xCE\v\xD4
\b\x7F~#\0A\xB0k"$\0  6\xA8  6\xAC f! Aj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xE4\x84+!\0@ ("\bA\xEC\x82F\r\0 \b \b("\x07Ak6 \x07\r\0 \b \b(\0(\b\0\v \0 \0(\0(\0\0!
 A\x9Cj \0 \0(\0(\0  A\xB0j\x98!@ A\xACj A\xA8j-E@@  AjkA\x9FJ!\b@@ (\xA0 ,\0\xA7"\0 \0A\0H\x1BE\r\x7F (\xAC"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v 
G\r (\xAC6 \b\r\0\v A\x006\0 Aj!\f\v\v\x7F (\xAC"\0(\f"\b \0(F@ \0 \0(\0($\0\0\f\v \b(\0\v!\0 (d!\b\x7F (\`"\x07 \0G@A\0 \0 \bG\r\v (\xAC6 \0 \bF \0 \x07Gr\v!\f A\xACj A\xA8j-@  (\0Ar6\0 B\x007\0\f\vA!\0A\0!\b@@@ AG@ @ !\0\f\v\x7F (\xAC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v (\0\v (\0G@A
!\0\f\v (\xAC6 A\xACj A\xA8j-E@\x7F (\xAC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v (\0\v"\0 (XF\r \0 (\\F\rA\b!\0\f\v  (\0Ar6\0 B\x007\0\f\v\x7F (\xAC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v (\0G\r (\xAC6 A\xACj A\xA8j-@  (\0Ar6\0 B\x007\0\f\v\x7F (\xAC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (XF\r  (\\F\r\vA!\b\f\v (\xAC6A!\0\v \0\xAD! \0AF!\rA\0!@@ A\xACj A\xA8j-\r\0@@\x7F (\xAC"\x07(\f"	 \x07(F@ \x07 \x07(\0($\0\0\f\v 	(\0\v"\x07 
G\r\0 (\xA0 ,\0\xA7"	 	A\0H\x1BE\r\0  AjkA\x9FJ\r  6\0 Aj!A\0!\f\v  \x07\x97"\x07AJ\r \x07Ak \x07 \x07AJ\x1B \x07 \r\x1B"\x07 \0N\r  B\0 B\0?A!\b )\0! Aj! )\bB\0R\x7FAB\0   \x07\xAC"|"V\xAD B?\x87|"B\x83}" \x85B\0R B\0Sr\v \vAqr!\v\v (\xAC6\f\v\v  \bA\x7Fs \vrAq~  (\0Ar6\0B\0 \b\xAD}B\0 }  \f\x1B\v7\0@ (\xA0 ,\0\xA7"\0 \0A\0H\x1BE\r\0  AjkA\x9FJ\r\0  6\0 Aj!\v A\x9Cj Aj  D A\xACj A\xA8j-E\r  (\0Ar6\0\f\v  (\0Ar6\0 B\x007\0\v (\xAC A\x9Cj) A\xB0j$\0\v\x8C
	\x7F#\0A\xA0k"\0$\0 \0 6\x98 \0 6\x9C f! \0 ("6\0 A\xEC\x82G@  (Aj6\v \0A\xE4\x84+!@ \0(\0"A\xEC\x82F\r\0  ("\vAk6 \v\r\0  (\0(\b\0\v  (\0(\0\0!\v \0A\x8Cj  (\0(\0  \0A\xA0j\x98!@ \0A\x9Cj \0A\x98j-E@ \0!@  \0kA\x9FJ!\b@@ \0(\x90 \0,\0\x97" A\0H\x1BE\r\x7F \0(\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v \vG\r \0(\x9C6 \b\r\0\v A\x006\0 Aj!\f\v\v\x7F \0(\x9C"(\f"\b (F@  (\0($\0\0\f\v \b(\0\v! (d!\b\x7F (\`"\x07 G@A\0  \bG\r\v \0(\x9C6  \bF  \x07Gr\v!\b \0A\x9Cj \0A\x98j-@  (\0Ar6\0 A\0;\0\f\vA!@@@ AG@ @ !\f\v\x7F \0(\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v (\0G@A
!\f\v \0(\x9C6 \0A\x9Cj \0A\x98j-E@\x7F \0(\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (XF\r  (\\F\rA\b!\f\v  (\0Ar6\0 A\0;\0\f\v\x7F \0(\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v (\0G\r \0(\x9C6 \0A\x9Cj \0A\x98j-@  (\0Ar6\0 A\0;\0\f\v\x7F \0(\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (XF\r  (\\F\r\vA!	\f\v \0(\x9C6\v AF!\x07@@ \0A\x9Cj \0A\x98j-\r\0@@\x7F \0(\x9C"(\f"
 (F@  (\0($\0\0\f\v 
(\0\v" \vG\r\0 \0(\x90 \0,\0\x97"
 
A\0H\x1BE\r\0  \0kA\x9FJ\r  \f6\0 Aj!A\0!\f\f\v  \x97"AJ\r Ak  AJ\x1B  \x07\x1B"
 N\r  \rA\xFF\xFFql"  
j"	 A\xFF\xFFK\x1B!\r   	rA\xFF\xFFKr!A!	 \fAj!\f\v \0(\x9C6\f\v\v  	A\x7Fs rAq\x7F  (\0Ar6\0A\0 	kA\0 \rk \r \b\x1B\v;\0@ \0(\x90 \0,\0\x97" A\0H\x1BE\r\0  \0kA\x9FJ\r\0  \f6\0 Aj!\v \0A\x8Cj \0  D \0A\x9Cj \0A\x98j-E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\0;\0\v \0(\x9C \0A\x8Cj) \0A\xA0j$\0\v\xD5\v\b\x7F~#\0A\xB0k"$\0  6\xA8  6\xAC f! Aj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xE4\x84+!\0@ ("\x07A\xEC\x82F\r\0 \x07 \x07("\bAk6 \b\r\0 \x07 \x07(\0(\b\0\v \0 \0(\0(\0\0!
 A\x9Cj \0 \0(\0(\0  A\xB0j\x98!@ A\xACj A\xA8j-E@@  AjkA\x9FJ!\x07@@ (\xA0 ,\0\xA7"\0 \0A\0H\x1BE\r\x7F (\xAC"\0(\f"\b \0(F@ \0 \0(\0($\0\0\f\v \b(\0\v 
G\r (\xAC6 \x07\r\0\v A\x006\0 Aj!\f\v\v\x7F (\xAC"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v!\0 (d!\x07\x7F (\`"\b \0G@A\0 \0 \x07G\r\v (\xAC6 \0 \x07F \0 \bGr\v!\v A\xACj A\xA8j-@  (\0Ar6\0 B\x007\0\f\vA!\0A\0!\b@@@ AG@ @ !\0\f\v\x7F (\xAC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v (\0\v (\0G@A
!\0\f\v (\xAC6 A\xACj A\xA8j-E@\x7F (\xAC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v (\0\v"\0 (XF\r \0 (\\F\rA\b!\0\f\v  (\0Ar6\0 B\x007\0\f\v\x7F (\xAC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v (\0G\r (\xAC6 A\xACj A\xA8j-@  (\0Ar6\0 B\x007\0\f\v\x7F (\xAC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (XF\r  (\\F\r\vA!\b\f\v (\xAC6A!\0\v \0\xAD! \0AF!\rA\0!@@ A\xACj A\xA8j-\r\0@@\x7F (\xAC"\x07(\f"	 \x07(F@ \x07 \x07(\0($\0\0\f\v 	(\0\v"\x07 
G\r\0 (\xA0 ,\0\xA7"	 	A\0H\x1BE\r\0  AjkA\x9FJ\r  6\0 Aj!A\0!\f\v  \x07\x97"\x07AJ\r \x07Ak \x07 \x07AJ\x1B \x07 \r\x1B"\x07 \0N\r  B\0 B\0?A!\b )\0! Aj! )\bB\0R\x7FAB\0   \x07\xAC"|"V\xAD B?\x87|"B\x83}" \x85B\0R B\0Sr\v \fAqr!\f\v (\xAC6\f\v\v@ \bE@  (\0Ar6\0B\0!\f\v \fAq@  (\0Ar6\0B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0 \v\x1B!\f\v \vE@ B\0Y\r  (\0Ar6\0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0!\f\v B\x81\x80\x80\x80\x80\x80\x80\x80\x80\x7FZ@  (\0Ar6\0B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F!\f\vB\0 }!\v  7\0@ (\xA0 ,\0\xA7"\0 \0A\0H\x1BE\r\0  AjkA\x9FJ\r\0  6\0 Aj!\v A\x9Cj Aj  D A\xACj A\xA8j-E\r  (\0Ar6\0\f\v  (\0Ar6\0 B\x007\0\v (\xAC A\x9Cj) A\xB0j$\0\v\x96\v	\x7F~#\0A\xA0k"$\0  6\x98  6\x9C f!\0  ("6\0 A\xEC\x82G@  (Aj6\v A\xE4\x84+!@ (\0"A\xEC\x82F\r\0  ("
Ak6 
\r\0  (\0(\b\0\v  (\0(\0\0!
 A\x8Cj  (\0(\0  A\xA0j\x98!@ A\x9Cj A\x98j-E@ !@  kA\x9FJ!	@@ (\x90 ,\0\x97" A\0H\x1BE\r\x7F (\x9C"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v 
G\r (\x9C6 	\r\0\v A\x006\0 Aj!\f\v\v\x7F (\x9C"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v! (d!	\x7F (\`"\x07 G@A\0  	G\r\v (\x9C6  	F  \x07Gr\v!	 A\x9Cj A\x98j-@  (\0Ar6\0 A\x006\0\f\vA!@@@ \0AG@ \0@ \0!\f\v\x7F (\x9C"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v (\0G@A
!\f\v (\x9C6 A\x9Cj A\x98j-E@\x7F (\x9C"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v"\0 (XF\r \0 (\\F\rA\b!\f\v  (\0Ar6\0 A\x006\0\f\v\x7F (\x9C"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v (\0G\r (\x9C6 A\x9Cj A\x98j-@  (\0Ar6\0 A\x006\0\f\v\x7F (\x9C"\0(\f"\x07 \0(F@ \0 \0(\0($\0\0\f\v \x07(\0\v"\0 (XF\r \0 (\\F\r\vA!\r\f\v (\x9C6\v AF!\x07@@ A\x9Cj A\x98j-\r\0@@\x7F (\x9C"\0(\f"\f \0(F@ \0 \0(\0($\0\0\f\v \f(\0\v"\0 
G\r\0 (\x90 ,\0\x97"\f \fA\0H\x1BE\r\0  kA\x9FJ\r  \v6\0 Aj!A\0!\v\f\v  \0\x97"\0AJ\r \0Ak \0 \0AJ\x1B \0 \x07\x1B"\0 N\r \xAD \b\xAD~"\xA7!\bA!\r@ B \x88B\0R@A!\0\f\v \0\xAC \b\xAD|"B\x86B\x87" R B\0Sr!\0 \xA7!\b\v \vAj!\v \0 Aqr!\v (\x9C6\f\v\v@ \rE@  (\0Ar6\0A\0!\b\f\v Aq@  (\0Ar6\0A\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07 	\x1B!\b\f\v 	E@ \bA\0N\r  (\0Ar6\0A\xFF\xFF\xFF\xFF\x07!\b\f\v \bA\x81\x80\x80\x80xO@  (\0Ar6\0A\x80\x80\x80\x80x!\b\f\vA\0 \bk!\b\v  \b6\0@ (\x90 ,\0\x97"\0 \0A\0H\x1BE\r\0  kA\x9FJ\r\0  \v6\0 Aj!\v A\x8Cj   D A\x9Cj A\x98j-E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\x006\0\v (\x9C A\x8Cj) A\xA0j$\0\v\x91\f\x7F@@  \0( \0(kAj"	F\r\0  	k"\v \0A\fj"(" (\f"kAj"j!\x07@ (@@ \x07At'"
@ \x07   \x07J\x1B"\fA\0J@@ ( 
 \bAt"j"B\x007 A\xA8%6\0A\0!A\0! j"\r("@@A%" 6 A\x006\0  +\b9\b  +9@ @  6\0\f\v  6 !\v  6\b ! (\0"\r\0\v\v \r(\f! A\xEC%6\0  6\f \bAj"\b \fG\r\0\v\v (" (\bI\x7F@  (\0(\0\0\0 Aj" (\bI\r\0\v ( \v#  
6\f\v\f\v (! (\f! (!\f\v  \x07At'"6 \r\0\f\v   \vj6   \x07Atj6\b   Atk6\0 \0( 	Atj" \0("O\r\0@ B\x007 A\xA8%6\0 \0($"@@A%" (\b"6 A\x006\0  +\b9\b  +9@ (@  6\0\f\v  6\v  6\b (\0"\r\0\v \0(!\v \0(,! A\xEC%6\0  6\f Aj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\x97\x7F#\0A k"$\0  6@ -\0AqE@ A\x7F6\0 \0      \0(\0(\0!@@@ (\0\0\v A\0:\0\0\f\v A:\0\0\f\v A:\0\0 A6\0\f\v  ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\x9C\x84+!\x07@ (\0"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v  ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xE4\x84+!\0@ (\0"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v  \0 \0(\0(\0 A\fr \0 \0(\0(\0  Aj   Aj" \x07 A\xB8 F:\0\0 (!@ A\fk)" G\r\0\v\v A j$\0 \vI\x7F#\0Ak"$\0  ("\x07A\xB5\xFF~qA\br6     A\fj\xD6  \x076  (\f6\0 Aj$\0\v\xE3\x7F~\x7F#\0A\xA0k"\0$\0 \0 6\x98 \0 6\x9C \0A\xE0j  \0A\xF0j \0A\xEFj \0A\xEEj\xE2 \0A\x006\xD8 \0B\x007\xD0 \0A\xD0j"A
E \0 \0(\xD0  \0,\0\xDBA\0H\x1B"6\xCC \0 \0A j6 \0A\x006 \0A:\0 \0A\xC5\0:\0A\0!@@@@ \0A\x9Cj \0A\x98j.\r\0 \0(\xCC  \0(\xD4 \0,\0\xDB" A\0H\x1B"jF@ \0A\xD0j" AtE A
 \0(\xD8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xDBA\0N\x1BE \0 \0(\xD0  \0,\0\xDBA\0H\x1B" j6\xCC\v\x7F \0(\x9C"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0 \0Aj \0Aj  \0A\xCCj \0,\0\xEF \0,\0\xEE \0A\xE0j \0A j \0Aj \0Aj \0A\xF0j\xE1\r\0 \rA\0! \0(\xCC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xE4 \0,\0\xEB" A\0H\x1BE\r\0 \0-\0AqE\r\0 \0(" \0A jkA\x9FJ\r\0 \0 Aj6  \0(6\0\v \0  \0(\xCC \xD3 \0)\0!\b  \0)\b7\b  \b7\0 \0A\xE0j \0A j \0( D \0A\x9Cj \0A\x98j.@  (\0Ar6\0\v \0(\x9C \0A\xD0j) \0A\xE0j) \0A\xA0j$\0\f\vA!\v \0(\x9C7\f\0\v\0\v\v\xCC\x7F\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xD0j  \0A\xE0j \0A\xDFj \0A\xDEj\xE2 \0A\x006\xC8 \0B\x007\xC0 \0A\xC0j"A
E \0 \0(\xC0  \0,\0\xCBA\0H\x1B"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\x8Cj \0A\x88j.\r\0 \0(\xBC  \0(\xC4 \0,\0\xCB" A\0H\x1B"jF@ \0A\xC0j" AtE A
 \0(\xC8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xCBA\0N\x1BE \0 \0(\xC0  \0,\0\xCBA\0H\x1B" j6\xBC\v\x7F \0(\x8C"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0 \0A\x07j \0Aj  \0A\xBCj \0,\0\xDF \0,\0\xDE \0A\xD0j \0Aj \0A\fj \0A\bj \0A\xE0j\xE1\r\0 \rA\0! \0(\xBC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xD4 \0,\0\xDB" A\0H\x1BE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xD49\0 \0A\xD0j \0Aj \0(\f D \0A\x8Cj \0A\x88j.@  (\0Ar6\0\v \0(\x8C \0A\xC0j) \0A\xD0j) \0A\x90j$\0\f\vA!\v \0(\x8C7\f\0\v\0\v\v\xCC\x7F\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xD0j  \0A\xE0j \0A\xDFj \0A\xDEj\xE2 \0A\x006\xC8 \0B\x007\xC0 \0A\xC0j"A
E \0 \0(\xC0  \0,\0\xCBA\0H\x1B"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\x8Cj \0A\x88j.\r\0 \0(\xBC  \0(\xC4 \0,\0\xCB" A\0H\x1B"jF@ \0A\xC0j" AtE A
 \0(\xC8A\xFF\xFF\xFF\xFF\x07qAk \0,\0\xCBA\0N\x1BE \0 \0(\xC0  \0,\0\xCBA\0H\x1B" j6\xBC\v\x7F \0(\x8C"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0 \0A\x07j \0Aj  \0A\xBCj \0,\0\xDF \0,\0\xDE \0A\xD0j \0Aj \0A\fj \0A\bj \0A\xE0j\xE1\r\0 \rA\0! \0(\xBC k"A\0L\r@@ -\0\0"A+k"\x07\0\0\v A.F\rA! A0kA\xFFqA
I\r\f\v AF\r@ \x07\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@ \0(\xD4 \0,\0\xDB" A\0H\x1BE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xD58\0 \0A\xD0j \0Aj \0(\f D \0A\x8Cj \0A\x88j.@  (\0Ar6\0\v \0(\x8C \0A\xC0j) \0A\xD0j) \0A\x90j$\0\f\vA!\v \0(\x8C7\f\0\v\0\v\v\xAD\x7F#\0Ak"$\0 \0A\xA8%6  \0A\xE4#6\0 \0($"@A  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 Aj" \0(I\r\0\v \0( \v# \0A\x80\xDA(\x006\0A\x80\xDA \x006\0 Aj$\0\v\xAE
\x07\x7F~#\0A\xD0k"$\0  6\xC8  6\xCC f! Aj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xDC\x84+!\0@ ("A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 \0(\0(\0\0!\x07 A\xBCj \0 \0(\0(\0@ A\xCCj A\xC8j.E@@  AjkA\x9FJ!@@ (\xC0 ,\0\xC7"\0 \0A\0H\x1BE\r \x07A\xFFq\x7F (\xCC"\0(\f"\b \0(F@ \0 \0(\0($\0\0\f\v \b-\0\0\vA\xFFqG\r (\xCC7 \r\0\v A\x006\0 Aj!\f\v\v@@\x7F (\xCC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v -\0\0\vA\xFFq"\0A+k\0\0\v (\xCC7 \0A-F!\f\v A\xCCj A\xC8j.@  (\0Ar6\0 B\x007\0\f\vA!\0@@@ AG@ @ !\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G@A
!\0\f\v (\xCC7 A\xCCj A\xC8j.E@\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\rA\b!\0\f\v  (\0Ar6\0 B\x007\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G\r (\xCC7 A\xCCj A\xC8j.@  (\0Ar6\0 B\x007\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\r\vA!	\f\v (\xCC7\v \0\xAD! \0AF!\bA\0!@@ A\xCCj A\xC8j.\r\0@@ \x07A\xFFq\x7F (\xCC"(\f"
 (F@  (\0($\0\0\f\v 
-\0\0\v"A\xFFqG\r\0 (\xC0 ,\0\xC7"
 
A\0H\x1BE\r\0  AjkA\x9FJ\r  6\0 Aj!A\0!\f\v \xC0\x99"AJ\r Ak  AJ\x1B  \b\x1B" \0N\r  B\0 \rB\0?A!	 )\0!\r Aj! )\bB\0R\x7FAB\0 \r \r \xAC"|"\rV\xAD B?\x87|"B\x83}" \x85B\0R B\0Sr\v \vAqr!\v\v (\xCC7\f\v\v  	A\x7Fs \vrAq~  (\0Ar6\0B\0 	\xAD}B\0 \r} \r \f\x1B\v7\0@ (\xC0 ,\0\xC7"\0 \0A\0H\x1BE\r\0  AjkA\x9FJ\r\0  6\0 Aj!\v A\xBCj Aj  D A\xCCj A\xC8j.E\r  (\0Ar6\0\f\v  (\0Ar6\0 B\x007\0\v (\xCC A\xBCj) A\xD0j$\0\v\xF2	\b\x7F#\0A\xC0k"\0$\0 \0 6\xB8 \0 6\xBC f! \0 ("6\0 A\xEC\x82G@  (Aj6\v \0A\xDC\x84+!@ \0(\0"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v  (\0(\0\0!\v \0A\xACj  (\0(\0@ \0A\xBCj \0A\xB8j.E@ \0!@  \0kA\x9FJ!@@ \0(\xB0 \0,\0\xB7" A\0H\x1BE\r \vA\xFFq\x7F \0(\xBC"(\f"	 (F@  (\0($\0\0\f\v 	-\0\0\vA\xFFqG\r \0(\xBC7 \r\0\v A\x006\0 Aj!\f\v\v@@\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFq"A+k\0\0\v \0(\xBC7 A-F!\r\v \0A\xBCj \0A\xB8j.@  (\0Ar6\0 A\0;\0\f\vA!@@@ AG@ @ !\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G@A
!\f\v \0(\xBC7 \0A\xBCj \0A\xB8j.E@\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\rA\b!\f\v  (\0Ar6\0 A\0;\0\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G\r \0(\xBC7 \0A\xBCj \0A\xB8j.@  (\0Ar6\0 A\0;\0\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\r\vA!\x07\f\v \0(\xBC7\v AF!	A\0!@@ \0A\xBCj \0A\xB8j.\r\0@@ \vA\xFFq\x7F \0(\xBC"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v"A\xFFqG\r\0 \0(\xB0 \0,\0\xB7"\b \bA\0H\x1BE\r\0  \0kA\x9FJ\r  6\0 Aj!A\0!\f\v \xC0\x99"AJ\r Ak  AJ\x1B  	\x1B"\b N\r  
A\xFF\xFFql"  \bj"\x07 A\xFF\xFFK\x1B!
 \f  \x07rA\xFF\xFFKr!\fA!\x07 Aj!\v \0(\xBC7\f\v\v  \x07A\x7Fs \frAq\x7F  (\0Ar6\0A\0 \x07kA\0 
k 
 \r\x1B\v;\0@ \0(\xB0 \0,\0\xB7" A\0H\x1BE\r\0  \0kA\x9FJ\r\0  6\0 Aj!\v \0A\xACj \0  D \0A\xBCj \0A\xB8j.E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\0;\0\v \0(\xBC \0A\xACj) \0A\xC0j$\0\v\xAF\v\x07\x7F~#\0A\xD0k"$\0  6\xC8  6\xCC f! Aj" ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xDC\x84+!\0@ ("A\xEC\x82F\r\0  ("\x07Ak6 \x07\r\0  (\0(\b\0\v \0 \0(\0(\0\0!\x07 A\xBCj \0 \0(\0(\0@ A\xCCj A\xC8j.E@@  AjkA\x9FJ!@@ (\xC0 ,\0\xC7"\0 \0A\0H\x1BE\r \x07A\xFFq\x7F (\xCC"\0(\f"\b \0(F@ \0 \0(\0($\0\0\f\v \b-\0\0\vA\xFFqG\r (\xCC7 \r\0\v A\x006\0 Aj!\f\v\v@@\x7F (\xCC"\0(\f" \0(F@ \0 \0(\0($\0\0\f\v -\0\0\vA\xFFq"\0A+k\0\0\v (\xCC7 \0A-F!
\v A\xCCj A\xC8j.@  (\0Ar6\0 B\x007\0\f\vA!\0@@@ AG@ @ !\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G@A
!\0\f\v (\xCC7 A\xCCj A\xC8j.E@\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\rA\b!\0\f\v  (\0Ar6\0 B\x007\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G\r (\xCC7 A\xCCj A\xC8j.@  (\0Ar6\0 B\x007\0\f\v\x7F (\xCC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\r\vA!\v\f\v (\xCC7\v \0\xAD! \0AF!\bA\0!@@ A\xCCj A\xC8j.\r\0@@ \x07A\xFFq\x7F (\xCC"(\f"	 (F@  (\0($\0\0\f\v 	-\0\0\v"A\xFFqG\r\0 (\xC0 ,\0\xC7"	 	A\0H\x1BE\r\0  AjkA\x9FJ\r  6\0 Aj!A\0!\f\v \xC0\x99"AJ\r Ak  AJ\x1B  \b\x1B" \0N\r  B\0 \rB\0?A!\v )\0!\r Aj! )\bB\0R\x7FAB\0 \r \r \xAC"|"\rV\xAD B?\x87|"B\x83}" \x85B\0R B\0Sr\v \fAqr!\f\v (\xCC7\f\v\v@ \vE@  (\0Ar6\0B\0!\r\f\v \fAq@  (\0Ar6\0B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0 
\x1B!\r\f\v 
E@ \rB\0Y\r  (\0Ar6\0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0!\r\f\v \rB\x81\x80\x80\x80\x80\x80\x80\x80\x80\x7FZ@  (\0Ar6\0B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F!\r\f\vB\0 \r}!\r\v  \r7\0@ (\xC0 ,\0\xC7"\0 \0A\0H\x1BE\r\0  AjkA\x9FJ\r\0  6\0 Aj!\v A\xBCj Aj  D A\xCCj A\xC8j.E\r  (\0Ar6\0\f\v  (\0Ar6\0 B\x007\0\v (\xCC A\xBCj) A\xD0j$\0\v\xFC
\b\x7F~#\0A\xC0k"\0$\0 \0 6\xB8 \0 6\xBC f! \0 ("6\0 A\xEC\x82G@  (Aj6\v \0A\xDC\x84+!@ \0(\0"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v  (\0(\0\0!
 \0A\xACj  (\0(\0@ \0A\xBCj \0A\xB8j.E@ \0!@  \0kA\x9FJ!@@ \0(\xB0 \0,\0\xB7" A\0H\x1BE\r 
A\xFFq\x7F \0(\xBC"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\vA\xFFqG\r \0(\xBC7 \r\0\v A\x006\0 Aj!\f\v\v@@\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFq"A+k\0\0\v \0(\xBC7 A-F!\v\v \0A\xBCj \0A\xB8j.@  (\0Ar6\0 A\x006\0\f\vA!@@@ AG@ @ !\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G@A
!\f\v \0(\xBC7 \0A\xBCj \0A\xB8j.E@\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\rA\b!\f\v  (\0Ar6\0 A\x006\0\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA\xFFqA0G\r \0(\xBC7 \0A\xBCj \0A\xB8j.@  (\0Ar6\0 A\x006\0\f\v\x7F \0(\xBC"(\f" (F@  (\0($\0\0\f\v -\0\0\vA rA\xFFqA\xF8\0F\r\vA!\f\f\v \0(\xBC7\v AF!\bA\0!@@ \0A\xBCj \0A\xB8j.\r\0@@ 
A\xFFq\x7F \0(\xBC"(\f"	 (F@  (\0($\0\0\f\v 	-\0\0\v"A\xFFqG\r\0 \0(\xB0 \0,\0\xB7"	 	A\0H\x1BE\r\0  \0kA\x9FJ\r  \x076\0 Aj!A\0!\x07\f\v \xC0\x99"AJ\r Ak  AJ\x1B  \b\x1B" N\r \xAD \xAD~"\xA7!A!\f@ B \x88B\0R@A!\f\v \xAC \xAD|"B\x86B\x87" R B\0Sr! \xA7!\v \x07Aj!\x07  \rAqr!\r\v \0(\xBC7\f\v\v@ \fE@  (\0Ar6\0A\0!\f\v \rAq@  (\0Ar6\0A\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07 \v\x1B!\f\v \vE@ A\0N\r  (\0Ar6\0A\xFF\xFF\xFF\xFF\x07!\f\v A\x81\x80\x80\x80xO@  (\0Ar6\0A\x80\x80\x80\x80x!\f\vA\0 k!\v  6\0@ \0(\xB0 \0,\0\xB7" A\0H\x1BE\r\0  \0kA\x9FJ\r\0  \x076\0 Aj!\v \0A\xACj \0  D \0A\xBCj \0A\xB8j.E\r  (\0Ar6\0\f\v  (\0Ar6\0 A\x006\0\v \0(\xBC \0A\xACj) \0A\xC0j$\0\v\x97\x7F#\0A k"$\0  6@ -\0AqE@ A\x7F6\0 \0      \0(\0(\0!@@@ (\0\0\v A\0:\0\0\f\v A:\0\0\f\v A:\0\0 A6\0\f\v  ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xA4\x84+!\x07@ (\0"\0A\xEC\x82F\r\0 \0 \0("Ak6 \r\0 \0 \0(\0(\b\0\v  ("\x006\0 \0A\xEC\x82G@ \0 \0(Aj6\v A\xDC\x84+!\0@ (\0"A\xEC\x82F\r\0  ("Ak6 \r\0  (\0(\b\0\v  \0 \0(\0(\0 A\fr \0 \0(\0(\0  Aj   Aj" \x07 A\xB9 F:\0\0 (!@ A\fk)" G\r\0\v\v A j$\0 \v@\x7FA\0!\0\x7F  F\x7F \0 (\0 \0Atj"\0A\x80\x80\x80\x80\x7Fq"Av r \0s!\0 Aj!\f\v\v\v\v\0 \0  \xD9\vT\x7F@@  G@A\x7F!\0  F\r (\0" (\0"H\r  J@A Aj! Aj!\f\v\0\v\v  G!\0\v \0\v@\x7FA\0!\0\x7F  F\x7F \0 ,\0\0 \0Atj"\0A\x80\x80\x80\x80\x7Fq"Av r \0s!\0 Aj!\f\v\v\v\v\0 \0  \xF8\v^\x7F   kj!@@  G@A\x7F!\0  F\r ,\0\0" ,\0\0"\x07H\r  \x07J@A Aj! Aj!\f\v\0\v\v  G!\0\v \0\vT\x7F  \0(T" A\0 A\x80j"\xF5" k  \x1B"   K\x1B"j \0  j"6T \0 6\b \0  j6 \v\xB8\x7F#\0Ak"$\0 \0A\xF8!6\0 \0,\0+A\0H@ \0(( \0( #\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# \0A\xF0\xD9(\x006\0A\xF0\xD9 \x006\0 Aj$\0\v\xA5\x7F#\0Ak"$\0 \0A\xF8&6\0 \0,\0+A\0H@ \0(( \0( #\v \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# Aj$\0 \0\v\xA4\x7F#\0A k"$\0@ A\x7FF@A\0!\f\v  6 \0-\0,AF@A\x7F  \0( !#\0Ak"$\0A\xF0\xAD(\0"\0!\x07 (HA\0L@ (\x88E@ A\xE0\xD9A\xC8\xD9 \0(\0\x1B6\x88\v (HE@ A6H\v\vA\xF0\xAD (\x886\0@@@ A\xFF\0M@@  (PF\r\0 ("\0 (F\r\0  \0Aj6 \0 :\0\0\f\v#\0Ak"$\0  :\0@@ ("\0\x7F \0 \xF6@A\x7F!\0\f\v (\v ("F\r\0 A\xFFq"\0 (PF\r\0  Aj6  :\0\0\f\v  AjA ($\0AG@A\x7F!\0\f\v -\0!\0\v Aj$\0 \0!\f\v ( ("\0AjK@ \0 \xC5"\0A\0H\r  ( \0j6\f\v A\fj" \xC5"\0A\0H\r  \0 \xF4 \0I\r\v A\x7FG\r\v  (\0A r6\0A\x7F!\vA\xF0\xAD \x076\0 Aj$\0 A\x7FF\x1B!\f\v  Aj"6 A j! Aj!@@ \0($" \0((   A\fj Aj  Aj (\0(\f\v\0! (\f F\r\0 AF@ AA \0( zAF\r\f\v AK\r\0 Aj"A ( k" \0( z G\r\0 (\f! AF\r\f\v\vA\x7F!\v A j$\0 \ve\x7F@ \0-\0,E@ A\0 A\0J\x1B!@  F\r \0 (\0 \0(\0(4\0A\x7FF@  Aj! Aj!\f\v\0\v\0\v A  \0( z!\v \v1\0 \0 \0(\0(\0\0 \0 A\xB4\x84+"6$ \0  (\0(\0\0:\0,\v\xA9\x7F#\0A k"$\0A\x7F!@ A\x7FF@ \0-\x004\r \0 \0(0"A\x7FG:\x004\f\v \0-\x004!@@ \0-\x005AG\r\0 AqE\r\0A\x7F! \0(0 \0( \xF3A\x7FF\r\f\v AqE\r\0  \0(06A\x7F!@@ \0($" \0(( Aj Aj" A\fj Aj A j  (\0(\f\v\0Ak\0\v \0(0!  Aj6  :\0\v@ (" AjM\r  Ak"6 ,\0\0 \0( \x82A\x7FG\r\0\v\f\v \0A:\x004 \0 60 !\v A j$\0 \v	\0 \0A\xED\v	\0 \0A\0\xED\vH\0 \0 A\xB4\x84+"6$ \0  (\0(\0\x006, \0 \0($" (\0(\0\0:\x005 \0(,A	N@=\0\v\v\x9A\x7F#\0Ak"$\0 \0A\xA8%6  \0A\xE4#6\0 \0($"@A  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 Aj" \0(I\r\0\v \0( \v# Aj$\0 \0\v\x9F\x7F#\0A k"$\0@ A\x7FF@A\0!\f\v  :\0 \0-\0,AF@ A\x7F \0( !#\0Ak"\0$\0 \0 \xC0:\0 \0AjAA z \0Aj$\0AF\x1B!\f\v  Aj"6 A j! Aj!@@ \0($" \0((   A\fj Aj  Aj (\0(\f\v\0! (\f F\r\0 AF@ AA \0( zAF\r\f\v AK\r\0 Aj"A ( k" \0( z G\r\0 (\f! AF\r\f\v\vA\x7F!\v A j$\0 \ve\x7F@ \0-\0,E@ A\0 A\0J\x1B!@  F\r \0 -\0\0 \0(\0(4\0A\x7FF@  Aj! Aj!\f\v\0\v\0\v A  \0( z!\v \v1\0 \0 \0(\0(\0\0 \0 A\xAC\x84+"6$ \0  (\0(\0\0:\0,\v\xA9\x7F#\0A k"$\0A\x7F!@ A\x7FF@ \0-\x004\r \0 \0(0"A\x7FG:\x004\f\v \0-\x004!@@ \0-\x005AG\r\0 AqE\r\0A\x7F! \0(0 \0( \x82A\x7FF\r\f\v AqE\r\0  \0(0:\0A\x7F!@@ \0($" \0(( Aj Aj" A\fj Aj A j  (\0(\f\v\0Ak\0\v \0(0!  Aj6  :\0\v@ (" AjM\r  Ak"6 ,\0\0 \0( \x82A\x7FG\r\0\v\f\v \0A:\x004 \0 60 !\v A j$\0 \v	\0 \0A\xF0\v	\0 \0A\0\xF0\vH\0 \0 A\xAC\x84+"6$ \0  (\0(\0\x006, \0 \0($" (\0(\0\0:\x005 \0(,A	N@=\0\v\v\xA5\x7F#\0Ak"$\0 \0A\xF8!6\0 \0,\0+A\0H@ \0(( \0( #\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0("I\x7F@ ,\0\vA\0H@ (\b (\0# \0(!\v A\fj" I\r\0\v \0( \v# Aj$\0 \0\v\0A\x98\xF8&A\xB8\xFA&A\xE4\xFC\xEBA\x84\xFF\xEB\v\0B\0\v\b\0 \0x#\v6\x7F \0A\xE4!6\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v\x94\x7F@@  L\r\0 \0(" \0("O@ \0 (\0 \0(\0(4\0A\x7FF\r Aj! Aj!\f\v  k"  kAu"  J\x1B"At"@   \xFC
\0\0\v \0 \0( j6  j!  j!\f\v\v \v3\x7FA\x7F! \0 \0(\0($\0\0A\x7FG@ \0(\f"(\0! \0 Aj6\f\v \v\x96\x7F@@  L\r\0\x7F \0(\f" \0("I@  k"  kAu"  J\x1B"At"@   \xFC
\0\0\v \0 \0(\f j6\f  j\f\v \0 \0(\0((\0\0"A\x7FF\r  6\0A! Aj\v!  j!\f\v\v \v\f\0 \0\xEC \0#\v6\x7F \0A\xE4!6\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v#\x7F \0A\xE4!6\0 \0("@A\f  \0(\b$\v \0\v\x8C\x7F@@  L\r\0 \0(" \0("O@ \0 -\0\0 \0(\0(4\0A\x7FF\r Aj! Aj!\f\v  k"  k"  J\x1B"@   \xFC
\0\0\v \0 \0( j6  j!  j!\f\v\v \v3\x7FA\x7F! \0 \0(\0($\0\0A\x7FG@ \0(\f"-\0\0! \0 Aj6\f\v \v\x89\x7F@@  L\r\0@ \0(\f" \0("I@  k"  k"  J\x1B"@   \xFC
\0\0\v \0 \0(\f j6\f\f\v \0 \0(\0((\0\0"A\x7FF\r  :\0\0A!\v  j!  j!\f\v\v \v\f\0 \0\xF1 \0#\v\0 \0(<"\0\x7FA\xE8\xE0 \x006\0A\x7FA\0\v\v\xE3\x7F#\0A k"$\0  6   \0(0"A\0Gk6 \0(,!  6  6@@ \0 \0(< AjA A\fj"\x7FA\xE8\xE0 6\0A\x7FA\0\v\x7FA  (\f"A\0J\rA A \x1B\v \0(\0r6\0\f\v (" "O\r\0 \0 \0(,"6 \0   kj6\b \0(0@ \0 Aj6  jAk -\0\0:\0\0\v !\v A j$\0 \v\x86\x07\x7F#\0A k"$\0  \0("6 \0(!  6  6   k"6  j!\x7F@@@ \0(< Aj"A\br   F"\x1B"AA \x1B"\x07 A\fj"\x7FA\xE8\xE0 6\0A\x7FA\0\v@ !\f\v@  (\f"F\r A\0H@ !\f\v A\bA\0  ("\bK"	\x1Bj"  \bA\0 	\x1Bk"\b (\0j6\0 A\fA 	\x1Bj" (\0 \bk6\0  k! \0(< " \x07 	k"\x07 A\fj"\x7FA\xE8\xE0 6\0A\x7FA\0\vE\r\0\v\v A\x7FG\r\v \0 \0(,"6 \0 6 \0  \0(0j6 \f\v \0A\x006 \0B\x007 \0 \0(\0A r6\0A\0 \x07AF\r\0  (k\v A j$\0\vK\x7F \0(<#\0Ak"\0$\0  A\xFFq \0A\bj"\x7FA\xE8\xE0 6\0A\x7FA\0\v! \0)\b! \0Aj$\0B\x7F  \x1B\v\xFB\x7F@ Ak! \0A\fj"(" (\bI\x7F@  (\0(\0\0\0 Aj" (\bI\r\0\v ( \v#  6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjAt"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\b"I@@ B\x007 A\xE4!6\0 \0($"@@A\f%" (\b"6 A\x006\0  (\b6\b@ (@  6\0\f\v  6\v  6\b (\0"\r\0\v (\b!\v A\xE4 6\0  \0(,6\f Aj" I\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\0A\xFE\r\v\xD4\f\x7F@@  \0( \0(kAj"\bF\r\0  \bk"\v \0A\fj"(" (\f"kAj"j!@ (@@ At'"@ (!@    J\x1B"A\0L\r\0A\0! AG@ Aq A\xFE\xFF\xFF\xFF\x07q!\r@  At"
j"\x07  
j"(6 \x07 (\b6\b B\x007 \x07A\xE4 6\0 \x07 (\f6\f A\x006\f  
Ar"j"\x07  j"(6 \x07 (\b6\b B\x007 \x07A\xE4 6\0 \x07 (\f6\f A\x006\f Aj! 	Aj"	 \rG\r\0\vE\r\v  At"j"  j"(6  (\b6\b B\x007 A\xE4 6\0  (\f6\f A\x006\f\v (\b K\x7F@  (\0(\0\0\0 Aj" (\bI\r\0\v ( \v#  6\f\v\f\v (! (\f! (!\f\v  At'"6 \r\0\f\v   \vj6   Atj6\b   Atk6\0 \0( \bAtj" \0("O\r\0@ B\x007 A\xE4!6\0 \0($"@@A\f%" (\b"6 A\x006\0  (\b6\b@ (@  6\0\f\v  6\v  6\b (\0"\r\0\v \0(!\v A\xE4 6\0  \0(,6\f Aj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xA8\x7F \0(T"(\0! (" \0( \0("\x07k"  I\x1B"@  \x07 j  (\0 j"6\0  ( k"6\v    K\x1B"@   j  (\0 j"6\0  ( k6\v A\0:\0\0 \0 \0(,"6 \0 6 \v\xAD\x7F#\0Ak"$\0 \0A\xE4!6  \0A\xBC6\0 \0($"@A\f  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 Aj" \0(I\r\0\v \0( \v# \0A\x80\xDA(\x006\0A\x80\xDA \x006\0 Aj$\0\v\x9A\x7F#\0Ak"$\0 \0A\xE4!6  \0A\xBC6\0 \0($"@A\f  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 Aj" \0(I\r\0\v \0( \v# Aj$\0 \0\v\xEA\f\x7F@@  \0( \0(kAj"\bF\r\0  \bk"\f \0A\fj"(" (\f"kAj"j!@ (@@ At'"@ (!@    J\x1B"A\0L\r\0 Aq!\vA\0! AO@ A\xFC\xFF\xFF\xFF\x07q!\r@  At"j  j(\x006\0  Ar"\x07j  \x07j(\x006\0  A\br"\x07j  \x07j(\x006\0  A\fr"j  j(\x006\0 Aj! 	Aj"	 \rG\r\0\v \vE\r\v@  At"j  j(\x006\0 Aj! 
Aj"
 \vG\r\0\v\v #  6\f\v\f\v (! (\f! (!\f\v  At'"6 \r\0\f\v   \fj6   Atj6\b   Atk6\0 \0( \bAtj" \0("O\r\0 \0( !\0@  \x006\0 Aj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v;\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v Aj$\0 \0\v\b\0A\xE4\xE0A\v\b\0A\xE3\xE0A\v\b\0A\xE2\xE0A\v\b\0A\xE1\xE0A\v\b\0A\xE0\xE0A\v\0A\xA0\xFC\0\v\0 \0AjA\0 (A\xA8\xFC\0F\x1B\v\0  \0(6 A\xAC\xFA\x006\0\v\x7FA\b0" \0(6 A\xAC\xFA\x006\0 \v\0A\xFC\xF8\0\v\0 \0AjA\0 (A\x84\xF9\0F\x1B\v\0 \0 ((\0(\b6\0\v\0  \0(6 A\x88\xF7\x006\0\v\x7FA\b0" \0(6 A\x88\xF7\x006\0 \v\0A\xCC\xF5\0\v\0 \0AjA\0 (A\xD4\xF5\0F\x1B\v\0  \0(6 A\xCC\xF3\x006\0\v;\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v Aj$\0 \0\v\x7FA\b0" \0(6 A\xCC\xF3\x006\0 \v\0A\x90\xF2\0\v\0 \0AjA\0 (A\x98\xF2\0F\x1B\v\0 \0 ((\0(\0(\b6\0\v\0  \0(6 A\x9C\xEF\x006\0\v\x7FA\b0" \0(6 A\x9C\xEF\x006\0 \v\0A\xE0\xED\0\v\0 \0AjA\0 (A\xE8\xED\0F\x1B\v\f\0 \0 (6\0\v\v\0 A\xDC\xEB\x006\0\v\0A\b0"\0A\xDC\xEB\x006\0 \0\v\0A\xA0\xEA\0\v\0 \0AjA\0 (A\xA8\xEA\0F\x1B\v\0 \0 (( 6\0\v\v\0 A\xA4\xE7\x006\0\v\0A\b0"\0A\xA4\xE7\x006\0 \0\v7\x7F \0A\xB4\xE2\x006\0 \0("@A0  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v7\x7F \0A\xDC\xE1\x006\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v\0A\x80\xE5\0\v\0 \0AjA\0 (A\x88\xE5\0F\x1B\v\x07\0 +\b\v\v\0 A\x88\xE3\x006\0\v\0A\b0"\0A\x88\xE3\x006\0 \0\v7\x7F \0A\xB4\xE2\x006\0 \0("@A0  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xB4\xE2\x006\0 \0("@A0  \0(\b$\v \0\v7\x7F \0A\xDC\xE1\x006\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xDC\xE1\x006\0 \0("@A\f  \0(\b$\v \0\v\b\0A\xD4\xE0A\vW\x7F \0(" \0(I\x7F@  (\0(\0\0\0 A\fj" \0(I\r\0\v \0( \v# \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v\xE2\x7F@ Ak! \0A\fj"(" (\bI\x7F@  (\0(\0\0\0 A\fj" (\bI\r\0\v ( \v#  6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjA\fl"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\b"I@@ B\x007 A\xF8\xC5\x006\0 \0($"@@A\b%"A\x006\0  (6@ (E@  6\f\v (\b 6\0\v  6\b (\0"\r\0\v (\b!\v A\fj" I\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\x92\v\x7F@@  \0( \0(kAj"	F\r\0  	k"
 \0A\fj"(" (\f"kAj"j!\x07@ (@@ \x07A\fl'"@ (!@ \x07   \x07J\x1B"A\0L\r\0A\0! AG@ Aq A\xFE\xFF\xFF\xFF\x07q!\fA\0!@  A\fl"j"\bA\xF8\xC5\x006\0 \b  j"(6 \b (\b6\b B\x007  ArA\fl"j"\bA\xF8\xC5\x006\0 \b  j"(6 \b (\b6\b B\x007 Aj! Aj" \fG\r\0\vE\r\v  A\fl"j"A\xF8\xC5\x006\0   j"(6  (\b6\b B\x007\v (\b K\x7F@  (\0(\0\0\0 A\fj" (\bI\r\0\v ( \v#  6\f\v\f\v (! (\f! (!\f\v  \x07A\fl'"6 \r\0\f\v   
j6   \x07A\flj6\b   Atlj6\0 \0( 	A\flj" \0("O\r\0@ B\x007 A\xF8\xC5\x006\0 \0($"@@A\b%"A\x006\0  (6@ (E@  6\f\v (\b 6\0\v  6\b (\0"\r\0\v \0(!\v A\fj" I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xAF\x7F#\0Ak"$\0 \0A\xF8\xC5\x006  \0A\x98\xE0\x006\0 \0($"@A\b  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 A\fj" \0(I\r\0\v \0( \v# \0A\xF0\xD9(\x006\0A\xF0\xD9 \x006\0 Aj$\0\v\x9C\x7F#\0Ak"$\0 \0A\xF8\xC5\x006  \0A\x98\xE0\x006\0 \0($"@A\b  \0(($\v \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(" \0(I\x7F@  (\0(\0\0\0 A\fj" \0(I\r\0\v \0( \v# Aj$\0 \0\v\b\0A\xD3\xE0A\vm\x7F \0A\xE4\xDC\x006\0@ \0(\b"E\r\0@ "("\r\0 ("\r\0 (! # E\r@  "(F@ ("\r\v (! # \r\0\v\v\v \0#\vk\x7F \0A\xE4\xDC\x006\0@ \0(\b"E\r\0@ "("\r\0 ("\r\0 (! # E\r@  "(F@ ("\r\v (! # \r\0\v\v\v \0\v\x91\x7F \0(\b! (\b! \0 \0(\0(\0\0\0@ +\b +\bc@ ("@  6  6\v  6  6\f\v ("@  6  6\v  6  6 !\v \0 6\b A\x006\b\v\xD9\x7F  (\x006\0  +\b9\b ("@ (!@  (F@  6\f\v  6\v @  6\v B\x007 \0(\b! \0 \0(\0(\0\0\0@ +\b +\bc@ ("@  6  6\v  6  6\f\v ("@  6  6\v  6  6 !\v \0 6\b\v\v\x96\x07\x7F \0(\b"(! # \0\x7F \0!A\0! "\0@A!@ "Aj! "Aj! \0"("\0\r\0\v (!@ Aq@ A\x006 !\0\f\v (!\0 B\x007 B\x007  (\0(\0\0\0 +\b +\bc@ ("@  6  6\v  6  6\f\v ("@  6  6\v  6  6 !\v  AkAI\r Av! !@ \0("( B\x007 \0B\x007  (\0(\0\0\0@ \0+\b +\bc@ \0("@  6  6\v  \x006 \0 6\f\v ("@ \0 6  \x006\v \0 6  \x006 !\0\v  (\0(\0\0\0@ \0+\b +\bc@ \0("@  6  6\v  \x006 \0 6 \0!\f\v ("@ \0 6  \x006\v \0 6  \x006\v!\0 \x07Aj"\x07 G\r\0\v\v \v6\b\v\xB5\x7F|A 0" (\x006\0 +\b! A\x006 B\x007  9\b \0(\b"@ \0 \0(\0(\0\0\0 +\b +\bc@ ("@  6  6\v  6  6 \0 6\b \v ("@  6  6\v  6  6\v \0 6\b \v\x07\0 \0Aj\v7\x7F \0A\xF8\xD1\x006\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v7\x7F \0A\xE8\xD2\x006\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v7\x7F \0A\xE0\xD3\x006\0 \0("@A   \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v\0A\x84\xD9\0\v\0 \0AjA\0 (A\x8C\xD9\0F\x1B\v\b\0 + \x9A\v\v\0 A\xC4\xD7\x006\0\v\0A\b0"\0A\xC4\xD7\x006\0 \0\v\0A\xC8\xD6\0\v\0 \0AjA\0 (A\xD0\xD6\0F\x1B\v\b\0 +(\x9A\v\v\0 A\xB8\xD4\x006\0\v\0A\b0"\0A\xB8\xD4\x006\0 \0\v7\x7F \0A\xE0\xD3\x006\0 \0("@A   \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xE0\xD3\x006\0 \0("@A   \0(\b$\v \0\v7\x7F \0A\xE8\xD2\x006\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xE8\xD2\x006\0 \0("@A\f  \0(\b$\v \0\v7\x7F \0A\xF8\xD1\x006\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xF8\xD1\x006\0 \0("@A\f  \0(\b$\v \0\v\b\0A\xD2\xE0A\v\b\0A\xD1\xE0A\v\b\0A\xD0\xE0A\v7\x7F \0A\xF8\xCE\x006\0 \0("@A   \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v\xE4\x7F@ \0A\fj"(#  Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjAl"'"6 E\r  6\0  j!A\b\v j 6\0 (" (\bI@@  \0)07  \0)(7\b  \0) 7\0 Aj" (\bI\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\x8F\x7F@  \0(" \0("kAj"F\r\0  k" j kAj"Al!@@@ \0("\x07@ \x07 i"E\r \0 6 \0(! \0(!\f\v \0 '"6 E\r\v \0  j6 \0  Alj6 \0  Ahlj6\f\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v \0( Alj" \0(O\r\0@  \0)07  \0)(7\b  \0) 7\0 Aj" \0(I\r\0\v\v\vU\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(# \0A\xA0\xDA(\x006\0A\xA0\xDA \x006\0 Aj$\0\v7\x7F \0A\xF8\xCE\x006\0 \0("@A   \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xF8\xCE\x006\0 \0("@A   \0(\b$\v \0\v!\0 (\0"\0(\b(" \0(\f("\0 \0 J\x1B\v!\0 (\0"\0(\b(" \0(\f("\0 \0 H\x1B\v7\x7F \0A\xB0\xCC\x006\0 \0("@A  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v7\x7F \0A\xB0\xCC\x006\0 \0("@A  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xB0\xCC\x006\0 \0("@A  \0(\b$\v \0\v#\0 \0A\fj\x85 \0B\x007\b \0B\x80\x80\x80\x80p7 \0B\x007\v\xD2\x7F@ \0A j! \0A\fj"\0\x85 \0 Ak"6 \0A\x006\f@\x7F A\0H@A\0! \0A\x006\0 \0A\x006\bA\f\v \0 AjA\x98l"'"6 E\r \0 6\0  j!A\b\v \0j 6\0 \0(" \0(\bI@@  \xABA\x98j" \0(\bI\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\x88	\x7F@@  \0( \0(kAj"F\r\0  k"\b \0A\fj"(" (\f"kAj"j!@ (@A\0!@ A\x98l'"\x07@    J\x1B"	A\0J@ (!
@ \x07 A\x98l"j"  
j"+\x009\0  +\b9\b  )7  )7  ) 7   )(7(  )070  )878  (@6@  (H6H  (L6L B\x007H A\xE0\xCC\x006D  (P6P A\x006P  (X6X  (\\6\\ B\x007X A\xAC,6T  (\`6\` A\x006\`  )d7d  (p6p  (t6t B\x007p A\xAC,6l  (x6x A\x006x  (\x946\x94  )\x8C7\x8C  )\x847\x84  )|7| Aj" 	G\r\0\v\v \x85  \x076\f\v\f\v (! (\f! (!\f\v  A\x98l'"6 \r\0\f\v   \bj6   A\x98lj6\b   A\xE8~lj6\0 \0( A\x98lj" \0(O\r\0 \0A j!@  \xABA\x98j" \0(I\r\0\v\v\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\xBA\x7F#\0Ak"$\0 \0A\xAC-6\x8C \0A\xF8\xCA\x006\0 \0(\x90"@A\f  \0(\x94$\v \0A\xAC-6t \0(x"@A\f  \0(|$\v \0A\xB0\xCC\x006d \0(h"@A  \0(l$\v \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0A\fj\x85 \0A\xA0\xDE(\x006\0A\xA0\xDE \x006\0 Aj$\0\vq\x7F#\0Ak"$\0 \0A\xA8%6\xE0 \0A\xAC\xC9\x006\0 \0(\xE4"@A  \0(\xE8$\v \0A\x846\xB8 \0(\xC0"@  \0(\xBC6\f  A\fj(\v \0(\xC8# \0# Aj$\0\vo\x7F#\0Ak"$\0 \0A\xA8%6\xE0 \0A\xAC\xC9\x006\0 \0(\xE4"@A  \0(\xE8$\v \0A\x846\xB8 \0(\xC0"@  \0(\xBC6\f  A\fj(\v \0(\xC8# Aj$\0 \0\v\xA7\x7F#\0Ak"$\0 \0A\xAC-6\x8C \0A\xF8\xCA\x006\0 \0(\x90"@A\f  \0(\x94$\v \0A\xAC-6t \0(x"@A\f  \0(|$\v \0A\xB0\xCC\x006d \0(h"@A  \0(l$\v \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0A\fj\x85 Aj$\0 \0\v\xF2\x7F|#\0A@j"$\0 (! B\x80\x80\x80\x80\x80\x80\x80\xF8?7\b A\bj! Aj" (Ak"6 A\x006\f@@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  AjAt"\x07'"6 E\r  6\0  \x07j!A\b\v j 6\0 (" (\b"I@ +\0!\b@  \b9\0 A\bj" I\r\0\v\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v  6 A\x006 A\xD06 A<j  Aj">  (<6 A\xBC+6  +\b90 \0  \xB3 A\xD06 ("\0@  (6\b \0 ,\v ( # A@k$\0\v\b\0A\xC1\xE0A\v\0A\xF4\xC8\0\v\0 \0AjA\0 (A\xFC\xC8\0F\x1B\v)\0 (\0"(\b (\fF@ \0("\0  \0(\0(\f\0\v\v\0  \0(6 A\xA8\xC7\x006\0\v\x7FA\b0" \0(6 A\xA8\xC7\x006\0 \v\0 \0((\f (\0(Atj(\0\v\b\0A\xC0\xE0A\v!\x7FA\xA0\xD8(\0"\0@@ \0(\xFC? \0#"\0\r\0\v\v\v\b\0A\x9C\xC8A\v0\x7F#\0Ak"\0$\0A\x94\xC8(\0! \0A\x90\xC86\f \0A\fj \xB9 \0Aj$\0\v0\x7F#\0Ak"\0$\0A\x88\xC8(\0! \0A\x84\xC86\f \0A\fj \xBB \0Aj$\0\v0\x7F#\0Ak"\0$\0A\xFC\xC7(\0! \0A\xF8\xC76\f \0A\fj \xBC \0Aj$\0\v0\x7F#\0Ak"\0$\0A\xF0\xC7(\0! \0A\xEC\xC76\f \0A\fj \xBD \0Aj$\0\v0\x7F#\0Ak"\0$\0A\xE4\xC7(\0! \0A\xE0\xC76\f \0A\fj \xBE \0Aj$\0\v0\x7F#\0Ak"\0$\0A\xD8\xC7(\0! \0A\xD4\xC76\f \0A\fj \xBF \0Aj$\0\v\b\0A\xD0\xC7A\v\b\0A\xC4\xC7A\v\b\0A\xDC\xB3A\v
\0A\x84\xB3\xEF\v\b\0A\xC3\xB2A\v7\x7F \0A\xF8\xC5\x006\0 \0("@A\b  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v$\x7F \0A\xF8\xC5\x006\0 \0("@A\b  \0(\b$\v \0\v	\0 \0\x88#\v\xDF\x7F#\0Ak"$\0 \0(\x84"@ (\f! \0A\x006\x94 \0A\x80j Ak \0A\x94jN \0(\xFC"@  \0(\xF86\f  A\fj(\v \0 6\xFC A\bj  \0A\xF4j5 \0 (\b6\xF8 \0A\xA4j \0(\x84"(Ak\x84 \0(\xA0"@  \0(\x9C6\f  A\fj,\v \0 6\xA0 A\bj  \0A\x98j> \0 (\b6\x9C\v \0\xC9 Aj$\0\v6\x7F \0(\x94 (Atj(\0"@ \0(\x80 (AtjA\x006\0\v \0 \xCB\vY\x7F \0(\xB8 (Atj(\0! \0 \xCA@ E\r\0 \0(\xA4 (Atj"\0A\x006\f \0("E\r\0A\f  \0(\b$ \0B\x007\v\v\xA8\x7F (At" \0(\xB8j(\0"@ \0(\xDC j(\0! \0(\xA4 (Atj" (\fAk6\f (\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v  6\v @  6 \0  \x8B\v  6\b\v \0  \x8B\v\xB7\x7F \0 \x8C! \0(\xB8" (Atj  (At"j(\0"6\0 @ \0(\xDC j(\0! \0(\xA4 (Atj" (\fAj6\f (\0!A\f%" 6\b  6  6\0  6\0@ @  6\f\v  6\b\v \0(\xDC (Atj 6\0\v \v\b\0A\xC2\xB2A\vU\x7F#\0Ak"$\0 \0A\xD06\0 \0(\b"@  \0(6\f  A\fj,\v \0(# \0A\xF0\xD9(\x006\0A\xF0\xD9 \x006\0 Aj$\0\vU\x7F#\0Ak"$\0 \0A\x846\0 \0(\b"@  \0(6\f  A\fj(\v \0(# \0A\xE0\xD9(\x006\0A\xE0\xD9 \x006\0 Aj$\0\v\xE1| \0+" \0+\b"\xA1"A\xC8\xC7+\0"c D\0\0\0\0\0\0\0\0 \xA1dqE@  \0+  \xA1\xA2 \0+   \xA1\xA2\xA1 \xA3"9\0\x7F@  \0+" \0+\b"  c\x1BA\xC8\xC7+\0"\xA1dE\r\0     d\x1B \xA0cE\r\0  \0+ " \0+"  c\x1B \xA1dE\r\0A      d\x1B\xA0c\r\v B\x007\0A\0\v\v B\x007\0AA\0 \0+\b a\x1B\v\xE1| \0+ " \0+"\xA1"A\xC8\xC7+\0"c D\0\0\0\0\0\0\0\0 \xA1dqE@  \0+\b  \xA1\xA2 \0+  \xA1\xA2\xA1 \xA3"9\0\x7F@  \0+" \0+\b"  c\x1BA\xC8\xC7+\0"\xA1dE\r\0     d\x1B \xA0cE\r\0  \0+ " \0+"  c\x1B \xA1dE\r\0A      d\x1B\xA0c\r\v B\x007\0A\0\v\v B\x007\0AA\0 \0+ a\x1B\v\xE0\x07|\x7F@@@ +\0" \0+\b"A\xC8\xC7+\0"\xA0c   \xA1dq"
E\r\0 +\b"  \0+"\xA0cE\r\0   \xA1dE\r\0 \0+!\f\v@   \0+"\xA0cE\r\0   \xA1dE\r\0 +\b"  \0+ "\x07\xA0cE\r\0  \x07 \xA1d\r\v   \xA1"d D\0\0\0\0\0\0\0\0 \xA1dqE@  \xA1"\x07D\0\0\0\0\0\0\0\0a\r \0+  \0+"\b\xA1 \xA3"  +\b \b\xA1 \x07\xA3"\x07\xA0cE\r  \x07 \xA1d\r\f\v 
E\r\v     c\x1B \xA1dE\r\0      d\x1B\xA0cE\r\0 +\b" \0+ " \0+"  d\x1B \xA1dE\r\0      c\x1B\xA0c!	\v 	\v\0 \0      \0(\0(,#\0\v7\x7F#\0A0k"$\0 A\bj" \0 \0(\0(<\0 \0  \0(\0((\0 A0j$\0\v7\x7F#\0A0k"$\0 A\bj" \0 \0(\0(<\0 \0  \0(\0( \0 A0j$\0\v\0 \0    \0(\0(\f$\0\v	\0 \0\xD0#\v\xFF\b\x7F|@ \0(\xD0\x07"AqE\r\0 \0((p"E\r\0 \0(\xB4! \0(\x8C! \0(D!\x07 \0(!\b@ \b (At"j"+\0!	   \x07j"+\x009\0  	\x9A9\0  j"+\0!	   j"+\x009\0  	9\0 (\0"\r\0\v\v@ AqE\r\0 \0((|"E\r\0 \0(\x9C!@  (Atj("\0@@ \0+\b!	 \0 \0+9\b \0 	\x9A9 \0(\0"\0\r\0\v\v (\0"\r\0\v\v\v\xFF\b\x7F|@ \0(\xD0\x07"AqE\r\0 \0((p"E\r\0 \0(\xB4! \0(\x8C! \0(D!\x07 \0(!\b@ \b (At"j"+\0!	   \x07j"+\0\x9A9\0  	9\0  j"+\0!	   j"+\x009\0  	9\0 (\0"\r\0\v\v@ AqE\r\0 \0((|"E\r\0 \0(\x9C!@  (Atj("\0@@ \0+!	 \0 \0+\b9 \0 	\x9A9\b \0(\0"\0\r\0\v\v (\0"\r\0\v\v\v\xB6\x07\x7F|@ \0(\xD0\x07"
AqE\r\0 \0((p"\bE\r\0 \0(D!\v \0(!\f \b!@ \f (At"	j"\x07 \x07+\0 \xA2 \xA09\0 	 \vj"\x07 \x07+\0 \xA2 \xA09\0 (\0"\r\0\v E\r\0 \0(\xB4!	 \0(\x8C!\x07 \x99!\r \x99!@ \x07 \b(At"j"  +\0\xA29\0  	j" \r +\0\xA29\0 \b(\0"\b\r\0\v\v@ 
AqE\r\0 \0((|"E\r\0 \0(\x9C!\0@ \0 (Atj("@@  +\b \xA2 \xA09\b  + \xA2 \xA09 (\0"\r\0\v\v (\0"\r\0\v\v\v\xB0\x7F|@ \0(\xD0\x07"AqE\r\0 +\b +\xA0! \0("(p"@ \0(!@  (Atj"  +\0\xA19\0 (\0"\r\0\v\v AqE\r\0 (|"E\r\0 \0(\x9C!\0@ \0 (Atj("@@   +\b\xA19\b (\0"\r\0\v\v (\0"\r\0\v\v\v\xB0\x7F|@ \0(\xD0\x07"AqE\r\0 + + \xA0! \0("(p"@ \0(D!@  (Atj"  +\0\xA19\0 (\0"\r\0\v\v AqE\r\0 (|"E\r\0 \0(\x9C!\0@ \0 (Atj("@@   +\xA19 (\0"\r\0\v\v (\0"\r\0\v\v\vo\x7F|#\0A0k"$\0@ \0-\0\xD0\x07AqE\r\0 A\bj \0 \0(\0(<\0 +"D\0\0\0\0\0\0\0\0a +"D\0\0\0\0\0\0\0\0aq\r\0 \0 \x9A \x9A \0(\0(%\0\v A0j$\0\v\xCD\x7F@ \0(\xD0\x07"AqE\r\0 \0((p"E\r\0 \0(D! \0(!\x07@ \x07 (At"j"\b  \b+\0\xA09\0  j"  +\0\xA09\0 (\0"\r\0\v\v@ AqE\r\0 \0((|"E\r\0 \0(\x9C!\0@ \0 (Atj("@@   +\b\xA09\b   +\xA09 (\0"\r\0\v\v (\0"\r\0\v\v\v\xAA\x07\x7F|@ \0(\xD0\x07"\bAqE\r\0 \0((p"E\r\0 \0(D!	 \0(!
 !@ 
 (At"\x07j"  +\0\xA29\0 \x07 	j"  +\0\xA29\0 (\0"\r\0\v E\r\0 \0(\xB4!\x07 \0(\x8C! \x99!\v \x99!\f@  (At"j" \f +\0\xA29\0  \x07j" \v +\0\xA29\0 (\0"\r\0\v\v@ \bAqE\r\0 \0((|"E\r\0 \0(\x9C!\0@ \0 (Atj("@@   +\b\xA29\b   +\xA29 (\0"\r\0\v\v (\0"\r\0\v\v\v\xE6\b|	\x7F (!@ (\xD0\x07"AqE@\f\v (lE\r\0 (D" (p"
(At"\vj+\0! (" \vj+\0! (\xB4! (\x8C!\f A\x80qE@ ! !@  
(At"\vj+\0"\b \v j+\0D\0\0\0\0\0\0\xE0?\xA2"\x07\xA0"D\0\0\0\0\0\0\0\0\xA0   d\x1B! \b \x07\xA1"   c\x1B! \v j+\0"\b \v \fj+\0D\0\0\0\0\0\0\xE0?\xA2"\x07\xA0"D\0\0\0\0\0\0\0\0\xA0   d\x1B! \b \x07\xA1"   c\x1B! 
(\0"
\r\0\v\f\v (\xAC!\r ! !@ \r 
("\vA\flj*\xBBD\0\0\0\0\0\0\xE0?\xA2"	  \vAt"\vj+\0"\b \v j+\0D\0\0\0\0\0\0\xE0?\xA2"\x07\xA0\xA0"   d\x1B! \b \x07\xA1 	\xA1"   c\x1B! 	 \v j+\0"\b \v \fj+\0D\0\0\0\0\0\0\xE0?\xA2"\x07\xA0\xA0"   d\x1B! \b \x07\xA1 	\xA1"   c\x1B! 
(\0"
\r\0\v\v@ AqE\r\0 (|"\fE\r\0 (\x9C!\r A\x80\bqE@@ \r \f(Atj("
@@ 
+"\x07D\0\0\0\0\0\0\0\0\xA0   \x07c\x1B! 
+\b"D\0\0\0\0\0\0\0\0\xA0   d\x1B! \x07   \x07d\x1B!    c\x1B! 
(\0"
\r\0\v\v \f(\0"\f\r\0\f\v\0\v (\x9C!\v@ \r \f("Atj("
@ \v A\flj*\xBBD\0\0\0\0\0\0\xE0?\xA2!\b@ \b 
+"\x07\xA0"   d\x1B! \x07 \b\xA1"   c\x1B! \b 
+\b"\x07\xA0"   d\x1B! \x07 \b\xA1"   c\x1B! 
(\0"
\r\0\v\v \f(\0"\f\r\0\v\v \0 9  \0 9 \0 9 \0 9\b \0A\xEC:6\0  d@ \0 9\b \0 9\v  d@ \0 9 \0 9 \v\v\x84\x7F \0 6 \0(\xD0\x07"!#\0Ak"$\0 \0 A\x7Fs q6\xD0\x07@ AqE\r\0 \0( # \0A\x7F6, \0B\x007$ \0B\x007 \0("@  \0(6\f  A\fj(\v \0A\x006 \0(H# \0A\x7F6T \0B\x007L \0B\x007D \0(@"@  \0(<6\f  A\fj(\v \0A\x006@ \0(\x90# \0A\x7F6\x9C \0B\x007\x94 \0B\x007\x8C \0(\x88"@  \0(\x846\f  A\fj(\v \0A\x006\x88 \0(\xB8# \0A\x7F6\xC4 \0B\x007\xBC \0B\x007\xB4 \0(\xB0"@  \0(\xAC6\f  A\fj(\v \0A\x006\xB0 \0(\xE0# \0A\x7F6\xEC \0B\x007\xE4 \0B\x007\xDC \0(\xD8"@  \0(\xD46\f  A\fj(\v \0A\x006\xD8 A\x80qE\r\0 \0(\xB0# \0A\x7F6\xBC \0B\x007\xB4 \0B\x007\xAC \0(\xA8"@  \0(\xA46\f  A\fj(\v \0A\x006\xA8 \0(\xDC# \0A\x7F6\xE8 \0B\x007\xE0 \0B\x007\xD8 \0(\xD4"@  \0(\xD06\f  A\fj(\v \0A\x006\xD4\v A\x80\x80q@ \0(p# \0A\x7F6| \0B\x007t \0B\x007l \0(h"@  \0(d6\f  A\fj(\v \0A\x006h \0(\xE8# \0A\x7F6\xF4 \0B\x007\xEC \0B\x007\xE4 \0(\xE0"@  \0(\xDC6\f  A\fj(\v \0A\x006\xE0\v Aq@ \0(\xA0" \0(\xA4I\x7F@  (\0(\0\0\0 Aj" \0(\xA4I\r\0\v \0(\xA0 \v# \0A\x7F6\xAC \0B\x007\xA4 \0B\x007\x9C \0(\x98"@  \0(\x946\f  A\fj,\v \0A\x006\x98\v A\x80\bq@ \0(\xA0# \0A\x7F6\xAC \0B\x007\xA4 \0B\x007\x9C \0(\x98"@  \0(\x946\f  A\fj,\v \0A\x006\x98\v A\x80\x80q@ \0(\xD8# \0A\x7F6\xE4 \0B\x007\xDC \0B\x007\xD4 \0(\xD0"@  \0(\xCC6\f  A\fj(\v \0A\x006\xD0\v Aq@ \0(\xCC# \0A\x7F6\xD8 \0B\x007\xD0 \0B\x007\xC8 \0(\xC4"@  \0(\xC06\f  A\fj,\v \0A\x006\xC4\v A\bq@ \0(\xF0# \0A\x7F6\xFC \0B\x007\xF4 \0B\x007\xEC \0(\xE8"@  \0(\xE46\f  A\fj,\v \0A\x006\xE8\v A q@ \0(\x84" \0(\x88"I\x7F@ ,\0\vA\0H@ (\0# \0(\x88!\v A\fj" I\r\0\v \0(\x84 \v# \0A\x7F6\x90 \0B\x007\x88 \0B\x007\x80 \0(\xFC"@  \0(\xF86\f  A\fj(\v \0A\x006\xFC\v A\x80\x80q@ \0(\x98# \0A\x7F6\xA4 \0B\x007\x9C \0B\x007\x94 \0(\x90"@  \0(\x8C6\f  A\fj(\v \0A\x006\x90 \0(\xC0# \0A\x7F6\xCC \0B\x007\xC4 \0B\x007\xBC \0(\xB8"@  \0(\xB46\f  A\fj(\v \0A\x006\xB8 \0(\xE8# \0A\x7F6\xF4 \0B\x007\xEC \0B\x007\xE4 \0(\xE0"@  \0(\xDC6\f  A\fj(\v \0A\x006\xE0\v Aq@ \0(\xD0" \0(\xD4"I\x7F@ ,\0\vA\0H@ (\0# \0(\xD4!\v A\fj" I\r\0\v \0(\xD0 \v# \0A\x7F6\xDC \0B\x007\xD4 \0B\x007\xCC \0(\xC8"@  \0(\xC46\f  A\fj,\v \0A\x006\xC8\v A\x80q@ \0(\xB4# \0A\x7F6\xC0 \0B\x007\xB8 \0B\x007\xB0 \0(\xAC"@  \0(\xA86\f  A\fj(\v \0A\x006\xAC\v A\x80q@ \0(\xFC# \0A\x7F6\x88 \0B\x007\x80 \0B\x007\xF8 \0(\xF4"@  \0(\xF06\f  A\fj,\v \0A\x006\xF4\v A\x80 q@ \0(\x88" \0(\x8C"I\x7F@ ,\0\vA\0H@ (\0# \0(\x8C!\v A\fj" I\r\0\v \0(\x88 \v# \0A\x7F6\x94 \0B\x007\x8C \0B\x007\x84 \0(\x80"@  \0(\xFC6\f  A\fj(\v \0A\x006\x80\v A\x80\xC0\0q@ \0(\xBC\x07# \0A\x7F6\xC8\x07 \0B\x007\xC0\x07 \0B\x007\xB8\x07 \0(\xB4\x07"@  \0(\xB0\x076\f  A\fj,\v \0A\x006\xB4\x07\v Aj$\0 \0 \xC6\v\b\0A\xC1\xB2A\v\xCB\x7F@ \0A\fj"(#  Ak"6 A\x006\f@\x7F A\0H@A\0! A\x006\0 A\x006\bA\f\v  Aj"'"6 E\r  6\0  j!A\b\v j 6\0@ (" (\b"O\r\0  k"E\r\0  \0-\0  \xFC\v\0\v\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v\v\xF8\x07\x7F@  \0("" \0(""\x07kAj"F\r\0  k"\b j kAj!@@@ \0("@  i"E\r \0 6 \0(! \0(!\f\v \0 '"6 E\r\v \0  \bj6 \0  j6 \0  k6\f\f\vA\x98\xF8&A\xA8\xAA(\0&A\b/"\0B\x80\x80\x80\x80p7\0 \0A\xAC\x1BA\0\0\v \0(" j" \0("O\r\0 \x07 A\x7Fsj k j"E\r\0  \0-\0  \xFC\v\0\v\v\x8A\x7F \0A\xD06\0 \0(\b"@ \0("(\0! (! A\xF0\xD8(\x006\0A\xF0\xD8 6\0@ @  6\0\f\v  6$\v@ @  6\f\v  6(\v\v \0(# \0A\xD0\xD9(\x006\0A\xD0\xD9 \x006\0\v6\x7F \0A\xD056\0 \0("@A\f  \0(\b$\v \0A\x80\xD9(\x006\0A\x80\xD9 \x006\0\v6\x7F \0A\xEC76\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v6\x7F \0A\xA476\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v6\x7F \0A\xE066\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v6\x7F \0A\x9C66\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v6\x7F \0A\xD056\0 \0("@A\f  \0(\b$\v \0A\xF0\xD8(\x006\0A\xF0\xD8 \x006\0\v#\x7F \0A\xD056\0 \0("@A\f  \0(\b$\v \0\v\b\0A\xD0\xB1A\v\xCA\r\x7FA\xDE\xFF-\0\0E@A\x84\xD9(\0"!A\xFC\xF6B\x007\0#\0Ak"$\0A\xC4\xF6\x85"\0A\0:\x004 \0A\x7F60 \0A\xFC\xF66( \0 6  \0A\xD4\xDB6\0 A\fj" \0("6\0 A\xEC\x82G@  (Aj6\v \0  \0(\0(\b\0 J Aj$\0A\x8C\xF7A\x90\xD36\0A\x84\xF7A\xFC\xD26\0A\xA8\xF7A\x006\0A\x88\xF7A\x006\0A\x8C\xF7 \0\xBFA\x88\xD9(\0"A\x98\xF8A\xE0\xF7\xE8A\x8C\xD9(\0"A\xA8\xF9A\xF0\xF8\xE8 A\xB8\xFAA\x80\xFA\xE8A\x84\xF7(\0A\fk(\0A\xCC\xF7jA\x98\xF86\0A\xA8\xF9(\0A\fk"\0(\0A\xAC\xF9j" (\0A\x80\xC0\0r6\0 \0(\0A\xF0\xF9jA\x98\xF86\0A\xC8\xFBB\x007\0#\0Ak"$\0A\x90\xFB\xF9"\0A\0:\x004 \0A\x7F60 \0A\xC8\xFB6( \0 6  \0A\xA0\xDD6\0 A\fj" \0("6\0 A\xEC\x82G@  (Aj6\v \0  \0(\0(\b\0 J Aj$\0A\xD8\xFBA\xA0\xD46\0A\xD0\xFBA\x8C\xD46\0A\xF4\xFBA\x006\0A\xD4\xFBA\x006\0A\xD8\xFB \0\xBF A\xE4\xFCA\xAC\xFC\xE7 A\xF4\xFDA\xBC\xFD\xE7 A\x84\xFFA\xCC\xFE\xE7A\xD0\xFB(\0A\fk(\0A\x98\xFCjA\xE4\xFC6\0A\xF4\xFD(\0A\fk"\0(\0A\xF8\xFDj" (\0A\x80\xC0\0r6\0 \0(\0A\xBC\xFEjA\xE4\xFC6\0A\xDE\xFFA:\0\0\v#\0Ak"\0$\0@ \0A\fj \0A\bj\r\0A\xB4\x80 \0(\fAtAj'"6\0 E\r\0 \0(\b'"@A\xB4\x80(\0" \0(\fAtjA\x006\0  E\r\vA\xB4\x80A\x006\0\v \0Aj$\0A\xD0\xB1BA\xD8\xB1A\xCF\x006\0A\xDC\xB1A\x006\0\x95A\xDC\xB1A\xD4\xB1(\x006\0A\xD4\xB1A\xD8\xB16\0A\xE0\xB1A\xD2\x006\0A\xE4\xB1A\x006\0A\xA8
AA\xE03A\xEC3A\xD0\0A\xD1\0A\0A\0A\xE4\xB1A\xD4\xB1(\x006\0A\xD4\xB1A\xE0\xB16\0A\xC0\xB2BA\xC1\xB2BA\xC2\xB2B#\0Ak"$\0A\xC3\xB2B A\fj"\0A\x07_(\0!A\xD0\xB2A;\0A\xCC\xB2A\x80\x80\x80\xFC6\0A\xC8\xB2 6\0A\xD2\xB2A\0:\0\0A\xD4\xB2 \0A\x8F_(\x006\0A\xD8\xB2A\x07_A\xDC\xB2A6\0 \0A\x07_(\0!A\xE8\xB2A;\0A\xE4\xB2A\x80\x80\x80\xFC6\0A\xE0\xB2 6\0A\xEA\xB2A\0:\0\0 \0A5_(\0!A\xF4\xB2A;\0A\xF0\xB2A\x80\x80\x80\xFC6\0A\xEC\xB2 6\0A\xF6\xB2A\0:\0\0A\xF8\xB2 \0A\x8F_(\x006\0A\xFC\xB2A\x07_A\x80\xB3A\x006\0 Aj$\0A\x88\xB3A\xB8\xD36\0A\x84\xB3A\xA4\xD36\0A\xA4\xB3A\x006\0A\x88\xB3A\0\xF4A\xD0\xB3B\x80\x80\x80\x80p7\0A\xD8\xB3A\0:\0\0A\xDC\xB3BA\xC0\xC7A\xC0\xC7(\0"\0Aj6\0 \0E@\xC1\vA\xF1*!A\xE4\xB3A\xF1*6\0A!\0@ \0AtA\xE4\xB3j Av sA\xE5\x92\x9E\xE0l \0j"6\0 \0Aj"AtA\xE4\xB3j Av sA\xE5\x92\x9E\xE0l j"6\0 \0Aj"AtA\xE4\xB3j Av sA\xE5\x92\x9E\xE0l j"6\0 \0Aj"A\xF0G@ AtA\xE4\xB3j Av sA\xE5\x92\x9E\xE0l j"6\0 \0Aj!\0\f\v\vA\xA4\xC7A\x006\0A\xC4\xC7BA\xC8\xC7B\x8D\xDB\xD7\x85\xFA\xDE\xB1\xD8>7\0A\xD0\xC7BA\xD4\xC7A\xD8\xC76\0A\xD8\xC7B\x007\0A\xE0\xC7A\xE4\xC76\0A\xE4\xC7B\x007\0A\xEC\xC7A\xF0\xC76\0A\xF0\xC7B\x007\0A\xF8\xC7A\xFC\xC76\0A\xFC\xC7B\x007\0A\x84\xC8A\x88\xC86\0A\x88\xC8B\x007\0A\x90\xC8A\x94\xC86\0A\x94\xC8B\x007\0A\x9C\xC8BA\xC0\xE0BA\xC1\xE0BA\xC8\xE0B\xEF\xF3\xE8\xF7\xAF\xC8\x8B\xFB?7\0A\xD0\xE0BA\xD1\xE0BA\xD2\xE0BA\xD3\xE0BA\xD4\xE0BA\xD8\xE0B\xEF\xF3\xE8\xF7\xAF\xC8\x8B\xFB?7\0A\xE0\xE0BA\xE1\xE0BA\xE2\xE0BA\xE3\xE0BA\xE4\xE0BA\x9C\xE1A\xB0\x90\x076\0A\x84\xE1A*6\0A\xA0\xE1A\x80\x806\0A\xA4\xE1A\xEC\xAD(\x006\0\v\v\x81\xA06\0A\x84\b\v\xF3
\0\0\0d\0\0\0\xE8\0\0'\0\0\xA0\x86\0@B\0\x80\x96\x98\0\0\xE1\xF5\0\xCA\x9A;0123456789abcdefghijklmnopqrstuvwxyz\0hasOwnProperty\0infinity\0quality\0February\0January\0July\0Thursday\0Tuesday\0Wednesday\0Saturday\0Sunday\0Monday\0Friday\0May\0%m/%d/%y\0in box\0-+   0X0x\0-0X+0X 0X-0x+0x 0x\0Nov\0Thu\0unsupported locale for standard input\0linearLayout\0computeLayout\0August\0unsigned short\0unsigned int\0Object\0Oct\0float\0Sat\0Error QuadTreeNM: No father Node exists\0rotateComponents\0Error DIM2:: box is equal to old_pos\0nodePositions\0edges\0nodes\0%s:%d: %s\0Apr\0vector\0money_get error\0October\0November\0September\0December\0Error FMMMLayout::f_attr_scalar\0unsigned char\0Mar\0/emsdk/emscripten/system/lib/libcxxabi/src/private_typeinfo.cpp\0Sep\0overlap\0%I:%M:%S %p\0to\0aspectRatio\0Sun\0Jun\0componentSeparation\0Mon\0nan\0Jan\0from\0Jul\0bool\0std::bad_function_call\0April\0Fri\0depth\0bad_array_new_length\0nodeSegmentLength\0edgeLength\0minimumNodeLength\0March\0Aug\0unsigned long long\0unsigned long\0std::wstring\0basic_string\0std::string\0std::u16string\0std::u32string\0inf\x000123456789abcdef\0%.0Lf\0%Lf\0true\0Tue\0false\0nodeLengthPerMegabase\0prototype\0June\0double\0Error NewMultipoleMethod::delete_degenerated_node\0toStrand\0fromStrand\0%0*lld\0%*lld\0+%lld\0%+.4ld\0void\0locale not supported\0mutex lock failed\0seed\0Wed\0%Y-%m-%d\0Dec\0Feb\0%a %b %d %H:%M:%S %Y\0POSIX\0%H:%M:%S\0NAN\0PM\0AM\0%H:%M\0LC_ALL\0ASCII\0LANG\0INF\0C\0catching a class without an object?\0emscripten::memory_view<short>\0emscripten::memory_view<unsigned short>\0emscripten::memory_view<int>\0emscripten::memory_view<unsigned int>\0emscripten::memory_view<float>\0emscripten::memory_view<uint8_t>\0emscripten::memory_view<int8_t>\0emscripten::memory_view<uint16_t>\0emscripten::memory_view<int16_t>\0emscripten::memory_view<uint64_t>\0emscripten::memory_view<int64_t>\0emscripten::memory_view<uint32_t>\0emscripten::memory_view<int32_t>\0emscripten::memory_view<char>\0emscripten::memory_view<unsigned char>\0emscripten::memory_view<signed char>\0emscripten::memory_view<long>\0emscripten::memory_view<unsigned long>\0emscripten::memory_view<double>\x000123456789\0C.UTF-8\x0001234567\x0001\0.\0-\0 positions to a boundary box (vertices already in box)\0(null)\0Error NewMultipoleMethod::construct_complete_subtree()\0%\0Pure virtual function called!\0Error in FMMMLayout while restricting vertex \0Error DIM2:: choose_distinct_random_point_in_disque: old_point not \0
\0	\0A\x80\v\xB5/\r\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\b\0\0\0\xB4\x93\0\x008\r\0\0\0\0\0\0\0\0\0\`\r\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayIPNS_11NodeElementEEE\0\0\x000\x93\0\0h\r\0\0N4ogdf5ArrayIPNS_11NodeElementEiEE\0\x000\x93\0\0\x94\r\0\0N4ogdf13NodeArrayBaseE\0\0X\x93\0\0\xB8\r\0\0\xE0\r\0\0N4ogdf27InsufficientMemoryExceptionE\0\0\0\x000\x93\0\0\xE8\r\0\0N4ogdf9ExceptionE\0\0\0\0\0\0\0\x8C\r\0\0	\0\0\0
\0\0\0\v\0\0\0\v\0\0\0\v\0\0\0\0\0\0\x004\0\0\f\0\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\xB4\x93\0\0T\0\0\0\0\0\0\0\0\0|\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayIPNS_11EdgeElementEEE\0\0\x000\x93\0\0\x84\0\0N4ogdf5ArrayIPNS_11EdgeElementEiEE\0\x000\x93\0\0\xB0\0\0N4ogdf13EdgeArrayBaseE\0\0\0\0\0\0\xA8\0\0\0\0\0\0\0\0\v\0\0\0\v\0\0\0\v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xB4\x93\0\0 \0\0\0\0\0\0\0\0\0h\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_16ListIteratorBaseIPNS_11EdgeElementELb0ELb0EEEEE\0\0\x000\x93\0\0p\0\0N4ogdf5ArrayINS_16ListIteratorBaseIPNS_11EdgeElementELb0ELb0EEEiEE\0\0\0\0\0\0\xD0\0\0\0\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\xB4\x93\0\0\xF0\0\0\0\0\0\0\0\0\0$\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_4ListIPNS_11EdgeElementEEEEE\0\0\0\x000\x93\0\0,\0\0N4ogdf5ArrayINS_4ListIPNS_11EdgeElementEEEiEE\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\xB4\x93\0\0\x88\0\0\0\0\0\0\0\0\0\xAC\0\0\0\0\0\0N4ogdf4ListIPNS_11EdgeElementEEE\0\0\0\x000\x93\0\0\xB4\0\0N4ogdf8ListPureIPNS_11EdgeElementEEE\0\0\0\0\0\0\0\0\xAC\0\0\0\0\0 \0\0\0!\0\0\0\0\0\0\0\f\0\0"\0\0\0#\0\0\0$\0\0\0%\0\0\0&\0\0\0\xB4\x93\0\0,\0\0\0\0\0\0\0\0\0\x80\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEEE\x000\x93\0\0\x88\0\0N4ogdf5ArrayINSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEiEE\0\0\0\0\0\0\0\0\xF8\0\0'\0\0\0(\0\0\0)\0\0\0*\0\0\0+\0\0\0\xB4\x93\0\0\0\0\0\0\0\0\0\0\0X\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_15GenericPolylineINS_12GenericPointIdEEEEEE\x000\x93\0\0\`\0\0N4ogdf5ArrayINS_15GenericPolylineINS_12GenericPointIdEEEEiEE\0\0\0\0\0\0\0\0\xB4\0\0,\0\0\0-\0\0\0.\0\0\x000\x93\0\0\xBC\0\0N4ogdf8ListPureINS_12GenericPointIdEEEE\0\0\0\0\0\xF8\0\0,\0\0\0/\0\0\x000\0\0\0X\x93\0\0\0\x004\0\0N4ogdf15GenericPolylineINS_12GenericPointIdEEEE\0\xB4\x93\0\0L\0\0\0\0\0\0\0\0\0\xB4\0\0\0\0\0\0N4ogdf4ListINS_12GenericPointIdEEEE\0\0\0\0\0\x8C\0\x001\0\0\x002\0\0\x003\0\0\x004\0\0\x005\0\0\0\xB4\x93\0\0\xAC\0\0\0\0\0\0\0\0\0\x80\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEEE\0\0\0\0\0\0\x006\0\0\x007\0\0\x008\0\0\0\xB4\x93\0\0,\0\0\0\0\0\0\0\0\0\\\0\0\0\0\0\0N4ogdf4ListINS_11energybased4fmmm9RectangleEEE\0\x000\x93\0\0d\0\0N4ogdf8ListPureINS_11energybased4fmmm9RectangleEEE\0\0\0\0\0\0\\\0\x006\0\0\x009\0\0\0:\0\0\0\0\0\0\0\xC8\0\0;\0\0\0<\0\0\0=\0\0\0>\0\0\0?\0\0\0\xB4\x93\0\0\xE8\0\0\0\0\0\0\0\0\0\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_12GenericPointIdEEEE\0\0\0\x000\x93\0\0\0\0N4ogdf5ArrayINS_12GenericPointIdEEiEE\0\0\0\0\0\0\0\`\0\0@\0\0\0A\0\0\0B\0\0\0C\0\0\0D\0\0\0\xB4\x93\0\0\x80\0\0\0\0\0\0\0\0\0\x98\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayIiEE\0\0\0\x000\x93\0\0\xA0\0\0N4ogdf5ArrayIiiEE\0\0\0\0\0\0\0\xD0\0\0E\0\0\0F\0\0\0G\0\0\0H\0\0\0I\0\0\0\xB4\x93\0\0\xF0\0\0\0\0\0\0\0\0\0\b\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayIdEE\0\0\0\x000\x93\0\0\0\0N4ogdf5ArrayIdiEE\0\0\0\0\0\0\x008\0\0J\0\0\0K\0\0\0L\0\0\0\xB4\x93\0\0P\0\0\0\0\0\0\0\0\0t\0\0\0\0\0\0N4ogdf4ListIPNS_11NodeElementEEE\0\0\0\x000\x93\0\0|\0\0N4ogdf8ListPureIPNS_11NodeElementEEE\0\0\0\0\0\0\0\0t\0\0J\0\0\0M\0\0\0N\0\0\0<x\0\0\0
(<\0\0\0\b\0\0\x000\x93\0\0\xD8\0\0NSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE\0\x000\x93\0\0 \0\0NSt3__212basic_stringIDsNS_11char_traitsIDsEENS_9allocatorIDsEEEE\0\0\x000\x93\0\0l\0\0NSt3__212basic_stringIDiNS_11char_traitsIDiEENS_9allocatorIDiEEEE\0\0\x000\x93\0\0\xB8\0\0N10emscripten11memory_viewIcEE\0\x000\x93\0\0\xE0\0\0N10emscripten11memory_viewIaEE\0\x000\x93\0\0\b\0\0N10emscripten11memory_viewIhEE\0\x000\x93\0\x000\0\0N10emscripten11memory_viewIsEE\0\x000\x93\0\0X\0\0N10emscripten11memory_viewItEE\0\x000\x93\0\0\x80\0\0N10emscripten11memory_viewIiEE\0\x000\x93\0\0\xA8\0\0N10emscripten11memory_viewIjEE\0\x000\x93\0\0\xD0\0\0N10emscripten11memory_viewIlEE\0\x000\x93\0\0\xF8\0\0N10emscripten11memory_viewImEE\0\x000\x93\0\0 \0\0N10emscripten11memory_viewIxEE\0\x000\x93\0\0H\0\0N10emscripten11memory_viewIyEE\0\x000\x93\0\0p\0\0N10emscripten11memory_viewIfEE\0\x000\x93\0\0\x98\0\0N10emscripten11memory_viewIdEE\0\0\x80\x92\0\0\xC4\0\0\xC4\0\x000\x93\0\0\xCC\0\0N10emscripten3valE\0\0\xC4\0\0\xC4\0\0\xC4\0\0pppp\0\0\0\0\xFC\0\0\xC4\0\x000\x93\0\0\0\0NSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE\0\0\xD4\x92\0\0\xC4\0\0\xC4\0\0\xD4\x92\0\0\x93\0\0\xC4\0\0\x93\0\0\xC4\0\0\xC8\x92\0\0\xC4\0\0\xC4\0\0\x93\0\0\xC4\0\0\xEC\x92\0\0\xC4\0\0\xFC\0\0\x80\x92\0\0\xC4\0\0\0\0\0\0\xB0\0\0U\0\0\0V\0\0\0W\0\0\0X\0\0\0Y\0\0\0Z\0\0\0[\0\0\x000\x93\0\0\xB8\0\0N4ogdf5GraphE\0\0\0\0\0\0\0\xDC\0\0\\\0\0\0]\0\0\0^\0\0\x000\x93\0\0\xE4\0\0N4ogdf8ListPureIPNS_5Graph13HiddenEdgeSetEEE\0\0\0\0\0\0\0\0(\x1B\0\0_\0\0\0\`\0\0\0a\0\0\x000\x93\0\x000\x1B\0\0N4ogdf8ListPureIPNS_13NodeArrayBaseEEE\0\0\0\0\0\0l\x1B\0\0b\0\0\0c\0\0\0d\0\0\x000\x93\0\0t\x1B\0\0N4ogdf8ListPureIPNS_13EdgeArrayBaseEEE\0\0\0\0\0\0\xB0\x1B\0\0e\0\0\0f\0\0\0g\0\0\x000\x93\0\0\xB8\x1B\0\0N4ogdf8ListPureIPNS_17AdjEntryArrayBaseEEE\0\0\0\0\0\0\xF8\x1B\0\0h\0\0\0i\0\0\0j\0\0\x000\x93\0\0\0\0\0N4ogdf8ListPureIPNS_13GraphObserverEEE\0\0\0\0\0\0<\0\0\\\0\0\0k\0\0\0l\0\0\0\xB4\x93\0\0T\0\0\0\0\0\0\0\0\0\xDC\0\0\0\0\0\0N4ogdf4ListIPNS_5Graph13HiddenEdgeSetEEE\0\0\0\0\0\0\0\0\x9C\0\0m\0\0\0n\0\0\0o\0\0\0p\0\0\0q\0\0\0\xB4\x93\0\0\xBC\0\0\0\0\0\0\0\0\0\xD4\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayIbEE\0\0\0\x000\x93\0\0\xDC\0\0N4ogdf5ArrayIbiEE\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0s\0\0\0t\0\0\0u\0\0\0v\0\0\0w\0\0\0x\0\0\0y\0\0\0z\0\0\0{\0\0\0|\0\0\0}\0\0\0~\0\0\0\x7F\0\0\0\x80\0\0\0\x81\0\0\0\x82\0\0\x000\x93\0\0H\0\0N4ogdf15GraphAttributesE\0\0\0\0\0\0\0\0t\0\0\x83\0\0\0\x84\0\0\x000\x93\0\0|\0\0N4ogdf5DRectE\0\0\0\0\0\0\0\xA0\0\0\x85\0\0\0\x86\0\0\0\x87\0\0\0X\x93\0\0\xAC\0\0\xDC\0\0N4ogdf14GenericSegmentINS_12GenericPointIdEEEE\0\x000\x93\0\0\xE4\0\0N4ogdf11GenericLineINS_12GenericPointIdEEEE\0\0\0\0\0,\0\0\x88\0\0\0\x89\0\0\0\x8A\0\0\0\x8B\0\0\0\x8C\0\0\0\xB4\x93\0\0L\0\0\0\0\0\0\0\0\0\b\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayIdEE\0\0\0\0\0\0\0\0\x80\0\0\x8D\0\0\0\x8E\0\0\0\x8F\0\0\0\x90\0\0\0\x91\0\0\0\xB4\x93\0\0\xA0\0\0\0\0\0\0\0\0\0\xC0\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_5ShapeEEE\0\0\x000\x93\0\0\xC8\0\0N4ogdf5ArrayINS_5ShapeEiEE\0\0\0\0\0\0\0\0\0\x92\0\0\0\x93\0\0\0\x94\0\0\0\x95\0\0\0\x96\0\0\0\xB4\x93\0\0 \0\0\0\0\0\0\0\0\0@\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_6StrokeEEE\0\x000\x93\0\0H\0\0N4ogdf5ArrayINS_6StrokeEiEE\0\0\0\0\0\x80\0\0\x97\0\0\0\x98\0\0\0\x99\0\0\0\x9A\0\0\0\x9B\0\0\0\xB4\x93\0\0\xA0\0\0\0\0\0\0\0\0\0\xC0\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_4FillEEE\0\0\0\x000\x93\0\0\xC8\0\0N4ogdf5ArrayINS_4FillEiEE\0\0\0\0\0\0\0\0 \0\0\x9C\0\0\0\x9D\0\0\0\x9E\0\0\0\x9F\0\0\0\xA0\0\0\0\xB4\x93\0\0  \0\0\0\0\0\0\0\0\0H \0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_5Graph8NodeTypeEEE\0\x000\x93\0\0P \0\0N4ogdf5ArrayINS_5Graph8NodeTypeEiEE\0\0\0\0\0\x90 \0\0\xA1\0\0\0\xA2\0\0\0\xA3\0\0\0\xA4\0\0\0\xA5\0\0\0\xB4\x93\0\0\xB0 \0\0\0\0\0\0\0\0\0\xD4 \0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_9EdgeArrowEEE\0\0\x000\x93\0\0\xDC \0\0N4ogdf5ArrayINS_9EdgeArrowEiEE\0\0\0\0\0\0!\0\0\xA6\0\0\0\xA7\0\0\0\xA8\0\0\0\xA9\0\0\0\xAA\0\0\0\xB4\x93\0\x008!\0\0\0\0\0\0\0\0\0@\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_6StrokeEEE\0\0\0\0\0\0t!\0\0\xAB\0\0\0\xAC\0\0\0\xAD\0\0\0\xAE\0\0\0\xAF\0\0\0\xB4\x93\0\0\x94!\0\0\0\0\0\0\0\0\0\x98\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayIiEE\0\0\0\0\0\0\0\0\xC8!\0\0\xB0\0\0\0\xB1\0\0\0\xB2\0\0\0\xB3\0\0\0\xB4\0\0\0\xB4\x93\0\0\xE8!\0\0\0\0\0\0\0\0\0"\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_5Graph8EdgeTypeEEE\0\x000\x93\0\0"\0\0N4ogdf5ArrayINS_5Graph8EdgeTypeEiEE\0\0\0\0\0X"\0\0\xB5\0\0\0\xB6\0\0\0\xB7\0\0\0\xB8\0\0\0\xB9\0\0\0\xB4\x93\0\0x"\0\0\0\0\0\0\0\0\0\x90"\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayIjEE\0\0\0\x000\x93\0\0\x98"\0\0N4ogdf5ArrayIjiEE\0\0\0\0\0\0\0\xD0"\0\0\xBB\0\0\0\xBC\0\0\0\xBD\0\0\0\xBE\0\0\0\xBF\0\0\0\xC0\0\0\0\xC1\0\0\0X\x93\0\0\xDC"\0\0\xB0\0\0N4ogdf9GraphCopyE\0\0\0\0\0\0\0#\0\0\xC2\0\0\0\xC3\0\0\0\xC4\0\0\x000\x93\0\0\f#\0\0N4ogdf9SListPureIPNS_11EdgeElementEEE\0\0\x000\x93\0\0<#\0\0N4ogdf10BucketFuncIPNS_11EdgeElementEEE\0\0\0\0\0x#\0\0\xD5\0\0\0\xD6\0\0\0\xD7\0\0\0X\x93\0\0\x84#\0\x004#\0\0N4ogdf15BucketEdgeArrayE\0\0\0\0\0\0\0\0\xCC#\0\0\xD8\0\0\0\xD9\0\0\0\xDA\0\0\0\xDB\0\0\0\xDC\0\0\0\xDD\0\0\0\xDE\0\0\0\xDF\0\0\0\xE0\0\0\0X\x93\0\0\xD8#\0\x004$\0\0NSt3__210__function6__funcIZN4ogdf12makeLoopFreeERNS2_5GraphEE3$_0FvPNS2_11EdgeElementEEEE\0\x000\x93\0\0<$\0\0NSt3__210__function6__baseIFvPN4ogdf11EdgeElementEEEE\0\0\x000\x93\0\0|$\0\0ZN4ogdf12makeLoopFreeERNS_5GraphEE3$_0\0\0\0\0\0\x000%\0\0\xE2\0\0\0\xE3\0\0\0\xE4\0A\xC7\xC9\0\v\x89"@\0\0\0\0\0\0\0@\0\0\0\0\0\0\xF8?\0\0\0\0\0\0\xF0?\xDA\xC1QUU\xE5?\0\0\0\0\0\0\xE0?\xDA\xC1QUU\xD5?\xDA\xC1QUU\xD5?\0\0\0\0\0\0\xE0?\xDA\xC1QUU\xE5?\0\0\0\0\0\0\xF0?\0\0\0\0\0\0\xF8?\0\0\0\0\0\0\0@\0\0\0\0\0\0\0@X\x93\0\0<%\0\0P%\0\0N4ogdf10FMMMLayoutE\x000\x93\0\0X%\0\0N4ogdf12LayoutModuleE\0\0\0\0\0\0\0\x8C%\0\0\xE5\0\0\0\xE6\0\0\0\xE7\0\0\0\xE8\0\0\0\xE9\0\0\0\xB4\x93\0\0\xAC%\0\0\0\0\0\0\0\0\0\xE8%\0\0\0\f\0\0\x8C\r\0\0\0\0\0\0N4ogdf9NodeArrayINS_11energybased4fmmm14NodeAttributesEEE\0\0\x000\x93\0\0\xF0%\0\0N4ogdf5ArrayINS_11energybased4fmmm14NodeAttributesEiEE\0\0\0\0\0\0<&\0\0\xEA\0\0\0\xEB\0\0\0\xEC\0\0\x000\x93\0\0D&\0\0N4ogdf8ListPureIdEE\0\0\0\0\0l&\0\0\xEA\0\0\0\xED\0\0\0\xEE\0\0\0\xB4\x93\0\0\x84&\0\0\0\0\0\0\0\0\0<&\0\0\0\0\0\0N4ogdf4ListIdEE\0\0\0\0\0\xA8&\0\0\xEF\0\0\0\xF0\0\0\0\xF1\0\0\0X\x93\0\0\xB4&\0\0\xE4&\0\0N4ogdf11energybased4fmmm17EdgeMaxBucketFuncE\0\0\0\x000\x93\0\0\xEC&\0\0N4ogdf10BucketFuncINS_11energybased4fmmm4EdgeEEE\0\0\0\0\0\0\0\x004'\0\0\xEF\0\0\0\xF2\0\0\0\xF3\0\0\0X\x93\0\0@'\0\0\xE4&\0\0N4ogdf11energybased4fmmm17EdgeMinBucketFuncE\0\0\0\0\0\0\0\0\x84'\0\0\xF4\0\0\0\xF5\0\0\0\xF6\0\0\x000\x93\0\0\x8C'\0\0N4ogdf8ListPureINS_11energybased4fmmm4EdgeEEE\0\0\0\0\0\0\0\xD8'\0\0\xF7\0\0\0\xF8\0\0\0\xF9\0\0\0\xFA\0\0\0\xFB\0\0\0\xB4\x93\0\0\xF8'\0\0\0\0\0\0\0\0\x004(\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_11energybased4fmmm14EdgeAttributesEEE\0\0\x000\x93\0\0<(\0\0N4ogdf5ArrayINS_11energybased4fmmm14EdgeAttributesEiEE\0\0\0\0\0\0\x88(\0\0\xF4\0\0\0\xFC\0\0\0\xFD\0\0\0\xB4\x93\0\0\xA0(\0\0\0\0\0\0\0\0\0\x84'\0\0\0\0\0\0N4ogdf4ListINS_11energybased4fmmm4EdgeEEE\0\0\0\0\0\0\0\x1B\r\xE0-\x90\xA0\xE6?\x1B\r\xE0-\x90\xA0\xF6?\0\0\0\0\0\0\xF0?<\0(
\0\0\0\0\0)\0\0\0\0\0\0\0\x000\x93\0\0\f)\0\0N4ogdf8ListPureINS_16ListIteratorBaseINS_11energybased4fmmm9RectangleELb0ELb0EEEEE\0\0\0\0\0\0t)\0\0\0\0\0\0\0\x000\x93\0\0|)\0\0N4ogdf8ListPureINS_16ListIteratorBaseINS_11energybased4fmmm14PackingRowInfoELb0ELb0EEEEE\0\0\0\0\0\0\0\0\xEC)\0\0\x07\0\0\b\0\0	\0\x000\x93\0\0\xF4)\0\0N4ogdf8ListPureINS_11energybased4fmmm14PackingRowInfoEEE\0\0\0\0\0\0\0\0\\*\0\0
\0\0\v\0\0\f\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0X\x93\0\0h*\0\0\xF8*\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm11MAARPacking28presort_rectangles_by_heightERNS2_4ListINS4_9RectangleEEEEUlRKS7_E_FdSB_EEE\0\x000\x93\0\0\0+\0\0NSt3__210__function6__baseIFdRKN4ogdf11energybased4fmmm9RectangleEEEE\0\0\x000\x93\0\0P+\0\0ZN4ogdf11energybased4fmmm11MAARPacking28presort_rectangles_by_heightERNS_4ListINS1_9RectangleEEEEUlRKS4_E_\0\0\0\0\0\0\xE8+\0\0
\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0X\x93\0\0\xF4+\0\0\xF8*\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm11MAARPacking27presort_rectangles_by_widthERNS2_4ListINS4_9RectangleEEEEUlRKS7_E_FdSB_EEE\0\0\x000\x93\0\0\x8C,\0\0ZN4ogdf11energybased4fmmm11MAARPacking27presort_rectangles_by_widthERNS_4ListINS1_9RectangleEEEEUlRKS4_E_\0\0\0\0\0\0\0\f-\0\0\x07\0\0\x1B\0\0\0\0\xB4\x93\0\0$-\0\0\0\0\0\0\0\0\0\xEC)\0\0\0\0\0\0N4ogdf4ListINS_11energybased4fmmm14PackingRowInfoEEE\0\0\0\0\0\0\0\0p-\0\0\0\0\0\0\0\0\xB4\x93\0\0\x88-\0\0\0\0\0\0\0\0\0t)\0\0\0\0\0\0N4ogdf4ListINS_16ListIteratorBaseINS_11energybased4fmmm14PackingRowInfoELb0ELb0EEEEE\0\0\0\0\0\0\0\0\xF4-\0\0\0\0\0\0 \0\0\xB4\x93\0\0\f.\0\0\0\0\0\0\0\0\0)\0\0\0\0\0\0N4ogdf4ListINS_16ListIteratorBaseINS_11energybased4fmmm9RectangleELb0ELb0EEEEE\0\0\0\0\0\0\x88.\0\0!\0\0"\0\0#\0\0$\0\0%\0\0&\0\0'\0\0(\0\0)\0\0X\x93\0\0\x94.\0\x008/\0\0N4ogdf11PairingHeapINS_11pq_internal12PairTemplateINS_16ListIteratorBaseINS_11energybased4fmmm14PackingRowInfoELb0ELb0EEEdEENS1_7CompareIS8_NSt3__24lessIdEEEEEE\0\0\0\x000\x93\0\0@/\0\0N4ogdf8HeapBaseINS_11PairingHeapINS_11pq_internal12PairTemplateINS_16ListIteratorBaseINS_11energybased4fmmm14PackingRowInfoELb0ELb0EEEdEENS2_7CompareIS9_NSt3__24lessIdEEEEEENS_15PairingHeapNodeIS9_EES9_SE_EE\0\0\0\0\0,0\0\0+\0\0,\0\0-\0\0.\0\0/\0\0\xB4\x93\0\0L0\0\0\0\0\0\0\0\0\0\x840\0\0\0\f\0\0\xA8\0\0\0\0\0\0N4ogdf9EdgeArrayINS_9SListPureIPNS_11EdgeElementEEEEE\0\0\x000\x93\0\0\x8C0\0\0N4ogdf5ArrayINS_9SListPureIPNS_11EdgeElementEEEiEE\0\0\0\0\0\x004\0\0,\0\0\x000\0\x000\0\0\0\0\0\0\0\xE80\0\x002\0\x003\0\x004\0\x000\x93\0\0\xF00\0\0N4ogdf8ListPureIPNS_11energybased4fmmm14QuadTreeNodeNMEEE\0\0\0\0\0\0\0@1\0\x005\0\x006\0\x007\0\x000\x93\0\0H1\0\0N4ogdf8ListPureINS_11energybased4fmmm12ParticleInfoEEE\0\0\0\0\0\0\xAC1\0\x008\0\x009\0\0:\0\0;\0\0<\0\0=\0\0>\0\0?\0\0@\0\0X\x93\0\0\xB81\0\0,2\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm20ParticleInfoComparerC1EvEUlRKNS4_12ParticleInfoEE_FdS8_EEE\0\0\0\x000\x93\0\x0042\0\0NSt3__210__function6__baseIFdRKN4ogdf11energybased4fmmm12ParticleInfoEEEE\0\0\x000\x93\0\0\x882\0\0ZN4ogdf11energybased4fmmm20ParticleInfoComparerC1EvEUlRKNS1_12ParticleInfoEE_\0\0\0\0\0\0\0\xEC2\0\x002\0\0A\0\0B\0\0\xB4\x93\0\03\0\0\0\0\0\0\0\0\0\xE80\0\0\0\0\0\0N4ogdf4ListIPNS_11energybased4fmmm14QuadTreeNodeNMEEE\0\0\0\0\0\0\0P3\0\x005\0\0C\0\0D\0\0\xB4\x93\0\0h3\0\0\0\0\0\0\0\0\0@1\0\0\0\0\0\0N4ogdf4ListINS_11energybased4fmmm12ParticleInfoEEE\0\0\0\0\0\0\xC83\0\0E\0\0F\0\0G\0\0H\0\0I\0\0J\0\0K\0\0L\0\0M\0\0X\x93\0\0\xD43\0\0\xA84\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS4_14QuadTreeNodeNMERPNS2_4ListINS4_12ParticleInfoEEESC_SC_SC_NS2_16ListIteratorBaseIS9_Lb0ELb0EEEbbE3$_0FSE_RKS9_EEE\0\0\x000\x93\0\0\xB04\0\0NSt3__210__function6__baseIFN4ogdf16ListIteratorBaseINS2_11energybased4fmmm12ParticleInfoELb0ELb0EEERKS6_EEE\0\0\0\x000\x93\0\0(5\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS1_14QuadTreeNodeNMERPNS_4ListINS1_12ParticleInfoEEES9_S9_S9_NS_16ListIteratorBaseIS6_Lb0ELb0EEEbbE3$_0\0A\xD9\xEB\0\v\xED6\0\0E\0\0N\0\0O\0\0P\0\0Q\0\0R\0\0S\0\0T\0\0U\0\0X\x93\0\0\f6\0\0\xA84\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS4_14QuadTreeNodeNMERPNS2_4ListINS4_12ParticleInfoEEESC_SC_SC_NS2_16ListIteratorBaseIS9_Lb0ELb0EEEbbE3$_1FSE_RKS9_EEE\0\0\x000\x93\0\0\xE86\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS1_14QuadTreeNodeNMERPNS_4ListINS1_12ParticleInfoEEES9_S9_S9_NS_16ListIteratorBaseIS6_Lb0ELb0EEEbbE3$_1\0\0\0\0\0\0\0\0\xC07\0\0V\0\0W\0\0X\0\0Y\0\0Z\0\0[\0\0\\\0\0]\0\0^\0\0X\x93\0\0\xCC7\0\0\x9C8\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS4_14QuadTreeNodeNMERPNS2_4ListINS4_12ParticleInfoEEESC_SC_SC_NS2_16ListIteratorBaseIS9_Lb0ELb0EEEbbE3$_2FSE_vEEE\0\0\x000\x93\0\0\xA48\0\0NSt3__210__function6__baseIFN4ogdf16ListIteratorBaseINS2_11energybased4fmmm12ParticleInfoELb0ELb0EEEvEEE\0\0\0\x000\x93\0\09\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS1_14QuadTreeNodeNMERPNS_4ListINS1_12ParticleInfoEEES9_S9_S9_NS_16ListIteratorBaseIS6_Lb0ELb0EEEbbE3$_2\0\0\0\0\0\0\0\0\xF09\0\0V\0\0_\0\0\`\0\0a\0\0b\0\0c\0\0d\0\0e\0\0f\0\0X\x93\0\0\xFC9\0\0\x9C8\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS4_14QuadTreeNodeNMERPNS2_4ListINS4_12ParticleInfoEEESC_SC_SC_NS2_16ListIteratorBaseIS9_Lb0ELb0EEEbbE3$_3FSE_vEEE\0\0\x000\x93\0\0\xD4:\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod15delete_subListsEPNS1_14QuadTreeNodeNMERPNS_4ListINS1_12ParticleInfoEEES9_S9_S9_NS_16ListIteratorBaseIS6_Lb0ELb0EEEbbE3$_3\0\0\0\0\0\0\0\0\xAC;\0\0V\0\0g\0\0h\0\0i\0\0j\0\0k\0\0l\0\0m\0\0n\0\0X\x93\0\0\xB8;\0\0\x9C8\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod22move_subLists_verticalERPNS2_4ListINS4_12ParticleInfoEEESA_SA_SA_SA_SA_NS2_16ListIteratorBaseIS7_Lb0ELb0EEEbE3$_0FSC_vEEE\x000\x93\0\0\x84<\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod22move_subLists_verticalERPNS_4ListINS1_12ParticleInfoEEES7_S7_S7_S7_S7_NS_16ListIteratorBaseIS4_Lb0ELb0EEEbE3$_0\0\0\0\0\0\0P=\0\0V\0\0o\0\0p\0\0q\0\0r\0\0s\0\0t\0\0u\0\0v\0\0X\x93\0\0\\=\0\0\x9C8\0\0NSt3__210__function6__funcIZN4ogdf11energybased4fmmm18NewMultipoleMethod22move_subLists_verticalERPNS2_4ListINS4_12ParticleInfoEEESA_SA_SA_SA_SA_NS2_16ListIteratorBaseIS7_Lb0ELb0EEEbE3$_1FSC_vEEE\x000\x93\0\0(>\0\0ZN4ogdf11energybased4fmmm18NewMultipoleMethod22move_subLists_verticalERPNS_4ListINS1_12ParticleInfoEEES7_S7_S7_S7_S7_NS_16ListIteratorBaseIS4_Lb0ELb0EEEbE3$_1\0A\xD0\xFD\0\v\`O\xBBag\xAC\xDD?-DT\xFB!\xE9?\x9B\xF6\x81\xD2\vs\xEF?-DT\xFB!\xF9?\xE2e/"\x7F+z<\x07\\3&\xA6\x81<\xBD\xCB\xF0z\x88\x07p<\x07\\3&\xA6\x91<-DT\xFB!\xE9?-DT\xFB!\xE9\xBF\xD2!3\x7F|\xD9@\xD2!3\x7F|\xD9\xC0\0A\xBF\xFE\0\v\xE8\x80-DT\xFB!	@-DT\xFB!	\xC0\0\0\0\0\0\0\0\0\0\0\0\0\x83\xF9\xA2\0DNn\0\xFC)\0\xD1W'\0\xDD4\xF5\0b\xDB\xC0\0<\x99\x95\0A\x90C\0cQ\xFE\0\xBB\xDE\xAB\0\xB7a\xC5\0:n$\0\xD2MB\0I\xE0\0	\xEA.\0\x92\xD1\0\xEB\xFE\0)\xB1\0\xE8>\xA7\0\xF55\x82\0D\xBB.\0\x9C\xE9\x84\0\xB4&p\0A~_\0\xD6\x919\0S\x839\0\x9C\xF49\0\x8B_\x84\0(\xF9\xBD\0\xF8;\0\xDE\xFF\x97\0\x98\0/\xEF\0
Z\x8B\0mm\0\xCF~6\0	\xCB'\0FO\xB7\0\x9Ef?\0-\xEA_\0\xBA'u\0\xE5\xEB\xC7\0={\xF1\0\xF79\x07\0\x92R\x8A\0\xFBk\xEA\0\xB1_\0\b]\x8D\x000V\0{\xFCF\0\xF0\xABk\0 \xBC\xCF\x006\xF4\x9A\0\xE3\xA9\0^a\x91\0\b\x1B\xE6\0\x85\x99e\0\xA0_\0\x8D@h\0\x80\xD8\xFF\0'sM\01\0\xCAV\0\xC9\xA8s\0{\xE2\`\0k\x8C\xC0\0\xC4G\0\xCDg\xC3\0	\xE8\xDC\0Y\x83*\0\x8Bv\xC4\0\xA6\x96\0D\xAF\xDD\0W\xD1\0\xA5>\0\x07\xFF\x003~?\0\xC22\xE8\0\x98O\xDE\0\xBB}2\0&=\xC3\0k\xEF\0\x9F\xF8^\x005:\0\x7F\xF2\xCA\0\xF1\x87\0|\x90!\0j$|\0\xD5n\xFA\x000-w\0;C\0\xB5\xC6\0\xC3\x9D\0\xAD\xC4\xC2\0,MA\0\f\0]\0\x86}F\0\xE3q-\0\x9B\xC6\x9A\x003b\0\0\xB4\xD2|\0\xB4\xA7\x97\x007U\xD5\0\xD7>\xF6\0\xA3\0Mv\xFC\0d\x9D*\0p\xD7\xAB\0c|\xF8\0z\xB0W\0\xE7\0\xC0IV\0;\xD6\xD9\0\xA7\x848\0$#\xCB\0\xD6\x8Aw\0ZT#\0\0\xB9\0\xF1
\x1B\0\xCE\xDF\0\x9F1\xFF\0fj\0\x99Wa\0\xAC\xFBG\0~\x7F\xD8\0"e\xB7\x002\xE8\x89\0\xE6\xBF\`\0\xEF\xC4\xCD\0l6	\0]?\xD4\0\xDE\xD7\0X;\xDE\0\xDE\x9B\x92\0\xD2"(\0(\x86\xE8\0\xE2XM\0\xC6\xCA2\0\b\xE3\0\xE0}\xCB\0\xC0P\0\xF3\xA7\0\xE0[\0.4\0\x83b\0\x83H\0\xF5\x8E[\0\xAD\xB0\x7F\0\xE9\xF2\0HJC\0g\xD3\0\xAA\xDD\xD8\0\xAE_B\0ja\xCE\0
(\xA4\0\xD3\x99\xB4\0\xA6\xF2\0\\w\x7F\0\xA3\xC2\x83\0a<\x88\0\x8Asx\0\xAF\x8CZ\0o\xD7\xBD\0-\xA6c\0\xF4\xBF\xCB\0\x8D\x81\xEF\0&\xC1g\0U\xCAE\0\xCA\xD96\0(\xA8\xD2\0\xC2a\x8D\0\xC9w\0&\0F\x9B\0\xC4Y\xC4\0\xC8\xC5D\0M\xB2\x91\0\0\xF3\0\xD4C\xAD\0)I\xE5\0\xFD\xD5\0\0\xBE\xFC\0\x94\xCC\0p\xCE\xEE\0>\xF5\0\xEC\xF1\x80\0\xB3\xE7\xC3\0\xC7\xF8(\0\x93\x94\0\xC1q>\0.	\xB3\0\vE\xF3\0\x88\x9C\0\xAB {\0.\xB5\x9F\0G\x92\xC2\0{2/\0\fUm\0r\xA7\x90\0k\xE7\x001\xCB\x96\0yJ\0Ay\xE2\0\xF4\xDF\x89\0\xE8\x94\x97\0\xE2\xE6\x84\0\x991\x97\0\x88\xEDk\0__6\0\xBB\xFD\0H\x9A\xB4\0g\xA4l\0qrB\0\x8D]2\0\x9F\xB8\0\xBC\xE5	\0\x8D1%\0\xF7t9\x000\0\r\f\0K\bh\0,\xEEX\0G\xAA\x90\0t\xE7\0\xBD\xD6$\0\xF7}\xA6\0nHr\0\x9F\xEF\0\x8E\x94\xA6\0\xB4\x91\xF6\0\xD1SQ\0\xCF
\xF2\0 \x983\0\xF5K~\0\xB2ch\0\xDD>_\0@]\0\x85\x89\x7F\0UR)\x007d\xC0\0m\xD8\x002H2\0[Lu\0Nq\xD4\0ETn\0\v	\xC1\0*\xF5i\0f\xD5\0'\x07\x9D\0]P\0\xB4;\xDB\0\xEAv\xC5\0\x87\xF9\0Ik}\0'\xBA\0\x96i)\0\xC6\xCC\xAC\0\xADT\0\x90\xE2j\0\x88\xD9\x89\0,rP\0\xA4\xBE\0w\x07\x94\0\xF30p\0\0\xFC'\0\xEAq\xA8\0f\xC2I\0d\xE0=\0\x97\xDD\x83\0\xA3?\x97\0C\x94\xFD\0\r\x86\x8C\x001A\xDE\0\x929\x9D\0\xDDp\x8C\0\xB7\xE7\0\b\xDF;\07+\0\\\x80\xA0\0Z\x80\x93\0\x92\0\xE8\xD8\0l\x80\xAF\0\xDB\xFFK\x008\x90\0Yv\0b\xA5\0a\xCB\xBB\0\xC7\x89\xB9\0@\xBD\0\xD2\xF2\0Iu'\0\xEB\xB6\xF6\0\xDB"\xBB\0
\xAA\0\x89&/\0d\x83v\0	;3\0\x94\0Q:\xAA\0\xA3\xC2\0\xAF\xED\xAE\0\\&\0m\xC2M\0-z\x9C\0\xC0V\x97\0?\x83\0	\xF0\xF6\0+@\x8C\0m1\x99\x009\xB4\x07\0\f \0\xD8\xC3[\0\xF5\x92\xC4\0\xC6\xADK\0N\xCA\xA5\0\xA77\xCD\0\xE6\xA96\0\xAB\x92\x94\0\xDDBh\0c\xDE\0v\x8C\xEF\0h\x8BR\0\xFC\xDB7\0\xAE\xA1\xAB\0\xDF1\0\0\xAE\xA1\0\f\xFB\xDA\0dMf\0\xED\xB7\0)e0\0WV\xBF\0G\xFF:\0j\xF9\xB9\0u\xBE\xF3\0(\x93\xDF\0\xAB\x800\0f\x8C\xF6\0\xCB\0\xFA"\0\xD9\xE4\0=\xB3\xA4\0W\x1B\x8F\x006\xCD	\0NB\xE9\0\xBE\xA4\x003#\xB5\0\xF0\xAA\0Oe\xA8\0\xD2\xC1\xA5\0\v?\0[x\xCD\0#\xF9v\0{\x8B\0\x89r\0\xC6\xA6S\0on\xE2\0\xEF\xEB\0\0\x9BJX\0\xC4\xDA\xB7\0\xAAf\xBA\0v\xCF\xCF\0\xD1\0\xB1\xF1-\0\x8C\x99\xC1\0\xC3\xADw\0\x86H\xDA\0\xF7]\xA0\0\xC6\x80\xF4\0\xAC\xF0/\0\xDD\xEC\x9A\0?\\\xBC\0\xD0\xDEm\0\x90\xC7\0*\xDB\xB6\0\xA3%:\0\0\xAF\x9A\0\xADS\x93\0\xB6W\0)-\xB4\0K\x80~\0\xDA\x07\xA7\0v\xAA\0{Y\xA1\0*\0\xDC\xB7-\0\xFA\xE5\xFD\0\x89\xDB\xFE\0\x89\xBE\xFD\0\xE4vl\0\xA9\xFC\0>\x80p\0\x85n\0\xFD\x87\xFF\0(>\x07\0ag3\0*\x86\0M\xBD\xEA\0\xB3\xE7\xAF\0\x8Fmn\0\x95g9\x001\xBF[\0\x84\xD7H\x000\xDF\0\xC7-C\0%a5\0\xC9p\xCE\x000\xCB\xB8\0\xBFl\xFD\0\xA4\0\xA2\0l\xE4\0Z\xDD\xA0\0!oG\0b\xD2\0\xB9\\\x84\0paI\0kV\xE0\0\x99R\0PU7\0\xD5\xB7\x003\xF1\xC4\0n_\0]0\xE4\0\x85.\xA9\0\xB2\xC3\0\xA126\0\b\xB7\xA4\0\xEA\xB1\xD4\0\xF7!\0\x8Fi\xE4\0'\xFFw\0\f\x80\0\x8D@-\0O\xCD\xA0\0 \xA5\x99\0\xB3\xA2\xD3\0/]
\0\xB4\xF9B\0\xDA\xCB\0}\xBE\xD0\0\x9B\xDB\xC1\0\xAB\xBD\0\xCA\xA2\x81\0\bj\\\0.U\0'\0U\0\x7F\xF0\0\xE1\x07\x86\0\vd\0\x96A\x8D\0\x87\xBE\xDE\0\xDA\xFD*\0k%\xB6\0{\x894\0\xF3\xFE\0\xB9\xBF\x9E\0hjO\0J*\xA8\0O\xC4Z\0-\xF8\xBC\0\xD7Z\x98\0\xF4\xC7\x95\0\rM\x8D\0 :\xA6\0\xA4W_\0?\xB1\0\x808\x95\0\xCC \0q\xDD\x86\0\xC9\xDE\xB6\0\xBF\`\xF5\0Me\0\x07k\0\x8C\xB0\xAC\0\xB2\xC0\xD0\0QUH\0\xFB\0\x95r\xC3\0\xA3;\0\xC0@5\0\xDC{\0\xE0E\xCC\0N)\xFA\0\xD6\xCA\xC8\0\xE8\xF3A\0|d\xDE\0\x9Bd\xD8\0\xD9\xBE1\0\xA4\x97\xC3\0wX\xD4\0i\xE3\xC5\0\xF0\xDA\0\xBA:<\0FF\0Uu_\0\xD2\xBD\xF5\0n\x92\xC6\0\xAC.]\0D\xED\0>B\0a\xC4\x87\0)\xFD\xE9\0\xE7\xD6\xF3\0"|\xCA\0o\x915\0\b\xE0\xC5\0\xFF\xD7\x8D\0nj\xE2\0\xB0\xFD\xC6\0\x93\b\xC1\0|]t\0k\xAD\xB2\0\xCDn\x9D\0>r{\0\xC6j\0\xF7\xCF\xA9\0)s\xDF\0\xB5\xC9\xBA\0\xB7\0Q\0\xE2\xB2\r\0t\xBA$\0\xE5}\`\0t\xD8\x8A\0\r,\0\x81\f\0~f\x94\0)\0\x9Fzv\0\xFD\xFD\xBE\0VE\xEF\0\xD9~6\0\xEC\xD9\0\x8B\xBA\xB9\0\xC4\x97\xFC\x001\xA8'\0\xF1n\xC3\0\x94\xC56\0\xD8\xA8V\0\xB4\xA8\xB5\0\xCF\xCC\0\x89-\0oW4\0,V\x89\0\x99\xCE\xE3\0\xD6 \xB9\0k^\xAA\0>*\x9C\0_\xCC\0\xFD\vJ\0\xE1\xF4\xFB\0\x8E;m\0\xE2\x86,\0\xE9\xD4\x84\0\xFC\xB4\xA9\0\xEF\xEE\xD1\0.5\xC9\0/9a\x008!D\0\x1B\xD9\xC8\0\x81\xFC
\0\xFBJj\0/\xD8\0S\xB4\x84\0N\x99\x8C\0T"\xCC\0*U\xDC\0\xC0\xC6\xD6\0\v\x96\0p\xB8\0i\x95d\0&Z\`\0?R\xEE\0\x7F\0\xF4\xB5\0\xFC\xCB\xF5\x004\xBC-\x004\xBC\xEE\0\xE8]\xCC\0\xDD^\`\0g\x8E\x9B\0\x923\xEF\0\xC9\xB8\0aX\x9B\0\xE1W\xBC\0Q\x83\xC6\0\xD8>\0\xDDqH\0-\xDD\0\xAF\xA1\0!,F\0Y\xF3\xD7\0\xD9z\x98\0\x9ET\xC0\0O\x86\xFA\0V\xFC\0\xE5y\xAE\0\x89"6\x008\xAD"\0g\x93\xDC\0U\xE8\xAA\0\x82&8\0\xCA\xE7\x9B\0Q\r\xA4\0\x993\xB1\0\xA9\xD7\0iH\0e\xB2\xF0\0\x7F\x88\xA7\0\x88L\x97\0\xF9\xD16\0!\x92\xB3\0{\x82J\0\x98\xCF!\0@\x9F\xDC\0\xDCGU\0\xE1t:\0g\xEBB\0\xFE\x9D\xDF\0^\xD4_\0{g\xA4\0\xBA\xACz\0U\xF6\xA2\0+\x88#\0A\xBAU\0Yn\b\0!*\x86\x009G\x83\0\x89\xE3\xE6\0\xE5\x9E\xD4\0I\xFB@\0\xFFV\xE9\0\xCA\0\xC5Y\x8A\0\x94\xFA+\0\xD3\xC1\xC5\0\xC5\xCF\0\xDBZ\xAE\0G\xC5\x86\0\x85Cb\0!\x86;\0,y\x94\0a\x87\0*L{\0\x80,\0C\xBF\0\x88&\x90\0x<\x89\0\xA8\xC4\xE4\0\xE5\xDB{\0\xC4:\xC2\0&\xF4\xEA\0\xF7g\x8A\0\r\x92\xBF\0e\xA3+\0=\x93\xB1\0\xBD|\v\0\xA4Q\xDC\0'\xDDc\0i\xE1\xDD\0\x9A\x94\0\xA8)\x95\0h\xCE(\0	\xED\xB4\0D\x9F \0N\x98\xCA\0p\x82c\0~|#\0\xB92\0\xA7\xF5\x8E\0V\xE7\0!\xF1\b\0\xB5\x9D*\0o~M\0\xA5Q\0\xB5\xF9\xAB\0\x82\xDF\xD6\0\x96\xDDa\06\0\xC4:\x9F\0\x83\xA2\xA1\0r\xEDm\x009\x8Dz\0\x82\xB8\xA9\0k2\\\0F'[\0\x004\xED\0\xD2\0w\0\xFC\xF4U\0YM\0\xE0q\x80\0A\xB3\x94\v\xC73@\xFB!\xF9?\0\0\0\0-Dt>\0\0\0\x80\x98F\xF8<\0\0\0\`Q\xCCx;\0\0\0\x80\x83\x1B\xF09\0\0\0@ %z8\0\0\0\x80"\x82\xE36\0\0\0\0\xF3i5\0\0 eG\xF7?\0\xA2\xEF.\xFC\xE7=9\x83+eG\xE7\xBF\xBE:\xDC	\xC7\xDE?\xFB/pdG\xD7\xBFHLPlw\xD2?\xBC\x92\xEA(\xB3\xC7\xCE\xBF.\xF9\xE1%b\xCA?\xFE\x82+eG\xE7\xBF\xF7:\xDC	\xC7\xDE??|+eG\xD7\xBF\xE4[\xF0Plw\xD2?\xE5\x8Fv\xDD	\xC7\xCE\xBF6\xE7\xC4va\xCA?\x9B\xA7d\xBC?\xC7\xBFJ\x1B\xF0T\xD1\x84\xC4?<8,\xA7\xE4\x89\xC2\xBFf\xEEZ(/\xB3\xC0?\xF8\xAC\xB1k($\xF7?\0\xB0\xCD\xEE_	\xE1\xBF\xA1\xCC\xD2f\xF7\xE1\xF6?\0\xD0v\xBD\x94\x84\xE0\xBF\x8A\xD40=\xA1\xF6?\0\xF8\xE8\xAEC\xE0\xBF\x85l\xD02\xECa\xF6?\0@\v6\xC5\xFE\xDE\xBF\xF8\x98\x95\xFA#\xF6?\0\xE0\xB7\xD9\xFD\xDD\xBFl\xCF\xA4[\xE7\xF5?\0\x90\xC7\f\xAE\xFF\xDC\xBF\xB8O!Z\xAC\xF5?\0\xA0\xFD8\xDC\xBFn\xEDq\xF5?\0\xE0:2g\v\xDB\xBF5\xF8\vY	9\xF5?\0\xB0-Z/\xDA\xBF\xDD\xADa\xEDO\xF5?\0\`\xF8Z\x7F!\xD9\xBF\xD0{H\x8E\xB8\xCA\xF4?\0\x90q\xB0M0\xD8\xBF\xEEO3\xB49\x95\xF4?\0\xE0\xA9\xF9\x89A\xD7\xBFi\xD5\xAF\xDF\xCB\`\xF4?\0\x90\xB5+U\xD6\xBFS\xB9\xE4Nf-\xF4?\0\x9B\xA2#k\xD5\xBF\xA6\xD8\xFB\xF3?\0\xA0_e\x83\xD4\xBF6X\f\xB7\x95\xC9\xF3?\0\xA0\xF67\xE9\x9D\xD3\xBFJ\xFD\xB6J\x99\xF3?\0\`\x8DS\xA1\xBA\xD2\xBF\xB5\x99\xE0\f\x8Ei\xF3?\0@\xCA@\x83\xD9\xD1\xBF\xB2\xE7\x82\xE4:\xF3?\0\xE0@:\x85\xFA\xD0\xBF\xB1\xBD\x85\r\xF3?\x000\xE72\x9C\xD0\xBF\xD7q\xB2\xCA%\xE0\xF2?\0\`\xFA\xA2}\x85\xCE\xBF\x82\xCD\xCF\xB4\xF2?\0\x80=c\xC8\xD3\xCC\xBFP\xCB|,\xB0\x88\xF2?\0\xA0L&\xCB\xBF\xE5M\x94c"^\xF2?\0\xE0O/|\xC9\xBF\xB1\x86=V4\xF2?\0\0\x80?\xD6\xC7\xBF8\xAF>\xE3F\v\xF2?\0\xE0\xA73\xC6\xBF\xDD\xA3\xCD\xFD\xEE\xE2\xF1?\0\0W\xE9\xF5\x94\xC4\xBF09\vXJ\xBB\xF1?\0\xA0\xE0$\xE4\xF9\xC2\xBF\0"\x7F\x84S\x94\xF1?\0\xC0\xFDZYb\xC1\xBF<\xD7\xD5\xC0n\xF1?\0\x80\xBDu\x9A\x9C\xBF\xBF\xC2\xE4\xB7G_H\xF1?\0\xC0\xF9[W{\xBC\xBF\xD1\x85\0\xADX#\xF1?\0\x80\xF4\xC6\`\xB9\xBF'"S\xF0\xFE\xF0?\0\0\xB6G\xE2L\xB6\xBF\x8F:\xD0w \xDB\xF0?\0@\xB2x?\xB3\xBF\xD9\x80Y\xD6\xE6\xB7\xF0?\0\xC0B}8\xB0\xBF\x8D@{\xFE>\x95\xF0?\0\0\xB5\b\x92o\xAA\xBF\x83;\xC5\xCA%s\xF0?\0\0wO\x95z\xA4\xBF\\\x1B\r\xE4\x97Q\xF0?\0\0\f\xC5\xA8#\x9D\xBF\xA2\x8E \xC1\x910\xF0?\0\0x)&j\x91\xBF!~\xB3%\xF0?\0\0\xE8\xD8\xF8 w\xBFk\xA7\xCA\xF9~\xC0\xEF?\0\0P\xB1S\xFE\x86?\x84\xF1\xF6\xD3eD\xEF?\0\x80\xE1\xCC\xA1?\x7F\x84\x9F\x07\xCC\xEE?\0\x80\x8B\x8C\xFCM\xAC?\xE8Z\x97\x99:W\xEE?\0@W2\xAA\xB3?\xE6=\xBD\xF0\xD6\xE5\xED?\0\x80\x8B\xD0\xA0\xB9?\xB38\xFF\x81\xB6w\xED?\0@\xDA\xE9r\xBE?C\xE9Mr\xB5\f\xED?\0\`\x7FP\xD2\xDC\xC1?cu\xDC\xB2\xA4\xEC?\0\xA0\xDE\xABv\xC4?Q\xCB\xD6\xE8\x8E?\xEC?\0 \xE2wC\x07\xC7?L\fO+\xDD\xEB?\0@\xA9\x8B\xDE\x8E\xC9?\xCA\`\0l}\xEB?\0\xE0\xD2j\xB8\r\xCC?\x8F3.n6 \xEB?\0\xE0\xCE\xAF
\x84\xCE?9P)&p\xC5\xEA?\0\x80g\xB4
y\xD0?\xDD1'\xBCm\xEA?\0\xC0h\xAC\xD1?\x8B\xF1?\xBC\xD3\xEA?\0\xE0\xFE\xD4\xDB\xD2?\xAD\xFEgI\xD1\xC2\xE9?\0\x80\xC5NF\xD4?\x99|\xF4\xE4p\xE9?\0\xF0:	\xBE-\xD5?\xF2\xBC\x829\xFB \xE9?\0\xD0P \x90Q\xD6?\xF1Y\xF7\x87\xD3\xE8?\0\xF0\xEA\xCD\xD2q\xD7?m\xF6\xB9\xEB\xE5\x86\xE8?\0\x90}\x85\x9C\x8E\xD8?\x94\xB9X\xB6\x97<\xE8?\0\`\xE1U\xA8\xD9?"\xC6\xFF\xF4\xE7?\0\xD0\xD3n\xBE\xDA?\xCA"\xAD\xE7?\0\xE0\xA0\xAE\xF2\xD0\xDB?\x8C\xFF\x9E\xF9\xDCg\xE7?\0@\xBF=\xA4\xE0\xDC?\x8E
\xB9\0 \xE6?\xB6D\xAB\x89<\xA64W\0\`\xE6?\xA9\xF7b\xEA\x9B\xFFa<\xC5\xF2%\xC3\xFF\x9F\xE6?\xBA\x90<\xCB\xCF~\x82<Z\xB98\0\xE0\xE6?&\x93sV\x88\xFF\x88<\xE3\x94\x99\xE0\xFF\xE7?\xB1\x82_'@\xFD\x8A<Y\0\`\xE7?A\x83#\xB4u\xFDr\xBC\xD5[e\0\xA0\xE7?v+$|\xE6\bx<\xA6\xE9Y2\0\xE0\xE7?\xB7"\xF6&\xE4\bb\xBC\xD2\xB2\xB4\xED\xFF\xE8?/\xC9\xA5F\x84\xBC\xC3\xFC\xFA-\0\`\xE8?\x9A\xF2\xA2\xF4\xF7m<Pk\x8C\xF7\xFF\x9F\xE8?\xFD\x95I	S\x8E\xBCfg9\0\xE0\xE8?E{\xC7\xBE\xF3\x8A\xBCE\xBF\xE2\xFF\xE9?< @4\xFAw\xBC\xD1\x9F\\\xCC\xFF_\xE9?]i\xA0\x80\xFFv\xBCgG\xBA;\0\xA0\xE9?~\xEC\xC4\xC4\xF8p<\xA5-\xB9\xE7\xFF\xDF\xE9?F\x8CG\xD9\x7F\x8E<\xAF\xFD.\xD7\xFF\xEA?~\xAE\xCDMU\fj\xBC\x95\xFF\xDE\xFF_\xEA?k\xB2\xE9\x8C\xA9}\x86<+\x8D^\xCA\xFF\x9F\xEA?\xDEL\xB5\xC9\x84\x82\xBC\xEA\xAD\xDD\xFF\xDF\xEA?<.\`\xEA\xC8X<M=\r\xF1\xFF\xEB?\x9Cx'\xAD\xDD\xFA\x8E\xBCZ!\xCE\xFF_\xEB?7\xC6\xCBS<t\xE6P\xD9\xFF\x9F\xEB?\0\xCE\x94A\xD9\xF7s<\xAF\xA8\x9C\0\xE0\xEB?\xC0\x9B]!\xC4
u<\x99\xDFF[\0 \xEC?\xC9\xC1\xE9S\xA6\xEEk<\xAE\xF7\xB9@\0\`\xEC?\xD6pJ'\x9F\x07|\xBC\x8A\xFDUb\0\xA0\xEC?L\xE8v@\vz\xBC]	L\xD9\xFF\xDF\xEC?\xD7\xB5\x9A\xF93\xF9\x88<\xCF\xD6u\xF9\xFF\xED?\xBE\xE1_f\b,X\xBC\x93V\xA2\xFF_\xED?\xF3\x95\xD2\x9B({\xBC\f\x8B"\x9D\xFF\x9F\xED?6\xA24Q\x87<~\xBCe\0\xE0\xED?\f\xD8\xA4u\xBC\x91G\xF6\0 \xEE?\xE0b\xEF	/\x80\x89<\xD8\xA6\xD7W\0\`\xEE?\xFA\xF7\fXu\v~\xBC\f\xC0\xED'\0\xA0\xEE?\x98E	\x83\x84\x8C\xBC|\xCB\xF5l\0\xE0\xEE?\xF4v\x95'\x80\x8F\xBC\xCC}+x\0 \xEF?\x8FStr\xD9\x81\x8F\xBC
E\f&\0\`\xEF?\xDC\xFF''\0q@\xBC3\xD5\x8C\xE8\xFF\x9F\xEF?\xB0\xA8\xFD\xE1\xDC\x1BX\xBC\x89\x86\xD5\xFF\xDF\xEF?n\x8E\x91\xCB\xF9\x87<g#)\0 \xF0?\x81F2e\xF3\x7F\x9B<h\xD6\xE3\xE3\xFF_\xF0?{\x95\xAE\xDD\b\xFA\x86<W\xA7\x85
\0\xA0\xF0?\x91\xFB\xD3\x80\xDE\xE2W\xBC\xCC?_\0\xE0\xF0?\xF0\xC53\x82\x91\xBC\xF5\xBA\xAF\xF8\xFF\xF1?\xC2\xBA\x80f\xBB\xFA\x8B\xBC\xAD\x91M\xE5\xFF_\xF1?\xEF\xE77\x7F\x9D\xBC\xE16\xAC\0\xA0\xF1?\xFF\xF5
\0\x9C<HB\xC8\0\xE0\xF1?\xA0]\xDA\xE4\xFB\x82\x90\xBCn^\xFE\0 \xF2?C\xFB\x9CL\xD0\xFD\x88\xBC\x91\xD8\x9F&\0\`\xF2?\x82\xD1\x94y*\xFE\x8C<\xDA\xE6\xA6)\0\xA0\xF2?\xC5\x8B^qsp\xBC9>)\xE0\xFF\xDF\xF2?\xF9\xA6\xB2\xDA9|\x9B<\x82\xF0\xDC\xF7\xFF\xF3?TR\xDCn3\xF1}<\`\x8BZ\xF0\xFF_\xF3?\xEB1\xCDLV\x9E\xBC\xCC\xAE.\0\xA0\xF3?w\xA4\xD3K\xE7\xF0u<6\xB2;\0\xE0\xF3?3\x88\x9D\xCB}\x9C<\xFF\x87\xD1\0 \xF4?(=-\xCF\xAF\b~<\xB1|8\r\0\`\xF4?\xA6\x99e\x857\b\x82<\x89\x9FV\0\xA0\xF4?\xD2\xBCO\x90\\\xFA\x89\xBC\xF3C5\0\xE0\xF4?)S\xED%x\xBC\x7F\xCC\xFF\xF5?\xDCTw\x84\xD8\x83\x98<o\xB3\x87\xFD\xFF_\xF5?\x07(\xD01\xE7	\x87\xBC\xBA\xF7\xF2\xFF\x9F\xF5?{rh\x9F\xF7\x87<\x814\xFC\xEB\xFF\xDF\xF5?>\xE90.\x90\x80\x91\xBC\x008\xFA\xFEB.\xE6?0g\xC7\x93W\xF3.=\0\0\0\0\0\xE0\xBF[0QUUU\xD5?\x90E\xEB\xFF\xFF\xFF\xCF\xBF\xF1$\xB3\x99\xC9?\x9F\xC8\xE5uU\xC5\xBF\0\0\0\0\0\0\xE0\xBFwUUUUU\xD5?\xCB\xFD\xFF\xFF\xFF\xFF\xCF\xBF\f\xDD\x95\x99\x99\x99\xC9?\xA7EgUUU\xC5\xBF0\xDED\xA3$I\xC2?e=B\xA4\xFF\xFF\xBF\xBF\xCA\xD6*(\x84q\xBC?\xFFh\xB0C\xEB\x99\xB9\xBF\x85\xD0\xAF\xF7\x82\x81\xB7?\xCDE\xD1uR\xB5\xBF\x9F\xDE\xE0\xC3\xF04\xF7?\0\x90\xE6y\x7F\xCC\xD7\xBF\xE9,jx\xF7?\0\0\r\xC2\xEEo\xD7\xBF\xA0\xB5\xFA\b\`\xF2\xF6?\0\xE0Q\xE3\xD7\xBF}\x8C\xA6\xD1\xF6?\0x(8[\xB8\xD6\xBF\xD1\xB4\xC5\vI\xB1\xF6?\0x\x80\x90U]\xD6\xBF\xBA\f/3G\x91\xF6?\0\0v\xD0\xD6\xBF#B"\x9Fq\xF6?\0\x90\x90\x86\xCA\xA8\xD5\xBF\xD9\xA5\x99OR\xF6?\0PVCO\xD5\xBF\xC4$\x8F\xAAV3\xF6?\0@k\xC37\xF6\xD4\xBF\xDC\x9Dk\xB3\xF6?\0P\xA8\xFD\xA7\x9D\xD4\xBFL\\\xC6Rd\xF6\xF5?\0\xA8\x899\x92E\xD4\xBFO,\x91\xB5g\xD8\xF5?\0\xB8\xB09\xF4\xED\xD3\xBF\xDE\x90[\xCB\xBC\xBA\xF5?\0p\x8FD\xCE\x96\xD3\xBFx\xD9\xF2a\x9D\xF5?\0\xA0\xBD@\xD3\xBF\x87VFV\x80\xF5?\0\x80F\xEF\xE2\xE9\xD2\xBF\xD3k\xE7\xCE\x97c\xF5?\0\xE008\x1B\x94\xD2\xBF\x93\x7F\xA7\xE2%G\xF5?\0\x88\xDA\x8C\xC5>\xD2\xBF\x83EB\xFF*\xF5?\0\x90')\xE1\xE9\xD1\xBF\xDF\xBD\xB2\xDB"\xF5?\0\xF8H+m\x95\xD1\xBF\xD7\xDE4G\x8F\xF3\xF4?\0\xF8\xB9\x9AgA\xD1\xBF@(\xDE\xCFC\xD8\xF4?\0\x98\xEF\x94\xD0\xED\xD0\xBF\xC8\xA3x\xC0>\xBD\xF4?\0\xDB\xA5\x9A\xD0\xBF\x8A%\xE0\xC3\x7F\xA2\xF4?\0\xB8cR\xE6G\xD0\xBF4\x84\xD4$\x88\xF4?\0\xF0\x86E"\xEB\xCF\xBF\v-\x1B\xCEm\xF4?\0\xB0uJG\xCF\xBFT9\xD3\xD9S\xF4?\x000=D\xA4\xCE\xBFZ\x84\xB4D':\xF4?\0\xB0\xE9D\r\xCE\xBF\xFB\xF8A\xB5 \xF4?\0\xF0w)\xA2\`\xCD\xBF\xB1\xF4>\xDA\x82\x07\xF4?\0\x90\x95\xC0\xCC\xBF\x8F\xFEW]\x8F\xEE\xF3?\0\x89V) \xCC\xBF\xE9L\v\xA0\xD9\xD5\xF3?\0\x81\x8D\x81\xCB\xBF+\xC1\xC0\`\xBD\xF3?\0\xD0\xD3\xCC\xC9\xE2\xCA\xBF\xB8\xDAu+$\xA5\xF3?\0\x90.@E\xCA\xBF\xD0\x9F\xCD"\x8D\xF3?\0\xF0hw\xA8\xC9\xBFz\x84\xC5[u\xF3?\x000Him\f\xC9\xBF\xE26\xADI\xCE]\xF3?\0\xC0E\xA6 q\xC8\xBF@\xD4M\x98yF\xF3?\x000\xB4\x8F\xD6\xC7\xBF$\xCB\xFF\xCE\\/\xF3?\0pb<\xB8<\xC7\xBFI\r\xA1uw\xF3?\0\`7\x9B\x9A\xA3\xC6\xBF\x909>7\xC8\xF3?\0\xA0\xB7T1\v\xC6\xBFA\xF8\x95\xBBN\xEB\xF2?\x000$v}s\xC5\xBF\xD1\xA9
\xD5\xF2?\x000\xC2\x8F{\xDC\xC4\xBF*\xFD\xB7\xA8\xF9\xBE\xF2?\0\0\xD2Q,F\xC4\xBF\xAB\x1B\fz\xA9\xF2?\0\0\x83\xBC\x8A\xB0\xC3\xBF0\xB5\`r\x93\xF2?\0\0Ik\x99\x1B\xC3\xBF\xF5\xA1WW\xFA}\xF2?\0@\xA4\x90T\x87\xC2\xBF\xBF;\x9B\xB3h\xF2?\0\xA0y\xF8\xB9\xF3\xC1\xBF\xBD\xF5\x8F\x83\x9DS\xF2?\0\xA0,%\xC8\`\xC1\xBF;\b\xC9\xAA\xB7>\xF2?\0 \xF7W\x7F\xCE\xC0\xBF\xB6@\xA9+*\xF2?\0\xA0\xFEI\xDC<\xC0\xBF2A\xCC\x96y\xF2?\0\x80K\xBC\xBDW\xBF\xBF\x9B\xFC\xD2 \xF2?\0@@\x96\b7\xBE\xBF\vHMI\xF4\xEC\xF1?\0@\xF9>\x98\xBD\xBFie\x8FR\xF5\xD8\xF1?\0\xA0\xD8Ng\xF9\xBB\xBF|~W#\xC5\xF1?\0\`/ y\xDC\xBA\xBF\xE9&\xCBt|\xB1\xF1?\0\x80(\xE7\xC3\xC0\xB9\xBF\xB6,\f\x9E\xF1?\0\xC0r\xB3F\xA6\xB8\xBF\xBDp\xB6{\xB0\x8A\xF1?\0\0\xAC\xB3\x8D\xB7\xBF\xB6\xBC\xEF%\x8Aw\xF1?\0\x008E\xF1t\xB6\xBF\xDA1L5\x8Dd\xF1?\0\x80\x87m^\xB5\xBF\xDD_'\x90\xB9Q\xF1?\0\xE0\xA1\xDE\\H\xB4\xBFL\xD22\xA4?\xF1?\0\xA0jM\xD93\xB3\xBF\xDA\xF9r\x8B,\xF1?\0\`\xC5\xF8y \xB2\xBF1\xB5\xEC(0\xF1?\0 b\x98F\xB1\xBF\xAF4\x84\xDA\xFB\x07\xF1?\0\0\xD2jl\xFA\xAF\xBF\xB3kN\xEE\xF5\xF0?\0@wJ\x8D\xDA\xAD\xBF\xCE\x9F*]\xE4\xF0?\0\0\x85\xE4\xEC\xBC\xAB\xBF!\xA5,cD\xD2\xF0?\0\xC0@\x89\xA1\xA9\xBF\x98\xE2|\xA7\xC0\xF0?\0\xC03X\x88\xA7\xBF\xD16\xC6\x83/\xAF\xF0?\0\x80\xD6g^q\xA5\xBF9\xA0\x98\xDB\x9D\xF0?\0\x80eI\x8A\\\xA3\xBF\xDF\xE7R\xAF\xAB\x8C\xF0?\0@d\xE3I\xA1\xBF\xFB(N/\x9F{\xF0?\0\x80\xEB\x82\xC0r\x9E\xBF\x8F5\x8C\xB5j\xF0?\0\x80RR\xF1U\x9A\xBF,\xF9\xEC\xA5\xEEY\xF0?\0\x80\x81\xCFb=\x96\xBF\x90,\xD1\xCDII\xF0?\0\0\xAA\x8C\xFB(\x92\xBF\xA9\xAD\xF0\xC6\xC68\xF0?\0\0\xF9 {1\x8C\xBF\xA92ye(\xF0?\0\0\xAA]5\x84\xBFHs\xEA'$\xF0?\0\0\xEC\xC2x\xBF\x95\xB1\b\xF0?\0\0$y	\`\xBF\xFA&\xF7\xE0\xEF?\0\0\x90\x84\xF3\xEFo?t\xEAa\xC2\xA1\xEF?\0\0=5A\xDC\x87?.\x99\x81\xB0c\xEF?\0\x80\xC2\xC4\xA3\xCE\x93?\xCD\xAD\xEE<\xF6%\xEF?\0\0\x89\xC1\x9F\x9B?\xE7\x91\xC8\xE9\xEE?\0\0\xCE\xD8\xB0\xA1?\xAB\xB1\xCBx\x80\xAE\xEE?\0\xC0\xD0[\x8A\xA5?\x9B\f\x9D\xA2t\xEE?\0\x80\xD8@\x83\\\xA9?\xB5\x99
\x83\x91:\xEE?\0\x80W\xEFj'\xAD?V\x9A\`	\xE0\xEE?\0\xC0\x98\xE5\x98u\xB0?\x98\xBBw\xE5\xCA\xED?\0 \r\xE3\xF5S\xB2?\x91|\v\xF2\x92\xED?\0\x008\x8B\xDD.\xB4?\xCE\\\xFBf\xAC\\\xED?\0\xC0W\x87Y\xB6?\x9D\xDE^\xAA,'\xED?\0\0j5v\xDA\xB7?\xCD,k>n\xF2\xEC?\0\`NC\xAB\xB9?y\xA7\xA2m\xBE\xEC?\0\`\r\xBB\xC7x\xBB?m\b7m&\x8B\xEC?\0 \xE72C\xBD?X]\xBD\x94X\xEC?\0\`\xDEq1
\xBF?\x8C\x9F\xBB3\xB5&\xEC?\0@\x91+g\xC0??\xE7\xEC\xEE\x83\xF5\xEB?\0\xB0\x92\x82\x85G\xC1?\xC1\x96\xDBu\xFD\xC4\xEB?\x000\xCA\xCDn&\xC2?(J\x86\f\x95\xEB?\0P\xC5\xA6\xD7\xC3?,>\xEF\xC5\xE2e\xEB?\03<\xC3\xDF\xC3?\x8B\x88\xC9gH7\xEB?\0\x80zk6\xBA\xC4?J0!K	\xEB?\0\xF0\xD1(9\x93\xC5?~\xEF\xF2\x85\xE8\xDB\xEA?\0\xF0$\xCDj\xC6?\xA2=\`1\xAF\xEA?\0\x90f\xEC\xF8@\xC7?\xA7X\xD3?\xE6\x82\xEA?\0\xF0\xF5\xC0\xC8?\x8Bs	\xEF@W\xEA?\0\x80\xF6T)\xE9\xC8?'K\xAB\x90*,\xEA?\0@\xF86\xBB\xC9?\xD1\xF2\x93\xA0\xEA?\0\0,\xED\x8B\xCA?\x1B<\xDB$\x9F\xD7\xE9?\0\xD0\\Q[\xCB?\x90\xB1\xC7%\xAE\xE9?\0\xC0\xBC\xCCg)\xCC?/\xCE\x97\xF2.\x85\xE9?\0\`H\xD55\xF6\xCC?uK\xA4\xEE\xBA\\\xE9?\0\xC0F4\xBD\xC1\xCD?8H\xE7\x9D\xC64\xE9?\0\xE0\xCF\xB8\x8C\xCE?\xE6Rg/O\r\xE9?\0\x90\xC0	U\xCF?\x9D\xD7\xFF\x8ER\xE6\xE8?\0\xB8l\xD0?|\0\xCC\x9F\xCE\xBF\xE8?\0\xD0\x93\xB8q\xD0?\xC3\xBE\xDA\xC0\x99\xE8?\0p\x86\x9Ek\xD4\xD0?\xFB#\xAA't\xE8?\0\xD0K3\x876\xD1?\b\x9A\xB3\xAC\0O\xE8?\0H#g\r\x98\xD1?U>e\xE8I*\xE8?\0\x80\xCC\xE0\xFF\xF8\xD1?\`\xF4\x95\xE8?\0hc\xD7_Y\xD2?)\xA3\xE0c%\xE2\xE7?\0\xA8	0\xB9\xD2?\xAD\xB5\xDCw\xB3\xBE\xE7?\0\`Cr\xD3?\xC2%\x97g\xAA\x9B\xE7?\0\xECm&w\xD3?W\xF2\x07y\xE7?\x000\xAF\xFBO\xD5\xD3?\f\xD6\xDB\xCAV\xE7?\0\xE0/\xE3\xEE2\xD4?k\xB6O\0\xE6?<[B\x91l~<\x95\xB4M\x000\xE6?A]\0H\xEA\xBF\x8D<x\xD4\x94\r\0P\xE6?\xB7\xA5\xD6\x86\xA7\x7F\x8E<\xADoN\x07\0p\xE6?L%Tk\xEA\xFCa<\xAE\xDF\xFE\xFF\x8F\xE6?\xFDYL'~|\xBC\xBC\xC5c\x07\0\xB0\xE6?\xDA\xDCHh\xC1\x8A\xBC\xF6\xC1\\\0\xD0\xE6?\x93I\x9D?\x83<>\xF6\xEB\xFF\xEF\xE6?S-\xE2\x80~\xBC\x80\x97\x86\0\xE7?Ry	qf\xFF{<\xE9g\xFC\xFF/\xE7?$\x87\xBD&\xE2\0\x8C<j\x81\xDF\xFFO\xE7?\xD2\xF1n\x91n\xBC\x90\x9Cg\0p\xE7?t\x9CT\xCDq\xFCg\xBC5\xC8~\xFA\xFF\x8F\xE7?\x83\xF5\x9E\xC1\xBE\x81<\xE6\xC2 \xFE\xFF\xAF\xE7?ed\xCC)~p\xBC\0\xC9?\xED\xFF\xCF\xE7?\x8B{\br\x80\x80\xBCv&\xE9\xFF\xEF\xE7?\xAE\xF9\x9Dm(\xC0\x8D<\xE8\xA3\x9C\0\xE8?3L\xE5Q\xD2\x7F\x89<\x8F,\x93\x000\xE8?\x81\xF30\xB6\xE9\xFE\x8A\xBC\x9Cs3\0P\xE8?\xBC5ek\xBF\xBF\x89<\xC6\x89B \0p\xE8?u{\xF3e\xBF\x8B\xBCy\xF5\xEB\xFF\x8F\xE8?W\xCB=\xA2n\0\x89\xBC\xDF\xBC"\0\xB0\xE8?
K\xE08\xDF\0}\xBC\x8A\x1B\f\xE5\xFF\xCF\xE8?\x9F\xFFFq\0\x88\xBCC\x8E\x91\xFC\xFF\xEF\xE8?8pz\xD0{\x81\x83<\xC7_\xFA\0\xE9?\xB4\xDFv\x91>\x89<\xB9{F\x000\xE9?v\x98KN\x80\x7F<o\x07\xEE\xE6\xFFO\xE9?.b\xFF\xD9\xF0~\x8F\xBC\xD1<\xDE\xFFo\xE9?\xBA8&\x96\xAA\x82p\xBC\r\x8AE\xF4\xFF\x8F\xE9?\xEF\xA8d\x91\x1B\x80\x87\xBC>.\x98\xDD\xFF\xAF\xE9?7\x93Z\x8A\xE0@\x87\xBCf\xFBI\xED\xFF\xCF\xE9?\0\xE0\x9B\xC1\b\xCE?<Q\x9C\xF1 \0\xF0\xE9?
[\x88'\xAA?\x8A\xBC\xB0E\0\xEA?V\xDAX\x99H\xFFt<\xFA\xF6\xBB\x07\x000\xEA?m+\x8A\xAB\xBE\x8C<y\x97\0P\xEA?0yx\xDD\xCA\xFE\x88<H.\xF5\0p\xEA?\xDB\xAB\xD8=vA\x8F\xBCR3Y\0\x90\xEA?v\xC2\x84\xBF\x8E\xBCK>O*\0\xB0\xEA?_?\xFF<\xFDi\xBC\xD1\xAE\xD7\xFF\xCF\xEA?\xB4p\x90\xE7>\x82\xBCxQ\xEE\xFF\xEF\xEA?\xA3\xDE\xE0>j<[\re\xDB\xFF\xEB?\xB9
8\xC8Z<W\xCA\xAA\xFE\xFF/\xEB?<#ty\xBC\xDC\xBA\x95\xD9\xFFO\xEB?\x9F*\x86h\xFFy\xBC\x9Ce\x9E$\0p\xEB?>O\x86\xD0E\xFF\x8A<@\x87\xF9\xFF\x8F\xEB?\xF9\xC3\xC2\x96w\xFE|<O\xCB\xD2\xFF\xAF\xEB?\xC4+\xF2\xEE'\xFFc\xBCE\\A\xD2\xFF\xCF\xEB?!\xEA;\xEE\xB7\xFFl\xBC\xDF	c\xF8\xFF\xEF\xEB?\\\v.\x97A\x81\xBCSv\xB5\xE1\xFF\xEC?j\xB7\x94d\xC1\x8B<\xE3W\xFA\xF1\xFF/\xEC?\xED\xC60\x8D\xEF\xFEd\xBC$\xE4\xBF\xDC\xFFO\xEC?uG\xEC\xBCh?\x84\xBC\xF7\xB9T\xED\xFFo\xEC?\xEC\xE0S\xF0\xA3~\x84<\xD5\x8F\x99\xEB\xFF\x8F\xEC?\xF1\x92\xF9\x8D\x83s<\x9A!%!\0\xB0\xEC?d\x8E\xFDh\xBC\x9CF\x94\xDD\xFF\xCF\xEC?r\xEA\xC7\xBE~\x8E<v\xC4\xFD\xEA\xFF\xEF\xEC?\xFE\x88\x9F\xAD9\xBE\x8E<+\xF8\x9A\0\xED?qZ\xB9\xA8\x91}u<\xF7\r\x000\xED?\xDA\xC7pi\x90\xC1\x89<\xC4y\xEA\xFFO\xED?\f\xFEX\xC57X\xBC\xE5\x87\xDC.\0p\xED?D\xC1M\xD6\x80\x7F\xBC\xAA\x82\xDC!\0\x90\xED?\\\\\xFD\x94\x8F|t\xBC\x83k\xD8\xFF\xAF\xED?~a!\xC5\x7F\x8C<9Gl)\0\xD0\xED?S\xB1\xFF\xB2\x9E\x88<\xF5\x90D\xE5\xFF\xEF\xED?\x89\xCCR\xC6\xD2\0n<\x94\xF6\xAB\xCD\xFF\xEE?\xD2i- @\x83\x7F\xBC\xDD\xC8R\xDB\xFF/\xEE?d\b\x1B\xCA\xC1\0{<\xEFB\xF2\xFFO\xEE?Q\xAB\x94\xB0\xA8\xFFr<^\x8A\xE8\xFFo\xEE?Y\xBE\xEF\xB1s\xF6W\xBC\r\xFF\x9E\0\x90\xEE?\xC8\v^\x8D\x80\x84\xBCD\xA5\xDF\xFF\xAF\xEE?\xB5 C\xD5\0x<\xA1\x7F\0\xD0\xEE?\x92\\V\`\xF8P\xBC\xC4\xBC\xBA\x07\0\xF0\xEE?\xE65]D@\x85\xBC\x8Dz\xF5\xFF\xEF?\x91\xEF91\xFBO\xBC\xC7\x8A\xE5\x000\xEF?Us\xF2\xAC\x81\x8A<\x944\x82\xF5\xFFO\xEF?C\xC7\xD7\xD4A?\x8A<kL\xA9\xFC\xFFo\xEF?ux\x98\xF4b\xBCA\xC4\xF9\xE1\xFF\x8F\xEF?K\xE7w\xF4\xD1}w<~\xE3\xE0\xD2\xFF\xAF\xEF?1\xA3|\x9Ao\xBC\x9E\xE4w\0\xD0\xEF?\xB1\xAC\xCEK\xEE\x81q<1\xC3\xE0\xF7\xFF\xEF\xEF?Z\x87p7n\xBCn\`e\xF4\xFF\xF0?\xDA
I\xAD~\x8A\xBCXz\x86\xF3\xFF/\xF0?\xE0\xB2\xFC\xC3i\x7F\x97\xBC\r\xFC\xFD\xFFO\xF0?[\x94\xCB4\xFE\xBF\x97<\x82M\xCD\0p\xF0?\xCBV\xE4\xC0\x83\0\x82<\xE8\xCB\xF2\xF9\xFF\x8F\xF0?u7\xBE\xDF\xFFm\xBCe\xDA\f\0\xB0\xF0?\xEB&\xE6\xAE\x7F?\x91\xBC8\xD3\xA4\0\xD0\xF0?\xF7\x9FHy\xFA}\x80<\xFD\xFD\xDA\xFA\xFF\xEF\xF0?\xC0k\xD6pw\xBC\x96\xFD\xBA\v\0\xF1?b\vm\x84\xD4\x80\x8E<]\xF4\xE5\xFA\xFF/\xF1?\xEF6\xFDd\xFA\xBF\x9D<\xD9\x9A\xD5\r\0P\xF1?\xAEPpw\0\x9A<\x9AU!\0p\xF1?\xEE\xDE\xE3\xE2\xF9\xFD\x8D<&T'\xFC\xFF\x8F\xF1?sr;\xDC0\0\x91<Y<=\0\xB0\xF1?\x88\x80y\x7F\x99<\xB7\x9E)\xF8\xFF\xCF\xF1?g\x8C\x9F\xAB2\xF9e\xBC\0\xD4\x8A\xF4\xFF\xEF\xF1?\xEB[\xA7\x9D\xBF\x7F\x93<\xA4\x86\x8B\f\0\xF2?"[\xFD\x91k\x80\x9F<C\x85\x000\xF2?3\xBF\x9F\xEB\xC2\xFF\x93<\x84\xF6\xBC\xFF\xFFO\xF2?r..~\xE7v<\xD9!)\xF5\xFFo\xF2?a\f\x7Fv\xBB\xFC\x7F<<:\x93\0\x90\xF2?+A<\xCAr\xBCcU\0\xB0\xF2?\xF23\x82\x80\x92\xBC;R\xFE\xEB\xFF\xCF\xF2?\xF2\xDCO8~\xFF\x88\xBC\x96\xAD\xB8\v\0\xF0\xF2?\xC5A0PQ\xFF\x85\xBC\xAF\xE2z\xFB\xFF\xF3?\x9D(^\x88q\0\x81\xBC\x7F_\xAC\xFE\xFF/\xF3?\xB7\xB7?]\xFF\x91\xBCVg\xA6\f\0P\xF3?\xBD\x82\x8B"\x82\x7F\x95<!\xF7\xFB\0p\xF3?\xCC\xD5\r\xC4\xBA\0\x80<\xB9/Y\xF9\xFF\x8F\xF3?Q\xA7\xB2-\x9D?\x94\xBCB\xD2\xDD\0\xB0\xF3?\xE18vpk\x7F\x85<W\xC9\xB2\xF5\xFF\xCF\xF3?1\xBF:z<\xB4\xB0\xEA\xFF\xEF\xF3?\xB0R\xB1fm\x7F\x98<\xF4\xAF2\0\xF4?$\x85_7\xF8g<)\x8BG\x000\xF4?CQ\xDCr\xE6\x83<c\xB4\x95\xE7\xFFO\xF4?Z\x89\xB2\xB8i\xFF\x89<\xE0u\xE8\xFFo\xF4?T\xF2\xC2\x9B\xB1\xC0\x95\xBC\xE7\xC1o\xEF\xFF\x8F\xF4?r*:\xF2	@\x9B<\xA7\xBE\xE5\xFF\xAF\xF4?E}\r\xBF\xB7\xFF\x94\xBC\xDE'\0\xD0\xF4?=j\xDCqd\xC0\x99\xBC\xE2>\xF0\0\xF0\xF4?S\x85\v\x89\x7F\x97<\xD1K\xDC\0\xF5?6\xA4fqe\`<z'\x000\xF5?	2#\xCE\xCE\xBF\x96\xBCLp\xDB\xEC\xFFO\xF5?\xD7\xA1r\x89\xBC\xA9T_\xEF\xFFo\xF5?d\xC9\xE6\xBF\x9B<\xE6\0\x90\xF5?\x90\xEF\xAF\x81\xC5~\x88<\x92>\xC9\0\xB0\xF5?\xC0\f\xBF
\bA\x9F\xBC\xBCI\0\xD0\xF5?)G%\xFB*\x81\x98\xBC\x89z\xB8\xE7\xFF\xEF\xF5?i\xED\x80\xB7~\x94\xBC\xFF\0d\0 \0\0\xFF\xFF\0\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF
\xFF \0\xFF\xFF\xFF\xFF\xFF\0\0\xFF\xFF\xFF\xFF\xFFc\0\0\bc\0\xE8\0\0\0\xFF\xFF\xFF\xFF\xFF\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\x89\xC8\v\0A\x96\xC8\vD\xFF\xFF\xFF\xFF\xFF\xFF\0 \0\0\x80\0\0\b\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07\xFF\b\xFF	\xFF\xFF\xFF\xFF\xFF\xBC\xBC\0\xFF\xFF\0\0\xFF\xFF\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\xEA\xC8\v\0A\x8A\xC9\v\xFF\xFF\0
\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\0\0\0\0\0\xFF\xFF\xFF\0A\xBA\xC9\vH\xFF\0\0\0\0\0\0\xFF\xFF\0\0\0\0\0\0\xFF\xFF\xFF\xFF\xFF\0\0\0\0\xFF\xFF\xFF\0\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF(\0
\xFF\xFF\xFF\xFF\xFF\0
\xFF\xFF\xFF\xFF\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\xE6\xCA\v \xFF\xFF\xFF\xFF\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF
\xFF\xFF\xFF\xFF\xFF\f\xFF\r\xFF\0A\x90\xCB\vA\0\v\0\0\0\0\0\0\0\0\0\0\0	\0\0\0\0\v\0\0\0\0\0\0\0\0\0


\x07\0\0	\v\0\0	\v\0\0\v\0\0\0\0\0A\xE1\xCB\v!\0\0\0\0\0\0\0\0\0\v\r\0\r\0\0\0	\0\0\0	\0\0\0\0A\x9B\xCC\v\f\0A\xA7\xCC\v\0\0\0\0\0\0\0\0	\f\0\0\0\0\0\f\0\0\f\0A\xD5\xCC\v\0A\xE1\xCC\v\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\x8F\xCD\v\0A\x9B\xCD\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\0\0\0\0\0A\xD2\xCD\v\0\0\0\0\0\0\0\0\0	\0A\x83\xCE\v\0A\x8F\xCE\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\xBD\xCE\v\0A\xC9\xCE\vb\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\x000123456789ABCDEF\0\0\0\0\x84g\0\0S\0\0\0\x7F\0\0\x80\0\0X\x93\0\0\x90g\0\0\x94\0\0NSt3__217bad_function_callE\0A\xB4\xCF\v\xFF	\0\0\0\0\0\0\0\0\0\x07\0\0\0\v\0\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0%\0\0\0)\0\0\0+\0\0\0/\0\0\x005\0\0\0;\0\0\0=\0\0\0C\0\0\0G\0\0\0I\0\0\0O\0\0\0S\0\0\0Y\0\0\0a\0\0\0e\0\0\0g\0\0\0k\0\0\0m\0\0\0q\0\0\0\x7F\0\0\0\x83\0\0\0\x89\0\0\0\x8B\0\0\0\x95\0\0\0\x97\0\0\0\x9D\0\0\0\xA3\0\0\0\xA7\0\0\0\xAD\0\0\0\xB3\0\0\0\xB5\0\0\0\xBF\0\0\0\xC1\0\0\0\xC5\0\0\0\xC7\0\0\0\xD3\0\0\0\0\0\0\v\0\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0%\0\0\0)\0\0\0+\0\0\0/\0\0\x005\0\0\0;\0\0\0=\0\0\0C\0\0\0G\0\0\0I\0\0\0O\0\0\0S\0\0\0Y\0\0\0a\0\0\0e\0\0\0g\0\0\0k\0\0\0m\0\0\0q\0\0\0y\0\0\0\x7F\0\0\0\x83\0\0\0\x89\0\0\0\x8B\0\0\0\x8F\0\0\0\x95\0\0\0\x97\0\0\0\x9D\0\0\0\xA3\0\0\0\xA7\0\0\0\xA9\0\0\0\xAD\0\0\0\xB3\0\0\0\xB5\0\0\0\xBB\0\0\0\xBF\0\0\0\xC1\0\0\0\xC5\0\0\0\xC7\0\0\0\xD1\0\0\0\0\0\0\0\x88j\0\0\x81\0\0\x82\0\0\x83\0\0\x84\0\0\x85\0\0\x86\0\0\x87\0\0\x88\0\0\x89\0\0\x8A\0\0\x8B\0\0\x8C\0\0\x8D\0\0\x8E\0\0\b\0\0\0\0\0\0\0\xC4j\0\0\x8F\0\0\x90\0\0\xF8\xFF\xFF\xFF\xF8\xFF\xFF\xFF\xC4j\0\0\x91\0\0\x92\0\0\0\0\0\0\0\0\0\fk\0\0\x93\0\0\x94\0\0\xFC\xFF\xFF\xFF\xFC\xFF\xFF\xFF\fk\0\0\x95\0\0\x96\0\0\0\0\0\0\x8Ck\0\0\x97\0\0\x98\0\0\x99\0\0\x9A\0\0\x9B\0\0\x9C\0\0\x9D\0\0\x9E\0\0\x9F\0\0\xA0\0\0\xA1\0\0\xA2\0\0\xA3\0\0\xA4\0\0\b\0\0\0\0\0\0\0\xC8k\0\0\xA5\0\0\xA6\0\0\xF8\xFF\xFF\xFF\xF8\xFF\xFF\xFF\xC8k\0\0\xA7\0\0\xA8\0\0\0\0\0\0\0\0\0l\0\0\xA9\0\0\xAA\0\0\xFC\xFF\xFF\xFF\xFC\xFF\xFF\xFFl\0\0\xAB\0\0\xAC\0\0X\x93\0\0\\j\0\0hl\0\0NSt3__29basic_iosIcNS_11char_traitsIcEEEE\0\0\x000\x93\0\0\x90j\0\0NSt3__215basic_streambufIcNS_11char_traitsIcEEEE\0\0\0\0\xB4\x93\0\0\xDCj\0\0\0\0\0\0\0\0\0Pj\0\0\xF4\xFF\xFFNSt3__213basic_istreamIcNS_11char_traitsIcEEEE\0\0\xB4\x93\0\0$k\0\0\0\0\0\0\0\0\0Pj\0\0\xF4\xFF\xFFNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE\0\0X\x93\0\0\`k\0\0hl\0\0NSt3__29basic_iosIwNS_11char_traitsIwEEEE\0\0\x000\x93\0\0\x94k\0\0NSt3__215basic_streambufIwNS_11char_traitsIwEEEE\0\0\0\0\xB4\x93\0\0\xE0k\0\0\0\0\0\0\0\0\0Tk\0\0\xF4\xFF\xFFNSt3__213basic_istreamIwNS_11char_traitsIwEEEE\0\0\xB4\x93\0\0(l\0\0\0\0\0\0\0\0\0Tk\0\0\xF4\xFF\xFFNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE\0\0\0\0\0\0hl\0\0\xAD\0\0\xAE\0\x000\x93\0\0pl\0\0NSt3__28ios_baseE\0\0\0\xF8\x96\0\0\x88\x97\0\0 \x98\0\0\xDE\x95\0\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x90l\0\0\0\0\0C.UTF-8\0A\xE0\xD9\v\xA4l\0A\x80\xDA\v\xE0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\x07\0\0\xC0\b\0\0\xC0	\0\0\xC0
\0\0\xC0\v\0\0\xC0\f\0\0\xC0\r\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\x1B\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\0\xB3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\x07\0\0\xC3\b\0\0\xC3	\0\0\xC3
\0\0\xC3\v\0\0\xC3\f\0\0\xC3\r\0\0\xD3\0\0\xC3\0\0\xC3\0\0\f\xBB\0\f\xC3\0\f\xC3\0\f\xC3\0\f\xDB\0\0\0\0\fn\0\0\x81\0\0\xB6\0\0\xB7\0\0\x84\0\0\x85\0\0\x86\0\0\x87\0\0\x88\0\0\x89\0\0\xB8\0\0\xB9\0\0\xBA\0\0\x8D\0\0\x8E\0\0X\x93\0\0n\0\0\x88j\0\0NSt3__210__stdinbufIcEE\0\0\0\0\0pn\0\0\x81\0\0\xBB\0\0\xBC\0\0\x84\0\0\x85\0\0\x86\0\0\xBD\0\0\x88\0\0\x89\0\0\x8A\0\0\x8B\0\0\x8C\0\0\xBE\0\0\xBF\0\0X\x93\0\0|n\0\0\x88j\0\0NSt3__211__stdoutbufIcEE\0\0\0\0\0\0\0\0\xD8n\0\0\x97\0\0\xC0\0\0\xC1\0\0\x9A\0\0\x9B\0\0\x9C\0\0\x9D\0\0\x9E\0\0\x9F\0\0\xC2\0\0\xC3\0\0\xC4\0\0\xA3\0\0\xA4\0\0X\x93\0\0\xE4n\0\0\x8Ck\0\0NSt3__210__stdinbufIwEE\0\0\0\0\0<o\0\0\x97\0\0\xC5\0\0\xC6\0\0\x9A\0\0\x9B\0\0\x9C\0\0\xC7\0\0\x9E\0\0\x9F\0\0\xA0\0\0\xA1\0\0\xA2\0\0\xC8\0\0\xC9\0\0X\x93\0\0Ho\0\0\x8Ck\0\0NSt3__211__stdoutbufIwEE\0A\xF4\xDE\v-\x80\xDE(\0\x80\xC8M\0\0\xA7v\0\x004\x9E\0\x80\xC7\0\x80\x9F\xEE\0\0~\x80\\@\x80\xE9g\0\xC8\x90\0U\xB8.\0A\xB0\xDF\v\xD2Sun\0Mon\0Tue\0Wed\0Thu\0Fri\0Sat\0Sunday\0Monday\0Tuesday\0Wednesday\0Thursday\0Friday\0Saturday\0Jan\0Feb\0Mar\0Apr\0May\0Jun\0Jul\0Aug\0Sep\0Oct\0Nov\0Dec\0January\0February\0March\0April\0May\0June\0July\0August\0September\0October\0November\0December\0AM\0PM\0%a %b %e %T %Y\0%m/%d/%y\0%H:%M:%S\0%I:%M:%S %p\0\0\0%m/%d/%y\x000123456789\0%a %b %e %T %Y\0%H:%M:%S\0\0\0\0\0^[yY]\0^[nN]\0yes\0no\0A\x90\xE2\v\x97\xD1t\x9E\0W\x9D\xBD*\x80pR\xFF\xFF>'
\0\0\0d\0\0\0\xE8\0\0'\0\0\xA0\x86\0@B\0\x80\x96\x98\0\0\xE1\xF55q\0k\xFF\xFF\xFF\xCE\xFB\xFF\xFF\x92\xBF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x07\b	\xFF\xFF\xFF\xFF\xFF\xFF\xFF
\v\f\r\x1B !"#\xFF\xFF\xFF\xFF\xFF\xFF
\v\f\r\x1B !"#\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x07\0\0\0\0\0\0\0LC_CTYPE\0\0\0\0LC_NUMERIC\0\0LC_TIME\0\0\0\0\0LC_COLLATE\0\0LC_MONETARY\0LC_MESSAGES\0A\xB0\xE5\v10123456789abcdefABCDEFxX+-pPiInN\0%I:%M:%S %p%H:%M\0A\xF0\xE5\v\x81%\0\0\0m\0\0\0/\0\0\0%\0\0\0d\0\0\0/\0\0\0%\0\0\0y\0\0\0%\0\0\0Y\0\0\0-\0\0\0%\0\0\0m\0\0\0-\0\0\0%\0\0\0d\0\0\0%\0\0\0I\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0p\0\0\0\0\0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0A\x80\xE7\vf%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0\0\0\0\0\xE0|\0\0\xDC\0\0\xDD\0\0\xDE\0\0\0\0\0\0D}\0\0\xDF\0\0\xE0\0\0\xDE\0\0\xE1\0\0\xE2\0\0\xE3\0\0\xE4\0\0\xE5\0\0\xE6\0\0\xE7\0\0\xE8\0A\xF0\xE7\v\xFD\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0*\0\0*\0\0*\0\0*\0\0*\0\0*\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\x002\0\x002\0\x002\0\x002\0\x002\0\x002\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\0A\xF4\xEF\v\xED\x9C|\0\0\xE9\0\0\xEA\0\0\xDE\0\0\xEB\0\0\xEC\0\0\xED\0\0\xEE\0\0\xEF\0\0\xF0\0\0\xF1\0\0\0\0\0\0x}\0\0\xF2\0\0\xF3\0\0\xDE\0\0\xF4\0\0\xF5\0\0\xF6\0\0\xF7\0\0\xF8\0\0\0\0\0\0\x9C}\0\0\xF9\0\0\xFA\0\0\xDE\0\0\xFB\0\0\xFC\0\0\xFD\0\0\xFE\0\0\xFF\0\0t\0\0\0r\0\0\0u\0\0\0e\0\0\0\0\0\0\0f\0\0\0a\0\0\0l\0\0\0s\0\0\0e\0\0\0\0\0\0\0%\0\0\0m\0\0\0/\0\0\0%\0\0\0d\0\0\0/\0\0\0%\0\0\0y\0\0\0\0\0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0\0\0\0\0%\0\0\0a\0\0\0 \0\0\0%\0\0\0b\0\0\0 \0\0\0%\0\0\0d\0\0\0 \0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0Y\0\0\0\0\0\0\0%\0\0\0I\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0p\0A\xEC\xF2\v\x847|y\0\0\0\0\0\0\0\xDE\0\0X\x93\0\0\x88y\0\0\xA0\x91\0\0NSt3__26locale5facetE\0\0\0\0\0\0\0\xE4y\0\0\0\0\0\0\0\xDE\0\0\0\0\0\0\0\0\0\0\x07\0\0\b\0\0	\0\0
\0\0\v\0\0\f\0\0\r\0\0\0\0\xB4\x93\0\0z\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0z\0\0\0\0\0NSt3__25ctypeIwEE\0\0\x000\x93\0\0 z\0\0NSt3__210ctype_baseE\0\0\0\0\0\0\0\0hz\0\0\0\0\0\0\0\xDE\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xB4\x93\0\0\x88z\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIcc11__mbstate_tEE\0\0\x000\x93\0\0\xB4z\0\0NSt3__212codecvt_baseE\0\0\0\0\0\0\xFCz\0\0\0\0\0\0\0\xDE\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\0\0\xB4\x93\0\0{\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIDsc11__mbstate_tEE\0\0\0\0\0\0p{\0\0\0\0\0\0\0\xDE\0\0 \0\0!\0\0"\0\0#\0\0$\0\0%\0\0&\0\0\xB4\x93\0\0\x90{\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIDsDu11__mbstate_tEE\0\0\0\0\0\xE4{\0\0\0\0\0'\0\0\xDE\0\0(\0\0)\0\0*\0\0+\0\0,\0\0-\0\0.\0\0\xB4\x93\0\0|\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIDic11__mbstate_tEE\0\0\0\0\0\0X|\0\0\0\0\0/\0\0\xDE\0\x000\0\x001\0\x002\0\x003\0\x004\0\x005\0\x006\0\0\xB4\x93\0\0x|\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIDiDu11__mbstate_tEE\0\xB4\x93\0\0\xBC|\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xACz\0\0\0\0\0NSt3__27codecvtIwc11__mbstate_tEE\0\0\0X\x93\0\0\xEC|\0\0|y\0\0NSt3__26locale5__impE\0\0\0X\x93\0\0}\0\0|y\0\0NSt3__27collateIcEE\0X\x93\0\x000}\0\0|y\0\0NSt3__27collateIwEE\0\xB4\x93\0\0d}\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0z\0\0\0\0\0NSt3__25ctypeIcEE\0\0\0X\x93\0\0\x84}\0\0|y\0\0NSt3__28numpunctIcEE\0\0\0\0X\x93\0\0\xA8}\0\0|y\0\0NSt3__28numpunctIwEE\0\0\0\0\0\0\0\0}\0\x007\0\x008\0\0\xDE\0\x009\0\0:\0\0;\0\0\0\0\0\0$}\0\0<\0\0=\0\0\xDE\0\0>\0\0?\0\0@\0\0\0\0\0\0@~\0\0\0\0\0A\0\0\xDE\0\0B\0\0C\0\0D\0\0E\0\0F\0\0G\0\0H\0\0I\0\0J\0\0K\0\0L\0\0\xB4\x93\0\0\`~\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xA4~\0\0\0\0\0\0NSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\xB4\x93\0\0\xBC~\0\0\0\0\0\0\0\0\0\xD4~\0\0\0\0\0\0NSt3__29__num_getIcEE\0\0\x000\x93\0\0\xDC~\0\0NSt3__214__num_get_baseE\0\0\0\0\0\0\0\x008\x7F\0\0\0\0\0M\0\0\xDE\0\0N\0\0O\0\0P\0\0Q\0\0R\0\0S\0\0T\0\0U\0\0V\0\0W\0\0X\0\0\xB4\x93\0\0X\x7F\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x9C\x7F\0\0\0\0\0\0NSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\xB4\x93\0\0\xB4\x7F\0\0\0\0\0\0\0\0\0\xD4~\0\0\0\0\0\0NSt3__29__num_getIwEE\0\0\0\0\0\0\0\0\x80\0\0\0\0\0Y\0\0\xDE\0\0Z\0\0[\0\0\\\0\0]\0\0^\0\0_\0\0\`\0\0a\0\0\xB4\x93\0\0 \x80\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0d\x80\0\0\0\0\0\0NSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\xB4\x93\0\0|\x80\0\0\0\0\0\0\0\0\0\x94\x80\0\0\0\0\0\0NSt3__29__num_putIcEE\0\0\x000\x93\0\0\x9C\x80\0\0NSt3__214__num_put_baseE\0\0\0\0\0\0\0\0\xEC\x80\0\0\0\0\0b\0\0\xDE\0\0c\0\0d\0\0e\0\0f\0\0g\0\0h\0\0i\0\0j\0\0\xB4\x93\0\0\f\x81\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0P\x81\0\0\0\0\0\0NSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\xB4\x93\0\0h\x81\0\0\0\0\0\0\0\0\0\x94\x80\0\0\0\0\0\0NSt3__29__num_putIwEE\0\0\0\0\0\0\0\xD4\x81\0\0k\0\0l\0\0\xDE\0\0m\0\0n\0\0o\0\0p\0\0q\0\0r\0\0s\0\0\xF8\xFF\xFF\xFF\xD4\x81\0\0t\0\0u\0\0v\0\0w\0\0x\0\0y\0\0z\0\0\xB4\x93\0\0\xFC\x81\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0D\x82\0\0\0\0\0\`\x82\0\0\0\b\0\0NSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0\x000\x93\0\0L\x82\0\0NSt3__29time_baseE\0\x000\x93\0\0h\x82\0\0NSt3__220__time_get_c_storageIcEE\0\0\0\0\0\0\0\xE0\x82\0\0{\0\0|\0\0\xDE\0\0}\0\0~\0\0\x7F\0\0\x80\0\0\x81\0\0\x82\0\0\x83\0\0\xF8\xFF\xFF\xFF\xE0\x82\0\0\x84\0\0\x85\0\0\x86\0\0\x87\0\0\x88\0\0\x89\0\0\x8A\0\0\xB4\x93\0\0\b\x83\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0D\x82\0\0\0\0\0P\x83\0\0\0\b\0\0NSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0\x000\x93\0\0X\x83\0\0NSt3__220__time_get_c_storageIwEE\0\0\0\0\0\0\0\x94\x83\0\0\x8B\0\0\x8C\0\0\xDE\0\0\x8D\0\0\xB4\x93\0\0\xB4\x83\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xFC\x83\0\0\0\b\0\0NSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0\x000\x93\0\0\x84\0\0NSt3__210__time_putE\0\0\0\0\0\0\0\x004\x84\0\0\x8E\0\0\x8F\0\0\xDE\0\0\x90\0\0\xB4\x93\0\0T\x84\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xFC\x83\0\0\0\b\0\0NSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0\0\0\0\0\0\xD4\x84\0\0\0\0\0\x91\0\0\xDE\0\0\x92\0\0\x93\0\0\x94\0\0\x95\0\0\x96\0\0\x97\0\0\x98\0\0\x99\0\0\x9A\0\0\xB4\x93\0\0\xF4\x84\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x85\0\0\0\0\0NSt3__210moneypunctIcLb0EEE\x000\x93\0\0\x85\0\0NSt3__210money_baseE\0\0\0\0\0\0\0\0h\x85\0\0\0\0\0\x9B\0\0\xDE\0\0\x9C\0\0\x9D\0\0\x9E\0\0\x9F\0\0\xA0\0\0\xA1\0\0\xA2\0\0\xA3\0\0\xA4\0\0\xB4\x93\0\0\x88\x85\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x85\0\0\0\0\0NSt3__210moneypunctIcLb1EEE\0\0\0\0\0\xDC\x85\0\0\0\0\0\xA5\0\0\xDE\0\0\xA6\0\0\xA7\0\0\xA8\0\0\xA9\0\0\xAA\0\0\xAB\0\0\xAC\0\0\xAD\0\0\xAE\0\0\xB4\x93\0\0\xFC\x85\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x85\0\0\0\0\0NSt3__210moneypunctIwLb0EEE\0\0\0\0\0P\x86\0\0\0\0\0\xAF\0\0\xDE\0\0\xB0\0\0\xB1\0\0\xB2\0\0\xB3\0\0\xB4\0\0\xB5\0\0\xB6\0\0\xB7\0\0\xB8\0\0\xB4\x93\0\0p\x86\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x85\0\0\0\0\0NSt3__210moneypunctIwLb1EEE\0\0\0\0\0\xA8\x86\0\0\0\0\0\xB9\0\0\xDE\0\0\xBA\0\0\xBB\0\0\xB4\x93\0\0\xC8\x86\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x87\0\0\0\0\0\0NSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\x000\x93\0\0\x87\0\0NSt3__211__money_getIcEE\0\0\0\0\0\0\0\0P\x87\0\0\0\0\0\xBC\0\0\xDE\0\0\xBD\0\0\xBE\0\0\xB4\x93\0\0p\x87\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\xB8\x87\0\0\0\0\0\0NSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\x000\x93\0\0\xC0\x87\0\0NSt3__211__money_getIwEE\0\0\0\0\0\0\0\0\xF8\x87\0\0\0\0\0\xBF\0\0\xDE\0\0\xC0\0\0\xC1\0\0\xB4\x93\0\0\x88\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\`\x88\0\0\0\0\0\0NSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\x000\x93\0\0h\x88\0\0NSt3__211__money_putIcEE\0\0\0\0\0\0\0\0\xA0\x88\0\0\0\0\0\xC2\0\0\xDE\0\0\xC3\0\0\xC4\0\0\xB4\x93\0\0\xC0\x88\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\b\x89\0\0\0\0\0\0NSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\x000\x93\0\0\x89\0\0NSt3__211__money_putIwEE\0\0\0\0\0\0\0\0L\x89\0\0\0\0\0\xC5\0\0\xDE\0\0\xC6\0\0\xC7\0\0\xC8\0\0\xB4\x93\0\0l\x89\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x84\x89\0\0\0\0\0NSt3__28messagesIcEE\0\0\0\x000\x93\0\0\x8C\x89\0\0NSt3__213messages_baseE\0\0\0\0\0\xC4\x89\0\0\0\0\0\xC9\0\0\xDE\0\0\xCA\0\0\xCB\0\0\xCC\0\0\xB4\x93\0\0\xE4\x89\0\0\0\0\0\0\0\0\0|y\0\0\0\0\0\x84\x89\0\0\0\0\0NSt3__28messagesIwEE\0\0\0\0S\0\0\0u\0\0\0n\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0M\0\0\0o\0\0\0n\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0T\0\0\0u\0\0\0e\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0W\0\0\0e\0\0\0d\0\0\0n\0\0\0e\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0T\0\0\0h\0\0\0u\0\0\0r\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0F\0\0\0r\0\0\0i\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0S\0\0\0a\0\0\0t\0\0\0u\0\0\0r\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0S\0\0\0u\0\0\0n\0\0\0\0\0\0\0M\0\0\0o\0\0\0n\0\0\0\0\0\0\0T\0\0\0u\0\0\0e\0\0\0\0\0\0\0W\0\0\0e\0\0\0d\0\0\0\0\0\0\0T\0\0\0h\0\0\0u\0\0\0\0\0\0\0F\0\0\0r\0\0\0i\0\0\0\0\0\0\0S\0\0\0a\0\0\0t\0\0\0\0\0\0\0J\0\0\0a\0\0\0n\0\0\0u\0\0\0a\0\0\0r\0\0\0y\0\0\0\0\0\0\0F\0\0\0e\0\0\0b\0\0\0r\0\0\0u\0\0\0a\0\0\0r\0\0\0y\0\0\0\0\0\0\0M\0\0\0a\0\0\0r\0\0\0c\0\0\0h\0\0\0\0\0\0\0A\0\0\0p\0\0\0r\0\0\0i\0\0\0l\0\0\0\0\0\0\0M\0\0\0a\0\0\0y\0\0\0\0\0\0\0J\0\0\0u\0\0\0n\0\0\0e\0\0\0\0\0\0\0J\0\0\0u\0\0\0l\0\0\0y\0\0\0\0\0\0\0A\0\0\0u\0\0\0g\0\0\0u\0\0\0s\0\0\0t\0\0\0\0\0\0\0S\0\0\0e\0\0\0p\0\0\0t\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0O\0\0\0c\0\0\0t\0\0\0o\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0N\0\0\0o\0\0\0v\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0D\0\0\0e\0\0\0c\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0J\0\0\0a\0\0\0n\0\0\0\0\0\0\0F\0\0\0e\0\0\0b\0\0\0\0\0\0\0M\0\0\0a\0\0\0r\0\0\0\0\0\0\0A\0\0\0p\0\0\0r\0\0\0\0\0\0\0J\0\0\0u\0\0\0n\0\0\0\0\0\0\0J\0\0\0u\0\0\0l\0\0\0\0\0\0\0A\0\0\0u\0\0\0g\0\0\0\0\0\0\0S\0\0\0e\0\0\0p\0\0\0\0\0\0\0O\0\0\0c\0\0\0t\0\0\0\0\0\0\0N\0\0\0o\0\0\0v\0\0\0\0\0\0\0D\0\0\0e\0\0\0c\0\0\0\0\0\0\0A\0\0\0M\0\0\0\0\0\0\0P\0\0\0M\0\0\0\0\0\0\x0000010203040506070809101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899\0\0\0\0\0\0\0\x00000000010010001101000101011001111000100110101011110011011110111100010203040506071011121314151617202122232425262730313233343536374041424344454647505152535455565760616263646566677071727374757677000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff\0\0\0\0\0\0\0\0
\0\0\0\0\0\0\0d\0\0\0\0\0\0\0\xE8\0\0\0\0\0\0'\0\0\0\0\0\0\xA0\x86\0\0\0\0\0@B\0\0\0\0\0\x80\x96\x98\0\0\0\0\0\0\xE1\xF5\0\0\0\0\0\xCA\x9A;\0\0\0\0\0\xE4\vT\0\0\0\0\xE8vH\0\0\0\0\xA5\xD4\xE8\0\0\0\0\xA0rN	\0\0\0@z\xF3Z\0\0\0\x80\xC6\xA4~\x8D\0\0\0\xC1o\xF2\x86#\0\0\0\x8A]xEc\0\0d\xA7\xB3\xB6\xE0\r\0\0\xE8\x89#\xC7\x8A0\x93\0\0\xA8\x91\0\0NSt3__214__shared_countE\0\0\0\0X\x93\0\0\xD0\x91\0\0\xDC\x94\0\0N10__cxxabiv116__shim_type_infoE\0\0\0\0X\x93\0\0\0\x92\0\0\xC4\x91\0\0N10__cxxabiv117__class_type_infoE\0\0\0\0\0\0\0@\x92\0\0\xCD\0\0\xCE\0\0\xCF\0\0\xD0\0\0\xD1\0\0X\x93\0\0L\x92\0\0\xC4\x91\0\0N10__cxxabiv123__fundamental_type_infoE\0,\x92\0\0|\x92\0\0v\0\0\0,\x92\0\0\x88\x92\0\0b\0\0\0,\x92\0\0\x94\x92\0\0c\0\0\0,\x92\0\0\xA0\x92\0\0h\0\0\0,\x92\0\0\xAC\x92\0\0a\0\0\0,\x92\0\0\xB8\x92\0\0s\0\0\0,\x92\0\0\xC4\x92\0\0t\0\0\0,\x92\0\0\xD0\x92\0\0i\0\0\0,\x92\0\0\xDC\x92\0\0j\0\0\0,\x92\0\0\xE8\x92\0\0l\0\0\0,\x92\0\0\xF4\x92\0\0m\0\0\0,\x92\0\0\0\x93\0\0x\0\0\0,\x92\0\0\f\x93\0\0y\0\0\0,\x92\0\0\x93\0\0f\0\0\0,\x92\0\0$\x93\0\0d\0\0\0\0\0\0\0\xF4\x91\0\0\xCD\0\0\xD2\0\0\xCF\0\0\xD0\0\0\xD3\0\0\xD4\0\0\xD5\0\0\xD6\0\0\0\0\0\0x\x93\0\0\xCD\0\0\xD7\0\0\xCF\0\0\xD0\0\0\xD3\0\0\xD8\0\0\xD9\0\0\xDA\0\0X\x93\0\0\x84\x93\0\0\xF4\x91\0\0N10__cxxabiv120__si_class_type_infoE\0\0\0\0\0\0\0\0\xD4\x93\0\0\xCD\0\0\xDB\0\0\xCF\0\0\xD0\0\0\xD3\0\0\xDC\0\0\xDD\0\0\xDE\0\0X\x93\0\0\xE0\x93\0\0\xF4\x91\0\0N10__cxxabiv121__vmi_class_type_infoE\0\0\0\0\0\0\0P\x94\0\0\0\0\0\xDF\0\0\xE0\0\x000\x93\0\0$\x94\0\0St9exception\0\0\0\0X\x93\0\0@\x94\0\0\x94\0\0St9bad_alloc\0\0\0\0X\x93\0\0\\\x94\0\x004\x94\0\0St20bad_array_new_length\0\0\0\0\0\0\0\0\x8C\x94\0\0\0\0\0\xE1\0\0\xE2\0\0X\x93\0\0\x98\x94\0\0\x94\0\0St11logic_error\0\0\0\0\0\xBC\x94\0\0\0\0\0\xE3\0\0\xE2\0\0X\x93\0\0\xC8\x94\0\0\x8C\x94\0\0St12length_error\0\0\0\x000\x93\0\0\xE4\x94\0\0St9type_info\0A\x86\xAA\v\v4@\0\0\0\0\0\x004@\0A\x9E\xAA\v\xDB4@\0\0\0\0\0\0>@\xBC\0\0\0\0\0\xF0\xF8\xFF\xFA\xEB\xD7\0\xFF\xFF\x7F\xFF\xD4\xF0\xFF\xFF\xF5\xF5\xDC\xFF\xE4\xC4\0\0\0\xFF\xEB\xCD\0\0\xFF\x8A+\xE2\xA5**\xDE\xB8\x87_\x9E\xA0\x7F\xFF\0\xD2i\xFF\x7FPd\x95\xED\xFF\xF8\xE5\xDC<\0\xFF\xFF\0\0\x8B\0\x8B\x8B\xB8\x86\v\xA9\xA9\xA9\0d\0\xA9\xA9\xA9\xBD\xB7k\x8B\0\x8BUk/\xFF\x8C\0\x992\xCC\x8B\0\0\xE9\x96z\x8F\xBC\x8FH=\x8B/OO/OO\0\xCE\xD1\x94\0\xD3\xFF\x93\0\xBF\xFFiiiiii\x90\xFF\xB2""\xFF\xFA\xF0"\x8B"\xFF\0\xFF\xDC\xDC\xDC\xF8\xF8\xFF\xFF\xD7\0\xDA\xA5 \x80\x80\x80\0\x80\0\xAD\xFF/\x80\x80\x80\xF0\xFF\xF0\xFFi\xB4\xCD\\\\K\0\x82\xFF\xFF\xF0\xF0\xE6\x8C\xE6\xE6\xFA\xFF\xF0\xF5|\xFC\0\xFF\xFA\xCD\xAD\xD8\xE6\xF0\x80\x80\xE0\xFF\xFF\xFA\xFA\xD2\xD3\xD3\xD3\x90\xEE\x90\xD3\xD3\xD3\xFF\xB6\xC1\xFF\xA0z \xB2\xAA\x87\xCE\xFAw\x88\x99w\x88\x99\xB0\xC4\xDE\xFF\xFF\xE0\0\xFF\x002\xCD2\xFA\xF0\xE6\xFF\0\xFF\x80\0\0f\xCD\xAA\0\0\xCD\xBAU\xD3\x93p\xDB<\xB3q{h\xEE\0\xFA\x9AH\xD1\xCC\xC7\x85p\xF5\xFF\xFA\xFF\xE4\xE1\xFF\xE4\xB5\xFF\xDE\xAD\0\0\x80\xFD\xF5\xE6\x80\x80\0k\x8E#\xFF\xA5\0\xFFE\0\xDAp\xD6\xEE\xE8\xAA\x98\xFB\x98\xAF\xEE\xEE\xDBp\x93\xFF\xEF\xD5\xFF\xDA\xB9\xCD\x85?\xFF\xC0\xCB\xDD\xA0\xDD\xB0\xE0\xE6\x80\0\x80\xFF\0\0\xBC\x8F\x8FAi\xE1\x8BE\xFA\x80r\xF4\xA4\`.\x8BW\xFF\xF5\xEE\xA0R-\xC0\xC0\xC0\x87\xCE\xEBjZ\xCDp\x80\x90p\x80\x90\xFF\xFA\xFA\0\xFF\x7FF\x82\xB4\xD2\xB4\x8C\0\x80\x80\xD8\xBF\xD8\xFFcG@\xE0\xD0\xEE\x82\xEE\xF5\xDE\xB3\xFF\xFF\xFF\xF5\xF5\xF5\xFF\xFF\0\x9A\xCD2\0\0\0\0 \0\0\f\xB1\0\x000\xC8\0	\0A\x84\xAE\v\xAF\0A\x98\xAE\v\xB0\0\0\0\0\0\0\xB1\0\0(\xB3\0\0\0\0A\xC4\xAE\v\xFF\xFF\xFF\xFF\0A\x88\xAF\v\0A\x94\xAF\v\xB2\0A\xAC\xAF\v\xB3\0\0\xB4\0\x008\xB7\0\0\0\0A\xC4\xAF\v\0A\xD4\xAF\v\xFF\xFF\xFF\xFF
\0A\x98\xB0\v	\x88\x97\0\0\0\0\0\0\0A\xAC\xB0\v\xAF\0A\xC4\xB0\v
\xB3\0\0\xB1\0\0@\xBB\0A\xDC\xB0\v\0A\xEC\xB0\v\b\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\xB0\xB1\v \x98\0\0%m/%d/%y\0\0\0\b%H:%M:%S\0\0\0\b`);
    }
    function getBinarySync(file) {
      return file;
    }
    async function getWasmBinary(binaryFile) {
      return getBinarySync(binaryFile);
    }
    async function instantiateArrayBuffer(binaryFile, imports) {
      try {
        var binary = await getWasmBinary(binaryFile);
        var instance = await WebAssembly.instantiate(binary, imports);
        return instance;
      } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      }
    }
    async function instantiateAsync(binary, binaryFile, imports) {
      return instantiateArrayBuffer(binaryFile, imports);
    }
    function getWasmImports() {
      var imports = { a: wasmImports };
      return imports;
    }
    async function createWasm() {
      function receiveInstance(instance) {
        wasmExports = instance.exports;
        assignWasmExports(wasmExports);
        updateMemoryViews();
        return wasmExports;
      }
      function receiveInstantiationResult(result2) {
        return receiveInstance(result2["instance"]);
      }
      var info = getWasmImports();
      var instantiateWasm = Module["instantiateWasm"];
      if (instantiateWasm) {
        return new Promise((resolve) => {
          instantiateWasm(info, (inst) => resolve(receiveInstance(inst)));
        });
      }
      wasmBinaryFile ??= findWasmBinary();
      var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
      var exports = receiveInstantiationResult(result);
      return exports;
    }
    class ExitStatus {
      name = "ExitStatus";
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }
    var HEAP8;
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    var onPostRuns = [];
    var onPreRuns = [];
    var noExitRuntime = true;
    var HEAPU32;
    class ExceptionInfo {
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
      set_type(type) {
        HEAPU32[this.ptr + 4 >> 2] = type;
      }
      get_type() {
        return HEAPU32[this.ptr + 4 >> 2];
      }
      set_destructor(destructor) {
        HEAPU32[this.ptr + 8 >> 2] = destructor;
      }
      get_destructor() {
        return HEAPU32[this.ptr + 8 >> 2];
      }
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12] = caught;
      }
      get_caught() {
        return HEAP8[this.ptr + 12] != 0;
      }
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13] = rethrown;
      }
      get_rethrown() {
        return HEAP8[this.ptr + 13] != 0;
      }
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
      }
      get_adjusted_ptr() {
        return HEAPU32[this.ptr + 16 >> 2];
      }
    }
    var uncaughtExceptionCount = 0;
    var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      info.init(type, destructor);
      uncaughtExceptionCount++;
      abort();
    };
    var __abort_js = () => abort("");
    var HEAPU8;
    var AsciiToString = (ptr) => {
      var str = "";
      while (1) {
        var ch = HEAPU8[ptr++];
        if (!ch) return str;
        str += String.fromCharCode(ch);
      }
    };
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    class BindingError extends Error {
      constructor(message) {
        super(message);
        this.name = "BindingError";
      }
    }
    var throwBindingError = (message) => {
      throw new BindingError(message);
    };
    function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    function registerType(rawType, registeredInstance, options = {}) {
      return sharedRegisterType(rawType, registeredInstance, options);
    }
    var HEAP16;
    var HEAPU16;
    var HEAP32;
    var HEAP64;
    var HEAPU64;
    var integerReadValueFromPointer = (name, width, signed) => {
      switch (width) {
        case 1:
          return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
        case 2:
          return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
        case 4:
          return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
        case 8:
          return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
    var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0n;
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        const bitSize = size * 8;
        fromWireType = (value) => BigInt.asUintN(bitSize, value);
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
        if (typeof value == "number") {
          value = BigInt(value);
        }
        return value;
      }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
    };
    var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: function(wt) {
        return !!wt;
      }, toWireType: function(destructors, o) {
        return o ? trueValue : falseValue;
      }, readValueFromPointer: function(pointer) {
        return this.fromWireType(HEAPU8[pointer]);
      }, destructorFunction: null });
    };
    var emval_freelist = [];
    var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
    var __emval_decref = (handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        var value = emval_handles[handle];
        emval_handles[handle] = void 0;
        emval_freelist.push(handle);
      }
    };
    var Emval = { toValue: (handle) => {
      if (!handle) {
        throwBindingError(`Cannot use deleted val. handle = ${handle}`);
      }
      return emval_handles[handle];
    }, toHandle: (value) => {
      switch (value) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default: {
          const handle = emval_freelist.pop() || emval_handles.length;
          emval_handles[handle] = value;
          emval_handles[handle + 1] = 1;
          return handle;
        }
      }
    } };
    function readPointer(pointer) {
      return this.fromWireType(HEAPU32[pointer >> 2]);
    }
    var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
      var rv = Emval.toValue(handle);
      __emval_decref(handle);
      return rv;
    }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
    var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
    var HEAPF32;
    var HEAPF64;
    var floatReadValueFromPointer = (name, width) => {
      switch (width) {
        case 4:
          return function(pointer) {
            return this.fromWireType(HEAPF32[pointer >> 2]);
          };
        case 8:
          return function(pointer) {
            return this.fromWireType(HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
    var __embind_register_float = (rawType, name, size) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
    };
    var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
    var runDestructors = (destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    };
    function usesDestructorStack(argTypes) {
      for (var i = 1; i < argTypes.length; ++i) {
        if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
          return true;
        }
      }
      return false;
    }
    function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
      var needsDestructorStack = usesDestructorStack(argTypes);
      var argCount = argTypes.length - 2;
      var argsList = [];
      var argsListWired = ["fn"];
      if (isClassMethodFunc) {
        argsListWired.push("thisWired");
      }
      for (var i = 0; i < argCount; ++i) {
        argsList.push(`arg${i}`);
        argsListWired.push(`arg${i}Wired`);
      }
      argsList = argsList.join();
      argsListWired = argsListWired.join();
      var invokerFnBody = `return function (${argsList}) {
`;
      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
      if (isClassMethodFunc) {
        invokerFnBody += `var thisWired = toClassParamWire(${dtorStack}, this);
`;
      }
      for (var i = 0; i < argCount; ++i) {
        var argName = `toArg${i}Wire`;
        invokerFnBody += `var arg${i}Wired = ${argName}(${dtorStack}, arg${i});
`;
        args1.push(argName);
      }
      invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});
`;
      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
          var paramName = i === 1 ? "thisWired" : `arg${i - 2}Wired`;
          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += `${paramName}_dtor(${paramName});
`;
            args1.push(`${paramName}_dtor`);
          }
        }
      }
      if (returns) {
        invokerFnBody += "var ret = fromRetWire(rv);\nreturn ret;\n";
      } else {
      }
      invokerFnBody += "}\n";
      return new Function(args1, invokerFnBody);
    }
    function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
      var argCount = argTypes.length;
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and receiver (this) types!");
      }
      var isClassMethodFunc = argTypes[1] !== null && classType !== null;
      var needsDestructorStack = usesDestructorStack(argTypes);
      var returns = !argTypes[0].isVoid;
      var retType = argTypes[0];
      var instType = argTypes[1];
      var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, retType.fromWireType.bind(retType), instType?.toWireType.bind(instType)];
      for (var i = 2; i < argCount; ++i) {
        var argType = argTypes[i];
        closureArgs.push(argType.toWireType.bind(argType));
      }
      if (!needsDestructorStack) {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
          if (argTypes[i].destructorFunction !== null) {
            closureArgs.push(argTypes[i].destructorFunction);
          }
        }
      }
      let invokerFactory = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
      var invokerFn = invokerFactory(...closureArgs);
      return createNamedFunction(humanName, invokerFn);
    }
    var ensureOverloadTable = (proto, methodName, humanName) => {
      if (void 0 === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        proto[methodName] = function(...args) {
          if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
            throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
          }
          return proto[methodName].overloadTable[args.length].apply(this, args);
        };
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    };
    var exposePublicSymbol = (name, value, numArguments) => {
      if (Module.hasOwnProperty(name)) {
        if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
          throwBindingError(`Cannot register public name '${name}' twice`);
        }
        ensureOverloadTable(Module, name, name);
        if (Module[name].overloadTable.hasOwnProperty(numArguments)) {
          throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
        }
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
    var heap32VectorToArray = (count, firstElement) => {
      var array = [];
      for (var i = 0; i < count; i++) {
        array.push(HEAPU32[firstElement + i * 4 >> 2]);
      }
      return array;
    };
    class InternalError extends Error {
      constructor(message) {
        super(message);
        this.name = "InternalError";
      }
    }
    var throwInternalError = (message) => {
      throw new InternalError(message);
    };
    var replacePublicSymbol = (name, value, numArguments) => {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError("Replacing nonexistent public symbol");
      }
      if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
    var wasmTableMirror = [];
    var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    };
    var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
      signature = AsciiToString(signature);
      function makeDynCaller() {
        var rtn = getWasmTableEntry(rawFunction);
        return rtn;
      }
      var fp = makeDynCaller();
      if (typeof fp != "function") {
        throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
      }
      return fp;
    };
    class UnboundTypeError extends Error {
    }
    var getTypeName = (type) => {
      var ptr = ___getTypeName(type);
      var rv = AsciiToString(ptr);
      _free(ptr);
      return rv;
    };
    var throwUnboundTypeError = (message, types) => {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
      throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
    };
    var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
      myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
      function onComplete(typeConverters2) {
        var myTypeConverters = getTypeConverters(typeConverters2);
        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError("Mismatched type converter count");
        }
        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i]);
        }
      }
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      for (let [i, dt] of dependentTypes.entries()) {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      }
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    };
    var getFunctionName = (signature) => {
      signature = signature.trim();
      const argsIndex = signature.indexOf("(");
      if (argsIndex === -1) return signature;
      return signature.slice(0, argsIndex);
    };
    var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = AsciiToString(name);
      name = getFunctionName(name);
      rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
      exposePublicSymbol(name, function() {
        throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
      }, argCount - 1);
      whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
        var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
        return [];
      });
    };
    var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0;
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => value << bitshift >>> bitshift;
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
    };
    var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        var size = HEAPU32[handle >> 2];
        var data = HEAPU32[handle + 4 >> 2];
        return new TA(HEAP8.buffer, data, size);
      }
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
    };
    var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.codePointAt(i);
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
          i++;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
    var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
    var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr).slice());
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    };
    var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
    var __embind_register_std_string = (rawType, name) => {
      name = AsciiToString(name);
      var stdStringIsUTF8 = true;
      registerType(rawType, { name, fromWireType(value) {
        var length = HEAPU32[value >> 2];
        var payload = value + 4;
        var str;
        if (stdStringIsUTF8) {
          str = UTF8ToString(payload, length, true);
        } else {
          str = "";
          for (var i = 0; i < length; ++i) {
            str += String.fromCharCode(HEAPU8[payload + i]);
          }
        }
        _free(value);
        return str;
      }, toWireType(destructors, value) {
        if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value);
        }
        var length;
        var valueIsOfTypeString = typeof value == "string";
        if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
          throwBindingError("Cannot pass non-string to std::string");
        }
        if (stdStringIsUTF8 && valueIsOfTypeString) {
          length = lengthBytesUTF8(value);
        } else {
          length = value.length;
        }
        var base = _malloc(4 + length + 1);
        var ptr = base + 4;
        HEAPU32[base >> 2] = length;
        if (valueIsOfTypeString) {
          if (stdStringIsUTF8) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            for (var i = 0; i < length; ++i) {
              var charCode = value.charCodeAt(i);
              if (charCode > 255) {
                _free(base);
                throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
              }
              HEAPU8[ptr + i] = charCode;
            }
          }
        } else {
          HEAPU8.set(value, ptr);
        }
        if (destructors !== null) {
          destructors.push(_free, base);
        }
        return base;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    };
    var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0;
    var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var idx = ptr >> 1;
      var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
      if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx).slice());
      var str = "";
      for (var i = idx; i < endIdx; ++i) {
        var codeUnit = HEAPU16[i];
        str += String.fromCharCode(codeUnit);
      }
      return str;
    };
    var stringToUTF16 = (str, outPtr, maxBytesToWrite = 2147483647) => {
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF16 = (str) => str.length * 2;
    var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var str = "";
      var startIdx = ptr >> 2;
      for (var i = 0; !(i >= maxBytesToRead / 4); i++) {
        var utf32 = HEAPU32[startIdx + i];
        if (!utf32 && !ignoreNul) break;
        str += String.fromCodePoint(utf32);
      }
      return str;
    };
    var stringToUTF32 = (str, outPtr, maxBytesToWrite = 2147483647) => {
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codePoint = str.codePointAt(i);
        if (codePoint > 65535) {
          i++;
        }
        HEAP32[outPtr >> 2] = codePoint;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var codePoint = str.codePointAt(i);
        if (codePoint > 65535) {
          i++;
        }
        len += 4;
      }
      return len;
    };
    var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = AsciiToString(name);
      var decodeString, encodeString, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
      } else {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
      }
      registerType(rawType, { name, fromWireType: (value) => {
        var length = HEAPU32[value >> 2];
        var str = decodeString(value + 4, length * charSize, true);
        _free(value);
        return str;
      }, toWireType: (destructors, value) => {
        if (!(typeof value == "string")) {
          throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
        }
        var length = lengthBytesUTF(value);
        var ptr = _malloc(4 + length + charSize);
        HEAPU32[ptr >> 2] = length / charSize;
        encodeString(value, ptr + 4, length + charSize);
        if (destructors !== null) {
          destructors.push(_free, ptr);
        }
        return ptr;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    };
    var __embind_register_void = (rawType, name) => {
      name = AsciiToString(name);
      registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
    };
    var emval_methodCallers = [];
    var emval_addMethodCaller = (caller) => {
      var id = emval_methodCallers.length;
      emval_methodCallers.push(caller);
      return id;
    };
    var requireRegisteredType = (rawType, humanName) => {
      var impl = registeredTypes[rawType];
      if (void 0 === impl) {
        throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
      }
      return impl;
    };
    var emval_lookupTypes = (argCount, argTypes) => {
      var a = new Array(argCount);
      for (var i = 0; i < argCount; ++i) {
        a[i] = requireRegisteredType(HEAPU32[argTypes + i * 4 >> 2], `parameter ${i}`);
      }
      return a;
    };
    var emval_returnValue = (toReturnWire, destructorsRef, handle) => {
      var destructors = [];
      var result = toReturnWire(destructors, handle);
      if (destructors.length) {
        HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
      }
      return result;
    };
    var emval_symbols = {};
    var getStringOrSymbol = (address) => {
      var symbol = emval_symbols[address];
      if (symbol === void 0) {
        return AsciiToString(address);
      }
      return symbol;
    };
    var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
      var GenericWireTypeSize = 8;
      var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
      var toReturnWire = retType.toWireType.bind(retType);
      var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
      argCount--;
      var captures = { toValue: Emval.toValue };
      var args = argFromPtr.map((argFromPtr2, i) => {
        var captureName = `argFromPtr${i}`;
        captures[captureName] = argFromPtr2;
        return `${captureName}(args${i ? "+" + i * GenericWireTypeSize : ""})`;
      });
      var functionBody;
      switch (kind) {
        case 0:
          functionBody = "toValue(handle)";
          break;
        case 2:
          functionBody = "new (toValue(handle))";
          break;
        case 3:
          functionBody = "";
          break;
        case 1:
          captures["getStringOrSymbol"] = getStringOrSymbol;
          functionBody = "toValue(handle)[getStringOrSymbol(methodName)]";
          break;
      }
      functionBody += `(${args})`;
      if (!retType.isVoid) {
        captures["toReturnWire"] = toReturnWire;
        captures["emval_returnValue"] = emval_returnValue;
        functionBody = `return emval_returnValue(toReturnWire, destructorsRef, ${functionBody})`;
      }
      functionBody = `return function (handle, methodName, destructorsRef, args) {
${functionBody}
}`;
      var invokerFunction = new Function(Object.keys(captures), functionBody)(...Object.values(captures));
      var functionName = `methodCaller<(${argTypes.map((t) => t.name)}) => ${retType.name}>`;
      return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
    };
    var __emval_get_global = (name) => {
      if (!name) {
        return Emval.toHandle(globalThis);
      }
      name = getStringOrSymbol(name);
      return Emval.toHandle(globalThis[name]);
    };
    var __emval_get_property = (handle, key) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      return Emval.toHandle(handle[key]);
    };
    var __emval_incref = (handle) => {
      if (handle > 9) {
        emval_handles[handle + 1] += 1;
      }
    };
    var __emval_invoke = (caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args);
    var __emval_is_number = (handle) => {
      handle = Emval.toValue(handle);
      return typeof handle == "number";
    };
    var __emval_is_string = (handle) => {
      handle = Emval.toValue(handle);
      return typeof handle == "string";
    };
    var __emval_new_array = () => Emval.toHandle([]);
    var __emval_new_cstring = (v) => Emval.toHandle(getStringOrSymbol(v));
    var __emval_new_object = () => Emval.toHandle({});
    var __emval_run_destructors = (handle) => {
      var destructors = Emval.toValue(handle);
      runDestructors(destructors);
      __emval_decref(handle);
    };
    var __emval_set_property = (handle, key, value) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      value = Emval.toValue(value);
      handle[key] = value;
    };
    var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = (timezoneOffset) => {
        var sign = timezoneOffset >= 0 ? "-" : "+";
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
        return `UTC${sign}${hours}${minutes}`;
      };
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
    var _emscripten_date_now = () => Date.now();
    var getHeapMax = () => 2147483648;
    var _emscripten_get_heap_max = () => getHeapMax();
    var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
    var growMemory = (size) => {
      var oldHeapSize = wasmMemory.buffer.byteLength;
      var pages = (size - oldHeapSize + 65535) / 65536 | 0;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {
      }
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var ENV = {};
    var getExecutableName = () => thisProgram;
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
        var env = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
        for (var x in ENV) {
          if (ENV[x] === void 0) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
    var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + envp >> 2] = ptr;
        bufSize += stringToUTF8(string, ptr, Infinity) + 1;
        envp += 4;
      }
      return 0;
    };
    var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      for (var string of strings) {
        bufSize += lengthBytesUTF8(string) + 1;
      }
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    }, normalizeArray: (parts, allowAboveRoot) => {
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    }, normalize: (path) => {
      var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
      path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    }, dirname: (path) => {
      var result = PATH.splitPath(path), root = result[0], dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.slice(0, -1);
      }
      return root + dir;
    }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
    var initRandomFill = () => (view) => (crypto.getRandomValues(view), 0);
    var randomFill = (view) => (randomFill = initRandomFill())(view);
    var PATH_FS = { resolve: (...args) => {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? args[i] : FS.cwd();
        if (typeof path != "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = PATH.isAbs(path);
      }
      resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }, relative: (from, to) => {
      from = PATH_FS.resolve(from).slice(1);
      to = PATH_FS.resolve(to).slice(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "") break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "") break;
        }
        if (start > end) return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    } };
    var FS_stdin_getChar_buffer = [];
    var intArrayFromString = (stringy, dontAddNull, length) => {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    };
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (globalThis.window?.prompt) {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        } else {
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops };
      FS.registerDevice(dev, TTY.stream_ops);
    }, stream_ops: { open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    }, close(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === void 0 && !bytesRead) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === void 0) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    }, write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i;
    } }, default_tty_ops: { get_char(tty) {
      return FS_stdin_getChar();
    }, put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output?.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }, ioctl_tcgets(tty) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    }, ioctl_tiocgwinsz(tty) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output?.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    } } };
    var mmapAlloc = (size) => {
      abort();
    };
    var MEMFS = { ops_table: null, mount(mount) {
      return MEMFS.createNode(null, "/", 16895, 0);
    }, createNode(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      MEMFS.ops_table ||= { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = MEMFS.emptyFileContents ??= new Uint8Array(0);
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.atime = node.mtime = node.ctime = Date.now();
      if (parent) {
        parent.contents[name] = node;
        parent.atime = parent.mtime = parent.ctime = node.atime;
      }
      return node;
    }, getFileDataAsTypedArray(node) {
      return node.contents.subarray(0, node.usedBytes);
    }, expandFileStorage(node, newCapacity) {
      var prevCapacity = node.contents.length;
      if (prevCapacity >= newCapacity) return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
      if (prevCapacity) newCapacity = Math.max(newCapacity, 256);
      var oldContents = MEMFS.getFileDataAsTypedArray(node);
      node.contents = new Uint8Array(newCapacity);
      node.contents.set(oldContents);
    }, resizeFileStorage(node, newSize) {
      if (node.usedBytes == newSize) return;
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      node.usedBytes = newSize;
    }, node_ops: { getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.atime);
      attr.mtime = new Date(node.mtime);
      attr.ctime = new Date(node.ctime);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    }, setattr(node, attr) {
      for (const key of ["mode", "atime", "mtime", "ctime"]) {
        if (attr[key] != null) {
          node[key] = attr[key];
        }
      }
      if (attr.size !== void 0) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    }, lookup(parent, name) {
      if (!MEMFS.doesNotExistError) {
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
      }
      throw MEMFS.doesNotExistError;
    }, mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    }, rename(old_node, new_dir, new_name) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (new_node) {
        if (FS.isDir(old_node.mode)) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
        FS.hashRemoveNode(new_node);
      }
      delete old_node.parent.contents[old_node.name];
      new_dir.contents[new_name] = old_node;
      old_node.name = new_name;
      new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
    }, unlink(parent, name) {
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    }, rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    }, readdir(node) {
      return [".", "..", ...Object.keys(node.contents)];
    }, symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    }, readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    } }, stream_ops: { read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      buffer.set(contents.subarray(position, position + size), offset);
      return size;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.mtime = node.ctime = Date.now();
      if (canOwn) {
        node.contents = buffer.subarray(offset, offset + length);
        node.usedBytes = length;
      } else if (!node.usedBytes && !position) {
        node.contents = buffer.slice(offset, offset + length);
        node.usedBytes = length;
      } else {
        MEMFS.expandFileStorage(node, position + length);
        node.contents.set(buffer.subarray(offset, offset + length), position);
        node.usedBytes = Math.max(node.usedBytes, position + length);
      }
      return length;
    }, llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    }, mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          HEAP8.set(contents, ptr);
        }
      }
      return { ptr, allocated };
    }, msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    } } };
    var FS_modeStringToFlags = (str) => {
      if (typeof str != "string") return str;
      var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
      var flags = flagModes[str];
      if (typeof flags == "undefined") {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
    var FS_fileDataToTypedArray = (data) => {
      if (typeof data == "string") {
        data = intArrayFromString(data, true);
      }
      if (!data.subarray) {
        data = new Uint8Array(data);
      }
      return data;
    };
    var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
    var asyncLoad = async (url) => {
      var arrayBuffer = await readAsync(url);
      return new Uint8Array(arrayBuffer);
    };
    var FS_createDataFile = (...args) => FS.createDataFile(...args);
    var getUniqueRunDependency = (id) => id;
    var dependenciesPromise = null;
    var resolveRunDependencies = async () => dependenciesPromise;
    var runDependencies = 0;
    var dependenciesPromiseResolve = null;
    var removeRunDependency = (id) => {
      runDependencies--;
      Module["monitorRunDependencies"]?.(runDependencies);
      if (!runDependencies) {
        dependenciesPromiseResolve();
      }
    };
    var addRunDependency = (id) => {
      if (!runDependencies) {
        dependenciesPromise = new Promise((resolve) => dependenciesPromiseResolve = resolve);
      }
      runDependencies++;
      Module["monitorRunDependencies"]?.(runDependencies);
    };
    var preloadPlugins = [];
    var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
      if (typeof Browser != "undefined") Browser.init();
      for (var plugin of preloadPlugins) {
        if (plugin["canHandle"](fullname)) {
          return plugin["handle"](byteArray, fullname);
        }
      }
      return byteArray;
    };
    var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`);
      addRunDependency(dep);
      try {
        var byteArray = url;
        if (typeof url == "string") {
          byteArray = await asyncLoad(url);
        }
        byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
        preFinish?.();
        if (!dontCreateFile) {
          FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
        }
      } finally {
        removeRunDependency(dep);
      }
    };
    var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
    };
    var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, ErrnoError: class {
      name = "ErrnoError";
      constructor(errno) {
        this.errno = errno;
      }
    }, FSStream: class {
      shared = {};
      get object() {
        return this.node;
      }
      set object(val) {
        this.node = val;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(val) {
        this.shared.flags = val;
      }
      get position() {
        return this.shared.position;
      }
      set position(val) {
        this.shared.position = val;
      }
    }, FSNode: class {
      node_ops = {};
      stream_ops = {};
      readMode = 292 | 73;
      writeMode = 146;
      mounted = null;
      constructor(parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.rdev = rdev;
        this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(val) {
        val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(val) {
        val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return FS.isDir(this.mode);
      }
      get isDevice() {
        return FS.isChrdev(this.mode);
      }
      addListener(cb, exclusive = false) {
        var entry = { cb, exclusive };
        var listeners = this.listeners ??= /* @__PURE__ */ new Set();
        listeners.add(entry);
        return { listeners, entry };
      }
      notifyListeners(flags) {
        if (!this.listeners) return;
        var excl;
        for (var entry of this.listeners) {
          if (entry.exclusive) (excl ||= []).push(entry);
          else entry.cb(flags);
        }
        if (excl) {
          var i = (this.exclTurn || 0) % excl.length;
          this.exclTurn = i + 1;
          excl[i].cb(flags);
        }
      }
    }, lookupPath(path, opts = {}) {
      if (!path) {
        throw new FS.ErrnoError(44);
      }
      opts.follow_mount ??= true;
      if (!PATH.isAbs(path)) {
        path = FS.cwd() + "/" + path;
      }
      linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
        var parts = path.split("/").filter((p) => !!p);
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          if (parts[i] === ".") {
            continue;
          }
          if (parts[i] === "..") {
            current_path = PATH.dirname(current_path);
            if (FS.isRoot(current)) {
              path = current_path + "/" + parts.slice(i + 1).join("/");
              nlinks--;
              continue linkloop;
            } else {
              current = current.parent;
            }
            continue;
          }
          current_path = PATH.join2(current_path, parts[i]);
          try {
            current = FS.lookupNode(current, parts[i]);
          } catch (e) {
            if (e?.errno === 44 && islast && opts.noent_okay) {
              return { path: current_path };
            }
            throw e;
          }
          if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
            current = current.mounted.root;
          }
          if (FS.isLink(current.mode) && (!islast || opts.follow)) {
            if (!current.node_ops.readlink) {
              throw new FS.ErrnoError(52);
            }
            var link = current.node_ops.readlink(current);
            if (!PATH.isAbs(link)) {
              link = PATH.dirname(current_path) + "/" + link;
            }
            path = link + "/" + parts.slice(i + 1).join("/");
            continue linkloop;
          }
        }
        return { path: current_path, node: current };
      }
      throw new FS.ErrnoError(32);
    }, getPath(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path) return mount;
          return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
        }
        path = path ? `${node.name}/${path}` : node.name;
        node = node.parent;
      }
    }, hashName(parentid, name) {
      var hash = 0;
      for (var i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
      }
      return (parentid + hash >>> 0) % FS.nameTable.length;
    }, hashAddNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    }, hashRemoveNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    }, lookupNode(parent, name) {
      var errCode = FS.mayLookup(parent);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    }, createNode(parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    }, destroyNode(node) {
      FS.hashRemoveNode(node);
    }, isRoot(node) {
      return node === node.parent;
    }, isMountpoint(node) {
      return !!node.mounted;
    }, isFile(mode) {
      return (mode & 61440) === 32768;
    }, isDir(mode) {
      return (mode & 61440) === 16384;
    }, isLink(mode) {
      return (mode & 61440) === 40960;
    }, isChrdev(mode) {
      return (mode & 61440) === 8192;
    }, isBlkdev(mode) {
      return (mode & 61440) === 24576;
    }, isFIFO(mode) {
      return (mode & 61440) === 4096;
    }, isSocket(mode) {
      return (mode & 49152) === 49152;
    }, flagsToPermissionString(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    }, nodePermissions(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.includes("r") && !(node.mode & 292)) {
        return 2;
      }
      if (perms.includes("w") && !(node.mode & 146)) {
        return 2;
      }
      if (perms.includes("x") && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    }, mayLookup(dir) {
      if (!FS.isDir(dir.mode)) return 54;
      var errCode = FS.nodePermissions(dir, "x");
      if (errCode) return errCode;
      if (!dir.node_ops.lookup) return 2;
      return 0;
    }, mayCreate(dir, name) {
      if (!FS.isDir(dir.mode)) {
        return 54;
      }
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {
      }
      return FS.nodePermissions(dir, "wx");
    }, mayDelete(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var errCode = FS.nodePermissions(dir, "wx");
      if (errCode) {
        return errCode;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else if (FS.isDir(node.mode)) {
        return 31;
      }
      return 0;
    }, mayOpen(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      }
      var mode = FS.flagsToPermissionString(flags);
      if (FS.isDir(node.mode)) {
        if (mode !== "r" || flags & (512 | 64)) {
          return 31;
        }
      }
      return FS.nodePermissions(node, mode);
    }, checkOpExists(op, err2) {
      if (!op) {
        throw new FS.ErrnoError(err2);
      }
      return op;
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    }, getStreamChecked(fd) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      return stream;
    }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
      stream = Object.assign(new FS.FSStream(), stream);
      if (fd == -1) {
        fd = FS.nextfd();
      }
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    }, closeStream(fd) {
      FS.streams[fd] = null;
    }, dupStream(origStream, fd = -1) {
      var stream = FS.createStream(origStream, fd);
      stream.stream_ops?.dup?.(stream);
      return stream;
    }, doSetAttr(stream, node, attr) {
      var setattr = stream?.stream_ops.setattr;
      var arg = setattr ? stream : node;
      setattr ??= node.node_ops.setattr;
      FS.checkOpExists(setattr, 63);
      try {
        setattr(arg, attr);
      } catch (e) {
        if (e instanceof RangeError) {
          throw new FS.ErrnoError(22);
        }
        throw e;
      }
    }, chrdev_stream_ops: { open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      stream.stream_ops.open?.(stream);
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push(...m.mounts);
      }
      return mounts;
    }, syncfs(populate, callback) {
      if (typeof populate == "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(errCode) {
        FS.syncFSRequests--;
        return callback(errCode);
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(errCode);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      for (var mount of mounts) {
        if (mount.type.syncfs) {
          mount.type.syncfs(mount, populate, done);
        } else {
          done(null);
        }
      }
    }, mount(type, opts, mountpoint) {
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = { type, opts, mountpoint, mounts: [] };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    }, unmount(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      for (var [hash, current] of Object.entries(FS.nameTable)) {
        while (current) {
          var next = current.name_next;
          if (mounts.includes(current.mount)) {
            FS.destroyNode(current);
          }
          current = next;
        }
      }
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      node.mount.mounts.splice(idx, 1);
    }, lookup(parent, name) {
      return parent.node_ops.lookup(parent, name);
    }, mknod(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name) {
        throw new FS.ErrnoError(28);
      }
      if (name === "." || name === "..") {
        throw new FS.ErrnoError(20);
      }
      var errCode = FS.mayCreate(parent, name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    }, statfs(path) {
      return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
    }, statfsStream(stream) {
      return FS.statfsNode(stream.node);
    }, statfsNode(node) {
      var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
      if (node.node_ops.statfs) {
        Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
      }
      return rtn;
    }, create(path, mode = 438) {
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    }, mkdir(path, mode = 511) {
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    }, mkdirTree(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var dir of dirs) {
        if (!dir) continue;
        if (d || PATH.isAbs(path)) d += "/";
        d += dir;
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
      }
    }, mkdev(path, mode, dev) {
      if (typeof dev == "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    }, symlink(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    }, link(oldpath, newpath, flags) {
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.link) {
        throw new FS.ErrnoError(34);
      }
      return parent.node_ops.link(parent, newname, oldpath, flags);
    }, rename(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var errCode = FS.mayDelete(old_dir, old_name, isdir);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
        old_node.parent = new_dir;
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
    }, rmdir(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, true);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
    }, readdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
      return readdir(node);
    }, unlink(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, false);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
    }, readlink(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return link.node_ops.readlink(link);
    }, stat(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
      return getattr(node);
    }, fstat(fd) {
      var stream = FS.getStreamChecked(fd);
      var node = stream.node;
      var getattr = stream.stream_ops.getattr;
      var arg = getattr ? stream : node;
      getattr ??= node.node_ops.getattr;
      FS.checkOpExists(getattr, 63);
      return getattr(arg);
    }, lstat(path) {
      return FS.stat(path, true);
    }, doChmod(stream, node, mode, dontFollow) {
      FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
    }, chmod(path, mode, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChmod(null, node, mode, dontFollow);
    }, lchmod(path, mode) {
      FS.chmod(path, mode, true);
    }, fchmod(fd, mode) {
      var stream = FS.getStreamChecked(fd);
      FS.doChmod(stream, stream.node, mode, false);
    }, doChown(stream, node, dontFollow) {
      FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
    }, chown(path, uid, gid, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChown(null, node, dontFollow);
    }, lchown(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    }, fchown(fd, uid, gid) {
      var stream = FS.getStreamChecked(fd);
      FS.doChown(stream, stream.node, false);
    }, doTruncate(stream, node, len) {
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.nodePermissions(node, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
    }, truncate(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doTruncate(null, node, len);
    }, ftruncate(fd, len) {
      var stream = FS.getStreamChecked(fd);
      if (len < 0 || (stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.doTruncate(stream, stream.node, len);
    }, utime(path, atime, mtime, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      FS.doSetAttr(null, lookup.node, { atime, mtime, dontFollow });
    }, open(path, flags, mode = 438) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = FS_modeStringToFlags(flags);
      if (flags & 64) {
        mode = mode & 4095 | 32768;
      } else {
        mode = 0;
      }
      var node;
      var isDirPath;
      if (typeof path == "object") {
        node = path;
      } else {
        isDirPath = path.endsWith("/");
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
        node = lookup.node;
        path = lookup.path;
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else if (isDirPath) {
          throw new FS.ErrnoError(31);
        } else {
          node = FS.mknod(path, mode | 511, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      if (flags & 512 && !created) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512 | 131072);
      var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (created) {
        FS.chmod(node, mode & 511);
      }
      return stream;
    }, close(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents) stream.getdents = null;
      stream.node?.notifyListeners(32);
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    }, isClosed(stream) {
      return stream.fd === null;
    }, llseek(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    }, read(stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
      if (!seeking) stream.position += bytesRead;
      return bytesRead;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
      if (!seeking) stream.position += bytesWritten;
      return bytesWritten;
    }, mmap(stream, length, position, prot, flags) {
      if (prot & 2 && !(flags & 2) && (stream.flags & 2097155) !== 2) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      if (!length) {
        throw new FS.ErrnoError(28);
      }
      return stream.stream_ops.mmap(stream, length, position, prot, flags);
    }, msync(stream, buffer, offset, length, mmapFlags) {
      if (!stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    }, ioctl(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    }, readFile(path, opts = {}) {
      opts.flags = opts.flags ?? 0;
      opts.encoding = opts.encoding ?? "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        abort(`Invalid encoding type "${opts.encoding}"`);
      }
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        buf = UTF8ArrayToString(buf);
      }
      FS.close(stream);
      return buf;
    }, writeFile(path, data, opts = {}) {
      opts.flags = opts.flags ?? 577;
      var stream = FS.open(path, opts.flags, opts.mode);
      data = FS_fileDataToTypedArray(data);
      FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
      FS.close(stream);
    }, cwd: () => FS.currentPath, chdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var errCode = FS.nodePermissions(lookup.node, "x");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.currentPath = lookup.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var randomBuffer = new Uint8Array(1024), randomLeft = 0;
      var randomByte = () => {
        if (!randomLeft) {
          randomFill(randomBuffer);
          randomLeft = randomBuffer.byteLength;
        }
        return randomBuffer[--randomLeft];
      };
      FS.createDevice("/dev", "random", randomByte);
      FS.createDevice("/dev", "urandom", randomByte);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var proc_self = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount({ mount() {
        var node = FS.createNode(proc_self, "fd", 16895, 73);
        node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
        node.node_ops = { lookup(parent, name) {
          var fd = +name;
          var stream = FS.getStreamChecked(fd);
          var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
          ret.parent = ret;
          return ret;
        }, readdir() {
          return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
        } };
        return node;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams(input, output, error) {
      if (input) {
        FS.createDevice("/dev", "stdin", input);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (output) {
        FS.createDevice("/dev", "stdout", null, output);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (error) {
        FS.createDevice("/dev", "stderr", null, error);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      var stdin = FS.open("/dev/stdin", 0);
      var stdout = FS.open("/dev/stdout", 1);
      var stderr = FS.open("/dev/stderr", 1);
    }, staticInit() {
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = { MEMFS };
    }, init(input, output, error) {
      FS.initialized = true;
      input ??= Module["stdin"];
      output ??= Module["stdout"];
      error ??= Module["stderr"];
      FS.createStandardStreams(input, output, error);
    }, quit() {
      FS.initialized = false;
      for (var stream of FS.streams) {
        if (stream) {
          FS.close(stream);
        }
      }
    }, findObject(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (!ret.exists) {
        return null;
      }
      return ret.object;
    }, analyzePath(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {
      }
      var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      return ret;
    }, createPath(parent, path, canRead, canWrite) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part) continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
        parent = current;
      }
      return current;
    }, createFile(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(canRead, canWrite);
      return FS.create(path, mode);
    }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
      var path = name;
      if (parent) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        path = name ? PATH.join2(parent, name) : parent;
      }
      var mode = FS_getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        data = FS_fileDataToTypedArray(data);
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, 577);
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
    }, createDevice(parent, name, input, output) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(!!input, !!output);
      FS.createDevice.major ??= 64;
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, { open(stream) {
        stream.seekable = false;
      }, close(stream) {
        if (output?.buffer?.length) {
          output(10);
        }
      }, read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && !bytesRead) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      }, write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i;
      } });
      return FS.mkdev(path, mode, dev);
    }, forceLoadFile(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
      if (globalThis.XMLHttpRequest) {
        abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else {
        try {
          obj.contents = readBinary(obj.url);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      }
    }, createLazyFile(parent, name, url, canRead, canWrite) {
      class LazyUint8Array {
        lengthKnown = false;
        chunks = [];
        get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return void 0;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        }
        setDataGetter(getter) {
          this.getter = getter;
        }
        cacheLength() {
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr.status}`);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024;
          if (!hasByteServing) chunkSize = datalength;
          var doXHR = (from, to) => {
            if (from > to) abort(`invalid range (${from}, ${to}) or no bytes requested!`);
            if (to > datalength - 1) abort(`only ${datalength} bytes available! programmer error!`);
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            if (datalength !== chunkSize) xhr2.setRequestHeader("Range", `bytes=${from}-${to}`);
            xhr2.responseType = "arraybuffer";
            if (xhr2.overrideMimeType) {
              xhr2.overrideMimeType("text/plain; charset=x-user-defined");
            }
            xhr2.send(null);
            if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr2.status}`);
            if (xhr2.response !== void 0) {
              return new Uint8Array(xhr2.response || []);
            }
            return intArrayFromString(xhr2.responseText ?? "", true);
          };
          var lazyArray2 = this;
          lazyArray2.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum + 1) * chunkSize - 1;
            end = Math.min(end, datalength - 1);
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
              lazyArray2.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") abort("doXHR failed!");
            return lazyArray2.chunks[chunkNum];
          });
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1;
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        get length() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._length;
        }
        get chunkSize() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._chunkSize;
        }
      }
      if (globalThis.XMLHttpRequest) {
        if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
        var lazyArray = new LazyUint8Array();
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var stream_ops = {};
      for (const [key, fn] of Object.entries(node.stream_ops)) {
        stream_ops[key] = (...args) => {
          FS.forceLoadFile(node);
          return fn(...args);
        };
      }
      function writeChunks(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= contents.length) return 0;
        var size = Math.min(contents.length - position, length);
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i];
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i);
          }
        }
        return size;
      }
      stream_ops.read = (stream, buffer, offset, length, position) => {
        FS.forceLoadFile(node);
        return writeChunks(stream, buffer, offset, length, position);
      };
      stream_ops.mmap = (stream, length, position, prot, flags) => {
        FS.forceLoadFile(node);
        var ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        writeChunks(stream, HEAP8, ptr, length, position);
        return { ptr, allocated: true };
      };
      node.stream_ops = stream_ops;
      return node;
    } };
    var SYSCALLS = { currentUmask: 18, calculateAt(dirfd, path, allowEmpty) {
      if (PATH.isAbs(path)) {
        return path;
      }
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
        dir = dirstream.path;
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44);
        }
        return dir;
      }
      return dir + "/" + path;
    }, writeStat(buf, stat) {
      HEAPU32[buf >> 2] = stat.dev;
      HEAPU32[buf + 4 >> 2] = stat.mode;
      HEAPU32[buf + 8 >> 2] = stat.nlink;
      HEAPU32[buf + 12 >> 2] = stat.uid;
      HEAPU32[buf + 16 >> 2] = stat.gid;
      HEAPU32[buf + 20 >> 2] = stat.rdev;
      HEAP64[buf + 24 >> 3] = BigInt(stat.size);
      HEAP32[buf + 32 >> 2] = 4096;
      HEAP32[buf + 36 >> 2] = stat.blocks;
      var atime = stat.atime.getTime();
      var mtime = stat.mtime.getTime();
      var ctime = stat.ctime.getTime();
      HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
      HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
      HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
      HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
      return 0;
    }, writeStatFs(buf, stats) {
      HEAPU32[buf + 4 >> 2] = stats.bsize;
      HEAPU32[buf + 60 >> 2] = stats.bsize;
      HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
      HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
      HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
      HEAP64[buf + 32 >> 3] = BigInt(stats.files);
      HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
      HEAPU32[buf + 48 >> 2] = stats.fsid;
      HEAPU32[buf + 64 >> 2] = stats.flags;
      HEAPU32[buf + 56 >> 2] = stats.namelen;
    }, doMsync(addr, stream, len, flags, offset) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (flags & 2) {
        return 0;
      }
      var buffer = HEAPU8.subarray(addr, addr + len);
      FS.msync(stream, buffer, offset, len, flags);
    }, getStreamFromFD(fd) {
      var stream = FS.getStreamChecked(fd);
      return stream;
    }, varargs: void 0, getStr(ptr) {
      var ret = UTF8ToString(ptr);
      return ret;
    } };
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        try {
          var curr = FS.read(stream, HEAP8, ptr, len, offset);
        } catch (e) {
          if (ret > 0 && e instanceof FS.ErrnoError && (e.errno == 6 || e.errno == 6)) {
            break;
          }
          throw e;
        }
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break;
        if (typeof offset != "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num2 = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num2;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var INT53_MAX = 9007199254740992;
    var INT53_MIN = -9007199254740992;
    var bigintToI53Checked = (num2) => num2 < INT53_MIN || num2 > INT53_MAX ? NaN : Number(num2);
    function _fd_seek(fd, offset, whence, newOffset) {
      offset = bigintToI53Checked(offset);
      try {
        if (isNaN(offset)) return 22;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        HEAP64[newOffset >> 3] = BigInt(stream.position);
        if (stream.getdents && !offset && whence === 0) stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var doWritev = (stream, iov, iovcnt, offset) => {
      if (iovcnt == 1) {
        return FS.write(stream, HEAP8, HEAPU32[iov >> 2], HEAPU32[iov + 4 >> 2], offset);
      }
      var total = 0;
      for (var i = 0, p = iov; i < iovcnt; i++, p += 8) {
        total += HEAPU32[p + 4 >> 2];
      }
      var view = new Uint8Array(total);
      var voff = 0;
      for (var i = 0; i < iovcnt; i++, iov += 8) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        view.set(HEAPU8.subarray(ptr, ptr + len), voff);
        voff += len;
      }
      return FS.write(stream, view, 0, total, offset);
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num2 = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num2;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.preloadFile = FS_preloadFile;
    FS.staticInit();
    {
      if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
      if (Module["print"]) out = Module["print"];
      if (Module["printErr"]) err = Module["printErr"];
      if (Module["arguments"]) programArgs = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      var preInit = Module["preInit"];
      if (preInit) {
        if (typeof preInit == "function") Module["preInit"] = preInit = [preInit];
        while (preInit.length > 0) {
          preInit.shift()();
        }
      }
    }
    var ___getTypeName, _free, _malloc, memory, __indirect_function_table, wasmMemory, wasmTable;
    function assignWasmExports(wasmExports2) {
      ___getTypeName = wasmExports2["L"];
      _free = wasmExports2["M"];
      _malloc = wasmExports2["O"];
      memory = wasmMemory = wasmExports2["J"];
      __indirect_function_table = wasmTable = wasmExports2["N"];
    }
    var wasmImports = { b: ___cxa_throw, B: __abort_js, q: __embind_register_bigint, F: __embind_register_bool, D: __embind_register_emval, p: __embind_register_float, r: __embind_register_function, j: __embind_register_integer, i: __embind_register_memory_view, E: __embind_register_std_string, l: __embind_register_std_wstring, G: __embind_register_void, g: __emval_create_invoker, a: __emval_decref, s: __emval_get_global, d: __emval_get_property, h: __emval_incref, f: __emval_invoke, n: __emval_is_number, I: __emval_is_string, H: __emval_new_array, c: __emval_new_cstring, m: __emval_new_object, e: __emval_run_destructors, k: __emval_set_property, v: __tzset_js, C: _emscripten_date_now, A: _emscripten_get_heap_max, z: _emscripten_resize_heap, t: _environ_get, u: _environ_sizes_get, w: _fd_close, x: _fd_read, y: _fd_seek, o: _fd_write };
    async function run() {
      preRun();
      if (runDependencies) {
        await resolveRunDependencies();
      }
      var setStatus = Module["setStatus"];
      if (setStatus) {
        setStatus("Running...");
        await new Promise((resolve) => setTimeout(resolve, 1));
        setTimeout(setStatus, 1, "");
      }
      if (ABORT) return;
      initRuntime();
      Module["onRuntimeInitialized"]?.();
      postRun();
    }
    var wasmExports;
    wasmExports = await createWasm();
    await run();
    ;
    return Module;
  }
  var bandage_layout_default;
  var init_bandage_layout = __esm({
    "../bandage-core/src/bandage/bandage-layout.js"() {
      "use strict";
      bandage_layout_default = createBandageLayoutModule;
    }
  });

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    gfaFigureData: () => gfaFigureData
  });

  // ../bandage-core/src/anchoredNodes.ts
  var REFERENCE_RANK = 0;
  function isAnchored(node) {
    return node.stable !== void 0;
  }
  function isBackbone(node) {
    return node.stable?.rank === REFERENCE_RANK;
  }
  function isOffReference(node) {
    return node.stable !== void 0 && node.stable.rank > REFERENCE_RANK;
  }
  function backboneNodes(graph) {
    return graph.nodes.filter(isBackbone);
  }
  function overlapsWindow(node, window2) {
    return node.stable.start < window2.end && node.stable.start + node.length > window2.start;
  }
  function backbonePositions(backbone) {
    const positions = {};
    for (const node of backbone) {
      positions[node.id] = [
        { x: node.stable.start, y: 0 },
        { x: node.stable.start + node.length, y: 0 }
      ];
    }
    return positions;
  }
  function firstNodeAtOrAfter(nodes, bp) {
    let lo = 0;
    let hi = nodes.length;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      if (nodes[mid].stable.start < bp) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
  function backboneSpan(backbone) {
    let min = Infinity;
    let max = -Infinity;
    for (const node of backbone) {
      min = Math.min(min, node.stable.start);
      max = Math.max(max, node.stable.start + node.length);
    }
    return max - min;
  }
  function referenceSpan(backbone, region) {
    return region && region.end > region.start ? region.end - region.start : backboneSpan(backbone);
  }

  // ../bandage-core/src/colorSchemes.ts
  var COLOR_SCHEMES = [
    // Mirrors `layoutModes`' 'auto': a value the model resolves rather than a
    // colour of its own. It exists because 'uniform' was the default, so a
    // launched graph opened flat grey and both tutorials spent a step saying "now
    // pick a colour" — one figure literally drives that click. A graph with
    // reference coordinates resolves to 'reference-position', which is the one
    // ramp a linear track beside it can be painted with too; a graph with none
    // keeps 'uniform', because there the ramp would be a hue nothing earned.
    //
    // Resolve through `effectiveColorScheme`; the dropdown reads the raw prop, so
    // "Auto" stays selectable and visible as what it is.
    { value: "auto", label: "Auto" },
    { value: "uniform", label: "Uniform" },
    { value: "random", label: "Random" },
    { value: "rainbow", label: "Rainbow" },
    { value: "depth", label: "Depth" },
    { value: "node-length", label: "Node length" },
    { value: "stable-rank", label: "Stable rank" },
    { value: "reference-position", label: "Reference position" },
    { value: "grey", label: "Grey" }
  ];
  var COLOR_SCHEME_VALUES = COLOR_SCHEMES.map((s) => s.value);
  function resolveColorScheme(scheme, graph) {
    return scheme !== "auto" ? scheme : graph?.anchoredBy ? "reference-position" : "uniform";
  }

  // ../bandage-core/src/layout/rowSpacing.ts
  var ROW_HEIGHT_PX = 20;

  // ../bandage-core/src/util/geometry.ts
  function projectLine(x1, y1, x2, y2, distance) {
    const d = Math.hypot(y2 - y1, x2 - x1);
    if (d === 0) {
      return [x2, y2];
    }
    const vx = (x2 - x1) / d;
    const vy = (y2 - y1) / d;
    return [x2 + distance * vx, y2 + distance * vy];
  }
  function curvePointAt(c, t) {
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const d = 3 * u * t * t;
    const e = t * t * t;
    return {
      x: a * c.x0 + b * c.cx0 + d * c.cx1 + e * c.x1,
      y: a * c.y0 + b * c.cy0 + d * c.cy1 + e * c.y1
    };
  }
  function subCurve(c, t0, t1) {
    const p0 = curvePointAt(c, t0);
    const p1 = curvePointAt(c, t1);
    const dt = (t1 - t0) / 3;
    const d0 = curveTangentAt(c, t0);
    const d1 = curveTangentAt(c, t1);
    return {
      x0: p0.x,
      y0: p0.y,
      cx0: p0.x + d0.x * dt,
      cy0: p0.y + d0.y * dt,
      cx1: p1.x - d1.x * dt,
      cy1: p1.y - d1.y * dt,
      x1: p1.x,
      y1: p1.y
    };
  }
  function curveTangentAt(c, t) {
    const u = 1 - t;
    const a = 3 * u * u;
    const b = 6 * u * t;
    const d = 3 * t * t;
    return {
      x: a * (c.cx0 - c.x0) + b * (c.cx1 - c.cx0) + d * (c.x1 - c.cx1),
      y: a * (c.cy0 - c.y0) + b * (c.cy1 - c.cy0) + d * (c.y1 - c.cy1)
    };
  }
  function dashCurves(curves, dashWorld) {
    const lengths = curves.map(
      (c) => Math.hypot(c.cx0 - c.x0, c.cy0 - c.y0) + Math.hypot(c.cx1 - c.cx0, c.cy1 - c.cy0) + Math.hypot(c.x1 - c.cx1, c.y1 - c.cy1)
    );
    const total = lengths.reduce((a, b) => a + b, 0);
    const spans = Math.max(3, Math.round(total / dashWorld) | 1);
    const out = [];
    for (let i = 0; i < spans; i += 2) {
      const from = i / spans * total;
      const to = (i + 1) / spans * total;
      const dash = [];
      let start = 0;
      curves.forEach((c, k) => {
        const length = lengths[k];
        const end = start + length;
        if (length > 0 && end > from && start < to) {
          dash.push(
            subCurve(
              c,
              Math.max(0, (from - start) / length),
              Math.min(1, (to - start) / length)
            )
          );
        }
        start = end;
      });
      if (dash.length) {
        out.push(dash);
      }
    }
    return out;
  }
  function translateCurves(curves, dx, dy) {
    const out = new Array(curves.length);
    for (let i = 0; i < curves.length; i++) {
      const c = curves[i];
      out[i] = {
        x0: c.x0 + dx,
        y0: c.y0 + dy,
        cx0: c.cx0 + dx,
        cy0: c.cy0 + dy,
        cx1: c.cx1 + dx,
        cy1: c.cy1 + dy,
        x1: c.x1 + dx,
        y1: c.y1 + dy
      };
    }
    return out;
  }
  function attachment(segments, side) {
    const last = segments.length - 1;
    return side === "end" ? { at: segments[last], inward: segments[last - 1] } : { at: segments[0], inward: segments[1] };
  }
  var TANGENT_SPAN_FACTOR = 0.5;
  var MAX_TANGENT = 80;
  function ownStrand(id) {
    return id.endsWith("-") ? "-" : "+";
  }
  function strandSides(edge) {
    const own = (id, strand) => (strand ?? ownStrand(id)) === ownStrand(id);
    return {
      from: own(edge.from, edge.fromStrand) ? "end" : "start",
      to: own(edge.to, edge.toStrand) ? "start" : "end"
    };
  }
  function spanOf(segments) {
    let min = Infinity;
    let max = -Infinity;
    for (const s of segments) {
      min = Math.min(min, s.x);
      max = Math.max(max, s.x);
    }
    return { min, max };
  }
  function distanceToSpan(x, span) {
    return Math.max(0, span.min - x, x - span.max);
  }
  function facingSide(segments, other2, tieBreak) {
    const startGap = distanceToSpan(segments[0].x, other2);
    const endGap = distanceToSpan(segments[segments.length - 1].x, other2);
    return startGap === endGap ? tieBreak : startGap < endGap ? "start" : "end";
  }
  function facingSides(fromSegments, toSegments) {
    return {
      from: facingSide(fromSegments, spanOf(toSegments), "end"),
      to: facingSide(toSegments, spanOf(fromSegments), "start")
    };
  }
  var laidSides = /* @__PURE__ */ new WeakMap();
  function heldFacingSides(fromSegments, toSegments) {
    let byTo = laidSides.get(fromSegments);
    if (!byTo) {
      byTo = /* @__PURE__ */ new WeakMap();
      laidSides.set(fromSegments, byTo);
    }
    let sides = byTo.get(toSegments);
    if (!sides) {
      sides = facingSides(fromSegments, toSegments);
      byTo.set(toSegments, sides);
    }
    return sides;
  }
  var APEX_FRACTION = 0.75;
  var BOW_CLEARANCE = 1.15;
  var ALONG_FRACTION = 0.35;
  var MAX_ROW_BOW_PX = 3 * ROW_HEIGHT_PX;
  function bowAround(p1x, p1y, p2x, p2y, toward, maxBow) {
    const chord = Math.hypot(p2x - p1x, p2y - p1y);
    const ux = chord === 0 ? 1 : (p2x - p1x) / chord;
    const uy = chord === 0 ? 0 : (p2y - p1y) / chord;
    let reach = 0;
    let minAlong = Infinity;
    let maxAlong = -Infinity;
    for (const p of toward) {
      const dx = p.x - p1x;
      const dy = p.y - p1y;
      const perp = dx * -uy + dy * ux;
      if (Math.abs(perp) > Math.abs(reach)) {
        reach = perp;
      }
      const along = dx * ux + dy * uy;
      minAlong = Math.min(minAlong, along);
      maxAlong = Math.max(maxAlong, along);
    }
    const span = toward.length ? maxAlong - minAlong : 0;
    const uncapped = Math.max(
      Math.abs(reach) * BOW_CLEARANCE / APEX_FRACTION,
      span * ALONG_FRACTION
    );
    const size = maxBow === void 0 ? uncapped : Math.min(uncapped, maxBow);
    return reach < 0 ? -size : size;
  }
  function yToXOf({ scaleX, scaleY }) {
    return scaleY / scaleX;
  }
  var PATH_RIBBON_SPACING = 3;
  function drawnDirection(a, b, yToX) {
    const dx = b.x - a.x;
    const dy = (b.y - a.y) * yToX;
    const len = Math.hypot(dx, dy);
    return len === 0 ? void 0 : { x: dx / len, y: dy / len };
  }
  function pathRibbonOffsets(fromSegments, toSegments, count, axis, spacing = PATH_RIBBON_SPACING) {
    const yToX = yToXOf(axis);
    const dir = drawnDirection(
      fromSegments[fromSegments.length - 1],
      toSegments[0],
      yToX
    ) ?? drawnDirection(fromSegments[0], fromSegments.at(-1), yToX) ?? drawnDirection(toSegments[0], toSegments.at(-1), yToX) ?? { x: 1, y: 0 };
    const offsets = [];
    for (let i = 0; i < count; i++) {
      const distance = (i - (count - 1) / 2) * spacing;
      offsets.push({ x: -dir.y * distance, y: dir.x * distance / yToX });
    }
    return offsets;
  }
  function scaleYOf(points, yToX) {
    return points.map((p) => ({ x: p.x, y: p.y * yToX }));
  }
  function unscaleYOf(curves, yToX) {
    for (const c of curves) {
      c.y0 /= yToX;
      c.cy0 /= yToX;
      c.cy1 /= yToX;
      c.y1 /= yToX;
    }
    return curves;
  }
  var SELF_LOOP_MIN_PX = 12;
  var SELF_LOOP_MAX_PX = 40;
  function selfLoopReach(segments, scale) {
    let length = 0;
    for (let i = 1; i < segments.length; i++) {
      length += Math.hypot(
        segments[i].x - segments[i - 1].x,
        segments[i].y - segments[i - 1].y
      );
    }
    const nodePx = length * scale;
    const reachPx = Math.min(
      SELF_LOOP_MAX_PX,
      Math.max(SELF_LOOP_MIN_PX, nodePx / 2)
    );
    return reachPx / Math.max(scale, Number.EPSILON);
  }
  function selfLinkOf(edge) {
    if (edge.from !== edge.to) {
      return false;
    }
    return edge.fromStrand && edge.toStrand && edge.fromStrand !== edge.toStrand ? edge.fromStrand === "+" ? "end" : "start" : true;
  }
  function edgeJoinOf(edge, stranded2 = false) {
    const self = selfLinkOf(edge);
    if (!stranded2) {
      return self;
    }
    const sides = strandSides(edge);
    return self === false ? sides : sides.from === sides.to ? sides.from : true;
  }
  function hairpinCurves(attach, reach, offsetX, offsetY) {
    const { at, inward } = attach;
    const dx = inward ? at.x - inward.x : 1;
    const dy = inward ? at.y - inward.y : 0;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const px = at.x + offsetX;
    const py = at.y + offsetY;
    const nearX = px + ux * reach / 3;
    const nearY = py + uy * reach / 3;
    const apexX = px + ux * reach;
    const apexY = py + uy * reach;
    const sideX = -uy * reach / 2;
    const sideY = ux * reach / 2;
    return [
      {
        x0: px,
        y0: py,
        cx0: nearX,
        cy0: nearY,
        cx1: apexX + sideX,
        cy1: apexY + sideY,
        x1: apexX,
        y1: apexY
      },
      {
        x0: apexX,
        y0: apexY,
        cx0: apexX - sideX,
        cy0: apexY - sideY,
        cx1: nearX,
        cy1: nearY,
        x1: px,
        y1: py
      }
    ];
  }
  function computeEdgeCurves(fromSegments, toSegments, join, offsetX, offsetY, axis, bypassed = [], maxBowIn) {
    const scale = axis.scaleX;
    const yToX = yToXOf(axis);
    const maxBow = maxBowIn ?? (axis.pixelRows ? MAX_ROW_BOW_PX : void 0);
    if (join === false) {
      join = heldFacingSides(fromSegments, toSegments);
    }
    if (yToX !== 1) {
      return unscaleYOf(
        computeEdgeCurves(
          scaleYOf(fromSegments, yToX),
          scaleYOf(toSegments, yToX),
          join,
          offsetX,
          offsetY * yToX,
          { scaleX: scale, scaleY: scale },
          scaleYOf(bypassed, yToX),
          // the cap is a y measure and the body works in x units, so it converts
          // with everything else that crosses this boundary
          maxBow === void 0 ? void 0 : maxBow * yToX
        ),
        yToX
      );
    }
    if (typeof join === "string") {
      return hairpinCurves(
        attachment(fromSegments, join),
        selfLoopReach(fromSegments, scale),
        offsetX,
        offsetY
      );
    }
    const loop = join === true;
    const sides = join === true ? { from: "end", to: "start" } : join;
    const fromAttach = attachment(fromSegments, sides.from);
    const toAttach = attachment(toSegments, sides.to);
    const fromEnd = fromAttach.at;
    const toStart = toAttach.at;
    const p1x = fromEnd.x + offsetX;
    const p1y = fromEnd.y + offsetY;
    const p2x = toStart.x + offsetX;
    const p2y = toStart.y + offsetY;
    if (loop) {
      let segDirX = 1;
      let segDirY = 0;
      if (fromAttach.inward) {
        const dx = fromEnd.x - fromAttach.inward.x;
        const dy = fromEnd.y - fromAttach.inward.y;
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          segDirX = dx / len;
          segDirY = dy / len;
        }
      }
      const ext = selfLoopReach(fromSegments, scale);
      const perpX = -segDirY;
      const perpY = segDirX;
      const midX = (fromEnd.x + toStart.x) / 2 + offsetX + perpX * ext;
      const midY = (fromEnd.y + toStart.y) / 2 + offsetY + perpY * ext;
      const cp1x = p1x + segDirX * ext;
      const cp1y = p1y + segDirY * ext;
      const cp2x = p2x - segDirX * ext;
      const cp2y = p2y - segDirY * ext;
      return [
        {
          x0: p1x,
          y0: p1y,
          cx0: cp1x,
          cy0: cp1y,
          cx1: cp1x + perpX * ext,
          cy1: cp1y + perpY * ext,
          x1: midX,
          y1: midY
        },
        {
          x0: midX,
          y0: midY,
          cx0: cp2x + perpX * ext,
          cy0: cp2y + perpY * ext,
          cx1: cp2x,
          cy1: cp2y,
          x1: p2x,
          y1: p2y
        }
      ];
    } else {
      const fromPrev = fromAttach.inward ?? {
        x: fromEnd.x - (toStart.x - fromEnd.x),
        y: fromEnd.y - (toStart.y - fromEnd.y)
      };
      const toNext = toAttach.inward ?? {
        x: toStart.x - (fromEnd.x - toStart.x),
        y: toStart.y - (fromEnd.y - toStart.y)
      };
      const dist = Math.hypot(p2x - p1x, p2y - p1y);
      const tangentProj = (prev, at, towardX, towardY) => {
        const dx = at.x - prev.x;
        const dy = at.y - prev.y;
        const len = Math.hypot(dx, dy);
        const along = len === 0 ? 0 : (towardX * dx + towardY * dy) / len;
        return Math.max(
          0,
          Math.min(dist * TANGENT_SPAN_FACTOR, MAX_TANGENT, along * 0.5)
        );
      };
      const towardToX = toStart.x - fromEnd.x;
      const towardToY = toStart.y - fromEnd.y;
      const [cx1, cy1] = projectLine(
        fromPrev.x,
        fromPrev.y,
        fromEnd.x,
        fromEnd.y,
        tangentProj(fromPrev, fromEnd, towardToX, towardToY)
      );
      const [cx2, cy2] = projectLine(
        toNext.x,
        toNext.y,
        toStart.x,
        toStart.y,
        tangentProj(toNext, toStart, -towardToX, -towardToY)
      );
      const bulge = bypassed.length ? bowAround(p1x, p1y, p2x, p2y, bypassed, maxBow) : 0;
      const chordLen = dist === 0 ? 1 : dist;
      const ux = (p2x - p1x) / chordLen;
      const uy = (p2y - p1y) / chordLen;
      const bulgeX = -uy * bulge;
      const bulgeY = ux * bulge;
      const spreadX = ux * Math.abs(bulge);
      const spreadY = uy * Math.abs(bulge);
      return [
        {
          x0: p1x,
          y0: p1y,
          cx0: cx1 + offsetX + bulgeX - spreadX,
          cy0: cy1 + offsetY + bulgeY - spreadY,
          cx1: cx2 + offsetX + bulgeX + spreadX,
          cy1: cy2 + offsetY + bulgeY + spreadY,
          x1: p2x,
          y1: p2y
        }
      ];
    }
  }
  function nearerEnd(segments, to) {
    const start = segments[0];
    const end = segments.at(-1);
    return Math.hypot(start.x - to.x, start.y - to.y) < Math.hypot(end.x - to.x, end.y - to.y) ? "start" : "end";
  }
  function routedEdgeCurves(fromSegments, toSegments, route, sides) {
    const fromAttach = attachment(
      fromSegments,
      sides?.from ?? nearerEnd(fromSegments, route[0])
    );
    const toAttach = attachment(
      toSegments,
      sides?.to ?? nearerEnd(toSegments, route.at(-1))
    );
    const points = [fromAttach.at, ...route, toAttach.at];
    const tangent = (i) => {
      const p = points[i];
      const span = (q) => Math.hypot(q.x - p.x, q.y - p.y);
      const along = (inward, next) => {
        const len = inward ? span(inward) : 0;
        const reach = span(next);
        return len === 0 ? { x: next.x - p.x, y: next.y - p.y } : {
          x: (p.x - inward.x) / len * reach,
          y: (p.y - inward.y) / len * reach
        };
      };
      if (i === 0) {
        return along(fromAttach.inward, points[1]);
      }
      if (i === points.length - 1) {
        const out = along(toAttach.inward, points[i - 1]);
        return { x: -out.x, y: -out.y };
      }
      return {
        x: (points[i + 1].x - points[i - 1].x) / 2,
        y: (points[i + 1].y - points[i - 1].y) / 2
      };
    };
    const curves = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const ta = tangent(i);
      const tb = tangent(i + 1);
      curves.push({
        x0: a.x,
        y0: a.y,
        cx0: a.x + ta.x / 3,
        cy0: a.y + ta.y / 3,
        cx1: b.x - tb.x / 3,
        cy1: b.y - tb.y / 3,
        x1: b.x,
        y1: b.y
      });
    }
    return curves;
  }

  // ../bandage-core/src/deletionEdges.ts
  var MIN_DELETION_BP = 1;
  function bypassedPoints(nodePositions, bypassed) {
    return bypassed.flatMap((id) => nodePositions[id] ?? []);
  }
  function backboneBySequence(graph) {
    const bySequence = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      if (isBackbone(node)) {
        const list = bySequence.get(node.stable.refName);
        if (list) {
          list.push(node);
        } else {
          bySequence.set(node.stable.refName, [node]);
        }
      }
    }
    for (const list of bySequence.values()) {
      list.sort((a, b) => a.stable.start - b.stable.start);
    }
    return bySequence;
  }
  function bypassedNodes(nodes, start, end) {
    const bypassed = [];
    if (nodes) {
      for (let i = firstNodeAtOrAfter(nodes, start); i < nodes.length; i++) {
        const node = nodes[i];
        if (node.stable.start >= end) {
          break;
        }
        if (node.stable.start + node.length <= end) {
          bypassed.push(node.id);
        }
      }
    }
    return bypassed;
  }
  function skipsBetween(edge, from, to, forwards) {
    const { fromStrand, toStrand } = edge;
    if (fromStrand === void 0 || toStrand === void 0) {
      return true;
    }
    const leavesRight = fromStrand === (from.stable.strand ?? "+");
    const arrivesLeft = toStrand === (to.stable.strand ?? "+");
    return forwards ? leavesRight && arrivesLeft : !leavesRight && !arrivesLeft;
  }
  function deletionEdges(graph) {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const backbone = backboneBySequence(graph);
    const found = [];
    for (let edgeIndex = 0; edgeIndex < graph.edges.length; edgeIndex++) {
      const edge = graph.edges[edgeIndex];
      const from = byId.get(edge.from);
      const to = byId.get(edge.to);
      if (from !== void 0 && to !== void 0 && isBackbone(from) && isBackbone(to) && from.stable.refName === to.stable.refName) {
        const forwards = from.stable.start <= to.stable.start;
        const [left, right] = forwards ? [from, to] : [to, from];
        const start = left.stable.start + left.length;
        const end = right.stable.start;
        const bp = end - start;
        if (bp >= MIN_DELETION_BP && skipsBetween(edge, from, to, forwards)) {
          const refName = left.stable.refName;
          found.push({
            edgeIndex,
            from: edge.from,
            to: edge.to,
            ...edge.fromStrand ? { fromStrand: edge.fromStrand } : {},
            ...edge.toStrand ? { toStrand: edge.toStrand } : {},
            refName,
            start,
            end,
            bp,
            bypassed: bypassedNodes(backbone.get(refName), start, end)
          });
        }
      }
    }
    return found;
  }
  function closableDeletions(graph, deletions) {
    const parent = /* @__PURE__ */ new Map();
    const root = (id) => {
      let r = id;
      while (parent.has(r)) {
        r = parent.get(r);
      }
      if (r !== id) {
        parent.set(id, r);
      }
      return r;
    };
    const join = (a, b) => {
      const [ra, rb] = [root(a), root(b)];
      if (ra !== rb) {
        parent.set(ra, rb);
      }
      return ra !== rb;
    };
    const candidates = new Set(deletions.map((d) => d.edgeIndex));
    graph.edges.forEach((e, ei) => {
      if (!candidates.has(ei)) {
        join(e.from, e.to);
      }
    });
    return new Set(
      deletions.filter((d) => !join(d.from, d.to)).map((d) => d.edgeIndex)
    );
  }
  var drawings = /* @__PURE__ */ new WeakMap();
  function deletionDrawing(graph, deletions, show = true) {
    let byShow = drawings.get(deletions);
    if (!byShow) {
      byShow = /* @__PURE__ */ new Map();
      drawings.set(deletions, byShow);
    }
    let drawing = byShow.get(show);
    if (!drawing) {
      const hidden = show ? /* @__PURE__ */ new Set() : closableDeletions(graph, deletions);
      drawing = {
        shown: deletions.filter((d) => !hidden.has(d.edgeIndex)),
        bypassed: new Map(deletions.map((d) => [d.edgeIndex, d.bypassed])),
        hidden
      };
      byShow.set(show, drawing);
    }
    return drawing;
  }

  // ../bandage-core/src/facetGrid.ts
  function facetSettingOf(facet) {
    const raw = typeof facet === "string" ? { field: facet } : facet ?? {};
    const field = raw.field === "walk" || raw.field === "sample" ? raw.field : "";
    return {
      field,
      domain: [...raw.domain ?? []],
      ...raw.columns === void 0 ? {} : { columns: raw.columns }
    };
  }
  function domainFirst(names, domain) {
    const rank = new Map(domain.map((name, i) => [name, i]));
    const listed = (name) => rank.get(name) ?? domain.length;
    return names.map((name, i) => ({ name, i })).sort((a, b) => listed(a.name) - listed(b.name) || a.i - b.i).map(({ name }) => name);
  }
  function facetCells(names, by, domain = []) {
    const wrapOrder = domainFirst(names, domain);
    const wrap = {
      columns: void 0,
      count: names.length,
      cells: names.map((name) => wrapOrder.indexOf(name))
    };
    if (by === "walk") {
      return wrap;
    }
    const places = names.map((name) => {
      const [sample, haplotype, contig] = name.split("#");
      const n = Number(haplotype);
      return contig !== void 0 && Number.isInteger(n) && n >= 0 ? { sample, column: Math.max(0, n - 1) } : void 0;
    });
    const rows = domainFirst(
      [...new Set(places.flatMap((p) => p ? [p.sample] : []))],
      domain
    );
    const columns2 = Math.max(1, ...places.map((p) => p ? p.column + 1 : 1));
    const cells = places.map(
      (p) => p ? rows.indexOf(p.sample) * columns2 + p.column : -1
    );
    return cells.includes(-1) || new Set(cells).size < cells.length ? wrap : { columns: columns2, count: rows.length * columns2, cells };
  }

  // ../bandage-core/src/pansn.ts
  var SEP = "#";
  function panSNSample(refName) {
    return refName.split(SEP)[0];
  }
  var GENERIC_SAMPLES = /* @__PURE__ */ new Set(["_gbwt_ref"]);
  function isGenericSample(sample) {
    return GENERIC_SAMPLES.has(sample);
  }
  function panSNHaplotype(refName) {
    const parts = refName.split(SEP);
    return parts.length >= 3 ? `${parts[0]}${SEP}${parts[1]}` : void 0;
  }
  function panSNContig(refName) {
    const parts = refName.split(SEP);
    return parts.length >= 3 ? parts.slice(2).join(SEP) : parts.length === 2 ? parts[1] : refName;
  }

  // ../bandage-core/src/reference.ts
  function sampleOf(refName) {
    const sample = refName.includes("#") ? panSNSample(refName) : void 0;
    return sample === void 0 || isGenericSample(sample) ? void 0 : sample;
  }
  function haplotypeOf(refName) {
    return panSNHaplotype(refName) ?? panSNSample(refName);
  }
  function graphHaplotypes(graph) {
    const refNames = new Set((graph.anchorPaths ?? []).map((p) => p.name));
    for (const node of graph.nodes) {
      if (node.stable) {
        refNames.add(node.stable.refName);
      }
    }
    const bySample = /* @__PURE__ */ new Map();
    for (const refName of refNames) {
      const sample = sampleOf(refName);
      if (sample !== void 0) {
        const haplotypes = bySample.get(sample) ?? bySample.set(sample, /* @__PURE__ */ new Set()).get(sample);
        haplotypes.add(haplotypeOf(refName));
      }
    }
    return bySample;
  }
  function backboneFrom(contigs, haplotypes) {
    const samples = new Set(contigs.map((c) => sampleOf(c.refName)));
    const [sample] = samples;
    if (samples.size !== 1 || sample === void 0) {
      return { contigs, prefixes: [], named: false };
    }
    const own = new Set(contigs.map((c) => haplotypeOf(c.refName)));
    const unique = [...haplotypes.get(sample) ?? []].every((h) => own.has(h));
    const shared = new Set(contigs.map((c) => panSNHaplotype(c.refName)));
    const [haplotype] = shared;
    return {
      contigs,
      prefixes: [
        ...unique ? [sample] : [],
        ...shared.size === 1 && haplotype ? [haplotype] : []
      ],
      named: true
    };
  }
  function graphBackbone(graph) {
    const spans = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      if (isBackbone(node)) {
        const { refName, start } = node.stable;
        const end = start + node.length;
        const span = spans.get(refName);
        if (span) {
          span.start = Math.min(span.start, start);
          span.end = Math.max(span.end, end);
        } else {
          spans.set(refName, {
            refName,
            contig: panSNContig(refName),
            start,
            end
          });
        }
      }
    }
    const contigs = [...spans.values()];
    return contigs.length ? backboneFrom(contigs, graphHaplotypes(graph)) : void 0;
  }
  function referenceLabel(graph, region) {
    const backbone = graphBackbone(graph);
    const contig = region ? panSNContig(region.refName) : backbone?.contigs.length === 1 ? backbone.contigs[0].contig : void 0;
    const sample = backbone?.named ? panSNSample(backbone.contigs[0].refName) : void 0;
    return contig && (sample ? `${sample} ${contig}` : contig);
  }

  // ../bandage-core/src/gbzCut.ts
  function parseRegion(text) {
    const m = /^\s*([^:\s]+):([\d,]+)-([\d,]+)\s*$/.exec(text);
    if (!m) {
      throw new Error(
        `"${text}" is not a region like chr6:160,614,798-160,647,758`
      );
    }
    const n = (s) => Number(s.replaceAll(",", ""));
    return { refName: m[1], start: n(m[2]), end: n(m[3]) };
  }

  // ../bandage-core/src/layout/deletionRoutes.ts
  var ROUTE_ID = "\0deletion:";
  var ROUTE_FRACTION = 0.5;
  function withDeletionRoutes(graph, deletions, dropped = /* @__PURE__ */ new Set()) {
    const routes = new Map(
      deletions.map((d) => [d.edgeIndex, `${ROUTE_ID}${d.edgeIndex}`])
    );
    const edges = [];
    graph.edges.forEach((edge, ei) => {
      const id = routes.get(ei);
      if (dropped.has(ei)) {
        return;
      }
      if (id === void 0) {
        edges.push(edge);
      } else {
        const { fromStrand, toStrand } = edge;
        edges.push(
          { from: edge.from, to: id, ...fromStrand ? { fromStrand } : {} },
          { from: id, to: edge.to, ...toStrand ? { toStrand } : {} }
        );
      }
    });
    return {
      graph: {
        ...graph,
        nodes: [
          ...graph.nodes,
          ...[...routes.values()].map((id) => ({
            id,
            name: id,
            length: 0,
            depth: 0
          }))
        ],
        edges
      },
      routes,
      ids: new Set(routes.values())
    };
  }
  function routeNodes(graph, deletions, routes, drawnOf, opts) {
    const lengths = new Map(graph.nodes.map((n) => [n.id, n.length]));
    return deletions.map((d) => {
      const skipped = d.bypassed.reduce(
        (sum, id2) => sum + (lengths.get(id2) ?? 0),
        0
      );
      const drawn = Math.max(
        opts.minimumNodeLength,
        drawnOf(skipped) * ROUTE_FRACTION
      );
      const id = routes.get(d.edgeIndex);
      return {
        id,
        name: id,
        length: Math.round(drawn * 1e6 / opts.nodeLengthPerMegabase),
        depth: 0
      };
    });
  }
  function takeRoutes(positions, routes) {
    const nodePositions = { ...positions };
    const deletionRoutes = {};
    for (const [edgeIndex, id] of routes) {
      const route = nodePositions[id];
      delete nodePositions[id];
      if (route?.length) {
        deletionRoutes[edgeIndex] = route;
      }
    }
    return { nodePositions, deletionRoutes };
  }

  // ../bandage-core/src/layout/stressPlacement.ts
  var MIN_DEPTH = 12;
  var LANE_GAP = 15;
  var CLEAR = LANE_GAP * 0.7;
  var TIP_ANGLE = 25 * Math.PI / 180;
  var ROUTE_BOW = 0.25;
  var ROUTE_CAP = 150;
  var TEARDROP_TILTS = [0, -0.35, 0.35, -0.7, 0.7];
  var SIDES = [0, 1];
  function other(side) {
    return side ? 0 : 1;
  }
  function unit(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const m = Math.hypot(dx, dy) || 1;
    return { x: dx / m, y: dy / m };
  }
  function lerp(a, b, f) {
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  }
  function centroidOf(pts) {
    let x = 0;
    let y = 0;
    for (const p of pts) {
      x += p.x;
      y += p.y;
    }
    return { x: x / pts.length, y: y / pts.length };
  }
  function arcLengths(pts) {
    const arc = new Float64Array(pts.length);
    for (let i = 1; i < pts.length; i++) {
      arc[i] = arc[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    return arc;
  }
  function polylineLength(pts) {
    return arcLengths(pts)[pts.length - 1] ?? 0;
  }
  function arcAngle(ratio) {
    let lo = 1e-6;
    let hi = 2 * Math.PI - 1e-6;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (mid / (2 * Math.sin(mid / 2)) < ratio) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return (lo + hi) / 2;
  }
  function archLength(c, s) {
    if (c < 1e-9) {
      return Math.PI * s;
    }
    const R = (c * c / 4 + s * s) / (2 * s);
    const theta = 2 * Math.asin(Math.min(1, c / (2 * R)));
    return R * (s > R ? 2 * Math.PI - theta : theta);
  }
  function arcFlat(c, length, h, drop) {
    const arc = length - 2 * h;
    const theta = c < 1e-9 ? 2 * Math.PI : arcAngle(arc / c);
    const R = arc / theta;
    const cos = Math.cos(theta / 2);
    const cu = c / 2;
    const cv = drop + h - R * cos;
    return {
      at: (t) => {
        if (t <= h) {
          return { u: 0, v: drop + t };
        }
        if (t >= length - h) {
          return { u: c, v: drop + length - t };
        }
        const a = (t - h) / R - theta / 2;
        return { u: cu + R * Math.sin(a), v: cv + R * Math.cos(a) };
      },
      apex: drop + h + R * (1 - cos),
      length
    };
  }
  function tilted(flat, c, angle) {
    if (!angle) {
      return flat;
    }
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      ...flat,
      at: (t) => {
        const { u, v } = flat.at(t);
        const du = u - c / 2;
        return { u: c / 2 + du * cos - v * sin, v: du * sin + v * cos };
      }
    };
  }
  function lineFlat(u0, v0, du, dv, length) {
    return {
      at: (t) => ({ u: u0 + du * t, v: v0 + dv * t }),
      apex: v0 + Math.max(0, dv) * length,
      length
    };
  }
  var Curve = class {
    constructor(pts, normals, straight = false) {
      this.pts = pts;
      this.normals = normals;
      this.straight = straight;
      this.arc = arcLengths(pts);
      this.total = this.arc[pts.length - 1] ?? 0;
    }
    segment(t) {
      const { arc } = this;
      let lo = 1;
      let hi = arc.length - 1;
      while (lo < hi) {
        const mid = lo + hi >> 1;
        if (arc[mid] < t) {
          lo = mid + 1;
        } else {
          hi = mid;
        }
      }
      return lo;
    }
    fraction(i, t) {
      const span = this.arc[i] - this.arc[i - 1];
      return span > 0 ? (t - this.arc[i - 1]) / span : 0;
    }
    pointAt(t) {
      const { pts } = this;
      const last = pts.length - 1;
      if (last === 0) {
        return { ...pts[0] };
      }
      if (t <= 0) {
        const d = unit(pts[0], pts[1]);
        return { x: pts[0].x + d.x * t, y: pts[0].y + d.y * t };
      }
      if (t >= this.total) {
        const d = unit(pts[last - 1], pts[last]);
        const r = t - this.total;
        return { x: pts[last].x + d.x * r, y: pts[last].y + d.y * r };
      }
      const i = this.segment(t);
      return lerp(pts[i - 1], pts[i], this.fraction(i, t));
    }
    normalAt(t) {
      const { normals } = this;
      if (normals.length === 1 || t <= 0) {
        return normals[0];
      }
      if (t >= this.total) {
        return normals[normals.length - 1];
      }
      const i = this.segment(t);
      const { x, y } = lerp(normals[i - 1], normals[i], this.fraction(i, t));
      const m = Math.hypot(x, y) || 1;
      return { x: x / m, y: y / m };
    }
  };
  function outwardNormals(pts, outRef) {
    const centroid = centroidOf(pts);
    return pts.map((p, i) => {
      const t = unit(
        pts[Math.max(0, i - 1)],
        pts[Math.min(pts.length - 1, i + 1)]
      );
      const n = { x: -t.y, y: t.x };
      const rx = p.x - centroid.x;
      const ry = p.y - centroid.y;
      const rm = Math.hypot(rx, ry);
      const dot = n.x * rx + n.y * ry;
      const ref = outRef[i];
      const sign = rm > 1e-9 && Math.abs(dot) > 0.3 * rm ? Math.sign(dot) : Math.sign(n.x * ref.x + n.y * ref.y) || 1;
      return { x: n.x * sign, y: n.y * sign };
    });
  }
  function mapFlat(frame, tA, sign, flat) {
    const ds = Math.min(5, Math.max(flat.length / 24, 0.5));
    const pts = [];
    const refs = [];
    for (let t = 0; t <= flat.length + 1e-9; t += ds) {
      const { u, v } = flat.at(Math.min(t, flat.length));
      const q = frame.pointAt(tA + u);
      const nr = frame.normalAt(tA + u);
      const ox = nr.x * sign;
      const oy = nr.y * sign;
      pts.push({ x: q.x + ox * v, y: q.y + oy * v });
      refs.push({ x: ox, y: oy });
    }
    return { pts, refs };
  }
  function fitted(frame, tA, sign, make, length) {
    let flatLength = length;
    let mapped = mapFlat(frame, tA, sign, make(flatLength));
    if (frame.straight) {
      return mapped;
    }
    for (let i = 0; i < 2; i++) {
      const got = polylineLength(mapped.pts);
      if (!(got > 0)) {
        break;
      }
      flatLength *= length / got;
      mapped = mapFlat(frame, tA, sign, make(flatLength));
    }
    return mapped;
  }
  function depths(from, n) {
    return Array.from({ length: n }, (_, i) => from + i * LANE_GAP / 2);
  }
  function spanOf2(anchors) {
    if (anchors.length === 0) {
      return Infinity;
    }
    let lo = Infinity;
    let hi = -Infinity;
    for (const a of anchors) {
      lo = Math.min(lo, a.point.x);
      hi = Math.max(hi, a.point.x);
    }
    return hi - lo;
  }
  function cellKey(gx, gy) {
    return gx * 73856093 ^ gy * 19349663;
  }
  var Placer = class {
    constructor(c) {
      this.c = c;
      this.grid = /* @__PURE__ */ new Map();
      const { ids, first, count, per, seedX, seedY, backbone } = c;
      const N = ids.length;
      this.points = Array.from({ length: N }, () => void 0);
      this.params = Array.from({ length: N }, () => void 0);
      this.curves = Array.from({ length: N }, () => void 0);
      this.links = c.links.map(
        (sides, k) => sides.map((out) => out.filter(([v]) => v !== k))
      );
      this.route = ids.map((id) => id.startsWith(ROUTE_ID));
      let min = Infinity;
      let max = -Infinity;
      for (let k = 0; k < N; k++) {
        const start = first[k];
        if (!backbone[start] || Number.isNaN(seedX[start])) {
          continue;
        }
        min = Math.min(min, seedX[start]);
        max = Math.max(max, seedX[start] + per[k] * (count[k] - 1));
      }
      this.backbone = new Curve(
        [
          { x: min, y: 0 },
          { x: max, y: 0 }
        ],
        [
          { x: 0, y: 1 },
          { x: 0, y: 1 }
        ],
        true
      );
      this.backboneCentroid = { x: (min + max) / 2, y: 0 };
      for (let k = 0; k < N; k++) {
        const start = first[k];
        if (!backbone[start] || Number.isNaN(seedX[start])) {
          continue;
        }
        const pts = [];
        const ts = [];
        for (let i = 0; i < count[k]; i++) {
          const x = seedX[start] + i * per[k];
          pts.push({ x, y: seedY[start] });
          ts.push(x - min);
        }
        this.points[k] = pts;
        this.params[k] = ts;
        this.curves[k] = this.backbone;
        this.occupy(pts, this.backbone);
      }
    }
    static hasBackbone(c) {
      for (let k = 0; k < c.ids.length; k++) {
        const start = c.first[k];
        if (c.backbone[start] && !Number.isNaN(c.seedX[start])) {
          return true;
        }
      }
      return false;
    }
    run() {
      const free = [];
      for (let k = 0; k < this.points.length; k++) {
        if (!this.points[k]) {
          free.push(k);
        }
      }
      const pieces = this.componentsOf(free).map((members) => ({ members, anchors: this.anchorsOf(members) })).filter((p) => p.anchors.length).map((p) => ({
        members: p.members,
        span: spanOf2(p.anchors),
        drawn: p.members.reduce((s, k) => s + this.drawn(k), 0)
      })).sort((a, b) => a.span - b.span || a.drawn - b.drawn);
      for (const p of pieces) {
        this.placePiece(p.members, this.backboneCentroid);
      }
    }
    write(X, Y) {
      const { first } = this.c;
      this.points.forEach((pts, k) => {
        pts?.forEach((p, i) => {
          X[first[k] + i] = p.x;
          Y[first[k] + i] = p.y;
        });
      });
    }
    drawn(k) {
      return this.c.per[k] * (this.c.count[k] - 1);
    }
    endIndex(k, side) {
      return side ? this.c.count[k] - 1 : 0;
    }
    occupy(pts, curve) {
      for (const p of pts) {
        const key = cellKey(Math.floor(p.x / CLEAR), Math.floor(p.y / CLEAR));
        const list = this.grid.get(key);
        const occupant = { x: p.x, y: p.y, curve };
        if (list) {
          list.push(occupant);
        } else {
          this.grid.set(key, [occupant]);
        }
      }
    }
    // placed points within CLEAR of the candidate, off the exempt curve and away
    // from the anchors, up to `limit`
    violations(pts, exempt, anchorPts, limit) {
      let n = 0;
      for (const p of pts) {
        if (anchorPts.some((a) => Math.hypot(p.x - a.x, p.y - a.y) < 2 * LANE_GAP)) {
          continue;
        }
        const cx = Math.floor(p.x / CLEAR);
        const cy = Math.floor(p.y / CLEAR);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            for (const q of this.grid.get(cellKey(gx, gy)) ?? []) {
              if (q.curve !== exempt && Math.hypot(p.x - q.x, p.y - q.y) < CLEAR) {
                n++;
                if (n >= limit) {
                  return n;
                }
              }
            }
          }
        }
      }
      return n;
    }
    // the first candidate that clears what is drawn, else the least crowded
    choose(candidates, exempt, anchorPts) {
      let best;
      let bestV = Infinity;
      for (const candidate of candidates) {
        const m = candidate();
        const v = this.violations(m.pts, exempt, anchorPts, bestV);
        if (v === 0) {
          return m;
        }
        if (v < bestV) {
          bestV = v;
          best = m;
        }
      }
      return best;
    }
    anchorsOf(members) {
      const set = new Set(members);
      const out = [];
      for (const u of members) {
        for (const uSide of SIDES) {
          for (const [v, vSide] of this.links[u][uSide]) {
            const pts = this.points[v];
            if (set.has(v) || !pts) {
              continue;
            }
            const i = this.endIndex(v, vSide);
            out.push({
              u,
              uSide,
              v,
              vSide,
              point: pts[i],
              curve: this.curves[v],
              t: this.params[v][i]
            });
          }
        }
      }
      return out;
    }
    componentsOf(members) {
      const set = new Set(members);
      const seen = /* @__PURE__ */ new Set();
      const comps = [];
      for (const s of members) {
        if (seen.has(s)) {
          continue;
        }
        const queue = [s];
        seen.add(s);
        for (const u of queue) {
          for (const side of SIDES) {
            for (const [v] of this.links[u][side]) {
              if (set.has(v) && !seen.has(v)) {
                seen.add(v);
                queue.push(v);
              }
            }
          }
        }
        comps.push(queue);
      }
      return comps;
    }
    // side-consistent BFS over (node, entered side) within the piece; without a
    // target, the path to the farthest state
    spinePath(members, from, fromSide, to, toExitSide) {
      const set = new Set(members);
      const key = (k, s) => k * 2 + s;
      const reached = (k, s) => k === to && other(s) === toExitSide;
      const prev = /* @__PURE__ */ new Map([[key(from, fromSide), -1]]);
      const queue = [[from, fromSide]];
      let far = [from, fromSide];
      for (const [k, s] of queue) {
        far = [k, s];
        if (to !== void 0 && reached(k, s)) {
          break;
        }
        for (const [v, t] of this.links[k][other(s)]) {
          if (!set.has(v) || prev.has(key(v, t))) {
            continue;
          }
          prev.set(key(v, t), key(k, s));
          queue.push([v, t]);
        }
      }
      if (to !== void 0 && !reached(far[0], far[1])) {
        return void 0;
      }
      const path = [];
      for (let cur = key(far[0], far[1]); cur !== -1; cur = prev.get(cur)) {
        path.push({ k: cur >> 1, enter: cur & 1 });
      }
      return path.reverse();
    }
    loosePath(members, from, to) {
      const set = new Set(members);
      const prev = /* @__PURE__ */ new Map([[from, -1]]);
      const side = /* @__PURE__ */ new Map([[from, 0]]);
      const queue = [from];
      for (const k of queue) {
        if (k === to) {
          break;
        }
        for (const s of SIDES) {
          for (const [v, t] of this.links[k][s]) {
            if (!set.has(v) || prev.has(v)) {
              continue;
            }
            prev.set(v, k);
            side.set(v, t);
            queue.push(v);
          }
        }
      }
      const path = [];
      for (let cur = to; cur !== -1; cur = prev.get(cur)) {
        path.push({ k: cur, enter: side.get(cur) });
      }
      return path.reverse();
    }
    spineLength(spine) {
      const { link } = this.c;
      return spine.reduce((s, { k }) => s + this.drawn(k) + link, link);
    }
    // the spine's chains along the curve from arc length t0, at their own
    // spacing unless one is given
    layAlong(spine, curve, t0, spacing) {
      const { count, per, link } = this.c;
      let t = t0;
      const all = [];
      for (const { k, enter } of spine) {
        const step = spacing ?? per[k];
        const pts = [];
        const ts = [];
        for (let i = 0; i < count[k]; i++) {
          pts.push(curve.pointAt(t + i * step));
          ts.push(t + i * step);
        }
        if (enter === 1) {
          pts.reverse();
          ts.reverse();
        }
        this.points[k] = pts;
        this.params[k] = ts;
        this.curves[k] = curve;
        all.push(...pts);
        t += step * (count[k] - 1) + link;
      }
      return all;
    }
    arcCandidates(frame, tA, sign, c, L) {
      const hMax = (L - c) / 2 - 1e-6;
      const tilts = L > 2 * c ? TEARDROP_TILTS : [0];
      const candidates = [];
      for (const drop of depths(0, 8)) {
        for (const tilt of tilts) {
          for (let i = 0; i <= 16; i++) {
            const h = hMax * i / 16;
            if (i < 16 && arcFlat(c, L, h, drop).apex < MIN_DEPTH) {
              continue;
            }
            candidates.push(
              () => fitted(
                frame,
                tA,
                sign,
                (length) => tilted(
                  arcFlat(
                    c,
                    length,
                    Math.min(h, (length - c) / 2 - 1e-6),
                    drop
                  ),
                  c,
                  tilt
                ),
                L
              )
            );
          }
        }
      }
      return candidates;
    }
    placePiece(members, parent) {
      const { count, link } = this.c;
      const anchors = this.anchorsOf(members);
      if (anchors.length === 0) {
        return;
      }
      const route = members.every((k) => this.route[k]);
      const shared = anchors.every((a) => a.curve === anchors[0].curve) ? anchors[0].curve : void 0;
      let frame;
      let tA;
      let tB;
      let sign;
      if (shared) {
        anchors.sort((a, b) => a.t - b.t);
        frame = shared;
        tA = anchors[0].t;
        tB = anchors[anchors.length - 1].t;
        sign = frame === this.backbone && route ? -1 : 1;
      } else {
        anchors.sort((a2, b2) => a2.point.x - b2.point.x || a2.point.y - b2.point.y);
        const a = anchors[0].point;
        const b = anchors[anchors.length - 1].point;
        const chord = Math.hypot(b.x - a.x, b.y - a.y);
        const u = chord > 1e-9 ? unit(a, b) : { x: 1, y: 0 };
        const n = { x: -u.y, y: u.x };
        const mid = lerp(a, b, 0.5);
        sign = anchors.some((x) => x.curve === this.backbone) ? (route ? -1 : 1) * (Math.sign(n.y) || 1) : (mid.x - parent.x) * n.x + (mid.y - parent.y) * n.y >= 0 ? 1 : -1;
        frame = new Curve([a, b], [n, n], true);
        tA = 0;
        tB = chord;
      }
      const A = anchors[0];
      const B = anchors[anchors.length - 1];
      const c = tB - tA;
      const single = anchors.length === 1 || A.u === B.u && A.uSide === B.uSide && c < 1e-9;
      const anchorPts = [A.point, B.point];
      const pick = (candidates) => this.choose(candidates, shared, anchorPts);
      let spine;
      let mapped;
      let start = link;
      let spacing;
      if (single) {
        spine = this.spinePath(members, A.u, A.uSide);
        const L = this.spineLength(spine);
        const next = A.vSide ? Math.max(0, count[A.v] - 2) : Math.min(1, count[A.v] - 1);
        const dirU = A.t >= this.params[A.v][next] ? 1 : -1;
        const du = dirU * Math.cos(TIP_ANGLE);
        const dv = Math.sin(TIP_ANGLE);
        mapped = pick(
          depths(0, 12).map(
            (drop) => () => fitted(
              frame,
              tA,
              sign,
              (length) => lineFlat(0, drop, du, dv, length),
              L
            )
          )
        );
      } else {
        spine = this.spinePath(members, A.u, A.uSide, B.u, B.uSide) ?? this.loosePath(members, A.u, B.u);
        const L = this.spineLength(spine);
        if (route) {
          const d0 = Math.max(MIN_DEPTH, Math.min(ROUTE_BOW * c, ROUTE_CAP));
          mapped = pick(
            depths(d0, 12).map(
              (d) => () => mapFlat(frame, tA, sign, arcFlat(c, archLength(c, d), 0, 0))
            )
          );
          const total = polylineLength(mapped.pts);
          spacing = Math.max(1e-3, (total - 2 * link) / (count[spine[0].k] - 1));
        } else if (L > c + 1e-6) {
          mapped = pick(this.arcCandidates(frame, tA, sign, c, L));
        } else {
          const bar = L - 2 * link;
          mapped = pick(
            depths(MIN_DEPTH, 12).map(
              (d) => () => fitted(
                frame,
                tA,
                sign,
                (length) => lineFlat(c / 2 - length / 2, d, 1, 0, length),
                bar
              )
            )
          );
          start = 0;
        }
      }
      const curve = new Curve(mapped.pts, outwardNormals(mapped.pts, mapped.refs));
      const placed = this.layAlong(spine, curve, start, spacing);
      this.occupy(placed, curve);
      const centroid = centroidOf(placed);
      const rest = members.filter((k) => !this.points[k]);
      const subs = this.componentsOf(rest).map((m) => ({ members: m, span: spanOf2(this.anchorsOf(m)) })).sort((a, b) => a.span - b.span);
      for (const sub of subs) {
        this.placePiece(sub.members, centroid);
      }
    }
  };
  function stressPlacement(c) {
    const X = new Float64Array(c.n).fill(NaN);
    const Y = new Float64Array(c.n).fill(NaN);
    if (Placer.hasBackbone(c)) {
      const placer = new Placer(c);
      placer.run();
      placer.write(X, Y);
    }
    return { X, Y };
  }

  // ../bandage-core/src/layout/stressEngine.ts
  var QUALITY = [
    { walks: 2, iterations: 15 },
    { walks: 4, iterations: 30 },
    { walks: 8, iterations: 60 },
    { walks: 12, iterations: 90 },
    { walks: 16, iterations: 120 }
  ];
  var UNTANGLE_PASSES = 20;
  var UNTANGLE_LINKS = 3;
  var UNTANGLE_PUSH = 0.3;
  var SMOOTH_PASSES = 2;
  var MAX_HOPS = 200;
  var REFERENCE_HOPS = 20;
  var EPS = 0.1;
  var WARM = 0.5;
  function flipped(strand, name) {
    const own = name.at(-1);
    return (strand === "+" || strand === "-") && (own === "+" || own === "-") && strand !== own;
  }
  function xorshift(seed) {
    let s = Math.imul(seed, 2654435761) >>> 0 || 1;
    return () => {
      s ^= s << 13;
      s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5;
      s >>>= 0;
      return s / 4294967296;
    };
  }
  function num(value, fallback) {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
  }
  function chains(request) {
    const { nodes, edges } = request.graph;
    const o = request.options;
    const perMegabase = num(o.nodeLengthPerMegabase, 1e3);
    const minimum = num(o.minimumNodeLength, 1);
    const segment = num(o.nodeSegmentLength, 1);
    const link = num(o.edgeLength, 1);
    const ids = nodes.map((n2) => n2.id);
    const first = new Int32Array(nodes.length);
    const count = new Int32Array(nodes.length);
    const per = new Float64Array(nodes.length);
    let n = 0;
    nodes.forEach((node, k) => {
      const drawn = Math.max(perMegabase * node.length / 1e6, minimum);
      const steps = Math.max(1, Math.ceil(drawn / segment));
      first[k] = n;
      count[k] = steps + 1;
      per[k] = drawn / steps;
      n += steps + 1;
    });
    const chainOf = new Int32Array(n);
    const indexOf = new Int32Array(n);
    const seedX = new Float64Array(n).fill(NaN);
    const seedY = new Float64Array(n).fill(NaN);
    const backbone = new Uint8Array(n);
    const adjacent = Array.from({ length: n }, () => []);
    nodes.forEach((node, k) => {
      const seeded = typeof node.x === "number" && typeof node.y === "number";
      const reference = isBackbone(node) ? 1 : 0;
      for (let i = 0; i < count[k]; i++) {
        const v = first[k] + i;
        chainOf[v] = k;
        indexOf[v] = i;
        backbone[v] = reference;
        if (seeded) {
          seedX[v] = node.x + i * per[k];
          seedY[v] = node.y;
        }
        if (i > 0) {
          adjacent[v - 1].push([v, per[k]]);
          adjacent[v].push([v - 1, per[k]]);
        }
      }
    });
    const index = new Map(ids.map((id, k) => [id, k]));
    const links = nodes.map(() => [[], []]);
    for (const edge of edges) {
      const a = index.get(edge.from);
      const b = index.get(edge.to);
      if (a === void 0 || b === void 0) {
        continue;
      }
      if (a === b && count[a] <= 2) {
        continue;
      }
      const fromSide = flipped(edge.fromStrand, edge.from) ? 0 : 1;
      const toSide = flipped(edge.toStrand, edge.to) ? 1 : 0;
      const u = first[a] + (fromSide ? count[a] - 1 : 0);
      const v = first[b] + (toSide ? count[b] - 1 : 0);
      adjacent[u].push([v, link]);
      adjacent[v].push([u, link]);
      links[a][fromSide].push([b, toSide]);
      links[b][toSide].push([a, fromSide]);
    }
    const off = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      off[i + 1] = off[i] + adjacent[i].length;
    }
    const nb = new Int32Array(off[n]);
    const wt = new Float64Array(off[n]);
    for (let i = 0; i < n; i++) {
      adjacent[i].forEach(([v, w], k) => {
        nb[off[i] + k] = v;
        wt[off[i] + k] = w;
      });
    }
    return {
      ids,
      first,
      count,
      per,
      links,
      chainOf,
      indexOf,
      seedX,
      seedY,
      backbone,
      off,
      nb,
      wt,
      n,
      link
    };
  }
  function components(c) {
    const { n, off, nb } = c;
    const comp = new Int32Array(n).fill(-1);
    const members = [];
    for (let s = 0; s < n; s++) {
      if (comp[s] >= 0) {
        continue;
      }
      const queue = [s];
      comp[s] = members.length;
      for (const u of queue) {
        for (let e = off[u]; e < off[u + 1]; e++) {
          const v = nb[e];
          if (comp[v] < 0) {
            comp[v] = members.length;
            queue.push(v);
          }
        }
      }
      members.push(queue);
    }
    return { comp, members };
  }
  function stressLayout(request, opts = {}) {
    const c = chains(request);
    const { n, off, nb, wt, seedX, seedY, backbone, first, count, per, link } = c;
    const o = request.options;
    const quality = QUALITY[Math.max(0, Math.min(4, num(opts.quality ?? o.quality, 2)))];
    const gap = num(opts.componentSeparation ?? o.componentSeparation, 15);
    const rand = xorshift(num(opts.seed ?? o.seed, 1));
    const X = new Float64Array(n);
    const Y = new Float64Array(n);
    const nodePositions = {};
    if (n === 0) {
      return { nodePositions };
    }
    const { comp, members } = components(c);
    let dmin = Infinity;
    let total = 0;
    for (let e = 0; e < nb.length; e++) {
      dmin = Math.min(dmin, wt[e]);
      total += wt[e];
    }
    total /= 2;
    let anySeed = false;
    for (let i = 0; i < n; i++) {
      if (!Number.isNaN(seedX[i])) {
        anySeed = true;
        break;
      }
    }
    const placed = anySeed ? stressPlacement(c) : void 0;
    const side = Math.sqrt(n) * 20;
    for (let i = 0; i < n; i++) {
      if (placed && !Number.isNaN(placed.X[i])) {
        X[i] = placed.X[i];
        Y[i] = placed.Y[i];
      } else if (anySeed && !Number.isNaN(seedX[i])) {
        X[i] = seedX[i] + rand() - 0.5;
        Y[i] = seedY[i] + rand() - 0.5;
      } else {
        X[i] = rand() * side;
        Y[i] = rand() * side;
      }
    }
    const refIdx = members.map(
      (points) => Int32Array.from(
        points.filter((i) => backbone[i] && !Number.isNaN(seedX[i])).sort((a, b) => seedX[a] - seedX[b])
      )
    );
    const refX = refIdx.map((idx) => Float64Array.from(idx, (i) => seedX[i]));
    let span = 0;
    for (const xs of refX) {
      if (xs.length) {
        span = Math.max(span, xs[xs.length - 1] - xs[0]);
      }
    }
    const dmax = Math.max(span, total / 4, dmin * 10);
    const etaMax = dmax * dmax;
    const etaMin = EPS * dmin * dmin;
    const { walks, iterations } = quality;
    const lambda = Math.log(etaMax / etaMin) / Math.max(1, iterations - 1);
    const logMin = Math.log(dmin);
    const logMax = Math.log(dmax);
    const move = (i, j, d, eta) => {
      let mu = eta / (d * d);
      if (mu > 1) {
        mu = 1;
      }
      const dx = X[i] - X[j];
      const dy = Y[i] - Y[j];
      const mag = Math.sqrt(dx * dx + dy * dy) || 1e-9;
      const r = mu * (mag - d) / (2 * mag);
      const rx = r * dx;
      const ry = r * dy;
      X[i] = X[i] - rx;
      Y[i] = Y[i] - ry;
      X[j] = X[j] + rx;
      Y[j] = Y[j] + ry;
    };
    let walked = 0;
    const walk = (i, length) => {
      let chain = c.chainOf[i];
      let idx = c.indexOf[i];
      let dir = rand() < 0.5 ? -1 : 1;
      let remaining = length;
      const maxHops = refIdx[comp[i]].length >= 2 ? REFERENCE_HOPS : MAX_HOPS;
      for (let hops = 0; hops < maxHops; hops++) {
        const points = count[chain];
        const step = per[chain];
        const toEnd = (dir > 0 ? points - 1 - idx : idx) * step;
        if (remaining <= toEnd) {
          const steps = Math.round(remaining / step);
          walked = length - remaining + steps * step;
          return first[chain] + idx + dir * steps;
        }
        remaining -= toEnd;
        const out = c.links[chain][dir > 0 ? 1 : 0];
        if (out.length === 0) {
          walked = length - remaining;
          return first[chain] + (dir > 0 ? points - 1 : 0);
        }
        const [next, enterSide] = out[Math.floor(rand() * out.length)];
        remaining -= link;
        chain = next;
        dir = enterSide === 0 ? 1 : -1;
        idx = enterSide === 0 ? 0 : count[next] - 1;
        if (remaining <= 0) {
          walked = length - remaining;
          return first[chain] + idx;
        }
      }
      return -1;
    };
    const referenceTerm = (i, eta) => {
      const idx = refIdx[comp[i]];
      if (!backbone[i] || idx.length < 2 || Number.isNaN(seedX[i])) {
        return;
      }
      const xs = refX[comp[i]];
      const target = seedX[i] + Math.exp(logMin + rand() * (logMax - logMin)) * (rand() < 0.5 ? -1 : 1);
      let lo = 0;
      let hi = xs.length;
      while (lo < hi) {
        const mid = lo + hi >> 1;
        if (xs[mid] < target) {
          lo = mid + 1;
        } else {
          hi = mid;
        }
      }
      const j = idx[Math.min(lo, idx.length - 1)];
      const d = seedX[j] - seedX[i];
      if (j === i || d === 0) {
        return;
      }
      let mu = eta / (d * d);
      if (mu > 1) {
        mu = 1;
      }
      const r = mu * (X[j] - X[i] - d) / 2;
      X[i] = X[i] + r;
      X[j] = X[j] - r;
    };
    const adjacentTerms = (i, eta) => {
      for (let e = off[i]; e < off[i + 1]; e++) {
        const j = nb[e];
        if (j > i) {
          move(i, j, wt[e], eta);
        }
      }
    };
    const order = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      order[i] = i;
    }
    const warm = anySeed ? Math.floor(WARM * iterations) : 0;
    for (let t = warm; t < iterations; t++) {
      const eta = etaMax * Math.exp(-lambda * t);
      for (let k = n - 1; k > 0; k--) {
        const r = Math.floor(rand() * (k + 1));
        const tmp = order[k];
        order[k] = order[r];
        order[r] = tmp;
      }
      for (let q = 0; q < n; q++) {
        const i = order[q];
        adjacentTerms(i, eta);
        for (let w = 0; w < walks; w++) {
          const length = Math.exp(logMin + rand() * (logMax - logMin));
          const j = walk(i, length);
          if (j >= 0 && j !== i && walked > 0) {
            move(i, j, walked, eta);
          }
        }
        referenceTerm(i, eta);
      }
    }
    const radius = UNTANGLE_LINKS * link;
    const key = (x, y) => Math.floor(x / radius) * 73856093 ^ Math.floor(y / radius) * 19349663;
    for (let u = 0; u < UNTANGLE_PASSES; u++) {
      const grid = /* @__PURE__ */ new Map();
      for (let i = 0; i < n; i++) {
        const k = key(X[i], Y[i]);
        const list = grid.get(k);
        if (list) {
          list.push(i);
        } else {
          grid.set(k, [i]);
        }
      }
      for (let i = 0; i < n; i++) {
        const cx = Math.floor(X[i] / radius);
        const cy = Math.floor(Y[i] / radius);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const list = grid.get(gx * 73856093 ^ gy * 19349663);
            if (!list) {
              continue;
            }
            for (const j of list) {
              if (j <= i) {
                continue;
              }
              let joined = false;
              for (let e = off[i]; e < off[i + 1]; e++) {
                if (nb[e] === j) {
                  joined = true;
                  break;
                }
              }
              if (joined) {
                continue;
              }
              const dx = X[i] - X[j];
              const dy = Y[i] - Y[j];
              const mag = Math.sqrt(dx * dx + dy * dy);
              if (mag >= radius) {
                continue;
              }
              let rx;
              let ry;
              if (mag > 1e-6) {
                const r = UNTANGLE_PUSH * (radius - mag) / (2 * mag);
                rx = r * dx;
                ry = r * dy;
              } else {
                rx = UNTANGLE_PUSH * radius * (rand() - 0.5);
                ry = UNTANGLE_PUSH * radius * (rand() - 0.5);
              }
              X[i] = X[i] + rx;
              Y[i] = Y[i] + ry;
              X[j] = X[j] - rx;
              Y[j] = Y[j] - ry;
            }
          }
        }
      }
      for (let i = 0; i < n; i++) {
        adjacentTerms(i, Infinity);
        referenceTerm(i, etaMin * 4);
      }
    }
    for (let k = 0; k < count.length; k++) {
      const a = first[k];
      const m = count[k];
      if (m < 3) {
        continue;
      }
      for (let s = 0; s < SMOOTH_PASSES; s++) {
        const xs = X.slice(a, a + m);
        const ys = Y.slice(a, a + m);
        for (let i = 1; i + 1 < m; i++) {
          X[a + i] = 0.5 * xs[i] + 0.25 * (xs[i - 1] + xs[i + 1]);
          Y[a + i] = 0.5 * ys[i] + 0.25 * (ys[i - 1] + ys[i + 1]);
        }
      }
      respace(X, Y, a, m, per[k]);
    }
    packComponents(comp, members, X, Y, anySeed, gap);
    for (let k = 0; k < c.ids.length; k++) {
      const points = [];
      for (let i = 0; i < count[k]; i++) {
        points.push({ x: X[first[k] + i], y: Y[first[k] + i] });
      }
      nodePositions[c.ids[k]] = points;
    }
    return { nodePositions };
  }
  function respace(X, Y, a, m, per) {
    const arc = new Float64Array(m);
    for (let i = 1; i < m; i++) {
      arc[i] = arc[i - 1] + Math.hypot(X[a + i] - X[a + i - 1], Y[a + i] - Y[a + i - 1]);
    }
    if (!arc[m - 1]) {
      return;
    }
    const loss = per * (m - 1) - arc[m - 1];
    if (loss > 0) {
      extend(X, Y, a, a + 1, loss / 2);
      extend(X, Y, a + m - 1, a + m - 2, loss / 2);
      for (let i = 1; i < m; i++) {
        arc[i] = arc[i - 1] + Math.hypot(X[a + i] - X[a + i - 1], Y[a + i] - Y[a + i - 1]);
      }
    }
    const total = arc[m - 1];
    const xs = X.slice(a, a + m);
    const ys = Y.slice(a, a + m);
    let seg = 1;
    for (let i = 1; i + 1 < m; i++) {
      const s = total * i / (m - 1);
      while (seg < m - 1 && arc[seg] < s) {
        seg++;
      }
      const span = arc[seg] - arc[seg - 1];
      const t = span > 0 ? (s - arc[seg - 1]) / span : 0;
      X[a + i] = xs[seg - 1] + (xs[seg] - xs[seg - 1]) * t;
      Y[a + i] = ys[seg - 1] + (ys[seg] - ys[seg - 1]) * t;
    }
  }
  function extend(X, Y, end, next, by) {
    const dx = X[end] - X[next];
    const dy = Y[end] - Y[next];
    const mag = Math.hypot(dx, dy);
    if (mag > 0) {
      X[end] = X[end] + dx / mag * by;
      Y[end] = Y[end] + dy / mag * by;
    }
  }
  function packComponents(comp, members, X, Y, anySeed, gap) {
    if (!anySeed) {
      for (const points of members) {
        rotateToPrincipalAxis(X, Y, points);
      }
    }
    if (members.length < 2) {
      return;
    }
    const minX = new Float64Array(members.length).fill(Infinity);
    const minY = new Float64Array(members.length).fill(Infinity);
    const maxY = new Float64Array(members.length).fill(-Infinity);
    for (let i = 0; i < X.length; i++) {
      const k = comp[i];
      minX[k] = Math.min(minX[k], X[i]);
      minY[k] = Math.min(minY[k], Y[i]);
      maxY[k] = Math.max(maxY[k], Y[i]);
    }
    const shift = new Float64Array(members.length);
    let y = 0;
    for (let k = 0; k < members.length; k++) {
      shift[k] = y - minY[k];
      y += maxY[k] - minY[k] + gap;
    }
    for (let i = 0; i < X.length; i++) {
      const k = comp[i];
      X[i] = X[i] - minX[k];
      Y[i] = Y[i] + shift[k];
    }
  }
  function rotateToPrincipalAxis(X, Y, points) {
    if (points.length < 3) {
      return;
    }
    let cx = 0;
    let cy = 0;
    for (const i of points) {
      cx += X[i];
      cy += Y[i];
    }
    cx /= points.length;
    cy /= points.length;
    let sxx = 0;
    let syy = 0;
    let sxy = 0;
    for (const i of points) {
      const dx = X[i] - cx;
      const dy = Y[i] - cy;
      sxx += dx * dx;
      syy += dy * dy;
      sxy += dx * dy;
    }
    const angle = -0.5 * Math.atan2(2 * sxy, sxx - syy);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (const i of points) {
      const dx = X[i] - cx;
      const dy = Y[i] - cy;
      X[i] = cx + cos * dx - sin * dy;
      Y[i] = cy + sin * dx + cos * dy;
    }
  }

  // ../bandage-core/src/loadBandage.ts
  var cached;
  function loadBandage() {
    cached ??= Promise.resolve().then(() => (init_bandage_layout(), bandage_layout_exports)).then((mod) => mod.default()).catch((e) => {
      cached = void 0;
      throw e;
    });
    return cached;
  }

  // ../bandage-core/src/layoutEngines.ts
  var LAYOUT_ENGINES = [
    {
      value: "fmmm",
      label: "Bandage (FMMM)",
      description: "Bandage's force-directed layout: OGDF's fast multipole multilevel method, compiled to wasm."
    },
    {
      value: "stress",
      label: "Stress",
      description: "Stress layout by stochastic gradient descent in plain JS: distances along the graph become distances on the page, so the reference reads straight and a repeat loop reads as a ring."
    }
  ];
  var LAYOUT_ENGINE_VALUES = LAYOUT_ENGINES.map((e) => e.value);
  var layoutEngine = async (request) => {
    if (request.options.engine === "stress") {
      const start2 = performance.now();
      const result2 = stressLayout(request);
      return { result: result2, duration: performance.now() - start2 };
    }
    const bandage = await loadBandage();
    const start = performance.now();
    const result = bandage.computeLayout(request.graph, request.options);
    return { result, duration: performance.now() - start };
  };

  // ../bandage-core/src/referenceSpan.ts
  var MAX_BACKBONE_HOPS = 4;
  function buildNeighbors(graph) {
    const neighbors = /* @__PURE__ */ new Map();
    function add(from, to) {
      const list = neighbors.get(from);
      if (list) {
        list.push(to);
      } else {
        neighbors.set(from, [to]);
      }
    }
    for (const edge of graph.edges) {
      add(edge.from, edge.to);
      add(edge.to, edge.from);
    }
    return neighbors;
  }
  function flankingSpan({
    nodeId,
    nodeById,
    neighbors
  }) {
    const seen = /* @__PURE__ */ new Set([nodeId]);
    let frontier = [nodeId];
    let minEnd = Infinity;
    let maxStart = -Infinity;
    for (let hop = 0; hop < MAX_BACKBONE_HOPS && frontier.length > 0; hop++) {
      const next = [];
      for (const id of frontier) {
        const adjacent = neighbors.get(id);
        if (adjacent) {
          for (const neighborId of adjacent) {
            if (!seen.has(neighborId)) {
              seen.add(neighborId);
              const neighbor = nodeById.get(neighborId);
              if (neighbor && isBackbone(neighbor)) {
                minEnd = Math.min(minEnd, neighbor.stable.start + neighbor.length);
                maxStart = Math.max(maxStart, neighbor.stable.start);
              } else {
                next.push(neighborId);
              }
            }
          }
        }
      }
      frontier = next;
    }
    return minEnd === Infinity ? void 0 : {
      start: Math.min(minEnd, maxStart),
      end: Math.max(minEnd, maxStart)
    };
  }
  function nodeReferenceSpan({
    nodeId,
    nodeById,
    neighbors
  }) {
    const node = nodeById.get(nodeId);
    return node === void 0 ? void 0 : isBackbone(node) ? { start: node.stable.start, end: node.stable.start + node.length } : flankingSpan({ nodeId, nodeById, neighbors });
  }
  function referenceMidpoints(graph) {
    const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
    const neighbors = buildNeighbors(graph);
    const midpoints = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      const span = nodeReferenceSpan({ nodeId: node.id, nodeById, neighbors });
      if (span) {
        midpoints.set(node.id, (span.start + span.end) / 2);
      }
    }
    return midpoints;
  }

  // ../bandage-core/src/alleleProjection/projectAlleles.ts
  function parsePanSN(refName) {
    const parts = refName.split("#");
    const haplotype = parts.length >= 2 ? Number(parts[1]) : Number.NaN;
    return {
      sample: parts[0] ?? refName,
      haplotype: Number.isFinite(haplotype) ? haplotype : void 0
    };
  }
  function collectRun(seed, byId, adj, claimed) {
    const members = [];
    const anchors = [];
    const queue = [seed];
    claimed.add(seed);
    while (queue.length > 0) {
      const id = queue.pop();
      const node = byId.get(id);
      if (node) {
        members.push(node);
        for (const neighborId of adj.get(id) ?? []) {
          const neighbor = byId.get(neighborId);
          if (neighbor) {
            if (neighbor.stable.rank === REFERENCE_RANK) {
              anchors.push(neighbor);
            } else if (!claimed.has(neighborId)) {
              claimed.add(neighborId);
              queue.push(neighborId);
            }
          }
        }
      }
    }
    return { members, anchors };
  }
  function anchorSpan(anchors) {
    const refNames = new Set(anchors.map((a) => a.stable.refName));
    if (refNames.size !== 1 || anchors.length < 2) {
      return void 0;
    }
    const sorted = [...anchors].sort((a, b) => a.stable.start - b.stable.start);
    const first = sorted[0];
    const last = sorted.at(-1);
    const start = first.stable.start + first.length;
    const end = last.stable.start;
    return end >= start ? { start, end, entry: first } : void 0;
  }
  function runDistances(members, entry, adj) {
    const byId = new Map(members.map((m) => [m.id, m]));
    const dist = /* @__PURE__ */ new Map();
    const queue = [];
    for (const neighborId of adj.get(entry.id) ?? []) {
      if (byId.has(neighborId)) {
        dist.set(neighborId, 0);
        queue.push(neighborId);
      }
    }
    if (queue.length === 0) {
      for (const member of members) {
        dist.set(member.id, 0);
        queue.push(member.id);
      }
    }
    for (const id of queue) {
      const reach = dist.get(id) + byId.get(id).length;
      for (const neighborId of adj.get(id) ?? []) {
        if (byId.has(neighborId)) {
          const known = dist.get(neighborId);
          if (known === void 0 || reach < known) {
            dist.set(neighborId, reach);
            queue.push(neighborId);
          }
        }
      }
    }
    return dist;
  }
  function runOffsets(members, entry, adj) {
    const dist = runDistances(members, entry, adj);
    const ordered = [...members].sort((a, b) => dist.get(a.id) - dist.get(b.id));
    const rank = new Map(ordered.map((m, i) => [m.id, i]));
    const byId = new Map(members.map((m) => [m.id, m]));
    const offsets = /* @__PURE__ */ new Map();
    for (const [i, member] of ordered.entries()) {
      let offset = 0;
      for (const neighborId of adj.get(member.id) ?? []) {
        const neighbor = byId.get(neighborId);
        if (neighbor && rank.get(neighborId) < i) {
          offset = Math.max(offset, offsets.get(neighborId) + neighbor.length);
        }
      }
      offsets.set(member.id, offset);
    }
    return { offsets, ordered };
  }
  function projectAlleles(graph) {
    const byId = new Map(
      graph.nodes.filter(isAnchored).map((n) => [n.id, n])
    );
    const adj = buildNeighbors(graph);
    const claimed = /* @__PURE__ */ new Set();
    const alleles = [];
    for (const node of byId.values()) {
      if (node.stable.rank !== REFERENCE_RANK && !claimed.has(node.id)) {
        const { members, anchors } = collectRun(node.id, byId, adj, claimed);
        const span = anchorSpan(anchors);
        if (span) {
          const { offsets, ordered } = runOffsets(members, span.entry, adj);
          alleles.push({
            start: span.start,
            refSpan: span.end - span.start,
            nodeIds: ordered.map((m) => m.id),
            nodeOffsets: ordered.map((m) => offsets.get(m.id)),
            pathLength: ordered.reduce(
              (max, m) => Math.max(max, offsets.get(m.id) + m.length),
              0
            )
          });
        }
      }
    }
    return alleles.sort((a, b) => a.start - b.start);
  }

  // ../bandage-core/src/layout/placeOffReference.ts
  var MIN_DELETION_BP2 = 1;
  var MIN_ALLELE_SPAN_FRACTION = 0.015;
  function placeOffReference({
    graph,
    span,
    rowY,
    positions
  }) {
    const minSpan = span * MIN_ALLELE_SPAN_FRACTION;
    const alleles = projectAlleles(graph);
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const alleleDeletions = [];
    for (const allele of alleles) {
      const skipped = allele.refSpan - allele.pathLength;
      if (skipped >= MIN_DELETION_BP2) {
        alleleDeletions.push({ nodeIds: allele.nodeIds, bp: skipped });
      }
      const drawn = Math.max(allele.refSpan, minSpan);
      const scale = allele.pathLength > 0 ? drawn / allele.pathLength : 0;
      allele.nodeIds.forEach((nodeId, i) => {
        const node = byId.get(nodeId);
        if (node) {
          const offset = allele.nodeOffsets[i];
          const even = drawn / allele.nodeIds.length;
          const at = (bp) => allele.start + bp * scale;
          const y = rowY(node);
          positions[nodeId] = scale ? [
            { x: at(offset), y },
            { x: at(offset + node.length), y }
          ] : [
            { x: allele.start + i * even, y },
            { x: allele.start + (i + 1) * even, y }
          ];
        }
      });
    }
    const neighbors = buildNeighbors(graph);
    const queue = Object.keys(positions);
    for (const fromId of queue) {
      const fromEnd = positions[fromId].at(-1).x;
      for (const nextId of neighbors.get(fromId) ?? []) {
        const next = byId.get(nextId);
        if (next && !(nextId in positions)) {
          const y = rowY(next);
          positions[nextId] = [
            { x: fromEnd, y },
            { x: fromEnd + minSpan, y }
          ];
          queue.push(nextId);
        }
      }
    }
    return alleleDeletions;
  }

  // ../bandage-core/src/layout/anchoredLayout.ts
  function rankRows(graph) {
    const present = /* @__PURE__ */ new Set();
    for (const node of graph.nodes) {
      if (node.stable) {
        present.add(node.stable.rank);
      }
    }
    return new Map([...present].sort((a, b) => a - b).map((r, i) => [r, i]));
  }
  function anchoredLayout(graph, region) {
    const backbone = backboneNodes(graph);
    if (backbone.length === 0) {
      return void 0;
    }
    const span = referenceSpan(backbone, region);
    const rows = rankRows(graph);
    const nodePositions = backbonePositions(backbone);
    const alleleDeletions = placeOffReference({
      graph,
      span,
      rowY: (node) => (node.stable ? rows.get(node.stable.rank) ?? rows.size : rows.size) * ROW_HEIGHT_PX,
      positions: nodePositions
    });
    const rowLabels = [...rows].map(([rank, row]) => ({
      label: rank === 0 ? "Reference (rank 0)" : `Rank ${rank}`,
      y: row * ROW_HEIGHT_PX
    }));
    return {
      nodePositions,
      rowLabels,
      referenceAxis: true,
      pixelRows: true,
      alleleDeletions
    };
  }

  // ../bandage-core/src/layout/orderedLayout.ts
  var GUTTER = 12;
  var LANE_PX = ROW_HEIGHT_PX;
  function nodeWidth(node) {
    return 10 + 8 * Math.log2(1 + node.length);
  }
  function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function compareKeys(a, b) {
    return compare(a.at, b.at) || compare(a.side, b.side) || compare(a.hops, b.hops);
  }
  var UNREACHED = { at: Infinity, side: 0, hops: 0 };
  function referenceOrder(graph) {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const key = orderKeys(graph);
    return graph.nodes.map((n) => n.id).sort(
      (a, b) => compareKeys(key.get(a) ?? UNREACHED, key.get(b) ?? UNREACHED) || compare(byId.get(a).name, byId.get(b).name) || compare(a, b)
    );
  }
  function placeByWalks(graph, backbone) {
    const isNode = new Set(graph.nodes.map((n) => n.id));
    const startOf = new Map(backbone.map((n) => [n.id, n.stable.start]));
    const next = /* @__PURE__ */ new Map();
    const prev = /* @__PURE__ */ new Map();
    backbone.forEach((n, i) => {
      prev.set(n.id, backbone[i - 1]?.id);
      next.set(n.id, backbone[i + 1]?.id);
    });
    let head = backbone[0]?.id;
    const insertAfter = (at, id) => {
      const after = next.get(at);
      next.set(at, id);
      prev.set(id, at);
      next.set(id, after);
      if (after !== void 0) {
        prev.set(after, id);
      }
    };
    const insertBefore = (at, id) => {
      const before = prev.get(at);
      if (before === void 0) {
        head = id;
        prev.set(id, void 0);
        next.set(id, at);
        prev.set(at, id);
      } else {
        insertAfter(before, id);
      }
    };
    for (const path of graph.paths ?? []) {
      let rising = 0;
      let falling = 0;
      let last;
      for (const id of path.nodeIds) {
        const start = startOf.get(id);
        if (start !== void 0) {
          if (last !== void 0 && start !== last) {
            if (start > last) {
              rising++;
            } else {
              falling++;
            }
          }
          last = start;
        }
      }
      const ids = falling > rising ? [...path.nodeIds].reverse() : path.nodeIds;
      let from;
      const leading = /* @__PURE__ */ new Set();
      for (const id of ids) {
        if (next.has(id)) {
          if (from === void 0) {
            for (const lead of leading) {
              insertBefore(id, lead);
            }
          }
          from = id;
        } else if (isNode.has(id)) {
          if (from === void 0) {
            leading.add(id);
          } else {
            insertAfter(from, id);
            from = id;
          }
        }
      }
    }
    const placed = [];
    for (let id = head; id !== void 0; id = next.get(id)) {
      placed.push(id);
    }
    return placed;
  }
  function placeBySearch(adjacent, key) {
    const queue = [...key.entries()].sort(([a, ka], [b, kb]) => compareKeys(ka, kb) || compare(a, b)).map(([id]) => id);
    const placed = queue.length;
    for (const id of queue) {
      const from = key.get(id);
      for (const nb of adjacent.get(id) ?? []) {
        if (!key.has(nb)) {
          key.set(nb, { at: from.at, side: 1, hops: from.hops + 1 });
          queue.push(nb);
        }
      }
    }
    const searched = new Set(queue.slice(placed));
    const sided = /* @__PURE__ */ new Set();
    for (const seed of searched) {
      if (sided.has(seed)) {
        continue;
      }
      const { at } = key.get(seed);
      const run = [seed];
      sided.add(seed);
      let farHalf = true;
      for (const id of run) {
        const { hops } = key.get(id);
        let deadEnd = true;
        let touchesLeft = false;
        for (const nb of adjacent.get(id) ?? []) {
          const other2 = key.get(nb);
          if (other2.at === at && searched.has(nb)) {
            deadEnd &&= other2.hops <= hops;
            if (!sided.has(nb)) {
              sided.add(nb);
              run.push(nb);
            }
          } else if (other2.at !== at) {
            touchesLeft ||= other2.at < at;
            farHalf &&= other2.at < at;
          }
        }
        farHalf &&= !deadEnd || touchesLeft;
      }
      if (farHalf) {
        for (const id of run) {
          const k = key.get(id);
          key.set(id, { ...k, side: -1, hops: -k.hops });
        }
      }
    }
  }
  function orderKeys(graph) {
    const ids = new Set(graph.nodes.map((n) => n.id));
    const adjacent = /* @__PURE__ */ new Map();
    for (const e of graph.edges) {
      if (!ids.has(e.from) || !ids.has(e.to)) {
        continue;
      }
      ;
      (adjacent.get(e.from) ?? adjacent.set(e.from, []).get(e.from)).push(e.to);
      (adjacent.get(e.to) ?? adjacent.set(e.to, []).get(e.to)).push(e.from);
    }
    const backbone = graph.nodes.filter(isBackbone).sort(
      (a, b) => compare(a.stable.start, b.stable.start) || compare(a.name, b.name)
    );
    const key = /* @__PURE__ */ new Map();
    placeByWalks(graph, backbone).forEach((id, rank) => {
      key.set(id, { at: rank, side: 0, hops: 0 });
    });
    placeBySearch(adjacent, key);
    return key;
  }
  function layerGraph(graph) {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const order = referenceOrder(graph);
    const key = new Map(order.map((id, i) => [id, i]));
    const isRef = (id) => isBackbone(byId.get(id));
    const preds = new Map(order.map((id) => [id, []]));
    const succs = new Map(order.map((id) => [id, []]));
    const link = (a, b) => {
      preds.get(b).push(a);
      succs.get(a).push(b);
    };
    for (const e of graph.edges) {
      if (e.from === e.to || !key.has(e.from) || !key.has(e.to)) {
        continue;
      }
      if (key.get(e.from) < key.get(e.to)) {
        link(e.from, e.to);
      } else {
        link(e.to, e.from);
      }
    }
    const backbone = order.filter(isRef);
    for (let i = 1; i < backbone.length; i++) {
      link(backbone[i - 1], backbone[i]);
    }
    const layerOf = /* @__PURE__ */ new Map();
    for (const id of order) {
      let l = 0;
      for (const p of preds.get(id)) {
        l = Math.max(l, layerOf.get(p) + 1);
      }
      layerOf.set(id, l);
    }
    for (let i = order.length - 1; i >= 0; i--) {
      const id = order[i];
      const s = succs.get(id);
      if (isRef(id) || s.length === 0) {
        continue;
      }
      let minSucc = Infinity;
      for (const t of s) {
        minSucc = Math.min(minSucc, layerOf.get(t));
      }
      const lo = layerOf.get(id);
      const hi = Math.max(lo, minSucc - 1);
      layerOf.set(id, Math.floor((lo + hi) / 2));
    }
    const layers = [];
    for (const id of order) {
      ;
      (layers[layerOf.get(id)] ??= []).push(id);
    }
    return { layers, layerOf, preds };
  }
  function orderedLayout(graph) {
    if (!graph.nodes.some(isBackbone)) {
      return void 0;
    }
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const isRef = (id) => isBackbone(byId.get(id));
    const { layers, layerOf: layer, preds } = layerGraph(graph);
    const layerWidth = layers.map((ids) => {
      let w = 0;
      for (const id of ids) {
        w = Math.max(w, nodeWidth(byId.get(id)));
      }
      return w;
    });
    const layerX = [];
    let x = 0;
    for (let l = 0; l < layers.length; l++) {
      layerX[l] = x;
      x += layerWidth[l] + GUTTER;
    }
    const y = /* @__PURE__ */ new Map();
    for (const ids of layers) {
      const free = [];
      for (const id of ids) {
        if (isRef(id)) {
          y.set(id, 0);
          continue;
        }
        const placed = preds.get(id).filter((p) => y.has(p));
        let ideal = 0;
        for (const p of placed) {
          ideal += y.get(p) / placed.length;
        }
        free.push({ id, ideal: ideal === 0 ? LANE_PX : ideal });
      }
      free.sort((a, b) => a.ideal - b.ideal);
      const taken = /* @__PURE__ */ new Set([0]);
      for (const { id, ideal } of free) {
        let lane = Math.round(ideal / LANE_PX);
        if (lane === 0) {
          lane = ideal >= 0 ? 1 : -1;
        }
        for (let d = 1; taken.has(lane); d++) {
          if (!taken.has(lane + d)) {
            lane += d;
          } else if (!taken.has(lane - d)) {
            lane -= d;
          }
        }
        taken.add(lane);
        y.set(id, lane * LANE_PX);
      }
    }
    const nodePositions = {};
    for (const n of graph.nodes) {
      const l = layer.get(n.id);
      const w = nodeWidth(n);
      const cx = layerX[l] + layerWidth[l] / 2;
      const ny = y.get(n.id);
      nodePositions[n.id] = [
        { x: cx - w / 2, y: ny },
        { x: cx + w / 2, y: ny }
      ];
    }
    return { nodePositions, referenceAxis: false, pixelRows: true };
  }

  // ../bandage-core/src/layout/sampleRowLayout.ts
  function contributingSamples(graph, keep) {
    const carried = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      if (isOffReference(node)) {
        const { sample } = parsePanSN(node.stable.refName);
        carried.set(sample, (carried.get(sample) ?? 0) + node.length);
      }
    }
    const held = new Map(keep.map((sample, row) => [sample, row]));
    return [...carried.keys()].sort(
      (a, b) => (held.get(a) ?? Infinity) - (held.get(b) ?? Infinity) || carried.get(b) - carried.get(a) || a.localeCompare(b)
    );
  }
  function sampleRowLayout(graph, region, keep = []) {
    const backbone = backboneNodes(graph);
    const samples = contributingSamples(graph, keep);
    if (backbone.length === 0 || samples.length === 0) {
      return void 0;
    }
    const span = referenceSpan(backbone, region);
    const rowOf = new Map(samples.map((s, i) => [s, i + 1]));
    const nodePositions = backbonePositions(backbone);
    const spareRow = samples.length + 1;
    const alleleDeletions = placeOffReference({
      graph,
      span,
      rowY: (node) => {
        const stable = node.stable;
        const row = stable ? rowOf.get(parsePanSN(stable.refName).sample) : void 0;
        return (row ?? spareRow) * ROW_HEIGHT_PX;
      },
      positions: nodePositions
    });
    const referenceSample = parsePanSN(backbone[0].stable.refName).sample;
    const rowLabels = [
      { label: referenceSample, y: 0 },
      ...samples.map((sample) => ({
        label: sample,
        y: rowOf.get(sample) * ROW_HEIGHT_PX
      }))
    ];
    return {
      nodePositions,
      rowLabels,
      sampleRows: samples,
      referenceAxis: true,
      pixelRows: true,
      alleleDeletions
    };
  }

  // ../bandage-core/node_modules/.pnpm/@jbrowse+tubemap-core@0.2.4/node_modules/@jbrowse/tubemap-core/esm/types.js
  function emptyTrackShapes() {
    return {
      rectangles: [],
      curves: [],
      corners: [],
      verticalRectangles: []
    };
  }

  // ../bandage-core/node_modules/.pnpm/@jbrowse+tubemap-core@0.2.4/node_modules/@jbrowse/tubemap-core/esm/panSN.js
  var NOT_SAMPLES = /* @__PURE__ */ new Set(["_gbwt_ref", "unknown"]);
  function parsePanSN2(name) {
    const [sample, haplotype, contig] = name?.split("#") ?? [];
    if (sample === void 0 || sample === "" || NOT_SAMPLES.has(sample) || haplotype === void 0 || !/^\d+$/.test(haplotype) || contig === void 0 || contig === "") {
      return void 0;
    }
    return { sample, haplotype: Number(haplotype), contig };
  }

  // ../bandage-core/node_modules/.pnpm/@jbrowse+tubemap-core@0.2.4/node_modules/@jbrowse/tubemap-core/esm/layout.js
  var DEBUG = false;
  function debugLog(...args) {
    if (DEBUG) {
      console.log(...args);
    }
  }
  var READ_FACET_FIELDS = ["read_group", "sample_name"];
  var FACET_FIELDS = [...READ_FACET_FIELDS, "haplotype_sample"];
  function layersFrom({ layers, coarsenedReadView = false, showReads = true }, hasReads) {
    if (layers !== void 0) {
      return layers;
    }
    const coarsen = coarsenedReadView && showReads;
    const stat = (banded) => banded ? { stat: "coarsen" } : {};
    return [
      { data: "haplotypes", ...stat(coarsen && !hasReads) },
      { data: "reads", ...stat(coarsen && hasReads) }
    ];
  }
  function statOf(layers, data) {
    return layers.find((layer) => layer.data === data)?.stat;
  }
  function configFrom(options, hasReads) {
    return {
      mergeNodes: options.mergeNodes ?? true,
      showReads: options.showReads ?? true,
      coarsenedReadView: options.coarsenedReadView ?? false,
      layers: layersFrom(options, hasReads),
      ignoreStrand: options.ignoreStrand ?? false,
      nodeWidthOption: options.nodeWidthOption ?? "normal",
      charWidth: options.charWidth ?? 8.401,
      trackWidth: options.trackWidth ?? 15,
      freqWidth: options.freqWidth ?? "log"
    };
  }
  function emptyState(config) {
    return {
      config,
      nodes: [],
      tracks: [],
      reads: [],
      nodeMap: /* @__PURE__ */ new Map(),
      nodesPerOrder: [],
      nodeOrders: [],
      assignments: [],
      extraLeft: [],
      extraRight: [],
      maxOrder: -1,
      shapes: emptyTrackShapes(),
      imageBounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
      trackForRuler: void 0,
      coarsenedEdgeMeta: /* @__PURE__ */ new Map()
    };
  }
  function layoutTubeMap(inputNodes, inputTracks, inputReads = [], options = {}) {
    const topology = layoutTopology(inputNodes, inputTracks, inputReads, options);
    return topology && placeTubeMap(topology, options);
  }
  var measurements = /* @__PURE__ */ new WeakMap();
  function layoutTopology(inputNodes, inputTracks, inputReads = [], options = {}) {
    const topology = arrangeTopology(inputNodes, inputTracks, inputReads, options);
    if (topology === void 0) {
      return void 0;
    }
    const everything = place(topology, topology.tracks, topology.reads, "measure");
    everything.nodes.forEach((node, i) => {
      if (node.order >= 0) {
        topology.nodes[i].x = node.x;
      }
    });
    measurements.set(topology, everything);
    return topology;
  }
  function placeTubeMap(topology, options = {}) {
    return placeSubset(topology, selectTracks(topology, options.facet), selectReads(topology, options));
  }
  function placeSubset(topology, tracks, reads, bandIdBase) {
    const measured = measurements.get(topology);
    return measured !== void 0 && tracks.length === topology.tracks.length && reads.length === topology.reads.length ? measured : place(topology, tracks, reads, "topology", bandIdBase);
  }
  function arrangeTopology(inputNodes, inputTracks, inputReads, options) {
    const state = emptyState(configFrom(options, inputReads.length > 0));
    if (inputNodes.length === 0 || inputTracks.length === 0) {
      return void 0;
    }
    structuredClone(inputNodes).forEach((node, i) => {
      node.seq ??= "";
      node.sequenceLength ??= node.seq.length;
      state.nodes[i + 1] = node;
    });
    state.tracks = structuredClone(inputTracks);
    state.reads = state.config.showReads ? structuredClone(inputReads.filter((read) => read.is_secondary !== true)) : [];
    for (let i = state.tracks.length - 1; i >= 0; i -= 1) {
      const t = state.tracks[i];
      t.type ??= "haplotype";
      if (t.hidden === true) {
        state.tracks.splice(i, 1);
        continue;
      }
      if (t.indexOfFirstBase !== void 0) {
        state.trackForRuler = t.name;
      }
    }
    if (state.tracks.length === 0) {
      return void 0;
    }
    straightenTrack(state, 0);
    state.nodeMap = generateNodeMap(state);
    generateTrackIndexSequences(state, state.tracks);
    generateTrackIndexSequences(state, state.reads);
    generateNodeWidth(state);
    if (state.config.mergeNodes) {
      generateNodeSuccessors(state);
      generateNodeOrder(state);
      reverseReversedReads(state);
      mergeNodes(state);
      state.nodeMap = generateNodeMap(state);
      generateNodeWidth(state);
      generateTrackIndexSequences(state, state.tracks);
      generateTrackIndexSequences(state, state.reads);
    }
    generateNodeSuccessors(state);
    generateNodeDegree(state);
    generateNodeOrder(state);
    switchNodeOrientation(state);
    generateNodeOrder(state);
    reverseReversedReads(state);
    generateTrackIndexSequences(state, state.reads);
    return {
      options: state.config,
      nodes: state.nodes,
      tracks: state.tracks,
      reads: state.reads,
      nodeMap: state.nodeMap,
      maxOrder: getMaxOrder(state),
      trackForRuler: state.trackForRuler
    };
  }
  function selectReads(topology, { mappingQualityCutoff = 0, focusReadNames = null, facet }) {
    const focus = focusReadNames ? new Set(focusReadNames) : null;
    return topology.reads.filter((read) => (read.mapping_quality ?? 0) >= mappingQualityCutoff && (focus === null || read.name !== void 0 && focus.has(read.name)) && (facet === void 0 || facetHoldsRead(facet, read)));
  }
  function facetHoldsRead(facet, read) {
    return facet.by === "haplotype_sample" ? "reads" in facet : (read[facet.by] ?? null) === facet.key;
  }
  function references(topology) {
    return new Set(topology.tracks.filter((track, i) => i === 0 || track.name === topology.trackForRuler));
  }
  function selectTracks(topology, facet) {
    if (facet?.by !== "haplotype_sample") {
      return topology.tracks;
    }
    const kept = references(topology);
    return topology.tracks.filter((track) => kept.has(track) || !("reads" in facet) && sampleOf2(track) === facet.key);
  }
  function sampleOf2(track) {
    return parsePanSN2(track.name)?.sample ?? null;
  }
  function place(topology, tracks, reads, x, bandIdBase = {}) {
    const state = emptyState(topology.options);
    topology.nodes.forEach((node, i) => {
      state.nodes[i] = { ...node };
    });
    state.tracks = tracks.map((track) => ({ ...track }));
    state.reads = reads.map((read) => ({ ...read }));
    state.nodeMap = topology.nodeMap;
    state.maxOrder = topology.maxOrder;
    state.trackForRuler = topology.trackForRuler;
    const { layers, ignoreStrand } = state.config;
    const haplotypeBandIdBase = bandIdBase.haplotypes ?? COARSENED_ID_BASE;
    const haplotypeBands = statOf(layers, "haplotypes") === "coarsen" ? bandHaplotypes(state, haplotypeBandIdBase) : void 0;
    if (haplotypeBands !== void 0) {
      state.tracks = [haplotypeBands.ref];
    }
    calculateTrackWidth(state);
    generateLaneAssignment(state);
    generateReadOnlyNodeAttributes(state);
    const readBands = statOf(layers, "reads") === "coarsen" && state.reads.length > 0 ? buildCoarsenedSyntheticBands(state, state.reads, "read", bandIdBase.reads ?? haplotypeBandIdBase + (haplotypeBands?.bands.length ?? 0)) : void 0;
    if (readBands !== void 0) {
      state.reads = readBands.bands;
    }
    const coarsened = {};
    for (const [data, unit2, banding] of [
      ["haplotypes", "haplotype", haplotypeBands],
      ["reads", "read", readBands]
    ]) {
      if (banding !== void 0) {
        reverseReversedReads(state, banding.bands);
        generateTrackIndexSequences(state, banding.bands);
        coarsened[data] = {
          unit: unit2,
          total: banding.total,
          reverse: !ignoreStrand && banding.bands.some((b) => b.is_reverse)
        };
      }
    }
    if (haplotypeBands !== void 0) {
      state.reads = haplotypeBands.bands.concat(state.reads);
    }
    if (state.reads.length > 0) {
      placeReads(state);
      state.tracks = state.tracks.concat(state.reads);
    } else {
      state.nodes.forEach((node) => {
        node.incomingReads = [];
        node.outgoingReads = [];
        node.internalReads = [];
      });
    }
    if (x === "measure") {
      generateNodeXCoords(state);
    }
    generateSVGShapesFromPath(state);
    debugLog("Tracks:", state.tracks);
    debugLog("Nodes:", state.nodes);
    debugLog("Lane assignment:", state.assignments);
    getImageDimensions(state);
    return {
      nodes: state.nodes,
      tracks: state.tracks,
      reads: state.reads,
      nodeMap: state.nodeMap,
      shapes: state.shapes,
      bounds: state.imageBounds,
      maxOrder: state.maxOrder,
      trackForRuler: state.trackForRuler,
      coarsenedEdgeMeta: state.coarsenedEdgeMeta,
      coarsened
    };
  }
  function isReverse(nodeName) {
    return nodeName.startsWith("-");
  }
  function forward(nodeName) {
    return isReverse(nodeName) ? nodeName.substring(1) : nodeName;
  }
  function reverse(nodeName) {
    return isReverse(nodeName) ? nodeName : `-${nodeName}`;
  }
  function flip(nodeName) {
    return isReverse(nodeName) ? forward(nodeName) : reverse(nodeName);
  }
  function isForwardIndex(n) {
    return n > 0;
  }
  function straightenTrack(state, index) {
    const nodesToInvert = /* @__PURE__ */ new Set();
    const visitedForward = /* @__PURE__ */ new Set();
    for (const visit of state.tracks[index].sequence) {
      if (!isReverse(visit)) {
        visitedForward.add(visit);
      } else if (!visitedForward.has(forward(visit))) {
        nodesToInvert.add(forward(visit));
      }
    }
    if (nodesToInvert.size === 0) {
      return;
    }
    for (const { sequence } of [...state.tracks, ...state.reads]) {
      for (let j = 0; j < sequence.length; j += 1) {
        if (nodesToInvert.has(forward(sequence[j]))) {
          sequence[j] = flip(sequence[j]);
        }
      }
    }
    state.nodes.forEach((node) => {
      if (nodesToInvert.has(node.name)) {
        node.seq = getReverseComplement(node.seq);
      }
    });
  }
  function generateReadOnlyNodeAttributes(state) {
    state.nodesPerOrder = [];
    for (let i = 0; i <= state.maxOrder; i += 1) {
      state.nodesPerOrder[i] = [];
    }
    const orderY = /* @__PURE__ */ new Map();
    state.nodes.forEach((node) => {
      if (node.y !== void 0) {
        setMapToMax(orderY, node.order, node.y + node.contentHeight);
      }
    });
    state.tracks.forEach((track) => {
      if (track.type === "haplotype") {
        track.path.forEach((step) => {
          setMapToMax(orderY, step.order, (step.y ?? 0) + track.width);
        });
      }
    });
    state.nodes.forEach((node, i) => {
      if (node.order >= 0 && node.y === void 0) {
        node.y = (orderY.get(node.order) ?? 0) + 25;
        node.contentHeight = 0;
        state.nodesPerOrder[node.order].push(i);
      }
    });
  }
  function setMapToMax(map, key, value) {
    const existing = map.get(key);
    if (existing === void 0) {
      map.set(key, value);
    } else {
      map.set(key, Math.max(existing, value));
    }
  }
  var READ_WIDTH = 7;
  function assignReadsToNodes(state) {
    state.nodes.forEach((node) => {
      node.incomingReads = [];
      node.outgoingReads = [];
      node.internalReads = [];
    });
    state.reads.forEach((read, idx) => {
      if (read.width === void 0 || read.width === 0) {
        read.width = READ_WIDTH;
      }
      if (read.path.length === 1) {
        const firstNode = read.path[0].node;
        if (firstNode !== null) {
          state.nodes[firstNode].internalReads.push(idx);
        }
      } else {
        read.path.forEach((element, pathIdx) => {
          if (pathIdx === 0) {
            const firstNode = read.path[0].node;
            if (firstNode !== null) {
              state.nodes[firstNode].outgoingReads.push([idx, pathIdx]);
            }
          } else {
            const elemNode = element.node;
            if (elemNode !== null) {
              state.nodes[elemNode].incomingReads.push([idx, pathIdx]);
            }
          }
        });
      }
    });
  }
  function placeReads(state) {
    state.reads.forEach((read) => {
      read.path = basicPath(state, read);
    });
    assignReadsToNodes(state);
    const sortedNodes = state.nodes.filter((node) => node.order >= 0);
    sortedNodes.sort(compareNodesByOrder);
    const sets = /* @__PURE__ */ new Map();
    for (let i = 0; i < state.reads.length; i++) {
      const read = state.reads[i];
      const layer = read.haplotypeShare === void 0 ? 1 : 0;
      const source = read.sourceTrackID;
      const key = `${layer}:${source}`;
      const set = sets.get(key);
      if (set === void 0) {
        sets.set(key, { layer, source, reads: /* @__PURE__ */ new Set([i]) });
      } else {
        set.reads.add(i);
      }
    }
    const orderedSets = [...sets.values()].sort((a, b) => a.layer - b.layer || a.source - b.source);
    const topMargin = orderedSets.length > 1 ? READ_WIDTH : 0;
    sortedNodes.forEach((node) => {
      for (const { reads } of orderedSets) {
        placeReadSet(state, reads, node, topMargin);
      }
    });
    const bottomY = calculateBottomY(state);
    const elementsWithoutNode = [];
    state.reads.forEach((read, idx) => {
      const len = read.path.length;
      const prevSegment = new Array(len);
      let lastValidPrev;
      for (let i = 0; i < len; i++) {
        if (i === 0) {
          prevSegment[i] = void 0;
        } else {
          prevSegment[i] = lastValidPrev ?? read.path[0];
        }
        const seg = read.path[i];
        if (seg.node !== null && seg.node) {
          lastValidPrev = seg;
        }
      }
      const nextSegment = new Array(len);
      let firstValidNext;
      for (let i = len - 1; i >= 0; i--) {
        if (i === len - 1) {
          nextSegment[i] = void 0;
        } else {
          nextSegment[i] = firstValidNext ?? read.path[len - 1];
        }
        const seg = read.path[i];
        if (seg.node !== null && seg.node) {
          firstValidNext = seg;
        }
      }
      read.path.forEach((element, pathIdx) => {
        if (element.y === void 0) {
          const previousVisitToNode = prevSegment[pathIdx];
          const nextVisitToNode = nextSegment[pathIdx];
          const betweenCycleReverseTraversal = Boolean(
            // A segment can be between a cycle if it there are nodes on both sides
            nextVisitToNode && previousVisitToNode && // A segment is between a cycle if the next node it visits is behind the previous node it visited
            (previousVisitToNode.order > nextVisitToNode.order || // A segment can also be between a cycle if it's visiting the same node it just visited in the same direction
            nextVisitToNode.order === previousVisitToNode.order && nextVisitToNode.isForward === previousVisitToNode.isForward)
          );
          element.betweenCycleReverseTraversal = betweenCycleReverseTraversal;
          elementsWithoutNode.push({
            readIndex: idx,
            pathIndex: pathIdx,
            previousY: previousVisitToNode?.y,
            previousNode: previousVisitToNode?.node
          });
        }
      });
    });
    elementsWithoutNode.sort((a, b) => compareNoNodeReads(state, a, b));
    elementsWithoutNode.forEach((element) => {
      const read = state.reads[element.readIndex];
      const segment = read.path[element.pathIndex];
      segment.y = bottomY[segment.order];
      bottomY[segment.order] += read.width;
    });
    debugLog("Reads:", state.reads);
  }
  function placeReadSet(state, toPlace, node, topMargin) {
    let incomingReads = node.incomingReads.filter(([readID]) => toPlace.has(readID));
    const outgoingReads = node.outgoingReads.filter(([readID]) => toPlace.has(readID));
    const internalReads = node.internalReads.filter((readID) => toPlace.has(readID));
    if (incomingReads.length === 0 && outgoingReads.length === 0 && internalReads.length === 0) {
      topMargin = 0;
    }
    const startY = node.y + node.contentHeight + topMargin * 2;
    const incomingKeys = incomingReads.map((entry) => {
      const [readID, pathIdx] = entry;
      const path = state.reads[readID].path;
      let decisionStep = pathIdx + 1;
      let foundY;
      for (let k = 1; k <= pathIdx; k++) {
        const y = path[pathIdx - k]?.y;
        if (y !== void 0) {
          decisionStep = k;
          foundY = y;
          break;
        }
      }
      return { entry, decisionStep, y: foundY };
    });
    incomingKeys.sort(compareIncomingReadKeys);
    incomingReads = incomingKeys.map((k) => k.entry);
    let currentY = startY;
    const occupiedUntil = /* @__PURE__ */ new Map();
    incomingReads.forEach((readElement) => {
      const read = state.reads[readElement[0]];
      read.path[readElement[1]].y = currentY;
      setOccupiedUntil(occupiedUntil, read, readElement[1], currentY, node);
      currentY += read.width;
    });
    let maxY = currentY;
    outgoingReads.sort((a, b) => compareReadOutgoingSegmentsByGoingTo(state, a, b));
    const occupiedFrom = /* @__PURE__ */ new Map();
    currentY = startY;
    outgoingReads.forEach((readElement) => {
      const read = state.reads[readElement[0]];
      const firstNodeOffset = read.firstNodeOffset ?? 0;
      read.path[readElement[1]].y = currentY;
      occupiedFrom.set(currentY, firstNodeOffset);
      const occUntil = occupiedUntil.get(currentY);
      if (occUntil === void 0 || occUntil + 1 <= firstNodeOffset) {
        currentY += read.width;
        maxY = Math.max(maxY, currentY);
      } else {
        occupiedUntil.set(currentY, 0);
        incomingReads.forEach((incReadElementIndices) => {
          const incRead = state.reads[incReadElementIndices[0]];
          const incReadPathElement = incRead.path[incReadElementIndices[1]];
          if (incReadPathElement.y !== void 0 && incReadPathElement.y >= currentY) {
            incReadPathElement.y += read.width;
            setOccupiedUntil(occupiedUntil, incRead, incReadElementIndices[1], incReadPathElement.y, node);
          }
        });
        currentY += read.width;
        maxY += read.width;
      }
    });
    internalReads.sort((a, b) => compareInternalReads(state, a, b));
    internalReads.forEach((readIdx) => {
      const currentRead = state.reads[readIdx];
      const firstNodeOffset = currentRead.firstNodeOffset ?? 0;
      const finalNodeCoverLength = currentRead.finalNodeCoverLength ?? 0;
      currentY = startY;
      while (firstNodeOffset < (occupiedUntil.get(currentY) ?? -Infinity) + 2 || finalNodeCoverLength > (occupiedFrom.get(currentY) ?? Infinity) - 3) {
        currentY += currentRead.width || READ_WIDTH;
      }
      currentRead.path[0].y = currentY;
      occupiedUntil.set(currentY, finalNodeCoverLength);
      maxY = Math.max(maxY, currentY);
    });
    const heightIncrease = maxY - node.y - node.contentHeight;
    node.contentHeight += heightIncrease;
    adjustVertically3(state, node, heightIncrease);
  }
  function compareIncomingReadKeys(a, b) {
    if (a.decisionStep !== b.decisionStep) {
      return a.decisionStep - b.decisionStep;
    }
    if (a.y === void 0 || b.y === void 0) {
      return (a.y === void 0 ? 0 : 1) - (b.y === void 0 ? 0 : 1);
    }
    return a.y - b.y;
  }
  function setOccupiedUntil(map, read, pathIndex, y, node) {
    if (pathIndex === read.path.length - 1) {
      map.set(y, read.finalNodeCoverLength ?? 0);
    } else {
      map.set(y, node.sequenceLength);
    }
  }
  function compareNoNodeReads(state, a, b) {
    const readA = state.reads[a.readIndex];
    const readB = state.reads[b.readIndex];
    const segmentA = readA.path[a.pathIndex];
    const segmentB = readB.path[b.pathIndex];
    if (segmentA.order !== segmentB.order) {
      return segmentA.order - segmentB.order;
    }
    if (readA.sourceTrackID !== readB.sourceTrackID) {
      return readA.sourceTrackID - readB.sourceTrackID;
    }
    if (a.previousNode && b.previousNode) {
      const prevNodeA = state.nodes[a.previousNode];
      const prevNodeB = state.nodes[b.previousNode];
      if (prevNodeA && prevNodeB && prevNodeA.order !== prevNodeB.order) {
        return prevNodeA.order - prevNodeB.order;
      }
    }
    const aPrev = a.previousY ?? 0;
    const bPrev = b.previousY ?? 0;
    const aReverse = segmentA.betweenCycleReverseTraversal === true;
    const bReverse = segmentB.betweenCycleReverseTraversal === true;
    if (aReverse !== bReverse) {
      return aReverse ? 1 : -1;
    }
    return aReverse ? bPrev - aPrev : aPrev - bPrev;
  }
  function compareReadOutgoingSegmentsByGoingTo(state, [readIndexA, pathIndexA], [readIndexB, pathIndexB]) {
    const readA = state.reads[readIndexA];
    const readB = state.reads[readIndexB];
    let previousValidYA;
    let previousValidYB;
    let lastPathIndexA = readA.path.length - 1;
    let lastPathIndexB = readB.path.length - 1;
    while (!previousValidYA && lastPathIndexA >= 0) {
      previousValidYA = readA.path[lastPathIndexA]?.y;
      lastPathIndexA -= 1;
    }
    while (!previousValidYB && lastPathIndexB >= 0) {
      previousValidYB = readB.path[lastPathIndexB]?.y;
      lastPathIndexB -= 1;
    }
    if (previousValidYA && previousValidYB) {
      return previousValidYA - previousValidYB;
    }
    const initialNodeA = readA.path[pathIndexA]?.node;
    const initialNodeB = readB.path[pathIndexB]?.node;
    let nodeA = typeof initialNodeA === "number" ? state.nodes[initialNodeA] : null;
    let nodeB = typeof initialNodeB === "number" ? state.nodes[initialNodeB] : null;
    while (nodeA && nodeB && nodeA === nodeB) {
      if (pathIndexA < readA.path.length - 1) {
        pathIndexA += 1;
        while (readA.path[pathIndexA]?.node === null) {
          pathIndexA += 1;
        }
        const nextNodeIdx = readA.path[pathIndexA]?.node;
        nodeA = typeof nextNodeIdx === "number" ? state.nodes[nextNodeIdx] : null;
      } else {
        nodeA = null;
      }
      if (pathIndexB < readB.path.length - 1) {
        pathIndexB += 1;
        while (readB.path[pathIndexB]?.node === null) {
          pathIndexB += 1;
        }
        const nextNodeIdx = readB.path[pathIndexB]?.node;
        nodeB = typeof nextNodeIdx === "number" ? state.nodes[nextNodeIdx] : null;
      } else {
        nodeB = null;
      }
    }
    if (nodeA) {
      if (nodeB) {
        return compareNodesByOrder(nodeA, nodeB);
      }
      return 1;
    }
    if (nodeB) {
      return -1;
    }
    const beginDiff = (readA.firstNodeOffset ?? 0) - (readB.firstNodeOffset ?? 0);
    if (beginDiff !== 0) {
      return beginDiff;
    }
    return (readA.finalNodeCoverLength ?? 0) - (readB.finalNodeCoverLength ?? 0);
  }
  function compareTrackByInitialOrdering(trackA, trackB) {
    const pathA = trackA.path;
    const pathB = trackB.path;
    let AIndex = 0;
    let BIndex = 0;
    while (AIndex < pathA.length && BIndex < pathB.length) {
      const a = pathA[AIndex];
      const b = pathB[BIndex];
      const trackAOrder = a.order;
      const trackBOrder = b.order;
      if (trackAOrder === trackBOrder && a.node && b.node) {
        return (b.y ?? 0) - (a.y ?? 0);
      } else if (trackAOrder < trackBOrder) {
        AIndex += 1;
      } else if (trackAOrder > trackBOrder) {
        BIndex += 1;
      } else {
        AIndex += 1;
        BIndex += 1;
      }
    }
    return 0;
  }
  function compareInternalReads(state, idxA, idxB) {
    const a = state.reads[idxA];
    const b = state.reads[idxB];
    const aFirst = a.firstNodeOffset ?? 0;
    const bFirst = b.firstNodeOffset ?? 0;
    if (aFirst < bFirst) {
      return -1;
    } else if (aFirst > bFirst) {
      return 1;
    }
    const aLast = a.finalNodeCoverLength ?? 0;
    const bLast = b.finalNodeCoverLength ?? 0;
    if (aLast < bLast) {
      return -1;
    } else if (aLast > bLast) {
      return 1;
    }
    return 0;
  }
  function calculateBottomY(state) {
    const bottomY = [];
    for (let i = 0; i <= state.maxOrder; i += 1) {
      bottomY.push(0);
    }
    state.nodes.forEach((node) => {
      if (node.y !== void 0) {
        bottomY[node.order] = Math.max(bottomY[node.order], node.y + node.contentHeight + 20);
      }
    });
    state.tracks.forEach((track) => {
      track.path.forEach((element) => {
        bottomY[element.order] = Math.max(bottomY[element.order], (element.y ?? 0) + track.width);
      });
    });
    return bottomY;
  }
  function basicPath(state, track) {
    const path = [];
    const pass = (order, isForward) => {
      path.push({ order, isForward, node: null });
    };
    const visit = (order, isForward, node) => {
      path.push({ order, isForward, node });
    };
    let currentNodeIndex = Math.abs(track.indexSequence[0]);
    let currentNodeIsForward = isForwardIndex(track.indexSequence[0]);
    let currentNode = state.nodes[currentNodeIndex];
    visit(currentNode.order, currentNodeIsForward, currentNodeIndex);
    for (let i = 1; i < track.sequence.length; i += 1) {
      const previousNode = currentNode;
      const previousNodeIsForward = currentNodeIsForward;
      currentNodeIndex = Math.abs(track.indexSequence[i]);
      currentNodeIsForward = isForwardIndex(track.indexSequence[i]);
      currentNode = state.nodes[currentNodeIndex];
      const { order } = currentNode;
      if (order > previousNode.order) {
        if (!previousNodeIsForward) {
          pass(previousNode.order, true);
        }
        for (let j = previousNode.order + 1; j < order; j += 1) {
          pass(j, true);
        }
        if (!currentNodeIsForward) {
          pass(order, true);
        }
      } else if (order < previousNode.order) {
        if (previousNodeIsForward) {
          pass(previousNode.order, false);
        }
        for (let j = previousNode.order - 1; j > order; j -= 1) {
          pass(j, false);
        }
        if (currentNodeIsForward) {
          pass(order, false);
        }
      } else if (currentNodeIsForward === previousNodeIsForward) {
        pass(order, !currentNodeIsForward);
      }
      visit(order, currentNodeIsForward, currentNodeIndex);
    }
    return path;
  }
  function reverseReversedReads(state, reads = state.reads) {
    reads.forEach((read) => {
      let pos = 0;
      while (pos < read.sequence.length && read.sequence[pos].startsWith("-")) {
        pos += 1;
      }
      if (pos === read.sequence.length) {
        read.is_reverse = true;
        read.sequence = read.sequence.reverse();
        for (let i = 0; i < read.sequence.length; i += 1) {
          read.sequence[i] = forward(read.sequence[i]);
        }
        const sequenceNew = read.sequenceNew ?? [];
        sequenceNew.reverse();
        read.sequenceNew = sequenceNew;
        for (const entry of sequenceNew) {
          entry.nodeName = forward(entry.nodeName);
          reverseMismatches(entry.mismatches, nodeByName(state, entry.nodeName).sequenceLength);
        }
        const temp = read.firstNodeOffset ?? 0;
        const firstLen = nodeByName(state, read.sequence[0]).sequenceLength;
        read.firstNodeOffset = firstLen - (read.finalNodeCoverLength ?? 0);
        const lastLen = nodeByName(state, read.sequence[read.sequence.length - 1]).sequenceLength;
        read.finalNodeCoverLength = lastLen - temp;
      }
    });
  }
  function reverseMismatches(mismatches, sequenceLength) {
    mismatches.forEach((mm) => {
      Object.assign(mm, mirroredMismatch(mm, sequenceLength));
    });
  }
  function mirroredMismatch(mm, sequenceLength) {
    const span = mm.type === "insertion" ? 0 : mm.type === "deletion" ? mm.length ?? 0 : mm.seq?.length ?? 0;
    return {
      ...mm,
      pos: sequenceLength - mm.pos - span,
      ...mm.seq !== void 0 && { seq: getReverseComplement(mm.seq) }
    };
  }
  var COMPLEMENT = { A: "T", T: "A", C: "G", G: "C" };
  function getReverseComplement(s) {
    let result = "";
    for (let i = s.length - 1; i >= 0; i -= 1) {
      result += COMPLEMENT[s.charAt(i)] ?? "N";
    }
    return result;
  }
  function generateTrackIndexSequences(state, tracksOrReads) {
    const signedIndexOf = /* @__PURE__ */ new Map();
    tracksOrReads.forEach((track) => {
      track.indexSequence = track.sequence.map((nodeName) => {
        let signed = signedIndexOf.get(nodeName);
        if (signed === void 0) {
          const index = state.nodeMap.get(forward(nodeName));
          if (index === void 0) {
            throw new Error(`Track ${track.name ?? track.id} visits unknown node ${nodeName}`);
          }
          signed = isReverse(nodeName) ? -index : index;
          signedIndexOf.set(nodeName, signed);
        }
        return signed;
      });
    });
  }
  var NODE_HORIZONTAL_SLACK = 20;
  function getImageDimensions(state) {
    const bounds = { minX: 99, maxX: -99, minY: 99, maxY: -99 };
    state.nodes.forEach((node) => {
      if (node.x !== void 0) {
        bounds.minX = Math.min(bounds.minX, node.x);
        bounds.maxX = Math.max(bounds.maxX, node.x + NODE_HORIZONTAL_SLACK + node.pixelWidth);
      }
      if (node.y !== void 0) {
        bounds.minY = Math.min(bounds.minY, node.y - 10);
        bounds.maxY = Math.max(bounds.maxY, node.y + node.contentHeight + 10);
      }
    });
    state.tracks.forEach((track) => {
      track.path.forEach((segment) => {
        const y = segment.y ?? 0;
        bounds.maxY = Math.max(bounds.maxY, y + track.width);
        bounds.minY = Math.min(bounds.minY, y);
      });
    });
    state.imageBounds = bounds;
  }
  function nodeByName(state, nodeName) {
    const index = state.nodeMap.get(forward(nodeName));
    const node = index === void 0 ? void 0 : state.nodes[index];
    if (node === void 0) {
      throw new Error(`Unknown node ${nodeName}`);
    }
    return node;
  }
  function generateNodeMap(state) {
    const nodeMap = /* @__PURE__ */ new Map();
    state.nodes.forEach((node, index) => {
      nodeMap.set(node.name, index);
    });
    return nodeMap;
  }
  function generateNodeSuccessors(state) {
    const successorSets = state.nodes.map(() => /* @__PURE__ */ new Set());
    const predecessorSets = state.nodes.map(() => /* @__PURE__ */ new Set());
    const addEdges = (track) => {
      for (let i = 0; i < track.indexSequence.length - 1; i += 1) {
        const current = Math.abs(track.indexSequence[i]);
        const follower = Math.abs(track.indexSequence[i + 1]);
        successorSets[current].add(follower);
        predecessorSets[follower].add(current);
      }
    };
    state.tracks.forEach(addEdges);
    state.reads.forEach(addEdges);
    state.nodes.forEach((node, i) => {
      node.successors = Array.from(successorSets[i]);
      node.predecessors = Array.from(predecessorSets[i]);
    });
  }
  function generateNodeOrderOfSingleTrack(state, sequence) {
    let forwardOrder = 0;
    let backwardOrder = 0;
    let minOrder = 0;
    sequence.forEach((nodeIndex) => {
      const idx = Math.abs(nodeIndex);
      if (nodeIndex < 0) {
        const order = state.nodeOrders[idx] ??= backwardOrder;
        if (order < minOrder) {
          minOrder = order;
        }
        forwardOrder = order;
        backwardOrder = order - 1;
      } else {
        const order = state.nodeOrders[idx] ??= forwardOrder;
        forwardOrder = order + 1;
        backwardOrder = order;
      }
    });
    if (minOrder < 0) {
      increaseOrderForAllNodes(state, -minOrder);
    }
  }
  function generateNodeOrderTrackBeginning(state, sequence) {
    let anchorIndex = 0;
    let minOrder = 0;
    while (anchorIndex < sequence.length && state.nodeOrders[Math.abs(sequence[anchorIndex])] === void 0) {
      anchorIndex += 1;
    }
    if (anchorIndex >= sequence.length) {
      return null;
    }
    const anchorSeqVal = sequence[anchorIndex];
    let currentOrder;
    let increment;
    if (anchorSeqVal >= 0) {
      currentOrder = state.nodeOrders[anchorSeqVal] - 1;
      increment = -1;
    } else {
      currentOrder = state.nodeOrders[-anchorSeqVal] + 1;
      increment = 1;
    }
    for (let j = anchorIndex - 1; j >= 0; j -= 1) {
      const idx = Math.abs(sequence[j]);
      if (state.nodeOrders[idx] === void 0) {
        state.nodeOrders[idx] = currentOrder;
        minOrder = Math.min(minOrder, currentOrder);
        currentOrder += increment;
      }
    }
    if (minOrder < 0) {
      increaseOrderForAllNodes(state, -minOrder);
    }
    return anchorIndex;
  }
  var UNREACHABLE_ORDER = -1;
  function fillUnassignedOrders(orders) {
    const filled = [];
    for (const order of orders) {
      filled.push(order ?? UNREACHABLE_ORDER);
    }
    return filled;
  }
  function generateNodeOrder(state) {
    let modifiedSequence;
    let currentOrder;
    let rightIndex;
    let leftIndex;
    let minOrder = 0;
    const tracksAndReads = state.tracks.concat(state.reads);
    const reachability = {
      stamp: new Int32Array(state.nodes.length),
      generation: 0
    };
    state.nodeOrders = new Array(state.nodes.length).fill(void 0);
    state.nodes.forEach((node) => {
      node.order = void 0;
    });
    generateNodeOrderOfSingleTrack(state, state.tracks[0].indexSequence);
    for (let i = 1; i < tracksAndReads.length; i += 1) {
      debugLog(`generating order for track ${i + 1}`);
      rightIndex = generateNodeOrderTrackBeginning(state, tracksAndReads[i].indexSequence);
      if (rightIndex === null) {
        if (i < state.tracks.length) {
          generateNodeOrderOfSingleTrack(state, tracksAndReads[i].indexSequence);
        } else {
          tracksAndReads.splice(i, 1);
          state.reads.splice(i - state.tracks.length, 1);
          i -= 1;
        }
        continue;
      }
      modifiedSequence = uninvert(tracksAndReads[i].indexSequence);
      while (rightIndex < modifiedSequence.length) {
        leftIndex = rightIndex;
        rightIndex += 1;
        while (rightIndex < modifiedSequence.length && state.nodeOrders[modifiedSequence[rightIndex]] === void 0) {
          rightIndex += 1;
        }
        if (rightIndex < modifiedSequence.length) {
          currentOrder = state.nodeOrders[modifiedSequence[leftIndex]] + 1;
          for (let j = leftIndex + 1; j < rightIndex; j += 1) {
            state.nodeOrders[modifiedSequence[j]] = currentOrder;
            currentOrder += 1;
          }
          if (state.nodeOrders[modifiedSequence[rightIndex]] > state.nodeOrders[modifiedSequence[leftIndex]]) {
            if (state.nodeOrders[modifiedSequence[rightIndex]] < currentOrder) {
              increaseOrderForSuccessors(state, modifiedSequence[rightIndex], modifiedSequence[rightIndex - 1], currentOrder);
            }
          } else {
            if (tracksAndReads[i].indexSequence[rightIndex] >= 0 && !isSuccessor(state, modifiedSequence[rightIndex], modifiedSequence[leftIndex], reachability)) {
              increaseOrderForSuccessors(state, modifiedSequence[rightIndex], modifiedSequence[rightIndex - 1], currentOrder);
            } else {
              if (tracksAndReads[i].indexSequence[leftIndex] < 0 || state.nodes[modifiedSequence[leftIndex + 1]].degree < 2 && state.nodeOrders[modifiedSequence[rightIndex]] < state.nodeOrders[modifiedSequence[leftIndex]]) {
                currentOrder = state.nodeOrders[modifiedSequence[leftIndex]] - 1;
                for (let j = leftIndex + 1; j < rightIndex; j += 1) {
                  state.nodeOrders[modifiedSequence[j]] = currentOrder;
                  minOrder = Math.min(minOrder, currentOrder);
                  currentOrder -= 1;
                }
              }
            }
          }
        } else {
          if (tracksAndReads[i].indexSequence[leftIndex] >= 0) {
            currentOrder = state.nodeOrders[modifiedSequence[leftIndex]] + 1;
            for (let j = leftIndex + 1; j < modifiedSequence.length; j += 1) {
              const idx = modifiedSequence[j];
              if (state.nodeOrders[idx] === void 0) {
                state.nodeOrders[idx] = currentOrder;
                currentOrder += 1;
              }
            }
          } else {
            currentOrder = state.nodeOrders[modifiedSequence[leftIndex]] - 1;
            for (let j = leftIndex + 1; j < modifiedSequence.length; j += 1) {
              const idx = modifiedSequence[j];
              if (state.nodeOrders[idx] === void 0) {
                state.nodeOrders[idx] = currentOrder;
                minOrder = Math.min(minOrder, currentOrder);
                currentOrder -= 1;
              }
            }
          }
        }
      }
    }
    if (minOrder < 0) {
      increaseOrderForAllNodes(state, -minOrder);
    }
    const finalOrders = fillUnassignedOrders(state.nodeOrders);
    state.nodeOrders = finalOrders;
    finalOrders.forEach((order, i) => {
      const node = state.nodes[i];
      if (node !== void 0) {
        node.order = order;
      }
    });
  }
  function isSuccessor(state, first, second, scratch) {
    scratch.generation += 1;
    const { stamp, generation } = scratch;
    const stack = [first];
    stamp[first] = generation;
    while (stack.length > 0) {
      const current = stack.pop();
      if (current === second) {
        return true;
      }
      for (const childIndex of state.nodes[current].successors) {
        if (stamp[childIndex] !== generation) {
          stamp[childIndex] = generation;
          stack.push(childIndex);
        }
      }
    }
    return false;
  }
  function getMaxOrder(state) {
    let max = -1;
    state.nodeOrders.forEach((order) => {
      if (order !== void 0 && order > max) {
        max = order;
      }
    });
    return max;
  }
  function uninvert(sequence) {
    return sequence.map((v) => Math.abs(v));
  }
  function increaseOrderForAllNodes(state, amount) {
    state.nodeOrders.forEach((order, i) => {
      if (order !== void 0) {
        state.nodeOrders[i] = order + amount;
      }
    });
  }
  function increaseOrderForSuccessors(state, startingNode, tabuNode, newOrder) {
    const increasedOrders = /* @__PURE__ */ new Map();
    const queue = [[startingNode, newOrder]];
    let head = 0;
    while (head < queue.length) {
      const [currentNode, currentOrder] = queue[head];
      head += 1;
      const currentNodeOrder = state.nodeOrders[currentNode];
      if (currentNodeOrder !== void 0 && currentNodeOrder < currentOrder) {
        if (!increasedOrders.has(currentNode) || increasedOrders.get(currentNode) < currentOrder) {
          increasedOrders.set(currentNode, currentOrder);
          state.nodes[currentNode].successors.forEach((successor) => {
            if (state.nodeOrders[successor] > currentNodeOrder && successor !== tabuNode) {
              queue.push([successor, currentOrder + 1]);
            }
          });
          if (currentNode !== startingNode) {
            state.nodes[currentNode].predecessors.forEach((predecessor) => {
              if (state.nodeOrders[predecessor] > currentNodeOrder && predecessor !== tabuNode) {
                queue.push([predecessor, currentOrder + 1]);
              }
            });
          }
        }
      }
    }
    increasedOrders.forEach((value, key) => {
      state.nodeOrders[key] = value;
    });
  }
  function generateNodeDegree(state) {
    state.nodes.forEach((node) => {
      node.tracks = [];
    });
    state.tracks.forEach((track) => {
      track.indexSequence.forEach((nodeIndex) => {
        state.nodes[Math.abs(nodeIndex)].tracks.push(track.id);
      });
    });
    state.nodes.forEach((node) => {
      node.degree = node.tracks.length;
    });
  }
  function switchNodeOrientation(state) {
    switchNodeOrientationForPaths(state, [...state.tracks.slice(1), ...state.reads], state.tracks[0]);
  }
  function switchNodeOrientationForPaths(state, paths, pivotPath) {
    const scores = new Int32Array(state.nodes.length);
    const onPivot = new Uint8Array(state.nodes.length);
    for (const nodeName of pivotPath.sequence) {
      const index = isReverse(nodeName) ? void 0 : state.nodeMap.get(nodeName);
      if (index !== void 0) {
        onPivot[index] = 1;
      }
    }
    for (const path of paths) {
      const { sequence, indexSequence } = path;
      const last = indexSequence.length - 1;
      for (let j = 0; j <= last; j += 1) {
        const index = Math.abs(indexSequence[j]);
        if (onPivot[index] === 1) {
          continue;
        }
        const order = state.nodes[index].order;
        const prevOrder = j > 0 ? state.nodes[Math.abs(indexSequence[j - 1])].order : void 0;
        const nextOrder = j < last ? state.nodes[Math.abs(indexSequence[j + 1])].order : void 0;
        const vote = isReverse(sequence[j]) ? 1 : -1;
        if ((prevOrder === void 0 || prevOrder < order) && (nextOrder === void 0 || order < nextOrder)) {
          scores[index] += vote;
        }
        if ((prevOrder === void 0 || prevOrder > order) && (nextOrder === void 0 || order > nextOrder)) {
          scores[index] -= vote;
        }
      }
    }
    for (const path of paths) {
      const { sequence, indexSequence } = path;
      for (let j = 0; j < indexSequence.length; j += 1) {
        if (scores[Math.abs(indexSequence[j])] > 0) {
          sequence[j] = flip(sequence[j]);
          indexSequence[j] = -indexSequence[j];
        }
      }
    }
    state.nodes.forEach((node, index) => {
      if (scores[index] > 0) {
        node.seq = getReverseComplement(node.seq);
        node.switched = true;
      }
    });
  }
  function generateNodeXCoords(state) {
    let currentX = 0;
    let nextX = 20;
    let currentOrder = -1;
    const sortedNodes = state.nodes.slice();
    sortedNodes.sort(compareNodesByOrder);
    const extra = calculateExtraSpace(state);
    sortedNodes.forEach((node) => {
      if (node.order >= 0) {
        if (node.order > currentOrder) {
          currentOrder = node.order;
          currentX = nextX + 10 * extra[node.order];
        }
        node.x = currentX;
        nextX = Math.max(nextX, currentX + 40 + node.pixelWidth);
      }
    });
  }
  function calculateExtraSpace(state) {
    const leftSideEdges = [];
    const rightSideEdges = [];
    const fallAngleAdjustment = [];
    const extra = [];
    for (let i = 0; i <= state.maxOrder; i += 1) {
      leftSideEdges.push(0);
      rightSideEdges.push(0);
      fallAngleAdjustment.push(0);
    }
    state.tracks.forEach((track) => {
      for (let i = 1; i < track.path.length; i += 1) {
        const seg = track.path[i];
        const prevSeg = track.path[i - 1];
        if (seg.order === prevSeg.order) {
          if (seg.isForward) {
            leftSideEdges[seg.order] = leftSideEdges[seg.order] + 1;
          } else {
            rightSideEdges[seg.order] = rightSideEdges[seg.order] + 1;
          }
        } else {
          const yDifference = Math.abs((seg.y ?? 0) - (prevSeg.y ?? 0));
          fallAngleAdjustment[seg.order] = Math.max(yDifference / 17.5, fallAngleAdjustment[seg.order]);
        }
      }
    });
    extra.push(Math.max(0, leftSideEdges[0] - 1));
    for (let i = 1; i <= state.maxOrder; i += 1) {
      extra.push(Math.max(Math.max(0, leftSideEdges[i] - 1) + Math.max(0, rightSideEdges[i - 1] - 1), fallAngleAdjustment[i]));
    }
    return extra;
  }
  function generateLaneAssignment(state) {
    const prevSegmentPerOrderPerTrack = [];
    const assignmentByOrderAndNode = [];
    for (let i = 0; i <= state.maxOrder; i += 1) {
      state.assignments[i] = [];
      assignmentByOrderAndNode[i] = /* @__PURE__ */ new Map();
      prevSegmentPerOrderPerTrack[i] = [];
    }
    state.tracks.forEach((track, trackNo) => {
      track.path = basicPath(state, track);
      track.path.forEach((segment, segmentNumber) => {
        addToAssignment(state, segment.order, segment.node, trackNo, segmentNumber, prevSegmentPerOrderPerTrack, assignmentByOrderAndNode);
      });
    });
    for (let i = 0; i <= state.maxOrder; i += 1) {
      generateSingleLaneAssignment(state, state.assignments[i], i);
    }
  }
  function addToAssignment(state, order, nodeIndex, trackNo, segmentID, prevSegmentPerOrderPerTrack, assignmentByOrderAndNode) {
    const segment = {
      trackID: trackNo,
      segmentID,
      compareToFromSame: prevSegmentPerOrderPerTrack[order][trackNo] ?? null
    };
    const existing = nodeIndex === null ? void 0 : assignmentByOrderAndNode[order].get(nodeIndex);
    if (existing === void 0) {
      const assignment = {
        type: "single",
        node: nodeIndex,
        tracks: [segment]
      };
      state.assignments[order].push(assignment);
      if (nodeIndex !== null) {
        assignmentByOrderAndNode[order].set(nodeIndex, assignment);
      }
    } else {
      existing.type = "multiple";
      existing.tracks.push(segment);
    }
    prevSegmentPerOrderPerTrack[order][trackNo] = segment;
  }
  function getIdealLanesAndCoords(state, assignment, order) {
    let index;
    assignment.forEach((node) => {
      node.idealLane = 0;
      node.tracks.forEach((track) => {
        if (track.segmentID === 0) {
          track.idealLane = track.trackID;
          track.idealY = null;
        } else {
          if (state.tracks[track.trackID].path[track.segmentID - 1].order === order - 1) {
            track.idealLane = state.tracks[track.trackID].path[track.segmentID - 1].lane ?? void 0;
            track.idealY = state.tracks[track.trackID].path[track.segmentID - 1].y;
          } else if (track.segmentID < state.tracks[track.trackID].path.length - 1 && state.tracks[track.trackID].path[track.segmentID + 1].order === order - 1) {
            track.idealLane = state.tracks[track.trackID].path[track.segmentID + 1].lane ?? void 0;
            track.idealY = state.tracks[track.trackID].path[track.segmentID + 1].y;
          } else {
            index = track.segmentID - 1;
            while (index >= 0 && state.tracks[track.trackID].path[index].order !== order - 1) {
              index -= 1;
            }
            if (index < 0) {
              track.idealLane = track.trackID;
              track.idealY = null;
            } else {
              track.idealLane = state.tracks[track.trackID].path[index].lane;
              track.idealY = state.tracks[track.trackID].path[index].y;
            }
          }
        }
        node.idealLane += track.idealLane;
      });
      node.idealLane /= node.tracks.length;
    });
  }
  function generateSingleLaneAssignment(state, assignment, order) {
    let currentLane = 0;
    const potentialAdjustmentValues = /* @__PURE__ */ new Set();
    let currentY = 20;
    let prevNameIsNull = false;
    let prevTrack = -1;
    getIdealLanesAndCoords(state, assignment, order);
    assignment.sort(compareByIdealLane);
    assignment.forEach((node) => {
      if (node.node !== null) {
        state.nodes[node.node].topLane = currentLane;
        if (prevNameIsNull) {
          currentY -= 10;
        }
        state.nodes[node.node].y = currentY;
        state.nodes[node.node].contentHeight = 0;
        prevNameIsNull = false;
      } else {
        if (prevNameIsNull) {
          currentY -= 25;
        } else if (currentY > 20) {
          currentY -= 10;
        }
        prevNameIsNull = true;
      }
      node.tracks.sort(compareByIdealLane);
      node.tracks.forEach((track) => {
        track.lane = currentLane;
        if (track.trackID === prevTrack && node.node === null && prevNameIsNull) {
          currentY += 10;
        }
        state.tracks[track.trackID].path[track.segmentID].lane = currentLane;
        state.tracks[track.trackID].path[track.segmentID].y = currentY;
        if (typeof track.idealY === "number") {
          potentialAdjustmentValues.add(track.idealY - currentY);
        }
        currentLane += 1;
        currentY += state.tracks[track.trackID].width;
        if (node.node !== null) {
          state.nodes[node.node].contentHeight += state.tracks[track.trackID].width;
        }
        prevTrack = track.trackID;
      });
      currentY += 25;
    });
    adjustVertically(state, assignment, potentialAdjustmentValues);
  }
  function adjustVertically(state, assignment, potentialAdjustmentValues) {
    let verticalAdjustment = 0;
    let minAdjustmentCost = Number.MAX_SAFE_INTEGER;
    potentialAdjustmentValues.forEach((moveBy) => {
      const cost = getVerticalAdjustmentCost(state, assignment, moveBy);
      if (cost < minAdjustmentCost) {
        minAdjustmentCost = cost;
        verticalAdjustment = moveBy;
      }
    });
    assignment.forEach((node) => {
      if (node.node !== null) {
        state.nodes[node.node].y += verticalAdjustment;
      }
      node.tracks.forEach((track) => {
        const seg = state.tracks[track.trackID].path[track.segmentID];
        seg.y = seg.y + verticalAdjustment;
      });
    });
  }
  function adjustVertically3(state, node, adjustBy) {
    if (node.order < 0 || state.assignments[node.order] === void 0) {
      return;
    }
    state.assignments[node.order].forEach((assignmentNode) => {
      if (assignmentNode.node !== null) {
        const aNode = state.nodes[assignmentNode.node];
        if (aNode !== node && aNode.y > node.y) {
          aNode.y += adjustBy;
          assignmentNode.tracks.forEach((track) => {
            const seg = state.tracks[track.trackID].path[track.segmentID];
            seg.y = seg.y + adjustBy;
          });
        }
      } else {
        assignmentNode.tracks.forEach((track) => {
          const seg = state.tracks[track.trackID].path[track.segmentID];
          if (seg.y >= node.y) {
            seg.y = seg.y + adjustBy;
          }
        });
      }
    });
    if (state.nodesPerOrder[node.order].length > 0) {
      state.nodesPerOrder[node.order].forEach((nodeIndex) => {
        if (state.nodes[nodeIndex] !== node && state.nodes[nodeIndex].y > node.y) {
          state.nodes[nodeIndex].y += adjustBy;
        }
      });
    }
  }
  function getVerticalAdjustmentCost(state, assignment, moveBy) {
    let result = 0;
    assignment.forEach((node) => {
      node.tracks.forEach((track) => {
        if (typeof track.idealY === "number" && state.tracks[track.trackID].type !== "read") {
          result += Math.abs(track.idealY - moveBy - state.tracks[track.trackID].path[track.segmentID].y) * state.tracks[track.trackID].width;
        }
      });
    });
    return result;
  }
  function compareByIdealLane(a, b) {
    if (a.idealLane !== void 0) {
      if (b.idealLane !== void 0) {
        if (a.idealLane < b.idealLane) {
          return -1;
        } else if (a.idealLane > b.idealLane) {
          return 1;
        }
        return 0;
      }
      return -1;
    }
    if (b.idealLane !== void 0) {
      return 1;
    }
    return 0;
  }
  function compareNodesByOrder(a, b) {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    if (a.y !== void 0 && b.y !== void 0) {
      return a.y - b.y;
    }
    return 0;
  }
  function calculateTrackWidth(state) {
    let allAreFour = true;
    const NARROW_WIDTH = 4;
    const WIDE_WIDTH = state.config.trackWidth;
    if (state.config.freqWidth === "linear") {
      for (const track of state.tracks) {
        track.width = track.type === "read" ? NARROW_WIDTH : Math.max(1, Math.round(track.freq ?? 1)) * WIDE_WIDTH;
      }
      return;
    }
    for (const track of state.tracks) {
      if (track.freq !== void 0) {
        track.width = Math.round((Math.log(Math.max(track.freq, 1)) + 1) * NARROW_WIDTH);
      } else {
        track.width = WIDE_WIDTH;
        if (track.type !== void 0 && track.type === "read") {
          track.width = NARROW_WIDTH;
        }
      }
      if (track.width !== NARROW_WIDTH) {
        allAreFour = false;
      }
    }
    if (allAreFour) {
      state.tracks.forEach((track) => {
        if (track.freq !== void 0) {
          track.width = WIDE_WIDTH;
        }
      });
    }
  }
  function getReadXStart(state, read) {
    const seg = read.path[0];
    const node = state.nodes[seg.node];
    const offset = read.firstNodeOffset ?? 0;
    return clampedXCoordinateOfBaseWithinNode(node, seg.isForward ? offset : node.sequenceLength - offset);
  }
  function getReadXEnd(state, read) {
    const seg = read.path[read.path.length - 1];
    const node = state.nodes[seg.node];
    const cover = read.finalNodeCoverLength ?? 0;
    return clampedXCoordinateOfBaseWithinNode(node, seg.isForward ? cover : node.sequenceLength - cover);
  }
  function clampedXCoordinateOfBaseWithinNode(node, base) {
    const [nodeLeftX, nodeRightX] = nodePixelCoordinatesInX(node);
    if (node.sequenceLength === 0) {
      return nodeLeftX;
    }
    const clamped = Math.min(Math.max(base, 0), node.sequenceLength);
    return nodeLeftX + clamped / node.sequenceLength * (nodeRightX - nodeLeftX);
  }
  function generateSVGShapesFromPath(state) {
    let xStart;
    let xEnd;
    let yStart;
    let yEnd;
    for (let i = 0; i <= state.maxOrder; i += 1) {
      state.extraLeft.push(0);
      state.extraRight.push(0);
    }
    const orderStartX = [];
    const orderEndX = [];
    state.nodes.forEach((node) => {
      if (node.x !== void 0) {
        orderStartX[node.order] = node.x;
        if (orderEndX[node.order] === void 0) {
          orderEndX[node.order] = node.x + node.pixelWidth;
        } else {
          orderEndX[node.order] = Math.max(orderEndX[node.order], node.x + node.pixelWidth);
        }
      }
    });
    const reference = state.tracks[0];
    state.tracks.sort(compareTrackByInitialOrdering);
    state.tracks.forEach((track) => {
      yStart = track.path[0].y;
      if (track.type !== "read") {
        if (track.sequence[0].startsWith("-")) {
          xStart = orderEndX[track.path[0].order] + 20;
        } else {
          xStart = orderStartX[track.path[0].order] - 20;
        }
      } else {
        xStart = getReadXStart(state, track);
      }
      for (let i = 0; i < track.path.length; i += 1) {
        if (track.path[i].y !== yStart) {
          if (track.path[i - 1].isForward) {
            xEnd = orderEndX[track.path[i - 1].order];
          } else {
            xEnd = orderStartX[track.path[i - 1].order];
          }
          if (xEnd !== xStart) {
            state.shapes.rectangles.push({
              xStart: Math.min(xStart, xEnd),
              yStart,
              xEnd: Math.max(xStart, xEnd),
              yEnd: yStart + track.width - 1,
              // TODO: This is not actually the index of the track!
              id: track.id,
              name: track.name,
              type: track.type
            });
          }
          if (track.path[i].order - 1 === track.path[i - 1].order) {
            xStart = xEnd;
            xEnd = orderStartX[track.path[i].order];
            yEnd = track.path[i].y;
            state.shapes.curves.push({
              xStart,
              yStart,
              xEnd: xEnd + 1,
              yEnd,
              width: track.width,
              id: track.id,
              name: track.name,
              type: track.type,
              nodeStart: track.path[i - 1].node,
              nodeEnd: track.path[i].node,
              orderStart: track.path[i - 1].order,
              orderEnd: track.path[i].order,
              ...track === reference ? { reference: true } : {}
            });
            xStart = xEnd;
            yStart = yEnd;
          } else if (track.path[i].order + 1 === track.path[i - 1].order) {
            xStart = xEnd;
            xEnd = orderEndX[track.path[i].order];
            yEnd = track.path[i].y;
            state.shapes.curves.push({
              xStart: xStart + 1,
              yStart,
              xEnd,
              yEnd,
              width: track.width,
              id: track.id,
              name: track.name,
              type: track.type,
              nodeStart: track.path[i - 1].node,
              nodeEnd: track.path[i].node,
              orderStart: track.path[i - 1].order,
              orderEnd: track.path[i].order,
              ...track === reference ? { reference: true } : {}
            });
            xStart = xEnd;
            yStart = yEnd;
          } else {
            if (track.path[i - 1].isForward) {
              yEnd = track.path[i].y;
              generateTurnaround(state, 1, xEnd, yStart, yEnd, track.width, track.id, track.path[i].order, track.type, track.name);
              xStart = orderEndX[track.path[i].order];
              yStart = track.path[i].y;
            } else {
              yEnd = track.path[i].y;
              generateTurnaround(state, -1, xEnd, yStart, yEnd, track.width, track.id, track.path[i].order, track.type, track.name);
              xStart = orderStartX[track.path[i].order];
              yStart = track.path[i].y;
            }
          }
        }
      }
      if (track.type !== "read") {
        if (!track.path[track.path.length - 1].isForward) {
          xEnd = orderStartX[track.path[track.path.length - 1].order] - 20;
        } else {
          xEnd = orderEndX[track.path[track.path.length - 1].order] + 20;
        }
      } else {
        xEnd = getReadXEnd(state, track);
      }
      state.shapes.rectangles.push({
        xStart: Math.min(xStart, xEnd),
        yStart,
        xEnd: Math.max(xStart, xEnd),
        yEnd: yStart + track.width - 1,
        id: track.id,
        name: track.name,
        type: track.type
      });
    });
  }
  var COARSENED_ID_BASE = 1e9;
  function buildCoarsenedSyntheticBands(state, source, unit2, firstId = COARSENED_ID_BASE) {
    const edges = /* @__PURE__ */ new Map();
    let total = 0;
    const span = state.nodes.length;
    const edgeKey = (s, d) => (s + span) * (2 * span + 1) + d + span;
    const ignoreStrand = state.config.ignoreStrand;
    for (const [sourceIndex, item] of source.entries()) {
      const weight = Math.max(item.freq ?? 1, 1);
      total += weight;
      const seq = item.indexSequence;
      if (seq.length < 2) {
        continue;
      }
      for (let i2 = 0; i2 < seq.length - 1; i2 += 1) {
        const sSigned = seq[i2];
        const dSigned = seq[i2 + 1];
        const srcNode = state.nodes[Math.abs(sSigned)];
        const dstNode = state.nodes[Math.abs(dSigned)];
        const key = ignoreStrand ? Math.min(edgeKey(sSigned, dSigned), edgeKey(-dSigned, -sSigned)) : edgeKey(sSigned, dSigned);
        const existing = edges.get(key);
        if (existing === void 0) {
          edges.set(key, {
            sSigned,
            dSigned,
            sName: sSigned < 0 ? `-${srcNode.name}` : srcNode.name,
            dName: dSigned < 0 ? `-${dstNode.name}` : dstNode.name,
            count: weight,
            crossings: weight,
            sourceTrackID: item.sourceTrackID,
            lastSource: sourceIndex
          });
        } else {
          existing.crossings += weight;
          if (existing.lastSource !== sourceIndex) {
            existing.count += weight;
            existing.lastSource = sourceIndex;
          }
        }
      }
    }
    let maxEdgeCount = 0;
    for (const e of edges.values()) {
      if (e.crossings > maxEdgeCount) {
        maxEdgeCount = e.crossings;
      }
    }
    const BAND_MIN_WIDTH = READ_WIDTH;
    const BAND_MAX_WIDTH = 60;
    const widthForCount = (c) => {
      if (maxEdgeCount <= 1) {
        return BAND_MIN_WIDTH;
      }
      return BAND_MIN_WIDTH + (BAND_MAX_WIDTH - BAND_MIN_WIDTH) * Math.sqrt(c / maxEdgeCount);
    };
    const synthetic = [];
    let i = 0;
    for (const edge of edges.values()) {
      const id = firstId + i;
      const share = unit2 === "haplotype" ? { count: edge.count, total } : void 0;
      const shareText = share === void 0 ? "" : ` (${formatShare(share)})`;
      const crossingsText = edge.crossings === edge.count ? "" : `, ${edge.crossings.toLocaleString()} crossings`;
      const label = `${edge.count.toLocaleString()} ${unit2}${edge.count === 1 ? "" : "s"}${shareText}${crossingsText}: Node ${edge.sName} \u2192 Node ${edge.dName}`;
      state.coarsenedEdgeMeta.set(id, { count: edge.count, label });
      const srcLen = state.nodes[Math.abs(edge.sSigned)].sequenceLength;
      synthetic.push({
        id,
        sourceTrackID: edge.sourceTrackID,
        type: "read",
        // Human-readable so the name surfaces sensibly in any UI that uses it
        // (right-click → add to group, etc.) — and so trackTooltipText fallback
        // shows something meaningful.
        name: label,
        sequence: [edge.sName, edge.dName],
        indexSequence: [],
        path: [],
        // Pre-set width so placeReads / placeReadSet allocate the right vertical
        // space and assignReadsToNodes (patched to honor pre-set widths) leaves
        // it alone.
        width: widthForCount(edge.crossings),
        firstNodeOffset: srcLen,
        finalNodeCoverLength: 0,
        sequenceNew: [
          { nodeName: edge.sName, mismatches: [] },
          { nodeName: edge.dName, mismatches: [] }
        ],
        mapping_quality: 0,
        is_secondary: false,
        sample_name: null,
        read_group: null,
        score: edge.count,
        haplotypeShare: share
      });
      i += 1;
    }
    if (DEBUG) {
      let tallestName = "?";
      let tallestH = 0;
      state.nodes.forEach((n) => {
        if (n.contentHeight > tallestH) {
          tallestH = n.contentHeight;
          tallestName = n.name;
        }
      });
      debugLog(`[coarsened] ${unit2}s_in=${source.length} edges_out=${synthetic.length} tallestNodeBeforePlace=${tallestName}(${tallestH.toFixed(1)})`);
    }
    return { bands: synthetic, total };
  }
  function bandHaplotypes(state, firstId) {
    const rulerIndex = state.trackForRuler === void 0 ? -1 : state.tracks.findIndex((t) => t.name === state.trackForRuler);
    const refIndex = rulerIndex === -1 ? 0 : rulerIndex;
    const ref = state.tracks[refIndex];
    const refDuplicates = (ref.freq ?? 1) - 1;
    const refSigns = firstVisitSigns(state, ref);
    const altHaplotypes = state.tracks.filter((_, i) => i !== refIndex).map((walk) => orientedLike(refSigns, walk));
    if (refDuplicates > 0) {
      altHaplotypes.push({ ...ref, freq: refDuplicates });
    }
    if (altHaplotypes.length === 0) {
      return void 0;
    }
    const { bands, total } = buildCoarsenedSyntheticBands(state, altHaplotypes, "haplotype", firstId);
    return bands.length > 0 ? { ref, bands, total } : void 0;
  }
  function orientedLike(refSigns, walk) {
    let agreement = 0;
    for (const visit of walk.indexSequence) {
      const sign = refSigns[Math.abs(visit)];
      if (sign !== void 0 && sign !== 0) {
        agreement += sign === Math.sign(visit) ? 1 : -1;
      }
    }
    return agreement >= 0 ? walk : {
      ...walk,
      sequence: walk.sequence.map(flip).reverse(),
      indexSequence: walk.indexSequence.map((visit) => -visit).reverse()
    };
  }
  function firstVisitSigns(state, ref) {
    const signs = new Int8Array(state.nodes.length);
    for (const visit of ref.indexSequence) {
      const node = Math.abs(visit);
      if (signs[node] === 0) {
        signs[node] = Math.sign(visit);
      }
    }
    return signs;
  }
  function formatShare({ count, total }) {
    const share = count / total;
    if (share < 0.01) {
      return "<1%";
    }
    if (share > 0.99 && count < total) {
      return ">99%";
    }
    return `${Math.round(share * 100)}%`;
  }
  var MIN_BEND_WIDTH = 7;
  function generateTurnaround(state, dir, x, yStart, yEnd, trackWidth, trackID, order, type, trackName) {
    const extra = dir === 1 ? state.extraRight : state.extraLeft;
    const offset = 10 * extra[order];
    const apex = x + dir * (offset + 5);
    const radius = MIN_BEND_WIDTH;
    const stem = Math.min(MIN_BEND_WIDTH, trackWidth);
    const yTop = Math.min(yStart, yEnd);
    const yBottom = Math.max(yStart, yEnd);
    const stubNear = dir === 1 ? x : apex - 1;
    const stubFar = dir === 1 ? apex : x;
    const horizontal = (segTop) => {
      state.shapes.verticalRectangles.push({
        xStart: stubNear,
        yStart: segTop,
        xEnd: stubFar,
        yEnd: segTop + trackWidth - 1,
        id: trackID,
        name: trackName,
        type
      });
    };
    horizontal(yStart);
    state.shapes.verticalRectangles.push({
      xStart: dir === 1 ? apex + radius : apex - radius - stem,
      yStart: yTop + trackWidth + radius - 1,
      xEnd: dir === 1 ? apex + radius + stem - 1 : apex - radius - 1,
      yEnd: yBottom - radius + 1,
      id: trackID,
      name: trackName,
      type
    });
    horizontal(yEnd);
    const inner = apex + dir * radius;
    const outer = apex + dir * (radius + stem);
    let d = `M ${apex} ${yBottom}`;
    d += ` Q ${inner} ${yBottom} ${inner} ${yBottom - radius}`;
    d += ` H ${outer}`;
    d += ` Q ${outer} ${yBottom + trackWidth} ${apex} ${yBottom + trackWidth}`;
    d += " Z ";
    state.shapes.corners.push({ path: d, id: trackID, type });
    d = `M ${apex} ${yTop}`;
    d += ` Q ${outer} ${yTop} ${outer} ${yTop + trackWidth + radius}`;
    d += ` H ${inner}`;
    d += ` Q ${inner} ${yTop + trackWidth} ${apex} ${yTop + trackWidth}`;
    d += " Z ";
    state.shapes.corners.push({ path: d, id: trackID, type });
    extra[order] += 1;
  }
  function nodePixelCoordinatesInX(node) {
    const nodeLeftX = node.x - 4;
    const nodeRightX = node.x + node.pixelWidth + 4;
    return [nodeLeftX, nodeRightX];
  }
  function generateNodeWidth(state) {
    switch (state.config.nodeWidthOption) {
      case "compressed":
        state.nodes.forEach((node) => {
          node.width = 1 + Math.log2(Math.max(node.sequenceLength, 1));
          node.pixelWidth = Math.round((node.width - 1) * 8.401);
        });
        break;
      case "small":
        state.nodes.forEach((node) => {
          node.width = node.sequenceLength / 100;
          node.pixelWidth = Math.max(Math.round((node.width - 1) * 8.401), 0);
        });
        break;
      case "fixed":
        state.nodes.forEach((node) => {
          node.width = 10;
          node.pixelWidth = Math.round(node.width * 8.401);
        });
        break;
      case "normal": {
        const charWidth = state.config.charWidth;
        state.nodes.forEach((node) => {
          node.width = node.sequenceLength;
          node.pixelWidth = Math.round(charWidth * Math.max(node.sequenceLength - 1, 0));
        });
        break;
      }
      default:
        throw new Error(`${state.config.nodeWidthOption} not implemented`);
    }
  }
  var TRACK_END = 0;
  function noNeighbors(nodeCount) {
    return { first: new Int32Array(nodeCount), count: new Uint8Array(nodeCount) };
  }
  function addNeighbor(neighbors, index, neighbor) {
    const count = neighbors.count[index];
    if (count === 0) {
      neighbors.first[index] = neighbor;
      neighbors.count[index] = 1;
    } else if (count === 1 && neighbors.first[index] !== neighbor) {
      neighbors.count[index] = 2;
    }
  }
  function soleNeighbor(neighbors, index) {
    return neighbors.count[index] === 1 ? Math.abs(neighbors.first[index]) : 0;
  }
  function mergeNodes(state) {
    const pred = noNeighbors(state.nodes.length);
    const succ = noNeighbors(state.nodes.length);
    const signedIndexOf = /* @__PURE__ */ new Map();
    const visit = (nodeName) => {
      let signed = signedIndexOf.get(nodeName);
      if (signed === void 0) {
        const index = state.nodeMap.get(forward(nodeName));
        signed = isReverse(nodeName) ? -index : index;
        signedIndexOf.set(nodeName, signed);
      }
      return signed;
    };
    const tracksAndReads = state.tracks.concat(state.reads);
    tracksAndReads.forEach((track) => {
      const { sequence } = track;
      const isHaplotype = track.type === "haplotype";
      const last = sequence.length - 1;
      let previous = TRACK_END;
      let current = last >= 0 ? visit(sequence[0]) : TRACK_END;
      for (let i = 0; i <= last; i += 1) {
        const next = i < last ? visit(sequence[i + 1]) : TRACK_END;
        if (current > 0) {
          if (i > 0) {
            addNeighbor(pred, current, previous);
            if (previous < 0) {
              addNeighbor(pred, current, -previous);
            }
          } else if (isHaplotype) {
            addNeighbor(pred, current, TRACK_END);
          }
          if (i < last) {
            addNeighbor(succ, current, next);
            if (next < 0) {
              addNeighbor(succ, current, -next);
            }
          } else if (isHaplotype) {
            addNeighbor(succ, current, TRACK_END);
          }
        } else {
          const index = -current;
          if (i > 0) {
            addNeighbor(succ, index, -previous);
            if (previous > 0) {
              addNeighbor(succ, index, previous);
            }
          } else if (isHaplotype) {
            addNeighbor(succ, index, TRACK_END);
          }
          if (i < last) {
            addNeighbor(pred, index, -next);
            if (next > 0) {
              addNeighbor(pred, index, next);
            }
          } else if (isHaplotype) {
            addNeighbor(pred, index, TRACK_END);
          }
        }
        previous = current;
        current = next;
      }
    });
    const absorbed = new Uint8Array(state.nodes.length);
    state.nodes.forEach((_, i) => {
      if (mergeableWithPred(i, pred, succ) !== 0) {
        absorbed[i] = 1;
      }
    });
    const origin = new Int32Array(state.nodes.length);
    const start = new Float64Array(state.nodes.length);
    const end = new Float64Array(state.nodes.length);
    state.nodes.forEach((node, head) => {
      if (absorbed[head] === 1) {
        return;
      }
      origin[head] = head;
      end[head] = node.sequenceLength;
      for (let donor = head; mergeableWithSucc(donor, pred, succ); ) {
        donor = soleNeighbor(succ, donor);
        origin[donor] = head;
        start[donor] = node.sequenceLength;
        node.sequenceLength += state.nodes[donor].sequenceLength;
        node.seq += state.nodes[donor].seq;
        end[donor] = node.sequenceLength;
      }
    });
    state.reads.forEach((read) => {
      const { sequence } = read;
      const entries = read.sequenceNew ?? sequence.map((nodeName) => ({ nodeName, mismatches: [] }));
      const shift = (nodeName) => {
        const index = Math.abs(visit(nodeName));
        return isReverse(nodeName) ? state.nodes[origin[index]].sequenceLength - end[index] : start[index];
      };
      const last = sequence.length - 1;
      read.firstNodeOffset = (read.firstNodeOffset ?? 0) + shift(sequence[0]);
      read.finalNodeCoverLength = (read.finalNodeCoverLength ?? 0) + shift(sequence[last]);
      const mergedSequence = [];
      const mergedEntries = [];
      let carried = [];
      sequence.forEach((nodeName, i) => {
        const index = Math.abs(visit(nodeName));
        const { mismatches } = entries[i];
        const by = shift(nodeName);
        mismatches.forEach((mismatch) => {
          mismatch.pos += by;
        });
        if (absorbed[index] === 1 && !isReverse(nodeName) && i > 0) {
          mergedEntries.at(-1).mismatches.push(...mismatches);
        } else if (absorbed[index] === 1 && isReverse(nodeName) && i < last) {
          carried.push(...mismatches);
        } else {
          const name = state.nodes[origin[index]].name;
          const merged = isReverse(nodeName) ? reverse(name) : name;
          mergedSequence.push(merged);
          mergedEntries.push({
            nodeName: merged,
            mismatches: carried.concat(mismatches)
          });
          carried = [];
        }
      });
      read.sequence = mergedSequence;
      if (read.sequenceNew !== void 0) {
        read.sequenceNew = mergedEntries;
      }
    });
    state.tracks.forEach((track) => {
      const { sequence } = track;
      let kept2 = 0;
      for (const nodeName of sequence) {
        if (absorbed[Math.abs(visit(nodeName))] === 0) {
          sequence[kept2] = nodeName;
          kept2 += 1;
        }
      }
      sequence.length = kept2;
    });
    let kept = 1;
    for (let i = 1; i < state.nodes.length; i += 1) {
      if (absorbed[i] === 0) {
        state.nodes[kept] = state.nodes[i];
        kept += 1;
      }
    }
    state.nodes.length = kept;
  }
  function mergeableWithPred(index, pred, succ) {
    const predecessor = soleNeighbor(pred, index);
    return predecessor !== 0 && soleNeighbor(succ, predecessor) !== 0 ? predecessor : 0;
  }
  function mergeableWithSucc(index, pred, succ) {
    const successor = soleNeighbor(succ, index);
    return successor !== 0 && soleNeighbor(pred, successor) !== 0;
  }

  // ../bandage-core/src/pathAnchoring.ts
  var RANGE_SUFFIX = /:(\d+)-\d+$/;
  function pathOrigin(pathName) {
    const match = RANGE_SUFFIX.exec(pathName);
    return match ? { name: pathName.slice(0, match.index), start: +match[1] } : { name: pathName, start: 0 };
  }
  function surveyPaths(paths, lengthOf) {
    const anchorPaths = [];
    const pathVisits = /* @__PURE__ */ new Map();
    for (const path of paths) {
      const sample = panSNSample(path.name);
      let pos = path.start;
      for (const step of path.steps) {
        const visit = {
          path: path.name,
          sample,
          start: pos,
          strand: step.strand
        };
        const existing = pathVisits.get(step.id);
        if (existing) {
          existing.push(visit);
        } else {
          pathVisits.set(step.id, [visit]);
        }
        pos += lengthOf(step.id);
      }
      anchorPaths.push({
        name: path.name,
        sample,
        start: path.start,
        length: pos - path.start
      });
    }
    return { anchorPaths, pathVisits };
  }
  function chooseReferencePath(anchorPaths, preferred) {
    const named = anchorPaths.find(
      (p) => p.sample === preferred || p.name === preferred
    );
    return named ?? anchorPaths[0];
  }
  var OFF_REFERENCE_RANK = 1;
  function anchorNode(node, visits, reference, samplesOf) {
    let anchored = node;
    if (visits && visits.length > 0) {
      const anchor = visits.find((v) => v.path === reference) ?? visits[0];
      anchored = {
        ...node,
        stable: {
          refName: anchor.path,
          start: anchor.start,
          rank: anchor.path === reference ? REFERENCE_RANK : OFF_REFERENCE_RANK,
          strand: anchor.strand
        },
        samples: samplesOf(visits)
      };
    }
    return anchored;
  }
  function sampleSorter(paths) {
    const sorted = [...new Set(paths.map((p) => p.sample))].sort();
    const rank = new Map(sorted.map((sample, i) => [sample, i]));
    const seen = new Uint8Array(sorted.length);
    return (visits) => {
      const ranks = [];
      for (const { sample } of visits) {
        const r = rank.get(sample);
        if (r === void 0) {
          ranks.forEach((r2) => seen[r2] = 0);
          return [...new Set(visits.map((v) => v.sample))].sort();
        }
        if (seen[r] === 0) {
          seen[r] = 1;
          ranks.push(r);
        }
      }
      ranks.forEach((r) => seen[r] = 0);
      return Array.from(Int32Array.from(ranks).sort(), (r) => sorted[r]);
    };
  }
  function anchorFromPaths(graph, preferred) {
    const { anchorPaths, pathVisits } = graph;
    const reference = anchorPaths && pathVisits ? chooseReferencePath(anchorPaths, preferred) : void 0;
    if (!reference || !anchorPaths || !pathVisits) {
      return graph;
    }
    const samplesOf = sampleSorter(anchorPaths);
    return {
      ...graph,
      nodes: graph.nodes.map(
        (node) => anchorNode(node, pathVisits.get(node.name), reference.name, samplesOf)
      ),
      anchoredBy: "paths",
      referencePath: reference.name
    };
  }
  function anchorGraph(graph, preferred) {
    return graph.anchoredBy === "tags" ? graph : anchorFromPaths(graph, preferred);
  }

  // ../bandage-core/src/layout/mergeRuns.ts
  function flip2(strand) {
    return strand === "+" ? "-" : "+";
  }
  function mergeRuns(graph, alone = /* @__PURE__ */ new Set()) {
    const sides = graph.edges.map(strandSides);
    const at = /* @__PURE__ */ new Map();
    const attach = (id, side, ei) => {
      const key = `${id}|${side}`;
      const list = at.get(key);
      if (list) {
        list.push(ei);
      } else {
        at.set(key, [ei]);
      }
    };
    graph.edges.forEach((edge, ei) => {
      attach(edge.from, sides[ei].from, ei);
      attach(edge.to, sides[ei].to, ei);
    });
    const joinAfter = (a) => {
      const out = at.get(`${a}|end`);
      if (out?.length !== 1) {
        return void 0;
      }
      const ei = out[0];
      const edge = graph.edges[ei];
      return edge.from === a && edge.to !== a && !alone.has(a) && !alone.has(edge.to) && sides[ei].from === "end" && sides[ei].to === "start" && at.get(`${edge.to}|start`)?.length === 1 ? ei : void 0;
    };
    const joined = /* @__PURE__ */ new Set();
    const runOf = /* @__PURE__ */ new Map();
    const runs = /* @__PURE__ */ new Map();
    for (const node of graph.nodes) {
      const into = at.get(`${node.id}|start`);
      const pred = into?.length === 1 ? graph.edges[into[0]].from : void 0;
      if (runOf.has(node.id) || pred !== void 0 && joinAfter(pred) === into[0]) {
        continue;
      }
      const run = [node.id];
      for (; ; ) {
        const ei = joinAfter(run.at(-1));
        const next = ei === void 0 ? void 0 : graph.edges[ei].to;
        if (next === void 0 || runOf.has(next)) {
          break;
        }
        joined.add(ei);
        run.push(next);
      }
      for (const id of run) {
        runOf.set(id, node.id);
      }
      if (run.length > 1) {
        runs.set(node.id, run);
      }
    }
    for (const node of graph.nodes) {
      if (!runOf.has(node.id)) {
        runOf.set(node.id, node.id);
      }
    }
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const nodes = [];
    for (const node of graph.nodes) {
      if (runOf.get(node.id) !== node.id) {
        continue;
      }
      const run = runs.get(node.id);
      if (!run) {
        nodes.push(node);
        continue;
      }
      const members = run.map((id) => byId.get(id));
      const backbone = members.filter(isBackbone);
      const first = backbone.length ? backbone.reduce((a, b) => a.stable.start <= b.stable.start ? a : b) : members[0];
      nodes.push({
        id: node.id,
        name: node.name,
        length: members.reduce((sum, n) => sum + n.length, 0),
        depth: node.depth,
        stable: first.stable
      });
    }
    const seen = /* @__PURE__ */ new Set();
    const edges = [];
    graph.edges.forEach((edge, ei) => {
      const from = runOf.get(edge.from);
      const to = runOf.get(edge.to);
      const side = sides[ei];
      const key = `${from}|${side.from}>${to}|${side.to}`;
      if (joined.has(ei) || seen.has(key)) {
        return;
      }
      seen.add(key);
      edges.push({
        from,
        to,
        ...side.from === "start" ? { fromStrand: flip2(ownStrand(from)) } : {},
        ...side.to === "end" ? { toStrand: flip2(ownStrand(to)) } : {}
      });
    });
    return {
      graph: { ...graph, nodes, edges, paths: void 0, pathVisits: void 0 },
      runs
    };
  }
  function splitRuns(positions, runs, weightOf) {
    const out = { ...positions };
    for (const [id, members] of runs) {
      const line = positions[id];
      if (!line?.length) {
        continue;
      }
      delete out[id];
      const arc = arcPrefix(line);
      const total = arc.at(-1);
      const weights = members.map((m) => Math.max(weightOf(m), 0));
      const weightSum = weights.reduce((a, b) => a + b, 0) || members.length;
      let from = 0;
      members.forEach((member, k) => {
        const share = weightSum ? weights[k] / weightSum * total : total / members.length;
        const to = k === members.length - 1 ? total : from + share;
        out[member] = slice(line, arc, from, to);
        from = to;
      });
    }
    return out;
  }
  function arcPrefix(line) {
    const arc = [0];
    for (let i = 1; i < line.length; i++) {
      arc.push(
        arc[i - 1] + Math.hypot(line[i].x - line[i - 1].x, line[i].y - line[i - 1].y)
      );
    }
    return arc;
  }
  function pointAt(line, arc, s) {
    if (s <= 0) {
      return { ...line[0] };
    }
    let i = 1;
    while (i < arc.length && arc[i] < s) {
      i++;
    }
    if (i >= arc.length) {
      return { ...line.at(-1) };
    }
    const span = arc[i] - arc[i - 1];
    const t = span > 0 ? (s - arc[i - 1]) / span : 0;
    const a = line[i - 1];
    const b = line[i];
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }
  function slice(line, arc, from, to) {
    const points = [pointAt(line, arc, from)];
    for (let i = 0; i < line.length; i++) {
      if (arc[i] > from && arc[i] < to) {
        points.push({ ...line[i] });
      }
    }
    points.push(pointAt(line, arc, to));
    return points;
  }

  // ../bandage-core/src/graphLabels.ts
  var LABEL_CHAR_PX = 5.7;
  var LABEL_PAD_PX = 6;
  var LABEL_HEIGHT_PX = 13;
  var LABEL_GAP_PX = 3;
  function labelHalfWidth(text) {
    return (text.length * LABEL_CHAR_PX + LABEL_PAD_PX + LABEL_GAP_PX) / 2;
  }
  var LABEL_HALF_HEIGHT = (LABEL_HEIGHT_PX + LABEL_GAP_PX) / 2;
  var MIN_LABEL_HALF_WIDTH = labelHalfWidth("1 bp");
  function groupDigits(n) {
    return String(n).replace(/\B(?=(\d{3})+$)/g, ",");
  }
  function formatBp(bp) {
    if (bp >= 1e6) {
      return `${+(bp / 1e6).toFixed(1)} Mb`;
    }
    return bp >= 1e3 ? `${+(bp / 1e3).toFixed(1)} kb` : `${bp} bp`;
  }

  // ../bandage-core/src/pathColors.ts
  function nameHue(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
  }
  function pathHueAt(index, count) {
    return index * 360 / count;
  }
  var PATH_SATURATION = 0.7;
  var PATH_LIGHTNESS = 0.5;
  function pathCssColor(index, count) {
    return `hsl(${pathHueAt(index, count)}, ${PATH_SATURATION * 100}%, ${PATH_LIGHTNESS * 100}%)`;
  }
  function pathGreyCssColor(index, count) {
    const lightness = count > 1 ? 25 + 45 * index / (count - 1) : 45;
    return `hsl(0, 0%, ${lightness}%)`;
  }
  function labelTiers(name) {
    const parts = pathOrigin(name).name.split("#");
    const full = parts.join("#");
    if (parts.length >= 3 && isGenericSample(parts[0])) {
      const contig = parts.slice(2).join("#");
      return [contig, contig, full];
    }
    return [parts[0], parts.slice(0, 2).join("#"), full];
  }
  function offsetTiers(name, tiers) {
    const { start } = pathOrigin(name);
    return tiers.map((t) => `${t} @${groupDigits(start)}`);
  }
  function pathLegend(paths, colors) {
    const firstOf = /* @__PURE__ */ new Map();
    paths.forEach((path, i) => {
      if (!firstOf.has(path.name)) {
        firstOf.set(path.name, i);
      }
    });
    const entries = [...firstOf].map(([name, i]) => ({ name, i }));
    const named = entries.map((e) => labelTiers(e.name));
    const candidates = [0, 1, 2].flatMap((t) => [
      entries.map((_, k) => named[k][t]),
      entries.map((e, k) => offsetTiers(e.name, named[k])[t])
    ]);
    const distinct = candidates.find(
      (labels2) => new Set(labels2).size === entries.length
    );
    const labels = distinct ?? candidates.at(-1);
    return entries.map(({ name, i }, k) => ({
      name,
      label: labels[k],
      color: colors?.[i] ?? pathCssColor(i, paths.length)
    }));
  }
  function walkLabelsOf(entries) {
    const seen = /* @__PURE__ */ new Map();
    return new Map(
      [...entries].sort((a, b) => a.label.localeCompare(b.label)).map((e) => {
        const n = (seen.get(e.label) ?? 0) + 1;
        seen.set(e.label, n);
        return [e.name, n > 1 ? `${e.label} (${n})` : e.label];
      })
    );
  }

  // ../bandage-core/src/gaf/parseGaf.ts
  var CS_OP = /:(\d+)|=([A-Za-z]+)|\*[a-zA-Z]([a-zA-Z])|\+([A-Za-z]+)|-([A-Za-z]+)|~[a-z]{2}(\d+)[a-z]{2}/g;
  function parseCs(cs) {
    const ops = [];
    for (const m of cs.matchAll(CS_OP)) {
      if (m[1] !== void 0) {
        ops.push({ op: "match", length: +m[1] });
      } else if (m[2] !== void 0) {
        ops.push({ op: "match", length: m[2].length });
      } else if (m[3] !== void 0) {
        ops.push({ op: "substitution", seq: m[3].toUpperCase() });
      } else if (m[4] !== void 0) {
        ops.push({ op: "insertion", seq: m[4].toUpperCase() });
      } else if (m[5] !== void 0) {
        ops.push({ op: "deletion", length: m[5].length });
      } else if (m[6] !== void 0) {
        ops.push({ op: "match", length: +m[6] });
      }
    }
    return ops;
  }

  // ../bandage-core/src/tubeMap/reads.ts
  function canonicalStrand(node) {
    return node.id.endsWith("-") ? "-" : "+";
  }
  function stepName(node, strand) {
    return strand === canonicalStrand(node) ? node.id : `-${node.id}`;
  }
  function stepStarts(lengths, total) {
    const starts = lengths.map(() => void 0);
    let head = 0;
    let i = 0;
    for (; i < lengths.length && lengths[i] !== void 0; i++) {
      starts[i] = head;
      head += lengths[i];
    }
    let tail = total;
    for (let j = lengths.length - 1; j > i && lengths[j] !== void 0; j--) {
      tail -= lengths[j];
      starts[j] = tail;
    }
    return starts;
  }
  function mismatchesByStep(record, lengths) {
    const byStep = record.path.map(() => []);
    if (record.cs === void 0) {
      return byStep;
    }
    const starts = stepStarts(lengths, record.pathLength);
    const known = starts.flatMap((start, s) => start === void 0 ? [] : [s]);
    const startOf = (k) => starts[known[k]];
    const endOf = (k) => startOf(k) + lengths[known[k]];
    let first = 0;
    const stepAt = (pos2, atEnd = false) => {
      while (first < known.length && endOf(first) < pos2) {
        first++;
      }
      for (let k = first; k < known.length && startOf(k) <= pos2; k++) {
        const end = endOf(k);
        if (pos2 < end || atEnd && pos2 === end) {
          return { s: known[k], local: pos2 - startOf(k), room: end - pos2 };
        }
      }
      return void 0;
    };
    const unplacedFrom = (pos2) => {
      for (let k = first; k < known.length; k++) {
        if (startOf(k) > pos2) {
          return startOf(k) - pos2;
        }
      }
      return Infinity;
    };
    const add = (s, mismatch) => {
      const list = byStep[s];
      const last = list.at(-1);
      if (mismatch.type === "substitution" && last?.type === "substitution" && last.pos + last.seq.length === mismatch.pos) {
        last.seq += mismatch.seq;
      } else {
        list.push(mismatch);
      }
    };
    let pos = record.pathStart;
    for (const op of parseCs(record.cs)) {
      if (op.op === "match") {
        pos += op.length;
      } else if (op.op === "substitution") {
        const at = stepAt(pos);
        if (at) {
          add(at.s, { type: "substitution", pos: at.local, seq: op.seq });
        }
        pos += 1;
      } else if (op.op === "insertion") {
        const at = stepAt(pos, pos === record.pathEnd);
        if (at) {
          add(at.s, { type: "insertion", pos: at.local, seq: op.seq });
        }
      } else {
        let left = op.length;
        while (left > 0) {
          const at = stepAt(pos);
          const take = Math.min(left, at ? at.room : unplacedFrom(pos));
          if (at) {
            add(at.s, { type: "deletion", pos: at.local, length: take });
          }
          pos += take;
          left -= take;
        }
      }
    }
    return byStep;
  }
  function tubeMapReads(graph, records, firstId) {
    const nodeByName2 = new Map(graph.nodes.map((n) => [n.name, n]));
    const reads = [];
    for (const record of records) {
      const nodes = record.path.map((step) => nodeByName2.get(step.name));
      const kept = nodes.flatMap((node, i) => node ? [i] : []);
      const first = kept[0];
      const last = kept.at(-1);
      if (first !== void 0 && last !== void 0) {
        const mismatches = mismatchesByStep(
          record,
          nodes.map((n) => n?.length)
        );
        const names = kept.map((i) => stepName(nodes[i], record.path[i].strand));
        const lastLength = nodes[last].length;
        reads.push({
          id: firstId + reads.length,
          name: record.name,
          type: "read",
          sourceTrackID: 1,
          sequence: names,
          sequenceNew: kept.map((i, k) => ({
            nodeName: names[k],
            mismatches: mismatches[i]
          })),
          firstNodeOffset: first === 0 ? record.pathStart : 0,
          finalNodeCoverLength: last === record.path.length - 1 ? lastLength - (record.pathLength - record.pathEnd) : lastLength,
          // 255 is GAF's missing MAPQ
          mapping_quality: record.mappingQuality === 255 ? void 0 : record.mappingQuality,
          is_secondary: record.secondary,
          is_reverse: record.strand === "-"
        });
      }
    }
    return reads;
  }

  // ../bandage-core/src/layout/tubeMapLayout.ts
  function pathSteps(graph) {
    const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
    const strands = /* @__PURE__ */ new Map();
    for (const [segment, visits] of graph.pathVisits ?? []) {
      for (const visit of visits) {
        const key = `${visit.path}	${segment}`;
        const list = strands.get(key);
        if (list) {
          list.push(visit.strand);
        } else {
          strands.set(key, [visit.strand]);
        }
      }
    }
    const seen = /* @__PURE__ */ new Map();
    return (graph.paths ?? []).map((path) => {
      const walk = pathOrigin(path.name).name;
      return path.nodeIds.flatMap((id) => {
        const node = nodeById.get(id);
        if (!node) {
          return [];
        }
        const key = `${walk}	${node.name}`;
        const k = seen.get(key) ?? 0;
        seen.set(key, k + 1);
        return [{ node, strand: strands.get(key)?.[k] ?? canonicalStrand(node) }];
      });
    });
  }
  function tubeMapTracks(graph) {
    const steps = pathSteps(graph);
    const tracks = (graph.paths ?? []).flatMap((path, index) => {
      const sequence = steps[index].map((s) => stepName(s.node, s.strand));
      return sequence.length > 0 ? [
        {
          id: index,
          name: path.name,
          sequence,
          sourceTrackID: 0,
          type: "haplotype",
          ...path.members ? { freq: path.members.length } : {}
        }
      ] : [];
    });
    const reference = tracks.findIndex(
      (t) => pathOrigin(t.name).name === graph.referencePath
    );
    if (reference > 0) {
      tracks.unshift(...tracks.splice(reference, 1));
    }
    return tracks;
  }
  function tubeMapNodes(graph) {
    return graph.nodes.map((n) => ({
      name: n.id,
      seq: "",
      sequenceLength: Math.max(1, n.length)
    }));
  }
  function hasTubeMapPaths(graph) {
    return (graph.paths?.length ?? 0) > 0;
  }
  var STACK_PX = 600;
  var MIN_TUBE_PX = 3;
  var MAX_TUBE_PX = 15;
  function tubeWidth(trackCount) {
    return Math.max(
      MIN_TUBE_PX,
      Math.min(MAX_TUBE_PX, Math.floor(STACK_PX / Math.max(1, trackCount)))
    );
  }
  function straightened(first) {
    const flipped2 = /* @__PURE__ */ new Set();
    const forwards = /* @__PURE__ */ new Set();
    for (const step of first?.sequence ?? []) {
      if (!isReverse(step)) {
        forwards.add(step);
      } else if (!forwards.has(forward(step))) {
        flipped2.add(forward(step));
      }
    }
    return flipped2;
  }
  function mergedRuns(graph, layout, walks) {
    const flipped2 = straightened(walks[0]);
    const before = /* @__PURE__ */ new Map();
    for (const { sequence, is_secondary } of walks) {
      if (!is_secondary) {
        sequence.forEach((step, i) => {
          const id = forward(step);
          const against = isReverse(step) !== flipped2.has(id);
          const neighbour = against ? sequence[i + 1] : sequence[i - 1];
          if (!layout.nodeMap.has(id) && neighbour !== void 0) {
            before.set(id, forward(neighbour));
          }
        });
      }
    }
    const lengthOf = new Map(graph.nodes.map((n) => [n.id, Math.max(1, n.length)]));
    const after = new Map([...before].map(([node, prev]) => [prev, node]));
    const members = /* @__PURE__ */ new Map();
    for (const head of after.keys()) {
      const index = layout.nodeMap.get(head);
      if (index !== void 0) {
        const run = [head];
        for (let n = after.get(head); n !== void 0; n = after.get(n)) {
          run.push(n);
        }
        const bp = run.reduce((sum, id) => sum + (lengthOf.get(id) ?? 0), 0);
        if (bp === layout.nodes[index].sequenceLength) {
          members.set(head, run);
        }
      }
    }
    return { members, flipped: flipped2 };
  }
  var opposite = { start: "end", end: "start" };
  var otherStrand = { "+": "-", "-": "+" };
  function boxGraph(graph, { members, flipped: flipped2 }) {
    if (members.size === 0) {
      return graph;
    }
    const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
    const boxOf = /* @__PURE__ */ new Map();
    const inner = /* @__PURE__ */ new Set();
    const drawn = (id, side) => flipped2.has(id) ? opposite[side] : side;
    for (const [box, run] of members) {
      run.forEach((id, i) => {
        boxOf.set(id, box);
        const next = run[i + 1];
        if (next !== void 0) {
          inner.add(`${id}:${drawn(id, "end")}	${next}:${drawn(next, "start")}`);
        }
      });
    }
    const absorbed = new Set(
      [...boxOf].filter(([id, box]) => id !== box).map(([id]) => id)
    );
    const nodes = graph.nodes.flatMap((node) => {
      const run = members.get(node.id);
      if (!run) {
        return absorbed.has(node.id) ? [] : [node];
      }
      const parts = run.map((id) => nodeById.get(id));
      const starts = parts.flatMap((p) => p.stable ? [p.stable.start] : []);
      return [
        {
          ...node,
          length: parts.reduce((sum, p) => sum + p.length, 0),
          stable: node.stable && { ...node.stable, start: Math.min(...starts) }
        }
      ];
    });
    const leaving = (id, box, side) => drawn(box, drawn(id, side)) === "end" ? ownStrand(box) : otherStrand[ownStrand(box)];
    const edges = graph.edges.flatMap((edge) => {
      const sides = strandSides(edge);
      const from = `${edge.from}:${sides.from}`;
      const to = `${edge.to}:${sides.to}`;
      if (inner.has(`${from}	${to}`) || inner.has(`${to}	${from}`)) {
        return [];
      }
      const fromBox = boxOf.get(edge.from);
      const toBox = boxOf.get(edge.to);
      return [
        {
          ...edge,
          ...fromBox === void 0 ? {} : {
            from: fromBox,
            fromStrand: leaving(edge.from, fromBox, sides.from)
          },
          ...toBox === void 0 ? {} : {
            to: toBox,
            toStrand: otherStrand[leaving(edge.to, toBox, sides.to)]
          }
        }
      ];
    });
    const absorbedNames = new Set(
      [...absorbed].map((id) => nodeById.get(id)?.name ?? id)
    );
    return {
      ...graph,
      nodes,
      edges,
      paths: graph.paths?.map((path) => ({
        ...path,
        nodeIds: path.nodeIds.filter((id) => !absorbed.has(id))
      })),
      pathVisits: graph.pathVisits && new Map(
        [...graph.pathVisits].filter(([name]) => !absorbedNames.has(name))
      )
    };
  }
  function runTubeMap(graph) {
    const paths = graph.paths ?? [];
    const tracks = tubeMapTracks(graph);
    const reads = graph.reads ? tubeMapReads(graph, graph.reads, paths.length) : [];
    const tubeColor = reads.length > 0 ? pathGreyCssColor : pathCssColor;
    const pathColors = paths.map((_, i) => tubeColor(i, paths.length));
    const bundled = paths.some((p) => p.members);
    const walks = paths.reduce((n, p) => n + (p.members?.length ?? 1), 0);
    const layout = layoutTubeMap(tubeMapNodes(graph), tracks, reads, {
      nodeWidthOption: "compressed",
      trackWidth: tubeWidth(bundled ? walks : tracks.length),
      ...bundled ? { freqWidth: "linear" } : {}
    });
    if (!layout) {
      return void 0;
    }
    const runs = mergedRuns(graph, layout, [...tracks, ...reads]);
    return {
      layout,
      pathColors,
      members: runs.members,
      graph: boxGraph(graph, runs)
    };
  }
  function drawnNodes(layout) {
    const nodes = [];
    layout.nodes.forEach((node) => {
      if (node.order >= 0) {
        nodes.push(node);
      }
    });
    return nodes;
  }
  function centreline(node, yOffset, x0, x1) {
    const y = node.y + node.contentHeight / 2 - yOffset;
    return [
      { x: x0, y },
      { x: x1, y }
    ];
  }
  function extentOf(layout, yOffset) {
    return {
      minY: layout.bounds.minY - yOffset,
      maxY: layout.bounds.maxY - yOffset
    };
  }
  function tubeMapLayout(graph) {
    const run = hasTubeMapPaths(graph) ? runTubeMap(graph) : void 0;
    if (!run) {
      return void 0;
    }
    const { layout, ...drawing } = run;
    const yOffset = layout.bounds.minY;
    const nodePositions = {};
    for (const node of drawnNodes(layout)) {
      nodePositions[node.name] = centreline(
        node,
        yOffset,
        node.x,
        node.x + node.pixelWidth
      );
    }
    const { minY, maxY } = extentOf(layout, yOffset);
    return {
      nodePositions,
      tubeMap: { layout, yOffset, ...drawing },
      extent: {
        minX: layout.bounds.minX,
        maxX: layout.bounds.maxX,
        minY,
        maxY
      }
    };
  }
  function tubeMapColumns(graph, layout) {
    const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
    const byOrder = /* @__PURE__ */ new Map();
    for (const node of drawnNodes(layout)) {
      const list = byOrder.get(node.order);
      if (list) {
        list.push(node);
      } else {
        byOrder.set(node.order, [node]);
      }
    }
    const columns2 = [];
    let end = -Infinity;
    for (const order of [...byOrder.keys()].sort((a, b) => a - b)) {
      const nodes = byOrder.get(order);
      let bp0 = Infinity;
      let bp1 = -Infinity;
      for (const node of nodes) {
        const graphNode = nodeById.get(node.name);
        if (graphNode && isBackbone(graphNode)) {
          bp0 = Math.min(bp0, graphNode.stable.start);
          bp1 = Math.max(bp1, graphNode.stable.start + graphNode.length);
        }
      }
      if (bp0 === Infinity) {
        bp0 = bp1 = end;
      }
      if (bp0 < end) {
        bp0 = end;
        bp1 = Math.max(end, bp1);
      }
      end = Math.max(end, bp1);
      columns2.push({
        order,
        x0: Math.min(...nodes.map((n) => n.x)),
        x1: Math.max(...nodes.map((n) => n.x + n.pixelWidth)),
        bp0,
        bp1
      });
    }
    const first = columns2.find((c) => c.bp0 !== -Infinity);
    for (const column of columns2) {
      if (column.bp0 === -Infinity) {
        column.bp0 = column.bp1 = first?.bp0 ?? 0;
      }
    }
    return columns2;
  }
  function hasTubeMapBackbone(graph) {
    return hasTubeMapPaths(graph) && graph.nodes.some(isBackbone);
  }
  function tubeMapReferenceLayout(graph) {
    const run = hasTubeMapBackbone(graph) ? runTubeMap(graph) : void 0;
    if (!run) {
      return void 0;
    }
    const { layout, ...drawing } = run;
    const columns2 = tubeMapColumns(drawing.graph, layout);
    const byOrder = new Map(columns2.map((c) => [c.order, c]));
    const yOffset = layout.bounds.minY;
    const nodePositions = {};
    for (const node of drawnNodes(layout)) {
      const column = byOrder.get(node.order);
      nodePositions[node.name] = centreline(node, yOffset, column.bp0, column.bp1);
    }
    return {
      nodePositions,
      tubeMap: { layout, yOffset, columns: columns2, ...drawing },
      referenceAxis: true,
      pixelRows: true,
      extent: extentOf(layout, yOffset)
    };
  }

  // ../bandage-core/src/layout/walkRows.ts
  function sampleOf3(path) {
    return path.sample ?? panSNSample(path.name);
  }
  function labelOf(path) {
    return path.haplotype !== void 0 && path.sample !== void 0 ? `${path.sample}#${path.haplotype}` : sampleOf3(path);
  }
  function stepsOf(pieces, lengthOf) {
    const steps = [];
    let end;
    for (const piece of pieces) {
      if (end !== void 0 && piece.start !== void 0 && piece.start > end) {
        steps.push(piece.start - end);
      }
      steps.push(...piece.nodeIds);
      const bp = piece.nodeIds.reduce(
        (sum, id) => sum + (lengthOf.get(id) ?? 0),
        0
      );
      end = piece.start === void 0 ? void 0 : piece.start + bp;
    }
    return steps;
  }
  function stepSpans(pieces, lengthOf) {
    const spans = [];
    let end;
    for (const piece of pieces) {
      if (piece.start === void 0 || end !== void 0 && piece.start < end) {
        return void 0;
      }
      if (end !== void 0 && piece.start > end) {
        spans.push({ start: end, end: piece.start });
      }
      let pos = piece.start;
      for (const id of piece.nodeIds) {
        const len = lengthOf.get(id) ?? 0;
        spans.push({ start: pos, end: pos + len });
        pos += len;
      }
      end = pos;
    }
    return spans;
  }
  function sliceBetween(steps, span, region, flanked = true) {
    if (!region || !flanked) {
      return { ids: steps, complete: true, from: -1, to: -1 };
    }
    const spanAt = (i) => {
      const id = steps[i];
      return typeof id === "string" ? span.get(id) : void 0;
    };
    let i0 = -1;
    let i1 = -1;
    let bestEnd = -Infinity;
    let bestStart = Infinity;
    steps.forEach((_, i) => {
      const s = spanAt(i);
      if (s) {
        if (s.end <= region.start && s.end > bestEnd) {
          bestEnd = s.end;
          i0 = i;
        }
        if (s.start >= region.end && s.start < bestStart) {
          bestStart = s.start;
          i1 = i;
        }
      }
    });
    if (i0 >= 0 && i1 >= 0) {
      const ids2 = steps.slice(Math.min(i0, i1) + 1, Math.max(i0, i1));
      return {
        ids: i0 < i1 ? ids2 : ids2.reverse(),
        complete: true,
        from: i0,
        to: i1
      };
    }
    const flank = i0 >= 0 ? i0 : i1;
    let near = -1;
    for (let d = 1; flank >= 0 && near < 0 && d < steps.length; d++) {
      near = [flank - d, flank + d].find((j) => spanAt(j) !== void 0) ?? -1;
    }
    if (near < 0) {
      return { ids: steps, complete: false, from: -1, to: -1 };
    }
    const forward2 = near > flank === spanAt(near).start > spanAt(flank).start;
    const after = forward2 === (flank === i0);
    const ids = after ? steps.slice(flank + 1) : steps.slice(0, flank).reverse();
    const last = ids.length > 0 ? ids.length - 1 : -1;
    const end = last < 0 ? spanAt(flank) : spanAt(after ? flank + 1 + last : 0);
    const stop = {
      contigEnds: end !== void 0,
      shortBp: !end ? 0 : Math.max(0, region.start - end.end, end.start - region.end)
    };
    return {
      ids,
      complete: false,
      from: flank,
      to: after ? steps.length : -1,
      stop
    };
  }
  function walkRows(graph, region, unit2) {
    const paths = graph.paths ?? [];
    const isReference2 = (p) => pathOrigin(p.name).name === graph.referencePath;
    const referencePieces = paths.some(isReference2) ? paths.filter(isReference2).sort((a, b) => (a.start ?? 0) - (b.start ?? 0)) : paths.slice(0, 1);
    const first = referencePieces[0];
    const others = paths.filter((p) => !referencePieces.includes(p));
    if (!first || others.length === 0) {
      return void 0;
    }
    const walks = /* @__PURE__ */ new Map();
    for (const path of others) {
      walks.set(path.name, [...walks.get(path.name) ?? [], path]);
    }
    const lengthOf = new Map(graph.nodes.map((n) => [n.id, n.length]));
    const referenceStart = first.start ?? 0;
    const cut = region && region.end > region.start ? region : void 0;
    const span = /* @__PURE__ */ new Map();
    for (const piece of referencePieces) {
      let pos = piece.start ?? 0;
      for (const id of piece.nodeIds) {
        const len = lengthOf.get(id) ?? 0;
        if (!span.has(id)) {
          span.set(id, { start: pos, end: pos + len });
        }
        pos += len;
      }
    }
    const flanked = cut === void 0 || [...span.values()].some((s) => s.end <= cut.start) && [...span.values()].some((s) => s.start >= cut.end);
    const rowOf = (pieces) => {
      const path = pieces[0];
      const ordered = [...pieces].sort((a, b) => (a.start ?? 0) - (b.start ?? 0));
      const { ids, complete, from, to, stop } = sliceBetween(
        stepsOf(ordered, lengthOf),
        span,
        cut,
        flanked
      );
      const spans = stepSpans(ordered, lengthOf);
      const contig = path.contig ?? panSNContig(pathOrigin(path.name).name);
      const axis = !spans?.length ? void 0 : from < 0 ? { contig, start: spans[0].start, reversed: false } : from < to ? { contig, start: spans[from].end, reversed: false } : { contig, start: spans[from].start, reversed: true };
      const runs = [];
      let bp = 0;
      let offReferenceBp = 0;
      let gapBp = 0;
      let step = 0;
      for (const id of ids) {
        if (typeof id === "number") {
          runs.push({ start: bp, bp: id, onReference: false, gap: true });
          bp += id;
          gapBp += id;
          step = 0;
          continue;
        }
        const len = lengthOf.get(id) ?? 0;
        const s = span.get(id);
        const last = runs.at(-1);
        const at = last?.referenceStart;
        const forward2 = s && at !== void 0 && step >= 0 && at + last.bp === s.start;
        const backward = s && at !== void 0 && step <= 0 && s.end === at;
        if (!s && last && !last.onReference && !last.gap) {
          last.bp += len;
        } else if (forward2 || backward) {
          last.bp += len;
          if (!forward2) {
            last.referenceStart = s.start;
            last.reversed = true;
          }
          step = forward2 ? 1 : -1;
        } else {
          runs.push({
            start: bp,
            bp: len,
            onReference: s !== void 0,
            referenceStart: s?.start
          });
          step = 0;
        }
        bp += len;
        if (!s) {
          offReferenceBp += len;
        }
      }
      return {
        name: path.name,
        label: labelOf(path),
        sample: sampleOf3(path),
        haplotype: path.haplotype,
        bp,
        offReferenceBp,
        gapBp,
        complete,
        stop,
        runs,
        axis
      };
    };
    const origin = cut ? cut.start : referenceStart;
    return {
      origin,
      unit: unit2,
      reference: rowOf(referencePieces),
      rows: [...walks.values()].map(rowOf).sort(
        (a, b) => Number(b.complete) - Number(a.complete) || b.bp - a.bp || a.label.localeCompare(b.label)
      )
    };
  }

  // ../bandage-core/src/layout/walkRowLayout.ts
  var READOUT_ROOM = 1.3;
  function walkRowsExtent(walks, pitch = {
    rowPx: ROW_HEIGHT_PX,
    readouts: true
  }) {
    let longest = walks.reference.bp;
    for (const row of walks.rows) {
      longest = Math.max(longest, row.bp);
    }
    return {
      maxX: walks.origin + longest * (pitch.readouts ? READOUT_ROOM : 1),
      maxY: walks.rows.length * pitch.rowPx
    };
  }
  function walkRowLayout(graph, region) {
    const backbone = backboneNodes(graph);
    const walks = walkRows(graph, region);
    if (backbone.length === 0 || !walks) {
      return void 0;
    }
    const overWindow = region ? backbone.filter((n) => overlapsWindow(n, region)) : backbone;
    const nodePositions = backbonePositions(
      overWindow.length > 0 ? overWindow : backbone
    );
    const rowLabels = [
      { label: walks.reference.label, y: 0 },
      ...walks.rows.map((row, i) => ({
        label: row.label,
        y: (i + 1) * ROW_HEIGHT_PX
      }))
    ];
    return {
      nodePositions,
      rowLabels,
      referenceAxis: true,
      pixelRows: true,
      extent: walkRowsExtent(walks)
    };
  }

  // ../bandage-core/src/layoutModes.ts
  var FORCE_LAYOUT_LABEL = "Force-directed layout";
  var hasBackbone = (graph) => graph.nodes.some(isBackbone);
  var hasWalks = (graph) => hasBackbone(graph) && (graph.paths?.length ?? 0) > 1;
  var hasAlleles = (graph) => hasBackbone(graph) && graph.nodes.some(isOffReference);
  var LAYOUT_MODES = [
    {
      value: "auto",
      label: "Anchored",
      description: "x is reference bp, one row per stable rank. Needs rGFA tags or a reference path.",
      run: anchoredLayout,
      cutMargins: true,
      wholeWalks: false,
      available: hasBackbone,
      drawsLocally: hasBackbone,
      drawsNodes: true
    },
    {
      value: "samplerows",
      label: "Sample rows",
      description: "x is reference bp, one row per contributing assembly. Needs rGFA tags or a reference path.",
      run: sampleRowLayout,
      cutMargins: true,
      wholeWalks: false,
      available: hasAlleles,
      drawsLocally: hasAlleles,
      drawsNodes: true
    },
    {
      value: "walkrows",
      label: "Walk rows",
      description: "x is each walk's own bp: one bar per haplotype, blue on the reference's path and purple off it, so a repeat expansion reads as bar length, and each bar boxes its haplotype's own genes where the session has them. Needs W or P lines.",
      run: walkRowLayout,
      cutMargins: false,
      wholeWalks: true,
      available: hasWalks,
      drawsLocally: hasWalks,
      drawsNodes: false
    },
    {
      value: "ordered",
      label: "Ordered",
      description: "x is reference order, not bp: every node gets room, bubbles read as lenses. Needs rGFA tags or a reference path.",
      run: orderedLayout,
      cutMargins: false,
      wholeWalks: false,
      available: hasBackbone,
      drawsLocally: hasBackbone,
      drawsNodes: true
    },
    {
      value: "tubemap",
      label: "Tube map",
      description: "sequenceTubeMap: every path a coloured tube through boxed nodes, columns in node order and node widths log-scaled. Needs P or W lines.",
      run: tubeMapLayout,
      cutMargins: false,
      wholeWalks: false,
      available: hasTubeMapPaths,
      drawsLocally: hasTubeMapPaths,
      drawsNodes: false
    },
    {
      value: "tubemapref",
      label: "Tube map on reference",
      description: "The tube map with each column at the reference bp it covers, so the tubes line up with the tracks around them. Needs P or W lines and a reference path.",
      run: tubeMapReferenceLayout,
      cutMargins: true,
      wholeWalks: false,
      available: hasTubeMapBackbone,
      drawsLocally: hasTubeMapBackbone,
      drawsNodes: false
    },
    {
      value: "force",
      label: FORCE_LAYOUT_LABEL,
      description: "OGDF FMMM, via the external Bandage engine.",
      run: () => void 0,
      cutMargins: false,
      wholeWalks: false,
      available: () => true,
      drawsLocally: () => false,
      drawsNodes: true
    }
  ];
  var LAYOUT_MODE_VALUES = LAYOUT_MODES.map((m) => m.value);
  function layoutModeByValue(value) {
    return LAYOUT_MODES.find((m) => m.value === value) ?? LAYOUT_MODES[0];
  }

  // ../bandage-core/src/layout/drawnScale.ts
  var MEAN_NODE_LENGTH = 40;
  var MIN_TOTAL_GRAPH_LENGTH = 500;
  var BANDAGE_MINIMUM_NODE_LENGTH = 5;
  function drawnNodeLength(opts, length) {
    return Math.max(
      opts.nodeLengthPerMegabase * length / 1e6,
      opts.minimumNodeLength
    );
  }
  function bandageAutoScale(graph, minNodeLength = BANDAGE_MINIMUM_NODE_LENGTH) {
    const totalLength = graph.nodes.reduce((sum, n) => sum + n.length, 0);
    const megabases = totalLength / 1e6;
    const target = Math.max(
      graph.nodes.length * MEAN_NODE_LENGTH,
      MIN_TOTAL_GRAPH_LENGTH
    );
    return {
      nodeLengthPerMegabase: megabases > 0 ? target / megabases : 1e4,
      minimumNodeLength: Math.max(BANDAGE_MINIMUM_NODE_LENGTH, minNodeLength),
      edgeLength: 5,
      nodeSegmentLength: 20
    };
  }
  var PROPORTIONAL_LENGTH = { power: 1, effect: 1 };
  function isProportional(law) {
    return law.power === 1 && law.effect === 1;
  }
  function drawnLengthFor(graph, law) {
    const count = graph.nodes.length;
    const totalLength = graph.nodes.reduce((sum, n) => sum + n.length, 0);
    const meanBp = count > 0 ? totalLength / count : 0;
    const meanDrawn = count > 0 ? Math.max(count * MEAN_NODE_LENGTH, MIN_TOTAL_GRAPH_LENGTH) / count : MEAN_NODE_LENGTH;
    return (bp) => {
      if (meanBp <= 0) {
        return meanDrawn;
      }
      const relative = (bp / meanBp) ** law.power;
      return Math.max(
        meanDrawn * ((relative - 1) * law.effect + 1),
        BANDAGE_MINIMUM_NODE_LENGTH
      );
    };
  }
  var LAYOUT_LENGTH_PRECISION = 1e3;
  var PROPORTIONAL_SPREAD = {
    law: PROPORTIONAL_LENGTH,
    minNodeLength: 0
  };
  function layoutScaling(graph, spread = PROPORTIONAL_SPREAD) {
    const { law, minNodeLength } = spread;
    const opts = bandageAutoScale(graph, minNodeLength);
    if (isProportional(law)) {
      return { nodes: graph.nodes, opts };
    }
    const drawn = drawnLengthFor(graph, law);
    return {
      nodes: graph.nodes.map((node) => ({
        ...node,
        length: Math.round(drawn(node.length) * LAYOUT_LENGTH_PRECISION)
      })),
      opts: {
        ...opts,
        nodeLengthPerMegabase: 1e6 / LAYOUT_LENGTH_PRECISION,
        // Bandage's own floor only. A law and a raised floor are alternatives
        // rather than a stack: the law has already lifted the small end, and a
        // floor on top of it would flatten exactly what it just spread.
        minimumNodeLength: BANDAGE_MINIMUM_NODE_LENGTH
      }
    };
  }
  function drawnLengthOf(graph, spread = PROPORTIONAL_SPREAD) {
    if (isProportional(spread.law)) {
      const opts = bandageAutoScale(graph, spread.minNodeLength);
      return (bp) => drawnNodeLength(opts, bp);
    }
    return drawnLengthFor(graph, spread.law);
  }

  // ../bandage-core/src/bubbleSpreads.ts
  var BUBBLE_SPREADS = [
    {
      value: "auto",
      label: "Proportional",
      description: "Bandage's own scale: a node draws proportional to its length, so a 1 bp allele is a speck.",
      law: PROPORTIONAL_LENGTH,
      minNodeFactor: 0
    },
    {
      value: "open",
      label: "Open bubbles",
      description: "Give every allele a drawn length, so a bubble reads as two arms rather than a knot.",
      law: PROPORTIONAL_LENGTH,
      minNodeFactor: 2.5
    },
    {
      value: "wide",
      label: "Wide bubbles",
      description: "As open, spread further. Best on a window of a dozen bubbles.",
      law: PROPORTIONAL_LENGTH,
      minNodeFactor: 10
    },
    {
      value: "compress",
      label: "Compress lengths",
      description: "Pull the longest and shortest nodes towards the graph\u2019s mean, so a cut spanning kb and bp fits one pane.",
      law: { power: 0.5, effect: 0.5 },
      minNodeFactor: 0
    }
  ];
  var BUBBLE_SPREAD_VALUES = BUBBLE_SPREADS.map((s) => s.value);
  function spreadFor(spread) {
    const entry = BUBBLE_SPREADS.find((s) => s.value === spread);
    return {
      law: entry?.law ?? PROPORTIONAL_LENGTH,
      minNodeLength: (entry?.minNodeFactor ?? 0) * MEAN_NODE_LENGTH
    };
  }

  // ../bandage-core/src/gfa-core/gfaParser.ts
  function parseTag(tag, tags) {
    const nameEnd = tag.indexOf(":");
    const typeEnd = tag.indexOf(":", nameEnd + 1);
    if (nameEnd !== -1 && typeEnd !== -1) {
      const name = tag.slice(0, nameEnd);
      const type = tag.slice(nameEnd + 1, typeEnd);
      const val = tag.slice(typeEnd + 1);
      if (type === "i" || type === "f") {
        tags[name] = +val;
      } else if (type === "Z") {
        tags[name] = val;
      }
    }
  }
  function parseTags(fields) {
    const tags = {};
    for (const field of fields) {
      parseTag(field, tags);
    }
    return tags;
  }
  function stableCoordinate(node) {
    const { SN, SO, SR } = node.tags;
    return typeof SN === "string" && typeof SO === "number" && typeof SR === "number" ? { refName: SN, start: SO, rank: SR } : void 0;
  }
  var GT = 62;
  var LT = 60;
  function parseWalkBody(body) {
    const segments = [];
    let strand = "+";
    let start = 0;
    function push(end) {
      if (end > start) {
        segments.push({ id: body.slice(start, end), strand });
      }
    }
    for (let i = 0; i < body.length; i++) {
      const ch = body.charCodeAt(i);
      if (ch === GT || ch === LT) {
        push(i);
        strand = ch === GT ? "+" : "-";
        start = i + 1;
      }
    }
    push(body.length);
    return segments;
  }
  function parseGFA(file) {
    const graph = {
      nodes: [],
      links: [],
      paths: [],
      walks: [],
      header: [],
      id: ""
    };
    for (const rawLine of file.split("\n")) {
      const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
      if (line.startsWith("H")) {
        const [, ...rest] = line.split("	");
        graph.header.push(parseTags(rest));
      } else if (line.startsWith("S")) {
        const [, name, ...rest] = line.split("	");
        let len;
        let seq;
        let tagfields;
        let gfa1 = false;
        const first = rest[0] ?? "*";
        if (/^\d+$/.test(first)) {
          len = +first;
          seq = rest[1] ?? "*";
          tagfields = rest.slice(2);
        } else {
          gfa1 = true;
          seq = first;
          len = seq === "*" ? 0 : seq.length;
          tagfields = rest.slice(1);
        }
        const tags = parseTags(tagfields);
        if (gfa1 && "LN" in tags) {
          len = +tags.LN;
        }
        graph.nodes.push({ id: name, length: len, sequence: seq, tags });
      } else if (line.startsWith("E")) {
        const [, , source, target, , , , , cigar, ...rest] = line.split("	");
        if (source && target) {
          graph.links.push({
            source: source.slice(0, -1),
            target: target.slice(0, -1),
            strand1: source.at(-1),
            strand2: target.at(-1),
            cigar: cigar ?? "*",
            tags: parseTags(rest)
          });
        }
      } else if (line.startsWith("L")) {
        const [, source, strand1, target, strand2, cigar, ...rest] = line.split("	");
        if (source && target && strand2) {
          graph.links.push({
            source,
            target,
            strand1,
            strand2,
            cigar: cigar ?? "*",
            tags: parseTags(rest)
          });
        }
      } else if (line.startsWith("W")) {
        const [, sample, hap, contig, start, end, body, ...rest] = line.split("	");
        if (sample && hap && contig && start && end && body) {
          graph.walks.push({
            sample,
            haplotype: +hap,
            contig,
            start: start === "*" ? -1 : +start,
            end: end === "*" ? -1 : +end,
            segments: parseWalkBody(body),
            tags: parseTags(rest)
          });
        }
      } else if (line.startsWith("P")) {
        const [, name, path, ...rest] = line.split("	");
        if (name && path) {
          graph.paths.push({ name, path, rest });
        }
      }
    }
    return graph;
  }

  // ../bandage-core/src/gfa/gfaConverter.ts
  function surveySegments(gfaGraph) {
    const canonical = /* @__PURE__ */ new Map();
    const traversals = /* @__PURE__ */ new Map();
    function claim(id, strand) {
      if (!canonical.has(id)) {
        canonical.set(id, strand);
      }
    }
    function traverse(id, strand) {
      const seen = traversals.get(id);
      if (seen === void 0) {
        claim(id, strand);
      }
      traversals.set(id, (seen ?? 0) + 1);
    }
    for (const link of gfaGraph.links) {
      claim(link.source, link.strand1 === "-" ? "-" : "+");
      claim(link.target, link.strand2 === "-" ? "-" : "+");
    }
    for (const gfaPath of gfaGraph.paths) {
      for (const segment of gfaPath.path.split(",")) {
        traverse(segment.slice(0, -1), segment.endsWith("-") ? "-" : "+");
      }
    }
    for (const walk of gfaGraph.walks) {
      for (const seg of walk.segments) {
        traverse(seg.id, seg.strand === "-" ? "-" : "+");
      }
    }
    return { canonical, traversals };
  }
  var walkStart = (w) => w.start === -1 ? 0 : w.start;
  var stranded = (s) => s.strand === "+" || s.strand === "-";
  function anchorablePaths(gfaGraph) {
    return [
      ...gfaGraph.paths.map((p) => ({
        ...pathOrigin(p.name),
        steps: p.path.split(",").map((segment) => ({
          id: segment.slice(0, -1),
          strand: segment.endsWith("-") ? "-" : "+"
        }))
      })),
      ...gfaGraph.walks.map((w) => ({
        name: `${w.sample}#${w.haplotype}#${w.contig}`,
        start: walkStart(w),
        steps: w.segments.every(stranded) ? w.segments : w.segments.map((s) => ({
          id: s.id,
          strand: s.strand === "-" ? "-" : "+"
        }))
      }))
    ];
  }
  function carriedSamples(gfaNode) {
    const sm = gfaNode.tags.SM;
    if (typeof sm !== "string") {
      return void 0;
    }
    const samples = sm.split(",").map((s) => s.trim()).filter(Boolean);
    return samples.length > 0 ? samples : void 0;
  }
  var positive = (v) => typeof v === "number" && v > 0 ? v : void 0;
  function statedDepth({ tags, length }) {
    const count = positive(tags.RC) ?? positive(tags.FC) ?? positive(tags.KC);
    return positive(tags.dp) ?? positive(tags.DP) ?? (count !== void 0 && length > 0 ? count / length : void 0);
  }
  function makeNode(gfaNode, strand, depth) {
    return {
      id: `${gfaNode.id}${strand}`,
      name: gfaNode.id,
      length: gfaNode.length,
      depth,
      stable: stableCoordinate(gfaNode),
      samples: carriedSamples(gfaNode)
    };
  }
  function convertGFAToGraph(gfaGraph, name = "Imported GFA") {
    const nodes = [];
    const edges = [];
    const { canonical, traversals } = surveySegments(gfaGraph);
    const nodeIds = /* @__PURE__ */ new Map();
    const nodeId = (segmentId) => {
      let id = nodeIds.get(segmentId);
      if (id === void 0) {
        id = `${segmentId}${canonical.get(segmentId) ?? "+"}`;
        nodeIds.set(segmentId, id);
      }
      return id;
    };
    for (const gfaNode of gfaGraph.nodes) {
      const depth = statedDepth(gfaNode) ?? Math.max(traversals.get(gfaNode.id) ?? 1, 1);
      nodes.push(makeNode(gfaNode, canonical.get(gfaNode.id) ?? "+", depth));
    }
    for (const link of gfaGraph.links) {
      edges.push({
        from: nodeId(link.source),
        to: nodeId(link.target),
        fromStrand: link.strand1 === "-" ? "-" : "+",
        toStrand: link.strand2 === "-" ? "-" : "+"
      });
    }
    const paths = [];
    const pathsByPair = /* @__PURE__ */ new Map();
    const pairPaths = (a, b) => pathsByPair.get(a)?.get(b);
    function addPair(a, b, set) {
      let to = pathsByPair.get(a);
      if (!to) {
        to = /* @__PURE__ */ new Map();
        pathsByPair.set(a, to);
      }
      to.set(b, set);
    }
    const edgePaths = edges.map((edge) => {
      let set = pairPaths(edge.from, edge.to);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        addPair(edge.from, edge.to, set);
        addPair(edge.to, edge.from, set);
      }
      return set;
    });
    function recordPathEdges(nodeIds2, name2) {
      for (let i = 0; i < nodeIds2.length - 1; i++) {
        pairPaths(nodeIds2[i], nodeIds2[i + 1])?.add(name2);
      }
    }
    for (const gfaPath of gfaGraph.paths) {
      const nodeIds2 = gfaPath.path.split(",").map((segment) => nodeId(segment.slice(0, -1)));
      paths.push({
        name: gfaPath.name,
        nodeIds: nodeIds2,
        start: pathOrigin(gfaPath.name).start
      });
      recordPathEdges(nodeIds2, gfaPath.name);
    }
    for (const walk of gfaGraph.walks) {
      const nodeIds2 = walk.segments.map((seg) => nodeId(seg.id));
      const name2 = `${walk.sample}#${walk.haplotype}#${walk.contig}`;
      paths.push({
        name: name2,
        nodeIds: nodeIds2,
        start: walkStart(walk),
        sample: walk.sample,
        haplotype: walk.haplotype,
        contig: walk.contig
      });
      recordPathEdges(nodeIds2, name2);
    }
    edges.forEach((edge, i) => {
      const pathIds = edgePaths[i];
      if (pathIds.size > 0) {
        edge.pathIds = [...pathIds];
      }
    });
    const lengths = new Map(gfaGraph.nodes.map((n) => [n.id, n.length]));
    const anchoring = gfaGraph.paths.length > 0 || gfaGraph.walks.length > 0 ? surveyPaths(anchorablePaths(gfaGraph), (id) => lengths.get(id) ?? 0) : void 0;
    return {
      name,
      nodes,
      edges,
      paths: paths.length > 0 ? paths : void 0,
      anchorPaths: anchoring?.anchorPaths,
      pathVisits: anchoring?.pathVisits,
      // rGFA's own tags win wherever they are present; pathAnchoring only ever
      // fills in for a graph that carries none.
      anchoredBy: nodes.some((n) => n.stable) ? "tags" : void 0
    };
  }

  // ../bandage-core/src/gfa/gfaTables.ts
  var GT2 = 62;
  var LT2 = 60;
  var TAB = 9;
  var ZERO = 48;
  var NINE = 57;
  var TABLE_TAG = /^(?:LN:i|SN:Z|SO:i|SR:i):/;
  var UNTABLED_RECORD = /^[PEOUFG]\t/;
  var trimCR = (line) => line.endsWith("\r") ? line.slice(0, -1) : line;
  var Steps = class {
    constructor() {
      this.nodes = new Int32Array(1 << 16);
      this.reversed = new Uint8Array(1 << 16);
      this.length = 0;
    }
    push(node, reversed) {
      if (this.length === this.nodes.length) {
        const nodes = new Int32Array(this.length * 2);
        nodes.set(this.nodes);
        this.nodes = nodes;
        const rev = new Uint8Array(this.length * 2);
        rev.set(this.reversed);
        this.reversed = rev;
      }
      this.nodes[this.length] = node;
      this.reversed[this.length++] = reversed;
    }
  };
  var SegmentIndex = class {
    constructor() {
      this.names = [];
      this.byName = /* @__PURE__ */ new Map();
      // ids that are plain decimal, so a walk step finds its segment without
      // slicing a string out of the body
      this.byNumber = /* @__PURE__ */ new Map();
    }
    has(name) {
      return this.byName.has(name);
    }
    add(name) {
      const i = this.names.length;
      this.byName.set(name, i);
      this.names.push(name);
      const n = +name;
      if (Number.isSafeInteger(n) && String(n) === name) {
        this.byNumber.set(n, i);
      }
      return i;
    }
    of(name) {
      return this.byName.get(name) ?? this.add(name);
    }
    ofNumber(n) {
      return this.byNumber.get(n);
    }
  };
  function readSegment(line) {
    const [, name, sequence = "*", ...tags] = line.split("	");
    if (!name || /^\d+$/.test(sequence)) {
      return void 0;
    }
    let length = sequence === "*" ? 0 : sequence.length;
    let refName;
    let start;
    let rank;
    for (const tag of tags) {
      if (!TABLE_TAG.test(tag)) {
        return void 0;
      }
      const value = tag.slice(5);
      const key = tag.slice(0, 2);
      if (key === "LN") {
        length = +value;
      } else if (key === "SN") {
        refName = value;
      } else if (key === "SO") {
        start = +value;
      } else {
        rank = +value;
      }
    }
    const stable = refName !== void 0 && start !== void 0 && rank !== void 0 ? { refName, start, rank } : void 0;
    return { name, length, stable };
  }
  function readWalkBody(line, from, segments, steps) {
    let reversed = 0;
    let start = -1;
    let value = 0;
    let decimal = true;
    const finish = (end) => {
      if (start >= 0 && end > start) {
        const node = decimal && end - start < 16 && (end - start === 1 || line.charCodeAt(start) !== ZERO) ? segments.ofNumber(value) : void 0;
        steps.push(node ?? segments.of(line.slice(start, end)), reversed);
      }
    };
    let i = from;
    for (; i < line.length; i++) {
      const ch = line.charCodeAt(i);
      if (ch === GT2 || ch === LT2) {
        finish(i);
        reversed = ch === LT2 ? 1 : 0;
        start = i + 1;
        value = 0;
        decimal = true;
      } else if (ch === TAB) {
        break;
      } else if (decimal && ch >= ZERO && ch <= NINE) {
        value = value * 10 + ch - ZERO;
      } else {
        decimal = false;
      }
    }
    finish(i);
  }
  function walkFields(line) {
    const fields = [];
    let at = 0;
    while (fields.length < 6) {
      const tab = line.indexOf("	", at);
      if (tab === -1) {
        return void 0;
      }
      fields.push(line.slice(at, tab));
      at = tab + 1;
    }
    const [, sample, haplotype, contig, start, end] = fields;
    return sample && haplotype && contig && start && end && at < line.length ? { sample, haplotype, contig, start, end, body: at } : void 0;
  }
  function gfaTables(text) {
    const lines = text.split("\n");
    const segments = new SegmentIndex();
    const lengths = [];
    const refs = [];
    const starts = [];
    const ranks = [];
    const refNames = [];
    const refIndex = /* @__PURE__ */ new Map();
    for (const raw of lines) {
      if (UNTABLED_RECORD.test(raw)) {
        return void 0;
      }
      if (raw.startsWith("S	")) {
        const s = readSegment(trimCR(raw));
        if (!s || segments.has(s.name)) {
          return void 0;
        }
        segments.add(s.name);
        lengths.push(s.length);
        let ref = -1;
        if (s.stable) {
          ref = refIndex.get(s.stable.refName) ?? refNames.length;
          if (ref === refNames.length) {
            refNames.push(s.stable.refName);
            refIndex.set(s.stable.refName, ref);
          }
        }
        refs.push(ref);
        starts.push(s.stable?.start ?? 0);
        ranks.push(s.stable?.rank ?? 0);
      }
    }
    const from = [];
    const to = [];
    const strands = [];
    const names = [];
    const walkStarts = [];
    const walkEnds = [];
    const offsets = [0];
    const steps = new Steps();
    for (const raw of lines) {
      if (raw.startsWith("L	")) {
        const [, source, strand1, target, strand2] = trimCR(raw).split("	");
        if (source && target && strand2) {
          from.push(segments.of(source));
          to.push(segments.of(target));
          strands.push((strand1 === "-" ? 1 : 0) | (strand2 === "-" ? 2 : 0));
        }
      } else if (raw.startsWith("W	")) {
        const line = trimCR(raw);
        const w = walkFields(line);
        if (w) {
          names.push(`${w.sample}#${w.haplotype}#${w.contig}`);
          walkStarts.push(w.start === "*" ? 0 : +w.start);
          walkEnds.push(w.end === "*" ? -1 : +w.end);
          readWalkBody(line, w.body, segments, steps);
          if (steps.length === offsets.at(-1)) {
            return void 0;
          }
          offsets.push(steps.length);
        }
      }
    }
    return {
      nodes: {
        names: segments.names,
        lengths: Int32Array.from(lengths),
        refs: Int32Array.from(refs),
        starts: Float64Array.from(starts),
        ranks: Int32Array.from(ranks),
        refNames
      },
      links: {
        from: Int32Array.from(from),
        to: Int32Array.from(to),
        strands: Uint8Array.from(strands)
      },
      walks: {
        names,
        starts: Float64Array.from(walkStarts),
        ends: Float64Array.from(walkEnds),
        offsets: Int32Array.from(offsets),
        steps: steps.nodes.slice(0, steps.length),
        reversed: steps.reversed.slice(0, steps.length)
      }
    };
  }

  // ../bandage-core/src/gfa/graphTables.ts
  function walkFields2(panSN) {
    const [sample = "", haplotype = "", ...contig] = panSN.split("#");
    return { sample, haplotype, contig: contig.join("#") };
  }
  function graphFromTables({ nodes: n, links: l, walks: w }, name = "Imported GFA") {
    const count = n.names.length;
    const declared = n.lengths.length;
    const canonical = new Uint8Array(count);
    const claim = (node, reversed) => {
      if (canonical[node] === 0) {
        canonical[node] = reversed ? 2 : 1;
      }
    };
    for (let i = 0; i < l.from.length; i++) {
      claim(l.from[i], l.strands[i] & 1);
      claim(l.to[i], l.strands[i] & 2);
    }
    const drawnWalks = [];
    for (let p = 0; p < w.names.length; p++) {
      if (w.offsets[p + 1] > w.offsets[p]) {
        drawnWalks.push(p);
      }
    }
    const traversals = new Int32Array(count);
    for (const p of drawnWalks) {
      for (let s = w.offsets[p]; s < w.offsets[p + 1]; s++) {
        const node = w.steps[s];
        if (traversals[node] === 0) {
          claim(node, w.reversed[s]);
        }
        traversals[node]++;
      }
    }
    const ids = n.names.map(
      (segment, i) => `${segment}${canonical[i] === 2 ? "-" : "+"}`
    );
    const nodes = [];
    for (let i = 0; i < declared; i++) {
      const ref = n.refs[i];
      nodes.push({
        id: ids[i],
        name: n.names[i],
        length: n.lengths[i],
        depth: Math.max(traversals[i], 1),
        stable: ref < 0 ? void 0 : {
          refName: n.refNames[ref],
          start: n.starts[i],
          rank: n.ranks[i]
        },
        samples: void 0
      });
    }
    const edges = [];
    const neighbours = new Array(count);
    const pairList = (a, b) => {
      const near = neighbours[a];
      if (near) {
        for (let j = 0; j < near.length; j += 2) {
          if (near[j] === b) {
            return near[j + 1];
          }
        }
      }
      return void 0;
    };
    const addPair = (a, b, list) => {
      const near = neighbours[a];
      if (near) {
        near.push(b, list);
      } else {
        neighbours[a] = [b, list];
      }
    };
    const edgeLists = [];
    let lists = 0;
    for (let i = 0; i < l.from.length; i++) {
      const a = l.from[i];
      const b = l.to[i];
      edges.push({
        from: ids[a],
        to: ids[b],
        fromStrand: l.strands[i] & 1 ? "-" : "+",
        toStrand: l.strands[i] & 2 ? "-" : "+"
      });
      let list = pairList(a, b);
      if (list === void 0) {
        list = lists++;
        addPair(a, b, list);
        addPair(b, a, list);
      }
      edgeLists.push(list);
    }
    const nameIndex = /* @__PURE__ */ new Map();
    const pathNames = [];
    const crossing = Array.from({ length: lists }, () => []);
    const lastWalk = new Int32Array(lists).fill(-1);
    const paths = [];
    const anchorPaths = [];
    const visits = new Array(count);
    const filled = new Int32Array(count);
    const visitOrder = [];
    for (const p of drawnWalks) {
      const { sample, haplotype, contig } = walkFields2(w.names[p]);
      const pathName = `${sample}#${+haplotype}#${contig}`;
      let named = nameIndex.get(pathName);
      const repeat = named !== void 0;
      if (named === void 0) {
        named = pathNames.length;
        nameIndex.set(pathName, named);
        pathNames.push(pathName);
      }
      const start = w.starts[p];
      const visitSample = panSNSample(pathName);
      const first = w.offsets[p];
      const nodeIds = new Array(w.offsets[p + 1] - first);
      let pos = start;
      let prev = -1;
      for (let s = first; s < w.offsets[p + 1]; s++) {
        const node = w.steps[s];
        nodeIds[s - first] = ids[node];
        if (filled[node] === 0) {
          visits[node] = new Array(traversals[node]);
          visitOrder.push(node);
        }
        visits[node][filled[node]++] = {
          path: pathName,
          sample: visitSample,
          start: pos,
          strand: w.reversed[s] ? "-" : "+"
        };
        pos += node < declared ? n.lengths[node] : 0;
        if (prev >= 0) {
          const list = pairList(prev, node);
          if (list !== void 0 && lastWalk[list] !== p) {
            lastWalk[list] = p;
            const names = crossing[list];
            if (!repeat || !names.includes(named)) {
              names.push(named);
            }
          }
        }
        prev = node;
      }
      paths.push({
        name: pathName,
        nodeIds,
        start,
        sample,
        haplotype: +haplotype,
        contig
      });
      anchorPaths.push({
        name: pathName,
        sample: visitSample,
        start,
        length: pos - start
      });
    }
    edges.forEach((edge, i) => {
      const names = crossing[edgeLists[i]];
      if (names.length > 0) {
        edge.pathIds = names.map((k) => pathNames[k]);
      }
    });
    const walked = drawnWalks.length > 0;
    return {
      name,
      nodes,
      edges,
      paths: walked ? paths : void 0,
      anchorPaths: walked ? anchorPaths : void 0,
      pathVisits: walked ? new Map(visitOrder.map((node) => [n.names[node], visits[node]])) : void 0,
      anchoredBy: nodes.some((node) => node.stable) ? "tags" : void 0
    };
  }

  // ../bandage-core/src/layout/orientToReference.ts
  function orientToReference(graph, positions) {
    const backbone = graph.nodes.filter(
      (node) => isBackbone(node) && (positions[node.id]?.length ?? 0) > 0
    );
    if (backbone.length < 2) {
      return positions;
    }
    const points = backbone.map((node) => {
      const segments = positions[node.id];
      const mid = segments[Math.floor(segments.length / 2)];
      return {
        x: mid.x,
        y: mid.y,
        r: node.stable.start + node.length / 2,
        w: node.length
      };
    });
    const weight = points.reduce((sum, p) => sum + p.w, 0);
    const cx = points.reduce((sum, p) => sum + p.x * p.w, 0) / weight;
    const cy = points.reduce((sum, p) => sum + p.y * p.w, 0) / weight;
    const cr = points.reduce((sum, p) => sum + p.r * p.w, 0) / weight;
    let sxr = 0;
    let syr = 0;
    for (const p of points) {
      sxr += p.w * (p.x - cx) * (p.r - cr);
      syr += p.w * (p.y - cy) * (p.r - cr);
    }
    const angle = -Math.atan2(syr, sxr);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const out = {};
    for (const [id, segments] of Object.entries(positions)) {
      out[id] = segments.map((p) => {
        const x = p.x - cx;
        const y = p.y - cy;
        return { x: cx + c * x - s * y, y: cy + s * x + c * y };
      });
    }
    let below = 0;
    let above = 0;
    for (const node of graph.nodes) {
      if (isBackbone(node)) {
        continue;
      }
      for (const p of out[node.id] ?? []) {
        if (p.y > cy) {
          below++;
        } else {
          above++;
        }
      }
    }
    if (above > below) {
      for (const segments of Object.values(out)) {
        for (const p of segments) {
          p.y = 2 * cy - p.y;
        }
      }
    }
    return out;
  }

  // ../bandage-core/src/layout/referenceSeeds.ts
  var LANE_GAP2 = 30;
  function referenceSeeds(graph, scaling) {
    const { opts } = scaling;
    const drawn = new Map(
      scaling.nodes.map((node) => [node.id, drawnNodeLength(opts, node.length)])
    );
    const drawnOf = (id) => drawn.get(id) ?? opts.minimumNodeLength;
    const backbone = graph.nodes.filter(isBackbone).sort((a, b) => a.stable.start - b.stable.start);
    const seeds = /* @__PURE__ */ new Map();
    let x = 0;
    for (const node of backbone) {
      seeds.set(node.id, { x, y: 0 });
      x += drawnOf(node.id) + opts.edgeLength;
    }
    const adjacent = buildNeighbors(graph);
    const depth = new Map(backbone.map((node) => [node.id, 0]));
    const queue = backbone.map((node) => node.id);
    for (const id of queue) {
      const at = seeds.get(id);
      const next = depth.get(id) + 1;
      for (const neighbour of adjacent.get(id) ?? []) {
        if (depth.has(neighbour)) {
          continue;
        }
        depth.set(neighbour, next);
        seeds.set(neighbour, { x: at.x + drawnOf(id) / 2, y: LANE_GAP2 * next });
        queue.push(neighbour);
      }
    }
    let unreached = 0;
    for (const node of graph.nodes) {
      if (!seeds.has(node.id)) {
        seeds.set(node.id, {
          x: unreached++ * x / graph.nodes.length,
          y: LANE_GAP2 * 3
        });
      }
    }
    return seeds;
  }
  function seededNodes(graph, scaling) {
    const seeds = referenceSeeds(graph, scaling);
    return scaling.nodes.map((node) => ({ ...node, ...seeds.get(node.id) }));
  }

  // ../bandage-core/src/layout/smoothChains.ts
  var STEP_TURN = Math.PI / 24;
  function turnAt(line, i) {
    const a = line[i - 1];
    const b = line[i];
    const c = line[i + 1];
    if (!a || !c) {
      return 0;
    }
    const t = Math.abs(
      Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x)
    );
    return t > Math.PI ? 2 * Math.PI - t : t;
  }
  function centripetal(p0, p1, p2, p3, u) {
    const knot = (a, b) => Math.max(Math.hypot(b.x - a.x, b.y - a.y) ** 0.5, 1e-9);
    const t1 = knot(p0, p1);
    const t2 = t1 + knot(p1, p2);
    const t3 = t2 + knot(p2, p3);
    const t = t1 + u * (t2 - t1);
    const lerp2 = (a, b, ta, tb) => {
      const f = (t - ta) / (tb - ta);
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    };
    const a1 = lerp2(p0, p1, 0, t1);
    const a2 = lerp2(p1, p2, t1, t2);
    const a3 = lerp2(p2, p3, t2, t3);
    return lerp2(lerp2(a1, a2, 0, t2), lerp2(a2, a3, t1, t3), t1, t2);
  }
  var reflect = (p, about) => ({
    x: 2 * about.x - p.x,
    y: 2 * about.y - p.y
  });
  function smoothChain(line) {
    if (line.length < 3) {
      return line;
    }
    const out = [line[0]];
    for (let i = 0; i + 1 < line.length; i++) {
      const p1 = line[i];
      const p2 = line[i + 1];
      const steps = Math.ceil(
        Math.max(turnAt(line, i), turnAt(line, i + 1)) / STEP_TURN
      );
      const p0 = line[i - 1] ?? reflect(p2, p1);
      const p3 = line[i + 2] ?? reflect(p1, p2);
      for (let s = 1; s < steps; s++) {
        out.push(centripetal(p0, p1, p2, p3, s / steps));
      }
      out.push(p2);
    }
    return out;
  }

  // ../bandage-core/src/pipeline.ts
  function graphOf(source, name) {
    if (typeof source !== "string") {
      return graphFromTables(source, name);
    }
    const tables = gfaTables(source);
    return tables ? graphFromTables(tables, name) : convertGFAToGraph(parseGFA(source), name);
  }
  function loadGraph(source, name, opts = {}) {
    const graph = anchorGraph(graphOf(source, name), opts.referencePath);
    if (graph.nodes.length === 0) {
      throw new Error(`No graph segments in ${name}`);
    }
    if (opts.maxNodes !== void 0 && graph.nodes.length > opts.maxNodes) {
      throw new Error(
        `Graph too large to draw: ${graph.nodes.length.toLocaleString()} nodes (limit ${opts.maxNodes.toLocaleString()}). Zoom in to a smaller region, or raise maxGraphNodes on this view.`
      );
    }
    return graph;
  }
  var ENGINE_DEFAULTS = {
    engine: "fmmm",
    quality: 2,
    linearLayout: false,
    bubbleSpread: "auto",
    spacing: 1,
    componentSeparation: 1,
    showDeletionEdges: true
  };
  function engineSettingsOf(s = {}) {
    return {
      engine: s.engine ?? ENGINE_DEFAULTS.engine,
      quality: s.quality ?? ENGINE_DEFAULTS.quality,
      linearLayout: s.linearLayout ?? ENGINE_DEFAULTS.linearLayout,
      bubbleSpread: s.bubbleSpread ?? ENGINE_DEFAULTS.bubbleSpread,
      spacing: s.spacing ?? ENGINE_DEFAULTS.spacing,
      componentSeparation: s.componentSeparation ?? ENGINE_DEFAULTS.componentSeparation,
      showDeletionEdges: s.showDeletionEdges ?? ENGINE_DEFAULTS.showDeletionEdges
    };
  }
  var COMPONENT_SEPARATION = 15;
  function engineRequest(graph, scaling, settings) {
    const anchored = graph.nodes.some(isBackbone);
    const spaced = {
      ...scaling,
      opts: {
        ...scaling.opts,
        edgeLength: scaling.opts.edgeLength * (settings.spacing ?? 1)
      }
    };
    return {
      graph: {
        nodes: anchored ? seededNodes(graph, spaced) : spaced.nodes,
        edges: graph.edges
      },
      options: {
        quality: settings.quality,
        linearLayout: settings.linearLayout,
        ...spaced.opts,
        componentSeparation: COMPONENT_SEPARATION * (settings.componentSeparation ?? 1),
        ...anchored ? { rotateComponents: false } : {},
        engine: settings.engine ?? "fmmm"
      }
    };
  }
  async function forceLayout(graph, settings, engine) {
    const spread = spreadFor(settings.bubbleSpread);
    const found = deletionEdges(graph);
    const dropped = settings.showDeletionEdges === false ? closableDeletions(graph, found) : /* @__PURE__ */ new Set();
    const deletions = found.filter((d) => !dropped.has(d.edgeIndex));
    const routed = withDeletionRoutes(graph, deletions, dropped);
    const merged = mergeRuns(routed.graph, routed.ids);
    const runs = {
      ...merged.graph,
      nodes: merged.graph.nodes.filter((n) => !routed.ids.has(n.id))
    };
    const engineScaling = layoutScaling(runs, spread);
    const { result, duration } = await engine(
      engineRequest(
        merged.graph,
        {
          ...engineScaling,
          nodes: [
            ...engineScaling.nodes,
            ...routeNodes(
              graph,
              deletions,
              routed.routes,
              drawnLengthOf(runs, spread),
              engineScaling.opts
            )
          ]
        },
        settings
      )
    );
    const scaling = layoutScaling(graph, spread);
    const drawn = new Map(
      scaling.nodes.map((n) => [n.id, drawnNodeLength(scaling.opts, n.length)])
    );
    const smoothed = Object.fromEntries(
      Object.entries(result.nodePositions).map(([id, line]) => [
        id,
        smoothChain(line)
      ])
    );
    const positions = splitRuns(smoothed, merged.runs, (id) => drawn.get(id) ?? 0);
    const { nodePositions, deletionRoutes } = takeRoutes(
      graph.nodes.some(isBackbone) ? orientToReference(graph, positions) : positions,
      routed.routes
    );
    return {
      result: {
        ...result,
        nodePositions,
        stranded: true,
        ...deletions.length ? { deletionRoutes, extent: layoutExtent(deletionRoutes) } : {}
      },
      duration
    };
  }
  function layoutExtent(nodePositions) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const segments of Object.values(nodePositions)) {
      for (const seg of segments) {
        minX = Math.min(minX, seg.x);
        minY = Math.min(minY, seg.y);
        maxX = Math.max(maxX, seg.x);
        maxY = Math.max(maxY, seg.y);
      }
    }
    return { minX, minY, maxX, maxY };
  }
  var FIT_PADDING = 40;
  var MIN_ZOOM = 1e-6;
  var MAX_ZOOM = 100;
  function clampZoom(zoom) {
    return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
  }
  function fittedTranslateY(bounds, usableHeight, yScale, padTop = FIT_PADDING) {
    const leftoverY = usableHeight - bounds.h * yScale;
    return padTop - bounds.minY * yScale + Math.max(0, leftoverY) / 2;
  }
  function fitTransform(bounds, paneWidth, paneHeight, pixelRows, {
    minScale = 0,
    padLeft = FIT_PADDING,
    padTop = FIT_PADDING,
    padRight = FIT_PADDING,
    padBottom = FIT_PADDING
  } = {}) {
    const usableWidth = paneWidth - padLeft - padRight;
    const usableHeight = paneHeight - padTop - padBottom;
    if (usableWidth <= 0 || usableHeight <= 0 || !(bounds.w > 0 || !pixelRows && bounds.h > 0)) {
      return void 0;
    }
    const fitX = bounds.w > 0 ? usableWidth / bounds.w : Infinity;
    const fitY = bounds.h > 0 ? usableHeight / bounds.h : Infinity;
    const scale = clampZoom(
      Math.max(minScale, pixelRows ? fitX : Math.min(fitX, fitY))
    );
    const leftoverX = usableWidth - bounds.w * scale;
    return {
      scale,
      translateX: padLeft - bounds.minX * scale + Math.max(0, leftoverX) / 2,
      translateY: fittedTranslateY(
        bounds,
        usableHeight,
        pixelRows ? 1 : scale,
        padTop
      )
    };
  }
  function drawingBounds(layout, opts = {}) {
    let { minX, minY, maxX, maxY } = layoutExtent(layout.nodePositions);
    const { region } = opts;
    if (layout.referenceAxis && region && region.end > region.start) {
      minX = region.start;
      maxX = region.end;
    }
    const extent = opts.extent ?? layout.extent;
    if (extent) {
      minX = Math.min(minX, extent.minX ?? minX);
      minY = Math.min(minY, extent.minY ?? minY);
      maxX = Math.max(maxX, extent.maxX ?? maxX);
      maxY = Math.max(maxY, extent.maxY ?? maxY);
    }
    return { minX, minY, w: maxX - minX, h: maxY - minY };
  }

  // ../bandage-core/src/renderer/colorBits.ts
  function packAbgr(r, g, b, a) {
    return (a << 24 | b << 16 | g << 8 | r) >>> 0;
  }
  function abgrRed(c) {
    return c & 255;
  }
  function abgrGreen(c) {
    return c >>> 8 & 255;
  }
  function abgrBlue(c) {
    return c >>> 16 & 255;
  }
  function abgrAlpha(c) {
    return c >>> 24 & 255;
  }
  function abgrToCssRgba(c) {
    return `rgba(${abgrRed(c)},${abgrGreen(c)},${abgrBlue(c)},${abgrAlpha(c) / 255})`;
  }
  function fadeAbgr(c, alpha) {
    return packAbgr(
      abgrRed(c),
      abgrGreen(c),
      abgrBlue(c),
      Math.round(abgrAlpha(c) * alpha)
    );
  }

  // ../bandage-core/src/nodeWidths.ts
  var NODE_WIDTHS = [
    {
      value: "depth",
      label: "By depth",
      description: "Thicker the more paths carry a node, on the square root of its depth against the mean. A graph with one depth everywhere draws uniform."
    },
    {
      value: "uniform",
      label: "Uniform",
      description: "Every node the same thickness."
    }
  ];
  var NODE_WIDTH_VALUES = NODE_WIDTHS.map((w) => w.value);
  var MIN_FACTOR = 0.3;
  var MAX_FACTOR = 3;
  function meanDepth(graph) {
    let weighted = 0;
    let length = 0;
    for (const node of graph.nodes) {
      weighted += node.depth * node.length;
      length += node.length;
    }
    return length > 0 ? weighted / length : 0;
  }
  function depthWidthFactor(node, mean) {
    if (!(mean > 0) || !(node.depth > 0)) {
      return 1;
    }
    return Math.min(
      MAX_FACTOR,
      Math.max(MIN_FACTOR, Math.sqrt(node.depth / mean))
    );
  }
  function nodeWidthPx(node, contigThickness, nodeWidth2, mean) {
    return contigThickness * (nodeWidth2 === "depth" ? depthWidthFactor(node, mean) : 1);
  }

  // ../bandage-core/src/util/edgeCurves.ts
  var cache = /* @__PURE__ */ new WeakMap();
  function baseEdgeCurves(nodePositions, graph, axis, deletions, version2, routes, stranded2 = false) {
    const { scaleX, scaleY } = axis;
    const cached2 = cache.get(nodePositions);
    if (cached2?.graph === graph && cached2.scaleX === scaleX && cached2.scaleY === scaleY && cached2.deletions === deletions && cached2.routes === routes && cached2.stranded === stranded2 && cached2.version === version2) {
      return cached2.curves;
    }
    const curves = /* @__PURE__ */ new Map();
    for (let ei = 0; ei < graph.edges.length; ei++) {
      const edge = graph.edges[ei];
      const from = nodePositions[edge.from];
      const to = nodePositions[edge.to];
      if (from?.length && to?.length) {
        const bypassed = deletions?.get(ei);
        const route = bypassed && routes?.[ei];
        curves.set(
          ei,
          route ? routedEdgeCurves(
            from,
            to,
            route,
            stranded2 ? strandSides(edge) : void 0
          ) : computeEdgeCurves(
            from,
            to,
            edgeJoinOf(edge, stranded2),
            0,
            0,
            axis,
            bypassed ? bypassedPoints(nodePositions, bypassed) : []
          )
        );
      }
    }
    cache.set(nodePositions, {
      graph,
      scaleX,
      scaleY,
      deletions,
      routes,
      stranded: stranded2,
      version: version2,
      curves
    });
    return curves;
  }

  // ../bandage-core/src/renderer/GeometryBuilder.ts
  var EDGE_DEFAULT_COLOR = packAbgr(119, 119, 119, 217);
  var EDGE_PATH_FALLBACK_COLOR = packAbgr(136, 136, 136, 217);
  var EDGE_DELETION_COLOR = packAbgr(24, 24, 28, 240);
  var DELETION_THICKNESS_FACTOR = 2.2;
  var LIFT_BACKDROP_COLOR = packAbgr(160, 160, 160, 255);
  var FADED_ALPHA = 0.18;
  var LIFT_BACKDROP_CSS = abgrToCssRgba(
    fadeAbgr(LIFT_BACKDROP_COLOR, FADED_ALPHA)
  );
  var DELETION_DASH_PX = 11;
  var MIN_PATH_STRIPE_PX = 1.2;
  var MIN_WALK_LANE_PX = 4;
  var MIN_SCALE_FOR_OFFSET = 1e-6;
  var ARROW_LENGTH_BASE_PX = 7;
  var ARROW_LENGTH_PER_EDGE_PX = 3;
  var ARROW_HALF_WIDTH_BASE_PX = 3;
  var ARROW_HALF_WIDTH_PER_EDGE_PX = 1.5;
  var MIN_LINK_HEADS = 3;
  var MIN_ARROW_FIT = 0.5;
  var MIN_ARROW_SCALE = 0.45;
  var ARROW_CURVE_STEPS = 12;
  var ABUTTING_PX = 1e-6;
  var walkX = new Float64Array(64);
  var walkY = new Float64Array(64);
  var walkPx = new Float64Array(64);
  function backFromEnd(curves, scale, yToX, untilPx) {
    const most = curves.length * ARROW_CURVE_STEPS + 1;
    if (walkX.length < most) {
      walkX = new Float64Array(most);
      walkY = new Float64Array(most);
      walkPx = new Float64Array(most);
    }
    const last = curves[curves.length - 1];
    walkX[0] = last.x1;
    walkY[0] = last.y1;
    walkPx[0] = 0;
    let n = 1;
    let px = 0;
    for (let ci = curves.length - 1; ci >= 0 && px < untilPx; ci--) {
      const c = curves[ci];
      for (let k = 1; k <= ARROW_CURVE_STEPS && px < untilPx; k++) {
        const t = 1 - (k / ARROW_CURVE_STEPS) ** 2;
        const u = 1 - t;
        const a = u * u * u;
        const b = 3 * u * u * t;
        const d = 3 * u * t * t;
        const e = t * t * t;
        const x = a * c.x0 + b * c.cx0 + d * c.cx1 + e * c.x1;
        const y = a * c.y0 + b * c.cy0 + d * c.cy1 + e * c.y1;
        px += Math.hypot(x - walkX[n - 1], (y - walkY[n - 1]) * yToX) * scale;
        walkX[n] = x;
        walkY[n] = y;
        walkPx[n] = px;
        n++;
      }
    }
    return n;
  }
  function walkPointAt(n, px) {
    let i = 1;
    while (i < n - 1 && walkPx[i] < px) {
      i++;
    }
    const from = walkPx[i - 1];
    const to = walkPx[i];
    const f = to > from ? Math.min(1, Math.max(0, (px - from) / (to - from))) : 0;
    return {
      x: walkX[i - 1] + (walkX[i] - walkX[i - 1]) * f,
      y: walkY[i - 1] + (walkY[i] - walkY[i - 1]) * f
    };
  }
  function arrowheadFor({
    curves,
    edgeHalfWidth,
    nodeHalfWidth,
    scale,
    yToX,
    color,
    fromSegments,
    toSegments
  }) {
    const length = ARROW_LENGTH_BASE_PX + ARROW_LENGTH_PER_EDGE_PX * edgeHalfWidth;
    const n = backFromEnd(
      curves,
      scale,
      yToX,
      nodeHalfWidth + MIN_LINK_HEADS * length
    );
    const lengthPx = walkPx[n - 1];
    const abutting = lengthPx < ABUTTING_PX;
    const inset = Math.min(nodeHalfWidth, lengthPx);
    const fit = abutting ? Math.min(1, polylinePx(fromSegments, scale, yToX) / length) : 1;
    if (abutting ? fit < MIN_ARROW_FIT : lengthPx < MIN_LINK_HEADS * length) {
      return void 0;
    }
    const tip = walkPointAt(n, inset);
    const base = walkPointAt(n, inset + length * fit);
    const dx = tip.x - base.x;
    const dy = (tip.y - base.y) * yToX;
    const last = curves[curves.length - 1];
    return {
      x: tip.x,
      y: tip.y,
      angle: Math.hypot(dx, dy) > 0 ? Math.atan2(dy, dx) : endTangent(last, yToX, intoDirection(last, toSegments)),
      length: length * fit,
      halfWidth: (ARROW_HALF_WIDTH_BASE_PX + ARROW_HALF_WIDTH_PER_EDGE_PX * edgeHalfWidth) * fit,
      color
    };
  }
  function polylinePx(segments, scale, yToX) {
    let length = 0;
    for (let i = 1; i < segments.length; i++) {
      length += Math.hypot(
        segments[i].x - segments[i - 1].x,
        (segments[i].y - segments[i - 1].y) * yToX
      );
    }
    return length * scale;
  }
  function leavesStart(edge, segments, first, stranded2, yToX) {
    if (stranded2) {
      return strandSides(edge).from === "start";
    }
    const gap = (p) => Math.hypot(p.x - first.x0, (p.y - first.y0) * yToX);
    return gap(segments[0]) < gap(segments.at(-1));
  }
  function intoDirection(last, toSegments) {
    if (toSegments.length < 2) {
      return void 0;
    }
    const first = toSegments[0];
    const final = toSegments[toSegments.length - 1];
    const atStart = Math.hypot(last.x1 - first.x, last.y1 - first.y) <= Math.hypot(last.x1 - final.x, last.y1 - final.y);
    return atStart ? { from: first, to: toSegments[1] } : { from: final, to: toSegments[toSegments.length - 2] };
  }
  function pointNormalsOf(rawPoints, yToX = 1) {
    const points = yToX === 1 ? rawPoints : rawPoints.map((p) => ({ x: p.x, y: p.y * yToX }));
    const pointNormals = [];
    for (let i = 0; i < points.length; i++) {
      let nx = 0;
      let ny = 0;
      if (i === 0) {
        const dx = points[1].x - points[0].x;
        const dy = points[1].y - points[0].y;
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          nx = -dy / len;
          ny = dx / len;
        }
      } else if (i === points.length - 1) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          nx = -dy / len;
          ny = dx / len;
        }
      } else {
        const dx1 = points[i].x - points[i - 1].x;
        const dy1 = points[i].y - points[i - 1].y;
        const len1 = Math.hypot(dx1, dy1);
        const dx2 = points[i + 1].x - points[i].x;
        const dy2 = points[i + 1].y - points[i].y;
        const len2 = Math.hypot(dx2, dy2);
        if (len1 > 0 && len2 > 0) {
          const nx1 = -dy1 / len1;
          const ny1 = dx1 / len1;
          const nx2 = -dy2 / len2;
          const ny2 = dx2 / len2;
          nx = (nx1 + nx2) / 2;
          ny = (ny1 + ny2) / 2;
          const dot = nx1 * nx + ny1 * ny;
          if (dot > 0.1) {
            nx /= dot;
            ny /= dot;
          }
        } else if (len1 > 0) {
          nx = -dy1 / len1;
          ny = dx1 / len1;
        } else if (len2 > 0) {
          nx = -dy2 / len2;
          ny = dx2 / len2;
        }
      }
      pointNormals.push({ nx, ny });
    }
    return pointNormals;
  }
  function offsetPolyline(points, normals, distance, yToX = 1) {
    return points.map((p, i) => ({
      x: p.x + normals[i].nx * distance,
      y: p.y + normals[i].ny * distance / yToX
    }));
  }
  function packNorm(r, g, b, a) {
    return packAbgr(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
      Math.round(a * 255)
    );
  }
  function hslToRgb(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }
    return [r + m, g + m, b + m];
  }
  var DEPTH_GRADIENT = [
    [68, 1, 84],
    [59, 82, 139],
    [33, 145, 140],
    [94, 201, 98],
    [253, 231, 37]
  ];
  var STABLE_RANK_GRADIENT = [
    [237, 137, 44],
    [158, 42, 122]
  ];
  var NODE_LENGTH_GRADIENT = [
    [220, 50, 50],
    [50, 120, 220]
  ];
  function sampleGradient(stops, t) {
    const pos = Math.max(0, Math.min(1, t)) * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(pos));
    const f = pos - i;
    const a = stops[i];
    const b = stops[i + 1];
    return packAbgr(
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f),
      255
    );
  }
  function hashColor(str, alpha) {
    const [r, g, b] = hslToRgb(nameHue(str), PATH_SATURATION, PATH_LIGHTNESS);
    return packNorm(r, g, b, alpha);
  }
  var REFERENCE_RAMP_MAX_HUE = 300;
  var REFERENCE_RAMP_SATURATION = 0.7;
  var REFERENCE_RAMP_LIGHTNESS = 0.5;
  var REFERENCE_RAMP_ALT_RGB = [60, 65, 72];
  var REFERENCE_RAMP_ALT_COLOR = packAbgr(...REFERENCE_RAMP_ALT_RGB, 255);
  var REFERENCE_RAMP_ALT_CSS = `rgb(${REFERENCE_RAMP_ALT_RGB.join(", ")})`;
  function computeReferenceRamp(graph, domain) {
    const midpoints = referenceMidpoints(graph);
    if (domain && domain.end > domain.start) {
      return {
        start: domain.start,
        span: domain.end - domain.start,
        midpoints
      };
    }
    let min = Infinity;
    let max = -Infinity;
    for (const mid of midpoints.values()) {
      min = Math.min(min, mid);
      max = Math.max(max, mid);
    }
    return {
      start: min === Infinity ? 0 : min,
      span: max > min ? max - min : 1,
      midpoints
    };
  }
  function computeColorSchemeRange(graph) {
    let minDepth = Infinity;
    let maxDepth = -Infinity;
    let minLength = Infinity;
    let maxLength = -Infinity;
    let maxRank = 0;
    for (const n of graph.nodes) {
      if (n.stable !== void 0 && n.stable.rank > maxRank) {
        maxRank = n.stable.rank;
      }
      if (n.depth < minDepth) {
        minDepth = n.depth;
      }
      if (n.depth > maxDepth) {
        maxDepth = n.depth;
      }
      if (n.length < minLength) {
        minLength = n.length;
      }
      if (n.length > maxLength) {
        maxLength = n.length;
      }
    }
    return {
      minDepth,
      maxDepth,
      minLength,
      maxLength,
      maxRank,
      nodeCount: graph.nodes.length
    };
  }
  function getNodeColor(node, nodeIndex, colorScheme, range) {
    switch (colorScheme) {
      case "random":
        return hashColor(node.id, 1);
      case "depth":
        return sampleGradient(
          DEPTH_GRADIENT,
          range.maxDepth > range.minDepth ? (node.depth - range.minDepth) / (range.maxDepth - range.minDepth) : 0.5
        );
      case "node-length":
        return sampleGradient(
          NODE_LENGTH_GRADIENT,
          range.maxLength > range.minLength ? (node.length - range.minLength) / (range.maxLength - range.minLength) : 0.5
        );
      // rGFA states the backbone rather than leaving it to be inferred: rank 0 is
      // the reference, higher ranks are the sequence that diverges from it. A
      // graph with no SR tags draws every node as unranked.
      case "stable-rank":
        return node.stable === void 0 ? packAbgr(160, 160, 160, 255) : node.stable.rank === 0 ? packAbgr(52, 152, 219, 255) : sampleGradient(
          STABLE_RANK_GRADIENT,
          range.maxRank > 1 ? (node.stable.rank - 1) / (range.maxRank - 1) : 0
        );
      // Position on the reference, the one quantity both panels of a
      // graph-over-linear figure can state. A node with no reference position at
      // all — nothing anchored, or an allele whose flanks fell outside the cut —
      // is grey rather than a hue it has not earned.
      case "reference-position": {
        const ramp = range.referenceRamp;
        const mid = ramp?.midpoints.get(node.id);
        if (ramp === void 0 || mid === void 0) {
          return packAbgr(160, 160, 160, 255);
        }
        if (node.stable !== void 0 && node.stable.rank > 0) {
          return REFERENCE_RAMP_ALT_COLOR;
        }
        const frac = Math.max(0, Math.min(1, (mid - ramp.start) / ramp.span));
        const [r, g, b] = hslToRgb(
          frac * REFERENCE_RAMP_MAX_HUE,
          REFERENCE_RAMP_SATURATION,
          REFERENCE_RAMP_LIGHTNESS
        );
        return packNorm(r, g, b, 1);
      }
      case "grey":
        return packAbgr(160, 160, 160, 255);
      case "rainbow": {
        const hue = range.nodeCount > 1 ? nodeIndex / range.nodeCount * 360 : 0;
        const [r, g, b] = hslToRgb(hue, 0.75, 0.5);
        return packNorm(r, g, b, 1);
      }
      default:
        return packAbgr(52, 152, 219, 255);
    }
  }
  function endTangent(c, yToX = 1, into) {
    const candidates = [
      [c.cx1, c.cy1],
      [c.cx0, c.cy0],
      [c.x0, c.y0]
    ];
    for (const [x, y] of candidates) {
      const dx = c.x1 - x;
      const dy = (c.y1 - y) * yToX;
      if (Math.hypot(dx, dy) > 0) {
        return Math.atan2(dy, dx);
      }
    }
    return into ? Math.atan2((into.to.y - into.from.y) * yToX, into.to.x - into.from.x) : 0;
  }
  function isPolylineInBounds(segments, bounds) {
    let hit = false;
    for (let i = 0; i < segments.length - 1 && !hit; i++) {
      const a = segments[i];
      const b = segments[i + 1];
      hit = Math.max(a.x, b.x) >= bounds.minX && Math.min(a.x, b.x) <= bounds.maxX && Math.max(a.y, b.y) >= bounds.minY && Math.min(a.y, b.y) <= bounds.maxY;
    }
    return hit;
  }
  function isBezierInBounds(curves, bounds) {
    for (const c of curves) {
      const cMinX = Math.min(c.x0, c.cx0, c.cx1, c.x1);
      const cMaxX = Math.max(c.x0, c.cx0, c.cx1, c.x1);
      const cMinY = Math.min(c.y0, c.cy0, c.cy1, c.y1);
      const cMaxY = Math.max(c.y0, c.cy0, c.cy1, c.y1);
      if (cMaxX >= bounds.minX && cMinX <= bounds.maxX && cMaxY >= bounds.minY && cMinY <= bounds.maxY) {
        return true;
      }
    }
    return false;
  }
  var paletteCache = /* @__PURE__ */ new WeakMap();
  function pathPaletteOf(graph) {
    let palette = paletteCache.get(graph);
    if (!palette) {
      const pathColorByIndex = [];
      const pathIndexByName = /* @__PURE__ */ new Map();
      const paths = graph.paths ?? [];
      for (let i = 0; i < paths.length; i++) {
        const [r, g, b] = hslToRgb(
          pathHueAt(i, paths.length),
          PATH_SATURATION,
          PATH_LIGHTNESS
        );
        pathColorByIndex.push(packNorm(r, g, b, 0.85));
        if (!pathIndexByName.has(paths[i].name)) {
          pathIndexByName.set(paths[i].name, i);
        }
      }
      palette = { pathColorByIndex, pathIndexByName };
      paletteCache.set(graph, palette);
    }
    return palette;
  }
  var slotsCache = /* @__PURE__ */ new WeakMap();
  var NO_SLOTS = /* @__PURE__ */ new Map();
  function pathSlotsOf(graph) {
    let slots = slotsCache.get(graph);
    if (!slots) {
      slots = /* @__PURE__ */ new Map();
      for (const [pathIdx, path] of (graph.paths ?? []).entries()) {
        for (const nodeId of new Set(path.nodeIds)) {
          const visits = slots.get(nodeId);
          if (visits) {
            visits.push(pathIdx);
          } else {
            slots.set(nodeId, [pathIdx]);
          }
        }
      }
      slotsCache.set(graph, slots);
    }
    return slots;
  }
  function buildGeometry(options) {
    const {
      nodePositions,
      graph,
      nodeById,
      colorScheme,
      contigThickness,
      connectorThickness,
      drawPaths,
      nodeWidth: nodeWidth2 = "uniform",
      highlight,
      axis,
      linearLayout,
      viewportBounds,
      referenceRamp,
      deletions,
      deletionRoutes,
      stranded: stranded2,
      hiddenEdges,
      version: version2 = 0
    } = options;
    const depthNorm = nodeWidth2 === "depth" ? meanDepth(graph) : 0;
    const scale = axis.scaleX;
    const yToX = yToXOf(axis);
    const sharedCurves = baseEdgeCurves(
      nodePositions,
      graph,
      axis,
      deletions,
      version2,
      deletionRoutes,
      stranded2
    );
    const nodeStrokes = [];
    const nodeStrokeRuns = /* @__PURE__ */ new Map();
    const arrows = [];
    const arrowRuns = /* @__PURE__ */ new Map();
    const edgeCurves = [];
    const edgeCurveRuns = /* @__PURE__ */ new Map();
    const colorRange = { ...computeColorSchemeRange(graph), referenceRamp };
    const nodeIndexMap = /* @__PURE__ */ new Map();
    if (colorScheme === "rainbow") {
      for (let i = 0; i < graph.nodes.length; i++) {
        nodeIndexMap.set(graph.nodes[i].id, i);
      }
    }
    const pathCount = graph.paths?.length ?? 0;
    const { pathColorByIndex, pathIndexByName } = pathPaletteOf(graph);
    const pathColorByName = (name) => pathColorByIndex[pathIndexByName.get(name) ?? -1] ?? EDGE_PATH_FALLBACK_COLOR;
    const nodePathSlots = drawPaths && pathCount > 1 ? pathSlotsOf(graph) : NO_SLOTS;
    const showArrows = scale > (linearLayout ? 1 : MIN_ARROW_SCALE);
    for (let ei = 0; ei < graph.edges.length; ei++) {
      const edge = graph.edges[ei];
      const fromSegments = nodePositions[edge.from];
      const toSegments = nodePositions[edge.to];
      const baseCurves = sharedCurves.get(ei);
      if (!fromSegments?.length || !toSegments?.length || !baseCurves || hiddenEdges?.has(ei)) {
        continue;
      }
      const numPaths = edge.pathIds?.length ?? 0;
      const bypassed = deletions?.get(ei);
      const isDeletion = bypassed !== void 0;
      const onWalk = highlight?.edgeIndexes.has(ei) ?? false;
      const edgeThickness = connectorThickness / 2 * (isDeletion ? DELETION_THICKNESS_FACTOR : 1);
      const ribbons = drawPaths && numPaths > 0;
      const plainEdgeColor = isDeletion ? EDGE_DELETION_COLOR : EDGE_DEFAULT_COLOR;
      const edgeColor = !highlight || onWalk ? plainEdgeColor : fadeAbgr(plainEdgeColor, FADED_ALPHA);
      const toNode = nodeById.get(edge.to);
      const intoHalfWidth = (toNode ? nodeWidthPx(toNode, contigThickness, nodeWidth2, depthNorm) : contigThickness) / 2;
      const buildSingleEdge = (offsetX, offsetY, color, arrowColor) => {
        const curves = offsetX === 0 && offsetY === 0 ? baseCurves : translateCurves(baseCurves, offsetX, offsetY);
        if (viewportBounds && !isBezierInBounds(curves, viewportBounds)) {
          return;
        }
        if (isDeletion) {
          for (const dash of dashCurves(curves, DELETION_DASH_PX / scale)) {
            edgeCurves.push({ curves: dash, thickness: edgeThickness, color });
          }
        } else {
          edgeCurves.push({ curves, thickness: edgeThickness, color });
        }
        const head = showArrows && arrowColor !== void 0 ? arrowheadFor({
          curves,
          edgeHalfWidth: connectorThickness / 2,
          nodeHalfWidth: intoHalfWidth,
          scale,
          yToX,
          color: arrowColor,
          fromSegments,
          toSegments
        }) : void 0;
        if (head) {
          arrows.push(head);
        }
      };
      const edgeCurveStart = edgeCurves.length;
      const arrowStart = arrows.length;
      const laneWalks = highlight?.walks.length && onWalk && !ribbons ? highlight.walks : void 0;
      if (laneWalks) {
        const fromNode = nodeById.get(edge.from);
        const width = fromNode ? nodeWidthPx(fromNode, contigThickness, nodeWidth2, depthNorm) : contigThickness;
        const laneWidth = Math.max(width / laneWalks.length, MIN_WALK_LANE_PX);
        const normals = pointNormalsOf(fromSegments, yToX);
        const { nx, ny } = (leavesStart(
          edge,
          fromSegments,
          baseCurves[0],
          stranded2,
          yToX
        ) ? normals[0] : normals.at(-1)) ?? {
          nx: 0,
          ny: 0
        };
        const worldPerScreenPx = 1 / Math.max(scale, MIN_SCALE_FOR_OFFSET);
        laneWalks.forEach((walk, lane) => {
          if (!walk.edgeIndexes.has(ei)) {
            return;
          }
          const offset = (lane - (laneWalks.length - 1) / 2) * laneWidth * worldPerScreenPx;
          const curves = offset === 0 ? baseCurves : translateCurves(baseCurves, nx * offset, ny * offset / yToX);
          if (viewportBounds && !isBezierInBounds(curves, viewportBounds)) {
            return;
          }
          edgeCurves.push({
            curves,
            thickness: laneWidth / 2,
            color: walk.colors.get(edge.from) ?? walk.colors.get(edge.to) ?? plainEdgeColor
          });
        });
      } else if (!ribbons) {
        buildSingleEdge(0, 0, edgeColor, edgeColor);
      } else {
        const offsets = pathRibbonOffsets(
          fromSegments,
          toSegments,
          numPaths,
          axis
        );
        const arrowRibbon = Math.floor((numPaths - 1) / 2);
        for (let pathIdx = 0; pathIdx < numPaths; pathIdx++) {
          const offset = offsets[pathIdx];
          const ribbonColor = pathColorByName(edge.pathIds[pathIdx]);
          buildSingleEdge(
            offset.x,
            offset.y,
            highlight && (highlight.walks.length ? !highlight.names.has(edge.pathIds[pathIdx]) : !onWalk) ? fadeAbgr(ribbonColor, FADED_ALPHA) : ribbonColor,
            pathIdx === arrowRibbon ? edgeColor : void 0
          );
        }
      }
      const edgeCurveCount = edgeCurves.length - edgeCurveStart;
      if (edgeCurveCount > 0) {
        edgeCurveRuns.set(ei, { start: edgeCurveStart, count: edgeCurveCount });
      }
      const arrowCount = arrows.length - arrowStart;
      if (arrowCount > 0) {
        arrowRuns.set(ei, { start: arrowStart, count: arrowCount });
      }
    }
    for (const [nodeId, segments] of Object.entries(nodePositions)) {
      const node = nodeById.get(nodeId);
      if (!node) {
        continue;
      }
      if (viewportBounds && !isPolylineInBounds(segments, viewportBounds)) {
        continue;
      }
      const faded = highlight !== void 0 && !highlight.nodeIds.has(nodeId);
      const own = faded ? LIFT_BACKDROP_COLOR : getNodeColor(
        node,
        nodeIndexMap.get(nodeId) ?? 0,
        colorScheme,
        colorRange
      );
      const color = faded ? fadeAbgr(own, FADED_ALPHA) : own;
      const width = nodeWidthPx(node, contigThickness, nodeWidth2, depthNorm);
      const nodeThickness = width / 2;
      const start = nodeStrokes.length;
      const slots = nodePathSlots.get(nodeId);
      const slotWidth = width / pathCount;
      const drawable = segments.length >= 2;
      const lanes = highlight?.walks.length && !faded && !slots?.length ? highlight.walks : void 0;
      if (drawable && lanes) {
        const laneWidth = Math.max(width / lanes.length, MIN_WALK_LANE_PX);
        const normals = pointNormalsOf(segments, yToX);
        const worldPerScreenPx = 1 / Math.max(scale, MIN_SCALE_FOR_OFFSET);
        lanes.forEach((walk, lane) => {
          const laneColor = walk.colors.get(nodeId);
          if (laneColor === void 0) {
            return;
          }
          const offset = (lane - (lanes.length - 1) / 2) * laneWidth * worldPerScreenPx;
          nodeStrokes.push({
            points: lanes.length === 1 ? segments : offsetPolyline(segments, normals, offset, yToX),
            thickness: laneWidth / 2,
            color: laneColor
          });
        });
      } else if (drawable && slots?.length && slotWidth >= MIN_PATH_STRIPE_PX) {
        const normals = pointNormalsOf(segments, yToX);
        const worldPerScreenPx = 1 / Math.max(scale, MIN_SCALE_FOR_OFFSET);
        for (const slot of slots) {
          const offset = (slot - (pathCount - 1) / 2) * slotWidth * worldPerScreenPx;
          const stripe = pathColorByIndex[slot] ?? EDGE_PATH_FALLBACK_COLOR;
          nodeStrokes.push({
            points: offsetPolyline(segments, normals, offset, yToX),
            thickness: slotWidth / 2,
            // a node off the lifted walk fades whichever way it is painted
            color: faded ? fadeAbgr(stripe, FADED_ALPHA) : stripe
          });
        }
      } else if (drawable) {
        nodeStrokes.push({ points: segments, thickness: nodeThickness, color });
      }
      const count = nodeStrokes.length - start;
      if (count > 0) {
        nodeStrokeRuns.set(nodeId, { start, count });
      }
    }
    return {
      nodeStrokes,
      nodeStrokeRuns,
      arrows,
      arrowRuns,
      edgeCurves,
      edgeCurveRuns
    };
  }

  // ../bandage-core/src/renderer/geometryInputs.ts
  function layoutGeometryInputs(layout, drawing, o = {}) {
    return {
      nodePositions: o.drawsRows ? {} : layout.nodePositions,
      deletions: drawing.bypassed,
      deletionRoutes: layout.deletionRoutes,
      stranded: layout.stranded,
      hiddenEdges: drawing.hidden
    };
  }

  // ../bandage-core/src/version.ts
  var version = "9.9.2";

  // ../bandage-core/src/viewport.ts
  function axisScaleOf(scale, pixelRows) {
    return { scaleX: scale, scaleY: pixelRows ? 1 : scale, pixelRows };
  }

  // ../bandage-core/src/walkEncoding.ts
  var WALK_FIELDS = [
    { value: "progress", label: "Progress along the walk" },
    { value: "walk", label: "One colour for the walk" },
    { value: "reference", label: "Reference position" }
  ];
  var WALK_SCHEMES = [
    { value: "grey", label: "Grey to black", ends: ["#a3a3a3", "#151515"] },
    { value: "blue", label: "Cyan to navy", ends: ["#6ee0f0", "#0b2c7a"] },
    { value: "red", label: "Yellow to red", ends: ["#ffd24a", "#b3121b"] },
    { value: "purple", label: "Pink to plum", ends: ["#f5a3d8", "#5e1a6e"] },
    { value: "green", label: "Lime to forest", ends: ["#b6e36c", "#0b5d3b"] },
    { value: "rainbow", label: "Rainbow" }
  ];
  var FAMILIES = ["blue", "red", "purple", "green"];
  var isField = (v) => WALK_FIELDS.some((f) => f.value === v);
  var isScheme = (v) => WALK_SCHEMES.some((s) => s.value === v);
  function resolveEncoding(layer, reference, picked, alone = true) {
    const { field: askedField, scheme: askedScheme } = layer.color ?? {};
    const field = isField(askedField) ? askedField : alone ? "progress" : "walk";
    const family = reference ? "grey" : FAMILIES[picked % FAMILIES.length];
    const scheme = isScheme(askedScheme) ? askedScheme === "rainbow" && field !== "reference" ? family : askedScheme : family;
    return { field, scheme };
  }
  var BASE_T = 0.5;
  var toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  var toGamma = (c) => c <= 31308e-7 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
  function oklab(hex2) {
    const [r, g, b] = [1, 3, 5].map(
      (i) => toLinear(Number.parseInt(hex2.slice(i, i + 2), 16) / 255)
    );
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
  }
  function oklabToRgb([L, a, b]) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    ].map((c) => toGamma(Math.max(0, Math.min(1, c))) * 255);
  }
  function schemeRgb(scheme, t) {
    const x = Math.max(0, Math.min(1, t));
    const family = WALK_SCHEMES.find((s) => s.value === scheme);
    if (!family || !("ends" in family)) {
      return hslToRgb(x * REFERENCE_RAMP_MAX_HUE, 0.7, 0.5).map((c) => c * 255);
    }
    const from = oklab(family.ends[0]);
    const to = oklab(family.ends[1]);
    return oklabToRgb(from.map((v, i) => v + (to[i] - v) * x));
  }
  function schemeColor(scheme, t) {
    const [r, g, b] = schemeRgb(scheme, t).map(Math.round);
    return packAbgr(r, g, b, 255);
  }
  function encodedColor({ field, scheme }, t) {
    return field === "walk" ? schemeColor(scheme, BASE_T) : t === void 0 ? NO_VALUE_COLOR : schemeColor(scheme, t);
  }
  var NO_VALUE_COLOR = REFERENCE_RAMP_ALT_COLOR;

  // ../bandage-core/src/walkHighlight.ts
  var isReference = (graph, name) => !!graph.referencePath && pathOrigin(name).name === graph.referencePath;
  function piecesOf(graph, name) {
    return (graph.paths ?? []).filter((p) => p.name === name).sort((a, b) => (a.start ?? 0) - (b.start ?? 0));
  }
  function walkHighlight(graph, name) {
    const pieces = piecesOf(graph, name);
    const first = pieces[0];
    if (!first) {
      return void 0;
    }
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const edgeAt = /* @__PURE__ */ new Map();
    graph.edges.forEach((e, i) => {
      edgeAt.set(`${e.from}>${e.to}`, i);
    });
    const lengthOf = (id) => byId.get(id)?.length ?? 0;
    const bpOf = (path) => path.nodeIds.reduce((sum, id) => sum + lengthOf(id), 0);
    const bp = pieces.reduce((sum, piece) => sum + bpOf(piece), 0);
    const range = first.start === void 0 ? void 0 : {
      contig: first.contig ?? panSNContig(pathOrigin(name).name),
      start: first.start,
      end: Math.max(...pieces.map((p) => (p.start ?? 0) + bpOf(p)))
    };
    const span = range ? range.end - range.start : bp;
    const nodeIds = /* @__PURE__ */ new Set();
    const edgeIndexes = /* @__PURE__ */ new Set();
    const progress = /* @__PURE__ */ new Map();
    let before = 0;
    for (const piece of pieces) {
      if (range) {
        before = Math.max(before, (piece.start ?? 0) - range.start);
      }
      piece.nodeIds.forEach((id, i) => {
        nodeIds.add(id);
        if (i > 0) {
          const a = piece.nodeIds[i - 1];
          const index = edgeAt.get(`${a}>${id}`) ?? edgeAt.get(`${id}>${a}`);
          if (index !== void 0) {
            edgeIndexes.add(index);
          }
        }
        const length = lengthOf(id);
        if (!progress.has(id)) {
          progress.set(id, span > 0 ? (before + length / 2) / span : 0);
        }
        before += length;
      });
    }
    const reference = isReference(graph, name);
    const referencePieces = reference ? [] : (graph.paths ?? []).filter((p) => isReference(graph, p.name));
    return {
      name,
      reference,
      range,
      nodeIds,
      edgeIndexes,
      progress,
      steps: pieces.reduce((sum, piece) => sum + piece.nodeIds.length, 0),
      bp,
      referenceBp: referencePieces.length > 0 ? referencePieces.reduce((sum, piece) => sum + bpOf(piece), 0) : void 0
    };
  }
  function laneColors(graph, walk, encoding, ramp) {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    const colors = /* @__PURE__ */ new Map();
    for (const [id, progress] of walk.progress) {
      const node = byId.get(id);
      const mid = ramp?.midpoints.get(id);
      const t = encoding.field === "progress" ? progress : ramp && mid !== void 0 && !(node?.stable && node.stable.rank > 0) ? (mid - ramp.start) / ramp.span : void 0;
      colors.set(id, encodedColor(encoding, t));
    }
    return colors;
  }
  function reversedNodes(graph, walk) {
    const reversed = /* @__PURE__ */ new Set();
    let bp = 0;
    const referencePath = graph.referencePath;
    if (!referencePath || walk.reference) {
      return { reversed, bp };
    }
    const walkPath = pathOrigin(walk.name).name;
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    for (const id of walk.progress.keys()) {
      const node = byId.get(id);
      const visits = node ? graph.pathVisits?.get(node.name) : void 0;
      const own = visits?.find((v) => v.path === walkPath)?.strand;
      const theirs = visits?.find((v) => v.path === referencePath)?.strand;
      if (own && theirs && own !== theirs) {
        reversed.add(id);
        bp += node.length;
      }
    }
    return { reversed, bp };
  }
  function walkLift(graph, layers, ramp) {
    const seen = /* @__PURE__ */ new Set();
    const lifted = layers.filter((layer) => !seen.has(layer.walk) && seen.add(layer.walk)).flatMap((layer) => {
      const walk = walkHighlight(graph, layer.walk);
      return walk ? [{ walk, layer }] : [];
    }).sort((a, b) => Number(b.walk.reference) - Number(a.walk.reference));
    if (lifted.length === 0) {
      return void 0;
    }
    let picked = 0;
    const walks = lifted.map(({ walk, layer }) => {
      const encoding = resolveEncoding(
        layer,
        walk.reference,
        walk.reference ? 0 : picked++,
        lifted.length === 1
      );
      const { reversed, bp } = reversedNodes(graph, walk);
      return {
        ...walk,
        encoding,
        colors: laneColors(graph, walk, encoding, ramp),
        reversed,
        reversedBp: bp
      };
    });
    return liftOf(walks, ramp);
  }
  var FACET_COLOR = { field: "progress", scheme: "red" };
  function facetLifts(graph, lift, layers, ramp) {
    return lift.walks.map((walk) => {
      const stated = layers.find((l) => l.walk === walk.name)?.color;
      const encoding = resolveEncoding(
        { walk: walk.name, color: { ...FACET_COLOR, ...stated } },
        walk.reference,
        0
      );
      return liftOf(
        [
          {
            ...walk,
            encoding,
            colors: laneColors(graph, walk, encoding, ramp)
          }
        ],
        ramp
      );
    });
  }
  function liftOf(walks, ramp) {
    return {
      walks,
      referenceDomain: ramp ? { start: ramp.start, end: ramp.start + ramp.span } : void 0,
      nodeIds: new Set(walks.flatMap((w) => [...w.nodeIds])),
      edgeIndexes: new Set(walks.flatMap((w) => [...w.edgeIndexes])),
      names: new Set(walks.map((w) => w.name))
    };
  }

  // ../bandage-core/src/walkKey.ts
  function rangeText(contig, start, end) {
    const s = Math.round(start);
    const e = Math.round(end);
    return `${contig ? `${contig}:` : ""}${groupDigits(s)}-${groupDigits(e)} (${formatBp(e - s)})`;
  }
  function walkKey(walk, reference) {
    const { field } = walk.encoding;
    const own = walk.range ? rangeText(walk.range.contig, walk.range.start, walk.range.end) : void 0;
    const scale = field === "progress" ? own : field === "reference" && reference ? rangeText(reference.name, reference.start, reference.end) : void 0;
    const spanned = walk.range ? walk.range.end - walk.range.start : walk.bp;
    const outside = spanned - walk.bp;
    return {
      delta: walk.referenceBp === void 0 || spanned === walk.referenceBp ? "" : ` ${spanned > walk.referenceBp ? "+" : "\u2212"}${formatBp(Math.abs(spanned - walk.referenceBp))}`,
      outside: outside > 0 ? `, ${formatBp(outside)} outside the cut` : "",
      reversed: walk.reversedBp > 0 ? `, ${formatBp(walk.reversedBp)} reversed` : "",
      shades: field !== "walk",
      scale,
      hover: scale === own ? void 0 : own
    };
  }

  // ../bandage-core/src/figureData.ts
  function columns(keys) {
    const out = Object.fromEntries(
      keys.map((k) => [k, []])
    );
    return {
      out,
      push(row) {
        for (const k of keys) {
          out[k].push(row[k]);
        }
      }
    };
  }
  var hex = (v) => v.toString(16).padStart(2, "0");
  var cssHex = (c) => `#${hex(abgrRed(c))}${hex(abgrGreen(c))}${hex(abgrBlue(c))}`;
  var alphaOf = (c) => abgrAlpha(c) / 255;
  function figureData(graph, layout, o = {}) {
    if (layout.tubeMap) {
      throw new Error("figure data has no tables for a tube map yet");
    }
    const width = o.width ?? 1200;
    const height = o.height ?? 800;
    const region = o.region;
    const pixelRows = layout.pixelRows ?? false;
    const bounds = drawingBounds(layout, {
      region: o.fitToDrawing ? void 0 : region
    });
    const fit = fitTransform(bounds, width, height, pixelRows);
    if (!fit) {
      throw new Error("the layout drew nothing to fit");
    }
    const axis = axisScaleOf(fit.scale, pixelRows);
    const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
    const colorScheme = resolveColorScheme(o.colorScheme ?? "auto", graph);
    const rampDomain = o.colorDomain ?? region;
    const referenceRamp = colorScheme === "reference-position" ? computeReferenceRamp(graph, rampDomain) : void 0;
    const drawnDeletions = deletionDrawing(
      graph,
      deletionEdges(graph),
      o.showDeletionEdges
    );
    const layers = o.walks ?? [];
    const walkRamp = layers.some((l) => l.color?.field === "reference") ? referenceRamp ?? computeReferenceRamp(graph, rampDomain) : void 0;
    const lift = layers.length > 0 ? walkLift(graph, layers, walkRamp) : void 0;
    const facet = facetSettingOf(o.facet);
    const facetted = facet.field && lift && lift.walks.length > 1 ? facetLifts(graph, lift, layers, walkRamp) : void 0;
    const labels = walkLabelsOf(
      graph.paths?.length ? pathLegend(graph.paths) : []
    );
    const labelOf2 = (name) => labels.get(name) ?? name;
    const referenceName = o.referenceName ?? referenceLabel(graph, region);
    const reference = lift?.referenceDomain && {
      ...lift.referenceDomain,
      name: referenceName
    };
    const panels = [];
    if (facetted) {
      const place2 = facetCells(
        facetted.map((p) => p.walks[0].name),
        facet.field || "walk",
        facet.domain
      );
      const ordered = facetted.map((panel, i) => ({ panel, cell: place2.cells[i] })).sort((a, b) => a.cell - b.cell);
      for (const { panel } of ordered) {
        const walk = panel.walks[0];
        const key = walkKey(walk, reference);
        panels.push({
          highlight: panel,
          name: labelOf2(walk.name),
          key: key.delta + key.outside + key.reversed,
          range: key.scale ?? ""
        });
      }
    } else {
      panels.push({ highlight: lift, name: "", key: "", range: "" });
    }
    const nodes = columns([
      "panel",
      "node",
      "stroke",
      "x",
      "y",
      "color",
      "alpha",
      "width"
    ]);
    const edges = columns([
      "panel",
      "edge",
      "curve",
      "x0",
      "y0",
      "cx0",
      "cy0",
      "cx1",
      "cy1",
      "x1",
      "y1",
      "color",
      "alpha",
      "width",
      "deletion"
    ]);
    const arrows = columns([
      "panel",
      "edge",
      "x",
      "y",
      "angle",
      "length",
      "halfWidth",
      "color",
      "alpha"
    ]);
    for (const { highlight, name: panel } of panels) {
      const batch = buildGeometry({
        ...layoutGeometryInputs(layout, drawnDeletions),
        graph,
        nodeById,
        colorScheme,
        contigThickness: o.contigThickness ?? 6,
        connectorThickness: o.connectorThickness ?? 2,
        drawPaths: false,
        nodeWidth: o.nodeWidth ?? "depth",
        linearLayout: o.linearLayout,
        highlight,
        axis,
        referenceRamp
      });
      for (const [node, run] of batch.nodeStrokeRuns) {
        for (let i = run.start; i < run.start + run.count; i++) {
          const s = batch.nodeStrokes[i];
          for (const p of s.points) {
            nodes.push({
              panel,
              node,
              stroke: i,
              x: p.x,
              y: p.y,
              color: cssHex(s.color),
              alpha: alphaOf(s.color),
              width: s.thickness * 2
            });
          }
        }
      }
      for (const [edge, run] of batch.edgeCurveRuns) {
        for (let i = run.start; i < run.start + run.count; i++) {
          const b = batch.edgeCurves[i];
          for (const c of b.curves) {
            edges.push({
              panel,
              edge,
              curve: i,
              ...c,
              color: cssHex(b.color),
              alpha: alphaOf(b.color),
              width: b.thickness * 2,
              deletion: drawnDeletions.bypassed.has(edge)
            });
          }
        }
      }
      for (const [edge, run] of batch.arrowRuns) {
        for (let i = run.start; i < run.start + run.count; i++) {
          const a = batch.arrows[i];
          arrows.push({
            panel,
            edge,
            x: a.x,
            y: a.y,
            angle: a.angle,
            length: a.length,
            halfWidth: a.halfWidth,
            color: cssHex(a.color),
            alpha: alphaOf(a.color)
          });
        }
      }
    }
    return {
      meta: {
        generator: `@jbrowse/bandage-core@${version}`,
        width,
        scaleX: axis.scaleX,
        scaleY: axis.scaleY,
        pixelRows,
        referenceAxis: layout.referenceAxis ?? false,
        colorScheme,
        referenceName: referenceName ?? null
      },
      panels: {
        panel: panels.map((p) => p.name),
        key: panels.map((p) => p.key),
        range: panels.map((p) => p.range)
      },
      nodes: nodes.out,
      edges: edges.out,
      arrows: arrows.out,
      nodeInfo: {
        node: graph.nodes.map((n) => n.id),
        name: graph.nodes.map((n) => n.name),
        length: graph.nodes.map((n) => n.length),
        depth: graph.nodes.map((n) => n.depth),
        backbone: graph.nodes.map((n) => isBackbone(n))
      },
      rowLabels: {
        label: (layout.rowLabels ?? []).map((r) => r.label),
        y: (layout.rowLabels ?? []).map((r) => r.y)
      }
    };
  }
  async function gfaFigureData(text, name, spec = {}) {
    const region = spec.region ? parseRegion(spec.region) : void 0;
    const graph = loadGraph(text, name, { referencePath: spec.referencePath });
    const layout = layoutModeByValue(spec.layout ?? "force").run(graph, region) ?? (await forceLayout(graph, engineSettingsOf(spec), layoutEngine)).result;
    return figureData(graph, layout, {
      ...spec,
      region,
      walks: spec.walks?.map((w) => typeof w === "string" ? { walk: w } : w)
    });
  }
  return __toCommonJS(stdin_exports);
})();
