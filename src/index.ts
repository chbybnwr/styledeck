export { apply }
export { sheet }
export type { StyleDeck }

export type { CommonProperties as '~CommonProperties' }
export type { CompiledProperties as '~CompiledProperties' }
export type { CompiledValue as '~CompiledValue' }
export type { ContextualValue as '~ContextualValue' }
export type { CustomProperties as '~CustomProperties' }
export type { LegacyPseudoElementKey as '~LegacyPseudoElementKey' }
export { mergeClassAttribute as '~mergeClassAttribute' }
export { mergeClassProperty as '~mergeClassProperty' }
export type { NonApplicableObjectProperties as '~NonApplicableObjectProperties' }
export type { NonApplicableStringProperties as '~NonApplicableStringProperties' }
export type { NonApplicableSymbolProperties as '~NonApplicableSymbolProperties' }
export type { NonApplicableThemeProperties as '~NonApplicableThemeProperties' }
export type { ParameterizedPseudoClassKey as '~ParameterizedPseudoClassKey' }
export type { ParameterizedPseudoElementKey as '~ParameterizedPseudoElementKey' }
export type { PseudoClassKey as '~PseudoClassKey' }
export type { PseudoElementKey as '~PseudoElementKey' }
export type { PseudoElementRecord as '~PseudoElementRecord' }
export type { ResolvableValue as '~ResolvableValue' }
export type { SourceValue as '~SourceValue' }
export type { StyleCard as '~StyleCard' }
export type { StyleConfig as '~StyleConfig' }
export type { StylexAttributes as '~StylexAttributes' }
export type { StylexProperties as '~StylexProperties' }

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * @public
 */
type StyleDeck<T extends StyleConfig = StyleConfig> =
  | StyleDeck<T>[]
  | StyleCard<T>
  | readonly [StyleCard<T>, InlineStyles]
  | Theme<VarGroup<{}>>
  | NonApplicableThemeProperties
  | NonApplicableObjectProperties
  | NonApplicableSymbolProperties
  | undefined

/**
 * @internal
 */
type StylexAttributes = ReturnType<(typeof stylex)['attrs']>

/**
 * @internal
 */
function mergeClassAttribute(
  originalClass: string,
  { class: compiledClass, ...attributes }: StylexAttributes,
): StylexAttributes {
  return {
    ...attributes,
    class: [
      originalClass,
      ...(compiledClass == null ? [] : [compiledClass]),
    ].join(' '),
  }
}

/**
 * @internal
 */
type StylexProperties = ReturnType<(typeof stylex)['props']>

/**
 * @internal
 */
function mergeClassProperty(
  originalClass: string,
  { className: compiledClass, ...properties }: StylexProperties,
): StylexProperties {
  return {
    ...properties,
    className: [
      originalClass,
      ...(compiledClass == null ? [] : [compiledClass]),
    ].join(' '),
  }
}

/**
 * Apply styles as props `{ className, style }`, or attrs `{ class, style }`.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <div
 *       {...apply(
 *         { color: 'blue' },
 *         styles.italic,
 *       )}>
 *       hello
 *     </div>
 *   )
 * }
 *
 * const styles = stylex.create({
 *   italic: {
 *     fontStyle: 'italic',
 *   }
 * })
 * ```
 *
 * @public
 */
const apply: (...styledeck: StyleDeck[]) => StylexProperties = macro

/**
 * Composes styles into a deck (`StyleDeck`) for component style props.
 *
 * @param styles - Style objects or `StyleDeck`
 * @returns Compiled deck (`StyleDeck`)
 *
 * @example
 * ```tsx
 * function Feed() {
 *   return (
 *     <Post styledeck={sheet({ color: 'blue' })} />
 *   )
 * }
 *
 * function Post({ styledeck }: { styledeck?: StyleDeck }) {
 *   return (
 *     <div
 *       {...apply(
 *         { color: 'black' },
 *         styledeck,
 *       )}
 *     >
 *       Lorem ipsum
 *     </div>
 *   )
 * }
 * ```
 *
 * @public
 */
const sheet: <T extends StyleDeck[]>(...styledeck: T) => T = macro

function macro(): never {
  throw new Error('macro was called at runtime')
}

/**
 * @internal
 */
type StyleCard<T extends StyleConfig> = {
  [TKey in keyof T]: TKey extends keyof PseudoElementRecord
    ? NonNullable<T[TKey]> extends infer U
      ?
          | {
              [UKey in keyof U]: SourceValue<Exclude<U[UKey], undefined | null>>
            }
          | CompiledValue<TKey, { [Key in keyof U]: U[Key] }>
      : never
    :
        | SourceValue<Exclude<T[TKey], undefined | null>>
        | CompiledValue<TKey, Exclude<T[TKey], undefined | null>>
}

/**
 * @internal
 */
type StyleConfig =
  | CommonProperties
  | CustomProperties
  | CompiledProperties
  | PseudoElementRecord

/**
 * @internal
 */
type PseudoElementRecord = Partial<
  Record<
    | Exclude<PseudoElementKey, Exclude<ParameterizedPseudoElementKey, '::cue'>>
    | `${ParameterizedPseudoElementKey}(${string})`,
    CommonProperties | CustomProperties | CompiledProperties
  >
>

/**
 * @internal
 */
type CustomProperties = Partial<Record<`--${string}`, {}>>

/**
 * @internal
 */
type CompiledProperties = Partial<Record<StyleXVar<unknown>, {}>>

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
type ResolvableValue<T> =
  | T
  | readonly T[]
  | (() => T | null | undefined)
  | null
  | undefined

/**
 * @internal
 */
type ContextualValue<T> = ({
  default: ResolvableValue<T>
} & {
  [Key in
    | PseudoClassKey
    | `${ParameterizedPseudoClassKey}(${string})`
    | AtRules
    | `${AtRules} ${string}`]?: ResolvableValue<T> | ContextualValue<T>
}) &
  NonApplicableObjectProperties &
  NonApplicableStringProperties

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
interface NonApplicableThemeProperties {
  /** @deprecated not applicable */ theme?: never
}

/**
 * @internal
 */
interface CompiledValue<K, V> {
  /** @deprecated not applicable */ _opaque: ClassNameFor<K, V>['_opaque']
  /** @deprecated not applicable */ _key: ClassNameFor<K, V>['_key']
  /** @deprecated not applicable */ _value: ClassNameFor<K, V>['_value'] | null
}

/**
 * @internal
 */
interface NonApplicableObjectProperties {
  /** @deprecated not applicable */ toString?: object['toString'] | undefined
  /** @deprecated not applicable */ valueOf?: object['valueOf'] | undefined
}

/**
 * @internal
 */
interface NonApplicableSymbolProperties {
  /** @deprecated not applicable */ description?: never
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
import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { InlineStyles } from '@stylexjs/stylex'
import type { Properties } from 'csstype'
import type { Pseudos } from 'csstype'
import type * as stylex from '@stylexjs/stylex'
import type { StyleXVar } from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import type { VarGroup } from '@stylexjs/stylex'
//
