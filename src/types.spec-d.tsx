// oxlint-disable vitest/no-conditional-in-test

const tokens = defineVars({
  foo: 'blue',
})

describe('type StyleDeck', () => {
  it('accepts undefined when using array', () => {
    const props: {
      styleDeck?: StyleDeck
    } = {}

    assertType<StyleDeck>([
      { color: 'red' },
      props.styleDeck,
      //
    ])
  })

  it('accepts standard properties', () => {
    assertType<StyleDeck>({
      color: 'red',
      textBoxEdge: 'cap ex',
    })
  })

  it('accepts custom properties', () => {
    assertType<StyleDeck>({
      [tokens.foo]: 'ipsum',
    })

    assertType<StyleDeck>({
      '::before': {
        [tokens.foo]: 'ipsum',
      },
    })
  })

  it('accepts pseudo-elements', () => {
    assertType<StyleDeck>({
      '::before': {
        color: 'red',
      },
    })
  })

  it('accepts pseudo-elements with params', () => {
    assertType<StyleDeck>({
      '::part(foo)': {
        color: 'red',
      },
    })
  })

  it('accepts conditional styles', () => {
    assertType<StyleDeck>({
      color: faker.datatype.boolean() && 'red',
      textBoxEdge: faker.datatype.boolean() && 'cap ex',
      [tokens.foo]: faker.datatype.boolean() && 'ipsum',
      '::before': {
        color: faker.datatype.boolean() && 'red',
      },
    })

    assertType<StyleDeck>({
      color: faker.datatype.boolean() ? 'red' : null,
      textBoxEdge: faker.datatype.boolean() ? 'cap ex' : null,
      [tokens.foo]: faker.datatype.boolean() ? 'ipsum' : null,
      '::before': {
        color: faker.datatype.boolean() ? 'red' : null,
      },
    })
  })

  it('accepts dynamic styles', () => {
    assertType<StyleDeck>({
      color: () => 'red',
      textBoxEdge: () => 'cap ex',
      [tokens.foo]: () => 'ipsum',
      '::before': {
        color: () => 'red',
      },
    })
  })

  it('accepts contextual styles', () => {
    const atDark = '@media (prefers-color-scheme: dark)'

    assertType<StyleDeck>({
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
    })
  })

  it('accepts combined contextual styles', () => {
    assertType<StyleDeck>({
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
    })
  })

  it('accepts deep dynamic contextual values', () => {
    assertType<StyleDeck>({
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
    assertType<StyleDeck>({
      color: tokens.foo,
      textBoxEdge: tokens.foo,
      [tokens.foo]: tokens.foo,
      '::before': {
        color: () => tokens.foo,
      },
    })
  })

  it('accepts strict-typed variable styles', () => {
    const strictTokens = defineVars({
      foo: types.angle('360deg'),
    })

    assertType<StyleDeck>({
      color: strictTokens.foo,
      textBoxEdge: strictTokens.foo,
      [strictTokens.foo]: strictTokens.foo,
      '::before': {
        color: () => strictTokens.foo,
      },
    })
  })

  it('accepts pseudo-classes', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        ':focus': 'red',
      },
    })
  })

  it('accepts pseudo-classes with params', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        ':dir(rtl)': 'red',
      },
    })
  })

  it('accepts at-rules', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        '@page': 'red',
      },
    })
  })

  it('accepts at-rules with params', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        '@container (width >= 1440)': 'red',
      },
    })
  })

  it('accepts attribute selectors', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        '[disabled]': 'red',
        '[value="foo"]': 'red',
      },
    })
  })

  it('accepts compound selectors', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        [selector('[disabled]', ':invalid')]: 'red',
        [selector('[value="foo"]', ':invalid')]: 'red',
        [selector(':dir(rtl)', ':invalid')]: 'red',
      },
    })
  })

  it('accepts stylex styles', () => {
    const { foo } = create({
      foo: {
        color: 'red',
        backgroundColor: null,
      },
    })

    assertType<StyleDeck>(foo)
    assertType<StyleDeck>([foo, { color: 'red' }])
  })

  it('accepts stylex marker', () => {
    assertType<StyleDeck>(defaultMarker())
  })

  it('accepts stylex theme', () => {
    const themeVar = defineVars({ foo: 'bar' })

    const theme = createTheme(themeVar, {
      foo: 'quux',
    })

    assertType<StyleDeck>(theme)
    assertType<StyleDeck>([theme])
  })

  it('accepts selectors', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        [selector(':focus', ':active')]: 'red',
      },
    })
  })

  it('accepts styles with fallback', () => {
    assertType<StyleDeck>({
      position: firstThatWorks('sticky', '-webkit-sticky', 'fixed'),
    })
  })

  it('accepts defined properties', () => {
    assertType<
      StyleDeck<{
        color?: string
      }>
    >({
      color: 'red',
    })

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >({
      color: () => 'red',
    })

    assertType<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >({
      color: {
        default: null,
        ':active': 'red',
        ':focus': 'blue',
      },
    })

    assertType<
      StyleDeck<{
        color?: 'red' | 'blue'
      }>
    >({
      color: {
        default: null,
        ':active': () => 'red',
        ':focus': faker.datatype.boolean() ? 'blue' : 'red',
      },
    })

    assertType<
      StyleDeck<{
        color?: 'red' | 'green' | 'blue'
      }>
    >({
      color: {
        default: null,
        '@container (width > 1440px)': {
          default: 'green',
          ':focus': 'blue',
        },
      },
    })

    const { foo } = create({
      foo: {
        color: 'red',
      },
    })

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >(foo)

    assertType<
      StyleDeck<{
        color?: 'red'
      }>
    >([foo, [foo]])

    const { bar } = create({
      bar: (color: string) => ({
        color,
      }),
    })

    assertType<
      StyleDeck<{
        color?: string
      }>
    >(bar('red'))

    assertType<
      StyleDeck<{
        color?: string
      }>
    >([bar('red'), [bar('red')]])
  })

  it('accepts variadic style inputs', () => {
    assertType<StyleDeck>([
      {
        color: 'red',
      },
      {
        backgroundColor: 'blue',
      },
    ])

    assertType<StyleDeck>([
      {
        color: 'red',
      },
      {
        // oxlint-disable-next-line no-magic-numbers
        opacity: () => faker.number.float(),
      },
    ])
  })

  it('keeps array values as static leaf values', () => {
    assertType<StyleDeck>({
      fontFamily: ['Inter', 'sans-serif'],
    })
  })
})

describe('type SimpleSelector', () => {
  it('accepts valid selector', () => {
    assertType<CSSSelector>('[value]')
    assertType<CSSSelector>('[value="foo"]')
    assertType<CSSSelector>("[value='foo']")
    assertType<CSSSelector>('[value=foo]')
  })
})

import { assertType } from 'vitest'
import { create } from '@stylexjs/stylex'
import { createTheme } from '@stylexjs/stylex'
import type { CSSSelector } from './types.ts'
import { defaultMarker } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { faker } from '@faker-js/faker'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import { selector } from './hooks/selector.ts'
import type { StyleDeck } from './types.ts'
import { types } from '@stylexjs/stylex'
//
