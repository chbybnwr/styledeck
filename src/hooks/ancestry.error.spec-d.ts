describe('typeof CreateAncestryHook', () => {
  it('requires marker', () => {
    expect(() => {
      assertType<CSSHook>(
        // @ts-expect-error
        ancestor(),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown selector', () => {
    expect(() => {
      assertType<CSSHook>(
        ancestor(
          defaultMarker(),
          // @ts-expect-error
          'foo',
        ),
      )
    }).toThrow(expect.any(Error))
  })
})

void 0

import { ancestor } from './ancestry'
import { assertType } from 'vitest'
import type { CSSHook } from '../types'
import { defaultMarker } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
//
