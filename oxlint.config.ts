export { oxlintConfig as default }

const oxlintConfig: OxlintConfig = {
  options: {
    typeAware: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    pedantic: 'warn',
    perf: 'warn',
    style: 'warn',
    // restriction: 'warn',
    // nursery: 'warn',
  },
  plugins: [
    'eslint',
    'import',
    // 'jest',
    // 'jsdoc',
    // 'jsx-a11y',
    // 'nextjs',
    'node',
    'oxc',
    'promise',
    // 'react-perf',
    // 'react',
    'typescript',
    'unicorn',
    // 'vitest',
    // 'vue',
  ],
  rules: {
    'capitalized-comments': 'off',
    eqeqeq: 'off',
    'func-style': 'off',
    'id-length': ['warn', { checkGeneric: false }],
    'max-lines-per-function': 'off',
    'max-lines': 'off',
    'max-statements': 'off',
    'sort-keys': 'off',
    'no-duplicate-imports': 'off',
    'no-magic-numbers': ['warn', { ignore: [0] }],
    'no-ternary': 'off',
    'no-use-before-define': 'off',
    'no-eq-null': 'off',
    'no-void': 'off',
    'one-var': 'off',

    'import/exports-last': 'off',
    'import/first': 'off',
    'import/group-exports': 'off',
    'import/no-duplicates': 'off',
    'import/no-named-export': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    'typescript/prefer-readonly-parameter-types': 'off',

    'unicorn/no-null': 'off',
    'unicorn/max-nested-calls': 'off',

    'oxc/no-rest-spread-properties': 'off',
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        'import/no-nodejs-modules': 'off',
        'node/no-process-env': 'off',
      },
    },

    {
      files: ['*.spec*.*'],
      plugins: ['vitest'],
      rules: {
        // 'no-magic-numbers': 'off',
        'import/no-nodejs-modules': 'off',
        'typescript/explicit-function-return-type': 'off',
        'vitest/valid-title': 'off',
        'vitest/no-importing-vitest-globals': 'off',
        'vitest/consistent-test-filename': [
          'warn',
          {
            pattern: '.*.spec(-d)?.ts(x)?$',
          },
        ],
        'vitest/prefer-expect-assertions': [
          'warn',
          {
            onlyFunctionsWithAsyncKeyword: true,
            onlyFunctionsWithExpectInCallback: true,
            onlyFunctionsWithExpectInLoop: true,
          },
        ],
        'vitest/require-test-timeout': 'off',
      },
    },

    {
      files: ['*.error.spec-d.*'],
      rules: {
        'typescript/ban-ts-comment': 'off',
      },
    },
  ],
}

import type { OxlintConfig } from 'oxlint'
//
