export type { AriaAttributes }
export type { Attribute }
export type { CommonAttribute }
export type { CommonProperties }
export type { CompiledProperties }
export type { Hashed }
export type { Hooked }
export type { PropertiesWithExtras }
export type { CustomProperties }
export type { DataAttributes }
export type { NonApplicableStringProperties }
export type { ParameterizedPseudoClass }
export type { ParameterizedPseudoElement }
export type { PseudoClass }
export type { PseudoElement }
export type { PseudoElementStyleConfig }
export type { Source }
export type { Selector }
export type { StyleCard }
export type { StyleConfig }
export type { StyleDeck }
export type { StyleProperties }

/**
 * @public
 */
type StyleDeck<T extends StyleConfig = StyleConfig> =
  | (StyleDeck<T> | undefined)[]
  | StyleCard<T>
  | readonly [StyleCard<T>, InlineStyles]
  | false

/**
 * @internal
 */
type StyleCard<T extends StyleConfig> = {
  readonly [TKey in keyof T]: TKey extends keyof PseudoElementStyleConfig
    ? StyleCard<NonNullable<T[TKey]>>
    : | null
      | false
      | Source<T[TKey]>
      | Hooked<Exclude<T[TKey], null | undefined>>
      | Hashed<TKey, T[TKey]>
}

/**
 * @internal
 */
type StyleConfig = StyleProperties | PseudoElementStyleConfig

/**
 * @internal
 */
type PseudoElementStyleConfig = Record<
  | Exclude<PseudoElement, ParameterizedPseudoElement>
  | `${ParameterizedPseudoElement}(${string})`
  // ::cue can be used both with and without parameter
  | '::cue',
  StyleProperties
>

/**
 * @internal
 */
type StyleProperties = CommonProperties | CustomProperties | CompiledProperties

/**
 * @internal
 */
type CustomProperties = Record<`--${string}`, NonNullable<unknown>>

/**
 * @internal
 */
type CompiledProperties = Record<CompiledVar<unknown>, NonNullable<unknown>>

/**
 * @internal
 */
type CommonProperties = Properties & ExtraProperties

/**
 * @internal
 */
type ExtraProperties = Omit<
  PropertiesWithExtras,
  keyof Properties | `::${string}`
>

/**
 * @internal
 */
type Source<T> = T | readonly T[] | (() => T)

// oxlint-disable typescript/consistent-indexed-object-style

/**
 * @internal
 */
type Hooked<T> =
  | ({
      default: Source<T> | null
    } & {
      [Key in Selector | AtRules | `${AtRules} ${string}` | Hook]?:
        Source<T> | Hooked<T>
    })
  | (string extends T ? NonApplicableStringProperties : never)

/**
 * @internal
 */
type Selector =
  | PseudoClass
  | `${ParameterizedPseudoClass}(${string})`
  | `[${Attribute}]`
  | `[${Attribute}=${string}]`

/**
 * @internal
 */
type Attribute =
  | Exclude<CommonAttribute, 'data'>
  // oxlint-disable typescript/no-duplicate-type-constituents typescript/no-redundant-type-constituents
  | keyof AriaAttributes
  | keyof DataAttributes

/* eslint-disable @typescript-eslint/no-empty-object-type */
// oxlint-disable typescript/no-empty-interface, typescript/consistent-indexed-object-style

/**
 * @public
 */
interface AriaAttributes {}

/**
 * @public
 */
interface DataAttributes {}

/* eslint-enable @typescript-eslint/no-empty-object-type */
// oxlint-enable typescript/no-empty-interface, typescript/consistent-indexed-object-style

/**
 * @internal
 */
type PseudoClass = Exclude<
  Pseudos,
  | PseudoElement
  // legacy pseudo elements
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'
>

/**
 * @internal
 */
type ParameterizedPseudoClass =
  | ':active-view-transition-type'
  | ':dir'
  | ':has'
  | ':heading'
  | ':host-context'
  | ':host'
  | ':is'
  | ':lang'
  | ':not'
  | ':nth-child'
  | ':nth-last-child'
  | ':nth-last-of-type'
  | ':nth-of-type'
  | ':state'
  | ':where'

/**
 * @internal
 */
type PseudoElement =
  | Extract<Pseudos, `::${string}`>
  | Extract<keyof PropertiesWithExtras, `::${string}`>

/**
 * @internal
 */
type ParameterizedPseudoElement =
  | '::cue'
  | '::highlight'
  | '::part'
  | '::picker'
  | '::scroll-button'
  | '::slotted'
  | '::view-transition-group'
  | '::view-transition-image-pair'
  | '::view-transition-new'
  | '::view-transition-old'

/**
 * @internal
 */
type CommonAttribute = HtmlAttributes extends `[${infer U}]` ? U : never

/**
 * @internal
 */
interface Hashed<K, V> {
  /** @deprecated not applicable */
  _opaque: CompiledClassName<K, V>['_opaque']
  /** @deprecated not applicable */
  _key: CompiledClassName<K, V>['_key']
  /** @deprecated not applicable */
  _value: CompiledClassName<K, V>['_value']
}

/**
 * @internal
 */
type PropertiesWithExtras =
  CompiledStyles extends CompiledStyles<infer U extends Record<string, unknown>>
    ? U
    : never

/**
 * @internal
 */
interface NonApplicableStringProperties {
  /** @deprecated not applicable */
  at?: never
  /** @deprecated not applicable */
  charAt?: never
  /** @deprecated not applicable */
  charCodeAt?: never
  /** @deprecated not applicable */
  codePointAt?: never
  /** @deprecated not applicable */
  concat?: never
  /** @deprecated not applicable */
  endsWith?: never
  /** @deprecated not applicable */
  includes?: never
  /** @deprecated not applicable */
  indexOf?: never
  /** @deprecated not applicable */
  lastIndexOf?: never
  /** @deprecated not applicable */
  length?: never
  /** @deprecated not applicable */
  localeCompare?: never
  /** @deprecated not applicable */
  match?: never
  /** @deprecated not applicable */
  matchAll?: never
  /** @deprecated not applicable */
  normalize?: never
  /** @deprecated not applicable */
  padEnd?: never
  /** @deprecated not applicable */
  padStart?: never
  /** @deprecated not applicable */
  repeat?: never
  /** @deprecated not applicable */
  replace?: never
  /** @deprecated not applicable */
  replaceAll?: never
  /** @deprecated not applicable */
  search?: never
  /** @deprecated not applicable */
  slice?: never
  /** @deprecated not applicable */
  split?: never
  /** @deprecated not applicable */
  startsWith?: never
  /** @deprecated not applicable */
  substring?: never
  /** @deprecated not applicable */
  toLocaleLowerCase?: never
  /** @deprecated not applicable */
  toLocaleUpperCase?: never
  /** @deprecated not applicable */
  toLowerCase?: never
  /** @deprecated not applicable */
  toUpperCase?: never
  /** @deprecated not applicable */
  trim?: never
  /** @deprecated not applicable */
  trimEnd?: never
  /** @deprecated not applicable */
  trimStart?: never

  /** @deprecated not applicable */
  toString?: unknown
  /** @deprecated not applicable */
  valueOf?: unknown
}

import type { AtRules } from 'csstype'
import type { StyleXClassNameFor as CompiledClassName } from '@stylexjs/stylex'
import type { StyleXStyles as CompiledStyles } from '@stylexjs/stylex'
import type { StyleXVar as CompiledVar } from '@stylexjs/stylex'
import type { Hook } from './selector'
import type { HtmlAttributes } from 'csstype'
import type { InlineStyles } from '@stylexjs/stylex'
import type { Properties } from 'csstype'
import type { Pseudos } from 'csstype'
//
