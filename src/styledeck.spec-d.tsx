// oxlint-disable vitest/no-conditional-in-test

const tokens = defineVars({
  foo: 'blue',
})

describe('typeof defineStyleDeck', () => {
  it('accepts undefined when using array', () => {
    const props: {
      styleDeck?: StyleDeck
    } = {}

    assertType<StyleDeck>(
      defineStyleDeck([
        { color: 'red' },
        props.styleDeck,
        //
      ]),
    )
  })

  it('accepts standard properties', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: 'red',
        textBoxEdge: 'cap ex',
        cornerShape: 'squircle',
      }),
    )
  })

  it('accepts custom properties', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        '--custom': 'lorem',
        [tokens.foo]: 'ipsum',
      }),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        '::before': {
          '--custom': 'lorem',
          [tokens.foo]: 'ipsum',
        },
      }),
    )
  })

  it('accepts pseudo-elements', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        '::before': {
          color: 'red',
        },
      }),
    )
  })

  it('accepts pseudo-elements with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        '::part(foo)': {
          color: 'red',
        },
      }),
    )
  })

  it('accepts conditional styles', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
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

    assertType<StyleDeck>(
      defineStyleDeck({
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
    assertType<StyleDeck>(
      defineStyleDeck({
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
    const atDark = '@media (prefers-color-scheme: dark)'

    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          ':focus': 'red',
          [atDark]: tokens.foo,
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
    assertType<StyleDeck>(
      defineStyleDeck({
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
    assertType<StyleDeck>(
      defineStyleDeck({
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
    assertType<StyleDeck>(
      defineStyleDeck({
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

  it('accepts strict-typed variable styles', () => {
    const strictTokens = defineVars({
      foo: types.angle('360deg'),
    })

    assertType<StyleDeck>(
      defineStyleDeck({
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
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          ':focus': 'red',
        },
      }),
    )
  })

  it('accepts pseudo-classes with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          ':dir(rtl)': 'red',
        },
      }),
    )
  })

  it('accepts at-rules', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '@page': 'red',
        },
      }),
    )
  })

  it('accepts at-rules with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '@container (width >= 1440)': 'red',
        },
      }),
    )
  })

  it('accepts attribute selectors', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '[disabled]': 'red',
          '[value="foo"]': 'red',
        },
      }),
    )
  })

  it('accepts stylex styles', () => {
    const { foo } = create({
      foo: {
        color: 'red',
        backgroundColor: null,
      },
    })

    assertType<StyleDeck>(defineStyleDeck(foo))
    assertType<StyleDeck>(defineStyleDeck([foo, { color: 'red' }]))
  })

  it('accepts stylex marker', () => {
    assertType<StyleDeck>(defineStyleDeck(defaultMarker()))
  })

  it('accepts stylex theme', () => {
    const themeVar = defineVars({ foo: 'bar' })

    const theme = createTheme(themeVar, {
      foo: 'quux',
    })

    assertType<StyleDeck>(defineStyleDeck(theme))
    assertType<StyleDeck>(defineStyleDeck([theme]))
  })

  it('can use selector', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          [selector(ancestor(defaultMarker()), ':hover')]: 'red',
        },
      }),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          [selector(ancestor(defaultMarker()), ':hover')]: 'red',
          [selector(descendant(defaultMarker()), ':focus')]: 'blue',
        },
      }),
    )
  })

  it('accepts styles with fallback', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        position: firstThatWorks('sticky', '-webkit-sticky', 'fixed'),
      }),
    )
  })

  it('accepts defined properties', () => {
    assertType<
      StyleDeck<{
        color?: string
      }>
    >(
      defineStyleDeck({
        color: 'red',
      }),
    )

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(
      defineStyleDeck({
        color: () => 'red',
      }),
    )

    assertType<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >(
      defineStyleDeck({
        color: {
          default: null,
          ':active': 'red',
          ':focus': 'blue',
        },
      }),
    )

    assertType<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >(
      defineStyleDeck({
        color: {
          default: null,
          ':active': () => 'red',
          ':focus': faker.datatype.boolean() ? 'blue' : 'red',
        },
      }),
    )

    assertType<
      StyleDeck<{
        color?: 'red' | 'green' | 'blue'
      }>
    >(
      defineStyleDeck({
        color: {
          default: null,
          '@container (width > 1440px)': {
            default: 'green',
            ':focus': 'blue',
          },
        },
      }),
    )

    assertType<
      StyleDeck<{
        '--color'?: string
      }>
    >(
      defineStyleDeck({
        '--color': 'red',
      }),
    )

    const { foo } = create({
      foo: {
        color: 'red',
      },
    })

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(defineStyleDeck(foo))

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(defineStyleDeck([foo, [foo]]))

    const { bar } = create({
      bar: (color: string) => ({
        color,
      }),
    })

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(defineStyleDeck(bar('red')))

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(defineStyleDeck([bar('red'), [bar('red')]]))
  })

  it('accepts variadic style inputs', () => {
    assertType<StyleDeck>(
      defineStyleDeck([
        {
          color: 'red',
        },
        {
          backgroundColor: 'blue',
        },
      ]),
    )

    assertType<StyleDeck>(
      defineStyleDeck([
        {
          color: 'red',
        },
        {
          opacity: () => faker.number.float(),
        },
      ]),
    )
  })

  it('keeps array values as static leaf values', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        fontFamily: ['Inter', 'sans-serif'],
      }),
    )
  })
})

import { ancestor } from './selector.ts'
import { assertType } from 'vitest'
import { create } from '@stylexjs/stylex'
import { createTheme } from '@stylexjs/stylex'
import { defaultMarker } from '@stylexjs/stylex'
import { defineStyleDeck } from './styledeck.ts'
import { defineVars } from '@stylexjs/stylex'
import { descendant } from './selector.ts'
import { describe } from 'vitest'
import { faker } from '@faker-js/faker'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import { selector } from './selector.ts'
import type { StyleDeck } from './types.ts'
import { types } from '@stylexjs/stylex'
//
