# Visinage <!-- omit in toc -->

Modern CSS right in the markup.

<details>
<summary>Table of Contents</summary>

- [Setup](#setup)
- [Usage](#usage)
  - [Element styling](#element-styling)
  - [Component styling](#component-styling)
  - [Conditional styling](#conditional-styling)
  - [Dynamic styling](#dynamic-styling)
  - [Responsive styling](#responsive-styling)
  - [Pseudo-classes](#pseudo-classes)
  - [Pseudo-elements](#pseudo-elements)
  - [Variables](#variables)
  - [Cascade with StyleX styles](#cascade-with-stylex-styles)
- [Troubleshooting](#troubleshooting)
- [Using Visinage with Tailwind](#using-visinage-with-tailwind)

</details>

## Setup

Visinage is implemented as a preprocessor for [StyleX](https://stylexjs.com/).

Install the packages:

```bash
npm install visinage @stylexjs/stylex
npm install --save-dev @visinage/vite-plugin @stylexjs/unplugin
```

Configure `vite.config.js`. Put the Visinage plugin before the StyleX plugin.

```js
import { defineConfig } from 'vite'
import visinage from '@visinage/vite-plugin'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [visinage(), stylex.vite()],
})
```

If you encounter issues, see [Troubleshooting](#troubleshooting).

Tip: Bring Tailwind design tokens and utilities in with [SolarWind CSS](https://npmx.dev/package/solarwindcss).

## Usage

### Element styling

Apply styles directly to HTML elements.

```tsx
import { apply } from 'visinage'

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

Pass styles with the `sheet()` function to components that accept `StyleXStyles`.
It accepts the same type of arguments as `apply()`.

```tsx
import { apply, sheet } from 'visinage'
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

### Conditional styling

```tsx
function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      {...apply({
        backgroundColor: isEnabled ? 'blue' : 'gray',
      })}
    >
      Save changes
    </button>
  )
}
```

### Dynamic styling

```tsx
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      {...apply({
        // Closure form is required for runtime dynamic values.
        width: () => `${percent}%`,
        height: '16px',
        backgroundColor: 'blue',
      })}
    />
  )
}
```

### Responsive styling

```tsx
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
import { apply } from 'visinage'

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
import { apply } from 'visinage'

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
import { apply } from 'visinage'
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
import { apply } from 'visinage'
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

## Troubleshooting

- For setup with Tailwind, see [Using Visinage with Tailwind](#using-visinage-with-tailwind).
- `Error: macro was called at runtime`:
  - Ensure `@visinage/vite-plugin` is installed as a dev dependency.
  - Ensure visinage plugin appears before stylex plugin in your Vite plugins array.
  - Restart the dev server after changing plugin configuration.
- Type errors for contextual rules:
  - Ensure contextual objects include a `default` value.
- Unknown pseudo or property errors:
  - Ensure the selector/property is valid and supported.

## Using Visinage with Tailwind

Using Visinage with Tailwind in the same project is possible.
Visinage can not be used with Tailwind for the same element, `apply()` returns `{ className, style }` props. It will overwrite Tailwind classes, or vice-versa, depending on the order.

Tailwind can overrides Visinage styles unexpectedly. Prevent this by isolating Tailwind inside a layer.
In `index.html`, declare the layer before other stylesheets:

```html
<!doctype html>
<html lang="">
  <head>
    <style type="text/css">
      @layer tailwind;
    </style>
    <!-- other headers -->
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Then import Tailwind inside that layer:

```css
@layer tailwind {
  @import 'tailwindcss';
}
```
