describe('typeof selector', () => {
  it('returns selector', () => {
    expectTypeOf<ReturnType<typeof selector>>().toEqualTypeOf<CSSHook>()
  })

  it('accepts attribute selector', () => {
    expectTypeOf<Parameters<typeof selector>>().toEqualTypeOf<
      [selector: CSSSelector, ...selectors: CSSSelector[]]
    >()
  })
})

void 0

import type { CSSHook } from '../types'
import type { CSSSelector } from '../types'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector'
//
