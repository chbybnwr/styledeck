export type { AuthoredStyle }
export type { StyleProperties }
export type { StylePropertiesWithExtras }
export type { StylePropertyValue }
export type { PseudoClasses }
export type { PseudoElements }
export { style }
export { styler }

/**
 * @public
 */
declare function styler(
  ...styles: (AuthoredStyle | StyleXStyles)[]
): ReturnType<typeof props>

/**
 * @public
 */
declare function style(
  ...styles: (AuthoredStyle | StyleXStyles)[]
): StyleXStyles

/**
 * @public
 */
type AuthoredStyle = {
  [Key in keyof StylePropertiesWithExtras]:
    | StylePropertiesWithExtras[Key]
    | (() => StylePropertiesWithExtras[Key])
}

/**
 * @public
 */
type StylePropertiesWithExtras = StyleProperties &
  Partial<
    Record<PseudoElements, StyleProperties> &
      Record<string, StylePropertyValue<string | null>>
  >

/**
 * @public
 */
type StyleProperties = {
  [P in keyof CSSProperties]?: StylePropertyValue<CSSProperties[P] | null>
} & {
  [P in Exclude<
    keyof CSSPropertiesWithExtras,
    keyof CSSProperties | PseudoElements
  >]?: StylePropertyValue<CSSPropertiesWithExtras[P]>
}

/**
 * @public
 */
type StylePropertyValue<T> =
  | T
  | {
      [Key in
        | 'default'
        | PseudoClasses
        | AtRules
        | (string & {})]?: StylePropertyValue<T>
    }
  // push non-applicable properties down on suggestions
  | {
      /**
       * @type {import('@stylexjs/stylex').StyleXClassNameFor}
       */
      /** @deprecated not-applicable */
      _key?: unknown
      /** @deprecated not-applicable */
      _opaque?: unknown
      /** @deprecated not-applicable */
      _value?: unknown

      /**
       * @type {String}
       */
      /** @deprecated not-applicable */
      at?: unknown
      /** @deprecated not-applicable */
      toString?: unknown
      /** @deprecated not-applicable */
      charAt?: unknown
      /** @deprecated not-applicable */
      charCodeAt?: unknown
      /** @deprecated not-applicable */
      concat?: unknown
      /** @deprecated not-applicable */
      indexOf?: unknown
      /** @deprecated not-applicable */
      lastIndexOf?: unknown
      /** @deprecated not-applicable */
      localeCompare?: unknown
      /** @deprecated not-applicable */
      match?: unknown
      /** @deprecated not-applicable */
      replace?: unknown
      /** @deprecated not-applicable */
      search?: unknown
      /** @deprecated not-applicable */
      slice?: unknown
      /** @deprecated not-applicable */
      split?: unknown
      /** @deprecated not-applicable */
      substring?: unknown
      /** @deprecated not-applicable */
      toLowerCase?: unknown
      /** @deprecated not-applicable */
      toLocaleLowerCase?: unknown
      /** @deprecated not-applicable */
      toUpperCase?: unknown
      /** @deprecated not-applicable */
      toLocaleUpperCase?: unknown
      /** @deprecated not-applicable */
      trim?: unknown
      /** @deprecated not-applicable */
      length?: unknown
      /** @deprecated not-applicable */
      valueOf?: unknown
      /** @deprecated not-applicable */
      codePointAt?: unknown
      /** @deprecated not-applicable */
      includes?: unknown
      /** @deprecated not-applicable */
      endsWith?: unknown
      /** @deprecated not-applicable */
      normalize?: unknown
      /** @deprecated not-applicable */
      repeat?: unknown
      /** @deprecated not-applicable */
      startsWith?: unknown
      /** @deprecated not-applicable */
      matchAll?: unknown
      /** @deprecated not-applicable */
      padStart?: unknown
      /** @deprecated not-applicable */
      padEnd?: unknown
      /** @deprecated not-applicable */
      replaceAll?: unknown
      /** @deprecated not-applicable */
      trimEnd?: unknown
      /** @deprecated not-applicable */
      trimStart?: unknown
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
  // legacy
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

import type { AtRules } from 'csstype'
import type { Properties as CSSProperties } from 'csstype'
import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { props } from '@stylexjs/stylex'
import type { Pseudos } from 'csstype'
import type { StyleXStyles } from '@stylexjs/stylex'
//
