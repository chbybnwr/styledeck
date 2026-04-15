describe(styler, () => {
  it('rejects unknown non-custom properties', () => {
    expect(() => {
      styler({
        // @ts-expect-error
        foo: 'bar',
      })

      styler({
        '::before': {
          // @ts-expect-error
          foo: 'bar',
        },
      })

      styler({
        '::before': () => ({
          // TODO: @ts-expect-error
          foo: 'bar',
        }),
      })
    }).toThrow()
  })

  it('rejects unknown pseudo-elements', () => {
    expect(() => {
      styler({
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
      styler({
        textJustify: 'foo',
      })

      // @ts-expect-error
      styler({
        textJustify: () => 'foo',
      })

      // @ts-expect-error
      styler({
        textJustify: {
          default: 'foo',
        },
      })
    }).toThrow()
  })

  it('rejects contextual styles without default value', () => {
    expect(() => {
      // @ts-expect-error
      styler({
        color: {
          ':focus': 'red',
        },
      })

      // @ts-expect-error
      styler({
        color: {
          default: null,
          '@container (width >= 1440)': {
            ':focus': 'red',
          },
        },
      })

      // @ts-expect-error
      styler({
        color: () => ({
          ':focus': 'red',
        }),
      })
    }).toThrow()
  })

  it('rejects unknown contexts(pseudo-elements and at-rules)', () => {
    expect(() => {
      styler({
        color: {
          default: null,
          // @ts-expect-error
          foo: 'bar',
        },
      })

      styler({
        color: {
          default: null,
          // @ts-expect-error
          ':foo': 'bar',
        },
      })

      styler({
        color: {
          default: null,
          // @ts-expect-error
          '@foo': 'bar',
        },
      })
    }).toThrow()
  })
})

import { describe } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { styler } from './index.ts'
//
