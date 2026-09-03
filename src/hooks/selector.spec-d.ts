describe('typeof selector', () => {
  it('returns selector', () => {
    assertType<CSSHook>(selector(':focus', ':active'))
  })

  it('accepts attribute selector', () => {
    assertType<CSSHook>(selector('[disabled]', ':focus'))
  })

  it('accepts attribute selector with value', () => {
    assertType<CSSHook>(selector('[id="item-1"]', ':focus'))
  })
})

void 0

import { assertType } from 'vitest'
import type { CSSHook } from '../types'
import { describe } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector'
//
