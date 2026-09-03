export { selector }

/**
 * @public
 */
const selector: (
  selector: CSSSelector,
  ...selectors: CSSSelector[]
) => CSSHook = macro

import type { CSSHook } from '#/types'
import type { CSSSelector } from '#/types'
import { macro } from '#/macros'
//
