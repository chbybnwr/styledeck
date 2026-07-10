export { apply }
export { sheet }
export type { StyleDeck } from './types'

export type { Attrs as '~Attrs' } from './types'
export type { CommonProperties as '~CommonProperties' } from './types'
export type { CompiledProperties as '~CompiledProperties' } from './types'
export type { CompiledValue as '~CompiledValue' } from './types'
export type { ContextualKey as '~ContextualKey' } from './types'
export type { ContextualValue as '~ContextualValue' } from './types'
export type { CSSPropertiesWithExtras as '~CSSPropertiesWithExtras' } from './types'
export type { CustomProperties as '~CustomProperties' } from './types'
export type { LegacyPseudoElementKey as '~LegacyPseudoElementKey' } from './types'
export { mergeAttrs as '~mergeAttrs' }
export { mergeClassAttr as '~mergeClassAttr' }
export { mergeClassProp as '~mergeClassProp' }
export { mergeProps as '~mergeProps' }
export type { NonApplicableObjectProperties as '~NonApplicableObjectProperties' } from './types'
export type { NonApplicableStringProperties as '~NonApplicableStringProperties' } from './types'
export type { ParameterizedPseudoClassKey as '~ParameterizedPseudoClassKey' } from './types'
export type { ParameterizedPseudoElementKey as '~ParameterizedPseudoElementKey' } from './types'
export type { PseudoClassKey as '~PseudoClassKey' } from './types'
export type { PseudoElementKey as '~PseudoElementKey' } from './types'
export type { PseudoElementStyleConfig as '~PseudoElementStyleConfig' } from './types'
export type { ResolvableValue as '~ResolvableValue' } from './types'
export type { SourceValue as '~SourceValue' } from './types'
export type { StyleCard as '~StyleCard' } from './types'
export type { StyleConfig as '~StyleConfig' } from './types'
export type { StyleProperties as '~StyleProperties' } from './types'
export type { StylingAttrs as '~StylingAttrs' } from './types'
export { toAttrs as '~toAttrs' }

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

import type { StyleDeck } from './types'
import type { StylingAttrs } from './types'
import { props as toProps } from '@stylexjs/stylex'
//
