export { selector }
export { ancestor }
export { anySibling }
export { descendant }
export { siblingAfter }
export { siblingBefore }

export type { CreateAncestryHook }

/**
 * @public
 */
const selector: (
  selector: CSSSelector,
  ...selectors: CSSSelector[]
) => CSSHook = macro

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
  ...selectors: CSSSelector[]
) => CSSHook

import type { CSSHook } from './types'
import type { CSSSelector } from './types'
import type { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { macro } from './macros'
//
