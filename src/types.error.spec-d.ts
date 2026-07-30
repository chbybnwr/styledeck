describe('type StyleDeck', () => {
  it('rejects unknown non-custom properties', () => {
    assertType<StyleDeck>({
      // @ts-expect-error
      foo: 'bar',
    })

    assertType<StyleDeck>({
      '::before': {
        // @ts-expect-error
        foo: 'bar',
      },
    })
  })

  it('rejects unknown pseudo-elements', () => {
    assertType<StyleDeck>({
      // @ts-expect-error
      '::foo': {
        color: 'red',
      },
    })
  })

  it('rejects invalid style values', () => {
    // @ts-expect-error
    assertType<StyleDeck>({
      textJustify: 'foo',
    })

    // @ts-expect-error
    assertType<StyleDeck>({
      textJustify: () => 'foo',
    })

    // @ts-expect-error
    assertType<StyleDeck>({
      textJustify: {
        default: 'foo',
      },
    })
  })

  it('rejects contextual styles without default value', () => {
    // @ts-expect-error
    assertType<StyleDeck>({
      color: {
        ':focus': 'red',
      },
    })

    // @ts-expect-error
    assertType<StyleDeck>({
      color: {
        default: null,
        '@container (width >= 1440)': {
          ':focus': 'red',
        },
      },
    })
  })

  it('rejects null value for non-default context', () => {
    // @ts-expect-error
    assertType<StyleDeck>({
      color: {
        default: 'red',
        ':focus': null,
      },
    })

    expect(() => {
      // @ts-expect-error
      assertType<StyleDeck>({
        cornerShape: null,
        color: {
          default: 'red',
          [selector(ancestor(defaultMarker()), ':focus')]: null,
        },
      })
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown contexts', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        // @ts-expect-error
        foo: 'bar',
      },
    })
  })

  it('rejects literal compound selector', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        // @ts-expect-error
        ':focus:hover': 'bar',
      },
    })
  })

  it('rejects unknown pseudo-classes)', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        // @ts-expect-error
        ':foo': 'bar',
      },
    })
  })

  it('rejects unknown at-rules)', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        // @ts-expect-error
        '@foo': 'bar',
      },
    })
  })

  it('rejects closures as arguments', () => {
    assertType<StyleDeck>(
      // @ts-expect-error
      () => ({
        color: 'red',
      }),
    )
  })

  it('rejects properties outside config', () => {
    assertType<
      StyleDeck<{
        color?: string
      }>
    >({
      // @ts-expect-error
      backgroundColor: 'red',
    })

    assertType<
      StyleDeck<{
        color?: string
      }>
    >([
      {
        // @ts-expect-error
        backgroundColor: 'red',
      },
    ])

    const styledeck: StyleDeck<{
      backgroundColor?: string
    }> = {}

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(
      // @ts-expect-error
      styledeck,
    )

    assertType<
      StyleDeck<{
        '::before'?: {
          color?: string
        }
      }>
    >({
      '::before': {
        // @ts-expect-error
        backgroundColor: 'red',
      },
    })
  })

  // oxlint-disable-next-line vitest/warn-todo
  it.todo('rejects unknown selector on custom properties', () => {
    assertType<StyleDeck>({
      '--foo': {
        default: null,
        // // @ts-expect-error
        foo: 'bar',
      },
    })
  })

  // oxlint-disable-next-line vitest/warn-todo
  it.todo('rejects unknown selector on compiled custom properties', () => {
    expect(() => {
      const themeVar = defineVars({
        foo: 'red',
      })

      assertType<StyleDeck>({
        [themeVar.foo]: {
          default: null,
          // // @ts-expect-error
          foo: 'bar',
        },
      })
    }).toThrow(expect.any(Error))
  })
})

import { ancestor } from './selector.ts'
import { assertType } from 'vitest'
import { defaultMarker } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector.ts'
import type { StyleDeck } from './types.ts'
//
