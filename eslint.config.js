export default defineConfig([
  globalIgnores([
    '**/coverage/**',
    '**/dist/**',
    '**/etc/**',
    '**/lib/**',
    '**/temp/**',
  ]),

  {
    name: 'js',
    files: ['**/*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    plugins: { js: jsPlugin },
    extends: ['js/all'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'capitalized-comments': 'off',
      eqeqeq: 'off',
      'func-names': 'off',
      'func-style': 'off',
      'id-length': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-duplicate-imports': 'off',
      'no-eq-null': 'off',
      'no-magic-numbers': ['warn', { ignore: [0, 1] }],
      'no-param-reassign': ['error', { props: true }],
      'no-ternary': 'off',
      'no-use-before-define': 'off',
      'no-warning-comments': 'off',
      'one-var': 'off',
      'prefer-arrow-callback': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      'symbol-description': 'off',
    },
  },

  {
    name: 'typescript',
    files: ['**/*.{ts,tsx,mtsx}'],
    extends: [
      tslintConfigs.strictTypeChecked,
      tslintConfigs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    name: 'import-x',
    files: ['**/*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [importXPlugin.flatConfigs.recommended],
    rules: {
      'import-x/no-duplicates': 'off',
    },
  },

  {
    name: 'import-x-typescript',
    files: ['**/*.{ts,tsx,mtsx}'],
    extends: [importXPlugin.flatConfigs.typescript],
    languageOptions: {
      parser: tslintParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
    },
    rules: {
      'import-x/consistent-type-specifier-style': 'warn',
    },
  },

  {
    name: 'x',
    files: ['**/*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [
      // @ts-ignore
      xPlugin.configs.recommended,
    ],
  },

  {
    name: 'unicorn',
    files: ['**/*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [unicornPlugin.configs.all],
    languageOptions: {
      globals: globals.builtin,
    },
    rules: {
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-named-default': 'off',
    },
  },

  {
    name: 'vitest',
    files: ['**/*.{test,spec}*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [vitestPlugin.configs.all],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      'vitest/consistent-test-filename': [
        'warn',
        {
          pattern: '.*.spec(-d)?.ts(x)?$',
        },
      ],
      'vitest/no-hooks': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/prefer-importing-vitest-globals': 'off',
      'vitest/require-mock-type-parameters': 'off',
      // TODO: use vite-plugin-test-name instead
      'vitest/prefer-describe-function-title': 'off',
    },
  },

  {
    name: 'vitest-type',
    files: ['**/*.spec-d.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    rules: {
      'vitest/prefer-lowercase-title': 'off',
      'vitest/require-top-level-describe': 'off',
      'vitest/consistent-test-it': 'off',
      'vitest/valid-title': 'off',
    },
  },

  {
    name: 'type-error-test',
    files: ['**/*.error.{test,spec}-d.{ts,tsx,mtsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': false,
        },
      ],
      'vitest/expect-expect': 'off',
      'vitest/require-to-throw-message': 'off',
    },
  },

  {
    name: 'node',
    files: [
      './*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
      '**/*.{test,spec}*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}',
    ],
    extends: [nodePlugin.configs['flat/recommended']],
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': [
        'error',
        {
          version: '>=25.0.0',
        },
      ],
    },
  },

  {
    name: 'stylistic',
    files: ['**/*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [
      stylisticPlugin.configs.customize({
        arrowParens: true,
        braceStyle: '1tbs',
        severity: 'warn',
      }),
    ],
    rules: {
      '@stylistic/jsx-self-closing-comp': 'warn',
      '@stylistic/padding-line-between-statements': [
        'warn',
        { blankLine: 'never', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },

  {
    name: 'json',
    files: ['package.json'],
    plugins: { json: jsonPlugin },
    extends: ['json/recommended'],
    language: 'json/json',
  },

  {
    name: 'jsonc',
    files: ['**/*.json', '**/*.jsonc'],
    ignores: ['package*.json'],
    plugins: { json: jsonPlugin },
    extends: ['json/recommended'],
    language: 'json/jsonc',
  },

  {
    name: 'markdown',
    files: ['**/*.md'],
    plugins: {
      // @ts-ignore
      markdown: markdownPlugin,
    },
    extends: ['markdown/recommended'],
    language: 'markdown/gfm',
  },

  prettierConfig,
])

import { createNodeResolver } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { defineConfig } from 'eslint/config'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import { importX as importXPlugin } from 'eslint-plugin-import-x'
import jsonPlugin from '@eslint/json'
import jsPlugin from '@eslint/js'
import markdownPlugin from '@eslint/markdown'
import nodePlugin from 'eslint-plugin-n'
import prettierConfig from 'eslint-config-prettier/flat'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { configs as tslintConfigs } from 'typescript-eslint'
import * as tslintParser from '@typescript-eslint/parser'
import unicornPlugin from 'eslint-plugin-unicorn'
import vitestPlugin from '@vitest/eslint-plugin'
import xPlugin from '@txe/eslint-plugin-x'
//
