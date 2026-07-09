export { apply }
export { sheet }
export type { StyleDeck }

export type { Attrs as '~Attrs' }
export type { CommonProperties as '~CommonProperties' }
export type { CompiledProperties as '~CompiledProperties' }
export type { CompiledValue as '~CompiledValue' }
export type { ContextualKey as '~ContextualKey' }
export type { ContextualValue as '~ContextualValue' }
export type { CSSPropertiesWithExtras as '~CSSPropertiesWithExtras' }
export type { CustomProperties as '~CustomProperties' }
export type { LegacyPseudoElementKey as '~LegacyPseudoElementKey' }
export { mergeAttrs as '~mergeAttrs' }
export { mergeClassAttr as '~mergeClassAttr' }
export { mergeClassProp as '~mergeClassProp' }
export { mergeProps as '~mergeProps' }
export type { NonApplicableObjectProperties as '~NonApplicableObjectProperties' }
export type { NonApplicableStringProperties as '~NonApplicableStringProperties' }
export type { ParameterizedPseudoClassKey as '~ParameterizedPseudoClassKey' }
export type { ParameterizedPseudoElementKey as '~ParameterizedPseudoElementKey' }
export type { PseudoClassKey as '~PseudoClassKey' }
export type { PseudoElementKey as '~PseudoElementKey' }
export type { PseudoElementRecord as '~PseudoElementRecord' }
export type { ResolvableValue as '~ResolvableValue' }
export type { SourceValue as '~SourceValue' }
export type { StyleCard as '~StyleCard' }
export type { StyleConfig as '~StyleConfig' }
export type { StylingAttrs as '~StylingAttrs' }
export { toAttrs as '~toAttrs' }

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
function mergeAttrs(
  originalAttrs: Record<string, unknown>,
  compiledAttrs: Record<string, unknown>,
  classKey = 'class',
): Record<string, unknown> {
  // eslint-disable-next-line unicorn/no-unreadable-object-destructuring
  const { [classKey]: originalClass } = originalAttrs
  const { [classKey]: compiledClass, ...restCompiledAttrs } = compiledAttrs

  if (typeof originalClass === 'string') {
    return Object.fromEntries(
      Object.entries(originalAttrs).flatMap(([key, value]) => {
        if (key === classKey) {
          return [
            [
              key,
              typeof compiledClass === 'string'
                ? `${originalClass} ${compiledClass}`
                : originalClass,
            ],
            ...Object.entries(restCompiledAttrs),
          ]
        }

        return [[key, value]]
      }),
    )
  }

  if (originalClass != null && typeof compiledClass === 'string') {
    console.warn(
      `[styledeck/unapplied-styles] "${compiledClass}": original class value is not a string`,
    )

    return originalAttrs
  }

  return {
    ...originalAttrs,
    ...compiledAttrs,
  }
}

/**
 * @internal
 */
function mergeProps(
  original: Record<string, unknown>,
  compiled: Record<string, unknown>,
) {
  return mergeAttrs(original, compiled, 'className')
}

/**
 * @internal
 */
function mergeClassAttr(
  originalClass: string,
  compiledAttrs: Record<string, unknown>,
  classKey = 'class',
): StylingAttrs {
  const { [classKey]: compiledClass, ...restCompiledAttrs } = compiledAttrs

  return {
    [classKey]: [
      originalClass,
      ...(typeof compiledClass === 'string' ? [compiledClass] : []),
    ].join(' '),
    ...restCompiledAttrs,
  }
}

/**
 * @internal
 */

/**
 * @internal
 */
function mergeClassProp(
  originalClass: string,
  compiledProps: Record<string, unknown>,
) {
  return mergeClassAttr(originalClass, compiledProps, 'className')
}

/**
 * @internal
 */
function toAttrs(
  this: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...styles: any[]
): { [Key in keyof StylingAttrs]: StylingAttrs[Key] } {
  // eslint-disable-next-line unicorn/no-this-outside-of-class
  const { className, style, ...restProps } = toProps.apply(this, styles)

  return {
    /* v8 ignore start -- @preserve */
    ...(className != null && {
      class: className,
    }),
    /* v8 ignore stop -- @preserve */

    ...(style != null && {
      style: Object.entries(style)
        .map(([key, value]) => `${key}:${value.toString()}`)
        .join(';'),
    }),

    ...restProps,
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
const apply: (...styledeck: StyleDeck[]) => StylingAttrs = macro

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
              [UKey in keyof U]: SourceValue<U[UKey]>
            }
          | CompiledValue<TKey, { [Key in keyof U]: U[Key] }>
      : never
    : SourceValue<T[TKey]> | CompiledValue<TKey, T[TKey]>
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
  // TODO: remove null, it is needed only by sheet
  /** @deprecated not applicable */ _value: ClassNameFor<K, V>['_value'] | null
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
import { props as toProps } from '@stylexjs/stylex'
//
