/// <reference types="vitest/config" />

export { vitestConfig as default }

/** @type {import("vite").UserConfig} */
const vitestConfig = {
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

//
