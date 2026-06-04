export { tsdownConfig as default }

/** @type {import('tsdown').UserConfig} */
const tsdownConfig = {
  entry: {
    index: path.resolve(import.meta.dirname, 'src/index.ts'),
  },

  deps: {
    onlyBundle: [],
  },

  dts: {
    tsconfig: 'tsconfig.build.json',
  },

  format: 'esm',
  fixedExtension: false,
  minify: true,
}

import path from 'node:path'
//
