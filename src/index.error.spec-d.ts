test(styler, () => {
  styler({
    color: 'red',
  })

  styler({
    color: () => 'red',
  })

  styler({
    color: {
      ':focus': 'red',
    },
  })

  styler({
    color: () => ({
      ':focus': 'red',
    }),
  })

  styler({
    color: {
      '@container (width >= 1440)': {
        ':focus': 'red',
      },
    },
  })

  styler({
    color: () => ({
      '@container (width >= 1440)': {
        ':focus': 'red',
      },
    }),
  })

  styler({
    '--color': 'red',
  })

  styler({
    '--color': () => 'red',
  })

  styler({
    '--color': {
      ':focus': 'red',
    },
  })

  styler({
    '--color': () => ({
      ':focus': 'red',
    }),
  })

  styler({
    '--color': {
      '@container (width >= 1440)': {
        ':focus': 'red',
      },
    },
  })

  styler({
    '--color': () => ({
      '@container (width >= 1440)': {
        ':focus': 'red',
      },
    }),
  })

  expect(() =>
    styler({
      backgroundColor: 'red',

      color: {
        default: 'red',
        ':focus': {
          //
        },
        '@container': {
          //
        },
        //
      },
      textBoxEdge: {
        ':focus': {
          //
        },
        //
      },
      cornerShape: {
        ':focus': {
          //
        },
        //
      },
      '--size': {
        //
      },

      '::before': {
        backgroundColor: '',

        '--size': {
          //
        },
        color: {
          ':focus': {
            //
          },
          //
        },
        //
      },
      ':after': {
        backgroundColor: '',
        '--size': {
          ':focus': {
            //
          },
          //
        },
        color: {
          ':focus': {
            //
          },
          //
        },
      },
      ':-moz-placeholder': {
        backgroundColor: '',
        '--size': {
          ':focus': {
            //
          },
          //
        },
        color: {
          ':focus': {
            //
          },
          //
        },
      },
      '::slotted()': {
        backgroundColor: '',
        '--size': {
          ':focus': {
            //
          },
          //
        },
        color: {
          ':focus': {
            //
          },
          //
        },
      },
    }),
  ).toThrow()

  const vars = defineVars({
    foo: types.integer(1),
    bar: 1,
    quux: '',
  })

  styler({
    '::placeholder': {
      color: 'red',
      [vars.bar]: 1,
    },
    // color: 'red',
    // [vars.bar]: 1,
  })

  styler({
    color: 'red',
    // backgroundColor: vars.bar,
    [vars.quux]: '',
  })

  expect(() =>
    styler({
      // textAlign: 'justify',
      // color: 'red',
      // backgroundColor: vars.bar,
      // textBoxEdge: vars.foo,
      // textBoxTrim: vars.bar,
      // cornerShape: vars.quux,
      // cue: vars.bar,
      // '--foo': vars.foo,
      // '--bar': vars.bar,
      // '--quux': 'quux',
      // '--alpha': {
      //   default: vars.foo,
      // },
      [vars.foo]: {
        default: vars.bar,
      },
      [vars.bar]: 1,
    }),
  ).toThrow()
})

import { defineVars } from '@stylexjs/stylex'
import { expect } from 'vitest'
import { styler } from './index.ts'
import { test } from 'vitest'
import { types } from '@stylexjs/stylex'
//
