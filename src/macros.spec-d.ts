// oxlint-disable vitest/no-conditional-in-test

const tokens = defineVars({
  foo: null,
})

describe('typeof apply', () => {
  it('accepts standard properties', () => {
    assertType<StylingAttrs>(
      apply({
        color: 'red',
        textBoxEdge: 'cap ex',
        cornerShape: 'squircle',
      }),
    )
  })

  it('accepts custom properties', () => {
    assertType<StylingAttrs>(
      apply({
        '--custom': 'lorem',
        [tokens.foo]: 'ipsum',
      }),
    )

    assertType<StylingAttrs>(
      apply({
        '::before': {
          '--custom': 'lorem',
          [tokens.foo]: 'ipsum',
        },
      }),
    )
  })

  it('accepts pseudo-elements', () => {
    assertType<StylingAttrs>(
      apply({
        '::before': {
          color: 'red',
        },
      }),
    )
  })

  it('accepts pseudo-elements with params', () => {
    assertType<StylingAttrs>(
      apply({
        '::part(foo)': {
          color: 'red',
        },
      }),
    )
  })

  it('accepts conditional styles', () => {
    assertType<StylingAttrs>(
      apply({
        color: faker.datatype.boolean() && 'red',
        textBoxEdge: faker.datatype.boolean() && 'cap ex',
        cornerShape: faker.datatype.boolean() && 'squircle',
        '--custom': faker.datatype.boolean() && 'lorem',
        [tokens.foo]: faker.datatype.boolean() && 'ipsum',
        '::before': {
          color: faker.datatype.boolean() && 'red',
        },
      }),
    )

    assertType<StylingAttrs>(
      apply({
        color: faker.datatype.boolean() ? 'red' : null,
        textBoxEdge: faker.datatype.boolean() ? 'cap ex' : null,
        cornerShape: faker.datatype.boolean() ? 'squircle' : null,
        '--custom': faker.datatype.boolean() ? 'lorem' : null,
        [tokens.foo]: faker.datatype.boolean() ? 'ipsum' : null,
        '::before': {
          color: faker.datatype.boolean() ? 'red' : null,
        },
      }),
    )
  })

  it('accepts dynamic styles', () => {
    assertType<StylingAttrs>(
      apply({
        color: () => 'red',
        textBoxEdge: () => 'cap ex',
        cornerShape: () => 'squircle',
        '--custom': () => 'lorem',
        [tokens.foo]: () => 'ipsum',
        '::before': {
          color: () => 'red',
        },
      }),
    )
  })

  it('accepts contextual styles', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          ':focus': 'red',
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
      }),
    )
  })

  it('accepts combined contextual styles', () => {
    assertType<StylingAttrs>(
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
      }),
    )
  })

  it('accepts deep dynamic contextual values', () => {
    assertType<StylingAttrs>(
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
      }),
    )
  })

  it('accepts variable styles', () => {
    assertType<StylingAttrs>(
      apply({
        color: tokens.foo,
        textBoxEdge: tokens.foo,
        cornerShape: tokens.foo,
        '--custom': tokens.foo,
        [tokens.foo]: tokens.foo,
        '::before': {
          color: () => tokens.foo,
        },
      }),
    )
  })

  it('accepts typed variable styles', () => {
    const strictTokens = defineVars({
      foo: types.angle('360deg'),
    })

    assertType<StylingAttrs>(
      apply({
        color: strictTokens.foo,
        textBoxEdge: strictTokens.foo,
        cornerShape: strictTokens.foo,
        '--custom': strictTokens.foo,
        [strictTokens.foo]: strictTokens.foo,
        '::before': {
          color: () => strictTokens.foo,
        },
      }),
    )
  })

  it('accepts pseudo-classes', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          ':focus': 'red',
        },
      }),
    )
  })

  it('accepts pseudo-classes with params', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          ':dir(rtl)': 'red',
        },
      }),
    )
  })

  it('accepts at-rules', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          '@page': 'red',
        },
      }),
    )
  })

  it('accepts at-rules with params', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          '@container (width >= 1440)': 'red',
        },
      }),
    )
  })

  it('accepts StyleDeck', () => {
    const style: StyleDeck = {}

    assertType<StylingAttrs>(apply(style))

    assertType<StylingAttrs>(
      apply(style, {
        color: 'red',
      }),
    )
  })

  it('accepts stylex marker', () => {
    assertType<StylingAttrs>(apply(defaultMarker()))
  })

  it('can use selector', () => {
    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          [selector(':focus', ':active')]: 'red',
        },
      }),
    )

    assertType<StylingAttrs>(
      apply({
        color: {
          default: null,
          [ancestor(defaultMarker(), ':focus')]: 'red',
        },
      }),
    )
  })

  it('accepts styles with fallback', () => {
    assertType<StylingAttrs>(
      apply({
        position: firstThatWorks('sticky', '-webkit-sticky', 'fixed'),
      }),
    )
  })
})

describe('typeof sheet', () => {
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
    assertType<StylingAttrs>(
      apply(
        ...sheet(
          {
            color: 'red',
          },
          {
            backgroundColor: 'blue',
          },
        ),
      ),
    )

    assertType<StylingAttrs>(
      apply(
        ...sheet(
          {
            color: 'red',
          },
          {
            opacity: () => '0.5',
          },
        ),
      ),
    )
  })

  it('keeps array values as static leaf values', () => {
    assertType<StylingAttrs>(
      apply(
        ...sheet({
          fontFamily: ['Inter', 'sans-serif'],
        }),
      ),
    )
  })
})

import { ancestor } from './selector.ts'
import { apply } from './macros.ts'
import { assertType } from 'vitest'
import { create } from '@stylexjs/stylex'
import { defaultMarker } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { faker } from '@faker-js/faker'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import { selector } from './selector.ts'
import { sheet } from './macros.ts'
import type { StyleDeck } from './types.ts'
import type { StylingAttrs } from './macros.ts'
import { types } from '@stylexjs/stylex'
//
