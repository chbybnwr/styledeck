export { when }

// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const when = super_when as unknown as {
  [Key in keyof typeof super_when]: (
    selector: Selector,
    marker?: ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>,
  ) => symbol
}

import type { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import type { Selector } from './types'
import { when as super_when } from '@stylexjs/stylex'
