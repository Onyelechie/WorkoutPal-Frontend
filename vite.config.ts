import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',       // Coverage provider
      reporter: ['text'], // Formats of coverage report
      all: true,             // Include files even if not tested
      include: ['src/**/*.{ts,tsx}'],  // Which files to include
      exclude: ['**/*.test.{ts,tsx}'] // Exclude test files themselves
    }
  },
})
