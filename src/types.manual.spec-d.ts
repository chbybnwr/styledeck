describe('typeof StyleDeck', () => {
  it('accepts contextual styles for custom properties', async ({
    annotate,
  }) => {
    expect.hasAssertions()

    await annotate(
      'You need to manually check whether autocomplete for selector like ":focus" works in editor',
    )

    expect(() => {
      const themeVar = defineVars({
        foo: 'bar',
      })

      assertType<StyleDeck>({
        '--custom': {
          default: null,
          ':focus': 'lorem',
        },
        [themeVar.foo]: {
          default: null,
          ':focus': 'ipsum',
        },
      })
    }).toThrow(expect.any(Error))
  })
})

import { assertType } from 'vitest'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import type { StyleDeck } from './types'
