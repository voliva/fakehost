import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['esm', 'cjs'],
    dts: true,
    entry: ['src/index.ts', 'src/createInBrowser.ts', 'src/createServer.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
})
