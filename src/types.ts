export type { StyleDeck }

export type { Attrs }
export type { CommonProperties }
export type { CompiledProperties }
export type { CompiledValue }
export type { ContextualKey }
export type { ContextualValue }
export type { CSSPropertiesWithExtras }
export type { CustomProperties }
export type { LegacyPseudoElementKey }
export type { NonApplicableObjectProperties }
export type { NonApplicableStringProperties }
export type { ParameterizedPseudoClassKey }
export type { ParameterizedPseudoElementKey }
export type { PseudoClassKey }
export type { PseudoElementKey }
export type { PseudoElementStyleConfig }
export type { ResolvableValue }
export type { SourceValue }
export type { StyleCard }
export type { StyleConfig }
export type { StyleProperties }
export type { StylingAttrs }

/* eslint-disable @typescript-eslint/no-empty-object-type */

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
type StylingAttrs = ReturnType<typeof stylex.attrs>

/**
 * @internal
 */
type StyleCard<T extends StyleConfig> = {
  [TKey in keyof T]: TKey extends keyof PseudoElementStyleConfig
    ? StyleCard<NonNullable<T[TKey]>>
    : SourceValue<T[TKey]> | CompiledValue<TKey, T[TKey]>
}

/**
 * @internal
 */
type StyleConfig = StyleProperties | PseudoElementStyleConfig

/**
 * @internal
 */
type PseudoElementStyleConfig = Partial<
  Record<
    | Exclude<PseudoElementKey, Exclude<ParameterizedPseudoElementKey, '::cue'>>
    | `${ParameterizedPseudoElementKey}(${string})`,
    StyleProperties
  >
>

/**
 * @internal
 */
type StyleProperties = CommonProperties | CustomProperties | CompiledProperties

/**
 * @internal
 */
type CustomProperties = Record<`--${string}`, {}>

/**
 * @internal
 */
type CompiledProperties = Record<StyleXVar<unknown>, {}>

/**
 * @internal
 */
type CommonProperties = Properties &
  Omit<CSSPropertiesWithExtras, keyof Properties | `::${string}`>

/**
 * @internal
 */
type SourceValue<T> = false | ResolvableValue<T> | ContextualValue<T>

/**
 * @internal
 */
type ResolvableValue<T> = T | readonly T[] | (() => T | null) | null

/**
 * @internal
 */
type ContextualValue<T> =
  | ({
      default: ResolvableValue<T>
    } & {
      [Key in ContextualKey]?: ResolvableValue<T> | ContextualValue<T>
    })
  | NonApplicableObjectProperties
  | NonApplicableStringProperties

/**
 * @internal
 */
type ContextualKey =
  | PseudoClassKey
  | `${PseudoClassKey}:${string}`
  | `${ParameterizedPseudoClassKey}(${string})`
  | `${ParameterizedPseudoClassKey}(${string}):${string}`
  | AtRules
  | `${AtRules} ${string}`
  | `[${Attrs | 'aria'}]`
  | `[${Exclude<Attrs, 'data'>}=${string}]${string}`
  | `[${'data' | 'aria'}-${string}]${string}`

/**
 * @internal
 */
type PseudoClassKey = Exclude<
  Pseudos,
  PseudoElementKey | LegacyPseudoElementKey
>

/**
 * @internal
 */
type ParameterizedPseudoClassKey =
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
type PseudoElementKey =
  | Extract<Pseudos, `::${string}`>
  | Extract<keyof CSSPropertiesWithExtras, `::${string}`>

/**
 * @internal
 */
type ParameterizedPseudoElementKey =
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
type Attrs = HtmlAttributes extends `[${infer U}]` ? U : never

/**
 * @internal
 */
type LegacyPseudoElementKey =
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

/**
 * @internal
 */
interface CompiledValue<K, V> {
  /** @deprecated not applicable */ _opaque: ClassNameFor<K, V>['_opaque']
  /** @deprecated not applicable */ _key: ClassNameFor<K, V>['_key']
  /** @deprecated not applicable */ _value: ClassNameFor<K, V>['_value']
}

/**
 * @internal
 */
type CSSPropertiesWithExtras =
  StyleXStyles extends StyleXStyles<infer U extends Record<string, unknown>>
    ? U
    : never

/**
 * @internal
 */
interface NonApplicableObjectProperties {
  /** @deprecated not applicable */ toString?: never
  /** @deprecated not applicable */ valueOf?: never
}

/**
 * @internal
 */
interface NonApplicableStringProperties {
  /** @deprecated not applicable */ at?: never
  /** @deprecated not applicable */ charAt?: never
  /** @deprecated not applicable */ charCodeAt?: never
  /** @deprecated not applicable */ codePointAt?: never
  /** @deprecated not applicable */ concat?: never
  /** @deprecated not applicable */ endsWith?: never
  /** @deprecated not applicable */ includes?: never
  /** @deprecated not applicable */ indexOf?: never
  /** @deprecated not applicable */ lastIndexOf?: never
  /** @deprecated not applicable */ length?: never
  /** @deprecated not applicable */ localeCompare?: never
  /** @deprecated not applicable */ match?: never
  /** @deprecated not applicable */ matchAll?: never
  /** @deprecated not applicable */ normalize?: never
  /** @deprecated not applicable */ padEnd?: never
  /** @deprecated not applicable */ padStart?: never
  /** @deprecated not applicable */ repeat?: never
  /** @deprecated not applicable */ replace?: never
  /** @deprecated not applicable */ replaceAll?: never
  /** @deprecated not applicable */ search?: never
  /** @deprecated not applicable */ slice?: never
  /** @deprecated not applicable */ split?: never
  /** @deprecated not applicable */ startsWith?: never
  /** @deprecated not applicable */ substring?: never
  /** @deprecated not applicable */ toLocaleLowerCase?: never
  /** @deprecated not applicable */ toLocaleUpperCase?: never
  /** @deprecated not applicable */ toLowerCase?: never
  /** @deprecated not applicable */ toUpperCase?: never
  /** @deprecated not applicable */ trim?: never
  /** @deprecated not applicable */ trimEnd?: never
  /** @deprecated not applicable */ trimStart?: never
}

import type { AtRules } from 'csstype'
import type { StyleXClassNameFor as ClassNameFor } from '@stylexjs/stylex'
import type { HtmlAttributes } from 'csstype'
import type { InlineStyles } from '@stylexjs/stylex'
import type { Properties } from 'csstype'
import type { Pseudos } from 'csstype'
import type * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import type { StyleXVar } from '@stylexjs/stylex'
//
