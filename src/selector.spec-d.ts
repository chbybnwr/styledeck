describe('typeof selector', () => {
  it('returns selector', () => {
    assertType<Selector>(selector(':focus'))
  })

  it('accepts ancestry selector', () => {
    assertType<Selector>(selector(ancestor(defaultMarker()), ':focus'))
  })

  it('accepts attribute selector', () => {
    assertType<Selector>(selector('[disabled]'))
  })

  it('accepts attribute selector with value', () => {
    assertType<Selector>(selector('[id="item-1"]'))
  })

  it('accepts data attribute selector', () => {
    assertType<Selector>(selector('[data-foo]'))
  })

  it('accepts data attribute selector with value', () => {
    assertType<Selector>(selector('[data-foo="bar"]'))
  })

  it('accepts aria attribute selector', () => {
    assertType<Selector>(selector('[aria-foo]'))
  })

  it('accepts aria attribute selector with value', () => {
    assertType<Selector>(selector('[aria-foo="bar"]'))
  })
})

describe('typeof ancestor', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestrySelector>(ancestor)
  })
})

describe('typeof descendant', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestrySelector>(descendant)
  })
})

describe('typeof anySibling', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestrySelector>(anySibling)
  })
})

describe('typeof siblingBefore', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestrySelector>(siblingBefore)
  })
})

describe('typeof siblingAfter', () => {
  it('creates ancestry selector', () => {
    assertType<CreateAncestrySelector>(siblingAfter)
  })
})

describe('typeof CreateAncestrySelector', () => {
  it('returns ancestry selector', () => {
    expectTypeOf<
      ReturnType<CreateAncestrySelector>
    >().toEqualTypeOf<AncestrySelector>()
  })

  it('accepts marker', () => {
    expectTypeOf<Parameters<CreateAncestrySelector>>().toEqualTypeOf<
      [ReturnType<typeof defaultMarker> | ReturnType<typeof defineMarker>]
    >()
  })
})

void 0

import { ancestor } from './selector'
import type { AncestrySelector } from './selector'
import { anySibling } from './selector'
import { assertType } from 'vitest'
import type { CreateAncestrySelector } from './selector'
import { defaultMarker } from '@stylexjs/stylex'
import type { defineMarker } from '@stylexjs/stylex'
import { descendant } from './selector'
import { describe } from 'vitest'
import { expectTypeOf } from 'vitest'
import { it } from 'vitest'
import { selector } from './selector'
import type { Selector } from './selector'
import { siblingAfter } from './selector'
import { siblingBefore } from './selector'
//
