# Vicinage &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chbybnwr/vicinage/blob/prototype/LICENSE) [![npm version](https://img.shields.io/npm/v/vicinage.svg?style=flat)](https://www.npmjs.com/package/vicinage) <!-- omit in toc -->

Type-safe and zero-runtime UI styling, right in the markup.

Vicinage lets you write strongly-typed CSS objects directly on your markup. Leveraging the power of [StyleX](https://stylexjs.com/) under the hood to extract them to zero-runtime atomic CSS, without the friction of naming every single style block.

<details>

<summary>Table of Contents</summary>

- [Setup](#setup)
  - [Tips](#tips)
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
- [Next.js](https://github.com/chbybnwr/vicinage-nextjs-starter)

## Setup

Vicinage is implemented as a preprocessor for [StyleX](https://stylexjs.com/).

Install the packages:

```bash
npm install vicinage @stylexjs/stylex
npm install --save-dev @vicinage/unplugin @stylexjs/unplugin
```

Add the plugin to your Vite configuration right before the StyleX plugin.

```js
import { defineConfig } from 'vite'
import vicinage from '@vicinage/unplugin'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [vicinage.vite(), stylex.vite()],
})
```

### Tips

- Add design tokens with [SolarWind CSS](https://github.com/c5n8/solarwindcss).
- Install Chrome Extension [StyleX DevTools](https://chromewebstore.google.com/detail/stylex-devtools/pfcoadoepdjlhhnchklcinajnmmninem).
- Install VS Code extension [Explicit Folding](https://marketplace.visualstudio.com/items?itemName=zokugun.explicit-folding).

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
import { apply } from 'vicinage'

function App() {
  return (
    <div
      {...apply({
        color: 'green',
        backgroundColor: 'black',
      })}
    >
      hello, world
    </div>
  )
}
```

### Component styling

Pass styles with the `sheet()` function to components that accept [`StyleXStyles`](https://stylexjs.com/docs/api/types/StyleXStyles).

```tsx
import { apply, sheet } from 'vicinage'
import type { StyleXStyles } from '@stylexjs/stylex'

function Feed() {
  return (
    <Post
      style={sheet({
        color: 'blue',
      })}
    />
  )
}

function Post({ style }: { style?: StyleXStyles }) {
  return (
    <div
      {...apply(
        {
          color: 'black',
        },
        style,
      )}
    >
      Lorem ipsum
    </div>
  )
}
```

### Responsive styling

```tsx
import { apply } from 'vicinage'

function Hero() {
  return (
    <h1
      {...apply({
        fontSize: {
          default: '1.5rem',
          '@media (min-width: 768px)': '2.25rem',
        },
      })}
    >
      Welcome back
    </h1>
  )
}
```

### Pseudo-classes

```tsx
import { apply } from 'vicinage'

function BillingLink() {
  return (
    <a
      {...apply({
        color: {
          default: 'blue',
          ':visited': 'purple',
        },
      })}
      href="/billing/"
    >
      Open billing
    </a>
  )
}
```

### Pseudo-elements

```tsx
import { apply } from 'vicinage'

function SearchInput() {
  return (
    <input
      placeholder="Search"
      {...apply({
        color: 'black',
        '::placeholder': {
          color: 'gray',
        },
      })}
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
import { apply } from 'vicinage'

function Sidebar() {
  return (
    <nav
      {...apply({
        '--sidebar-width': '320px',
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--color-surface, blue)',
      })}
    >
      Navigation
    </nav>
  )
}
```

StyleX variables for shared design tokens:

```ts
// tokens.stylex.ts
import * as stylex from '@stylexjs/stylex'

export const color = stylex.defineVars({
  primary: 'blue',
})
```

```tsx
import { apply } from 'vicinage'
import { color } from './tokens.stylex'

function PrimaryButton({ label }: { label: string }) {
  return (
    <button
      {...apply({
        backgroundColor: color.primary,
      })}
    >
      {label}
    </button>
  )
}
```

### Cascade with StyleX styles

```tsx
import { apply } from 'vicinage'
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
      {...apply(
        {
          color: 'black',
        },
        typography.caption,
      )}
    >
      2 minutes ago
    </time>
  )
}
```

### Conditional styling

```tsx
import { apply } from 'vicinage'

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      {...apply({
        fontWeight: isEnabled && 'bold',
        backgroundColor: isEnabled ? 'blue' : 'gray',
      })}
    >
      Save changes
    </button>
  )
}
```

### Dynamic styling

Use function to define runtime dynamic values.

```tsx
import { apply } from 'vicinage'

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      {...apply({
        width: () => `${percentage}%`,
        height: '16px',
        backgroundColor: 'blue',
      })}
    />
  )
}
```

Dynamic values can also be deeply nested.

```tsx
import { apply } from 'vicinage'

function Swatch({ hue }: { hue: number }) {
  return (
    <div
      {...apply({
        backgroundColor: {
          default: () => `hsl(${hue}, 60%, 50%)`,
          ':hover': () => `hsl(${hue}, 80%, 40%)`,
        },
      })}
    />
  )
}
```

NOTE: The function body must be an expression statement. You cannot use a function body with block statement.
