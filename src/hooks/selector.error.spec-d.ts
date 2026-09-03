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

  it('rejects unknown symbolic selector', () => {
    expect(() => {
      assertType<CSSHook>(
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
      assertType<CSSHook>(
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

import { ancestor } from './ancestry'
import { assertType } from 'vitest'
import type { CSSHook } from '../types'
import { defaultMarker } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector'
//
