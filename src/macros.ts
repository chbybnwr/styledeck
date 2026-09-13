export { apply }
export { sheet }
export { macro }
export type { StylingAttrs }

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
const apply: (...styledeck: readonly StyleDeck[]) => StylingAttrs = macro

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

type StylingAttrs = ReturnType<typeof attrs>

import type { attrs } from '@stylexjs/stylex'
import type { StyleDeck } from './types.ts'
//
