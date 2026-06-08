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
  })
})

describe('mergeClassProperty', () => {
  it('merges class attribute', () => {
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
  })
})

import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { '~mergeClassAttribute' as mergeClassAttribute } from './index.ts'
import { '~mergeClassProperty' as mergeClassProperty } from './index.ts'
//
