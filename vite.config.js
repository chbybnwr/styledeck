/// <reference types="vitest/config" />

/** @type {import("vite").UserConfig} */
export default {
  build: {
    lib: {
      entry: {
        index: path.resolve(import.meta.dirname, 'src/index.ts'),
      },
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        minify: true,
      },
      external: [
        '@stylexjs/stylex',
        'csstype',
        //
      ],
    },
  },

  test: {
    passWithNoTests: true,
    coverage: {
      exclude: ['src/test/**/*'],
    },
    projects: [
      {
        resolve: {
          alias: {
            '#': fileURLToPath(new URL('src', import.meta.url)),
          },
        },
        test: {
          name: 'unit',
          include: [
            '**/*.spec.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
            '**/*.error.spec-d.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
          ],
          environment: 'jsdom',
          typecheck: {
            enabled: true,
            tsconfig: './tsconfig.test.json',
          },
        },
      },
    ],
  },
}

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { URL } from 'node:url'
//
