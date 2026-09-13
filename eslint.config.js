// oxlint-disable import/max-dependencies
/* eslint-disable unicorn/no-top-level-side-effects */

export { eslintConfig as default }

void 0

configDotenv({
  quiet: true,
})

const isQuickMode = process.env['ESLINT_QUICK_MODE'] === 'on'

const eslintConfig = defineConfig([
  globalIgnores([
    '**/coverage/**',
    '**/dist/**',
    '**/etc/**',
    '**/lib/**',
    '**/temp/**',
  ]),

  {
    name: 'builtin-globals',
    files: ['**/*.?(c|m)[jt]s?(x)'],
    languageOptions: {
      globals: globals.builtin,
    },
  },

  {
    name: 'browser-globals',
    files: ['src/**/*.?(c|m)[jt]s?(x)'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    name: 'node-globals',
    files: [
      '*.?(c|m)[jt]s?(x)',
      'src/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      //
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    name: 'js',
    files: ['**/*.?(c|m)[jt]s?(x)'],
    plugins: { js: jsPlugin },
    extends: [jsPlugin.configs.recommended],
  },

  {
    name: 'ts',
    files: ['**/*.?(c|m)[jt]s?(x)'],
    extends: [
      tslintConfigs.strict,
      tslintConfigs.stylistic,
      //
    ],
    rules: {
      // '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  isQuickMode
    ? {}
    : {
        name: 'ts-checked',
        files: ['**/*.?(c|m)[jt]s?(x)'],
        extends: [
          tslintConfigs.strictTypeCheckedOnly,
          tslintConfigs.stylisticTypeCheckedOnly,
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
    files: ['**/*.?(c|m)[jt]s?(x)'],
    extends: [importXPlugin.flatConfigs.recommended],
    rules: {
      'import-x/no-duplicates': 'off',
      ...(isQuickMode && {
        'import-x/default': 'off',
        'import-x/namespace': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-named-as-default': 'off',
      }),
    },
  },

  {
    name: 'import-x-typescript',
    files: ['**/*.?(c|m)[jt]s?(x)'],
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
    files: ['**/*.?(c|m)[jt]s?(x)'],
    extends: [
      // @ts-expect-error let me in please
      xPlugin.configs.recommended,
    ],
  },

  {
    name: 'unicorn',
    files: ['**/*.?(c|m)[jt]s?(x)'],
    extends: [unicornPlugin.configs.recommended],
    rules: {
      'unicorn/max-nested-calls': 'off',
      'unicorn/no-named-default': 'off',
      'unicorn/no-null': 'off',
      'unicorn/name-replacements': [
        'warn',
        {
          ignore: [
            /var(?<plural_suffix>s)?/iu,
            /arg(?<plural_suffix>s)?/iu,
            /attr(?<plural_suffix>s)?/iu,
            /prop(?<plural_suffix>s)?/iu,
            //
          ],
        },
      ],
    },
  },

  {
    name: 'vitest',
    files: ['**/*.{test,spec}*.?(c|m)[jt]s?(x)'],
    extends: [vitestPlugin.configs.recommended],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
    settings: {
      vitest: {
        typecheck: !isQuickMode,
      },
    },
    rules: {
      'vitest/consistent-test-filename': [
        'warn',
        {
          pattern: '.*.spec(-d)?.ts(x)?$',
        },
      ],
      ...(isQuickMode && {
        'vitest/expect-expect': 'off',
        'vitest/valid-title': 'off',
      }),
    },
  },

  {
    name: 'type-error-test',
    files: ['**/*.error.{test,spec}-d.?(c|m)[jt]s?(x)'],
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
    files: ['*.?(c|m)[jt]s?(x)', 'src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
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
    files: ['**/*.?(c|m)[jt]s?(x)'],
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
    language: 'json/json',
    files: ['**/*.json'],
    plugins: { json: jsonPlugin },
    extends: [jsonPlugin.configs.recommended],
  },

  {
    name: 'jsonc',
    language: 'json/jsonc',
    files: ['**/*.jsonc', '.vscode/*.json'],
    plugins: { json: jsonPlugin },
    extends: [jsonPlugin.configs.recommended],
  },

  {
    name: 'markdown',
    language: 'markdown/gfm',
    files: ['**/*.md'],
    plugins: {
      markdown: markdownPlugin,
    },
    extends: [markdownPlugin.configs.recommended],
  },

  prettierConfig,
])

import { configDotenv } from 'dotenv'
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
// oxlint-disable-next-line import/no-namespace
import * as tslintParser from '@typescript-eslint/parser'
import unicornPlugin from 'eslint-plugin-unicorn'
import vitestPlugin from '@vitest/eslint-plugin'
import xPlugin from '@txe/eslint-plugin-x'
//
