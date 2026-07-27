describe('typeof defineStyleDeck', () => {
  it('rejects unknown non-custom properties', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          // @ts-expect-error
          foo: 'bar',
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          '::before': {
            // @ts-expect-error
            foo: 'bar',
          },
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown pseudo-elements', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          // @ts-expect-error
          '::foo': {
            color: 'red',
          },
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects invalid style values', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          textJustify: 'foo',
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          textJustify: () => 'foo',
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          textJustify: {
            default: 'foo',
          },
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects contextual styles without default value', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            ':focus': 'red',
          },
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
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
    }).toThrow(expect.any(Error))
  })

  it('rejects null value for non-default context', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            default: 'red',
            ':focus': null,
          },
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            default: 'red',

          // simulate when
          [Symbol("[when.ancestor(':hover')]")]: null,
          },
          // @ts-expect-error
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown contexts', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            default: null,
            // @ts-expect-error
            foo: 'bar',
          },
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown pseudo-classes)', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            default: null,
            // @ts-expect-error
            ':foo': 'bar',
          },
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects unknown at-rules)', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck({
          color: {
            default: null,
            // @ts-expect-error
            '@foo': 'bar',
          },
        } satisfies StyleDeck),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects closures as arguments', () => {
    expect(() => {
      assertType<StyleDeck>(
        defineStyleDeck(
          // @ts-expect-error
          () => ({
            color: 'red',
          }),
        ),
      )
    }).toThrow(expect.any(Error))
  })

  it('rejects properties outside config', () => {
    expect(() => {
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
    }).toThrow(expect.any(Error))

    expect(() => {
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
    }).toThrow(expect.any(Error))

    const styledeck: StyleDeck<{
      backgroundColor?: string
    }> = {}

    expect(() => {
      assertType<
        StyleDeck<{
          color?: string
        }>
      >(
        // @ts-expect-error
        defineStyleDeck(styledeck),
      )
    }).toThrow(expect.any(Error))

    expect(() => {
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
    }).toThrow(expect.any(Error))
  })
})

import { assertType } from 'vitest'
import { defineStyleDeck } from './styledeck.ts'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import type { defineStyleDeck as originalDefineStyleDeck } from './styledeck.ts'
import type { StyleDeck } from './types.ts'
//
