export type { AuthoredStyle }
export type { LegacyPseudoElements }
export type { NonApplicableStringProperties }
export type { PseudoClasses }
export type { PseudoElements }
export { style }
export type { StyleProperties }
export type { StylePropertiesWithExtras }
export type { StylePropertyValue }
export { styler }
export type { Thunkable }

/**
 * @public
 */
const styler: (...args: AuthoredStyle[]) => ReturnType<typeof props> = macro

/**
 * @public
 */
const style: <StyleList extends AuthoredStyle[]>(
  ...args: {
    [Index in keyof StyleList]: StyleList[Index]
    // & AuthoredStyle
  }
) => {
  [Index in keyof StyleList]: StyleList[Index] extends infer Style
    ? Style extends Record<string, StyleXClassNameFor<unknown, unknown>>
      ? Style
      : MapNamespace<{
          [Key in keyof Style]: Style[Key] extends () => infer Result
            ? Result
            : Style[Key]
        }>
    : never
} = macro

function macro(): never {
  throw new Error('macro was called at runtime')
}

/**
 * @public
 */
type AuthoredStyle =
  | {
      [Key in keyof StylePropertiesWithExtras]?: Thunkable<
        StylePropertiesWithExtras[Key]
      >
    }
  | Record<StyleXVar<unknown>, Thunkable<StylePropertyValue>>

/**
 * @public
 */
type Thunkable<T> = T | (() => T)

/**
 * @public
 */
type StylePropertiesWithExtras = StyleProperties &
  Omit<
    Record<PseudoElements, StyleProperties>,
    Extract<keyof CSSPropertiesWithExtras, `::${string}`> | LegacyPseudoElements
  > &
  Record<
    Extract<keyof CSSPropertiesWithExtras, `::${string}`>,
    StyleProperties
  > & {
    /** @deprecated legacy */
    ':after'?: unknown
    /** @deprecated legacy */
    ':before'?: unknown
    /** @deprecated legacy */
    ':first-letter'?: unknown
    /** @deprecated legacy */
    ':first-line'?: unknown
    /** @deprecated legacy */
    ':-moz-placeholder'?: unknown
    /** @deprecated legacy */
    ':-ms-input-placeholder'?: unknown
  }

/**
 * @public
 */
type StyleProperties = Omit<
  {
    [Key in keyof Properties]?: StylePropertyValue<
      Properties[Key] | null | NonApplicableStringProperties
    >
  },
  keyof CSSPropertiesWithExtras
> &
  Pick<
    {
      [Key in keyof Properties]?: StylePropertyValue<
        Properties[Key] | null | NonApplicableStringProperties
      >
    },
    Extract<keyof Properties, keyof CSSPropertiesWithExtras>
  > &
  Omit<
    {
      [Key in keyof CSSPropertiesWithExtras]?: StylePropertyValue<
        CSSPropertiesWithExtras[Key]
      >
    },
    keyof Properties | PseudoElements
  > &
  Record<string, StylePropertyValue>

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type StylePropertyValue<T = {} | null> =
  | T
  | {
      [Key in
        | 'default'
        | PseudoClasses
        | AtRules
        | (string & {})]?: StylePropertyValue<T>
    }

/**
 * @public
 */
type PseudoClasses = Exclude<Pseudos, PseudoElements>

/**
 * @public
 */
type PseudoElements =
  | Extract<Pseudos, `::${string}`>
  | Extract<keyof CSSPropertiesWithExtras, `::${string}`>
  | (`::${string}` & {})
  | LegacyPseudoElements

/**
 * @public
 */
type LegacyPseudoElements =
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

/**
 * @public
 */
interface NonApplicableStringProperties {
  /** @deprecated non-applicable */
  toString?: unknown
  /** @deprecated non-applicable */
  charAt?: unknown
  /** @deprecated non-applicable */
  charCodeAt?: unknown
  /** @deprecated non-applicable */
  concat?: unknown
  /** @deprecated non-applicable */
  indexOf?: unknown
  /** @deprecated non-applicable */
  lastIndexOf?: unknown
  /** @deprecated non-applicable */
  localeCompare?: unknown
  /** @deprecated non-applicable */
  match?: unknown
  /** @deprecated non-applicable */
  replace?: unknown
  /** @deprecated non-applicable */
  search?: unknown
  /** @deprecated non-applicable */
  slice?: unknown
  /** @deprecated non-applicable */
  split?: unknown
  /** @deprecated non-applicable */
  substring?: unknown
  /** @deprecated non-applicable */
  toLowerCase?: unknown
  /** @deprecated non-applicable */
  toLocaleLowerCase?: unknown
  /** @deprecated non-applicable */
  toUpperCase?: unknown
  /** @deprecated non-applicable */
  toLocaleUpperCase?: unknown
  /** @deprecated non-applicable */
  trim?: unknown
  /** @deprecated non-applicable */
  length?: unknown
  /** @deprecated non-applicable */
  valueOf?: unknown
  /** @deprecated non-applicable */
  codePointAt?: unknown
  /** @deprecated non-applicable */
  includes?: unknown
  /** @deprecated non-applicable */
  endsWith?: unknown
  /** @deprecated non-applicable */
  normalize?: unknown
  /** @deprecated non-applicable */
  repeat?: unknown
  /** @deprecated non-applicable */
  startsWith?: unknown
  /** @deprecated non-applicable */
  matchAll?: unknown
  /** @deprecated non-applicable */
  padStart?: unknown
  /** @deprecated non-applicable */
  padEnd?: unknown
  /** @deprecated non-applicable */
  trimEnd?: unknown
  /** @deprecated non-applicable */
  trimStart?: unknown
}

import type { AtRules } from 'csstype'
import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { MapNamespace } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { Properties } from 'csstype'
import type { props } from '@stylexjs/stylex'
import type { Pseudos } from 'csstype'
import type { StyleXClassNameFor } from '@stylexjs/stylex'
import type { StyleXVar } from '@stylexjs/stylex'
//
