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
      '**/*.spec.?(c|m)[jt]s?(x)',
      '**/*.error.spec-d.?(c|m)[jt]s?(x)',
      '**/*.manual.spec-d.?(c|m)[jt]s?(x)',
      //
    ],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.test.json',
    },
  },
}

void 0

//
