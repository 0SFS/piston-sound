# Piston sound

Reusable procedural piston-engine and propeller synthesis for engine mods, including the existing IO320 profile. Engine mods supply cylinder/stroke counts, shaft references, propeller blade count and acoustic controls. This package owns the common generator.

The `procedural-piston-v1` renderer is an independent, import-free WASM module implementing `osfs-engine-voice-v1` from `@0sfs/engine-sound`. The `sound` host supplies telemetry, mixes the source and airframe outputs, and owns spatialization and the final limiter.

The extracted C++ algorithm retains separate native crankshaft and propeller RPM inputs. Firing frequency follows the cylinder/stroke configuration; blade passage follows the propeller shaft. Combustion gates firing and exhaust, while rotating machinery and a windmilling propeller remain audible. Timbre and loudness are approximate. New numeric kernels use Rust/WebAssembly with a TypeScript reference.

## Use and build

Engine mods depend on the `0SFS/piston-sound` component and select `procedural-piston-v1` in their declarative acoustic profile. The package exports `./profile` for parameter validation/encoding and `./assets` for bundler-safe asset URLs. Its component manifest advertises the compatible telemetry schema and verified module hash.

Run `npm install`, then `npm run build:wasm` with Emscripten 6.0.9 installed. Shared headers resolve from the installed `@0sfs/engine-sound` dependency. An adjacent checkout is the local `file:` dependency default; the compiler does not require that layout. The build writes `public/audio/piston-sound/voice.wasm`, its source/toolchain receipt and the module hash in the manifest. `npm run verify:wasm` checks source, artifact and manifest consistency, exports and ABI.

From `fly`, `npm run verify:audio` checks host and family artifacts. Existing piston tests verify shaft-order frequencies, windmilling, stopped silence and load response against the shipped module.

## Community

- [Code of conduct](https://github.com/0SFS/.github/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/0SFS/.github/blob/main/CONTRIBUTING.md)
- [License](LICENSE)
- [Security](https://github.com/0SFS/.github/blob/main/SECURITY.md)
