describe('typeof selector', () => {
  it('requires one or more selectors', () => {
    expect(() => {
      assertType<CSSHook>(
        // @ts-expect-error
        selector(),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown selector', () => {
    expect(() => {
      assertType<CSSHook>(
        selector(
          ':focus',
          // @ts-expect-error
          'foo',
        ),
      )
    }).toThrow(expect.any(Error))
  })
})

void 0

import { assertType } from 'vitest'
import type { CSSHook } from '../types'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector'
//
