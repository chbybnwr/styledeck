/* eslint-disable max-lines */
export { apply }
export type { LegacyPseudoClasses }
export type { LegacyPseudoElements }
export type { NonApplicableClassNameForProperties }
export type { NonApplicableStringProperties }
export type { ParameterizedPseudoClasses }
export type { ParameterizedPseudoElements }
export type { PseudoClasses }
export type { PseudoElements }
export { sheet }
export type { Style }
export type { StyleProperties }
export type { StylePropertiesWithExtras }
export type { StylePropertyValue }

/**
 * Apply styles as props, e.g. `className` and `style`.
 *
 * @param args - One or more style objects or `StyleXStyles`
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
const apply: (...args: Style[]) => ReturnType<typeof props> = macro

/**
 * Composes style objects into a sheet (`StyleXStyles`) for component style props.
 *
 * @param args - One or more style objects or `StyleXStyles`
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
const sheet: <StyleList extends Style[]>(
  ...args: { [Index in keyof StyleList]: StyleList[Index] }
) => {
  [Index in keyof StyleList]: StyleList[Index] extends infer Style
    ? Style extends StyleXStyles
      ? Style
      : Style extends Record<string, () => unknown>
        ? readonly [
            MapNamespace<{
              [Key in keyof Style]: Style[Key] extends () => infer Result
                ? Result
                : Style[Key]
            }>,
            InlineStyles,
          ]
        : MapNamespace<Style>
    : never
} = macro

function macro(): never {
  throw new Error('macro was called at runtime')
}

/**
 * @public
 */
type Style =
  | {
      [Key in keyof StylePropertiesWithExtras]:
        | StylePropertiesWithExtras[Key]
        | (() => StylePropertiesWithExtras[Key])
        | false
        | null
    }
  | Record<StyleXVar<unknown>, StylePropertyValue | (() => StylePropertyValue)>
  | StyleXStyles<
      CSSPropertiesWithExtras &
        Omit<CSSProperties, keyof CSSPropertiesWithExtras>
    >

/**
 * @public
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
 * @public
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
 * @public
 */
type StylePropertyValue<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  T = {} | null,
> =
  | T
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
 * @public
 */
type PseudoClasses = Exclude<Pseudos, PseudoElements>

/**
 * @public
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
 * @public
 */
type LegacyPseudoClasses = ':-moz-any()' | ':-webkit-any()' | ':matches()'

/**
 * @public
 */
type PseudoElements =
  | Extract<Pseudos, `::${string}`>
  | Exclude<Extract<keyof CSSPropertiesWithExtras, `::${string}`>, Pseudos>
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
 * @public
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
 * @public
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
