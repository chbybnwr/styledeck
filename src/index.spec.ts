describe('mergeClassAttribute', () => {
  it('merges class attribute', () => {
    expect(
      mergeClassAttribute('foo bar', {
        class: 'quux',
        style: 'color: red;',
        'data-style-src': 'xxx',
      }),
    ).toStrictEqual({
      class: 'foo bar quux',
      style: 'color: red;',
      'data-style-src': 'xxx',
    })

    expect(mergeClassAttribute('foo bar', {})).toStrictEqual({
      class: 'foo bar',
    })
  })
})

describe('mergeClassProperty', () => {
  it('merges class property', () => {
    expect(
      mergeClassProperty('foo bar', {
        className: 'quux',
        style: {
          color: 'red',
        },
        'data-style-src': 'xxx',
      }),
    ).toStrictEqual({
      className: 'foo bar quux',
      style: {
        color: 'red',
      },
      'data-style-src': 'xxx',
    })

    expect(mergeClassProperty('foo bar', {})).toStrictEqual({
      className: 'foo bar',
    })
  })
})

describe('attrs', () => {
  it('returns attrs', () => {
    expect(
      attrs({
        '--fooBar': 'initial',
        MozAnimation: 'auto',
      }),
    ).toStrictEqual({
      style: '--fooBar:initial;-moz-animation:auto',
    })
  })
})

import { '~attrs' as attrs } from './index.ts'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { '~mergeClassAttribute' as mergeClassAttribute } from './index.ts'
import { '~mergeClassProperty' as mergeClassProperty } from './index.ts'
//
