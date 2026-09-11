/* eslint-disable @typescript-eslint/no-empty-object-type */
// oxlint-disable typescript/no-empty-interface typescript/ban-types

export type { AtRule }
export type { AttributeSelector }
export type { CompiledCSSValue }
export type { CSS_HOOK }
export type { CSSFeatures }
export type { CSSHook }
export type { CSSProperties }
export type { CSSSelector }
export type { HookedCSSValue }
export type { NonApplicableStringProperties }
export type { PseudoClass }
export type { PseudoElement }
export type { PseudoElementStyleConfig }
export type { SourcedCSSValue }
export type { StyleCard }
export type { StyleConfig }
export type { STYLE_CONFIG }
export type { StyleDeck }

/**
 * @public
 */
type StyleDeck<T extends StyleConfig = StyleConfig> =
  | (StyleDeck<T> | undefined)[]
  | StyleCard<T>
  | readonly [StyleCard<T>, InlineStyles]
  | false
  | Theme<VarGroup<{}>>
  | {
      /** @deprecated not applicable */
      theme?: Theme<VarGroup<{}>>['theme']
      /** @deprecated not applicable */
      description?: Theme<VarGroup<{}>>['description']
      /** @deprecated not applicable */
      toString?: Theme<VarGroup<{}>>['toString']
      /** @deprecated not applicable */
      valueOf?: Theme<VarGroup<{}>>['valueOf']
    }

/**
 * @internal
 */
type StyleCard<T extends StyleConfig> = {
  readonly [TKey in keyof T]: TKey extends keyof PseudoElementStyleConfig
    ? StyleCard<NonNullable<T[TKey]>>
    : | null
      | false
      | SourcedCSSValue<T[TKey]>
      | HookedCSSValue<Exclude<T[TKey], null | undefined>>
      | CompiledCSSValue<TKey, T[TKey]>
}

/**
 * @internal
 */
type StyleConfig = (CSSProperties | PseudoElementStyleConfig) & {
  [STYLE_CONFIG]?: never
}

/**
 * @internal
 */
declare const STYLE_CONFIG: unique symbol

/**
 * @internal
 */
type PseudoElementStyleConfig = Partial<Record<PseudoElement, CSSProperties>>

/**
 * @public
 */
interface CSSProperties {}

/**
 * @public
 */
interface CSSFeatures {
  // attributeSelector: string
  // pseudoClass: string
  // pseudoElement: string
  // atRule: string
}

/**
 * @internal
 */
type SourcedCSSValue<T> = T | readonly T[] | (() => T)

// oxlint-disable typescript/consistent-indexed-object-style

/**
 * @internal
 */
type HookedCSSValue<T> =
  | ({
      default: SourcedCSSValue<T> | null
    } & {
      // oxlint-disable-next-line typescript/no-redundant-type-constituents typescript/no-duplicate-type-constituents
      [Key in CSSSelector | AtRule | CSSHook]?:
        SourcedCSSValue<T> | HookedCSSValue<T>
    })
  | (string extends T ? NonApplicableStringProperties : never)

/**
 * @internal
 */
// oxlint-disable-next-line typescript/no-duplicate-type-constituents typescript/no-redundant-type-constituents
type CSSSelector = AttributeSelector | PseudoClass

/**
 * @internal
 */
type AttributeSelector = CSSFeatures extends {
  attributeSelector: infer T extends string
}
  ? T
  : never

/**
 * @internal
 */
type PseudoClass = CSSFeatures extends {
  pseudoClass: infer T extends string
}
  ? T
  : never

/**
 * @internal
 */
type PseudoElement = CSSFeatures extends {
  pseudoElement: infer P extends string
}
  ? P
  : never

/**
 * @internal
 */
type AtRule = CSSFeatures extends {
  atRule: infer T extends string
}
  ? T
  : never

/**
 * @internal
 */
type CSSHook = symbol & {
  readonly [CSS_HOOK]: never
}

/**
 * @internal
 */
declare const CSS_HOOK: unique symbol

/**
 * @internal
 */
interface CompiledCSSValue<K, V> {
  /** @deprecated not applicable */
  _opaque: StyleXClassNameFor<K, V>['_opaque']
  /** @deprecated not applicable */
  _key: StyleXClassNameFor<K, V>['_key']
  /** @deprecated not applicable */
  _value: StyleXClassNameFor<K, V>['_value']
}

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

import type { InlineStyles } from '@stylexjs/stylex'
import type { StyleXClassNameFor } from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import type { VarGroup } from '@stylexjs/stylex'
//
