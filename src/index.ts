export type { AuthoredStyle }
export type { PseudoClasses }
export type { PseudoElements }
export { style }
export type { StyleProperties }
export type { StylePropertiesWithExtras }
export type { StylePropertyValue }
export { styler }

/**
 * @public
 */
const styler: (
  ...args: (AuthoredStyle | StyleXStyles)[]
) => ReturnType<typeof props> = macro

/**
 * @public
 */
const style: (...args: (AuthoredStyle | StyleXStyles)[]) => StyleXStyles = macro

function macro(): never {
  throw new Error('macro was called at runtime')
}

export type Foo = StyleProperties['color']
export type Bar = StylePropertiesWithExtras['color']
export type Quux = AuthoredStyle['color']

/**
 * @public
 */
type AuthoredStyle =
  | {
      [P in keyof StylePropertiesWithExtras]?: Thunkable<
        StylePropertiesWithExtras[P]
      >
    }
  | Partial<
      Record<
        string,
        Thunkable<
          // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          StylePropertyValue<{} | null>
        >
      >
    >

type Thunkable<T> = T | (() => T)

/**
 * @public
 */
type StylePropertiesWithExtras = StyleProperties &
  Partial<
    Record<
      Exclude<
        PseudoElements,
        Extract<keyof StyleX.CSSPropertiesWithExtras, `::${string}`>
      >,
      StyleProperties &
        Partial<
          Record<
            string,
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            StylePropertyValue<{} | null>
          >
        >
    >
  > &
  Partial<
    Record<
      Extract<keyof StyleX.CSSPropertiesWithExtras, `::${string}`>,
      StyleProperties &
        Partial<
          Record<
            string,
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            StylePropertyValue<{} | null>
          >
        >
    >
  >

/**
 * @public
 */
type StyleProperties = Omit<
  {
    [P in keyof CSS.Properties]?: StylePropertyValue<CSS.Properties[P] | null>
  },
  keyof StyleX.CSSPropertiesWithExtras
> &
  Pick<
    {
      [P in keyof CSS.Properties]?: StylePropertyValue<CSS.Properties[P] | null>
    },
    Extract<keyof CSS.Properties, keyof StyleX.CSSPropertiesWithExtras>
  > &
  Omit<
    {
      [P in keyof StyleX.CSSPropertiesWithExtras]?: StylePropertyValue<
        StyleX.CSSPropertiesWithExtras[P]
      >
    },
    keyof CSS.Properties | PseudoElements
  >

/**
 * @public
 */
type StylePropertyValue<T> =
  | T
  | {
      [Key in
        | 'default'
        | PseudoClasses
        | CSS.AtRules
        | (string & {})]?: StylePropertyValue<T>
    }

/**
 * @public
 */
type PseudoClasses = Exclude<CSS.Pseudos, PseudoElements>

/**
 * @public
 */
type PseudoElements =
  | Extract<CSS.Pseudos, `::${string}`>
  | Extract<keyof StyleX.CSSPropertiesWithExtras, `::${string}`>
  | (`::${string}` & {})
  // legacy
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

type DemotedClassNameForProperties = StyleX.StyleXClassNameFor<never, never> & {
  /** @deprecated not-applicable */
  _key?: never
  /** @deprecated not-applicable */
  _opaque?: never
  /** @deprecated not-applicable */
  _value?: never
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
interface DemotedStringProperties extends Partial<String> {
  // /** @deprecated not-applicable */
  at?: never
  /** @deprecated not-applicable */
  toString?: never
  /** @deprecated not-applicable */
  charAt?: never
  /** @deprecated not-applicable */
  charCodeAt?: never
  /** @deprecated not-applicable */
  concat?: never
  /** @deprecated not-applicable */
  indexOf?: never
  /** @deprecated not-applicable */
  lastIndexOf?: never
  /** @deprecated not-applicable */
  localeCompare?: never
  /** @deprecated not-applicable */
  match?: never
  /** @deprecated not-applicable */
  replace?: never
  /** @deprecated not-applicable */
  search?: never
  /** @deprecated not-applicable */
  slice?: never
  /** @deprecated not-applicable */
  split?: never
  /** @deprecated not-applicable */
  substring?: never
  /** @deprecated not-applicable */
  toLowerCase?: never
  /** @deprecated not-applicable */
  toLocaleLowerCase?: never
  /** @deprecated not-applicable */
  toUpperCase?: never
  /** @deprecated not-applicable */
  toLocaleUpperCase?: never
  /** @deprecated not-applicable */
  trim?: never
  /** @deprecated not-applicable */
  length?: never
  /** @deprecated not-applicable */
  valueOf?: never
  /** @deprecated not-applicable */
  codePointAt?: never
  /** @deprecated not-applicable */
  includes?: never
  /** @deprecated not-applicable */
  endsWith?: never
  /** @deprecated not-applicable */
  normalize?: never
  /** @deprecated not-applicable */
  repeat?: never
  /** @deprecated not-applicable */
  startsWith?: never
  /** @deprecated not-applicable */
  matchAll?: never
  /** @deprecated not-applicable */
  padStart?: never
  /** @deprecated not-applicable */
  padEnd?: never
  /** @deprecated not-applicable */
  replaceAll?: never
  /** @deprecated not-applicable */
  trimEnd?: never
  /** @deprecated not-applicable */
  trimStart?: never
}

import type * as CSS from 'csstype'
import type { props } from '@stylexjs/stylex'
import type * as StyleX from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { StyleXStyles } from '@stylexjs/stylex'
