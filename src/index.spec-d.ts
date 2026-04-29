/* eslint-disable max-lines */
/* eslint-disable vitest/expect-expect */

const vars = defineVars({
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
      [vars.foo]: 'ipsum',
    })
    apply({
      '::before': {
        '--custom': 'lorem',
        [vars.foo]: 'ipsum',
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
    // eslint-disable-next-line no-unassigned-vars, init-declarations
    let condition!: boolean

    apply({
      color: condition && 'red',
      textBoxEdge: condition && 'cap ex',
      cornerShape: condition && 'squircle',
      '--custom': condition && 'lorem',
      [vars.foo]: condition && 'ipsum',
      '::before': condition && {
        color: 'red',
      },
    })

    apply({
      color: condition ? 'red' : null,
      textBoxEdge: condition ? 'cap ex' : null,
      cornerShape: condition ? 'squircle' : null,
      '--custom': condition ? 'lorem' : null,
      [vars.foo]: condition ? 'ipsum' : null,
      '::before': condition
        ? {
            color: 'red',
          }
        : null,
    })
  })

  it('accepts dynamic styles', () => {
    apply({
      color: () => 'red',
      textBoxEdge: () => 'cap ex',
      cornerShape: () => 'squircle',
      '--custom': () => 'lorem',
      [vars.foo]: () => 'ipsum',
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
      color: vars.foo,
      textBoxEdge: vars.foo,
      cornerShape: vars.foo,
      '--custom': vars.foo,
      [vars.foo]: vars.foo,
      '::before': {
        color: () => vars.foo,
      },
    })
  })

  it('accepts typed variable styles', () => {
    const typedVars = defineVars({
      foo: types.angle('360deg'),
    })

    apply({
      color: typedVars.foo,
      textBoxEdge: typedVars.foo,
      cornerShape: typedVars.foo,
      '--custom': typedVars.foo,
      [typedVars.foo]: typedVars.foo,
      '::before': {
        color: () => typedVars.foo,
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

  it('accepts stylex styles', () => {
    // eslint-disable-next-line no-unassigned-vars, init-declarations
    let style!: StyleXStyles

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
  it('returns stylex styles', () => {
    expectTypeOf(
      sheet({
        color: 'red',
      }),
    ).toExtend<
      StaticStyles<{
        color?: 'red'
      }>
    >()

    expectTypeOf(
      sheet({
        color: () => 'red',
      }),
    ).toExtend<
      StyleXStyles<{
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
      StaticStyles<{
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
      StyleXStyles<{
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
      StyleXStyles<{
        color?: 'red' | 'green' | 'blue'
      }>
    >()

    const { foo } = create({
      foo: {
        color: 'red',
      },
    })

    expectTypeOf(sheet(foo)).toExtend<
      StaticStyles<{
        color?: 'red'
      }>
    >()

    const { bar } = create({
      bar: (color: string) => ({
        color,
      }),
    })

    expectTypeOf(sheet(bar('red'))).toExtend<
      StyleXStyles<{
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
import type { StaticStyles } from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { types } from '@stylexjs/stylex'
import { when } from '@stylexjs/stylex'
//
