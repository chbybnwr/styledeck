# StyleDeck &middot; [![npm version](https://img.shields.io/npm/v/styledeck.svg?style=flat-square)](https://www.npmjs.com/package/styledeck) [![build](https://img.shields.io/github/actions/workflow/status/chbybnwr/styledeck/publish.yml?label=build&style=flat-square)](https://github.com/chbybnwr/styledeck/actions/workflows/publish.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/chbybnwr/styledeck-unplugin/blob/prototype/LICENSE) <!-- omit in toc -->

Type-safe and zero-runtime UI styling, right in the markup.

StyleDeck lets you write strongly-typed CSS objects directly on your markup. At build time, it preprocesses them into StyleX API calls, which StyleX then extracts into zero-runtime atomic CSS, with no style block naming required.

<details>

<summary>Table of Contents</summary>

- [Quick Start](#quick-start)
- [Setup](#setup)
- [Ecosystem](#ecosystem)
- [Usage](#usage)
  - [Element styling](#element-styling)
  - [Component styling](#component-styling)
  - [Responsive styling](#responsive-styling)
  - [Pseudo-classes](#pseudo-classes)
  - [Pseudo-elements](#pseudo-elements)
  - [Variables](#variables)
  - [Cascade with StyleX styles](#cascade-with-stylex-styles)
  - [Conditional styling](#conditional-styling)
  - [Dynamic styling](#dynamic-styling)

</details>

## Quick Start

- [Next.js](https://github.com/chbybnwr/styledeck-nextjs-starter)
- [React](https://github.com/chbybnwr/styledeck-react-starter)
- [Solid](https://github.com/chbybnwr/styledeck-solid-starter)
- [Vue](https://github.com/chbybnwr/styledeck-vue-starter)

## Setup

Install the packages:

```bash
npm install styledeck @stylexjs/stylex
npm install --save-dev @styledeck/vite
```

Add the plugin to your bundler configuration right before the StyleX plugin.

```js
import { defineConfig } from 'vite'
import styledeck from '@styledeck/vite'

export default defineConfig({
  plugins: [
    styledeck(),
    // ...other plugins
  ],
})
```

Augment StyleDeck type definitions into your project.
Place augmentation below snippet in some declaration file that is included in typescript configuration.

```typescript
export {}

declare module 'styledeck' {
  interface CSSProperties extends CSS.Properties {
    [key: StyleXVar<unknown>]: NonNullable<unknown>
  }

  interface CSSFeatures {
    attributeSelector: CSS.HtmlAttributes
    pseudoClass: PseudoClass
    pseudoElement: PseudoElement
    atRule: CSS.AtRules
  }
}

type PseudoClass = Exclude<CSS.Pseudos, PseudoElement>

type PseudoElement =
  | Extract<CSS.Pseudos, `::${string}`>
  // one-colon pseudo-element
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

import type * as CSS from 'csstype'
import type { StyleXVar } from '@stylexjs/stylex'
```

## Ecosystem

- [Vite plugin](https://github.com/chbybnwr/styledeck-vite-plugin)
- [Babel preset](https://github.com/chbybnwr/styledeck-babel-preset)
- [ESLint plugin](https://github.com/chbybnwr/styledeck-eslint-plugin)
- Design tokens from [SolarWind CSS](https://github.com/chbybnwr/solarwindcss)
- Chrome Extension [StyleX DevTools](https://chromewebstore.google.com/detail/stylex-devtools/pfcoadoepdjlhhnchklcinajnmmninem)
- VS Code extension [Explicit Folding](https://marketplace.visualstudio.com/items?itemName=zokugun.explicit-folding)

  <details>
  <summary>Recommended settings</summary>

  ```json
  {
    "[javascriptreact][typescriptreact]": {
      "editor.defaultFoldingRangeProvider": "zokugun.explicit-folding",
      "explicitFolding.rules": [
        {
          "beginRegex": "^\\s*<[a-zA-Z][a-zA-Z0-9-]*",
          "endRegex": "(?<!=)>$",
          "autoFold": true,
          "foldLastLine": true
        }
      ]
    }
  }
  ```

  </details>

## Usage

### Element styling

Apply styles directly to HTML elements.

```tsx
function App() {
  return (
    <div
      styleDeck={{
        color: 'green',
        backgroundColor: 'black',
      }}
    >
      hello, world
    </div>
  )
}
```

### Component styling

```tsx
import type { StyleDeck } from 'styledeck'

function Feed() {
  return (
    <Post
      styleDeck={{
        color: 'blue',
      }}
    />
  )
}

function Post({ styleDeck }: { styleDeck?: StyleDeck }) {
  return (
    <div
      styleDeck={[
        {
          color: 'black',
        },
        styleDeck,
      ]}
    >
      Lorem ipsum
    </div>
  )
}
```

### Responsive styling

```tsx
function Hero() {
  return (
    <h1
      styleDeck={{
        fontSize: {
          default: '1.5rem',
          '@media (min-width: 768px)': '2.25rem',
        },
      }}
    >
      Welcome back
    </h1>
  )
}
```

### Pseudo-classes

```tsx
function BillingLink() {
  return (
    <a
      styleDeck={{
        color: {
          default: 'blue',
          ':visited': 'purple',
        },
      }}
      href="/billing/"
    >
      Open billing
    </a>
  )
}
```

### Pseudo-elements

```tsx
function SearchInput() {
  return (
    <input
      placeholder="Search"
      styleDeck={{
        color: 'black',
        '::placeholder': {
          color: 'gray',
        },
      }}
    />
  )
}
```

### Variables

Custom properties for app-level theming and inline overrides:

```css
/* main.css */
:root {
  --sidebar-width: 240px;
  --color-surface: lightblue;
}
```

```tsx
function Sidebar() {
  return (
    <nav
      styleDeck={{
        '--sidebar-width': '320px',
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--color-surface, blue)',
      }}
    >
      Navigation
    </nav>
  )
}
```

StyleX variables for shared design tokens:

```ts
// color.stylex.ts
import * as stylex from '@stylexjs/stylex'

export const color = stylex.defineVars({
  primary: 'blue',
})
```

```tsx
import { color } from './color.stylex'

function PrimaryButton({ label }: { label: string }) {
  return (
    <button
      styleDeck={{
        backgroundColor: color.primary,
      }}
    >
      {label}
    </button>
  )
}
```

### Cascade with StyleX styles

```tsx
import * as stylex from '@stylexjs/stylex'

const typography = stylex.create({
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontStyle: 'italic',
  },
})

function Timestamp() {
  return (
    <time
      styleDeck={[
        {
          color: 'black',
        },
        typography.caption,
      ]}
    >
      2 minutes ago
    </time>
  )
}
```

### Conditional styling

```tsx
function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      styleDeck={{
        fontWeight: isEnabled && 'bold',
        backgroundColor: isEnabled ? 'blue' : 'gray',
      }}
    >
      Save changes
    </button>
  )
}
```

### Dynamic styling

Use function to define runtime dynamic values.

```tsx
function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      styleDeck={{
        width: () => `${percentage}%`,
        height: '16px',
        backgroundColor: 'blue',
      }}
    />
  )
}
```

Dynamic values can also be deeply nested.

```tsx
function Swatch({ hue }: { hue: number }) {
  return (
    <div
      styleDeck={{
        backgroundColor: {
          default: () => `hsl(${hue}, 60%, 50%)`,
          ':hover': () => `hsl(${hue}, 80%, 40%)`,
        },
      }}
    />
  )
}
```

NOTE: The function body must be an expression statement. You cannot use a function body with block statement.
