describe(mergeClassAttr, () => {
  it('merges class attribute', () => {
    expect(
      mergeClassAttr('foo bar', {
        class: 'quux',
        style: 'color: red;',
        'data-style-src': 'xxx',
      }),
    ).toStrictEqual({
      class: 'foo bar quux',
      style: 'color: red;',
      'data-style-src': 'xxx',
    })

    expect(mergeClassAttr('foo bar', {})).toStrictEqual({
      class: 'foo bar',
    })
  })
})

describe(mergeClassProp, () => {
  it('merges class property', () => {
    expect(
      mergeClassProp('foo bar', {
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

    expect(mergeClassProp('foo bar', {})).toStrictEqual({
      className: 'foo bar',
    })
  })
})

describe(mergeAttrs, () => {
  it('returns attrs', () => {
    expect(
      mergeAttrs(
        {
          class: 'foo',
        },
        {
          class: 'bar',
        },
      ),
    ).toStrictEqual({
      class: 'foo bar',
    })

    expect(
      mergeAttrs(
        {
          class: 'foo',
        },
        {},
      ),
    ).toStrictEqual({
      class: 'foo',
    })

    expect(
      mergeAttrs(
        {},
        {
          class: 'bar',
        },
      ),
    ).toStrictEqual({
      class: 'bar',
    })

    const symbol = Symbol()

    expect(
      mergeAttrs(
        {
          class: symbol,
        },
        {
          class: 'bar',
        },
      ),
    ).toStrictEqual({
      class: symbol,
    })

    expect(
      mergeAttrs(
        {
          class: 'foo',
          id: symbol,
        },
        {
          class: 'bar',
        },
      ),
    ).toStrictEqual({
      class: 'foo bar',
      id: symbol,
    })
  })
})

describe(mergeProps, () => {
  it('returns props', () => {
    expect(
      mergeProps(
        {
          className: 'foo',
        },
        {
          className: 'bar',
        },
      ),
    ).toStrictEqual({
      className: 'foo bar',
    })
  })
})

describe(toAttrs, () => {
  it('returns attrs', () => {
    expect(
      toAttrs({
        '--foo': 'initial',
        '--fooBar': 'initial',
      }),
    ).toStrictEqual({
      style: '--foo:initial;--fooBar:initial',
    })

    expect(toAttrs({})).toStrictEqual({})
  })
})

import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { '~mergeAttrs' as mergeAttrs } from './index.ts'
import { '~mergeClassAttr' as mergeClassAttr } from './index.ts'
import { '~mergeClassProp' as mergeClassProp } from './index.ts'
import { '~mergeProps' as mergeProps } from './index.ts'
import { '~toAttrs' as toAttrs } from './index.ts'
//
