describe('apply', () => {
  it('rejects unknown non-custom properties', () => {
    expect(() => {
      apply({
        // @ts-expect-error
        foo: 'bar',
      })

      apply({
        '::before': {
          // @ts-expect-error
          foo: 'bar',
        },
      })
    }).toThrow()
  })

  it('rejects unknown pseudo-elements', () => {
    expect(() => {
      apply({
        // @ts-expect-error
        '::foo': {
          color: 'red',
        },
      })
    }).toThrow()
  })

  it('rejects invalid style values', () => {
    expect(() => {
      // @ts-expect-error
      apply({
        textJustify: 'foo',
      })

      // @ts-expect-error
      apply({
        textJustify: () => 'foo',
      })

      // @ts-expect-error
      apply({
        textJustify: {
          default: 'foo',
        },
      })
    }).toThrow()
  })

  it('rejects contextual styles without default value', () => {
    expect(() => {
      // @ts-expect-error
      apply({
        color: {
          ':focus': 'red',
        },
      })

      // @ts-expect-error
      apply({
        color: {
          default: null,
          '@container (width >= 1440)': {
            ':focus': 'red',
          },
        },
      })

      // @ts-expect-error
      apply({
        color: () => ({
          ':focus': 'red',
        }),
      })
    }).toThrow()
  })

  it('rejects unknown contexts', () => {
    expect(() => {
      apply({
        color: {
          default: null,
          // @ts-expect-error
          foo: 'bar',
        },
      })
    }).toThrow()
  })

  it('rejects unknown pseudo-elements)', () => {
    expect(() => {
      apply({
        color: {
          default: null,
          // @ts-expect-error
          ':foo': 'bar',
        },
      })
    }).toThrow()
  })

  it('rejects unknown at-rules)', () => {
    expect(() => {
      apply({
        color: {
          default: null,
          // @ts-expect-error
          '@foo': 'bar',
        },
      })
    }).toThrow()
  })

  it('rejects closures as arguments', () => {
    expect(() => {
      apply(
        // @ts-expect-error
        () => ({
          color: 'red',
        }),
      )
    }).toThrow()
  })
})

import { apply } from './macros.ts'
import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
//
