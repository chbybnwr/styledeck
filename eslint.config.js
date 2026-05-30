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
    extends: [jsPlugin.configs.recommended],
    languageOptions: {
      globals: globals.browser,
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
      '@typescript-eslint/consistent-type-exports': 'warn',
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
    extends: [unicornPlugin.configs.recommended],
    languageOptions: {
      globals: globals.builtin,
    },
    rules: {
      'unicorn/no-named-default': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'warn',
        {
          allowList: {
            args: true,
          },
        },
      ],
    },
  },

  {
    name: 'vitest',
    files: ['**/*.{test,spec}*.{js,jsx,ts,tsx,mjs,mjsx,mtsx,cjs}'],
    extends: [vitestPlugin.configs.recommended],
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
