describe('typeof selector', () => {
  it('accepts ancestry selector', () => {
    assertType<CSSHook>(ancestor(defaultMarker(), ':focus'))
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
    expectTypeOf<ReturnType<CreateAncestryHook>>().toEqualTypeOf<CSSHook>()
  })

  it('accepts marker', () => {
    expectTypeOf<Parameters<CreateAncestryHook>[0]>().toEqualTypeOf<
      ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>
    >()
  })
})

void 0

import { ancestor } from './ancestry'
import { anySibling } from './ancestry'
import { assertType } from 'vitest'
import type { CreateAncestryHook } from './ancestry'
import type { CSSHook } from '#/types'
import { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { descendant } from './ancestry'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { it } from 'vitest'
import { siblingAfter } from './ancestry'
import { siblingBefore } from './ancestry'
//
