export { selector }
export { ancestor }
export { anySibling }
export { descendant }
export { siblingAfter }
export { siblingBefore }

export type { CreateAncestryHook }
export type { Hook }
export type { HOOK }

/**
 * @public
 */
const selector: (selector: Selector, ...selectors: Selector[]) => Hook = macro

/**
 * @public
 */
const ancestor: CreateAncestryHook = macro

/**
 * @public
 */
const anySibling: CreateAncestryHook = macro

/**
 * @public
 */
const descendant: CreateAncestryHook = macro

/**
 * @public
 */
const siblingAfter: CreateAncestryHook = macro

/**
 * @public
 */
const siblingBefore: CreateAncestryHook = macro

/**
 * @internal
 */
type CreateAncestryHook = (
  marker: ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>,
  ...selectors: Selector[]
) => Hook

/**
 * @internal
 */
type Hook = symbol & {
  readonly [HOOK]: never
}

/**
 * @internal
 */
declare const HOOK: unique symbol

import type { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { macro } from './macros'
import type { Selector } from './types'
//
