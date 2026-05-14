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
    name: 'unit',
    passWithNoTests: true,
    coverage: {
      exclude: ['src/test/**/*'],
    },
    include: [
      '**/*.spec.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
      '**/*.error.spec-d.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
    ],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.test.json',
    },
  },
}

import path from 'node:path'
//
