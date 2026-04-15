/* eslint-disable max-lines */
/* eslint-disable vitest/expect-expect */

const vars = defineVars({
  foo: null,
  bar: types.angle('360deg'),
})

describe(styler, () => {
  it('accepts standard properties', () => {
    styler({
      color: 'red',
      textBoxEdge: 'cap ex',
      cornerShape: 'squircle',
    })
  })

  it('accepts custom properties', () => {
    styler({
      '--custom': 'lorem',
      [vars.foo]: 'ipsum',
    })
    styler({
      '::before': {
        '--custom': 'lorem',
        [vars.foo]: 'ipsum',
      },
    })
  })

  it('accepts pseudo-elements', () => {
    styler({
      '::before': {
        color: 'red',
      },
    })
  })

  it('accepts pseudo-elements with params', () => {
    styler({
      '::part(foo)': {
        color: 'red',
      },
    })
  })

  it('accepts dynamic styles', () => {
    styler({
      color: () => 'red',
      textBoxEdge: () => 'cap ex',
      cornerShape: () => 'squircle',
      '--custom': () => 'lorem',
      [vars.foo]: () => 'ipsum',
      '::before': () => ({
        color: 'red',
      }),
    })
  })

  it('accepts contextual styles', () => {
    styler({
      color: {
        default: null,
        ':focus': 'red',
        [vars.foo]: vars.foo,
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
      [vars.foo]: {
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
    styler({
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
      [vars.foo]: {
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

  it('accepts dynamic contextual styles', () => {
    styler({
      color: () => ({
        default: null,
        ':focus': 'red',
      }),
      textBoxEdge: () => ({
        default: null,
        ':focus': 'cap ex',
      }),
      cornerShape: () => ({
        default: null,
        ':focus': 'squircle',
      }),
      '--custom': () => ({
        default: null,
        ':focus': 'lorem',
      }),
      [vars.foo]: () => ({
        default: null,
        ':focus': 'ipsum',
      }),
      '::before': () => ({
        color: {
          default: null,
          ':focus': 'red',
        },
      }),
    })
  })

  it('accepts dynamic combined contextual styles', () => {
    styler({
      color: () => ({
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'red',
        },
      }),
      textBoxEdge: () => ({
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'cap ex',
        },
      }),
      cornerShape: () => ({
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'squircle',
        },
      }),
      '--custom': () => ({
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'lorem',
        },
      }),
      [vars.foo]: () => ({
        default: null,
        '@container (width >= 1440px)': {
          default: null,
          ':focus': 'ipsum',
        },
      }),
      '::before': () => ({
        color: {
          default: null,
          '@container (width >= 1440px)': {
            default: null,
            ':focus': 'red',
          },
        },
      }),
    })
  })

  it('accepts variable styles', () => {
    styler({
      color: vars.foo,
      textBoxEdge: vars.foo,
      cornerShape: vars.foo,
      '--custom': vars.foo,
      [vars.foo]: vars.foo,
      '::before': () => ({
        color: vars.foo,
      }),
    })
  })

  it('accepts typed variable styles', () => {
    styler({
      color: vars.bar,
      textBoxEdge: vars.bar,
      cornerShape: vars.bar,
      '--custom': vars.bar,
      [vars.bar]: vars.bar,
      '::before': () => ({
        color: vars.bar,
      }),
    })
  })

  it('accepts pseudo-classes', () => {
    styler({
      color: {
        default: null,
        ':focus': 'red',
      },
    })
  })

  it('accepts pseudo-classes with params', () => {
    styler({
      color: {
        default: null,
        ':dir(rtl)': 'red',
      },
    })
  })

  it('accepts at-rules', () => {
    styler({
      color: {
        default: null,
        '@page': 'red',
      },
    })
  })

  it('accepts at-rules with params', () => {
    styler({
      color: {
        default: null,
        '@container (width >= 1440)': 'red',
      },
    })
  })

  it('accepts stylex styles', () => {
    // eslint-disable-next-line no-unassigned-vars, init-declarations
    let style!: StyleXStyles

    styler(style)

    styler(style, {
      color: 'red',
    })
  })
})

describe(style, () => {
  it('returns stylex styles', () => {
    expectTypeOf(
      style({
        color: 'red',
      }),
    ).toExtend<
      StyleXStyles<{
        color?: 'red'
      }>
    >()

    expectTypeOf(
      style({
        color: () => 'red',
      }),
    ).toExtend<
      StyleXStyles<{
        color?: 'red'
      }>
    >()

    expectTypeOf(
      style({
        color: {
          default: 'red',
          ':focus': 'blue',
        },
      }),
    ).toExtend<
      StyleXStyles<{
        color?: 'red' | 'blue'
      }>
    >()

    expectTypeOf(
      style({
        color: () => ({
          default: 'red',
          ':focus': 'blue',
        }),
      }),
    ).toExtend<
      StyleXStyles<{
        color?: 'red' | 'blue'
      }>
    >()

    const { foo, bar } = create({
      foo: {
        color: 'blue',
      },
      bar: (color: string) => ({
        color,
      }),
    })

    expectTypeOf(
      style(
        foo,
        //
        // bar('red'),
        {
          color: 'red',
        },
      ),
    ).toExtend<
      StaticStyles<{
        color?: string
      }>
    >()
  })
})

import { create } from '@stylexjs/stylex'
import { defineVars } from '@stylexjs/stylex'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { it } from 'vitest'
import type { StaticStyles } from '@stylexjs/stylex'
import { style } from './index.ts'
import { styler } from './index.ts'
import type { StyleXStyles } from '@stylexjs/stylex'
import { types } from '@stylexjs/stylex'
//
