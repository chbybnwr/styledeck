const tokens = defineVars({
  foo: 'blue',
})

describe('StyleDeck', () => {
  it('accepts standard properties', () => {
    assertType<StyleDeck>({
      color: 'red',
      textBoxEdge: 'cap ex',
      cornerShape: 'squircle',
    })
  })

  it('accepts custom properties', () => {
    assertType<StyleDeck>({
      '--custom': 'lorem',
      [tokens.foo]: 'ipsum',
    })

    assertType<StyleDeck>({
      '::before': {
        '--custom': 'lorem',
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
    const condition = Math.random() > 0.8

    assertType<StyleDeck>({
      color: condition && 'red',
      textBoxEdge: condition && 'cap ex',
      cornerShape: condition && 'squircle',
      '--custom': condition && 'lorem',
      [tokens.foo]: condition && 'ipsum',
      '::before': {
        color: condition && 'red',
      },
    })

    assertType<StyleDeck>({
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
    assertType<StyleDeck>({
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
    const atDark = '@media (prefer-color-scheme: dark)'

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
      cornerShape: tokens.foo,
      '--custom': tokens.foo,
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
      cornerShape: strictTokens.foo,
      '--custom': strictTokens.foo,
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

  it('accepts stylex styles', () => {
    const { foo } = create({
      foo: {
        color: 'red',
      },
    })

    assertType<StyleDeck>(foo)
    assertType<StyleDeck>([foo, { color: 'red' }])
  })

  it('accepts stylex marker', () => {
    assertType<StyleDeck>(defaultMarker())
  })

  it('accepts stylex theme', () => {
    const tokens = defineVars({ foo: 'bar' })

    const theme = createTheme(tokens, {
      foo: 'quux',
    })

    assertType<StyleDeck>(theme)
    assertType<StyleDeck>([theme])
  })

  it('accepts family tree access', () => {
    assertType<StyleDeck>({
      color: {
        default: null,
        [when.ancestor(':hover')]: 'red',
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
        ':focus': Math.random() > 0.8 ? 'blue' : 'red',
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

    assertType<
      StyleDeck<{
        '--color'?: string
      }>
    >({
      '--color': 'red',
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
        opacity: () => 0.5,
      },
    ])
  })

  it('keeps array values as static leaf values', () => {
    assertType<StyleDeck>({
      fontFamily: ['Inter', 'sans-serif'],
    })
  })
})

import { assertType } from 'vitest'
import { create } from '@stylexjs/stylex'
import { createTheme } from '@stylexjs/stylex'
import { defaultMarker } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { firstThatWorks } from '@stylexjs/stylex'
import { it } from 'vitest'
import type { StyleDeck } from './index.ts'
import { types } from '@stylexjs/stylex'
import { when } from '@stylexjs/stylex'
//
