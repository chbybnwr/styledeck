export { mergeAttrs }
export { mergeClass }
export { mergeClassName }
export { mergeProps }
export { toAttrs }

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
function mergeClass(
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
function mergeClassName(
  originalClass: string,
  compiledProps: Record<string, unknown>,
) {
  return mergeClass(originalClass, compiledProps, 'className')
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

import type { StylingAttrs } from './types.ts'
import { props as toProps } from '@stylexjs/stylex'
//
