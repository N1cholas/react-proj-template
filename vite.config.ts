/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import * as path from 'path'

const publicCSSVariablesPath = `@import "${path.resolve(
  __dirname,
  'src/styles/variables.less'
)}";`

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        additionalData: publicCSSVariablesPath,
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false
    })
  ]
})
