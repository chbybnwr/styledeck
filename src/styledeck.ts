export { defineStyleDeck }

/**
 * @public
 */
const defineStyleDeck: <const T extends StyleDeck>(styleDeck: T) => T = macro

import { macro } from './macros.ts'
import type { StyleDeck } from './types.ts'
//
