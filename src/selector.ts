export { selector }
export { ancestor }
export { anySibling }
export { descendant }
export { siblingAfter }
export { siblingBefore }

export type { ANCESTRY_SELECTOR }
export type { AncestrySelector }
export type { CreateAncestrySelector }
export type { Selector }
export type { SELECTOR }

/**
 * @public
 */
const selector: (
  selector: SimpleSelector | AncestrySelector,
  ...selectors: SimpleSelector[]
) => Selector = macro

/**
 * @public
 */
const ancestor: CreateAncestrySelector = macro

/**
 * @public
 */
const anySibling: CreateAncestrySelector = macro

/**
 * @public
 */
const descendant: CreateAncestrySelector = macro

/**
 * @public
 */
const siblingAfter: CreateAncestrySelector = macro

/**
 * @public
 */
const siblingBefore: CreateAncestrySelector = macro

/**
 * @internal
 */
type CreateAncestrySelector = (
  marker: ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>,
) => AncestrySelector

/**
 * @internal
 */
type AncestrySelector = Selector & {
  readonly [ANCESTRY_SELECTOR]?: never
}

/**
 * @internal
 */
declare const ANCESTRY_SELECTOR: unique symbol

/**
 * @internal
 */
type Selector = symbol & {
  readonly [SELECTOR]?: never
}

/**
 * @internal
 */
declare const SELECTOR: unique symbol

import type { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { macro } from './macros'
import type { SimpleSelector } from './types'
