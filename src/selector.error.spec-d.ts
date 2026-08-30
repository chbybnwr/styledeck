describe('typeof selector', () => {
  it('requires one or more selectors', () => {
    expect(() => {
      assertType<Hook>(
        // @ts-expect-error
        selector(),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown selector', () => {
    expect(() => {
      assertType<Hook>(
        selector(
          ':focus',
          // @ts-expect-error
          'foo',
        ),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown symbolic selector', () => {
    expect(() => {
      assertType<Hook>(
        selector(
          ':focus',
          // @ts-expect-error
          Symbol('invalid selector'),
        ),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects ancestry selector if it is not the first argument', () => {
    expect(() => {
      assertType<Hook>(
        selector(
          ':focus',
          // @ts-expect-error
          ancestor(defaultMarker()),
        ),
      )
    }).toThrow(expect.any(Error))
  })
})

void 0

import { ancestor } from './selector'
import { assertType } from 'vitest'
import { defaultMarker } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expect } from 'vitest'
import type { Hook } from './selector'
import { it } from 'vitest'
import { selector } from './selector'
//
