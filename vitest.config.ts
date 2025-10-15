import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'playground/',
        '.nuxt/',
        '**/*.config.{ts,js}',
        '**/*.d.ts',
        '**/index.ts', // Fichiers d'export
        'src/module.ts', // Module principal
      ],
      include: [
        'src/runtime/components/**/*.vue',
        'src/runtime/composables/**/*.ts',
        'src/runtime/utils/**/*.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/runtime', import.meta.url)),
      '~': fileURLToPath(new URL('./src/runtime', import.meta.url)),
    },
  },
})

