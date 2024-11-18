import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      formats: ["es", "cjs"],
      name: 'text-contrast',
      fileName: (format) => (format === 'es' ? "index.js" : "index.cjs"),
    },
  },
})
