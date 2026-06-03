/* eslint-disable vitest/expect-expect */

const tokens = defineVars({
  foo: null,
})

describe('apply', () => {
  it('accepts standard properties', () => {
    apply({
      color: 'red',
      textBoxEdge: 'cap ex',
      cornerShape: 'squircle',
    })
  })

  it('accepts custom properties', () => {
    apply({
      '--custom': 'lorem',
      [tokens.foo]: 'ipsum',
    })
    apply({
      '::before': {
        '--custom': 'lorem',
        [tokens.foo]: 'ipsum',
      },
    })
  })

  it('accepts pseudo-elements', () => {
    apply({
      '::before': {
        color: 'red',
      },
    })
  })

  it('accepts pseudo-elements with params', () => {
    apply({
      '::part(foo)': {
        color: 'red',
      },
    })
  })

  it('accepts conditional styles', () => {
    // eslint-disable-next-line no-unassigned-vars
    let condition!: boolean

    apply({
      color: condition && 'red',
      textBoxEdge: condition && 'cap ex',
      cornerShape: condition && 'squircle',
      '--custom': condition && 'lorem',
      [tokens.foo]: condition && 'ipsum',
      '::before': {
        color: condition && 'red',
      },
    })

    apply({
      color: condition ? 'red' : null,
      textBoxEdge: condition ? 'cap ex' : null,
      cornerShape: condition ? 'squircle' : null,
      '--custom': condition ? 'lorem' : null,
      [tokens.foo]: condition ? 'ipsum' : null,
      '::before': {
        color: condition ? 'red' : null,
      },
    })
  })

  it('accepts dynamic styles', () => {
    apply({
      color: () => 'red',
      textBoxEdge: () => 'cap ex',
      cornerShape: () => 'squircle',
      '--custom': () => 'lorem',
      [tokens.foo]: () => 'ipsum',
      '::before': {
        color: () => 'red',
      },
    })
  })

  it('accepts contextual styles', () => {
    apply({
      color: {
        default: null,
        ':focus': 'red',
        [tokens.foo]: tokens.foo,
      },
      textBoxEdge: {
        default: null,
        ':focus': 'cap ex',
      },
      cornerShape: {
        default: null,
        ':focus': 'squircle',
      },
      '--custom': {
        default: null,
        ':focus': 'lorem',
      },
      [tokens.foo]: {
        default: null,
        ':focus': 'ipsum',
      },
      '::before': {
        color: {
          default: null,
          ':focus': 'red',
        },
      },
    })
  })

  it('accepts combined contextual styles', () => {
    apply({
      color: {
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'red',
        },
      },
      textBoxEdge: {
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'cap ex',
        },
      },
      cornerShape: {
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'squircle',
        },
      },
      '--custom': {
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'lorem',
        },
      },
      [tokens.foo]: {
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'ipsum',
        },
      },
      '::before': {
        color: {
          default: null,
          '@container (width >= 1440px)': {
            default: null,
            ':focus': 'red',
          },
        },
      },
    })
  })

  it('accepts deep dynamic contextual values', () => {
    apply({
      color: {
        default: () => 'red',
        '@container (width >= 1440px)': {
          default: () => 'green',
          ':focus': () => 'blue',
        },
      },
      '::before': {
        color: {
          default: () => 'orange',
          ':focus': () => 'yellow',
        },
      },
    })
  })

  it('accepts variable styles', () => {
    apply({
      color: tokens.foo,
      textBoxEdge: tokens.foo,
      cornerShape: tokens.foo,
      '--custom': tokens.foo,
      [tokens.foo]: tokens.foo,
      '::before': {
        color: () => tokens.foo,
      },
    })
  })

  it('accepts typed variable styles', () => {
    const strictTokens = defineVars({
      foo: types.angle('360deg'),
    })

    apply({
      color: strictTokens.foo,
      textBoxEdge: strictTokens.foo,
      cornerShape: strictTokens.foo,
      '--custom': strictTokens.foo,
      [strictTokens.foo]: strictTokens.foo,
      '::before': {
        color: () => strictTokens.foo,
      },
    })
  })

  it('accepts pseudo-classes', () => {
    apply({
      color: {
        default: null,
        ':focus': 'red',
      },
    })
  })

  it('accepts pseudo-classes with params', () => {
    apply({
      color: {
        default: null,
        ':dir(rtl)': 'red',
      },
    })
  })

  it('accepts at-rules', () => {
    apply({
      color: {
        default: null,
        '@page': 'red',
      },
    })
  })

  it('accepts at-rules with params', () => {
    apply({
      color: {
        default: null,
        '@container (width >= 1440)': 'red',
      },
    })
  })

  it('accepts StyleDeck', () => {
    // eslint-disable-next-line no-unassigned-vars
    let style!: StyleDeck

    apply(style)

    apply(style, {
      color: 'red',
    })
  })

  it('accepts stylex marker', () => {
    apply(defaultMarker())
  })

  it('can access ancestor', () => {
    apply({
      color: {
        default: null,
        [when.ancestor(':hover')]: 'red',
      },
    })
  })

  it('accepts styles with fallback', () => {
    apply({
      position: firstThatWorks('sticky', '-webkit-sticky', 'fixed'),
    })
  })
})

describe('sheet', () => {
  it('returns StyleDeck', () => {
    expectTypeOf(
      sheet({
        color: 'red',
      }),
    ).toExtend<
      StyleDeck<{
        color?: 'red'
      }>
    >()

    expectTypeOf(
      sheet({
        color: () => 'red',
      }),
    ).toExtend<
      StyleDeck<{
        color?: 'red'
      }>
    >()

    expectTypeOf(
      sheet({
        color: {
          default: 'red',
          ':focus': 'blue',
        },
      }),
    ).toExtend<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >()

    expectTypeOf(
      sheet({
        color: {
          default: () => 'red',
          ':focus': 'blue',
        },
      }),
    ).toExtend<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >()

    expectTypeOf(
      sheet({
        color: {
          default: () => 'red',
          '@container (width > 1440px)': {
            default: 'green',
            ':focus': 'blue',
          },
        },
      }),
    ).toExtend<
      StyleDeck<{
        color?: 'red' | 'green' | 'blue'
      }>
    >()

    const { foo } = create({
      foo: {
        color: 'red',
      },
    })

    expectTypeOf(sheet(foo)).toExtend<
      StyleDeck<{
        color?: 'red'
      }>
    >()

    const { bar } = create({
      bar: (color: string) => ({
        color,
      }),
    })

    expectTypeOf(sheet(bar('red'))).toExtend<
      StyleDeck<{
        color?: string
      }>
    >()
  })

  it('accepts variadic style inputs', () => {
    apply(
      ...sheet(
        {
          color: 'red',
        },
        {
          backgroundColor: 'blue',
        },
      ),
    )

    apply(
      ...sheet(
        {
          color: 'red',
        },
        {
          opacity: () => '0.5',
        },
      ),
    )
  })

  it('keeps array values as static leaf values', () => {
    apply(
      ...sheet({
        fontFamily: ['Inter', 'sans-serif'],
      }),
    )
  })
})

import { apply } from './index.ts'
import { create } from '@stylexjs/stylex'
import { defaultMarker } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import { sheet } from './index.ts'
import type { StyleDeck } from './index.ts'
import { types } from '@stylexjs/stylex'
import { when } from '@stylexjs/stylex'
//
