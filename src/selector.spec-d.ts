describe('typeof selector', () => {
  it('returns selector', () => {
    assertType<Hook>(selector(':focus', ':active'))
  })

  it('accepts ancestry selector', () => {
    assertType<Hook>(ancestor(defaultMarker(), ':focus'))
  })

  it('accepts attribute selector', () => {
    assertType<Hook>(selector('[disabled]', ':focus'))
  })

  it('accepts attribute selector with value', () => {
    assertType<Hook>(selector('[id="item-1"]', ':focus'))
  })
})

describe('typeof ancestor', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestryHook>(ancestor)
  })
})

describe('typeof descendant', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestryHook>(descendant)
  })
})

describe('typeof anySibling', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestryHook>(anySibling)
  })
})

describe('typeof siblingBefore', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestryHook>(siblingBefore)
  })
})

describe('typeof siblingAfter', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestryHook>(siblingAfter)
  })
})

describe('typeof CreateAncestryHook', () => {
  it('returns selector', () => {
    expectTypeOf<ReturnType<CreateAncestryHook>>().toEqualTypeOf<Hook>()
  })

  it('accepts marker', () => {
    expectTypeOf<Parameters<CreateAncestryHook>[0]>().toEqualTypeOf<
      ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>
    >()
  })
})

void 0

import { ancestor } from './selector'
import { anySibling } from './selector'
import { assertType } from 'vitest'
import type { CreateAncestryHook } from './selector'
import { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { descendant } from './selector'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import type { Hook } from './selector'
import { it } from 'vitest'
import { selector } from './selector'
import { siblingAfter } from './selector'
import { siblingBefore } from './selector'
//
