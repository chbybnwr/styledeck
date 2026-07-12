export { when }

const when = super_when as unknown as {
  [Key in keyof typeof stylex.when]: (
    selector: Selector,
    marker?:
      | ReturnType<typeof stylex.defaultMarker>
      | ReturnType<typeof stylex.defineMarker>,
  ) => symbol
}

import type { Selector } from './types'
import type * as stylex from '@stylexjs/stylex'
import { when as super_when } from '@stylexjs/stylex'
