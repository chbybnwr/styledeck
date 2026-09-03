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
      ] satisfies StyleDeck),
    )
  })

  it('accepts standard properties', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: 'red',
        textBoxEdge: 'cap ex',
      } satisfies StyleDeck),
    )
  })

  it('accepts custom properties', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        [tokens.foo]: 'ipsum',
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        '::before': {
          [tokens.foo]: 'ipsum',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts pseudo-elements', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        '::before': {
          color: 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts pseudo-elements with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        '::part(foo)': {
          color: 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts conditional styles', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: faker.datatype.boolean() && 'red',
        textBoxEdge: faker.datatype.boolean() && 'cap ex',
        [tokens.foo]: faker.datatype.boolean() && 'ipsum',
        '::before': {
          color: faker.datatype.boolean() && 'red',
        },
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        color: faker.datatype.boolean() ? 'red' : null,
        textBoxEdge: faker.datatype.boolean() ? 'cap ex' : null,
        [tokens.foo]: faker.datatype.boolean() ? 'ipsum' : null,
        '::before': {
          color: faker.datatype.boolean() ? 'red' : null,
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts dynamic styles', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: () => 'red',
        textBoxEdge: () => 'cap ex',
        [tokens.foo]: () => 'ipsum',
        '::before': {
          color: () => 'red',
        },
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
    )
  })

  it('accepts variable styles', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: tokens.foo,
        textBoxEdge: tokens.foo,
        [tokens.foo]: tokens.foo,
        '::before': {
          color: () => tokens.foo,
        },
      } satisfies StyleDeck),
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
        [strictTokens.foo]: strictTokens.foo,
        '::before': {
          color: () => strictTokens.foo,
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts pseudo-classes', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          ':focus': 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts pseudo-classes with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          ':dir(rtl)': 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts at-rules', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '@page': 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts at-rules with params', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          '@container (width >= 1440)': 'red',
        },
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
    )
  })

  it('accepts stylex styles', () => {
    const { foo } = create({
      foo: {
        color: 'red',
        backgroundColor: null,
      },
    })

    assertType<StyleDeck>(defineStyleDeck(foo satisfies StyleDeck))
    assertType<StyleDeck>(
      defineStyleDeck([foo, { color: 'red' }] satisfies StyleDeck),
    )
  })

  it('accepts stylex marker', () => {
    assertType<StyleDeck>(defineStyleDeck(defaultMarker() satisfies StyleDeck))
  })

  it('accepts stylex theme', () => {
    const themeVar = defineVars({ foo: 'bar' })

    const theme = createTheme(themeVar, {
      foo: 'quux',
    })

    assertType<StyleDeck>(defineStyleDeck(theme satisfies StyleDeck))
    assertType<StyleDeck>(defineStyleDeck([theme] satisfies StyleDeck))
  })

  it('can use compound selector', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          [selector(':focus', ':active')]: 'red',
        },
      } satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck({
        color: {
          default: null,
          [(ancestor(defaultMarker()), ':focus')]: 'red',
        },
      } satisfies StyleDeck),
    )
  })

  it('accepts styles with fallback', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        position: firstThatWorks('sticky', '-webkit-sticky', 'fixed'),
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
    )

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(
      defineStyleDeck({
        color: () => 'red',
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
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
      } satisfies StyleDeck),
    )

    assertType<
      StyleDeck<{
        color?: 'red' | 'green' | 'blue'
      }>
    >(
      defineStyleDeck({
        color: {
          default: null,
          ':focus': 'red',
          '@container (width > 1440px)': {
            default: 'green',
            ':focus': 'blue',
          },
        },
      } satisfies StyleDeck),
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
    >(defineStyleDeck(foo satisfies StyleDeck))

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(defineStyleDeck([foo, [foo]] satisfies StyleDeck))

    const { bar } = create({
      bar: (color: string) => ({
        color,
      }),
    })

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(defineStyleDeck(bar('red') satisfies StyleDeck))

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(defineStyleDeck([bar('red'), [bar('red')]] satisfies StyleDeck))
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
      ] satisfies StyleDeck),
    )

    assertType<StyleDeck>(
      defineStyleDeck([
        {
          color: 'red',
        },
        {
          opacity: () => faker.number.float(),
        },
      ] satisfies StyleDeck),
    )
  })

  it('keeps array values as static leaf values', () => {
    assertType<StyleDeck>(
      defineStyleDeck({
        fontFamily: ['Inter', 'sans-serif'],
      } satisfies StyleDeck),
    )
  })
})

import { ancestor } from './hooks/ancestry.ts'
import { assertType } from 'vitest'
import { create } from '@stylexjs/stylex'
import { createTheme } from '@stylexjs/stylex'
import { defaultMarker } from '@stylexjs/stylex'
import { defineStyleDeck } from './styledeck.ts'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { faker } from '@faker-js/faker'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import { selector } from './hooks/selector.ts'
import type { StyleDeck } from './types.ts'
import { types } from '@stylexjs/stylex'
//
