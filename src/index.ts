export { apply }
export { sheet }
export type { StyleDeck }

export type { IsDynamicStyle as '~IsDynamicStyle' }
export type { LegacyPseudoClasses as '~LegacyPseudoClasses' }
export type { LegacyPseudoElements as '~LegacyPseudoElements' }
export type { MapDynamicStyle as '~MapDynamicStyle' }
export type { NonApplicableClassNameForProperties as '~NonApplicableClassNameForProperties' }
export type { NonApplicableStringProperties as '~NonApplicableStringProperties' }
export type { ParameterizedPseudoClasses as '~ParameterizedPseudoClasses' }
export type { ParameterizedPseudoElements as '~ParameterizedPseudoElements' }
export type { PseudoClasses as '~PseudoClasses' }
export type { PseudoElements as '~PseudoElements' }
export type { Style as '~Style' }
export type { StyleProperties as '~StyleProperties' }
export type { StylePropertiesWithExtras as '~StylePropertiesWithExtras' }
export type { StylePropertyValue as '~StylePropertyValue' }

/**
 * @public
 */
type StyleDeck = Style | Style[] | StyleDeck[]

/**
 * Apply styles as props `{ className, style }`.
 *
 * @param styles - Style objects or `StyleXStyles`
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
const apply: (...styles: Style[]) => ReturnType<typeof props> = macro

/**
 * Composes style objects into a sheet (`StyleXStyles`) for component style props.
 *
 * @param styles - Style objects or `StyleXStyles`
 * @returns Compiled sheet (`StyleXStyles`)
 *
 * @example
 * ```tsx
 * function Feed() {
 *   return (
 *     <Post style={sheet({ color: 'blue' })} />
 *   )
 * }
 *
 * function Post({ style }: { style?: StyleXStyles }) {
 *   return (
 *     <div
 *       {...apply(
 *         { color: 'black' },
 *         style,
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
const sheet: <StyleList extends unknown[]>(
  ...styles: { [Index in keyof StyleList]: StyleList[Index] & Style }
) => {
  [Index in keyof StyleList]: StyleList[Index] extends infer Style
    ? Style extends StyleXStyles
      ? Style
      : IsDynamicStyle<Style> extends true
        ? readonly [MapNamespace<MapDynamicStyle<Style>>, InlineStyles]
        : MapNamespace<Style>
    : never
} = macro

function macro(): never {
  throw new Error('macro was called at runtime')
}

/**
 * @private
 */
type Style =
  | {
      [Key in keyof StylePropertiesWithExtras]:
        | StylePropertiesWithExtras[Key]
        | false
        | null
    }
  | Record<StyleXVar<unknown>, StylePropertyValue | (() => StylePropertyValue)>
  | StyleXStyles<
      CSSPropertiesWithExtras &
        Omit<CSSProperties, keyof CSSPropertiesWithExtras>
    >

/**
 * @private
 */
type MapDynamicStyle<Value, Seen = never> = [Value] extends [Seen]
  ? Value
  : Value extends (...args: never[]) => infer Result
    ? MapDynamicStyle<Result, Seen | Value>
    : Value extends readonly unknown[]
      ? Value
      : Value extends object
        ? {
            [Key in keyof Value]: MapDynamicStyle<Value[Key], Seen | Value>
          }
        : Value

/**
 * @private
 */
type IsDynamicStyle<Value, Seen = never> = [Value] extends [Seen]
  ? false
  : Value extends (...args: never[]) => unknown
    ? true
    : Value extends readonly unknown[]
      ? false
      : Value extends object
        ? true extends {
            [Key in keyof Value]-?: IsDynamicStyle<Value[Key], Seen | Value>
          }[keyof Value]
          ? true
          : false
        : false

/**
 * @private
 */
type StylePropertiesWithExtras = StyleProperties &
  Record<
    | Exclude<PseudoElements, LegacyPseudoElements>
    | `${ParameterizedPseudoElements}(${string})`,
    | StyleProperties
    | NonApplicableStringProperties
    | NonApplicableClassNameForProperties
  > & {
    // legacy pseudo-elements
    /** @deprecated legacy */
    ':after'?: never
    /** @deprecated legacy */
    ':before'?: never
    /** @deprecated legacy */
    ':first-letter'?: never
    /** @deprecated legacy */
    ':first-line'?: never
    /** @deprecated legacy */
    ':-moz-placeholder'?: never
    /** @deprecated legacy */
    ':-ms-input-placeholder'?: never
  }

/**
 * @private
 */
type StyleProperties = {
  [Key in keyof CSSProperties]: StylePropertyValue<CSSProperties[Key] | null>
} & Omit<
  {
    [Key in keyof CSSPropertiesWithExtras]: StylePropertyValue<
      CSSPropertiesWithExtras[Key]
    >
  },
  keyof CSSProperties | `::${string}`
> &
  Record<`--${string}`, StylePropertyValue>

/**
 * @private
 */
type StylePropertyValue<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  T = {} | null,
> =
  | T
  | (() => T)
  | ({
      default: StylePropertyValue<T>
    } & {
      [Key in
        | Exclude<PseudoClasses, LegacyPseudoClasses>
        | `${ParameterizedPseudoClasses}(${string})`
        | AtRules
        | `${AtRules} ${string}`]?: StylePropertyValue<T>
    } & {
      // legacy pseudo-classes
      /** @deprecated legacy */
      ':-moz-any()'?: never
      /** @deprecated legacy */
      ':-webkit-any()'?: never
      /** @deprecated legacy */
      ':matches()'?: never
    })
  | NonApplicableClassNameForProperties
  | NonApplicableStringProperties
  | readonly string[]

/**
 * @private
 */
type PseudoClasses = Exclude<Pseudos, PseudoElements>

/**
 * @private
 */
type ParameterizedPseudoClasses =
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
type LegacyPseudoClasses = ':-moz-any()' | ':-webkit-any()' | ':matches()'

/**
 * @private
 */
type PseudoElements =
  | Extract<Pseudos, `::${string}`>
  | Exclude<Extract<keyof CSSPropertiesWithExtras, `::${string}`>, Pseudos>
  | LegacyPseudoElements

/**
 * @private
 */
type LegacyPseudoElements =
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

/**
 * @private
 */
type ParameterizedPseudoElements =
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
interface NonApplicableClassNameForProperties {
  /**
   * @type {import('@stylexjs/stylex').StyleXClassNameFor}
   */
  /** @deprecated non-applicable */
  _opaque?: never
  /** @deprecated non-applicable */
  _key?: never
  /** @deprecated non-applicable */
  _value?: never
}

/**
 * @private
 */
interface NonApplicableStringProperties {
  /**
   * @type {string}
   */
  /** @deprecated non-applicable */
  toString?: never
  /** @deprecated non-applicable */
  charAt?: never
  /** @deprecated non-applicable */
  charCodeAt?: never
  /** @deprecated non-applicable */
  concat?: never
  /** @deprecated non-applicable */
  indexOf?: never
  /** @deprecated non-applicable */
  lastIndexOf?: never
  /** @deprecated non-applicable */
  localeCompare?: never
  /** @deprecated non-applicable */
  match?: never
  /** @deprecated non-applicable */
  replace?: never
  /** @deprecated non-applicable */
  search?: never
  /** @deprecated non-applicable */
  slice?: never
  /** @deprecated non-applicable */
  split?: never
  /** @deprecated non-applicable */
  substring?: never
  /** @deprecated non-applicable */
  toLowerCase?: never
  /** @deprecated non-applicable */
  toLocaleLowerCase?: never
  /** @deprecated non-applicable */
  toUpperCase?: never
  /** @deprecated non-applicable */
  toLocaleUpperCase?: never
  /** @deprecated non-applicable */
  trim?: never
  /** @deprecated non-applicable */
  length?: never
  /** @deprecated non-applicable */
  valueOf?: never
  /** @deprecated non-applicable */
  codePointAt?: never
  /** @deprecated non-applicable */
  includes?: never
  /** @deprecated non-applicable */
  endsWith?: never
  /** @deprecated non-applicable */
  normalize?: never
  /** @deprecated non-applicable */
  repeat?: never
  /** @deprecated non-applicable */
  startsWith?: never
  /** @deprecated non-applicable */
  matchAll?: never
  /** @deprecated non-applicable */
  padStart?: never
  /** @deprecated non-applicable */
  padEnd?: never
  /** @deprecated non-applicable */
  trimEnd?: never
  /** @deprecated non-applicable */
  trimStart?: never
  /** @deprecated non-applicable */
  at?: never
  /** @deprecated non-applicable */
  replaceAll?: never
}

import type { AtRules } from 'csstype'
import type { Properties as CSSProperties } from 'csstype'
import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { InlineStyles } from '@stylexjs/stylex'
import type { MapNamespace } from '@stylexjs/stylex/lib/types/StyleXTypes'
import type { props } from '@stylexjs/stylex'
import type { Pseudos } from 'csstype'
import type { StyleXStyles } from '@stylexjs/stylex'
import type { StyleXVar } from '@stylexjs/stylex'
//
