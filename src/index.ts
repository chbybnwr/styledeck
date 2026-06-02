export { apply }
export { sheet }
export type { StyleDeck }

export type { StyleCard as '~StyleCard' }
export type { StyleConfig as '~PropertiesWithExtras' }
export type { PseudoElementRecord as '~PseudoElementRecord' }
export type { CustomProperties as '~CustomProperties' }
export type { CompiledProperties as '~CompiledProperties' }
export type { CommonProperties as '~CommonProperties' }
export type { SourceValue as '~SourceValue' }
export type { ResolvableValue as '~ResolvableValue' }
export type { ContextualValue as '~ContextualValue' }
export type { PseudoClassKey as '~PseudoClassKey' }
export type { ParameterizedPseudoClassKey as '~ParameterizedPseudoClassKey' }
export type { PseudoElementKey as '~PseudoElementKey' }
export type { ParameterizedPseudoElementKey as '~ParameterizedPseudoElementKey' }
export type { LegacyPseudoElementKey as '~LegacyPseudoElementKey' }
export type { CompiledValue as '~CompiledValue' }
export type { NonApplicableObjectProperties as '~NonApplicableObjectProperties' }
export type { NonApplicableStringProperties as '~NonApplicableStringProperties' }

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * @public
 */
type StyleDeck<T extends StyleConfig = StyleConfig> =
  | StyleDeck<T>[]
  | StyleCard<T>
  | readonly [StyleCard<T>, InlineStyles]
  | Theme<VarGroup<{}>>
  | NonApplicableObjectProperties
  | NonApplicableSymbolProperties

/**
 * Apply styles as props `{ className, style }`, or attrs `{ class, style }`.
 *
 * @param styledeck - Style objects or `StyleDeck`
 * @returns `ReturnType<typeof stylex.props>`
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
const apply: (...styledeck: StyleDeck[]) => ReturnType<typeof props> = macro

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
 * @private
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
 * @private
 */
type StyleConfig =
  | CommonProperties
  | CustomProperties
  | CompiledProperties
  | PseudoElementRecord

/**
 * @private
 */
type PseudoElementRecord = Partial<
  Record<
    | Exclude<PseudoElementKey, Exclude<ParameterizedPseudoElementKey, '::cue'>>
    | `${ParameterizedPseudoElementKey}(${string})`,
    CommonProperties | CustomProperties | CompiledProperties
  >
>

/**
 * @private
 */
type CustomProperties = Partial<Record<`--${string}`, {}>>

/**
 * @private
 */
type CompiledProperties = Partial<Record<StyleXVar<unknown>, {}>>

/**
 * @private
 */
type CommonProperties = Properties &
  Omit<CSSPropertiesWithExtras, keyof Properties | `::${string}`>

/**
 * @private
 */
type SourceValue<T> = false | ResolvableValue<T> | ContextualValue<T>

/**
 * @private
 */
type ResolvableValue<T> = null | T | (() => T) | readonly T[]

/**
 * @private
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
 * @private
 */
type PseudoClassKey = Exclude<
  Pseudos,
  PseudoElementKey | LegacyPseudoElementKey
>

/**
 * @private
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
 * @private
 */
type PseudoElementKey =
  | Extract<Pseudos, `::${string}`>
  | Extract<keyof CSSPropertiesWithExtras, `::${string}`>

/**
 * @private
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
 * @private
 */
type LegacyPseudoElementKey =
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

/**
 * @private
 */
interface CompiledValue<K, V> {
  /** @deprecated */ _opaque: StyleXClassNameFor<K, V>['_opaque']
  /** @deprecated */ _key: StyleXClassNameFor<K, V>['_key']
  /** @deprecated */ _value: StyleXClassNameFor<K, V>['_value'] | null
}

/**
 * @private
 */
interface NonApplicableObjectProperties {
  /** @deprecated */ toString?: object['toString']
  /** @deprecated */ valueOf?: object['valueOf']
}

/**
 * @private
 */
interface NonApplicableSymbolProperties {
  /** @deprecated */ description?: never
}

/**
 * @private
 */
interface NonApplicableStringProperties {
  /** @deprecated */ at?: never
  /** @deprecated */ charAt?: never
  /** @deprecated */ charCodeAt?: never
  /** @deprecated */ codePointAt?: never
  /** @deprecated */ concat?: never
  /** @deprecated */ endsWith?: never
  /** @deprecated */ includes?: never
  /** @deprecated */ indexOf?: never
  /** @deprecated */ lastIndexOf?: never
  /** @deprecated */ length?: never
  /** @deprecated */ localeCompare?: never
  /** @deprecated */ match?: never
  /** @deprecated */ matchAll?: never
  /** @deprecated */ normalize?: never
  /** @deprecated */ padEnd?: never
  /** @deprecated */ padStart?: never
  /** @deprecated */ repeat?: never
  /** @deprecated */ replace?: never
  /** @deprecated */ replaceAll?: never
  /** @deprecated */ search?: never
  /** @deprecated */ slice?: never
  /** @deprecated */ split?: never
  /** @deprecated */ startsWith?: never
  /** @deprecated */ substring?: never
  /** @deprecated */ toLocaleLowerCase?: never
  /** @deprecated */ toLocaleUpperCase?: never
  /** @deprecated */ toLowerCase?: never
  /** @deprecated */ toUpperCase?: never
  /** @deprecated */ trim?: never
  /** @deprecated */ trimEnd?: never
  /** @deprecated */ trimStart?: never
}

import type { AtRules } from 'csstype'
import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { InlineStyles } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { Properties } from 'csstype'
import { props } from '@stylexjs/stylex'
import type { Pseudos } from 'csstype'
import type { StyleXClassNameFor } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { StyleXVar } from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { VarGroup } from '@stylexjs/stylex/lib/types/StyleXTypes'
//
