describe('StyleDeck', () => {
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

  it('rejects unknown contexts', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        // @ts-expect-error
        foo: 'bar',
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
  })
})

import { assertType } from 'vitest'
import { describe } from 'vitest'
import { it } from 'vitest'
import type { StyleDeck } from './index.ts'
//
