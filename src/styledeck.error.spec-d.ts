// oxlint-disable typescript/ban-ts-comment
const defineStyleDeck: typeof originalDefineStyleDeck = (styleDeck) => styleDeck

describe('typeof defineStyleDeck', () => {
  it('rejects unknown non-custom properties', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        // @ts-expect-error
        foo: 'bar',
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        '::before': {
          // @ts-expect-error
          foo: 'bar',
        },
      } satisfies StyleDeck),
    )
  })

  it('rejects unknown pseudo-elements', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        // @ts-expect-error
        '::foo': {
          color: 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('rejects invalid style values', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        textJustify: 'foo',
        // @ts-expect-error
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        textJustify: () => 'foo',
        // @ts-expect-error
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        textJustify: {
          default: 'foo',
        },
        // @ts-expect-error
      } satisfies StyleDeck),
    )
  })

  it('rejects contextual styles without default value', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          ':focus': 'red',
        },
        // @ts-expect-error
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '@container (width >= 1440)': {
            ':focus': 'red',
          },
        },
        // @ts-expect-error
      } satisfies StyleDeck),
    )
  })

  it('rejects null value for non-default context', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: 'red',
          ':focus': null,
        },
        // @ts-expect-error
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        cornerShape: null,
        color: {
          default: 'red',

          // simulate when
          [Symbol("[when.ancestor(':hover')]")]: null,
        },
        // @ts-expect-error
      } satisfies StyleDeck),
    )
  })

  it('rejects unknown contexts', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          // @ts-expect-error
          foo: 'bar',
        },
      } satisfies StyleDeck),
    )
  })

  it('rejects unknown pseudo-classes)', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          // @ts-expect-error
          ':foo': 'bar',
        },
      } satisfies StyleDeck),
    )
  })

  it('rejects unknown at-rules)', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          // @ts-expect-error
          '@foo': 'bar',
        },
      } satisfies StyleDeck),
    )
  })

  it('rejects closures as arguments', () => {
    assertType<StyleDeck>(
      defineStyleDeck(
        // @ts-expect-error
        () => ({
          color: 'red',
        }),
      ),
    )
  })

  it('rejects properties outside config', () => {
    assertType<
      StyleDeck<{
        color?: string
      }>
    >(
      // @ts-expect-error
      defineStyleDeck({
        backgroundColor: 'red',
      }),
    )

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(
      // @ts-expect-error
      defineStyleDeck([
        {
          backgroundColor: 'red',
        },
      ]),
    )

    const styledeck: StyleDeck<{
      backgroundColor?: string
    }> = {}

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(
      // @ts-expect-error
      defineStyleDeck(styledeck),
    )

    assertType<
      StyleDeck<{
        '::before'?: {
          color?: string
        }
      }>
    >(
      // @ts-expect-error
      defineStyleDeck({
        '::before': {
          backgroundColor: 'red',
        },
      }),
    )
  })
})

import { assertType } from 'vitest'
import { describe } from 'vitest'
import { it } from 'vitest'
import type { defineStyleDeck as originalDefineStyleDeck } from './styledeck.ts'
import type { StyleDeck } from './types.ts'
//
